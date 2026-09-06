# Rust

## Types

### Number

#### integer

```rust
let a: i32 = 42;
let b: i32 = -7;
let c: i32 = "42".parse().unwrap();
```

#### float

```rust
let x: f64 = 3.14;
let y: f64 = 1.5e-3;
let z: f64 = "3.14".parse().unwrap();
```

#### arithmetic

```rust
a + b      // addition
a - b      // subtraction
a * b      // multiplication
a / b      // integer division if both int
a as f64 / b as f64  // force float division
a % b      // modulo
```

#### divmod

```rust
// Rust has no divmod; use tuple destructuring
let q = a / b;
let r = a % b;
let (q, r) = (a / b, a % b);
```

#### rounding

```rust
3.14_f64.round();    // 3.0
3.14_f64.trunc();    // 3.0 (truncates)
3.9_f64 as i32;      // 3
format!("{:.1}", 3.14); // "3.1"
```

#### min max abs

```rust
a.min(b)
a.max(b)
(-42_i32).abs()
a.clamp(0, 10)
```

#### range

```rust
0..5                 // 0, 1, 2, 3, 4 (exclusive)
0..=4                // 0, 1, 2, 3, 4 (inclusive)
2..=4                // 2, 3, 4
(0..=8).step_by(2).collect::<Vec<_>>() // [0, 2, 4, 6, 8]
(0..5).collect::<Vec<_>>()  // [0, 1, 2, 3, 4]
```

#### descending range

```rust
(0..=4).rev().collect::<Vec<_>>()          // [4, 3, 2, 1, 0]
(0..=10).rev().step_by(2).collect::<Vec<_>>() // [10, 8, 6, 4, 2]
```

#### complex

```rust
// Rust has no built-in complex numbers.
// Use the num crate:
use num::complex::Complex;
let z = Complex::new(1.0_f64, 2.0_f64);
let c = Complex::new(1.0_f64, 2.0_f64);
z.re        // 1.0
z.im        // 2.0
z.conj()    // 1 - 2i
z.norm()    // magnitude
z + c
z * c
```

#### random

```rust
// Requires the rand crate
use rand::Rng;
rand::thread_rng().gen_range(1..=6);
rand::thread_rng().gen_range(0.0..1.0);
```

### String

#### literal

```rust
let s = "hello";
let s = "multiline\nstring";
let s = r#"raw
multiline
string"#;
```

#### length

```rust
s.len()              // bytes
s.chars().count()    // characters
```

#### access

```rust
s.chars().nth(0)     // Option<char> first char
s.as_bytes()[0]      // first byte
```

#### slice

```rust
&s[1..3]             // byte slice, exclusive end
&s[..2]              // first 2 bytes
s.get(1..3)          // Option<&str>, safe on char boundaries
```

#### concatenation

```rust
format!("{} world", s)
s.to_owned() + " world"
vec!["hello", "world"].join(" ")
```

#### interpolation

```rust
format!("Hello, {name}")
format!("Hello, {}", name)
format!("Hello, {}", name.len())
```

#### search

```rust
s.contains("hello")
s.find("lo")          // Option<usize> index or None
s.starts_with("he")
s.ends_with("lo")
```

#### split and join

```rust
s.split(',')
["a", "b", "c"].join("-")
```

#### trim

```rust
s.trim()
s.trim_start()
s.trim_end()
```

#### case

```rust
s.to_uppercase()
s.to_lowercase()
```

#### replace

```rust
s.replace("old", "new")
s.replacen("old", "new", 1)   // first occurrence only
```

#### justify

```rust
format!("{s:>10}")   // right justify
format!("{s:<10}")   // left justify
format!("{s:^10}")   // center
```

### Boolean

#### literal

```rust
let t = true;
let f = false;
```

#### negation

```rust
!true           // false
```

#### logical and

```rust
true && false   // false
```

#### logical or

```rust
true || false   // true
```

#### truthy and falsy values

```rust
// Rust has no implicit truthiness — only bool works in conditions.
1 != 0                     // explicit check for integer
!s.is_empty()              // explicit check for string
!vec.is_empty()            // explicit check for list
```

#### conversion

```rust
1 != 0                    // to Boolean
true.to_string()          // "true"
"true".parse::<bool>()    // Ok(true)
```

### None / null

Rust has no null; absence is modeled with `Option<T>`.

#### literal

```rust
let x: Option<i32> = None;
let y: Option<i32> = Some(5);
```

#### null check

```rust
if let Some(v) = x {
    // ...
}
x.is_some()
x.is_none()
```

#### optional access

```rust
x.map(|v| v.abs())      // Option<i32>
x.unwrap_or(0)          // provide default
x.expect("must exist")  // panic with message if None
x?                      // propagate None in Option-returning fn
```

### type hints

Rust types are mandatory and enforced at compile time.

#### variable

```rust
let name: String = "Alice".to_string();
let mut age: i32 = 30;
let scores: Vec<i32> = vec![1, 2, 3];
```

#### nullable

```rust
let name: Option<String> = None;
```

#### function

```rust
fn greet(name: &str) -> String {
    format!("Hello, {name}")
}

fn divide(a: i32, b: i32) -> Option<f64> {
    if b == 0 { return None; }
    Some(a as f64 / b as f64)
}
```

#### list of elements

```rust
let names: Vec<String> = vec!["Alice".into(), "Bob".into()];
let scores: Vec<i32> = vec![1, 2, 3];
let matrix: Vec<Vec<i32>> = vec![vec![1, 2], vec![3, 4]];
```

#### dict

```rust
use std::collections::HashMap;
let mut ages: HashMap<String, i32> = HashMap::new();
ages.insert("Alice".into(), 30);
ages.insert("Bob".into(), 25);
```

#### type alias

```rust
type Vector = Vec<f64>;
fn scale(scalar: f64, v: &Vector) -> Vector {
    v.iter().map(|x| scalar * x).collect()
}
```

#### protocol / interface

```rust
trait Speaker {
    fn speak(&self) -> String;
}

struct Dog;
impl Speaker for Dog {
    fn speak(&self) -> String {
        "Woof!".to_string()
    }
}

fn make_sound(s: &impl Speaker) -> String {
    s.speak()
}
```

## Control Flow

### if

#### basic

```rust
if x > 0 {
    println!("positive");
} else if x < 0 {
    println!("negative");
} else {
    println!("zero");
}
```

#### ternary

```rust
let s = if x > 0 { "positive" } else { "not positive" };
```

#### as expression

```rust
// if is an expression in Rust — it returns a value
let n = if ok { 1 } else { 0 };

let grade = if score >= 90 {
    "A"
} else if score >= 80 {
    "B"
} else {
    "F"
};
```

### match / when

#### basic

```rust
match x {
    1 => "one",
    2 => "two",
    _ => "other",
}
```

#### guard

```rust
match x {
    n if n > 0 => "positive",
    n if n < 0 => "negative",
    _ => "zero",
}
```

#### destructuring

```rust
match cmd {
    Command::Move { x, y } => format!("move to ({x}, {y})"),
    Command::Stop => "stop".to_string(),
    _ => "unknown".to_string(),
}
```

#### exhaustiveness

```rust
// The compiler checks exhaustiveness for enums
enum Command {
    Move { x: i32, y: i32 },
    Stop,
}

match cmd {   // no wildcard needed — all cases covered
    Command::Move { x, y } => format!("move to ({x}, {y})"),
    Command::Stop => "stop".to_string(),
}
```

### for

#### basic

```rust
for item in &items {
    println!("{item}");
}
```

#### with index

```rust
for (i, item) in items.iter().enumerate() {
    println!("{i}: {item}");
}
```

#### range loop

```rust
for i in 0..10 {
    println!("{i}");
}
```

#### break & continue

```rust
for x in &items {
    if *x < 0 { continue; }
    if *x == 0 { break; }
    println!("{x}");
}
```

#### for else

```rust
// Rust has no for-else. Use any/none or a flag:
let found = items.iter().any(|x| *x == target);
if !found { println!("not found"); }
```

### while

#### basic

```rust
while x > 0 {
    println!("{x}");
    x -= 1;
}
```

#### break & continue

```rust
loop {
    let x = next_value();
    if x < 0 { continue; }
    if x == 0 { break; }
    println!("{x}");
}
```

#### do while

```rust
// Rust has no do-while. Use loop + break:
loop {
    let x = do_something();
    if !condition(x) { break; }
}
```

### Exception

Rust models errors with `Result<T, E>`.

#### try / except

```rust
match divide(1, 0) {
    Ok(result) => println!("{result}"),
    Err(e) => println!("error: {e}"),
}

// or with ? inside a Result-returning function
let result = divide(1, 0)?;
```

#### finally

```rust
// Rust has no finally. Use RAII (Drop) to guarantee cleanup:
{
    let file = File::open("file.txt")?;  // closed on drop
    // ...
}
```

#### else

```rust
// Rust has no try-else. Run the success path after the result:
match compute() {
    Ok(result) => println!("result is {result}"),
    Err(_) => println!("error"),
}
```

#### raise

```rust
return Err("invalid value".to_string());
panic!("unrecoverable error");
```

#### custom exception

```rust
#[derive(Debug)]
enum MyError {
    Something(String),
}

fn fail() -> Result<(), MyError> {
    Err(MyError::Something("something went wrong".into()))
}
```

#### context manager

```rust
// RAII replaces context managers — resources close on drop
use std::fs::File;
use std::io::Read;

let mut content = String::new();
File::open("file.txt")?.read_to_string(&mut content)?;
// file auto-closed when the handle goes out of scope
```

## Functions

### Function

#### definition

```rust
fn greet(name: &str) -> String {
    format!("Hello, {name}")
}
```

#### default parameters

```rust
// Rust has no default parameters — use Option or a builder
fn greet(name: &str, greeting: Option<&str>) -> String {
    let greeting = greeting.unwrap_or("Hello");
    format!("{greeting}, {name}")
}
```

#### overloading

```rust
// Rust has no overloading by signature — use traits or distinct names
fn stringify_int(arg: i32) -> String { format!("int: {arg}") }
fn stringify_str(arg: &str) -> String { format!("str: {arg}") }
```

#### varargs

```rust
// Rust has no varargs — pass a slice or use a macro
fn sum_all(args: &[i32]) -> i32 {
    args.iter().sum()
}
sum_all(&[1, 2, 3]);
```

#### keyword arguments

```rust
// Rust has no keyword arguments — use a struct or builder
struct Config {
    host: String,
    port: u16,
    debug: bool,
}
let c = Config { host: "example.com".into(), port: 3000, debug: true };
```

#### return

```rust
fn divide(a: i32, b: i32) -> Option<f64> {
    if b == 0 { return None; }
    Some(a as f64 / b as f64)
}
```

#### callable check

```rust
// Rust has no callable() — functions are typed
let f = greet as fn(&str) -> String;   // function pointer
// Closures implement Fn/FnMut/FnOnce
```

### Lambda

#### basic

```rust
let square = |x: i32| x * x;
let add = |a: i32, b: i32| a + b;
```

#### as argument

```rust
vec![1, 2, 3].iter().map(|x| x * 2).collect::<Vec<_>>();
vec![1, 2, 3].iter().filter(|&&x| x > 2).collect::<Vec<_>>();

// closure bound on a function
fn apply<F>(f: F, n: i32) -> i32 where F: Fn(i32) -> i32 {
    f(n)
}
```

#### receiver

```rust
// Rust closures have no receiver. Method chaining is the closest analogue:
let result = vec![1, 2, 3]
    .iter()
    .map(|x| x * 2)
    .sum::<i32>();
```

## Classes

Rust uses structs, traits, and enums instead of classes.

### Class

#### definition

```rust
struct Dog {
    name: String,
}
```

#### constructor

```rust
impl Dog {
    fn new(name: String) -> Self {
        Dog { name }
    }
}
```

#### instantiation

```rust
let dog = Dog::new("Fido".to_string());
let dog = Dog { name: "Fido".to_string() };
```

#### attributes

```rust
struct Dog {
    name: String,   // private by default
    pub age: i32,   // public field
}
impl Dog {
    fn name(&self) -> &str { &self.name }
}
```

#### method

```rust
impl Dog {
    fn bark(&self) -> String {
        "Woof!".to_string()
    }
}
```

#### inheritance

```rust
// Rust has no inheritance — use composition and traits
trait Animal {}
struct Dog;
impl Animal for Dog {}
```

#### override

```rust
trait Animal {
    fn speak(&self) -> String;
}

struct Dog;
impl Animal for Dog {
    fn speak(&self) -> String { "Woof!".to_string() }
}
```

#### super

```rust
trait Animal {
    fn speak(&self) -> String { String::new() }
}

struct Dog;
impl Animal for Dog {
    fn speak(&self) -> String {
        Animal::speak(self) + "Woof!"
    }
}
```

#### class method

```rust
impl Dog {
    fn from_birthyear(birthyear: i32) -> Self {
        Dog { name: format!("dog-{}", 2025 - birthyear) }
    }
}
```

#### static method

```rust
impl Dog {
    fn is_canine(name: &str) -> bool {
        matches!(name, "dog" | "wolf")
    }
}
```

#### abstract

```rust
trait Animal {
    fn speak(&self) -> String;   // no default — implementors must define it
}
```

#### interface

```rust
trait Speakable {
    fn speak(&self) -> String;
}

struct Dog;
impl Speakable for Dog {
    fn speak(&self) -> String { "Woof!".to_string() }
}
```

#### data class

```rust
#[derive(Debug, Clone, PartialEq)]
struct Dog {
    name: String,
    age: i32,
}
```

#### equality

```rust
#[derive(PartialEq)]
struct Dog {
    name: String,
}

// or manual
impl PartialEq for Dog {
    fn eq(&self, other: &Self) -> bool {
        self.name == other.name
    }
}
```

#### string representation

```rust
#[derive(Debug)]
struct Dog {
    name: String,
}

// or manual Display
impl std::fmt::Display for Dog {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Dog({})", self.name)
    }
}
```

#### sealed class

```rust
// Rust models closed sets with enums instead of sealed classes
enum Result {
    Success(i32),
    Failure(String),
}

fn handle(r: Result) -> String {
    match r {
        Result::Success(v) => format!("{v}"),
        Result::Failure(e) => e,
    }
}
```

#### private

```rust
struct Dog {
    secret: i32,        // private by default
}
impl Dog {
    fn helper(&self) {} // private by default
}
```

#### protected

```rust
// Rust has no protected — only private (module scope) and public
mod animal {
    pub struct Dog;
    impl Dog {
        pub(super) fn feed(&self) {} // visible to parent module
    }
}
```

#### public

```rust
pub struct Dog {
    pub name: String,
}
```

### Enum

#### definition

```rust
enum Color {
    Red,
    Green,
    Amber,
}
```

#### auto value

```rust
#[repr(u8)]
enum Color {
    Red,
    Green,
    Amber,
}

Color::Red as u8   // 0
Color::Amber as u8 // 2
```

#### access

```rust
Color::Red
Color::Red as u8       // 0 (with #[repr(u8)])
```

#### iteration

```rust
// Rust enums aren't iterable by default — keep a const list
const ALL: [Color; 3] = [Color::Red, Color::Green, Color::Amber];
ALL.iter().collect::<Vec<_>>();
```

#### lookup

```rust
fn from_name(s: &str) -> Option<Color> {
    match s {
        "RED" => Some(Color::Red),
        "GREEN" => Some(Color::Green),
        "AMBER" => Some(Color::Amber),
        _ => None,
    }
}
```

#### match

```rust
match color {
    Color::Red => "stop",
    Color::Green => "go",
    Color::Amber => "caution",
}
```

#### enum with data

```rust
enum Planet {
    Mercury(f64, f64),
    Venus(f64, f64),
}
let mercury = Planet::Mercury(3.303e23, 2.4397e6);
```

## Collections

### List

#### literal

```rust
let a = vec![1, 2, 3];
```

#### size

```rust
a.len()
```

#### lookup

```rust
a[0]          // first element
a.last()      // Option<&i32> last element
a.get(0)      // Option<&i32>
```

#### update

```rust
let mut a = vec![1, 2, 3];
a[0] = 10;
a.push(4);
```

#### is element present

```rust
a.contains(&3)
```

#### delete

```rust
a.remove(0)    // by index
a.pop()        // last element, returns Option
a.retain(|&x| x != 3); // by value
```

#### merge

```rust
a.extend([4, 5]);
let merged = [a.clone(), vec![4, 5]].concat();
```

#### slice

```rust
&a[1..3]                      // elements at index 1 and 2
a.iter().step_by(2).collect::<Vec<_>>()
```

#### reversed

```rust
a.iter().rev().collect::<Vec<_>>()
let mut a = vec![1, 2, 3];
a.reverse();                  // in place
```

#### map

```rust
a.iter().map(|x| x * 2).collect::<Vec<_>>()
```

#### filter

```rust
a.iter().filter(|&&x| x > 0).collect::<Vec<_>>()
```

### Dictionary

`HashMap<K, V>` for key-value storage.

#### literal

```rust
use std::collections::HashMap;
let d = HashMap::from([('t', 1), ('f', 0)]);
```

#### size

```rust
d.len()
```

#### lookup

```rust
d.get(&'t')     // Option<&i32>, returns None if absent
d[&'t']         // panics if absent
```

#### update

```rust
let mut d = HashMap::from([('t', 1), ('f', 0)]);
d.insert('u', -1);
d.entry('u').or_insert(-1);
```

#### is key present

```rust
d.contains_key(&'c')
```

#### delete

```rust
let v = d.remove(&'t');   // Option<i32>, None if absent
```

#### from array of pairs

```rust
let pairs = [('t', 1), ('f', 0)];
let d: HashMap<char, i32> = pairs.into_iter().collect();
```

#### merge

```rust
d.extend([('u', -1)]);
```

#### invert

```rust
let inverted: HashMap<i32, char> = d.iter().map(|(k, v)| (*v, *k)).collect();
```

#### keys and values as arrays

```rust
d.keys().collect::<Vec<_>>()
d.values().collect::<Vec<_>>()
```

### Set

#### literal

```rust
use std::collections::HashSet;
let s = HashSet::from([1, 2, 3]);
```

#### size

```rust
s.len()
```

#### add

```rust
let mut s = HashSet::from([1, 2, 3]);
s.insert(4);
```

#### is element present

```rust
s.contains(&3)
```

#### delete

```rust
s.remove(&3);   // returns false if absent
```

#### from array

```rust
let a = vec![1, 2, 3, 2];
let s: HashSet<i32> = a.into_iter().collect();   // {1, 2, 3}
```

#### merge

```rust
&s | &set_of                 // union
&s & &set_of                 // intersection
&s - &set_of                 // difference
s.union(&set_of)
s.intersection(&set_of)
```

## Iterator and generator

### Iterator

#### chain

```rust
"abc".chars().chain("de".chars()).collect::<String>()
```

#### take

```rust
(1..=10).take(4).collect::<Vec<_>>()     // [1, 2, 3, 4]
```

#### drop

```rust
(1..=10).skip(3).collect::<Vec<_>>()     // [4, 5, 6, 7, 8, 9, 10]
```

#### head

```rust
(1..=10).take(3).collect::<Vec<_>>()     // [1, 2, 3]
```

#### takewhile

```rust
[1, 2, 3, 1, 2].iter()
    .take_while(|&&x| x < 3)
    .collect::<Vec<_>>()                  // [1, 2]
```

#### dropwhile

```rust
[1, 2, 3, 1, 2].iter()
    .skip_while(|&&x| x < 3)
    .collect::<Vec<_>>()                  // [3, 1, 2]
```

#### zip

```rust
"abc".chars().zip("123".chars()).collect::<Vec<_>>()
// [('a', '1'), ('b', '2'), ('c', '3')]

// zip stops at the shortest; no built-in zip_longest
```

#### enumerate

```rust
['a', 'b', 'c'].iter().enumerate()
    .for_each(|(i, item)| println!("{} {}", i + 1, item));
```

#### flatten

```rust
vec![vec![1, 2], vec![3, 4]].into_iter().flatten().collect::<Vec<_>>()
// [1, 2, 3, 4]
```

#### count

```rust
(10..).take(2).collect::<Vec<_>>()            // [10, 11]
(10..).step_by(2).take(3).collect::<Vec<_>>() // [10, 12, 14]
```

#### cycle

```rust
["red", "green", "blue"].iter()
    .cycle()
    .take(5)
    .cloned()
    .collect::<Vec<_>>()   // [red, green, blue, red, green]
```

#### chunked

```rust
let v = vec![1, 2, 3, 4, 5, 6, 7];
v.chunks(3).collect::<Vec<_>>()
// [[1, 2, 3], [4, 5, 6], [7]]
```

#### groupby

```rust
// std has no group_by — use the itertools crate
use itertools::Itertools;

let cities = vec![("NYC", "NY"), ("LA", "CA"), ("SF", "CA"), ("Buffalo", "NY")];
let groups = cities.into_iter().group_by(|c| c.1); // group_by requires sorted input
```

#### generator

```rust
fn fib() -> impl Iterator<Item = u64> {
    let mut a = 0u64;
    let mut b = 1u64;
    std::iter::from_fn(move || {
        let next = a;
        let c = a + b;
        a = b;
        b = c;
        Some(next)
    })
}

fib().take(10).collect::<Vec<_>>()
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```
