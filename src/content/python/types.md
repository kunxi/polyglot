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