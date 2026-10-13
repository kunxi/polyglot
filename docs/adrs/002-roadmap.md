# 002. Comparison roadmap — additional sections

- Status: Proposed
- Date: 2026-10-13

## Context

The current `meta.md` covers six topics: Types, Control Flow, Functions,
Classes, Collections, and Iterator/generator. These are the core syntax
surfaces, but a polyglot cheat sheet is most useful where languages genuinely
diverge: module systems, concurrency, memory model, and everyday I/O. This ADR
records the candidate sections to add next, so they can be picked up without
re-deciding what belongs.

## Decision

Add new `##` topics (with `###` groups / `####` leaves) in this order of
priority.

### High value

1. **Modules & Imports**
   - import, export/visibility, aliases, namespaces, package manifest
2. **I/O**
   - stdout/print, read file, write file, stdin, path join
3. **Concurrency & Async**
   - threads/coroutines, async/await, futures/promises, channels/queues,
     mutex/lock
4. **Generics / Templates**
   - generic function, generic class, constraints/bounds, variance
5. **Memory & References**
   - value vs reference, pointer/reference, ownership/borrowing, copy vs move,
     immutability

### Medium value

6. **Operators & Bitwise**
   - bitwise and/or/xor, shifts, comparison, operator overloading
7. **Serialization & Regex**
   - JSON parse, JSON stringify, regex match, regex replace
8. **Date & Time**
   - now, format, parse, arithmetic
9. **CLI & Environment**
   - args, env vars, exit codes
10. **Metaprogramming & Reflection**
    - annotations/decorators, introspection, macros, eval

### Extensions to existing topics

- **None/null** → add `Result`/`Either`/`expect`/`unwrap` (monadic chaining)
- **Collections** → add Tuple, Queue/Stack/Deque, Sorting (sort, comparator,
  stable)
- **Types** → add Casting/conversion (explicit, checked vs truncating) and bit
  operations

### Order

`Modules & Imports` → `I/O` → `Concurrency & Async` → `Generics / Templates`
→ `Memory & References` → `Operators & Bitwise` → `Serialization & Regex` →
`Date & Time` → `CLI & Environment` → `Metaprogramming & Reflection`.

First to add: **Modules & Imports**, **I/O**, **Concurrency & Async** — most
universal and largest cross-language contrast.

## Consequences

- `meta.md` remains the single source of truth; each new leaf is validated
  against it, so adding a topic is additive and safe.
- Content files grow per language; sections that don't apply to a language are
  simply omitted on that side (superset semantics).
- No route or build changes are required — the existing whole-content
  rendering picks up new sections automatically.
