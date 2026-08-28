# Kotlin

## Types

### Number

#### integer

```kotlin
val a = 42
val b = -7
val c = "42".toInt()
```

#### float

```kotlin
val x = 3.14
val y = 1.5e-3
val z = "3.14".toDouble()
```

#### arithmetic

```kotlin
a + b      // addition
a - b      // subtraction
a * b      // multiplication
a / b      // integer division if both int
a.toDouble() / b   // force float division
a / b.toDouble()   // force float division
a % b      // modulo
```

#### divmod

```kotlin
// Kotlin doesn't have divmod, use explicit pair
val q = a / b
val r = a % b
// or function
fun divmod(a: Int, b: Int) = Pair(a / b, a % b)
```

#### rounding

```kotlin
3.14.roundToInt()    // 3
3.14.toInt()          // 3 (truncates)
"%.1f".format(3.14)   // "3.1"
```

#### min max abs

```kotlin
minOf(a, b)
maxOf(a, b)
abs(-42)
```

#### range

```kotlin
0..4                 // 0, 1, 2, 3, 4 (inclusive)
0..<5                // 0, 1, 2, 3, 4 (exclusive, same as until)
2..4                 // 2, 3, 4
0 until 5            // 0, 1, 2, 3, 4 (exclusive)
0..8 step 2          // 0, 2, 4, 6, 8
(0..2).toList()      // [0, 1, 2]
```

#### descending range

```kotlin
4 downTo 0           // 4, 3, 2, 1, 0 (inclusive)
4 downTo 0 step 2    // 4, 2, 0
(4 downTo 0).reversed()  // 0, 1, 2, 3, 4
```

#### random

```kotlin
(1..6).random()
(0.0..1.0).random()
```

### String

#### literal

```kotlin
val s = "hello"
val s = """
    multiline
    string
""".trimIndent()
```

#### length

```kotlin
s.length
```

#### access

```kotlin
s[0]        // first char
s.last()    // last char
```

#### slice

```kotlin
s.substring(1, 3)    // exclusive end
s.slice(0..2 step 2)
```

#### concatenation

```kotlin
s + " world"
listOf("hello", "world").joinToString(" ")
```

#### interpolation

```kotlin
"Hello, $name"
"Hello, ${name.length}"
```

#### search

```kotlin
"hello" in s
s.indexOf("lo")          // returns index or -1
s.startsWith("he")
s.endsWith("lo")
```

#### split and join

```kotlin
s.split(",")
listOf("a", "b", "c").joinToString("-")
```

#### trim

```kotlin
s.trim()
s.trimStart()
s.trimEnd()
```

#### case

```kotlin
s.uppercase()
s.lowercase()
s.replaceFirstChar { it.uppercase() }
```

#### replace

```kotlin
s.replace("old", "new")
s.replaceFirst("old", "new")  // first occurrence only
```

#### justify

```kotlin
s.padStart(10)        // right justify
s.padEnd(10)          // left justify
"%10s".format(s)       // right justify
```