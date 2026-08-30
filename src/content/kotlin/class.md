# Classes

## Class

### definition

```kotlin
class Dog(val name: String)
```

### constructor

```kotlin
class Dog(val name: String)      // primary constructor

class Dog {
    val name: String
    constructor(name: String) {   // secondary constructor
        this.name = name
    }
}
```

### instantiation

```kotlin
val dog = Dog("Fido")
```

### attributes

```kotlin
class Dog(val name: String) {     // val: read-only property
    var age: Int = 0              // var: mutable property
}
```

### method

```kotlin
fun bark(): String {
    return "Woof!"
}
```

### inheritance

```kotlin
open class Animal

class Dog : Animal()
```

### override

```kotlin
open class Animal {
    open fun speak() = ""
}

class Dog : Animal() {
    override fun speak() = "Woof!"
}
```

### super

```kotlin
class Dog(name: String) : Animal(name) {
    override fun speak(): String {
        return super.speak() + "Woof!"
    }
}
```

### class method

```kotlin
class Dog(val name: String) {
    companion object {
        fun fromBirthyear(birthyear: Int): Dog =
            Dog("dog-${2025 - birthyear}")
    }
}
```

### static method

```kotlin
class Dog(val name: String) {
    companion object {
        @JvmStatic
        fun isCanine(name: String): Boolean =
            name in listOf("dog", "wolf")
    }
}
```

### abstract

```kotlin
abstract class Animal {
    abstract fun speak(): String
}
```

### interface

```kotlin
interface Speakable {
    fun speak(): String
}

class Dog : Speakable {
    override fun speak() = "Woof!"
}
```

### data class

```kotlin
data class Dog(val name: String, val age: Int)
```

### equality

```kotlin
// data class provides equals() automatically

class Dog(val name: String) {
    override fun equals(other: Any?): Boolean =
        other is Dog && name == other.name
}
```

### string representation

```kotlin
// data class provides toString() automatically

class Dog(val name: String) {
    override fun toString() = "Dog($name)"
}
```

### sealed class

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

### private

```kotlin
class Dog {
    private var secret = 42   // only this class
    private fun helper() {}
}
```

### protected

```kotlin
open class Animal {
    protected val name: String = ""
    protected fun feed() {}   // subclasses only
}

class Dog : Animal() {
    fun useName() = name
}
```

### public

```kotlin
class Dog {
    public val name: String = "Fido"  // default, explicit
}
```

## Enum

### definition

```kotlin
enum class Color {
    RED, GREEN, AMBER
}
```

### auto value

```kotlin
// enum entries are values by default, no auto() needed
enum class Color { RED, GREEN, AMBER }
```

### access

```kotlin
Color.RED           // enum entry
Color.RED.name      // "RED"
Color.RED.ordinal   // 0
```

### iteration

```kotlin
Color.entries.toList()   // [RED, GREEN, AMBER]
```

### lookup

```kotlin
Color.valueOf("RED")     // Color.RED, throws if absent
enumValues<Color>().find { it.name == "RED" }
```

### match

```kotlin
when (color) {
    Color.RED -> "stop"
    Color.GREEN -> "go"
    else -> "caution"    // AMBER or unknown fallback
}
```

### enum with data

```kotlin
enum class Planet(val mass: Double, val radius: Double) {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6)
}
```