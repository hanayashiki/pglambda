# Type Categories

## Base Types

- **Primitive types**: `int`, `int2`, `int4`, `int8`, `numeric`, `text`, `bool`, `timestamp`, etc.
- **Null handling**: `T | null` for nullable types
- **Type variables**: `α`, `β`, etc. (unknowns to be inferred)

## Composite Types

- **Array types**: `T[]` for arrays
- **Record types**: `{field1: T1, field2: T2}` for row types

## Polymorphism

- **Ad-hoc polymorphism**: Operators like `+`, `||` work on multiple types via overloading (to be specify)
- **Overload resolution**: Select the correct function signature based on argument types
