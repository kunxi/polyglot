# Collections and Iterators

## List

### literal

```kotlin
val a = listOf(1, 2, 3)
```

### size

```kotlin
a.size
```

### lookup

```kotlin
a[0]       // first element
a.last()   // last element
```

### update

```kotlin
val a = mutableListOf(1, 2, 3)
a[0] = 10
a.add(4)
```

### is element present

```kotlin
3 in a
a.contains(3)
```

### delete

```kotlin
a.removeAt(0)   // by index
a.remove(3)     // by value, returns false if absent
```

### merge

```kotlin
a + listOf(4, 5)
a.addAll(listOf(4, 5))
```

### slice

```kotlin
a.slice(1..2)   // inclusive: elements at index 1 and 2
a.slice(1..<3)   // exlusive: elements at index 1 and 2
a.slice(0..a.lastIndex step 2)
```

### reversed

```kotlin
a.reversed()
a.asReversed()  // view, no copy
```

### map

```kotlin
a.map { it * 2 }
```

### filter

```kotlin
a.filter { it > 0 }
```

## Dictionary

`Map<K, V>` is not an inheritor of the Collection interface; however, it's a Kotlin collection type as well

### literal

```kotlin
val d = mapOf('t' to 1, 'f' to 0)
```

### size

```kotlin
d.size
```

### lookup

```kotlin
d['t']  // may return null
d.get('t')  // may return null
```

### update
```kotlin
val d = mutalbleMapOf('t' to 1, 'f' to 0)

d['u'] = -1
d.put('u', -1)
``` 

### is key present

```kotlin
'c' in d
d.contains('c')
```

### delete

```kotlin
v = d.remove('t')  // return None if t is absent
```

### from array of pairs

```kotlin
val keys = listOf('t', 'f')
val values = listOf(1, 0)
val d = (keys zip values).map { it.first to it.second }.toMap()
```

### merge

```kotlin
d.putAll(mapOf('u' to -1))
```

### invert

```kotlin
d.map { it.value to it.key }.toMap()
```

### keys and values as arrays

`keys` and `values` returns the set of keys and values respectively.

## Set

### literal

```kotlin
val s = setOf(1, 2, 3)
```

### size

```kotlin
s.size
```

### add

```kotlin
val s = mutableSetOf(1, 2, 3)
s.add(4)
```

### is element present

```kotlin
3 in s
s.contains(3)
```

### delete

```kotlin
s.remove(3)     // returns false if absent
```

### from array

```kotlin
val a = listOf(1, 2, 3, 2)
val s = a.toSet()     // {1, 2, 3}
```

### merge

```kotlin
s + setOf(4, 5)            // union
s.intersect(setOf(2, 3))   // intersection
s - setOf(2)               // difference
s.addAll(listOf(4, 5))     // in-place union
```

## Iterator

### chain

```kotlin
sequenceOf("abc", "de")
  .flatMap { it.toList() }
  .toList()
```

### take / drop

```kotlin
val s = (1..10).asSequence()
s.take(4).toList()           // [1, 2, 3, 4]
s.take(5).drop(2).toList()   // [3, 4, 5]
```

### takewhile

```kotlin
sequenceOf(1, 2, 3, 1, 2)
    .takeWhile { it < 3 }
    .toList()                 // [1, 2]
```

### dropwhile

```kotlin
sequenceOf(1, 2, 3, 1, 2)
    .dropWhile { it < 3 }
    .toList()                 // [3, 1, 2]
```

### zip

```kotlin
listOf('a', 'b', 'c').zip(listOf('1', '2', '3'))
// [(a, 1), (b, 2), (c, 3)]

// No bulitin zipLongest equivalent 
```

### enumerate

```kotlin
listOf('a', 'b', 'c').withIndex().forEach { (i, item) ->
    println("${i + 1} $item")  // 1 a, 2 b, 3 c
}
```

### flatten

```kotlin
listOf(listOf(1, 2), listOf(3, 4)).flatten()
// [1, 2, 3, 4]
```

### count

```kotlin
generateSequence(10) { it + 1 }      // 10, 11, 12, ...
generateSequence(10) { it + 2 }      // 10, 12, 14, ...
```

### cycle

```kotlin
// Kotlin has no built-in cycle — generate a repeating sequence
val colors = listOf("red", "green", "blue")
generateSequence(0) { (it + 1) % colors.size }
    .map { colors[it] }
    .take(5)
    .toList()  // [red, green, blue, red, green]
```

### chunked

```kotlin
"ABCDEFG".toList().chunked(3)
// [[A, B, C], [D, E, F], [G]]
```
