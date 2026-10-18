# Kotlin

## Primitive types

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
a % b      // modulo
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

## Collections

Kotlin's collections (`List`, `Map`, `Set`) are immutable by default; use the mutable variants to add or update.

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

### Dictionary

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
