# Functions

## Function

Python does not support function overloading by signature — only the last definition wins. Use default parameters, `*args`, or `@singledispatch` instead.

### definition

```python
def greet(name):
    return f"Hello, {name}"
```

### default parameters

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}"
```

### overloading

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

### varargs

```python
def sum_all(*args):
    return sum(args)

def print_kwargs(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}={v}")
```

### keyword arguments

```python
def configure(host="localhost", port=8080, debug=False):
    pass

configure(port=3000, debug=True)
```

### return

```python
def divide(a, b):
    if b == 0:
        return None
    return a / b
```

### callable check

```python
callable(greet)      # True
callable(42)         # False
```

## Lambda

### basic

```python
square = lambda x: x * x
add = lambda a, b: a + b
```

### as argument

```python
# lambdas should be pure — avoid side effects
nums = [1, 2, 3, 4]
sorted(nums, key=lambda x: -x)
list(map(lambda x: x * 2, nums))
list(filter(lambda x: x > 2, nums))
```

### receiver

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