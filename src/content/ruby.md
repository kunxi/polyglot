# Ruby

## Primitive types

Ruby's `Integer` is arbitrary precision (no fixed-width types) and `Float` is an IEEE-754 double; there are no signed/unsigned keywords, and padding/alignment is handled by the VM.
### Number

#### integer

```ruby
a = 42
b = -7
c = "42".to_i
```

#### integer overflow

```ruby
# Ruby integers are arbitrary precision — no overflow
big = 2 ** 1000
# Floats can overflow to Infinity
1e308 * 10   # Infinity
```

#### float

```ruby
x = 3.14
y = 1.5e-3
z = "3.14".to_f
```

#### arithmetic

```ruby
a + b      # addition
a - b      # subtraction
a * b      # multiplication
a / b      # integer division if both int
a / b.to_f # force float division
a % b      # modulo
a ** b     # exponentiation
```

#### min max abs

```ruby
[a, b].min
[a, b].max
-42.abs
a.clamp(0, 10)
```

#### random

```ruby
rand(1..6)
rand        # 0.0..1.0
```

### Integer types

#### short

```ruby
# No short — Integer is arbitrary precision
```

#### long

```ruby
# No long — Integer is arbitrary precision
```

#### long long

```ruby
# No long long — Integer is arbitrary precision
```

#### unsigned

```ruby
# No unsigned types
```

#### signed

```ruby
i = -42   # signed by nature
```

#### struct

```ruby
[1, 2].pack("CI")   # pack 8-bit + native unsigned int
```

#### divmod

```ruby
q, r = a.divmod(b)
q = a / b
r = a % b
```

#### rounding

```ruby
3.14.round          # 3
3.9.to_i            # 3 (truncates)
3.14.floor          # 3
format("%.1f", 3.14) # "3.1"
```

#### range

```ruby
(0..4).to_a          # [0, 1, 2, 3, 4] (inclusive)
(0...5).to_a         # [0, 1, 2, 3, 4] (exclusive)
(2..4).to_a          # [2, 3, 4]
(0..8).step(2).to_a  # [0, 2, 4, 6, 8]
```

#### descending range

```ruby
(0..4).to_a.reverse     # [4, 3, 2, 1, 0]
4.downto(0).to_a        # [4, 3, 2, 1, 0]
10.step(0, -2).to_a     # [10, 8, 6, 4, 2]
```

### Boolean

#### literal

```ruby
t = true
f = false
```

#### negation

```ruby
!true           # false
```

#### logical and

```ruby
true && false   # false
```

#### logical or

```ruby
true || false   # true
```

#### truthy and falsy values

```ruby
# Only false and nil are falsy; 0 and "" are truthy
1 != 0               # explicit check for integer
!s.empty?            # explicit check for string
!arr.empty?          # explicit check for array
```

#### conversion

```ruby
1 != 0         # to Boolean
true.to_s      # "true"
!!1            # true
```

### None / null

Ruby uses `nil` for absence.

#### literal

```ruby
x = nil
```

#### null check

```ruby
if x.nil?
  # ...
end
if x
  # x is present and truthy
end
```

#### optional access

```ruby
x&.length          # safe navigation
x&.upcase
x || 0             # provide default
```

## Composite types

### String

#### literal

```ruby
s = "hello"
s = 'hello'
s = "multiline\nstring"
```

#### length

```ruby
s.length
s.size
```

#### access

```ruby
s[0]     # first char
s[-1]    # last char
```

#### slice

```ruby
s[1, 2]   # 2 chars from index 1
s[1..2]   # chars 1..2 inclusive
s[2..]    # from index 2 to end
```

#### concatenation

```ruby
s + " world"
s << " world"
["hello", "world"].join(" ")
```

#### interpolation

```ruby
"Hello, #{name}"
"Hello, #{name.length}"
```

#### search

```ruby
s.include?("hello")
s.index("lo")           # returns index or nil
s.start_with?("he")
s.end_with?("lo")
```

#### split and join

```ruby
s.split(",")
["a", "b", "c"].join("-")
```

#### trim

```ruby
s.strip
s.lstrip
s.rstrip
```

#### case

```ruby
s.upcase
s.downcase
s.capitalize
```

#### replace

```ruby
s.gsub("old", "new")   # all occurrences
s.sub("old", "new")    # first occurrence only
```

#### justify

```ruby
s.rjust(10)    # right justify
s.ljust(10)    # left justify
s.center(10)   # center
```

#### format

```ruby
"Hello, %s!" % name
format("Hello, %s!", name)
"%.2f" % 3.14159   # "3.14"
"%05d" % 42        # "00042"
```

### Complex
#### operations

```ruby
z = Complex(1, 2)
c = Complex(1, 2)
z.real     # 1.0
z.imag     # 2.0
z.conj     # 1 - 2i
z.abs      # magnitude
z + c
z * c
```

### Date
#### now

```ruby
require "date"
Date.today   # => #<Date: 2026-10-13>
```
#### format

```ruby
Date.today.strftime("%Y-%m-%d")
```
### Datetime
#### now

```ruby
require "date"
DateTime.now
```
#### format

```ruby
DateTime.now.strftime("%Y-%m-%d %H:%M:%S")
```
### Decimal
#### literal

```ruby
require "bigdecimal"
BigDecimal("0.1") + BigDecimal("0.2")
```
#### precision

```ruby
BigDecimal("1").div(BigDecimal("7"), 6)
```
## Type system

### type hints

Ruby is dynamically typed; types are documented by convention.

#### variable

```ruby
name = "Alice"     # String
age = 30           # Integer
scores = [1, 2, 3] # Array
```

#### nullable

```ruby
name = nil   # any variable may hold nil
```

#### function

```ruby
def greet(name)
  "Hello, #{name}"
end

def divide(a, b)
  return nil if b.zero?
  a / b.to_f
end
```

#### list of elements

```ruby
names = ["Alice", "Bob"]
scores = [1, 2, 3]
matrix = [[1, 2], [3, 4]]
```

#### dict

```ruby
ages = { "Alice" => 30, "Bob" => 25 }
```

### Type operations
#### type alias

```ruby
# Ruby has no type aliases — document with comments
# Vector = array of numbers
v = [1.0, 2.0]
```

#### union

```ruby
# No static union types — any object works (duck typing)
```
#### intersection

```ruby
# No intersection types
```
#### literal types

```ruby
# No literal types
```
## Memory model

Ruby stores everything as an object; names are references to objects. Immediate values like integers and symbols are immutable, while arrays and hashes are shared by reference. There are no pointers, and memory is garbage collected.

### Memory

#### value vs reference

```ruby
a = 1
b = a            # Integer is immutable — behaves like a value
x = [1, 2]
y = x            # same array
y << 3           # x is also [1, 2, 3]
```

#### pointer / reference

```ruby
# No pointers — every name is a reference to an object
x = "hello"
y = x
y.equal?(x)      # true
```

#### ownership / borrowing

```ruby
# No ownership/borrowing — garbage collected
```

#### copy vs move

```ruby
a = [1, 2, [3, 4]]
b = a.dup          # shallow copy
c = Marshal.load(Marshal.dump(a))  # deep copy
```

#### immutability

```ruby
arr = [1, 2, 3].freeze
s = "hello".freeze
```

## Control Flow

### if

#### basic

```ruby
if x > 0
  puts "positive"
elsif x < 0
  puts "negative"
else
  puts "zero"
end
```

#### ternary

```ruby
s = x > 0 ? "positive" : "not positive"
```

#### as expression

```ruby
# if is an expression in Ruby
n = if ok then 1 else 0 end
n = ok ? 1 : 0
```

### match / when

#### basic

```ruby
case x
when 1 then "one"
when 2 then "two"
else "other"
end
```

#### guard

```ruby
case x
when ->(n) { n > 0 } then "positive"
when ->(n) { n < 0 } then "negative"
else "zero"
end
```

#### destructuring

```ruby
case cmd
in { action: "move", x:, y: }
  "move to (#{x}, #{y})"
in { action: "stop" }
  "stop"
else
  "unknown"
end
```

#### exhaustiveness

```ruby
# Ruby's case has no exhaustiveness checking — add an else
case color
when :red then "stop"
when :green then "go"
else "caution"
end
```

### for

#### basic

```ruby
for item in items
  puts item
end
items.each { |item| puts item }
```

#### with index

```ruby
items.each_with_index { |item, i| puts "#{i}: #{item}" }
items.each.with_index(1) { |item, i| puts "#{i}: #{item}" }
```

#### range loop

```ruby
(0..9).each { |i| puts i }
10.times { |i| puts i }
```

#### break & continue

```ruby
items.each do |x|
  next if x < 0   # continue
  break if x == 0
  puts x
end
```

#### for else

```ruby
# Ruby has no for-else. Use any? or a flag:
found = items.any? { |x| x == target }
puts "not found" unless found
```

### while

#### basic

```ruby
while x > 0
  puts x
  x -= 1
end
```

#### break & continue

```ruby
loop do
  x = next_value
  next if x < 0
  break if x == 0
  puts x
end
```

#### do while

```ruby
begin
  x = do_something
end while condition(x)
```

### Exception

#### try / except

```ruby
begin
  result = 1 / 0
rescue ZeroDivisionError
  puts "cannot divide by zero"
rescue => e
  puts "error: #{e.message}"
end
```

#### finally

```ruby
begin
  f = File.open("file.txt")
  # ...
ensure
  f&.close
end
```

#### else

```ruby
begin
  result = compute
rescue => e
  puts "error"
else
  puts "result is #{result}"
end
```

#### raise

```ruby
raise "invalid value"
raise ArgumentError, "invalid value"
```

#### custom exception

```ruby
class MyError < StandardError; end

raise MyError, "something went wrong"
```

#### context manager

```ruby
File.open("file.txt") do |f|
  content = f.read
end
# file auto-closed by the block
```

## Functions

### Function

#### definition

```ruby
def greet(name)
  "Hello, #{name}"
end
```

#### default parameters

```ruby
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}"
end
```

#### overloading

```ruby
# No overloading by signature — dispatch on type manually
def stringify(arg)
  arg.is_a?(Integer) ? "int: #{arg}" : "str: #{arg}"
end
```

#### varargs

```ruby
def sum_all(*args)
  args.sum
end
sum_all(1, 2, 3)
```

#### keyword arguments

```ruby
def configure(host: "localhost", port: 8080, debug: false)
  # ...
end
configure(host: "example.com", port: 3000, debug: true)
```

#### return

```ruby
def divide(a, b)
  return nil if b.zero?
  a / b.to_f
end
```

#### callable check

```ruby
greet.respond_to?(:call)   # true for lambdas/procs
greet.is_a?(Proc)
42.respond_to?(:call)      # false
```

### Lambda

#### basic

```ruby
square = ->(x) { x * x }
add = ->(a, b) { a + b }
square = lambda { |x| x * x }
```

#### as argument

```ruby
nums.map { |x| x * 2 }
nums.select { |x| x > 2 }
nums.sort_by { |x| -x }
```

#### receiver

```ruby
# Blocks and lambdas capture self from the enclosing scope
class Builder
  def initialize = @s = ""
  def append(t) = (@s << t; self)
end
Builder.new.append("Hello").append(" ").append("World")
```

## Classes

### Class

#### definition

```ruby
class Dog
end
```

#### constructor

```ruby
class Dog
  def initialize(name)
    @name = name
  end
end
```

#### instantiation

```ruby
dog = Dog.new("Fido")
```

#### attributes

```ruby
class Dog
  attr_accessor :name        # read/write
  attr_reader :age           # read-only
  @@species = "canine"       # class variable
end
```

#### method

```ruby
class Dog
  def bark
    "Woof!"
  end
end
```

#### inheritance

```ruby
class Animal
end

class Dog < Animal
end
```

#### multiple inheritance

```ruby
module A
  def f = "A"
end
module B
  def f = "B"
end
class C
  include A
  include B   # B wins — last included first
end
C.ancestors   # [C, B, A, Object, ...]
```

#### override

```ruby
class Dog < Animal
  def speak
    "Woof!"
  end
end
```

#### super

```ruby
class Dog < Animal
  def speak
    super + "Woof!"
  end
end
```

#### class method

```ruby
class Dog
  def self.from_birthyear(birthyear)
    new("dog-#{2025 - birthyear}")
  end
end
```

#### static method

```ruby
class Dog
  def self.is_canine(name)
    ["dog", "wolf"].include?(name)
  end
end
```

#### abstract

```ruby
class Animal
  def speak
    raise NotImplementedError, "subclass must implement speak"
  end
end
```

#### protocol / interface

```ruby
# Duck typing: an object qualifies by responding to the methods
def make_sound(s)
  s.speak
end
```

#### data class

```ruby
Dog = Struct.new(:name, :age)
Dog = Data.define(:name, :age)   # Ruby 3.2+
```

#### equality

```ruby
class Dog
  attr_reader :name
  def initialize(name) = @name = name
  def ==(other)
    other.is_a?(Dog) && name == other.name
  end
end
```

#### string representation

```ruby
class Dog
  def to_s
    "Dog(#{@name})"
  end
end
```

#### sealed class

```ruby
# Ruby has no sealed classes — document the closed set
Result = Data.define(:ok, :value)
```

#### private

```ruby
class Dog
  private

  def helper
    @secret = 42   # private method
  end
end
```

#### protected

```ruby
class Animal
  protected

  def feed; end   # visible to subclasses
end
```

#### public

```ruby
class Dog
  public

  attr_accessor :name   # public by default
end
```

### Interface & trait

Ruby has no `interface` or `trait` keyword — modules and mixins provide shared and default behavior.
#### definition

```ruby
# Duck typing — any object with speak() satisfies the interface
module Speakable
  def speak = raise NotImplementedError
end
```

#### default method

```ruby
module Speaker
  def greet = speak   # default method via module
end
```
### Enum

#### definition

```ruby
# Ruby has no enum — use a module of constants or a Hash
module Color
  RED = :red
  GREEN = :green
  AMBER = :amber
end
```

#### auto value

```ruby
# An array of symbols gives automatic values (the index)
COLORS = %i[red green amber]
COLORS.index(:amber)   # 2
```

#### access

```ruby
Color::RED
COLORS[0]   # :red
```

#### iteration

```ruby
COLORS.each { |c| puts c }
```

#### lookup

```ruby
NAME_TO_COLOR = { "RED" => Color::RED, "GREEN" => Color::GREEN, "AMBER" => Color::AMBER }
NAME_TO_COLOR["RED"]
```

#### match

```ruby
case color
when Color::RED then "stop"
when Color::GREEN then "go"
else "caution"
end
```

#### enum with data

```ruby
PLANETS = {
  mercury: { mass: 3.303e23, radius: 2.4397e6 },
  venus: { mass: 4.869e24, radius: 6.0518e6 },
}
```

## Collections

### List

Arrays are the default list.

#### literal

```ruby
a = [1, 2, 3]
```

#### size

```ruby
a.size
a.length
```

#### lookup

```ruby
a[0]       # first element
a[-1]      # last element
a.first
a.last
```

#### update

```ruby
a[0] = 10
a << 4
a.push(4)
```

#### is element present

```ruby
a.include?(3)
```

#### delete

```ruby
a.delete_at(0)   # by index
a.pop            # last element
a.delete(3)      # by value
```

#### merge

```ruby
a + [4, 5]
a.concat([4, 5])
```

#### slice

```ruby
a[1, 2]     # elements at index 1 and 2
a[1..2]     # inclusive range
```

#### reversed

```ruby
a.reverse
```

#### map

```ruby
a.map { |x| x * 2 }
```

#### filter

```ruby
a.select { |x| x > 0 }
```

### Dictionary

`Hash` for key-value storage.

#### literal

```ruby
d = { t: 1, f: 0 }
d = { "t" => 1, "f" => 0 }
```

#### size

```ruby
d.size
```

#### lookup

```ruby
d[:t]           # nil if absent
d.fetch(:t)     # raises KeyError if absent
```

#### update

```ruby
d[:u] = -1
d.store(:u, -1)
```

#### is key present

```ruby
d.key?(:c)
d.has_key?(:c)
```

#### delete

```ruby
v = d.delete(:t)   # nil if absent
```

#### from array of pairs

```ruby
pairs = [["t", 1], ["f", 0]]
d = pairs.to_h
```

#### merge

```ruby
d.merge(u: -1)
d.merge!({ u: -1 })
```

#### invert

```ruby
d.invert
```

#### keys and values as arrays

```ruby
d.keys
d.values
```

### Set

```ruby
require 'set'
```

#### literal

```ruby
s = Set[1, 2, 3]
s = Set.new([1, 2, 3])
```

#### size

```ruby
s.size
```

#### add

```ruby
s.add(4)
s << 4
```

#### is element present

```ruby
s.include?(3)
```

#### delete

```ruby
s.delete(3)
```

#### from array

```ruby
a = [1, 2, 3, 2]
s = Set.new(a)   # Set {1, 2, 3}
```

#### merge

```ruby
s | other         # union
s & other         # intersection
s - other         # difference
s.merge(other)    # in-place union
```

## Iterator and generator

### Iterator

#### chain

```ruby
a = ["a", "b", "c"] + ["d", "e"]
["a", "b", "c"].concat(["d", "e"])
```

#### take

```ruby
arr.first(4)
arr.take(4)
```

#### drop

```ruby
arr.drop(3)
```

#### head

```ruby
arr.take(3)
arr.first(3)
```

#### takewhile

```ruby
[1, 2, 3, 1, 2].take_while { |x| x < 3 }   # [1, 2]
```

#### dropwhile

```ruby
[1, 2, 3, 1, 2].drop_while { |x| x < 3 }   # [3, 1, 2]
```

#### zip

```ruby
["a", "b", "c"].zip(["1", "2", "3"])
# [["a", "1"], ["b", "2"], ["c", "3"]]
```

#### enumerate

```ruby
["a", "b", "c"].each_with_index { |item, i| puts "#{i + 1} #{item}" }
["a", "b", "c"].each.with_index(1) { |item, i| puts "#{i} #{item}" }
```

#### flatten

```ruby
[[1, 2], [3, 4]].flatten   # [1, 2, 3, 4]
```

#### count

```ruby
(10..).first(2)          # [10, 11]  (endless range)
10.step(by: 2).first(3)  # [10, 12, 14]
```

#### cycle

```ruby
["red", "green", "blue"].cycle.first(5)
# ["red", "green", "blue", "red", "green"]
```

#### chunked

```ruby
"ABCDEFG".chars.each_slice(3).map(&:join)
# ["ABC", "DEF", "G"]
```

#### groupby

```ruby
cities = [["NYC", "NY"], ["LA", "CA"], ["SF", "CA"], ["Buffalo", "NY"]]
cities.group_by { |name, state| state }
```

#### generator

```ruby
fib = Enumerator.new do |y|
  a, b = 0, 1
  loop do
    y << a
    a, b = b, a + b
  end
end

fib.first(10)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```






