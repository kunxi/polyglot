# Python

## Types

### Number

#### integer

```python
a = 42
b = -7
c = int('42')
```

#### float

```python
x = 3.14
y = 1.5e-3
z = float('3.14')
```

#### arithmetic

```python
a + b      # addition
a - b      # subtraction
a * b      # multiplication
a / b      # division, always returns float
a // b     # floor division
a % b      # modulo
a ** b     # exponentiation
```

#### divmod

```python
q, r = divmod(13, 5)   # q = 2, r = 3
```

#### rounding

```python
round(3.14)         # 3
round(3.14, 1)      # 3.1
int(3.9)            # 3 (truncates)
```

#### min max abs

```python
min(a, b)
max(a, b)
abs(-42)
```

#### range

```python
range(5)          # 0, 1, 2, 3, 4
range(2, 5)       # 2, 3, 4
range(0, 10, 2)   # 0, 2, 4, 6, 8
list(range(3))    # [0, 1, 2]
```

#### descending range

```python
range(4, -1, -1)     # 4, 3, 2, 1, 0
range(10, 0, -2)     # 10, 8, 6, 4, 2
list(reversed(range(5)))  # [4, 3, 2, 1, 0]
```

#### complex

```python
z = 1 + 2j
c = complex(1, 2)
z.real          # 1.0
z.imag          # 2.0
z.conjugate()   # (1-2j)
abs(z)          # 2.236..., magnitude
z1 + z2
z1 * z2
```

#### random

```python
import random
random.randint(1, 6)
random.uniform(0, 1)
```

### String

#### literal

```python
s = "hello"
s = 'hello'
s = """multiline
string"""
```

#### length

```python
len(s)
```

#### access

```python
s[0]        # first char
s[-1]       # last char
```

#### slice

```python
s[1:3]      # exclusive end
s[::2]      # every other char
s[::-1]     # reversed
```

#### concatenation

```python
s + " world"
" ".join(["hello", "world"])
```

#### interpolation

```python
f"Hello, {name}"
"Hello, {}".format(name)
"Hello, %s" % name
```

#### search

```python
"hello" in s
s.find("lo")          # returns index or -1
s.index("lo")         # raises ValueError if absent
s.startswith("he")
s.endswith("lo")
```

#### split and join

```python
s.split(",")
"-".join(["a", "b", "c"])
```

#### trim

```python
s.strip()
s.lstrip()
s.rstrip()
```

#### case

```python
s.upper()
s.lower()
s.capitalize()
s.title()
```

#### replace

```python
s.replace("old", "new")
s.replace("old", "new", 1)   # first occurrence only
```

#### justify

```python
s.ljust(10)          # left justify, pad to width 10
s.rjust(10)          # right justify
s.center(10)         # center
s.zfill(5)           # pad with leading zeros
```

### Boolean

#### literal

```python
t = True
f = False
```

#### negation

```python
not True        # False
```

#### logical and

```python
True and False  # False
```

#### logical or

```python
True or False   # True
```

#### truthy and falsy values

```python
bool(0)         # False
bool(1)         # True
bool("")        # False
bool("hello")   # True
bool([])        # False
bool(None)      # False
```

#### conversion

```python
bool(1)         # True
int(True)       # 1
str(True)       # 'True'
```

### None / null

`None` is a singleton; all uninitialized variables in Python
may hold any type or `None` at any time — no compile-time null safety.

#### literal

```python
x = None
```

#### null check

```python
if x is None:
    ...
if x is not None:
    ...
```

#### optional access

```python
if x is not None:
    x.do_something()
```

### type hints

Python type hints are optional and not enforced at runtime.

#### variable

```python
name: str = "Alice"
age: int = 30
scores: list[int] = [1, 2, 3]
```

#### nullable

```python
name: str | None = None       # Python 3.10+
from typing import Optional
name: Optional[str] = None     # pre-3.10
```

#### function

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

def divide(a: int, b: int) -> float | None:
    if b == 0:
        return None
    return a / b
```

#### list of elements

```python
names: list[str] = ["Alice", "Bob"]
scores: list[int] = [1, 2, 3]
matrix: list[list[int]] = [[1, 2], [3, 4]]
```

#### dict

```python
ages: dict[str, int] = {"Alice": 30, "Bob": 25}
```

#### type alias

```python
Vector = list[float]
def scale(scalar: float, v: Vector) -> Vector:
    return [scalar * x for x in v]
```

#### protocol / interface

```python
from typing import Protocol

class Speaker(Protocol):
    def speak(self) -> str: ...

class Dog:
    def speak(self) -> str:
        return "Woof!"

def make_sound(s: Speaker) -> str:
    return s.speak()
```

## Control Flow

### if

#### basic

```python
if x > 0:
    print("positive")
elif x < 0:
    print("negative")
else:
    print("zero")
```

#### ternary

```python
s = "positive" if x > 0 else "not positive"
```

#### as expression

```python
# Python has no if-expression block —
# ternary is the closest.
n = 1 if ok else 0
```

### match / when

#### basic

```python
match x:
    case 1:
        return "one"
    case 2:
        return "two"
    case _:
        return "other"
```

#### guard

```python
match point:
    case (x, y) if x == y:
        return "diagonal"
    case (x, y):
        return f"({x}, {y})"
```

#### destructuring

```python
match cmd:
    case {"action": "move", "x": x, "y": y}:
        return f"move to ({x}, {y})"
    case {"action": "stop"}:
        return "stop"
```

#### exhaustiveness

```python
# Python does not enforce exhaustiveness.
# The wildcard _ case is the safest fallback.
```

### for

#### basic

```python
for item in items:
    print(item)
```

#### with index

```python
for i, item in enumerate(items):
    print(i, item)
```

#### range loop

```python
for i in range(10):
    print(i)
```

#### break & continue

```python
for x in items:
    if x < 0:
        continue
    if x == 0:
        break
    print(x)
```

#### for else

```python
for item in items:
    if item == target:
        print("found")
        break
else:
    print("not found")
```

### while

#### basic

```python
while x > 0:
    print(x)
    x -= 1
```

#### break & continue

```python
while True:
    x = next_value()
    if x < 0:
        continue
    if x == 0:
        break
    print(x)
```

#### do while

```python
# Python has no do-while. Simulate with while True + break:
while True:
    x = do_something()
    if not condition(x):
        break
```

### Exception

#### try / except

```python
try:
    result = 1 / 0
except ZeroDivisionError:
    print("cannot divide by zero")
except (TypeError, ValueError) as e:
    print(f"error: {e}")
```

#### finally

```python
try:
    f = open("file.txt")
    ...
finally:
    f.close()
```

#### else

```python
try:
    result = compute()
except ValueError:
    print("bad input")
else:
    print(f"result is {result}")
```

#### raise

```python
raise ValueError("invalid value")
raise  # re-raise current exception
```

#### custom exception

```python
class MyError(Exception):
    pass

raise MyError("something went wrong")
```

#### context manager

```python
with open("file.txt") as f:
    content = f.read()
# file auto-closed
```

## Functions

### Function

Python does not support function overloading by signature — only the last definition wins. Use default parameters, `*args`, or `@singledispatch` instead.

#### definition

```python
def greet(name):
    return f"Hello, {name}"
```

#### default parameters

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}"
```

#### overloading

```python
# No true overloading — use singledispatch
from functools import singledispatch

@singledispatch
def stringify(arg):
    return str(arg)

@stringify.register
def _(arg: int) -> str:
    return f"int: {arg}"

@stringify.register
def _(arg: str) -> str:
    return f"str: {arg}"
```

#### varargs

```python
def sum_all(*args):
    return sum(args)

def print_kwargs(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}={v}")
```

#### keyword arguments

```python
def configure(host="localhost", port=8080, debug=False):
    pass

configure(port=3000, debug=True)
```

#### return

```python
def divide(a, b):
    if b == 0:
        return None
    return a / b
```

#### callable check

```python
callable(greet)      # True
callable(42)         # False
```

### Lambda

#### basic

```python
square = lambda x: x * x
add = lambda a, b: a + b
```

#### as argument

```python
# lambdas should be pure — avoid side effects
nums = [1, 2, 3, 4]
sorted(nums, key=lambda x: -x)
list(map(lambda x: x * 2, nums))
list(filter(lambda x: x > 2, nums))
```

#### receiver

```python
# Python has no lambda receiver concept.
# Closest analogue: context managers (with)
# or methods that return self for chaining.

class Builder:
    def a(self) -> "Builder":
        # ...
        return self
    def b(self) -> "Builder":
        # ...
        return self
```

## Classes

### Class

#### definition

```python
class Dog:
    def __init__(self, name):
        self.name = name
```

#### constructor

```python
def __init__(self, name):
    self.name = name
```

#### instantiation

```python
dog = Dog('Fido')
```

#### attributes

```python
self.name = name      # instance attribute
Dog.species = 'canine'  # class attribute
```

#### method

```python
def bark(self):
    return 'Woof!'
```

#### inheritance

```python
class Animal:
    pass

class Dog(Animal):
    pass
```

#### override

```python
class Dog(Animal):
    def speak(self):
        return 'Woof!'
```

#### super

```python
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)
```

#### class method

```python
@classmethod
def from_birthyear(cls, birthyear):
    return cls(2025 - birthyear)
```

#### static method

```python
@staticmethod
def is_canine(name):
    return name in ('dog', 'wolf')
```

#### abstract

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass
```

#### interface

```python
# Python uses duck typing — no formal interface.
# ABCs with abstract methods are the closest equivalent.
```

#### data class

```python
from dataclasses import dataclass

@dataclass
class Dog:
    name: str
    age: int
```

#### equality

```python
def __eq__(self, other):
    return self.name == other.name
```

#### string representation

```python
def __str__(self):
    return self.name

def __repr__(self):
    return f'Dog({self.name!r})'
```

#### sealed class

```python
# Python 3.12+ has a typing.sealed decorator
from typing import sealed

@sealed
class Result: ...

class Success(Result): ...
class Failure(Result): ...
```

#### private

```python
class Dog:
    def __init__(self):
        self._secret = 42   # convention only, not enforced
        self.__mangled = 1  # name-mangled to _Dog__mangled
```

#### protected

```python
class Animal:
    _name = ""          # single underscore = protected by convention
    def _feed(self): ...

class Dog(Animal):
    def use_name(self):
        return self._name
```

#### public

```python
class Dog:
    name = "Fido"   # everything is public by default
```

### Enum

#### definition

```python
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    AMBER = 3
```

#### auto value

```python
from enum import Enum, auto

class Color(Enum):
    RED = auto()
    GREEN = auto()
    AMBER = auto()
```

#### access

```python
Color.RED           # <Color.RED: 1>
Color.RED.name      # 'RED'
Color.RED.value     # 1
```

#### iteration

```python
list(Color)         # [<Color.RED: 1>, ...]
```

#### lookup

```python
Color['RED']        # <Color.RED: 1>
Color(1)            # <Color.RED: 1>
```

#### match

```python
match color:
    case Color.RED:
        return 'stop'
    case Color.GREEN:
        return 'go'
    case _:          # AMBER or unknown fallback
        return 'caution'
```

#### enum with data

```python
class Planet(Enum):
    MERCURY = (3.303e+23, 2.4397e6)
    VENUS   = (4.869e+24, 6.0518e6)

    def __init__(self, mass, radius):
        self.mass = mass
        self.radius = radius
```

## Collections

### List

#### literal

```python
a = [1, 2, 3]
```

#### size

```python
len(a)
```

#### lookup

```python
a[0]  # first element
a[-1] # last element
```

#### update

```python
a[0] = 10
a.append(4)
```

#### is element present

```python
3 in a
```

#### delete

```python
del a[0]        # by index
a.pop()         # last element
a.remove(3)     # by value, raises ValueError if absent
```

#### merge

```python
a + [4, 5]
a.extend([4, 5])
```

#### slice

```python
a[1:3]          # exclusive, elements at index 1 and 2
a[::2]          # every other element
```

#### reversed

```python
a[::-1]         # reversed slice
list(reversed(a))
```

#### map

```python
[x * 2 for x in a]
```

#### filter

```python
[x for x in a if x > 0]
```

### Dictionary

#### literal

```python
d = {'t': 1, 'f': 0}
```

#### size

```python
len(d)
```

#### lookup

```python
d['t']  # may raise KeyError
d.get('foo')  # returns None
```

#### update

```python
d['u'] = -1

d.update(u=-1)
```

#### is key present

```python
'y' in d
d.__contains__('y')
```

#### delete
```python
del d['t']  # may raise KeyError
v = d.pop('t')  # may raise KeyError
v = d.pop('t', None)  # returns None if t is absent
```

#### from array of pairs

```python
a = [['a', 1], ['b', 2], ['c', 3]]
d = dict(a)

a = ['a', 1, 'b', 2, 'c', 3]
d = dict(zip(a[::2], a[1::2]))
```

#### merge

```python
d.update({'a': 1, 'b': 2})
d.udpate(a=1, b=2)
```

#### invert

```python
to_sym = {v: k for k, v in d.items()}
```

#### keys and values as arrays

`keys()` and `values()` return iterators
in Python 3 and lists in Python 2

```python
list(d.keys())
list(d.values())
```

### Set

#### literal

```python
s = {1, 2, 3}
```

#### size

```python
len(s)
```

#### add

```python
s.add(4)
```

#### is element present

```python
3 in s
```

#### delete

```python
s.remove(3)     # raises KeyError if absent
s.discard(3)    # no error if absent
s.pop()         # removes and returns arbitrary element
```

#### from array

```python
a = [1, 2, 3, 2]
s = set(a)      # {1, 2, 3}
```

#### merge

```python
s | {4, 5}           # union
s & {2, 3}           # intersection
s - {2}              # difference
s ^ {2, 3, 4}        # symmetric difference
s.update({4, 5})     # in-place union
```

## Iterator and generator

### Iterator

#### chain

```python
from itertools import chain
list(chain('abc', 'de'))   # ['a', 'b', 'c', 'd', 'e']
```

#### take

```python
from itertools import islice
list(islice(range(1, 10), 4))       # [1, 2, 3, 4]
```

#### drop

```python
list(islice(range(1, 10), 3, None))  # [4, 5, 6, 7, 8, 9]
```

#### head

```python
from itertools import islice
list(islice(range(1, 10), 3))        # [1, 2, 3]
```


#### takewhile

```python
from itertools import takewhile
list(takewhile(lambda x: x < 3, [1, 2, 3, 1, 2]))  # [1, 2]
```

#### dropwhile

```python
from itertools import dropwhile
list(dropwhile(lambda x: x < 3, [1, 2, 3, 1, 2]))  # [3, 1, 2]
```

#### zip

```python
list(zip('abc', '123'))
# [('a', '1'), ('b', '2'), ('c', '3')]

from itertools import zip_longest
list(zip_longest('ab', '123', fillvalue='-'))
# [('a', '1'), ('b', '2'), ('-', '3')]
```

#### enumerate

```python
for i, item in enumerate(['a', 'b', 'c'], start=1):
    print(i, item)                # 1 a, 2 b, 3 c
```

#### flatten

```python
from itertools import chain
def flatten(nested):
    return chain.from_iterable(nested)
list(flatten([[1, 2], [3, 4]]))   # [1, 2, 3, 4]
```

#### count

```python
from itertools import count
next(count(10))        # 10
next(count(10, 2))     # 10, then 12, 14, ...
```

#### cycle

```python
from itertools import cycle
colors = cycle(['red', 'green', 'blue'])
[next(colors) for _ in range(5)]   # ['red', 'green', 'blue', 'red', 'green']
```

#### chunked

```python
# Python 3.12+ has itertools.batched
from itertools import batched
list(batched('ABCDEFG', 3))        # [('A', 'B', 'C'), ('D', 'E', 'F'), ('G',)]
```

#### groupby

```python
from itertools import groupby

data = [('NYC', 'NY'), ('LA', 'CA'), ('SF', 'CA'), ('Buffalo', 'NY')]
data.sort(key=lambda x: x[1])  # groupby requires sorted input
for state, cities in groupby(data, key=lambda x: x[1]):
    print(state, list(cities))
# CA [('LA', 'CA'), ('SF', 'CA')]
# NY [('NYC', 'NY'), ('Buffalo', 'NY')]
```

#### generator

```python
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# take first 10
from itertools import islice
list(islice(fib(), 10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```
