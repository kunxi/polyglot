# Types

## Number

### integer

```python
a = 42
b = -7
c = int('42')
```

### float

```python
x = 3.14
y = 1.5e-3
z = float('3.14')
```

### arithmetic

```python
a + b      # addition
a - b      # subtraction
a * b      # multiplication
a / b      # division, always returns float
a // b     # floor division
a % b      # modulo
a ** b     # exponentiation
```

### divmod

```python
q, r = divmod(13, 5)   # q = 2, r = 3
```

### rounding

```python
round(3.14)         # 3
round(3.14, 1)      # 3.1
int(3.9)            # 3 (truncates)
```

### min max abs

```python
min(a, b)
max(a, b)
abs(-42)
```

### range

```python
range(5)          # 0, 1, 2, 3, 4
range(2, 5)       # 2, 3, 4
range(0, 10, 2)   # 0, 2, 4, 6, 8
list(range(3))    # [0, 1, 2]
```

### descending range

```python
range(4, -1, -1)     # 4, 3, 2, 1, 0
range(10, 0, -2)     # 10, 8, 6, 4, 2
list(reversed(range(5)))  # [4, 3, 2, 1, 0]
```

### complex

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

### random

```python
import random
random.randint(1, 6)
random.uniform(0, 1)
```

## String

### literal

```python
s = "hello"
s = 'hello'
s = """multiline
string"""
```

### length

```python
len(s)
```

### access

```python
s[0]        # first char
s[-1]       # last char
```

### slice

```python
s[1:3]      # exclusive end
s[::2]      # every other char
s[::-1]     # reversed
```

### concatenation

```python
s + " world"
" ".join(["hello", "world"])
```

### interpolation

```python
f"Hello, {name}"
"Hello, {}".format(name)
"Hello, %s" % name
```

### search

```python
"hello" in s
s.find("lo")          # returns index or -1
s.index("lo")         # raises ValueError if absent
s.startswith("he")
s.endswith("lo")
```

### split and join

```python
s.split(",")
"-".join(["a", "b", "c"])
```

### trim

```python
s.strip()
s.lstrip()
s.rstrip()
```

### case

```python
s.upper()
s.lower()
s.capitalize()
s.title()
```

### replace

```python
s.replace("old", "new")
s.replace("old", "new", 1)   # first occurrence only
```

### justify

```python
s.ljust(10)          # left justify, pad to width 10
s.rjust(10)          # right justify
s.center(10)         # center
s.zfill(5)           # pad with leading zeros
```

## Boolean

### literal

```python
t = True
f = False
```

### negation

```python
not True        # False
```

### logical and

```python
True and False  # False
```

### logical or

```python
True or False   # True
```

### truthy and falsy values

```python
bool(0)         # False
bool(1)         # True
bool("")        # False
bool("hello")   # True
bool([])        # False
bool(None)      # False
```

### conversion

```python
bool(1)         # True
int(True)       # 1
str(True)       # 'True'
```

## None / null

`None` is a singleton; all uninitialized variables in Python
may hold any type or `None` at any time — no compile-time null safety.

### literal

```python
x = None
```

### null check

```python
if x is None:
    ...
if x is not None:
    ...
```

### optional access

```python
if x is not None:
    x.do_something()
```

## type hints

Python type hints are optional and not enforced at runtime.

### variable

```python
name: str = "Alice"
age: int = 30
scores: list[int] = [1, 2, 3]
```

### nullable

```python
name: str | None = None       # Python 3.10+
from typing import Optional
name: Optional[str] = None     # pre-3.10
```

### function

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

def divide(a: int, b: int) -> float | None:
    if b == 0:
        return None
    return a / b
```

### list of elements

```python
names: list[str] = ["Alice", "Bob"]
scores: list[int] = [1, 2, 3]
matrix: list[list[int]] = [[1, 2], [3, 4]]
```

### dict

```python
ages: dict[str, int] = {"Alice": 30, "Bob": 25}
```

### type alias

```python
Vector = list[float]
def scale(scalar: float, v: Vector) -> Vector:
    return [scalar * x for x in v]
```

### protocol / interface

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