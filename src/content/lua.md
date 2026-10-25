# Lua

Lua is a lightweight, embeddable language with a tracing garbage collector. It is single-threaded by design and uses coroutines for cooperative concurrency.

## Primitive types

Lua numbers are a single `number` type: 64-bit integers (5.3+) or doubles, with no fixed-width signed/unsigned types and no explicit alignment control.
### Number

#### integer

```lua
local a = 42
local b = -7
local c = tonumber("42")
```

#### integer overflow

```lua
-- Lua 5.3+ has 64-bit integers; overflow wraps
local x = math.maxinteger
print(x + 1)        -- math.mininteger (wraps)
-- Lua 5.1/5.2 use doubles only — no integer overflow, only precision loss
print(2 ^ 53)
```

#### float

```lua
local x = 3.14
local y = 1.5e-3
local z = tonumber("3.14")
```

#### arithmetic

```lua
a + b      -- addition
a - b      -- subtraction
a * b      -- multiplication
a / b      -- division, always returns float
a // b     -- floor division (Lua 5.3+)
a % b      -- modulo
a ^ b      -- exponentiation
```

#### min max abs

```lua
math.min(a, b)
math.max(a, b)
math.abs(-42)
```

#### random

```lua
math.randomseed(os.time())
math.random(1, 6)
math.random()      -- 0..1
```

### Integer types

#### short

```lua
-- No short — single number type
```

#### long

```lua
-- No long — single number type
```

#### long long

```lua
-- No long long — single number type
```

#### unsigned

```lua
-- No unsigned types
```

#### signed

```lua
local i = -42   -- signed by nature
```

#### struct

```lua
string.pack("<bi4", 1, 2)   -- pack a byte and a 32-bit int
```

#### divmod

```lua
-- Lua has no divmod; compute both directly
local q = a // b   -- Lua 5.3+
local r = a % b
local q, r = math.modf(a / b)
```

#### rounding

```lua
math.floor(3.14)        -- 3
math.floor(3.14 + 0.5)  -- 3 (round to nearest)
math.ceil(3.14)         -- 4
string.format("%.1f", 3.14) -- "3.1"
```

#### range

```lua
for i = 0, 4 do print(i) end   -- 0, 1, 2, 3, 4 (inclusive)
for i = 2, 4 do print(i) end   -- 2, 3, 4
-- no built-in list(range(n)); build one with a loop
local function range(a, b)
  local t = {}
  for i = a, b do t[#t + 1] = i end
  return t
end
```

#### descending range

```lua
for i = 4, 0, -1 do print(i) end   -- 4, 3, 2, 1, 0
for i = 10, 0, -2 do print(i) end  -- 10, 8, 6, 4, 2
```

### Boolean

#### literal

```lua
local t = true
local f = false
```

#### negation

```lua
not true        -- false
```

#### logical and

```lua
true and false  -- false
```

#### logical or

```lua
true or false   -- true
```

#### truthy and falsy values

```lua
-- Only false and nil are falsy; 0 and "" are truthy.
1 ~= 0                      -- explicit check for integer
#s > 0                      -- explicit check for string
#t > 0                      -- explicit check for list
```

#### conversion

```lua
1 ~= 0              -- to Boolean
tostring(true)      -- "true"
tonumber("1") ~= 0  -- to Boolean
```

### None / null

Lua uses `nil` for absence.

#### literal

```lua
local x = nil
```

#### null check

```lua
if x == nil then
  -- ...
end
if x then
  -- x is present and truthy
end
```

#### optional access

```lua
x and x.length           -- nil-safe access
x and x:do_something()
local v = x or 0         -- provide default
```

## Composite types

### String

#### literal

```lua
local s = "hello"
local s = 'hello'
local s = [[multiline
string]]
```

#### length

```lua
#s
string.len(s)
```

#### access

```lua
s:sub(1, 1)   -- first char
s:sub(-1)     -- last char
```

#### slice

```lua
s:sub(1, 3)   -- chars 1..3, inclusive
s:sub(2)      -- from index 2 to end
s:sub(-3)     -- last 3 chars
```

#### concatenation

```lua
s .. " world"
table.concat({"hello", "world"}, " ")
```

#### interpolation

```lua
string.format("Hello, %s", name)
("Hello, " .. name)
```

#### search

```lua
s:find("lo")             -- returns index or nil
s:find("hello", 1, true) -- plain substring search
s:sub(1, 2) == "he"      -- starts with
s:sub(-2) == "lo"        -- ends with
```

#### split and join

```lua
for part in s:gmatch("[^,]+") do print(part) end   -- split on ","
table.concat({"a", "b", "c"}, "-")                  -- join
```

#### trim

```lua
s:match("^%s*(.-)%s*$")
s:gsub("^%s+", ""):gsub("%s+$", "")
```

#### case

```lua
s:upper()
s:lower()
```

#### replace

```lua
(s:gsub("old", "new"))        -- all occurrences
(s:gsub("old", "new", 1))     -- first occurrence only
```

#### justify

```lua
string.format("%10s", s)    -- right justify
string.format("%-10s", s)   -- left justify
```

#### format

```lua
string.format("Hello, %s!", name)
string.format("%.2f", 3.14159)   -- "3.14"
string.format("%05d", 42)        -- "00042"
```

### Complex
#### operations

```lua
-- Lua has no built-in complex numbers; use a table
local z = {re = 1, im = 2}
local function cadd(a, b)
  return {re = a.re + b.re, im = a.im + b.im}
end
local function cmul(a, b)
  return {re = a.re * b.re - a.im * b.im, im = a.re * b.im + a.im * b.re}
end
```

### Date
#### now

```lua
os.date("%Y-%m-%d")   -- 2026-10-13
```
#### format

```lua
os.date("%d/%m/%Y", os.time())
```
### Datetime
#### now

```lua
os.date("%Y-%m-%d %H:%M:%S")
```
#### format

```lua
os.date("%H:%M:%S", os.time())
```
### Decimal
#### literal

```lua
-- No built-in decimal; use a library or string math
0.1 + 0.2  -- 0.3 (double rounding)
```
#### precision

```lua
-- Use a decimal library (e.g. ldecNumber) for exact precision
```
## Type system

### type hints

Lua is dynamically typed; types are documented by convention.

#### variable

```lua
local name = "Alice"     -- string
local age = 30           -- number
local scores = {1, 2, 3} -- list
```

#### nullable

```lua
local name = nil   -- any variable may hold nil
```

#### function

```lua
local function greet(name)
  return "Hello, " .. name
end

local function divide(a, b)
  if b == 0 then return nil end
  return a / b
end
```

#### list of elements

```lua
local names = {"Alice", "Bob"}
local scores = {1, 2, 3}
local matrix = {{1, 2}, {3, 4}}
```

#### dict

```lua
local ages = {Alice = 30, Bob = 25}
```

### Type operations
#### type alias

```lua
-- Lua has no type aliases — use a comment to document
-- Vector = list of numbers
local v = {1.0, 2.0}
```

#### union

```lua
-- Dynamically typed — any value is allowed
```
#### intersection

```lua
-- No type system — duck typing
```
#### literal types

```lua
-- No literal types
```
## Memory model

Lua uses a single dynamic value type. Tables are the only reference type — numbers, strings, and booleans are values. There are no pointers, and the garbage collector reclaims unreferenced tables.

### Memory

#### value vs reference

```lua
local a = 1
local b = a        -- value copy
local x = {1, 2}
local y = x        -- same table
y[3] = 3           -- x is also {1, 2, 3}
```

#### pointer / reference

```lua
-- Tables are references; numbers, strings, booleans are values
local t = {1, 2}
local u = t
u[1] = 10          -- t[1] is also 10
```

#### ownership / borrowing

```lua
-- No ownership/borrowing — garbage collected
```

#### copy vs move

```lua
local a = {1, 2, {3, 4}}
local b = {table.unpack(a)}   -- shallow copy of the outer table
```

#### immutability

```lua
-- No immutable types — freeze by convention
local READONLY = {1, 2, 3}
```

## Control Flow

### if

#### basic

```lua
if x > 0 then
  print("positive")
elseif x < 0 then
  print("negative")
else
  print("zero")
end
```

#### ternary

```lua
local s = x > 0 and "positive" or "not positive"
```

#### as expression

```lua
-- and/or is the closest to a ternary expression
local n = ok and 1 or 0
```

### match / when

#### basic

```lua
if x == 1 then
  return "one"
elseif x == 2 then
  return "two"
else
  return "other"
end
```

#### guard

```lua
if x > 0 then
  return "positive"
elseif x < 0 then
  return "negative"
else
  return "zero"
end
```

#### destructuring

```lua
-- Lua has no pattern-matching destructuring; use table fields
local function handle(cmd)
  if cmd.action == "move" then
    return "move to (" .. cmd.x .. ", " .. cmd.y .. ")"
  end
  return "unknown"
end
```

#### exhaustiveness

```lua
-- No compile-time exhaustiveness — provide an else fallback
```

### for

#### basic

```lua
for _, item in ipairs(items) do
  print(item)
end
```

#### with index

```lua
for i, item in ipairs(items) do
  print(i, item)
end
```

#### range loop

```lua
for i = 0, 9 do
  print(i)
end
```

#### break & continue

```lua
for _, x in ipairs(items) do
  if x < 0 then goto continue end
  if x == 0 then break end
  print(x)
  ::continue::
end
```

#### for else

```lua
-- Lua has no for-else. Use a flag:
local found = false
for _, item in ipairs(items) do
  if item == target then found = true; break end
end
if not found then print("not found") end
```

### while

#### basic

```lua
while x > 0 do
  print(x)
  x = x - 1
end
```

#### break & continue

```lua
while true do
  local x = next_value()
  if x < 0 then goto continue end
  if x == 0 then break end
  print(x)
  ::continue::
end
```

#### do while

```lua
-- repeat...until checks the condition at the end
repeat
  local x = do_something()
until condition(x)
```

### Exception

Lua models errors with `pcall`/`xpcall` and `error`.

#### try / except

```lua
local ok, result = pcall(function()
  return 1 / 0
end)
if not ok then
  print("error: " .. result)
end
```

#### finally

```lua
-- Lua has no finally; close manually after the pcall
local f = io.open("file.txt", "r")
local ok, err = pcall(read, f)
if f then f:close() end
```

#### else

```lua
-- Lua has no try-else; run the success path only when pcall returns ok
local ok, result = pcall(compute)
if ok then
  print("result is " .. result)
else
  print("error")
end
```

#### raise

```lua
error("invalid value")
assert(condition, "condition failed")
```

#### custom exception

```lua
local function fail()
  error({code = "MyError", msg = "something went wrong"})
end
```

#### context manager

```lua
-- No 'with'; use io.open + close, or a helper that guarantees cleanup
local f = assert(io.open("file.txt", "r"))
local content = f:read("*a")
f:close()
```

## Functions

### Function

#### definition

```lua
local function greet(name)
  return "Hello, " .. name
end
```

#### default parameters

```lua
local function greet(name, greeting)
  greeting = greeting or "Hello"
  return greeting .. ", " .. name
end
```

#### overloading

```lua
-- No overloading by signature; check argument types
local function stringify(arg)
  if type(arg) == "number" then return "int: " .. arg end
  return "str: " .. arg
end
```

#### varargs

```lua
local function sum_all(...)
  local s = 0
  for _, v in ipairs({...}) do s = s + v end
  return s
end
```

#### keyword arguments

```lua
-- Use a table for keyword-style arguments
local function configure(opts)
  local host = opts.host or "localhost"
  local port = opts.port or 8080
  local debug = opts.debug or false
end
configure{host = "example.com", port = 3000, debug = true}
```

#### return

```lua
local function divide(a, b)
  if b == 0 then return nil end
  return a / b
end
```

#### callable check

```lua
type(greet) == "function"    -- true
type(42) == "function"       -- false
```

### Lambda

#### basic

```lua
local square = function(x) return x * x end
local add = function(a, b) return a + b end
```

#### as argument

```lua
table.sort(nums, function(a, b) return a < b end)

-- map/filter as loops
local out = {}
for _, x in ipairs(nums) do
  if x > 2 then out[#out + 1] = x * 2 end
end
```

#### receiver

```lua
-- Lua methods use a colon to pass the receiver as self
local sb = {buf = {}}
function sb:append(s) table.insert(self.buf, s); return self end
function sb:tostring() return table.concat(self.buf, "") end

sb:append("Hello"):append(" "):append("World")
```

## Classes

Lua has no classes — use tables and metatables.

### Class

#### definition

```lua
local Dog = {}
Dog.__index = Dog

function Dog.new(name)
  local self = setmetatable({}, Dog)
  self.name = name
  return self
end
```

#### constructor

```lua
function Dog.new(name)
  local self = setmetatable({}, Dog)
  self.name = name
  return self
end
```

#### instantiation

```lua
local dog = Dog.new("Fido")
```

#### attributes

```lua
self.name = name            -- instance attribute
Dog.species = "canine"      -- class attribute
```

#### method

```lua
function Dog:bark()
  return "Woof!"
end
```

#### inheritance

```lua
local Animal = {}
Animal.__index = Animal

local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog
```

#### multiple inheritance

```lua
-- No native multiple inheritance — chain __index fallbacks
local A = {}
local B = {}
local C = setmetatable({}, { __index = function(t, k)
  return A[k] or B[k]
end })
```

#### override

```lua
function Animal:speak() return "" end

function Dog:speak()
  return "Woof!"
end
```

#### super

```lua
local Animal = {}
Animal.__index = Animal
function Animal:speak() return "" end

local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog
function Dog:speak()
  return Animal.speak(self) .. "Woof!"
end
```

#### class method

```lua
function Dog.from_birthyear(birthyear)
  return Dog.new("dog-" .. (2025 - birthyear))
end
```

#### static method

```lua
function Dog.is_canine(name)
  return name == "dog" or name == "wolf"
end
```

#### abstract

```lua
-- No abstract — document methods that subclasses must provide
local Animal = {}
Animal.__index = Animal
-- subclass must define Animal:speak()
```

#### protocol / interface

```lua
-- Duck typing: define expected methods, no interface declaration
local function make_sound(s)
  return s:speak()
end
```

#### data class

```lua
local Dog = {}
Dog.__index = Dog

function Dog.new(name, age)
  local self = setmetatable({}, Dog)
  self.name = name
  self.age = age
  return self
end
```

#### equality

```lua
Dog.__eq = function(a, b)
  return a.name == b.name
end
```

#### string representation

```lua
Dog.__tostring = function(dog)
  return "Dog(" .. dog.name .. ")"
end
```

#### sealed class

```lua
-- Lua has no sealed classes — document the closed set
local Result = {}
function Result.success(value) return {ok = true, value = value} end
function Result.failure(error) return {ok = false, error = error} end
```

#### private

```lua
-- Lua has no access control; underscore marks private by convention
self._secret = 42
```

#### protected

```lua
-- Convention: a single underscore marks protected members
self._name = ""
```

#### public

```lua
-- Everything is public by default
self.name = "Fido"
```

### Interface & trait

Lua has no interfaces or traits — metatables and duck typing fill the role.
#### definition

```lua
-- Duck typing: an object qualifies by implementing the methods
local Speakable = {}
-- anything with speak() satisfies Speakable
```

#### default method

```lua
-- Default behavior via an __index metatable fallback
local Speaker = {}
function Speaker:greet() return self:speak() end
```
### Enum

#### definition

```lua
local Color = {RED = 1, GREEN = 2, AMBER = 3}
```

#### auto value

```lua
-- Array position is the automatic value
local Color = {"RED", "GREEN", "AMBER"}
-- Color.RED is nil; values are Color[1] == "RED"
local RED = 1
local GREEN = 2
local AMBER = 3
```

#### access

```lua
Color.RED
Color["RED"]
```

#### iteration

```lua
for i, name in ipairs(Color) do
  print(name)
end
```

#### lookup

```lua
local name_to_color = {RED = 1, GREEN = 2, AMBER = 3}
name_to_color["RED"]   -- 1
```

#### match

```lua
if color == Color.RED then
  return "stop"
elseif color == Color.GREEN then
  return "go"
else
  return "caution"
end
```

#### enum with data

```lua
local Planet = {
  MERCURY = {3.303e23, 2.4397e6},
  VENUS = {4.869e24, 6.0518e6},
}
```

## Collections

### List

Lua uses tables as lists (1-indexed).

#### literal

```lua
local a = {1, 2, 3}
```

#### size

```lua
#a
```

#### lookup

```lua
a[1]    -- first element
a[#a]   -- last element
```

#### update

```lua
a[1] = 10
table.insert(a, 4)
```

#### is element present

```lua
local function contains(list, value)
  for _, v in ipairs(list) do
    if v == value then return true end
  end
  return false
end
contains(a, 3)
```

#### delete

```lua
table.remove(a, 1)   -- by index
table.remove(a)      -- last element
```

#### merge

```lua
for _, v in ipairs({4, 5}) do
  table.insert(a, v)
end
```

#### slice

```lua
local function slice(list, i, j)
  local out = {}
  j = j or #list
  for k = i, j do out[#out + 1] = list[k] end
  return out
end
slice(a, 1, 3)   -- elements at index 1 and 2
```

#### reversed

```lua
local out = {}
for i = #a, 1, -1 do out[#out + 1] = a[i] end
```

#### map

```lua
local out = {}
for _, x in ipairs(a) do out[#out + 1] = x * 2 end
```

#### filter

```lua
local out = {}
for _, x in ipairs(a) do
  if x > 0 then out[#out + 1] = x end
end
```

### Dictionary

Lua uses tables with key-value pairs.

#### literal

```lua
local d = {t = 1, f = 0}
```

#### size

```lua
local n = 0
for _ in pairs(d) do n = n + 1 end
```

#### lookup

```lua
d.t       -- may be nil
d["t"]    -- may be nil
```

#### update

```lua
d["u"] = -1
d.u = -1
```

#### is key present

```lua
d["c"] ~= nil
```

#### delete

```lua
d["t"] = nil
```

#### from array of pairs

```lua
local keys = {"t", "f"}
local values = {1, 0}
local d = {}
for i, k in ipairs(keys) do d[k] = values[i] end
```

#### merge

```lua
for k, v in pairs({u = -1}) do
  d[k] = v
end
```

#### invert

```lua
local inverted = {}
for k, v in pairs(d) do inverted[v] = k end
```

#### keys and values as arrays

```lua
local keys, values = {}, {}
for k, v in pairs(d) do
  table.insert(keys, k)
  table.insert(values, v)
end
```

### Set

Lua uses a table with true values as a set.

#### literal

```lua
local s = {[1] = true, [2] = true, [3] = true}
```

#### size

```lua
local n = 0
for _ in pairs(s) do n = n + 1 end
```

#### add

```lua
s[4] = true
```

#### is element present

```lua
s[3] == true
```

#### delete

```lua
s[3] = nil
```

#### from array

```lua
local a = {1, 2, 3, 2}
local s = {}
for _, v in ipairs(a) do s[v] = true end   -- {1, 2, 3}
```

#### merge

```lua
for k in pairs(other) do s[k] = true end        -- union
local inter = {}
for k in pairs(s) do if other[k] then inter[k] = true end end  -- intersection
local diff = {}
for k in pairs(s) do if not other[k] then diff[k] = true end end  -- difference
```

## Iterator and generator

### Iterator

#### chain

```lua
local a, b = {"a", "b", "c"}, {"d", "e"}
local chained = {}
for _, v in ipairs(a) do chained[#chained + 1] = v end
for _, v in ipairs(b) do chained[#chained + 1] = v end
```

#### take

```lua
local out = {}
for i = 1, math.min(4, #t) do out[#out + 1] = t[i] end
```

#### drop

```lua
local out = {}
for i = 4, #t do out[#out + 1] = t[i] end
```

#### head

```lua
local out = {}
for i = 1, math.min(3, #t) do out[#out + 1] = t[i] end
```

#### takewhile

```lua
local out = {}
for _, v in ipairs({1, 2, 3, 1, 2}) do
  if v >= 3 then break end
  out[#out + 1] = v
end
```

#### dropwhile

```lua
local t = {1, 2, 3, 1, 2}
local i = 1
while i <= #t and t[i] < 3 do i = i + 1 end
local out = {}
for j = i, #t do out[#out + 1] = t[j] end
```

#### zip

```lua
local a, b = {"a", "b", "c"}, {"1", "2", "3"}
local zipped = {}
for i = 1, math.min(#a, #b) do
  zipped[#zipped + 1] = {a[i], b[i]}
end
```

#### enumerate

```lua
for i, item in ipairs({"a", "b", "c"}) do
  print(i, item)
end
```

#### flatten

```lua
local nested = {{1, 2}, {3, 4}}
local flat = {}
for _, sub in ipairs(nested) do
  for _, v in ipairs(sub) do flat[#flat + 1] = v end
end
```

#### count

```lua
local function count(start, step)
  step = step or 1
  local n = start
  return function()
    local v = n
    n = n + step
    return v
  end
end
```

#### cycle

```lua
local colors = {"red", "green", "blue"}
for i = 1, 5 do
  print(colors[(i - 1) % #colors + 1])
end
```

#### chunked

```lua
local s = "ABCDEFG"
local chunks = {}
for i = 1, #s, 3 do
  chunks[#chunks + 1] = s:sub(i, i + 2)
end
```

#### groupby

```lua
local cities = {{"NYC", "NY"}, {"LA", "CA"}, {"SF", "CA"}, {"Buffalo", "NY"}}
local groups = {}
for _, c in ipairs(cities) do
  groups[c[2]] = groups[c[2]] or {}
  table.insert(groups[c[2]], c[1])
end
```

#### generator

```lua
local function fib()
  local a, b = 0, 1
  return coroutine.wrap(function()
    while true do
      coroutine.yield(a)
      a, b = b, a + b
    end
  end)
end

local it = fib()
for i = 1, 10 do print(it()) end
-- 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

## Modules & Imports

### Import

#### import

```lua
local m = require("module")
```

#### from import

```lua
local sqrt = math.sqrt   -- no selective require
```

#### alias

```lua
local m = require("module")   -- local name is the alias
```

### Export

#### export

```lua
return { public_fn = public_fn }   -- module returns a table
```

### Package manager

#### manifest

```lua
*.rockspec   # LuaRocks
```

#### install

```lua
luarocks install luasocket
```

## Metaprogramming & Reflection

### Annotations

#### annotation

```lua
-- No decorators — wrap functions manually
```

### Introspection

#### type name

```lua
type(x)   -- "number", "string", "table", ...
```

#### members

```lua
for k, v in pairs(t) do print(k, v) end
```

### Macros

#### macro

```lua
-- No macros
```

### Eval

#### eval

```lua
load("return 1 + 2")()   -- 3
```

## Concurrency & Async

### Threads & coroutines

#### thread

```lua
local co = coroutine.create(f)
coroutine.resume(co)
```

### Async / await

#### async await

```lua
-- No async/await — use coroutines
```

### Channels / queues

#### channel

```lua
-- No channels — use tables + coroutines
```

### Mutex / lock

#### mutex

```lua
-- No threads — single OS thread (use Lua Lanes for parallelism)
```

## Generics & Templates

### Generic function

#### function

```lua
-- Dynamically typed — any value already works
```

### Generic class

#### class

```lua
-- No generics — tables are dynamically typed
```

### Constraints / bounds

#### constraint

```lua
-- No constraints — duck typing
```

