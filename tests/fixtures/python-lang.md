# Python

## Primitive types

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

## Collections

Python's built-in collections — `list`, `dict`, and `set` — are mutable and store object references.

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
a[0]   # first element
a[-1]  # last element
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
d['t']          # may raise KeyError
d.get('foo')    # returns None
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
