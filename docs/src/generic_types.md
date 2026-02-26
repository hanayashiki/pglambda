# Generic Types

## Type Constructor

Represents a type-level function that takes type arguments and constructs a nominal type. The created type unifies with another type if they have the same constructor and unifiable parameters.

Example:

```ts
SetOf<{ col: int }>;
```

```ts
// new types are identified by both constructor and parameters
A<{ col: int }> !== B<{ col: int }>;

type Col = { col: int };
A<{ col: int }> === A<Col>;
```

## Type Scheme

Common generic type that takes type paremeters to construct another type.

Example

```ts
type Col<A> = SetOf<{ col: A }>;
```

```ts
query map<T, U>(hmms: T, f: (s: T) => U) {
  f(s)
}
// type Map<T, U> = (s: T, f: (s: T) => U) => U
```
