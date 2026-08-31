# Iterator and generator

## Iterator

### chain

```kotlin
sequenceOf("abc", "de")
  .flatMap { it.toList() }
  .toList()
```

### take

```kotlin
val s = (1..10).asSequence()
s.take(4).toList()           // [1, 2, 3, 4]
```

### drop

```kotlin
s.drop(3).toList()           // [4, 5, 6, 7, 8, 9, 10]
```

### head

```kotlin
s.take(3).toList()           // [1, 2, 3]
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

### groupby

```kotlin
data class City(val name: String, val state: String)

val cities = listOf(
    City("NYC", "NY"), City("LA", "CA"),
    City("SF", "CA"), City("Buffalo", "NY")
)
cities.groupBy { it.state }
    .forEach { (state, group) -> println("$state $group") }
// CA [City(name=LA, state=CA), City(name=SF, state=CA)]
// NY [City(name=NYC, state=NY), City(name=Buffalo, state=NY)]
```

### generator

```kotlin
fun fib() = sequence {
    var a = 0
    var b = 1
    while (true) {
        yield(a)
        val next = a + b
        a = b
        b = next
    }
}

// take first 10
fib().take(10).toList()
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```
