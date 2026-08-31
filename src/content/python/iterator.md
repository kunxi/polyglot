# Iterator and generator

## Iterator

### chain

```python
from itertools import chain
list(chain('abc', 'de'))   # ['a', 'b', 'c', 'd', 'e']
```

### take

```python
from itertools import islice
list(islice(range(1, 10), 4))       # [1, 2, 3, 4]
```

### drop

```python
list(islice(range(1, 10), 3, None))  # [4, 5, 6, 7, 8, 9]
```

### head

```python
from itertools import islice
list(islice(range(1, 10), 3))        # [1, 2, 3]
```


### takewhile

```python
from itertools import takewhile
list(takewhile(lambda x: x < 3, [1, 2, 3, 1, 2]))  # [1, 2]
```

### dropwhile

```python
from itertools import dropwhile
list(dropwhile(lambda x: x < 3, [1, 2, 3, 1, 2]))  # [3, 1, 2]
```

### zip

```python
list(zip('abc', '123'))
# [('a', '1'), ('b', '2'), ('c', '3')]

from itertools import zip_longest
list(zip_longest('ab', '123', fillvalue='-'))
# [('a', '1'), ('b', '2'), ('-', '3')]
```

### enumerate

```python
for i, item in enumerate(['a', 'b', 'c'], start=1):
    print(i, item)                # 1 a, 2 b, 3 c
```

### flatten

```python
from itertools import chain
def flatten(nested):
    return chain.from_iterable(nested)
list(flatten([[1, 2], [3, 4]]))   # [1, 2, 3, 4]
```

### count

```python
from itertools import count
next(count(10))        # 10
next(count(10, 2))     # 10, then 12, 14, ...
```

### cycle

```python
from itertools import cycle
colors = cycle(['red', 'green', 'blue'])
[next(colors) for _ in range(5)]   # ['red', 'green', 'blue', 'red', 'green']
```

### chunked

```python
# Python 3.12+ has itertools.batched
from itertools import batched
list(batched('ABCDEFG', 3))        # [('A', 'B', 'C'), ('D', 'E', 'F'), ('G',)]
```

### groupby

```python
from itertools import groupby

data = [('NYC', 'NY'), ('LA', 'CA'), ('SF', 'CA'), ('Buffalo', 'NY')]
data.sort(key=lambda x: x[1])  # groupby requires sorted input
for state, cities in groupby(data, key=lambda x: x[1]):
    print(state, list(cities))
# CA [('LA', 'CA'), ('SF', 'CA')]
# NY [('NYC', 'NY'), ('Buffalo', 'NY')]
```

### generator

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
