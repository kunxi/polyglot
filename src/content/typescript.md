# TypeScript

## Primitive types

TypeScript's `number` is an IEEE-754 double (no separate `int`/`long`); `bigint` gives arbitrary precision. There are no fixed-width signed/unsigned types, and alignment is handled by the JS engine.
### Number

#### integer

```typescript
let a: number = 42;
let b: number = -7;
let c: number = parseInt("42");
let big: bigint = 1000000000000n;
```

#### integer overflow

```typescript
// Numbers are IEEE-754 doubles; integers are exact up to 2^53
Number.MAX_SAFE_INTEGER      // 9007199254740991
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2  // true (precision loss)

// BigInt is arbitrary precision — no overflow
const big = 2n ** 1000n;
```

#### float

```typescript
let x = 3.14;
let y = 1.5e-3;
let z = parseFloat("3.14");
```

#### arithmetic

```typescript
a + b      // addition
a - b      // subtraction
a * b      // multiplication
a / b      // division, always returns float
Math.floor(a / b)   // integer division
a % b      // modulo
a ** b     // exponentiation
```

#### min max abs

```typescript
Math.min(a, b)
Math.max(a, b)
Math.abs(-42)
```

#### random

```typescript
Math.random()                      // 0..1
Math.floor(Math.random() * 6) + 1  // 1..6
```

### Integer types

#### short

```typescript
// No short — number is an IEEE-754 double
```

#### long

```typescript
// No long — number is a double; bigint for large ints
```

#### long long

```typescript
const big = 42n;   // bigint (arbitrary precision)
```

#### unsigned

```typescript
// No unsigned number — BigUint64Array or >>> for unsigned ops
```

#### signed

```typescript
let i = -42;   // signed double
```

#### struct

```typescript
// Use DataView over an ArrayBuffer for a packed layout
const buf = new ArrayBuffer(5);
new DataView(buf).setInt32(1, 2, true);   // little-endian int after byte
```

#### divmod

```typescript
// No divmod — compute both
const q = Math.floor(a / b);
const r = a % b;
const [q, r] = [Math.floor(a / b), a % b];
```

#### rounding

```typescript
Math.round(3.14);        // 3
Math.trunc(3.9);         // 3 (truncates)
Math.floor(3.14);        // 3
(3.14).toFixed(1);       // "3.1"
```

#### range

```typescript
Array.from({ length: 5 }, (_, i) => i)      // [0, 1, 2, 3, 4]
Array.from({ length: 3 }, (_, i) => i + 2)  // [2, 3, 4]
```

#### descending range

```typescript
Array.from({ length: 5 }, (_, i) => 4 - i)  // [4, 3, 2, 1, 0]
for (let i = 10; i >= 0; i -= 2) { }
```

### Boolean

#### literal

```typescript
const t = true;
const f = false;
```

#### negation

```typescript
!true           // false
```

#### logical and

```typescript
true && false   // false
```

#### logical or

```typescript
true || false   // true
```

#### truthy and falsy values

```typescript
// Only false, 0, "", null, undefined, and NaN are falsy
1 !== 0              // explicit check for number
s.length > 0         // explicit check for string
arr.length > 0       // explicit check for array
```

#### conversion

```typescript
Boolean(1)       // true
String(true)     // "true"
!!1              // true
```

### None / null

TypeScript has both `null` and `undefined`; use `?` for optional access.

#### literal

```typescript
let x: string | null = null;
let y: number | undefined = undefined;
```

#### null check

```typescript
if (x !== null && x !== undefined) {
  // ...
}
if (x != null) {   // matches both null and undefined
  // ...
}
```

#### optional access

```typescript
x?.length              // safe access, undefined if null
x?.length ?? 0         // default when nullish
x?.toUpperCase()
```

## Composite types

### String

#### literal

```typescript
let s = "hello";
let s = 'hello';
let s = `multiline
string`;
```

#### length

```typescript
s.length
```

#### access

```typescript
s[0]          // first char
s.charAt(0)   // first char
s.at(-1)      // last char
```

#### slice

```typescript
s.slice(1, 3)     // chars 1..2, exclusive end
s.slice(2)        // from index 2 to end
s.slice(-3)       // last 3 chars
```

#### concatenation

```typescript
s + " world"
s.concat(" world")
`${s} world`
```

#### interpolation

```typescript
`Hello, ${name}`
`Hello, ${name.length}`
```

#### search

```typescript
s.includes("hello")
s.indexOf("lo")          // returns index or -1
s.startsWith("he")
s.endsWith("lo")
```

#### split and join

```typescript
s.split(",")
["a", "b", "c"].join("-")
```

#### trim

```typescript
s.trim()
s.trimStart()
s.trimEnd()
```

#### case

```typescript
s.toUpperCase()
s.toLowerCase()
```

#### replace

```typescript
s.replace("old", "new")
s.replaceAll("old", "new")   // all occurrences
```

#### justify

```typescript
s.padStart(10)    // right justify
s.padEnd(10)      // left justify
```

#### format

```typescript
`Hello, ${name}!`
(3.14159).toFixed(2)          // "3.14"
String(42).padStart(5, "0")   // "00042"
```

### Complex
#### operations

```typescript
// No built-in complex numbers — use a class or library
class Complex {
  constructor(public re: number, public im: number) {}
  add(o: Complex) { return new Complex(this.re + o.re, this.im + o.im); }
  mul(o: Complex) {
    return new Complex(this.re * o.re - this.im * o.im, this.re * o.im + this.im * o.re);
  }
}
const z = new Complex(1, 2);
```

### Date
#### now

```typescript
new Date().toISOString().slice(0, 10)
```
#### format

```typescript
new Date().toLocaleDateString("en-CA")  // YYYY-MM-DD
```
### Datetime
#### now

```typescript
new Date().toISOString()
```
#### format

```typescript
new Date().toISOString().slice(0, 19).replace("T", " ")
```
### Decimal
#### literal

```typescript
// No built-in decimal — 0.1 + 0.2 === 0.30000000000000004
// Use a library like decimal.js
```
#### precision

```typescript
import Decimal from "decimal.js";
new Decimal("0.1").plus("0.2").toString()  // "0.3"
```
## Type system

### type hints

TypeScript is statically typed with structural typing.

#### variable

```typescript
let name: string = "Alice";
let age: number = 30;
let scores: number[] = [1, 2, 3];
```

#### nullable

```typescript
let name: string | null = null;
```

#### function

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

function divide(a: number, b: number): number | null {
  if (b === 0) return null;
  return a / b;
}
```

#### list of elements

```typescript
let names: string[] = ["Alice", "Bob"];
let scores: number[] = [1, 2, 3];
let matrix: number[][] = [[1, 2], [3, 4]];
```

#### dict

```typescript
const ages: Record<string, number> = { Alice: 30, Bob: 25 };
```

### Type operations
#### type alias

```typescript
type Vector = number[];
function scale(scalar: number, v: Vector): Vector {
  return v.map(x => scalar * x);
}
```

#### union

```typescript
type A = number | string;
let v: A = 5; v = "five";
```
#### intersection

```typescript
type A = { x: number } & { y: string };
const o: A = { x: 1, y: "a" };
```
#### literal types

```typescript
type Color = "red" | "green" | "blue";
const c: Color = "red";
```
## Memory model

TypeScript (JavaScript) stores primitives by value and objects — arrays, objects, functions — by reference on the heap. There are no pointers, and the garbage collector frees unreachable objects.

### Memory

#### value vs reference

```typescript
let a = 1;
let b = a;            // value copy
const x = [1, 2];
const y = x;          // same array reference
y.push(3);            // x is also [1, 2, 3]
```

#### pointer / reference

```typescript
// No pointers — objects are references
const s = { name: "dog" };
const t = s;          // same reference
s === t               // true
```

#### ownership / borrowing

```typescript
// No ownership/borrowing — garbage collected
```

#### copy vs move

```typescript
const a = [1, 2, [3, 4]];
const b = [...a];             // shallow copy
const c = structuredClone(a); // deep copy
```

#### immutability

```typescript
const arr = [1, 2, 3] as const;      // readonly
const obj = Object.freeze({ x: 1 }); // frozen
```

## Control Flow

### if

#### basic

```typescript
if (x > 0) {
  console.log("positive");
} else if (x < 0) {
  console.log("negative");
} else {
  console.log("zero");
}
```

#### ternary

```typescript
const s = x > 0 ? "positive" : "not positive";
```

#### as expression

```typescript
// The ternary is the expression form
const n = ok ? 1 : 0;
```

### match / when

#### basic

```typescript
switch (x) {
  case 1: return "one";
  case 2: return "two";
  default: return "other";
}
```

#### guard

```typescript
// No guarded cases — use switch(true) or if/else
switch (true) {
  case x > 0: return "positive";
  case x < 0: return "negative";
  default: return "zero";
}
```

#### destructuring

```typescript
const { x, y } = point;
const [a, b] = [1, 2];
const { action, ...rest } = cmd;
```

#### exhaustiveness

```typescript
type Command = { kind: "move"; x: number; y: number } | { kind: "stop" };

function handle(cmd: Command): string {
  switch (cmd.kind) {
    case "move": return `move to (${cmd.x}, ${cmd.y})`;
    case "stop": return "stop";
    default: {
      const _exhaustive: never = cmd;
      return _exhaustive;
    }
  }
}
```

### for

#### basic

```typescript
for (const item of items) {
  console.log(item);
}
```

#### with index

```typescript
for (const [i, item] of items.entries()) {
  console.log(i, item);
}
```

#### range loop

```typescript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

#### break & continue

```typescript
for (const x of items) {
  if (x < 0) continue;
  if (x === 0) break;
  console.log(x);
}
```

#### for else

```typescript
// No for-else. Use some() or a flag:
const found = items.some(x => x === target);
if (!found) console.log("not found");
```

### while

#### basic

```typescript
while (x > 0) {
  console.log(x);
  x--;
}
```

#### break & continue

```typescript
while (true) {
  const x = nextValue();
  if (x < 0) continue;
  if (x === 0) break;
  console.log(x);
}
```

#### do while

```typescript
do {
  const x = nextValue();
  console.log(x);
} while (x > 0);
```

### Exception

#### try / except

```typescript
try {
  const result = 1 / 0;
} catch (e) {
  console.log("error:", (e as Error).message);
}
```

#### finally

```typescript
try {
  // ...
} finally {
  // always runs
}
```

#### else

```typescript
// No try-else; run the success path after the try
try {
  const result = compute();
  console.log("result is", result);
} catch (e) {
  console.log("error");
}
```

#### raise

```typescript
throw new Error("invalid value");
throw new TypeError("wrong type");
```

#### custom exception

```typescript
class MyError extends Error {
  constructor(message: string) { super(message); this.name = "MyError"; }
}

throw new MyError("something went wrong");
```

#### context manager

```typescript
// try/finally, or using for disposable resources
const f = open("file.txt");
try {
  // ...
} finally {
  f.close();
}
```

## Functions

### Function

#### definition

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

#### default parameters

```typescript
function greet(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}`;
}
```

#### overloading

```typescript
function stringify(arg: number): string;
function stringify(arg: string): string;
function stringify(arg: number | string): string {
  return `${typeof arg === "number" ? "int" : "str"}: ${arg}`;
}
```

#### varargs

```typescript
function sumAll(...args: number[]): number {
  return args.reduce((s, x) => s + x, 0);
}
sumAll(1, 2, 3);
```

#### keyword arguments

```typescript
// Object destructuring gives keyword-style arguments
function configure({ host = "localhost", port = 8080, debug = false } = {}) {
  // ...
}
configure({ host: "example.com", port: 3000, debug: true });
```

#### return

```typescript
function divide(a: number, b: number): number | null {
  if (b === 0) return null;
  return a / b;
}
```

#### callable check

```typescript
typeof greet === "function"   // true
typeof 42 === "function"      // false
```

### Lambda

#### basic

```typescript
const square = (x: number) => x * x;
const add = (a: number, b: number) => a + b;
```

#### as argument

```typescript
nums.map(x => x * 2);
nums.filter(x => x > 2);
nums.sort((a, b) => a - b);
```

#### receiver

```typescript
// Arrow functions capture this lexically; methods bind their receiver
const obj = {
  name: "dog",
  speak() { return this.name; },   // method: this = obj
  arrow: () => this,               // arrow: lexical this
};
```

## Classes

### Class

#### definition

```typescript
class Dog {
  name: string;
}
```

#### constructor

```typescript
class Dog {
  constructor(public name: string) {}
}
```

#### instantiation

```typescript
const dog = new Dog("Fido");
```

#### attributes

```typescript
class Dog {
  name: string;                          // instance field
  static species = "canine";             // class field
}
```

#### method

```typescript
class Dog {
  bark(): string {
    return "Woof!";
  }
}
```

#### inheritance

```typescript
class Animal { }
class Dog extends Animal { }
```

#### multiple inheritance

```typescript
interface X { x(): void; }
interface Y { y(): void; }
class C implements X, Y {
  x() {}
  y() {}
}
// No multiple class inheritance — use mixins to share behavior
```

#### override

```typescript
class Animal {
  speak(): string { return ""; }
}
class Dog extends Animal {
  override speak(): string { return "Woof!"; }
}
```

#### super

```typescript
class Dog extends Animal {
  override speak(): string {
    return super.speak() + "Woof!";
  }
}
```

#### class method

```typescript
class Dog {
  static fromBirthyear(birthyear: number): Dog {
    return new Dog(`dog-${2025 - birthyear}`);
  }
}
```

#### static method

```typescript
class Dog {
  static isCanine(name: string): boolean {
    return name === "dog" || name === "wolf";
  }
}
```

#### abstract

```typescript
abstract class Animal {
  abstract speak(): string;
}
```

#### protocol / interface

```typescript
interface Speaker {
  speak(): string;
}

class Dog implements Speaker {
  speak(): string { return "Woof!"; }
}

function makeSound(s: Speaker): string { return s.speak(); }
```

#### data class

```typescript
// No data class — use an interface + object, or Object.freeze
interface Dog { name: string; age: number; }
const dog: Dog = Object.freeze({ name: "Fido", age: 3 });
```

#### equality

```typescript
// No operator overloading — implement an equals method
class Dog {
  constructor(public name: string) {}
  equals(other: Dog) { return this.name === other.name; }
}
```

#### string representation

```typescript
class Dog {
  constructor(public name: string) {}
  toString() { return `Dog(${this.name})`; }
}
```

#### sealed class

```typescript
// No sealed keyword — model closed sets with union types
type Result =
  | { ok: true; value: number }
  | { ok: false; error: string };
```

#### private

```typescript
class Dog {
  private secret = 42;
  private helper() {}
}
```

#### protected

```typescript
class Animal {
  protected name = "";
  protected feed() {}
}

class Dog extends Animal {
  useName() { return this.name; }
}
```

#### public

```typescript
class Dog {
  public name = "Fido";
}
```

### Interface & trait

TypeScript uses `interface` and structural typing; there is no `trait` keyword — mixins and interfaces fill the role.
#### definition

```typescript
interface Speakable {
  speak(): string;
}

class Dog implements Speakable {
  speak(): string { return "Woof!"; }
}
```

#### default method

```typescript
// Interfaces declare, classes implement; mixins add default behavior
interface Speaker { speak(): string; }
class Dog implements Speaker { speak() { return "Woof!"; } }
```
### Enum

#### definition

```typescript
enum Color {
  Red, Green, Amber,
}
```

#### auto value

```typescript
// enum entries auto-increment from 0
enum Color { Red, Green, Amber }
Color.Amber   // 2
```

#### access

```typescript
Color.Red
Color["Red"]
Color[0]      // "Red" (reverse mapping)
```

#### iteration

```typescript
Object.values(Color)
```

#### lookup

```typescript
Color["Red"]   // Color.Red
```

#### match

```typescript
switch (color) {
  case Color.Red: return "stop";
  case Color.Green: return "go";
  default: return "caution";
}
```

#### enum with data

```typescript
// enums hold no data — use a const object instead
const Planet = {
  Mercury: { mass: 3.303e23, radius: 2.4397e6 },
  Venus: { mass: 4.869e24, radius: 6.0518e6 },
} as const;
```

## Collections

### List

Arrays are the default list.

#### literal

```typescript
const a = [1, 2, 3];
```

#### size

```typescript
a.length
```

#### lookup

```typescript
a[0]        // first element
a.at(-1)    // last element
```

#### update

```typescript
a[0] = 10;
a.push(4);
```

#### is element present

```typescript
a.includes(3)
```

#### delete

```typescript
a.splice(0, 1)           // by index
a.pop()                  // last element
a.filter(x => x !== 3)   // by value
```

#### merge

```typescript
[...a, 4, 5]
a.push(4, 5)
```

#### slice

```typescript
a.slice(1, 3)    // elements at index 1 and 2
```

#### reversed

```typescript
a.toReversed()          // copy, reversed
[...a].reverse()        // copy, reversed
```

#### map

```typescript
a.map(x => x * 2)
```

#### filter

```typescript
a.filter(x => x > 0)
```

### Dictionary

Objects and `Map` for key-value storage.

#### literal

```typescript
const d = { t: 1, f: 0 };
const d = new Map([["t", 1], ["f", 0]]);
```

#### size

```typescript
Object.keys(d).length
d.size    // Map
```

#### lookup

```typescript
d["t"]
d.t
```

#### update

```typescript
d["u"] = -1;
d.u = -1;
```

#### is key present

```typescript
"c" in d
Object.hasOwn(d, "c")
```

#### delete

```typescript
delete d["t"];
```

#### from array of pairs

```typescript
Object.fromEntries([["t", 1], ["f", 0]])
```

#### merge

```typescript
{ ...d, u: -1 }
Object.assign(d, { u: -1 })
```

#### invert

```typescript
Object.fromEntries(Object.entries(d).map(([k, v]) => [v, k]))
```

#### keys and values as arrays

```typescript
Object.keys(d)
Object.values(d)
```

### Set

#### literal

```typescript
const s = new Set([1, 2, 3]);
```

#### size

```typescript
s.size
```

#### add

```typescript
s.add(4);
```

#### is element present

```typescript
s.has(3)
```

#### delete

```typescript
s.delete(3)     // returns false if absent
```

#### from array

```typescript
const a = [1, 2, 3, 2];
const s = new Set(a);   // Set {1, 2, 3}
```

#### merge

```typescript
new Set([...s, ...other])   // union
s.union(other)              // union (ES2025)
s.intersection(other)       // intersection
s.difference(other)         // difference
```

## Iterator and generator

### Iterator

#### chain

```typescript
[...a, ...b]
// or a generator
function* chain<T>(...arrs: T[][]) { for (const a of arrs) yield* a; }
```

#### take

```typescript
arr.slice(0, 4)
```

#### drop

```typescript
arr.slice(3)
```

#### head

```typescript
arr.slice(0, 3)
```

#### takewhile

```typescript
const out = [];
for (const x of [1, 2, 3, 1, 2]) {
  if (x >= 3) break;
  out.push(x);
}
```

#### dropwhile

```typescript
const t = [1, 2, 3, 1, 2];
let i = 0;
while (i < t.length && t[i] < 3) i++;
const out = t.slice(i);
```

#### zip

```typescript
const a = ["a", "b", "c"], b = ["1", "2", "3"];
a.map((x, i) => [x, b[i]])
```

#### enumerate

```typescript
for (const [i, item] of ["a", "b", "c"].entries()) {
  console.log(i + 1, item);
}
```

#### flatten

```typescript
[[1, 2], [3, 4]].flat()   // [1, 2, 3, 4]
```

#### count

```typescript
function* count(start = 0, step = 1) {
  let n = start;
  while (true) { yield n; n += step; }
}
```

#### cycle

```typescript
function* cycle<T>(arr: T[]) {
  let i = 0;
  while (true) { yield arr[i % arr.length]; i++; }
}
```

#### chunked

```typescript
const s = "ABCDEFG";
const chunks = [];
for (let i = 0; i < s.length; i += 3) chunks.push(s.slice(i, i + 3));
```

#### groupby

```typescript
const cities = [["NYC", "NY"], ["LA", "CA"], ["SF", "CA"], ["Buffalo", "NY"]];
Object.groupBy(cities, c => c[1]);   // ES2024
// or reduce
cities.reduce((groups, c) => {
  (groups[c[1]] ??= []).push(c[0]);
  return groups;
}, {} as Record<string, string[]>);
```

#### generator

```typescript
function* fib() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const it = fib();
Array.from({ length: 10 }, () => it.next().value);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Modules & Imports

### Import

#### import

```typescript
import * as fs from "node:fs";
```

#### from import

```typescript
import { readFile } from "node:fs";
```

#### alias

```typescript
import { readFile as read } from "node:fs";
```

### Export

#### export

```typescript
export function f() {}
export default class App {}
```

### Package manager

#### manifest

```typescript
package.json
```

#### install

```typescript
npm install express   // or pnpm add express
```

## Metaprogramming & Reflection

### Annotations

#### annotation

```typescript
function logged(target: any) { /* ... */ }

@logged
class Foo {}
```

### Introspection

#### type name

```typescript
x.constructor.name
```

#### members

```typescript
Object.getOwnPropertyNames(obj)
```

### Macros

#### macro

```typescript
// No macros — use codegen or the compiler API
```

### Eval

#### eval

```typescript
eval("1 + 2")   // 3
```

## Concurrency & Async

### Threads & coroutines

#### thread

```typescript
// worker_threads / Web Workers for parallelism
```

### Async / await

#### async await

```typescript
async function f() {
  await g();
  return 1;
}
```

### Channels / queues

#### channel

```typescript
// No built-in channel — use a queue or async iterators
```

### Mutex / lock

#### mutex

```typescript
// No built-in mutex — use Atomics or a lock library
```

## Generics & Templates

### Generic function

#### function

```typescript
function identity<T>(x: T): T { return x; }
```

### Generic class

#### class

```typescript
class Box<T> { constructor(public value: T) {} }
```

### Constraints / bounds

#### constraint

```typescript
function f<T extends number>(x: T): T { return x; }
```

