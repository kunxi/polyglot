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

#### complex

```kotlin
// Kotlin has no built-in complex numbers.
// Use a library like koma or define a data class:

data class Complex(val re: Double, val im: Double) {
    operator fun plus(other: Complex) =
        Complex(re + other.re, im + other.im)
    operator fun times(other: Complex) =
        Complex(re * other.re - im * other.im,
                re * other.im + im * other.re)
}
val z = Complex(1.0, 2.0)
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

### Boolean

#### literal

```kotlin
val t = true
val f = false
```

#### negation

```kotlin
!true           // false
```

#### logical and

```kotlin
true && false   // false
```

#### logical or

```kotlin
true || false   // true
```

#### truthy and falsy values

```kotlin
// Kotlin has no implicit truthiness convention.
// Only Boolean can be used in conditions.
1 != 0                      // explicit check for integer
"".isEmpty()                // explicit check for string
listOf<Int>().isEmpty()     // explicit check for list
```

#### conversion

```kotlin
1 != 0              // to Boolean
true.toString()     // "true"
```

### None / null

Kotlin enforces null safety at compile time: `String` and `String?`
are different types.

#### literal

```kotlin
val x: String? = null
```

#### null check

```kotlin
if (x != null) {
    ...
}
```

#### optional access

```kotlin
x?.length           // safe call, returns null if x is null
x?.length ?: 0      // elvis: provide default when null
x!!.length          // force unwrap, throws if null
x?.let { ... }      // execute block only if non-null
```

### type hints

Kotlin type hints are part of the language and enforced at compile time.

#### variable

```kotlin
val name: String = "Alice"
var age: Int = 30
val scores: List<Int> = listOf(1, 2, 3)
```

#### nullable

```kotlin
val name: String? = null
```

#### function

```kotlin
fun greet(name: String): String {
    return "Hello, $name"
}

fun divide(a: Int, b: Int): Double? {
    if (b == 0) return null
    return a.toDouble() / b
}
```

#### list of elements

```kotlin
val names: List<String> = listOf("Alice", "Bob")
val scores: List<Int> = listOf(1, 2, 3)
val matrix: List<List<Int>> = listOf(listOf(1, 2), listOf(3, 4))
```

#### dict

```kotlin
val ages: Map<String, Int> = mapOf("Alice" to 30, "Bob" to 25)
```

#### type alias

```kotlin
typealias Vector = List<Double>
fun scale(scalar: Double, v: Vector): Vector {
    return v.map { scalar * it }
}
```

#### protocol / interface

```kotlin
interface Speaker {
    fun speak(): String
}

class Dog : Speaker {
    override fun speak() = "Woof!"
}

fun makeSound(s: Speaker): String = s.speak()
```