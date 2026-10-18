# Language
## Primitive types

Primitive types map directly to hardware storage: `byte`, `short`, `int`, `long`, and `long long`, each signed or unsigned, plus `float` and `double`. Languages with arbitrary-precision integers (e.g. Python) don't map to fixed hardware widths; padding and alignment vary by language and platform.

### Number
#### integer
#### integer overflow
#### float
#### arithmetic
#### min max abs
#### random
### Integer types
#### short
#### long
#### long long
#### unsigned
#### signed
#### struct
#### divmod
#### rounding
#### range
#### descending range
### Boolean
#### literal
#### negation
#### logical and
#### logical or
#### truthy and falsy values
#### conversion
### None / null
#### literal
#### null check
#### optional access
## Composite types

Composite types bundle or extend primitive values: `string`, `complex`, and the `date`/`datetime`/`decimal` types from the standard library.

### String
#### literal
#### length
#### access
#### slice
#### concatenation
#### interpolation
#### search
#### split and join
#### trim
#### case
#### replace
#### justify
#### format
### Complex
#### operations
### Date
#### now
#### format
### Datetime
#### now
#### format
### Decimal
#### literal
#### precision
## Type system

Types beyond simple annotations: `union`, `intersection`, `optional`, and structural `interface` types.

### type hints
#### variable
#### nullable
#### function
#### list of elements
#### dict
### Type operations
#### type alias
#### union
#### intersection
#### literal types
## Memory model

Memory is split between the `stack` and the `heap`. The `stack` holds local variables and call frames — fast, automatically managed, and freed on return. The `heap` holds dynamically allocated objects that outlive the current call and are shared; languages differ in how (and whether) heap memory is reclaimed.

Across threads, the memory model also defines ordering. `Sequentially consistent` programs behave as if operations run in one global order, while `acquire`/`release` and `relaxed` orderings allow weaker, faster guarantees. Languages range from strongly ordered defaults to explicit ordering primitives.

### Memory
#### value vs reference
#### pointer / reference
#### ownership / borrowing
#### copy vs move
#### immutability
## Control Flow
### if
#### basic
#### ternary
#### as expression
### match / when
#### basic
#### guard
#### destructuring
#### exhaustiveness
### for
#### basic
#### with index
#### range loop
#### break & continue
#### for else
### while
#### basic
#### break & continue
#### do while
### Exception
#### try / except
#### finally
#### else
#### raise
#### custom exception
#### context manager
## Functions
### Function
#### definition
#### default parameters
#### overloading
#### varargs
#### keyword arguments
#### return
#### callable check
### Lambda
#### basic
#### as argument
#### receiver
## Classes
### Class
#### definition
#### constructor
#### instantiation
#### attributes
#### method
#### inheritance
#### multiple inheritance
#### override
#### super
#### class method
#### static method
#### abstract
#### protocol / interface
#### data class
#### equality
#### string representation
#### sealed class
#### private
#### protected
#### public
### Interface & trait

Interfaces and traits declare shared behavior. Some languages also allow default methods that provide an implementation.

#### definition
#### default method
### Enum
#### definition
#### auto value
#### access
#### iteration
#### lookup
#### match
#### enum with data
## Collections
### List
#### literal
#### size
#### lookup
#### update
#### is element present
#### delete
#### merge
#### slice
#### reversed
#### map
#### filter
### Dictionary
#### literal
#### size
#### lookup
#### update
#### is key present
#### delete
#### from array of pairs
#### merge
#### invert
#### keys and values as arrays
### Set
#### literal
#### size
#### add
#### is element present
#### delete
#### from array
#### merge
## Iterator and generator
### Iterator
#### chain
#### take
#### drop
#### head
#### takewhile
#### dropwhile
#### zip
#### enumerate
#### flatten
#### count
#### cycle
#### chunked
#### groupby
#### generator
