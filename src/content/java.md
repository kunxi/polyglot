# Java

## Primitive types

Java's `byte`(8), `short`(16), `int`(32), `long`(64) and `float`/`double` are fixed hardware primitives (signed only); wrapper classes (`Integer`, `Long`) box them, and alignment is JVM-managed.
### Number

#### integer

```java
int a = 42;
int b = -7;
int c = Integer.parseInt("42");
long big = 1_000_000_000_000L;
```

#### integer overflow

```java
// Java primitives wrap silently on overflow
int x = Integer.MAX_VALUE;
int y = x + 1;              // Integer.MIN_VALUE (wraps silently)
int z = Math.addExact(x, 1); // throws ArithmeticException

long b = Long.MAX_VALUE;
b + 1;                      // Long.MIN_VALUE (wraps)
Math.multiplyExact(b, 2);   // throws ArithmeticException
```

#### float

```java
double x = 3.14;
double y = 1.5e-3;
double z = Double.parseDouble("3.14");
```

#### arithmetic

```java
a + b      // addition
a - b      // subtraction
a * b      // multiplication
a / b      // integer division if both int
(double) a / b   // force float division
a % b      // modulo
```

#### min max abs

```java
Math.min(a, b)
Math.max(a, b)
Math.abs(-42)
```

#### random

```java
new Random().nextInt(1, 7)   // 1..6
Math.random()                // 0.0..1.0
```

### Integer types

#### short

```java
short s = 42;   // 16-bit signed
```

#### long

```java
long l = 42L;   // 64-bit signed
```

#### long long

```java
// No long long — long is 64-bit
```

#### unsigned

```java
// No unsigned primitives — char is 16-bit unsigned
char c = 'a';
```

#### signed

```java
int i = -42;   // signed by default
```

#### struct

```java
// Use ByteBuffer for a packed layout
var buf = ByteBuffer.allocate(5).order(ByteOrder.LITTLE_ENDIAN);
buf.put((byte) 1).putInt(2);
```

#### divmod

```java
// Java has no divmod; compute both
int q = a / b;
int r = a % b;
```

#### rounding

```java
Math.round(3.14);        // 3
(int) 3.9;               // 3 (truncates)
Math.floor(3.14);        // 3.0
String.format("%.1f", 3.14); // "3.1"
```

#### range

```java
IntStream.range(0, 5)              // 0, 1, 2, 3, 4 (exclusive)
IntStream.rangeClosed(0, 4)        // 0, 1, 2, 3, 4 (inclusive)
IntStream.range(2, 5)              // 2, 3, 4
IntStream.iterate(0, i -> i + 2).limit(5) // 0, 2, 4, 6, 8
```

#### descending range

```java
for (int i = 4; i >= 0; i--) {}          // 4, 3, 2, 1, 0
for (int i = 10; i >= 0; i -= 2) {}      // 10, 8, 6, 4, 2
IntStream.iterate(4, i -> i - 1).limit(5) // 4, 3, 2, 1, 0
```

### Boolean

#### literal

```java
boolean t = true;
boolean f = false;
```

#### negation

```java
!true           // false
```

#### logical and

```java
true && false   // false
```

#### logical or

```java
true || false   // true
```

#### truthy and falsy values

```java
// Java has no truthiness — only boolean works in conditions.
1 != 0                      // explicit check for integer
!s.isEmpty()                // explicit check for string
!list.isEmpty()             // explicit check for list
```

#### conversion

```java
1 != 0                     // to Boolean
Boolean.toString(true)     // "true"
Boolean.parseBoolean("true") // true
```

### None / null

Java reference types can be null; `Optional<T>` models absence.

#### literal

```java
String x = null;
Optional<String> y = Optional.empty();
Optional<Integer> z = Optional.of(5);
```

#### null check

```java
if (x != null) {
    // ...
}
x == null
```

#### optional access

```java
Optional.ofNullable(x).map(String::length).orElse(0)
x != null ? x.length() : 0
Optional.ofNullable(x).ifPresent(v -> { /* ... */ })
```

## Composite types

### String

#### literal

```java
String s = "hello";
String s = "multiline\nstring";
String s = """
    multiline
    string
    """;
```

#### length

```java
s.length()
```

#### access

```java
s.charAt(0)               // first char
s.charAt(s.length() - 1)  // last char
```

#### slice

```java
s.substring(1, 3)   // chars 1..2, exclusive end
s.substring(2)      // from index 2 to end
```

#### concatenation

```java
s + " world"
"hello".concat(" world")
String.join(" ", "hello", "world")
```

#### interpolation

```java
String.format("Hello, %s", name)
"Hello, %s".formatted(name)
"Hello, " + name
```

#### search

```java
s.contains("hello")
s.indexOf("lo")          // returns index or -1
s.startsWith("he")
s.endsWith("lo")
```

#### split and join

```java
s.split(",")
String.join("-", "a", "b", "c")
```

#### trim

```java
s.trim()
s.strip()
s.stripLeading()
s.stripTrailing()
```

#### case

```java
s.toUpperCase()
s.toLowerCase()
```

#### replace

```java
s.replace("old", "new")
s.replaceFirst("old", "new")   // first occurrence only
```

#### justify

```java
String.format("%10s", s)    // right justify
String.format("%-10s", s)   // left justify
```

#### format

```java
String.format("Hello, %s!", name)
String.format("%.2f", 3.14159)   // "3.14"
String.format("%05d", 42)        // "00042"
```

### Complex
#### operations

```java
// Java has no built-in complex numbers; use a class or library
class Complex {
    double re, im;
    Complex(double re, double im) { this.re = re; this.im = im; }
    Complex add(Complex o) { return new Complex(re + o.re, im + o.im); }
    Complex mul(Complex o) {
        return new Complex(re * o.re - im * o.im, re * o.im + im * o.re);
    }
}
var z = new Complex(1.0, 2.0);
```

### Date
#### now

```java
import java.time.LocalDate;
LocalDate.now()
```
#### format

```java
LocalDate.now().format(DateTimeFormatter.ISO_DATE)
```
### Datetime
#### now

```java
import java.time.LocalDateTime;
LocalDateTime.now()
```
#### format

```java
LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
```
### Decimal
#### literal

```java
import java.math.BigDecimal;
new BigDecimal("0.1").add(new BigDecimal("0.2"))
```
#### precision

```java
new BigDecimal("1").divide(new BigDecimal("7"), 6, RoundingMode.HALF_UP)
```
## Type system

### type hints

Java is statically typed; types are mandatory.

#### variable

```java
String name = "Alice";
int age = 30;
List<Integer> scores = List.of(1, 2, 3);
```

#### nullable

```java
String name = null;    // reference types are nullable by default
```

#### function

```java
static String greet(String name) {
    return "Hello, " + name;
}

static Double divide(int a, int b) {
    if (b == 0) return null;
    return (double) a / b;
}
```

#### list of elements

```java
List<String> names = List.of("Alice", "Bob");
List<Integer> scores = List.of(1, 2, 3);
List<List<Integer>> matrix = List.of(List.of(1, 2), List.of(3, 4));
```

#### dict

```java
Map<String, Integer> ages = Map.of("Alice", 30, "Bob", 25);
```

### Type operations
#### type alias

```java
// Java has no type aliases — use generics or wrapper classes
class Vector extends ArrayList<Double> { }
```

#### union

```java
// No union types — sealed interfaces (Java 17+)
sealed interface A permits B, C {}
record B(int x) implements A {}
record C(String s) implements A {}
```
#### intersection

```java
// Intersections in generic bounds
<T extends CharSequence & Comparable<T>> T pick(T a, T b)
```
#### literal types

```java
// No literal types
```
## Memory model

Java stores primitives by value and objects on the heap, accessed through references. There are no raw pointers, and the JVM garbage collector reclaims unreachable objects.

### Memory

#### value vs reference

```java
int a = 1;
int b = a;                     // value copy
List<Integer> x = new ArrayList<>(List.of(1, 2));
List<Integer> y = x;           // same list reference
y.add(3);                      // x is also [1, 2, 3]
```

#### pointer / reference

```java
// No raw pointers — only object references
String s = "hello";
String t = s;                  // same reference
s == t                         // true (reference equality)
```

#### ownership / borrowing

```java
// No ownership/borrowing — garbage collected
```

#### copy vs move

```java
List<Integer> a = new ArrayList<>(List.of(1, 2, 3));
List<Integer> b = new ArrayList<>(a);   // shallow copy
```

#### immutability

```java
final List<Integer> list = List.of(1, 2, 3);   // immutable
record Point(int x, int y) {}
```

## Control Flow

### if

#### basic

```java
if (x > 0) {
    System.out.println("positive");
} else if (x < 0) {
    System.out.println("negative");
} else {
    System.out.println("zero");
}
```

#### ternary

```java
String s = x > 0 ? "positive" : "not positive";
```

#### as expression

```java
// Java's if is a statement — the ternary is the expression form
int n = ok ? 1 : 0;
```

### match / when

#### basic

```java
// switch expression (Java 14+)
String s = switch (x) {
    case 1 -> "one";
    case 2 -> "two";
    default -> "other";
};
```

#### guard

```java
// guarded pattern in switch (Java 21+)
String s = switch (x) {
    case Integer n when n > 0 -> "positive";
    case Integer n when n < 0 -> "negative";
    default -> "zero";
};
```

#### destructuring

```java
// record pattern destructuring (Java 21+)
record Point(int x, int y) {}
record Move(Point target) {}
record Stop() {}

String s = switch (cmd) {
    case Move(Point(var x, var y)) -> "move to (%d, %d)".formatted(x, y);
    case Stop s -> "stop";
    default -> "unknown";
};
```

#### exhaustiveness

```java
// sealed types give exhaustive switches (Java 21+)
sealed interface Command permits Move, Stop {}
record Move(int x, int y) implements Command {}
record Stop() implements Command {}

String s = switch (cmd) {   // no default needed — all cases covered
    case Move(var x, var y) -> "move to (%d, %d)".formatted(x, y);
    case Stop s -> "stop";
};
```

### for

#### basic

```java
for (String item : items) {
    System.out.println(item);
}
```

#### with index

```java
for (int i = 0; i < items.size(); i++) {
    System.out.println(i + ": " + items.get(i));
}
```

#### range loop

```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

#### break & continue

```java
for (int x : items) {
    if (x < 0) continue;
    if (x == 0) break;
    System.out.println(x);
}
```

#### for else

```java
// Java has no for-else. Use anyMatch or a flag:
boolean found = items.stream().anyMatch(x -> x == target);
if (!found) System.out.println("not found");
```

### while

#### basic

```java
while (x > 0) {
    System.out.println(x);
    x--;
}
```

#### break & continue

```java
while (true) {
    int x = nextValue();
    if (x < 0) continue;
    if (x == 0) break;
    System.out.println(x);
}
```

#### do while

```java
do {
    int x = nextValue();
    System.out.println(x);
} while (x > 0);
```

### Exception

#### try / except

```java
try {
    int result = 1 / 0;
} catch (ArithmeticException e) {
    System.out.println("division by zero");
} catch (Exception e) {
    System.out.println("error: " + e.getMessage());
}
```

#### finally

```java
FileReader f = null;
try {
    f = new FileReader("file.txt");
    // ...
} finally {
    if (f != null) f.close();
}
```

#### else

```java
// Java has no try-else; run the success path after the try
try {
    int result = compute();
    System.out.println("result is " + result);
} catch (Exception e) {
    System.out.println("error");
}
```

#### raise

```java
throw new IllegalArgumentException("invalid value");
throw new RuntimeException("unrecoverable error");
```

#### custom exception

```java
class MyError extends Exception {
    MyError(String message) { super(message); }
}

throw new MyError("something went wrong");
```

#### context manager

```java
// try-with-resources auto-closes on exit
try (BufferedReader reader = Files.newBufferedReader(Path.of("file.txt"))) {
    String content = reader.lines().collect(Collectors.joining("\n"));
}
```

## Functions

### Function

#### definition

```java
static String greet(String name) {
    return "Hello, " + name;
}
```

#### default parameters

```java
// Java has no default parameters — use overloads
static String greet(String name) {
    return greet(name, "Hello");
}
static String greet(String name, String greeting) {
    return greeting + ", " + name;
}
```

#### overloading

```java
static String stringify(int arg) { return "int: " + arg; }
static String stringify(String arg) { return "str: " + arg; }
```

#### varargs

```java
static int sumAll(int... args) {
    int s = 0;
    for (int a : args) s += a;
    return s;
}
sumAll(1, 2, 3);
```

#### keyword arguments

```java
// Java has no keyword arguments — use a builder or record
record Config(String host, int port, boolean debug) {}
var c = new Config("example.com", 3000, true);
```

#### return

```java
static Double divide(int a, int b) {
    if (b == 0) return null;
    return (double) a / b;
}
```

#### callable check

```java
// No callable() — use functional interfaces or instanceof
boolean isFn = greet instanceof Object; // not meaningful
// Functions are typed: Function<String, String> f = JavaClass::greet;
```

### Lambda

#### basic

```java
Function<Integer, Integer> square = x -> x * x;
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
```

#### as argument

```java
list.stream().map(x -> x * 2).toList();
list.stream().filter(x -> x > 2).toList();

// method reference as argument
list.stream().sorted(Comparator.reverseOrder());
```

#### receiver

```java
// Method references capture the receiver
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");

// stream pipeline chains methods on the receiver
String result = list.stream()
    .map(String::trim)
    .collect(Collectors.joining(","));
```

## Classes

### Class

#### definition

```java
class Dog {
    String name;
}
```

#### constructor

```java
class Dog {
    String name;
    Dog(String name) {
        this.name = name;
    }
}
```

#### instantiation

```java
Dog dog = new Dog("Fido");
```

#### attributes

```java
class Dog {
    String name;       // instance field
    static String species = "canine"; // class field
}
```

#### method

```java
class Dog {
    String bark() {
        return "Woof!";
    }
}
```

#### inheritance

```java
class Animal { }
class Dog extends Animal { }
```

#### multiple inheritance

```java
class A {}
class B {}
// class C extends A, B {}   // error — single inheritance
interface X { void x(); }
interface Y { void y(); }
class C extends A implements X, Y {}
```

#### override

```java
class Animal {
    String speak() { return ""; }
}
class Dog extends Animal {
    @Override String speak() { return "Woof!"; }
}
```

#### super

```java
class Dog extends Animal {
    @Override String speak() {
        return super.speak() + "Woof!";
    }
}
```

#### class method

```java
class Dog {
    static Dog fromBirthyear(int birthyear) {
        return new Dog("dog-" + (2025 - birthyear));
    }
}
```

#### static method

```java
class Dog {
    static boolean isCanine(String name) {
        return name.equals("dog") || name.equals("wolf");
    }
}
```

#### abstract

```java
abstract class Animal {
    abstract String speak();
}
```

#### protocol / interface

```java
interface Speaker {
    String speak();
}

class Dog implements Speaker {
    @Override public String speak() { return "Woof!"; }
}

static String makeSound(Speaker s) { return s.speak(); }
```

#### data class

```java
// records are value-like classes (Java 16+)
record Dog(String name, int age) {}
```

#### equality

```java
class Dog {
    String name;
    @Override public boolean equals(Object o) {
        return o instanceof Dog d && name.equals(d.name);
    }
    @Override public int hashCode() { return name.hashCode(); }
}
```

#### string representation

```java
class Dog {
    String name;
    @Override public String toString() {
        return "Dog(" + name + ")";
    }
}
```

#### sealed class

```java
sealed class Result permits Success, Failure {}
final class Success extends Result { int value; }
final class Failure extends Result { String error; }
```

#### private

```java
class Dog {
    private int secret = 42;   // only this class
    private void helper() {}
}
```

#### protected

```java
class Animal {
    protected String name = "";
    protected void feed() {}   // subclasses and same package
}

class Dog extends Animal {
    String useName() { return name; }
}
```

#### public

```java
class Dog {
    public String name = "Fido";
}
```

### Interface & trait

Java uses `interface` (with default methods since Java 8) for the trait role; there is no `trait` keyword.
#### definition

```java
interface Speakable {
    String speak();
}

class Dog implements Speakable {
    @Override public String speak() { return "Woof!"; }
}
```

#### default method

```java
interface Speaker {
    String speak();
    default String greet() { return speak(); } // default method
}
```
### Enum

#### definition

```java
enum Color {
    RED, GREEN, AMBER
}
```

#### auto value

```java
// enum entries get an auto ordinal value
enum Color { RED, GREEN, AMBER }
Color.RED.ordinal()   // 0
```

#### access

```java
Color.RED
Color.RED.name()      // "RED"
Color.RED.ordinal()   // 0
```

#### iteration

```java
for (Color c : Color.values()) {
    System.out.println(c);
}
```

#### lookup

```java
Color.valueOf("RED")   // Color.RED, throws if absent
```

#### match

```java
String s = switch (color) {
    case RED -> "stop";
    case GREEN -> "go";
    default -> "caution";   // AMBER or unknown fallback
};
```

#### enum with data

```java
enum Planet {
    MERCURY(3.303e23, 2.4397e6),
    VENUS(4.869e24, 6.0518e6);

    final double mass, radius;
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
}
```

## Collections

### List

#### literal

```java
List<Integer> a = List.of(1, 2, 3);                 // immutable
List<Integer> a = new ArrayList<>(List.of(1, 2, 3)); // mutable
```

#### size

```java
a.size()
```

#### lookup

```java
a.get(0)               // first element
a.get(a.size() - 1)    // last element
```

#### update

```java
a.set(0, 10);
a.add(4);
```

#### is element present

```java
a.contains(3)
```

#### delete

```java
a.remove(0)                    // by index
a.remove(Integer.valueOf(3))   // by value, returns false if absent
```

#### merge

```java
a.addAll(List.of(4, 5));
List<Integer> merged = Stream.concat(a.stream(), Stream.of(4, 5)).toList();
```

#### slice

```java
a.subList(1, 3)    // elements at index 1 and 2
```

#### reversed

```java
List<Integer> rev = new ArrayList<>(a);
Collections.reverse(rev);
```

#### map

```java
a.stream().map(x -> x * 2).toList()
```

#### filter

```java
a.stream().filter(x -> x > 0).toList()
```

### Dictionary

`Map<K, V>` for key-value storage.

#### literal

```java
Map<Character, Integer> d = Map.of('t', 1, 'f', 0);
```

#### size

```java
d.size()
```

#### lookup

```java
d.get('t')              // may return null
d.getOrDefault('t', 0)
```

#### update

```java
Map<Character, Integer> d = new HashMap<>(Map.of('t', 1, 'f', 0));
d.put('u', -1);
```

#### is key present

```java
d.containsKey('c')
```

#### delete

```java
Integer v = d.remove('t');   // null if absent
```

#### from array of pairs

```java
Map<Character, Integer> d = Map.ofEntries(
    Map.entry('t', 1),
    Map.entry('f', 0)
);
```

#### merge

```java
d.putAll(Map.of('u', -1));
```

#### invert

```java
Map<Integer, Character> inverted = new HashMap<>();
d.forEach((k, v) -> inverted.put(v, k));
```

#### keys and values as arrays

```java
d.keySet()
d.values()
```

### Set

#### literal

```java
Set<Integer> s = Set.of(1, 2, 3);
```

#### size

```java
s.size()
```

#### add

```java
Set<Integer> s = new HashSet<>(Set.of(1, 2, 3));
s.add(4);
```

#### is element present

```java
s.contains(3)
```

#### delete

```java
s.remove(3)     // returns false if absent
```

#### from array

```java
List<Integer> a = List.of(1, 2, 3, 2);
Set<Integer> s = new HashSet<>(a);   // {1, 2, 3}
```

#### merge

```java
Set<Integer> union = new HashSet<>(s);
union.addAll(Set.of(4, 5));          // union
s.retainAll(Set.of(2, 3));           // intersection
s.removeAll(Set.of(2));              // difference
```

## Iterator and generator

### Iterator

#### chain

```java
Stream.concat(Stream.of("a", "b", "c"), Stream.of("d", "e")).toList()
```

#### take

```java
Stream.iterate(1, i -> i + 1).limit(4).toList()   // [1, 2, 3, 4]
```

#### drop

```java
Stream.iterate(1, i -> i + 1).skip(3).limit(7).toList()  // [4..10]
```

#### head

```java
Stream.iterate(1, i -> i + 1).limit(3).toList()   // [1, 2, 3]
```

#### takewhile

```java
Stream.of(1, 2, 3, 1, 2).takeWhile(x -> x < 3).toList()   // [1, 2]
```

#### dropwhile

```java
Stream.of(1, 2, 3, 1, 2).dropWhile(x -> x < 3).toList()   // [3, 1, 2]
```

#### zip

```java
// Java has no built-in zip — use an index loop
List<String> a = List.of("a", "b", "c");
List<String> b = List.of("1", "2", "3");
List<String> zipped = new ArrayList<>();
for (int i = 0; i < Math.min(a.size(), b.size()); i++) {
    zipped.add(a.get(i) + b.get(i));
}
```

#### enumerate

```java
List<String> items = List.of("a", "b", "c");
IntStream.range(0, items.size())
    .forEach(i -> System.out.println((i + 1) + " " + items.get(i)));
```

#### flatten

```java
List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4));
nested.stream().flatMap(List::stream).toList()   // [1, 2, 3, 4]
```

#### count

```java
Stream.iterate(10, i -> i + 1).limit(2).toList()   // [10, 11]
Stream.iterate(10, i -> i + 2).limit(3).toList()   // [10, 12, 14]
```

#### cycle

```java
String[] colors = {"red", "green", "blue"};
Stream.iterate(0, i -> (i + 1) % colors.length)
    .map(i -> colors[i])
    .limit(5)
    .toList()   // [red, green, blue, red, green]
```

#### chunked

```java
String s = "ABCDEFG";
List<String> chunks = new ArrayList<>();
for (int i = 0; i < s.length(); i += 3) {
    chunks.add(s.substring(i, Math.min(i + 3, s.length())));
}
```

#### groupby

```java
record City(String name, String state) {}
List<City> cities = List.of(
    new City("NYC", "NY"), new City("LA", "CA"),
    new City("SF", "CA"), new City("Buffalo", "NY")
);
Map<String, List<City>> groups = cities.stream()
    .collect(Collectors.groupingBy(City::state));
```

#### generator

```java
// infinite Fibonacci via Stream.iterate
Stream.iterate(new long[]{0, 1}, p -> new long[]{p[1], p[0] + p[1]})
    .map(p -> p[0])
    .limit(10)
    .toList();   // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```






