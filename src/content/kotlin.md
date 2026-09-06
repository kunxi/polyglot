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

## Control Flow

### if

#### basic

```kotlin
if (x > 0) {
    println("positive")
} else if (x < 0) {
    println("negative")
} else {
    println("zero")
}
```

#### ternary

```kotlin
val s = if (x > 0) "positive" else "not positive"
```

#### as expression

```kotlin
// if is an expression in Kotlin — returns a value
val n = if (ok) 1 else 0

// multi-line expression
val grade = if (score >= 90) {
    "A"
} else if (score >= 80) {
    "B"
} else {
    "F"
}
```

### match / when

#### basic

```kotlin
when (x) {
    1 -> "one"
    2 -> "two"
    else -> "other"
}
```

#### guard

```kotlin
when {
    x > 0 -> "positive"
    x < 0 -> "negative"
    else -> "zero"
}
```

#### destructuring

```kotlin
when (cmd) {
    is Move -> "move to (${cmd.x}, ${cmd.y})"
    is Stop -> "stop"
    else -> "unknown"
}
```

#### exhaustiveness

```kotlin
// Compiler checks exhaustiveness for sealed classes
sealed class Command
data class Move(val x: Int, val y: Int) : Command()
data object Stop : Command()

when (cmd) {   // no else needed — all cases covered
    is Move -> "move to (${cmd.x}, ${cmd.y})"
    Stop -> "stop"
}
```

### for

#### basic

```kotlin
for (item in items) {
    println(item)
}
```

#### with index

```kotlin
for ((i, item) in items.withIndex()) {
    println("$i: $item")
}
```

#### range loop

```kotlin
for (i in 0..9) {
    println(i)
}
```

#### break & continue

```kotlin
for (x in items) {
    if (x < 0) continue
    if (x == 0) break
    println(x)
}
```

#### for else

```kotlin
// Kotlin has no for-else. Use a flag or any/none:
val found = items.any { it == target }
if (!found) println("not found")
```

### while

#### basic

```kotlin
while (x > 0) {
    println(x)
    x--
}
```

#### break & continue

```kotlin
while (true) {
    val x = nextValue()
    if (x < 0) continue
    if (x == 0) break
    println(x)
}
```

#### do while

```kotlin
do {
    val x = nextValue()
    println(x)
} while (x > 0)
```

### Exception

#### try / except

```kotlin
try {
    val result = 1 / 0
} catch (e: ArithmeticException) {
    println("division by zero")
} catch (e: Exception) {
    println("error: ${e.message}")
}
```

#### finally

```kotlin
try {
    val f = File("file.txt").bufferedReader()
    ...
} finally {
    f.close()
}
```

#### else

```kotlin
// Kotlin has no try-else. Just put the code after try.
try {
    val result = compute()
    println("result is $result")
} catch (e: Exception) {
    println("error")
}
```

#### raise

```kotlin
throw IllegalArgumentException("invalid value")
```

#### custom exception

```kotlin
class MyError(message: String) : Exception(message)

throw MyError("something went wrong")
```

#### context manager

```kotlin
// use() — Kotlin's equivalent of Python's with
File("file.txt").bufferedReader().use { reader ->
    val content = reader.readText()
}
// reader auto-closed
```

## Functions

### Function

#### definition

```kotlin
fun greet(name: String): String {
    return "Hello, $name"
}
```

#### default parameters

```kotlin
fun greet(name: String, greeting: String = "Hello"): String {
    return "$greeting, $name"
}
```

#### overloading

```kotlin
fun stringify(arg: Int): String = "int: $arg"
fun stringify(arg: String): String = "str: $arg"
```

#### varargs

```kotlin
fun sumAll(vararg args: Int): Int {
    return args.sum()
}

fun printAll(vararg args: Any) {
    args.forEach { println(it) }
}
```

#### keyword arguments

```kotlin
fun configure(host: String = "localhost",
              port: Int = 8080,
              debug: Boolean = false) { }

configure(host = "example.com", port = 3000, debug = true)
```

#### return

```kotlin
fun divide(a: Int, b: Int): Double? {
    if (b == 0) return null
    return a.toDouble() / b
}
```

#### callable check

```kotlin
::greet.isCallable      // true
42::isCallable          // error — Int is not callable
```

### Lambda

#### basic

```kotlin
val square: (Int) -> Int = { x -> x * x }
val square = { x: Int -> x * x }
val add = { a: Int, b: Int -> a + b }
```

#### as argument

```kotlin
listOf(1, 2, 3).map { it * 2 }
listOf(1, 2, 3).filter { it > 2 }

// explicit parameter name
listOf(1, 2, 3).sortedBy { n -> -n }

// assigned to variable, passed as argument
val doubler: (Int) -> Int = { it * 2 }
nums.map(doubler)
```

#### receiver

```kotlin
// lambda with receiver: this refers to the object
val sb = StringBuilder()
sb.apply {
    append("Hello")
    append(" ")
    append("World")
}

// also: same as apply but uses it instead of this
sb.also { it.append("!") }

// let: transform with a scoped variable
val len = sb.let { it.length }

// run: combine let and apply
val result = sb.run {
    append("!")
    length
}

// with: non-extension receiver
with(sb) {
    append("X")
}
```

## Classes

### Class

#### definition

```kotlin
class Dog(val name: String)
```

#### constructor

```kotlin
class Dog(val name: String)      // primary constructor

class Dog {
    val name: String
    constructor(name: String) {   // secondary constructor
        this.name = name
    }
}
```

#### instantiation

```kotlin
val dog = Dog("Fido")
```

#### attributes

```kotlin
class Dog(val name: String) {     // val: read-only property
    var age: Int = 0              // var: mutable property
}
```

#### method

```kotlin
fun bark(): String {
    return "Woof!"
}
```

#### inheritance

```kotlin
open class Animal

class Dog : Animal()
```

#### override

```kotlin
open class Animal {
    open fun speak() = ""
}

class Dog : Animal() {
    override fun speak() = "Woof!"
}
```

#### super

```kotlin
class Dog(name: String) : Animal(name) {
    override fun speak(): String {
        return super.speak() + "Woof!"
    }
}
```

#### class method

```kotlin
class Dog(val name: String) {
    companion object {
        fun fromBirthyear(birthyear: Int): Dog =
            Dog("dog-${2025 - birthyear}")
    }
}
```

#### static method

```kotlin
class Dog(val name: String) {
    companion object {
        @JvmStatic
        fun isCanine(name: String): Boolean =
            name in listOf("dog", "wolf")
    }
}
```

#### abstract

```kotlin
abstract class Animal {
    abstract fun speak(): String
}
```

#### interface

```kotlin
interface Speakable {
    fun speak(): String
}

class Dog : Speakable {
    override fun speak() = "Woof!"
}
```

#### data class

```kotlin
data class Dog(val name: String, val age: Int)
```

#### equality

```kotlin
// data class provides equals() automatically

class Dog(val name: String) {
    override fun equals(other: Any?): Boolean =
        other is Dog && name == other.name
}
```

#### string representation

```kotlin
// data class provides toString() automatically

class Dog(val name: String) {
    override fun toString() = "Dog($name)"
}
```

#### sealed class

```kotlin
sealed class Result

data class Success(val value: Int) : Result()
data class Failure(val error: String) : Result()

// exhaustive when without else
fun handle(r: Result) = when (r) {
    is Success -> r.value
    is Failure -> r.error
}
```

#### private

```kotlin
class Dog {
    private var secret = 42   // only this class
    private fun helper() {}
}
```

#### protected

```kotlin
open class Animal {
    protected val name: String = ""
    protected fun feed() {}   // subclasses only
}

class Dog : Animal() {
    fun useName() = name
}
```

#### public

```kotlin
class Dog {
    public val name: String = "Fido"  // default, explicit
}
```

### Enum

#### definition

```kotlin
enum class Color {
    RED, GREEN, AMBER
}
```

#### auto value

```kotlin
// enum entries are values by default, no auto() needed
enum class Color { RED, GREEN, AMBER }
```

#### access

```kotlin
Color.RED           // enum entry
Color.RED.name      // "RED"
Color.RED.ordinal   // 0
```

#### iteration

```kotlin
Color.entries.toList()   // [RED, GREEN, AMBER]
```

#### lookup

```kotlin
Color.valueOf("RED")     // Color.RED, throws if absent
enumValues<Color>().find { it.name == "RED" }
```

#### match

```kotlin
when (color) {
    Color.RED -> "stop"
    Color.GREEN -> "go"
    else -> "caution"    // AMBER or unknown fallback
}
```

#### enum with data

```kotlin
enum class Planet(val mass: Double, val radius: Double) {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6)
}
```

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

### Set

#### literal

```kotlin
val s = setOf(1, 2, 3)
```

#### size

```kotlin
s.size
```

#### add

```kotlin
val s = mutableSetOf(1, 2, 3)
s.add(4)
```

#### is element present

```kotlin
3 in s
s.contains(3)
```

#### delete

```kotlin
s.remove(3)     // returns false if absent
```

#### from array

```kotlin
val a = listOf(1, 2, 3, 2)
val s = a.toSet()     // {1, 2, 3}
```

#### merge

```kotlin
s + setOf(4, 5)            // union
s.intersect(setOf(2, 3))   // intersection
s - setOf(2)               // difference
s.addAll(listOf(4, 5))     // in-place union
```

## Iterator and generator

### Iterator

#### chain

```kotlin
sequenceOf("abc", "de")
  .flatMap { it.toList() }
  .toList()
```

#### take

```kotlin
val s = (1..10).asSequence()
s.take(4).toList()           // [1, 2, 3, 4]
```

#### drop

```kotlin
s.drop(3).toList()           // [4, 5, 6, 7, 8, 9, 10]
```

#### head

```kotlin
s.take(3).toList()           // [1, 2, 3]
```

#### takewhile

```kotlin
sequenceOf(1, 2, 3, 1, 2)
    .takeWhile { it < 3 }
    .toList()                 // [1, 2]
```

#### dropwhile

```kotlin
sequenceOf(1, 2, 3, 1, 2)
    .dropWhile { it < 3 }
    .toList()                 // [3, 1, 2]
```

#### zip

```kotlin
listOf('a', 'b', 'c').zip(listOf('1', '2', '3'))
// [(a, 1), (b, 2), (c, 3)]

// No bulitin zipLongest equivalent 
```

#### enumerate

```kotlin
listOf('a', 'b', 'c').withIndex().forEach { (i, item) ->
    println("${i + 1} $item")  // 1 a, 2 b, 3 c
}
```

#### flatten

```kotlin
listOf(listOf(1, 2), listOf(3, 4)).flatten()
// [1, 2, 3, 4]
```

#### count

```kotlin
generateSequence(10) { it + 1 }      // 10, 11, 12, ...
generateSequence(10) { it + 2 }      // 10, 12, 14, ...
```

#### cycle

```kotlin
// Kotlin has no built-in cycle — generate a repeating sequence
val colors = listOf("red", "green", "blue")
generateSequence(0) { (it + 1) % colors.size }
    .map { colors[it] }
    .take(5)
    .toList()  // [red, green, blue, red, green]
```

#### chunked

```kotlin
"ABCDEFG".toList().chunked(3)
// [[A, B, C], [D, E, F], [G]]
```

#### groupby

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

#### generator

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
