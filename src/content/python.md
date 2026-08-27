
# Kotlin

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
