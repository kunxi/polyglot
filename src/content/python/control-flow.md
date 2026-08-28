# Python

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