# Kotlin

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