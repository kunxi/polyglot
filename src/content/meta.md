# Language
## Types

A [type system](https://en.wikipedia.org/wiki/Type_system) assigns a type to each value and expression, constraining which operations are legal. Languages differ in [static vs dynamic checking](https://en.wikipedia.org/wiki/Type_system#Static_type_checking), [strong vs weak typing](https://en.wikipedia.org/wiki/Strong_and_weak_typing), and how much [type inference](https://en.wikipedia.org/wiki/Type_inference) they perform.

### Primitive types

Primitive types map directly to hardware storage: `byte`, `short`, `int`, `long`, and `long long`, each signed or unsigned, plus `float` and `double`. Languages with arbitrary-precision integers (e.g. Python) don't map to fixed hardware widths; padding and alignment vary by language and platform. See [Primitive data type](https://en.wikipedia.org/wiki/Primitive_data_type).

#### Number
##### integer
##### integer overflow
##### float
##### arithmetic
##### min max abs
##### random
#### Integer types
##### short
##### long
##### long long
##### unsigned
##### signed
##### struct
##### divmod
##### rounding
##### range
##### descending range
#### Boolean
##### literal
##### negation
##### logical and
##### logical or
##### xor
##### truthy and falsy values
##### conversion
#### Nullability
##### literal
##### null check
##### optional access
### Composite types

Composite types bundle or extend primitive values: `string`, `complex`, and the `date`/`datetime`/`decimal` types from the standard library. See [Data type](https://en.wikipedia.org/wiki/Data_type).

#### String
##### literal
##### length
##### access
##### slice
##### concatenation
##### interpolation
##### search
##### split and join
##### trim
##### case
##### replace
##### justify
##### format
#### Complex
##### operations
#### Date
##### now
##### format
#### Datetime
##### now
##### format
#### Decimal
##### literal
##### precision
### Type system

Types beyond simple annotations: `union`, `intersection`, `optional`, and structural `interface` types. See [Algebraic data type](https://en.wikipedia.org/wiki/Algebraic_data_type).

#### type hints
##### variable
##### nullable
##### function
##### list of elements
##### dict
#### Type operations
##### type alias
##### union
##### intersection
##### literal types
### Memory model

Memory is split between the `stack` and the `heap`. The `stack` holds local variables and call frames — fast, automatically managed, and freed on return. The `heap` holds dynamically allocated objects that outlive the current call and are shared; languages differ in how (and whether) heap memory is reclaimed.

Across threads, the memory model also defines ordering. `Sequentially consistent` programs behave as if operations run in one global order, while `acquire`/`release` and `relaxed` orderings allow weaker, faster guarantees. Languages range from strongly ordered defaults to explicit ordering primitives. See [Memory model (programming)](https://en.wikipedia.org/wiki/Memory_model_(programming)) and [Memory management](https://en.wikipedia.org/wiki/Memory_management).

#### Memory
##### value vs reference
##### pointer / reference
##### ownership / borrowing
##### copy vs move
##### immutability
## Statements
### Control Flow

Control flow determines the order in which statements execute. See [Control flow](https://en.wikipedia.org/wiki/Control_flow).

#### if
##### basic
##### ternary
##### as expression
#### match / when
##### basic
##### guard
##### destructuring
##### exhaustiveness
#### for
##### basic
##### with index
##### range loop
##### break & continue
##### for else
#### while
##### basic
##### break & continue
##### do while
#### Exception
##### try / except
##### finally
##### else
##### raise
##### custom exception
##### context manager
### Functions

Functions package a reusable block of code. See [Subroutine](https://en.wikipedia.org/wiki/Subroutine).

#### Function
##### definition
##### default parameters
##### overloading
##### varargs
##### keyword arguments
##### return
##### callable check
#### Lambda
##### basic
##### as argument
##### receiver
## Classes & Interfaces
### Classes

Classes define objects and their behavior. See [Class (computer programming)](https://en.wikipedia.org/wiki/Class_(computer_programming)).

#### Class
##### definition
##### constructor
##### instantiation
##### attributes
##### method
##### inheritance
##### multiple inheritance
##### override
##### super
##### class method
##### static method
##### abstract
##### protocol / interface
##### data class
##### equality
##### string representation
##### sealed class
##### private
##### protected
##### public
#### Interface & trait

Interfaces and traits declare shared behavior. Some languages also allow default methods that provide an implementation.

##### definition
##### default method
#### Enum
##### definition
##### auto value
##### access
##### iteration
##### lookup
##### match
##### enum with data
## Collections & Iterators
### Collections

Collections hold groups of values. See [Collection (abstract data type)](https://en.wikipedia.org/wiki/Collection_(abstract_data_type)).

#### List
##### literal
##### size
##### lookup
##### update
##### is element present
##### delete
##### merge
##### slice
##### reversed
##### map
##### filter
#### Dictionary
##### literal
##### size
##### lookup
##### update
##### is key present
##### delete
##### from array of pairs
##### merge
##### invert
##### keys and values as arrays
#### Set
##### literal
##### size
##### add
##### is element present
##### delete
##### from array
##### merge
### Iterator and generator

Iterators traverse a sequence; generators produce values lazily. See [Iterator](https://en.wikipedia.org/wiki/Iterator) and [Generator (computer programming)](https://en.wikipedia.org/wiki/Generator_(computer_programming)).

#### Iterator
##### chain
##### take
##### drop
##### head
##### takewhile
##### dropwhile
##### zip
##### enumerate
##### flatten
##### count
##### cycle
##### chunked
##### groupby
##### generator

## Modules

Modules organize code into reusable units; a package manager resolves and installs dependencies. See [Modular programming](https://en.wikipedia.org/wiki/Modular_programming).

### Import
#### import
#### from import
#### alias
### Export
#### export
### Package manager
#### manifest
#### install

## Metaprogramming

Code that inspects or generates code at compile time or runtime. See [Metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming) and [Reflective programming](https://en.wikipedia.org/wiki/Reflective_programming).

### Annotations
#### annotation
### Introspection
#### type name
#### members
### Macros
#### macro
### Eval
#### eval

## Concurrency

Code that runs concurrently: threads and coroutines, async/await, channels for message passing, and locks for shared state. See [Concurrency (computer science)](https://en.wikipedia.org/wiki/Concurrency_(computer_science)).

### Threads & coroutines
#### thread
### Async / await
#### async await
### Channels / queues
#### channel
### Mutex / lock
#### mutex

## Generic

Code parameterized over types. See [Generic programming](https://en.wikipedia.org/wiki/Generic_programming).

### Generic function
#### function
### Generic class
#### class
### Constraints / bounds
#### constraint

