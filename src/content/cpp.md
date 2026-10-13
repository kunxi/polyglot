# C++

## Types

### Number

#### integer

```cpp
int a = 42;
int b = -7;
int c = std::stoi("42");
long long big = 1000000000000LL;
```

#### integer overflow

```cpp
// Signed overflow is undefined behavior; unsigned wraps
unsigned char x = 255;
x + 1;                    // 0 (unsigned wraps)
// Use -fsanitize=undefined to catch signed overflow at runtime
```

#### float

```cpp
double x = 3.14;
double y = 1.5e-3;
double z = std::stod("3.14");
```

#### arithmetic

```cpp
a + b      // addition
a - b      // subtraction
a * b      // multiplication
a / b      // integer division if both int
double(a) / b   // force float division
a % b      // modulo
```

#### divmod

```cpp
int q = a / b;
int r = a % b;
auto [q, r] = std::div(a, b);   // std::div_t with quot and rem
```

#### rounding

```cpp
std::round(3.14);        // 3.0
int(3.9);                // 3 (truncates)
std::floor(3.14);        // 3.0
std::format("{:.1f}", 3.14); // "3.1" (C++20)
```

#### min max abs

```cpp
std::min(a, b)
std::max(a, b)
std::abs(-42)
std::clamp(a, 0, 10)
```

#### range

```cpp
for (int i : std::views::iota(0, 5)) {}  // 0..4 (exclusive)
for (int i : std::views::iota(2, 5)) {}  // 2, 3, 4
for (int i : std::views::iota(0, 9) | std::views::stride(2)) {} // 0, 2, 4, 6, 8
```

#### descending range

```cpp
for (int i = 4; i >= 0; --i) {}        // 4, 3, 2, 1, 0
for (int i : std::views::iota(0, 11) | std::views::reverse) {} // 10..0
```

#### complex

```cpp
#include <complex>
std::complex<double> z(1.0, 2.0);
std::complex<double> c(1.0, 2.0);
z.real()       // 1.0
z.imag()       // 2.0
std::conj(z)   // 1 - 2i
std::abs(z)    // magnitude
z + c
z * c
```

#### random

```cpp
#include <random>
std::mt19937 rng{std::random_device{}()};
std::uniform_int_distribution<int> dist(1, 6);
dist(rng);
std::uniform_real_distribution<double> rdist(0.0, 1.0);
rdist(rng);
```

### String

#### literal

```cpp
std::string s = "hello";
std::string s = "multiline\nstring";
std::string s = R"(raw
multiline
string)";
```

#### length

```cpp
s.size()
s.length()
```

#### access

```cpp
s[0]          // first char
s.front()     // first char
s.back()      // last char
```

#### slice

```cpp
s.substr(1, 2)   // 2 chars from index 1
s.substr(2)      // from index 2 to end
```

#### concatenation

```cpp
s + " world"
s.append(" world")
std::string("hello") + " world"
```

#### interpolation

```cpp
std::format("Hello, {}", name)            // C++20
std::format("Hello, {}", name.size())
```

#### search

```cpp
s.find("lo")            // returns index or std::string::npos
s.contains("hello")     // C++23
s.starts_with("he")     // C++20
s.ends_with("lo")       // C++20
```

#### split and join

```cpp
// No built-in split — tokenize with a loop or views::split
for (auto word : s | std::views::split(',')) {
    // ...
}
// join by loop
std::string joined;
for (auto& w : words) joined += (joined.empty() ? "" : "-") + w;
```

#### trim

```cpp
auto trim = [](std::string s) {
    s.erase(s.begin(), std::find_if_not(s.begin(), s.end(), ::isspace));
    s.erase(std::find_if_not(s.rbegin(), s.rend(), ::isspace).base(), s.end());
    return s;
};
```

#### case

```cpp
std::transform(s.begin(), s.end(), s.begin(), ::toupper);
std::transform(s.begin(), s.end(), s.begin(), ::tolower);
```

#### replace

```cpp
s.replace(s.find("old"), 3, "new")   // first occurrence
// replace all via loop or std::regex_replace
```

#### justify

```cpp
std::format("{:>10}", s)    // right justify
std::format("{:<10}", s)    // left justify
```

### Boolean

#### literal

```cpp
bool t = true;
bool f = false;
```

#### negation

```cpp
!true           // false
```

#### logical and

```cpp
true && false   // false
```

#### logical or

```cpp
true || false   // true
```

#### truthy and falsy values

```cpp
// C++ converts to bool implicitly, but write explicit checks
1 != 0                      // explicit check for integer
!s.empty()                  // explicit check for string
!vec.empty()                // explicit check for vector
```

#### conversion

```cpp
1 != 0              // to Boolean
std::to_string(true) // "1"  (use "true"/"false" via stream)
```

### None / null

C++ uses `nullptr` and `std::optional<T>`.

#### literal

```cpp
int* p = nullptr;
std::optional<int> x = std::nullopt;
std::optional<int> y = 5;
```

#### null check

```cpp
if (p != nullptr) { /* ... */ }
x.has_value()
if (x) { /* x has a value */ }
```

#### optional access

```cpp
x.value_or(0)      // provide default
x.value()          // throws std::bad_optional_access if empty
*x                 // dereference
x->member          // member access
```

### type hints

C++ is statically typed; types are mandatory.

#### variable

```cpp
std::string name = "Alice";
int age = 30;
std::vector<int> scores = {1, 2, 3};
```

#### nullable

```cpp
std::optional<std::string> name = std::nullopt;
```

#### function

```cpp
std::string greet(const std::string& name) {
    return "Hello, " + name;
}

std::optional<double> divide(int a, int b) {
    if (b == 0) return std::nullopt;
    return double(a) / b;
}
```

#### list of elements

```cpp
std::vector<std::string> names = {"Alice", "Bob"};
std::vector<int> scores = {1, 2, 3};
std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
```

#### dict

```cpp
std::unordered_map<std::string, int> ages = {{"Alice", 30}, {"Bob", 25}};
```

#### type alias

```cpp
using Vector = std::vector<double>;
auto scale(double scalar, const Vector& v) {
    Vector out;
    for (double x : v) out.push_back(scalar * x);
    return out;
}
```

#### protocol / interface

```cpp
class Speaker {
public:
    virtual std::string speak() const = 0;
    virtual ~Speaker() = default;
};

class Dog : public Speaker {
public:
    std::string speak() const override { return "Woof!"; }
};

std::string make_sound(const Speaker& s) { return s.speak(); }
```

## Memory & Reference

### Memory

#### value vs reference

```cpp
int a = 1;
int b = a;                    // value copy
std::vector<int> x = {1, 2};
std::vector<int> y = x;       // copy (value semantics)
y.push_back(3);               // x unchanged
```

#### pointer / reference

```cpp
int x = 5;
int* p = &x;                  // pointer
int& r = x;                   // reference
std::unique_ptr<int> up = std::make_unique<int>(5);
```

#### ownership / borrowing

```cpp
// RAII + smart pointers express ownership
std::unique_ptr<int> u = std::make_unique<int>(5);   // unique ownership
std::shared_ptr<int> s = std::make_shared<int>(5);   // shared ownership
```

#### copy vs move

```cpp
std::vector<int> a = {1, 2};
std::vector<int> b = a;             // copy
std::vector<int> c = std::move(a);  // move — a is emptied
```

#### immutability

```cpp
const int x = 5;
const std::vector<int> v = {1, 2, 3};
```

## Control Flow

### if

#### basic

```cpp
if (x > 0) {
    std::cout << "positive\n";
} else if (x < 0) {
    std::cout << "negative\n";
} else {
    std::cout << "zero\n";
}
```

#### ternary

```cpp
std::string s = x > 0 ? "positive" : "not positive";
```

#### as expression

```cpp
// The ternary is the expression form
int n = ok ? 1 : 0;
```

### match / when

#### basic

```cpp
switch (x) {
    case 1:  return "one";
    case 2:  return "two";
    default: return "other";
}
```

#### guard

```cpp
// C++ has no guarded cases — use if/else chains
if (x > 0) return "positive";
if (x < 0) return "negative";
return "zero";
```

#### destructuring

```cpp
// C++17 structured bindings destructure pairs/tuples/structs
auto [m, s] = std::pair{1, "one"};
struct Point { int x; int y; };
auto [x, y] = Point{1, 2};
```

#### exhaustiveness

```cpp
// C++ doesn't enforce exhaustiveness — add default or -Wswitch
enum class Color { Red, Green, Amber };
switch (color) {
    case Color::Red:    return "stop";
    case Color::Green:  return "go";
    case Color::Amber:  return "caution";
}
```

### for

#### basic

```cpp
for (const auto& item : items) {
    std::cout << item << '\n';
}
```

#### with index

```cpp
for (size_t i = 0; i < items.size(); ++i) {
    std::cout << i << ": " << items[i] << '\n';
}
// C++23
for (auto [i, item] : items | std::views::enumerate) { }
```

#### range loop

```cpp
for (int i = 0; i < 10; ++i) { }
for (int i : std::views::iota(0, 10)) { }
```

#### break & continue

```cpp
for (int x : items) {
    if (x < 0) continue;
    if (x == 0) break;
    std::cout << x << '\n';
}
```

#### for else

```cpp
// C++ has no for-else. Use any_of or a flag:
bool found = std::ranges::any_of(items, [&](int x) { return x == target; });
if (!found) std::cout << "not found\n";
```

### while

#### basic

```cpp
while (x > 0) {
    std::cout << x << '\n';
    --x;
}
```

#### break & continue

```cpp
while (true) {
    int x = next_value();
    if (x < 0) continue;
    if (x == 0) break;
    std::cout << x << '\n';
}
```

#### do while

```cpp
do {
    int x = next_value();
    std::cout << x << '\n';
} while (x > 0);
```

### Exception

#### try / except

```cpp
try {
    int result = 1 / 0;
} catch (const std::exception& e) {
    std::cout << "error: " << e.what() << '\n';
}
```

#### finally

```cpp
// C++ has no finally — use RAII (destructors run on scope exit)
{
    std::ifstream f("file.txt");
    // f auto-closes when it goes out of scope
}
```

#### else

```cpp
// C++ has no try-else; run the success path after the try
try {
    int result = compute();
    std::cout << "result is " << result << '\n';
} catch (const std::exception&) {
    std::cout << "error\n";
}
```

#### raise

```cpp
throw std::runtime_error("invalid value");
throw std::logic_error("unrecoverable error");
```

#### custom exception

```cpp
class MyError : public std::exception {
    std::string msg;
public:
    MyError(std::string m) : msg(std::move(m)) {}
    const char* what() const noexcept override { return msg.c_str(); }
};

throw MyError("something went wrong");
```

#### context manager

```cpp
// RAII replaces context managers — resources close on scope exit
#include <fstream>
#include <sstream>
std::stringstream content;
{
    std::ifstream f("file.txt");
    content << f.rdbuf();
}
```

## Functions

### Function

#### definition

```cpp
std::string greet(const std::string& name) {
    return "Hello, " + name;
}
```

#### default parameters

```cpp
std::string greet(const std::string& name,
                  const std::string& greeting = "Hello") {
    return greeting + ", " + name;
}
```

#### overloading

```cpp
std::string stringify(int arg) { return "int: " + std::to_string(arg); }
std::string stringify(const std::string& arg) { return "str: " + arg; }
```

#### varargs

```cpp
int sum_all(std::initializer_list<int> args) {
    int s = 0;
    for (int a : args) s += a;
    return s;
}
sum_all({1, 2, 3});
```

#### keyword arguments

```cpp
// C++ has no keyword arguments — use a struct
struct Config {
    std::string host = "localhost";
    int port = 8080;
    bool debug = false;
};
Config c{.host = "example.com", .port = 3000, .debug = true}; // C++20
```

#### return

```cpp
std::optional<double> divide(int a, int b) {
    if (b == 0) return std::nullopt;
    return double(a) / b;
}
```

#### callable check

```cpp
// Use type traits to check callability
static_assert(std::is_invocable_v<decltype(greet), const std::string&>);
std::function<std::string(const std::string&)> f = greet;
```

### Lambda

#### basic

```cpp
auto square = [](int x) { return x * x; };
auto add = [](int a, int b) { return a + b; };
```

#### as argument

```cpp
std::vector<int> out;
std::transform(nums.begin(), nums.end(), std::back_inserter(out),
               [](int x) { return x * 2; });
std::ranges::sort(nums, [](int a, int b) { return a > b; });
```

#### receiver

```cpp
// Capture the receiver with this or [&]
struct Builder {
    std::string s;
    Builder& append(const std::string& t) { s += t; return *this; }
};
Builder b;
b.append("Hello").append(" ").append("World");
```

## Classes

### Class

#### definition

```cpp
class Dog {
    std::string name;
};
```

#### constructor

```cpp
class Dog {
    std::string name;
public:
    Dog(std::string n) : name(std::move(n)) {}
};
```

#### instantiation

```cpp
Dog dog("Fido");
```

#### attributes

```cpp
class Dog {
    std::string name;            // instance field
    static inline std::string species = "canine"; // class field
};
```

#### method

```cpp
class Dog {
public:
    std::string bark() { return "Woof!"; }
};
```

#### inheritance

```cpp
class Animal { };
class Dog : public Animal { };
```

#### override

```cpp
class Animal {
public:
    virtual std::string speak() { return ""; }
};
class Dog : public Animal {
public:
    std::string speak() override { return "Woof!"; }
};
```

#### super

```cpp
class Dog : public Animal {
public:
    std::string speak() override {
        return Animal::speak() + "Woof!";
    }
};
```

#### class method

```cpp
class Dog {
public:
    static Dog from_birthyear(int birthyear) {
        return Dog("dog-" + std::to_string(2025 - birthyear));
    }
};
```

#### static method

```cpp
class Dog {
public:
    static bool is_canine(const std::string& name) {
        return name == "dog" || name == "wolf";
    }
};
```

#### abstract

```cpp
class Animal {
public:
    virtual std::string speak() = 0;   // pure virtual
    virtual ~Animal() = default;
};
```

#### interface

```cpp
class Speakable {
public:
    virtual std::string speak() = 0;
    virtual ~Speakable() = default;
};

class Dog : public Speakable {
public:
    std::string speak() override { return "Woof!"; }
};
```

#### data class

```cpp
// C++20 defaulted comparisons make a value-like struct
struct Dog {
    std::string name;
    int age;
    bool operator==(const Dog&) const = default;
};
```

#### equality

```cpp
struct Dog {
    std::string name;
    bool operator==(const Dog& o) const { return name == o.name; }
};
```

#### string representation

```cpp
struct Dog {
    std::string name;
    friend std::ostream& operator<<(std::ostream& os, const Dog& d) {
        return os << "Dog(" << d.name << ")";
    }
};
```

#### sealed class

```cpp
class Result final { /* cannot be subclassed */ };
```

#### private

```cpp
class Dog {
    int secret = 42;       // private by default
    void helper() {}
};
```

#### protected

```cpp
class Animal {
protected:
    std::string name;
    void feed() {}
};

class Dog : public Animal {
public:
    std::string use_name() { return name; }
};
```

#### public

```cpp
class Dog {
public:
    std::string name = "Fido";
};
```

### Enum

#### definition

```cpp
enum class Color {
    Red, Green, Amber
};
```

#### auto value

```cpp
// enum class values get auto underlying ints
enum class Color { Red, Green, Amber };
static_cast<int>(Color::Amber)   // 2
```

#### access

```cpp
Color::Red
static_cast<int>(Color::Red)     // 0
```

#### iteration

```cpp
// enum classes aren't iterable by default — keep a constexpr array
constexpr Color ALL[] = {Color::Red, Color::Green, Color::Amber};
for (Color c : ALL) { }
```

#### lookup

```cpp
std::optional<Color> from_name(const std::string& s) {
    if (s == "RED") return Color::Red;
    if (s == "GREEN") return Color::Green;
    if (s == "AMBER") return Color::Amber;
    return std::nullopt;
}
```

#### match

```cpp
switch (color) {
    case Color::Red:    return "stop";
    case Color::Green:  return "go";
    case Color::Amber:  return "caution";
}
```

#### enum with data

```cpp
enum class Planet {
    Mercury, Venus
};
struct PlanetData { double mass; double radius; };
const std::map<Planet, PlanetData> data = {
    {Planet::Mercury, {3.303e23, 2.4397e6}},
    {Planet::Venus,   {4.869e24, 6.0518e6}},
};
```

## Collections

### List

`std::vector<T>` is the default dynamic list.

#### literal

```cpp
std::vector<int> a = {1, 2, 3};
```

#### size

```cpp
a.size()
```

#### lookup

```cpp
a[0]        // first element
a.front()   // first element
a.back()    // last element
a.at(0)     // bounds-checked
```

#### update

```cpp
a[0] = 10;
a.push_back(4);
```

#### is element present

```cpp
std::ranges::find(a, 3) != a.end()
std::ranges::contains(a, 3)   // C++23
```

#### delete

```cpp
a.erase(a.begin());          // by index
a.pop_back();                // last element
std::erase(a, 3);            // by value (C++20)
```

#### merge

```cpp
a.insert(a.end(), {4, 5});
std::vector<int> b = {4, 5};
a.insert(a.end(), b.begin(), b.end());
```

#### slice

```cpp
std::vector<int> sub(a.begin() + 1, a.begin() + 3);  // elements at index 1, 2
```

#### reversed

```cpp
std::ranges::reverse(a);            // in place
for (int x : a | std::views::reverse) { }
```

#### map

```cpp
auto out = a | std::views::transform([](int x) { return x * 2; });
```

#### filter

```cpp
auto out = a | std::views::filter([](int x) { return x > 0; });
```

### Dictionary

`std::map` / `std::unordered_map` for key-value storage.

#### literal

```cpp
std::unordered_map<char, int> d = {{'t', 1}, {'f', 0}};
```

#### size

```cpp
d.size()
```

#### lookup

```cpp
d['t']         // inserts 0 if absent
d.at('t')      // throws std::out_of_range if absent
d.find('t')    // iterator, end() if absent
```

#### update

```cpp
d['u'] = -1;
d.insert_or_assign('u', -1);
```

#### is key present

```cpp
d.contains('c')    // C++20
d.count('c') > 0
```

#### delete

```cpp
d.erase('t')       // 0 if absent
```

#### from array of pairs

```cpp
std::vector<std::pair<char, int>> pairs = {{'t', 1}, {'f', 0}};
std::unordered_map<char, int> d(pairs.begin(), pairs.end());
```

#### merge

```cpp
std::unordered_map<char, int> other = {{'u', -1}};
d.insert(other.begin(), other.end());
```

#### invert

```cpp
std::unordered_map<int, char> inverted;
for (auto& [k, v] : d) inverted[v] = k;
```

#### keys and values as arrays

```cpp
std::vector<char> keys;
std::vector<int> values;
for (auto& [k, v] : d) {
    keys.push_back(k);
    values.push_back(v);
}
```

### Set

`std::set` / `std::unordered_set`.

#### literal

```cpp
std::unordered_set<int> s = {1, 2, 3};
```

#### size

```cpp
s.size()
```

#### add

```cpp
s.insert(4);
```

#### is element present

```cpp
s.contains(3)    // C++20
s.count(3) > 0
```

#### delete

```cpp
s.erase(3);      // 0 if absent
```

#### from array

```cpp
std::vector<int> a = {1, 2, 3, 2};
std::unordered_set<int> s(a.begin(), a.end());   // {1, 2, 3}
```

#### merge

```cpp
s.insert(other.begin(), other.end());          // union
std::erase_if(s, [&](int x) { return !other.contains(x); }); // intersection
std::erase_if(s, [&](int x) { return other.contains(x); });  // difference
```

## Iterator and generator

### Iterator

#### chain

```cpp
for (char c : std::views::concat("abc"sv, "de"sv)) { }   // C++26
// or join two views manually
```

#### take

```cpp
for (int i : std::views::iota(1) | std::views::take(4)) { }   // 1..4
```

#### drop

```cpp
for (int i : std::views::iota(1) | std::views::drop(3) | std::views::take(7)) { } // 4..10
```

#### head

```cpp
for (int i : std::views::iota(1) | std::views::take(3)) { }   // 1, 2, 3
```

#### takewhile

```cpp
std::vector v = {1, 2, 3, 1, 2};
for (int x : v | std::views::take_while([](int x) { return x < 3; })) { } // 1, 2
```

#### dropwhile

```cpp
std::vector v = {1, 2, 3, 1, 2};
for (int x : v | std::views::drop_while([](int x) { return x < 3; })) { } // 3, 1, 2
```

#### zip

```cpp
// C++23 views::zip
for (auto [a, b] : std::views::zip(std::array{'a','b','c'}, std::array{'1','2','3'})) {
    // ('a','1'), ('b','2'), ('c','3')
}
```

#### enumerate

```cpp
// C++23 views::enumerate
for (auto [i, item] : std::views::enumerate(items)) {
    std::cout << (i + 1) << ' ' << item << '\n';
}
```

#### flatten

```cpp
std::vector<std::vector<int>> nested = {{1, 2}, {3, 4}};
for (int x : nested | std::views::join) { }   // 1, 2, 3, 4
```

#### count

```cpp
for (int i : std::views::iota(10) | std::views::take(2)) { }        // 10, 11
for (int i : std::views::iota(10) | std::views::stride(2) | std::views::take(3)) { } // 10, 12, 14
```

#### cycle

```cpp
std::vector colors = {"red", "green", "blue"};
for (auto& c : std::views::repeat(colors) | std::views::join | std::views::take(5)) { }
// red, green, blue, red, green
```

#### chunked

```cpp
std::string s = "ABCDEFG";
for (auto chunk : s | std::views::chunk(3)) { }   // C++23
// "ABC", "DEF", "G"
```

#### groupby

```cpp
std::vector cities = {std::pair{"NYC", "NY"}, {"LA", "CA"}, {"SF", "CA"}, {"Buffalo", "NY"}};
std::ranges::sort(cities, {}, &std::pair<std::string,std::string>::second);
for (auto group : cities | std::views::chunk_by([](auto& a, auto& b) {
    return a.second == b.second;
})) { }
```

#### generator

```cpp
#include <generator>   // C++23
std::generator<long long> fib() {
    long long a = 0, b = 1;
    while (true) {
        co_yield a;
        auto next = a + b;
        a = b;
        b = next;
    }
}
// for (long long x : fib() | std::views::take(10)) { }
```
