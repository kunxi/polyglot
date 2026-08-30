# Collections and Iterators

## List

### literal

```python
a = [1, 2, 3]
```

### size

```python
len(a)
```

### lookup

```python
a[0]  # first element
a[-1] # last element
```

### update

```python
a[0] = 10
a.append(4)
```

### is element present

```python
3 in a
```

### delete

```python
del a[0]        # by index
a.pop()         # last element
a.remove(3)     # by value, raises ValueError if absent
```

### merge

```python
a + [4, 5]
a.extend([4, 5])
```

### slice

```python
a[1:3]          # exclusive, elements at index 1 and 2
a[::2]          # every other element
```

### reversed

```python
a[::-1]         # reversed slice
list(reversed(a))
```

### map

```python
[x * 2 for x in a]
```

### filter

```python
[x for x in a if x > 0]
```

## Dictionary

### literal

```python
d = {'t': 1, 'f': 0}
```

### size

```python
len(d)
```

### lookup

```python
d['t']  # may raise KeyError
d.get('foo')  # returns None
```

### update

```python
d['u'] = -1

d.update(u=-1)
```

### is key present

```python
'y' in d
d.__contains__('y')
```

### delete
```python
del d['t']  # may raise KeyError
v = d.pop('t')  # may raise KeyError
v = d.pop('t', None)  # returns None if t is absent
```

### from array of pairs

```python
a = [['a', 1], ['b', 2], ['c', 3]]
d = dict(a)

a = ['a', 1, 'b', 2, 'c', 3]
d = dict(zip(a[::2], a[1::2]))
```

### merge

```python
d.update({'a': 1, 'b': 2})
d.udpate(a=1, b=2)
```

### invert

```python
to_sym = {v: k for k, v in d.items()}
```

### keys and values as arrays

`keys()` and `values()` return iterators
in Python 3 and lists in Python 2

```python
list(d.keys())
list(d.values())
```

## Set

### literal

```python
s = {1, 2, 3}
```

### size

```python
len(s)
```

### add

```python
s.add(4)
```

### is element present

```python
3 in s
```

### delete

```python
s.remove(3)     # raises KeyError if absent
s.discard(3)    # no error if absent
s.pop()         # removes and returns arbitrary element
```

### from array

```python
a = [1, 2, 3, 2]
s = set(a)      # {1, 2, 3}
```

### merge

```python
s | {4, 5}           # union
s & {2, 3}           # intersection
s - {2}              # difference
s ^ {2, 3, 4}        # symmetric difference
s.update({4, 5})     # in-place union
```

## Iterator

### chain

```python
from itertools import chain
list(chain('abc', 'de'))   # ['a', 'b', 'c', 'd', 'e']
```

### take / drop

```python
from itertools import islice
list(islice(range(1, 10), 4))       # [1, 2, 3, 4]
list(islice(range(1, 10), 2, 5))    # [3, 4, 5]
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
