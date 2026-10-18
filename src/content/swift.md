# Swift

## Primitive types

Swift's fixed-width integers (`Int8` through `Int64`, `UInt8` through `UInt64`) map to hardware with signed/unsigned variants; `Int` is 64-bit on 64-bit platforms. Padding/alignment follows the platform ABI.
### Number

#### integer

```swift
let a = 42
let b = -7
let c = Int("42")!       // optional, force unwrap
let c = Int("42") ?? 0   // default on failure
```

#### integer overflow

```swift
// Swift traps on overflow by default
let x = Int.max
// let y = x + 1                  // crashes at runtime
let y = x &+ 1                    // wraps to Int.min
let (r, overflow) = x.addingReportingOverflow(1)
```

#### float

```swift
let x = 3.14
let y = 1.5e-3
let z = Double("3.14")!
```

#### arithmetic

```swift
a + b      // addition
a - b      // subtraction
a * b      // multiplication
a / b      // integer division if both Int
Double(a) / Double(b)   // force float division
a % b      // remainder (truncating)
```

#### min max abs

```swift
min(a, b)
max(a, b)
abs(-42)
min(max(x, 0), 10)   // clamp — stdlib has no clamp
```

#### random

```swift
Int.random(in: 1...6)
Double.random(in: 0..<1)
Bool.random()
```

### Integer types

#### short

```swift
let s: Int16 = 42   // 16-bit signed
```

#### long

```swift
let l: Int64 = 42   // 64-bit signed
```

#### long long

```swift
// No long long — Int64 is the widest fixed integer
```

#### unsigned

```swift
let u: UInt32 = 42  // unsigned
```

#### signed

```swift
let i: Int = -42   // signed by default
```

#### struct

```swift
struct Packed {
    var a: UInt8
    var b: UInt32
}
MemoryLayout<Packed>.size      // includes padding
MemoryLayout<Packed>.stride
```

#### divmod

```swift
// Swift has no divmod; use quotientAndRemainder
let (q, r) = a.quotientAndRemainder(dividingBy: b)
let q = a / b
let r = a % b   // remainder, not modulo
```

#### rounding

```swift
3.14.rounded()                        // 3.0 (to nearest)
3.14.rounded(.down)                   // 3.0
3.14.rounded(.toNearestOrAwayFromZero) // 3.0
Int(3.9)                              // 3 (truncates)
String(format: "%.1f", 3.14)          // "3.1"
```

#### range

```swift
0..<5                 // 0, 1, 2, 3, 4 (half-open)
0...4                 // 0, 1, 2, 3, 4 (closed)
2...4                 // 2, 3, 4
stride(from: 0, through: 8, by: 2)   // 0, 2, 4, 6, 8
Array(0..<5)          // [0, 1, 2, 3, 4]
```

#### descending range

```swift
Array((0...4).reversed())                    // [4, 3, 2, 1, 0]
Array(stride(from: 4, through: 0, by: -1))   // [4, 3, 2, 1, 0]
Array(stride(from: 10, through: 0, by: -2))  // [10, 8, 6, 4, 2]
```

### Boolean

#### literal

```swift
let t = true
let f = false
```

#### negation

```swift
!true           // false
```

#### logical and

```swift
true && false   // false
```

#### logical or

```swift
true || false   // true
```

#### truthy and falsy values

```swift
// Swift has no implicit truthiness — only Bool works in conditions.
1 != 0                     // explicit check for integer
!s.isEmpty                 // explicit check for string
!arr.isEmpty               // explicit check for list
```

#### conversion

```swift
1 != 0             // to Boolean
String(true)       // "true"
Bool("true")       // true?
```

### None / null

Swift has no null; absence is modeled with `Optional<T>` and `nil`.

#### literal

```swift
let x: Int? = nil
let y: Int? = 5
```

#### null check

```swift
if let v = x {
    // ...
}
x != nil
x == nil
```

#### optional access

```swift
x.map { abs($0) }   // Int?
x ?? 0              // provide default
x!                  // force unwrap — traps if nil
x?.magnitude        // optional chaining
```

## Composite types

### String

#### literal

```swift
let s = "hello"
let s = "multiline\nstring"
let s = """
raw
multiline
string
"""
```

#### length

```swift
s.count            // characters
s.utf8.count       // bytes
```

#### access

```swift
s.first              // Character?
s[s.startIndex]      // Character
Array(s)[0]          // Character
```

#### slice

```swift
s.dropFirst(2)       // Substring
s.prefix(2)          // Substring
String(s.dropFirst(2))           // String
s[s.index(s.startIndex, offsetBy: 1)..<s.index(s.startIndex, offsetBy: 3)]
```

#### concatenation

```swift
s + " world"
"\(s) world"
["hello", "world"].joined(separator: " ")
```

#### interpolation

```swift
"Hello, \(name)"
"Hello, \(name.count)"
```

#### search

```swift
s.contains("lo")
s.hasPrefix("he")
s.hasSuffix("lo")
s.firstIndex(of: "l")       // String.Index?, nil if absent
```

#### split and join

```swift
s.split(separator: ",")              // [Substring]
s.components(separatedBy: ",")       // [String]
["a", "b", "c"].joined(separator: "-")
```

#### trim

```swift
s.trimmingCharacters(in: .whitespaces)
s.trimmingCharacters(in: .whitespacesAndNewlines)
```

#### case

```swift
s.uppercased()
s.lowercased()
```

#### replace

```swift
s.replacingOccurrences(of: "old", with: "new")
```

#### justify

```swift
String(format: "%10s", s)                              // right justify (ASCII)
s.padding(toLength: 10, withPad: " ", startingAt: 0)   // left justify
String(repeating: " ", count: max(0, 10 - s.count)) + s // right justify
```

#### format

```swift
String(format: "Hello, %@!", name)
String(format: "%.2f", 3.14159)   // "3.14"
String(format: "%05d", 42)        // "00042"
```

### Complex
#### operations

```swift
// Swift has no built-in complex numbers. Use swift-numerics:
import ComplexModule
let z = Complex(1.0, 2.0)
z.real        // 1.0
z.imaginary   // 2.0
z.conjugate   // 1 - 2i
z.magnitude   // |z|
z + z
z * z
```

### Date
#### now

```swift
import Foundation
Date()   // current date/time
```
#### format

```swift
let df = DateFormatter()
df.dateFormat = "yyyy-MM-dd"
df.string(from: Date())
```
### Datetime
#### now

```swift
import Foundation
Date()
```
#### format

```swift
df.dateFormat = "yyyy-MM-dd HH:mm:ss"
df.string(from: Date())
```
### Decimal
#### literal

```swift
import Foundation
Decimal(string: "0.1")! + Decimal(string: "0.2")!   // 0.3
```
#### precision

```swift
// Decimal keeps 38 digits; division rounds to that scale
Decimal(string: "1")! / Decimal(string: "7")!
```
## Type system

### type hints

Swift types are inferred but can be declared explicitly.

#### variable

```swift
let name: String = "Alice"
var age: Int = 30
let scores: [Int] = [1, 2, 3]
```

#### nullable

```swift
let name: String? = nil
```

#### function

```swift
func greet(_ name: String) -> String {
    "Hello, \(name)"
}

func divide(_ a: Int, _ b: Int) -> Double? {
    b == 0 ? nil : Double(a) / Double(b)
}
```

#### list of elements

```swift
let names: [String] = ["Alice", "Bob"]
let scores: [Int] = [1, 2, 3]
let matrix: [[Int]] = [[1, 2], [3, 4]]
```

#### dict

```swift
var ages: [String: Int] = ["Alice": 30, "Bob": 25]
```

### Type operations
#### type alias

```swift
typealias Vector = [Double]
func scale(_ scalar: Double, _ v: Vector) -> Vector {
    v.map { scalar * $0 }
}
```

#### union

```swift
// No union types — use enums with associated values
enum A {
    case b(Int)
    case c(String)
}
```
#### intersection

```swift
// Protocol composition with &
protocol Named { var name: String { get } }
protocol Aged { var age: Int { get } }
func f(_ x: any Named & Aged) {}
```
#### literal types

```swift
// No literal types
```
## Memory model

Swift uses Automatic Reference Counting (ARC) for class instances. Structs and enums are value types that copy on assignment; classes are reference types shared through ARC. Arrays and dictionaries are value types with copy-on-write storage.

### Memory

#### value vs reference

```swift
struct Point { var x: Int; var y: Int }
var a = Point(x: 0, y: 0)
var b = a          // a is copied
b.x = 1            // a.x is still 0

class Dog { var name = "" }
let d1 = Dog()
let d2 = d1        // d2 references the same object
d2.name = "Fido"   // d1.name is now "Fido"
```

#### pointer / reference

```swift
var x = 5
withUnsafePointer(to: &x) { p in p.pointee }          // read
withUnsafeMutablePointer(to: &x) { p in p.pointee += 1 }
```

#### ownership / borrowing

```swift
// Swift 5.9 adds explicit ownership for performance-sensitive code
func consume(_ value: consuming [Int]) {}   // takes ownership
func borrow(_ value: borrowing [Int]) {}    // borrows without copying
```

#### copy vs move

```swift
let a = 5
let b = a          // value types copy
var arr1 = [1, 2]
var arr2 = arr1    // copy-on-write: shares storage until mutated
arr2.append(3)     // now copies

class C {}
let c1 = C()
let c2 = c1        // reference, no copy
```

#### immutability

```swift
let x = 5        // immutable binding
var y = 5        // mutable binding
y += 1
let arr = [1, 2] // can't append to a let array
```

## Control Flow

### if

#### basic

```swift
if x > 0 {
    print("positive")
} else if x < 0 {
    print("negative")
} else {
    print("zero")
}
```

#### ternary

```swift
let s = x > 0 ? "positive" : "not positive"
```

#### as expression

```swift
// if is a statement in Swift, not an expression — use the ternary
let n = ok ? 1 : 0

let grade = score >= 90 ? "A" : score >= 80 ? "B" : "F"
```

### match / when

#### basic

```swift
switch x {
case 1: "one"
case 2: "two"
default: "other"
}
```

#### guard

```swift
switch x {
case let n where n > 0: "positive"
case let n where n < 0: "negative"
default: "zero"
}
```

#### destructuring

```swift
switch cmd {
case let .move(x, y): "move to (\(x), \(y))"
case .stop: "stop"
}
```

#### exhaustiveness

```swift
// The compiler enforces exhaustiveness for enums
enum Command {
    case move(x: Int, y: Int)
    case stop
}

switch cmd {   // no default needed — all cases covered
case let .move(x, y): "move to (\(x), \(y))"
case .stop: "stop"
}
```

### for

#### basic

```swift
for item in items {
    print(item)
}
```

#### with index

```swift
for (i, item) in items.enumerated() {
    print("\(i): \(item)")
}
```

#### range loop

```swift
for i in 0..<10 {
    print(i)
}
```

#### break & continue

```swift
for x in items {
    if x < 0 { continue }
    if x == 0 { break }
    print(x)
}
```

#### for else

```swift
// Swift has no for-else. Use contains/first(where:):
if !items.contains(target) { print("not found") }
if items.first(where: { $0 == target }) == nil { print("not found") }
```

### while

#### basic

```swift
while x > 0 {
    print(x)
    x -= 1
}
```

#### break & continue

```swift
while true {
    let x = nextValue()
    if x < 0 { continue }
    if x == 0 { break }
    print(x)
}
```

#### do while

```swift
repeat {
    let x = doSomething()
} while condition(x)
```

### Exception

Swift models errors with `throw` and the `Error` protocol.

#### try / except

```swift
do {
    let result = try divide(1, 0)
    print(result)
} catch {
    print("error: \(error)")
}

// try? returns nil on error
let result = try? divide(1, 0)
```

#### finally

```swift
// Swift has no finally — use defer for guaranteed cleanup
func process() throws {
    defer { cleanup() }   // always runs on scope exit
    try riskyOperation()
}
```

#### else

```swift
// Swift has no try-else. Run the success path after the do:
do {
    let result = try compute()
    print("result is \(result)")
} catch {
    print("error")
}
```

#### raise

```swift
throw MyError.something("invalid value")
fatalError("unrecoverable error")
```

#### custom exception

```swift
enum MyError: Error {
    case something(String)
}

func fail() throws {
    throw MyError.something("something went wrong")
}
```

#### context manager

```swift
// Use defer for RAII-style cleanup — resources free on scope exit
let file = try FileHandle(forReadingFrom: url)
defer { try? file.close() }
let data = try file.readToEnd()
```

## Functions

### Function

#### definition

```swift
func greet(_ name: String) -> String {
    "Hello, \(name)"
}
```

#### default parameters

```swift
func greet(_ name: String, greeting: String = "Hello") -> String {
    "\(greeting), \(name)"
}
```

#### overloading

```swift
// Swift supports overloading by signature
func stringify(_ arg: Int) -> String { "int: \(arg)" }
func stringify(_ arg: String) -> String { "str: \(arg)" }
```

#### varargs

```swift
func sum(_ nums: Int...) -> Int {
    nums.reduce(0, +)
}
sum(1, 2, 3)
```

#### keyword arguments

```swift
// Swift argument labels are the keyword-argument analogue
func connect(host: String, port: Int = 80, debug: Bool = false) {}
connect(host: "example.com", port: 3000)
```

#### return

```swift
func divide(_ a: Int, _ b: Int) -> Double? {
    guard b != 0 else { return nil }
    return Double(a) / Double(b)
}
```

#### callable check

```swift
// Functions are first-class and carry types
let f: (String) -> String = greet
let g = greet   // inferred function type

// Value types can be callable via callAsFunction
struct Adder {
    let base: Int
    func callAsFunction(_ x: Int) -> Int { base + x }
}
let add3 = Adder(base: 3)
add3(4)   // 7
```

### Lambda

#### basic

```swift
let square = { (x: Int) in x * x }
let add = { (a: Int, b: Int) in a + b }
```

#### as argument

```swift
items.map { $0 * 2 }
items.filter { $0 > 2 }

// explicit closure parameter
items.map({ x in x * 2 })
```

#### receiver

```swift
// Swift closures have no receiver. Trailing closures + method chaining:
let result = [1, 2, 3]
    .map { $0 * 2 }
    .reduce(0, +)
```

## Classes

Swift uses classes (reference types), structs (value types), and protocols instead of a single class system.

### Class

#### definition

```swift
class Dog {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

#### constructor

```swift
init(name: String) {
    self.name = name
}
```

#### instantiation

```swift
let dog = Dog(name: "Fido")
```

#### attributes

```swift
class Dog {
    var name: String                      // stored property
    var age = 0                           // stored with default
    var display: String { "Dog(\(name))" } // computed property
}
```

#### method

```swift
func bark() -> String {
    "Woof!"
}
```

#### inheritance

```swift
class Puppy: Dog {
    var cute = true
}
```

#### multiple inheritance

```swift
// No multiple class inheritance — one superclass only
// Compose with protocols
protocol X { func x() }
protocol Y { func y() }
class C: A, X, Y { }
```

#### override

```swift
override func bark() -> String {
    "Yip!"
}
```

#### super

```swift
override func bark() -> String {
    super.bark() + " (louder)"
}
```

#### class method

```swift
class func species() -> String { "Canis" }   // can be overridden
```

#### static method

```swift
static func isCanine(_ name: String) -> Bool { name == "dog" }
```

#### abstract

```swift
// Swift has no abstract classes — use protocols
protocol Animal {
    func speak() -> String   // no default — conformers must define it
}
```

#### protocol / interface

```swift
protocol Speaker {
    func speak() -> String
}

struct Dog: Speaker {
    func speak() -> String { "Woof!" }
}

func makeSound(_ s: any Speaker) -> String {
    s.speak()
}
```

#### data class

```swift
// Structs are value types with an auto memberwise initializer
struct Dog {
    let name: String
    let age: Int
}
let dog = Dog(name: "Fido", age: 3)
```

#### equality

```swift
struct Dog: Equatable {
    let name: String
    // == synthesized
}

// or manual
static func == (lhs: Dog, rhs: Dog) -> Bool {
    lhs.name == rhs.name
}
```

#### string representation

```swift
struct Dog: CustomStringConvertible {
    let name: String
    var description: String { "Dog(\(name))" }
}
```

#### sealed class

```swift
// Swift models closed sets with enums instead of sealed classes
enum Result {
    case success(Int)
    case failure(String)
}

func handle(_ r: Result) -> String {
    switch r {
    case let .success(v): "\(v)"
    case let .failure(e): e
    }
}
```

#### private

```swift
class Dog {
    private var secret = 0
    private func helper() {}
}
```

#### protected

```swift
// Swift has no protected — only private/fileprivate/internal
class Animal {
    fileprivate func feed() {}   // visible within the file
}
```

#### public

```swift
public class Dog {
    public var name: String
    public init(name: String) {
        self.name = name
    }
}
```

### Interface & trait

Swift uses `protocol` for shared behavior; there is no `trait` keyword. Protocols gain default implementations through extensions.
#### definition

```swift
protocol Speakable {
    func speak() -> String
}

struct Dog: Speakable {
    func speak() -> String { "Woof!" }
}
```

#### default method

```swift
protocol Speaker {
    func speak() -> String
}
extension Speaker {
    func greet() -> String { speak() }   // default method
}
```
### Enum

#### definition

```swift
enum Color {
    case red, green, amber
}
```

#### auto value

```swift
enum Color: Int {
    case red, green, amber
}

Color.red.rawValue     // 0
Color.amber.rawValue   // 2
```

#### access

```swift
Color.red
Color.red.rawValue       // 0 (with Int raw values)
```

#### iteration

```swift
enum Color: CaseIterable {
    case red, green, amber
}

Color.allCases   // [red, green, amber]
```

#### lookup

```swift
enum Color: String {
    case red, green, amber
}

Color(rawValue: "red")   // Color?.red, nil if absent
```

#### match

```swift
switch color {
case .red: "stop"
case .green: "go"
case .amber: "caution"
}
```

#### enum with data

```swift
enum Planet {
    case mercury(Double, Double)
    case venus(Double, Double)
}
let mercury = Planet.mercury(3.303e23, 2.4397e6)
```

## Collections

### List

#### literal

```swift
let a = [1, 2, 3]
```

#### size

```swift
a.count
```

#### lookup

```swift
a[0]                              // first element
a.first                           // Int?
a.last                            // Int?
a.indices.contains(0) ? a[0] : nil // safe lookup
```

#### update

```swift
var a = [1, 2, 3]
a[0] = 10
a.append(4)
```

#### is element present

```swift
a.contains(3)
```

#### delete

```swift
var a = [1, 2, 3]
a.remove(at: 0)        // by index, returns element
a.removeLast()         // last element
a.removeAll { $0 == 3 } // by value
```

#### merge

```swift
var a = [1, 2, 3]
a += [4, 5]
a.append(contentsOf: [4, 5])
```

#### slice

```swift
Array(a[1..<3])                    // elements at index 1 and 2
Array(stride(from: 0, to: a.count, by: 2).map { a[$0] })
```

#### reversed

```swift
Array(a.reversed())   // [3, 2, 1]
a.reversed()          // ReversedCollection
var a = [1, 2, 3]
a.reverse()           // in place
```

#### map

```swift
a.map { $0 * 2 }
```

#### filter

```swift
a.filter { $0 > 0 }
```

### Dictionary

`Dictionary<Key, Value>` for key-value storage.

#### literal

```swift
let d = ["t": 1, "f": 0]
```

#### size

```swift
d.count
```

#### lookup

```swift
d["t"]                 // Int?, nil if absent
d["t", default: 0]     // Int, default if absent
```

#### update

```swift
var d = ["t": 1, "f": 0]
d["u"] = -1
d.updateValue(-1, forKey: "u")
```

#### is key present

```swift
d["c"] != nil
d.keys.contains("c")
```

#### delete

```swift
d.removeValue(forKey: "t")   // Int?, nil if absent
d["t"] = nil                 // remove
```

#### from array of pairs

```swift
let pairs = [("t", 1), ("f", 0)]
let d = Dictionary(uniqueKeysWithValues: pairs)
```

#### merge

```swift
var d = ["t": 1, "f": 0]
d.merge(["u": -1]) { _, new in new }
```

#### invert

```swift
Dictionary(uniqueKeysWithValues: d.map { ($0.value, $0.key) })
```

#### keys and values as arrays

```swift
Array(d.keys)
Array(d.values)
```

### Set

#### literal

```swift
let s: Set = [1, 2, 3]
```

#### size

```swift
s.count
```

#### add

```swift
var s: Set = [1, 2, 3]
s.insert(4)
```

#### is element present

```swift
s.contains(3)
```

#### delete

```swift
s.remove(3)   // returns nil if absent
```

#### from array

```swift
let a = [1, 2, 3, 2]
let s = Set(a)   // {1, 2, 3}
```

#### merge

```swift
s.union(other)        // union
s.intersection(other) // intersection
s.subtracting(other)  // difference
```

## Iterator and generator

### Iterator

#### chain

```swift
Array("abc") + Array("de")           // ["a", "b", "c", "d", "e"]
// swift-algorithms provides chained:
[1, 2].chained(with: [3, 4])
```

#### take

```swift
(1...10).prefix(4)         // [1, 2, 3, 4]
```

#### drop

```swift
(1...10).dropFirst(3)      // [4, 5, 6, 7, 8, 9, 10]
```

#### head

```swift
(1...10).prefix(3)         // [1, 2, 3]
```

#### takewhile

```swift
[1, 2, 3, 1, 2].prefix(while: { $0 < 3 })   // [1, 2]
```

#### dropwhile

```swift
[1, 2, 3, 1, 2].drop(while: { $0 < 3 })     // [3, 1, 2]
```

#### zip

```swift
Array(zip(["a", "b", "c"], [1, 2, 3]))   // [("a", 1), ("b", 2), ("c", 3)]

// zip stops at the shortest; no built-in zip_longest
```

#### enumerate

```swift
["a", "b", "c"].enumerated()   // (offset, element) pairs
for (i, item) in items.enumerated() { print("\(i + 1) \(item)") }
```

#### flatten

```swift
[[1, 2], [3, 4]].flatMap { $0 }   // [1, 2, 3, 4]
[[1, 2], [3, 4]].joined()         // FlattenSequence
```

#### count

```swift
Array((0...).prefix(2))              // [0, 1]
// infinite stride via sequence
Array(sequence(first: 10) { $0 + 2 }.prefix(3))   // [10, 12, 14]
```

#### cycle

```swift
// stdlib has no cycle — use swift-algorithms
["red", "green", "blue"].cycled().prefix(5)   // [red, green, blue, red, green]
// manual
Array((0..<5).map { ["red", "green", "blue"][$0 % 3] })
```

#### chunked

```swift
// swift-algorithms
Array([1, 2, 3, 4, 5, 6, 7].chunks(ofCount: 3))
// [[1, 2, 3], [4, 5, 6], [7]]
```

#### groupby

```swift
// stdlib: Dictionary(grouping:by:)
let cities = [("NYC", "NY"), ("LA", "CA"), ("SF", "CA"), ("Buffalo", "NY")]
Dictionary(grouping: cities, by: { $0.1 })
// ["NY": [("NYC", "NY"), ("Buffalo", "NY")], "CA": [("LA", "CA"), ("SF", "CA")]]
```

#### generator

```swift
// Swift has no generator functions — use a Sequence
let fib = sequence(state: (0, 1)) { (state: inout (Int, Int)) -> Int? in
    let next = state.0
    state = (state.1, state.0 + state.1)
    return next
}

Array(fib.prefix(10))
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```






