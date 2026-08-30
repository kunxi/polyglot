# Classes

## Class

### definition

```python
class Dog:
    def __init__(self, name):
        self.name = name
```

### constructor

```python
def __init__(self, name):
    self.name = name
```

### instantiation

```python
dog = Dog('Fido')
```

### attributes

```python
self.name = name      # instance attribute
Dog.species = 'canine'  # class attribute
```

### method

```python
def bark(self):
    return 'Woof!'
```

### inheritance

```python
class Animal:
    pass

class Dog(Animal):
    pass
```

### override

```python
class Dog(Animal):
    def speak(self):
        return 'Woof!'
```

### super

```python
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)
```

### class method

```python
@classmethod
def from_birthyear(cls, birthyear):
    return cls(2025 - birthyear)
```

### static method

```python
@staticmethod
def is_canine(name):
    return name in ('dog', 'wolf')
```

### abstract

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass
```

### interface

```python
# Python uses duck typing — no formal interface.
# ABCs with abstract methods are the closest equivalent.
```

### data class

```python
from dataclasses import dataclass

@dataclass
class Dog:
    name: str
    age: int
```

### equality

```python
def __eq__(self, other):
    return self.name == other.name
```

### string representation

```python
def __str__(self):
    return self.name

def __repr__(self):
    return f'Dog({self.name!r})'
```

### sealed class

```python
# Python 3.12+ has a typing.sealed decorator
from typing import sealed

@sealed
class Result: ...

class Success(Result): ...
class Failure(Result): ...
```

### private

```python
class Dog:
    def __init__(self):
        self._secret = 42   # convention only, not enforced
        self.__mangled = 1  # name-mangled to _Dog__mangled
```

### protected

```python
class Animal:
    _name = ""          # single underscore = protected by convention
    def _feed(self): ...

class Dog(Animal):
    def use_name(self):
        return self._name
```

### public

```python
class Dog:
    name = "Fido"   # everything is public by default
```

## Enum

### definition

```python
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    AMBER = 3
```

### auto value

```python
from enum import Enum, auto

class Color(Enum):
    RED = auto()
    GREEN = auto()
    AMBER = auto()
```

### access

```python
Color.RED           # <Color.RED: 1>
Color.RED.name      # 'RED'
Color.RED.value     # 1
```

### iteration

```python
list(Color)         # [<Color.RED: 1>, ...]
```

### lookup

```python
Color['RED']        # <Color.RED: 1>
Color(1)            # <Color.RED: 1>
```

### match

```python
match color:
    case Color.RED:
        return 'stop'
    case Color.GREEN:
        return 'go'
    case _:          # AMBER or unknown fallback
        return 'caution'
```

### enum with data

```python
class Planet(Enum):
    MERCURY = (3.303e+23, 2.4397e6)
    VENUS   = (4.869e+24, 6.0518e6)

    def __init__(self, mass, radius):
        self.mass = mass
        self.radius = radius
```
