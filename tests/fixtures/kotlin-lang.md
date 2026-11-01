# Kotlin

## Types

### Primitive types

Kotlin primitive types overview.

#### Number

##### integer

```kotlin
val a = 42
val b = -7
val c = "42".toInt()
```

##### float

```kotlin
val x = 3.14
val y = 1.5e-3
val z = "3.14".toDouble()
```

##### arithmetic

```kotlin
a + b
a - b
a * b
a / b
```

#### Boolean

##### literal

```kotlin
val t = true
val f = false
```

##### negation

```kotlin
!true
```

##### logical and

```kotlin
true && false
```

## Collections & Iterators

### Collections

Kotlin collections overview — immutable.

#### List

##### literal

```kotlin
val a = listOf(1, 2, 3)
```

##### size

```kotlin
a.size
```

##### lookup

```kotlin
a[0]
a.last()
```

#### Dictionary

##### literal

```kotlin
val d = mapOf('t' to 1, 'f' to 0)
```

##### size

```kotlin
d.size
```

##### lookup

```kotlin
d['t']
```

#### Set

##### literal

```kotlin
val s = setOf(1, 2, 3)
```

##### size

```kotlin
s.size
```

##### add

```kotlin
val s = mutableSetOf(1, 2, 3)
s.add(4)
```
