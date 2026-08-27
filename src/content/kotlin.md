# Kotlin

## Collections

### List

#### literal

```kotlin
val a = listOf(1, 2, 3)
```

#### size

```kotlin
a.size
```

#### lookup

```kotlin
a[0]       // first element
a.last()   // last element
```

#### update

```kotlin
val a = mutableListOf(1, 2, 3)
a[0] = 10
a.add(4)
```

#### is element present

```kotlin
3 in a
a.contains(3)
```

#### delete

```kotlin
a.removeAt(0)   // by index
a.remove(3)     // by value, returns false if absent
```

#### merge

```kotlin
a + listOf(4, 5)
a.addAll(listOf(4, 5))
```

#### slice

```kotlin
a.slice(1..2)   // inclusive: elements at index 1 and 2
a.slice(1..<3)   // exlusive: elements at index 1 and 2
a.slice(0..a.lastIndex step 2)
```

#### reversed

```kotlin
a.reversed()
a.asReversed()  // view, no copy
```

#### map

```kotlin
a.map { it * 2 }
```

#### filter

```kotlin
a.filter { it > 0 }
```

### Dictionary

`Map<K, V>` is not an inheritor of the Collection interface; however, it's a Kotlin collection type as well

#### literal

```kotlin
val d = mapOf('t' to 1, 'f' to 0)
```

#### size

```kotlin
d.size
```

#### lookup

```kotlin
d['t']  // may return null
d.get('t')  // may return null
```

#### update
```kotlin
val d = mutalbleMapOf('t' to 1, 'f' to 0)

d['u'] = -1
d.put('u', -1)
``` 

#### is key present

```kotlin
'c' in d
d.contains('c')
```

#### delete

```kotlin
v = d.remove('t')  // return None if t is absent
```

#### from array of pairs

```kotlin
val keys = listOf('t', 'f')
val values = listOf(1, 0)
val d = (keys zip values).map { it.first to it.second }.toMap()
```

#### merge

```kotlin
d.putAll(mapOf('u' to -1))
```

#### invert

```kotlin
d.map { it.value to it.key }.toMap()
```

#### keys and values as arrays

`keys` and `values` returns the set of keys and values respectively.
