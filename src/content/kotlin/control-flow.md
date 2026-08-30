# Control Flow

## if

### basic

```kotlin
if (x > 0) {
    println("positive")
} else if (x < 0) {
    println("negative")
} else {
    println("zero")
}
```

### ternary

```kotlin
val s = if (x > 0) "positive" else "not positive"
```

### as expression

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

## match / when

### basic

```kotlin
when (x) {
    1 -> "one"
    2 -> "two"
    else -> "other"
}
```

### guard

```kotlin
when {
    x > 0 -> "positive"
    x < 0 -> "negative"
    else -> "zero"
}
```

### destructuring

```kotlin
when (cmd) {
    is Move -> "move to (${cmd.x}, ${cmd.y})"
    is Stop -> "stop"
    else -> "unknown"
}
```

### exhaustiveness

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

## for

### basic

```kotlin
for (item in items) {
    println(item)
}
```

### with index

```kotlin
for ((i, item) in items.withIndex()) {
    println("$i: $item")
}
```

### range loop

```kotlin
for (i in 0..9) {
    println(i)
}
```

### break & continue

```kotlin
for (x in items) {
    if (x < 0) continue
    if (x == 0) break
    println(x)
}
```

### for else

```kotlin
// Kotlin has no for-else. Use a flag or any/none:
val found = items.any { it == target }
if (!found) println("not found")
```

## while

### basic

```kotlin
while (x > 0) {
    println(x)
    x--
}
```

### break & continue

```kotlin
while (true) {
    val x = nextValue()
    if (x < 0) continue
    if (x == 0) break
    println(x)
}
```

### do while

```kotlin
do {
    val x = nextValue()
    println(x)
} while (x > 0)
```

## Exception

### try / except

```kotlin
try {
    val result = 1 / 0
} catch (e: ArithmeticException) {
    println("division by zero")
} catch (e: Exception) {
    println("error: ${e.message}")
}
```

### finally

```kotlin
try {
    val f = File("file.txt").bufferedReader()
    ...
} finally {
    f.close()
}
```

### else

```kotlin
// Kotlin has no try-else. Just put the code after try.
try {
    val result = compute()
    println("result is $result")
} catch (e: Exception) {
    println("error")
}
```

### raise

```kotlin
throw IllegalArgumentException("invalid value")
```

### custom exception

```kotlin
class MyError(message: String) : Exception(message)

throw MyError("something went wrong")
```

### context manager

```kotlin
// use() — Kotlin's equivalent of Python's with
File("file.txt").bufferedReader().use { reader ->
    val content = reader.readText()
}
// reader auto-closed
```