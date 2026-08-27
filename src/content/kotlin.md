# Kotlin

## Collections

### Dictionary

`Map<K, V>` is not an inheritor of the Collection interface; however, it's a Kotlin collection type as well

#### literal

```kotlin
val d = mapOf('t' to 1, 'f' to 0)
```

#### size

`d.size`

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
