# Execution Model

## Two Expression Worlds

PGL source contains two distinct expression languages that compile to different targets:

1. **SQL expressions** (`a_expr`): Compile to SQL text sent to PostgreSQL. These are the expressions inside `select`, `where`, `join on`, etc.
2. **PGL expressions** (`pgl_expr`, inside `${...}`): Compile to host-language code (TypeScript, Rust, etc.) that runs during query construction.

```pgl
query example(id: text) {
    select $id || '_suffix' as name       -- SQL expression: compiles to SQL text
    where id = ${find_id($id)}            -- PGL expression: compiles to host code
}
```

Even when the surface syntax looks identical (`+`, `-`, literals), the two worlds have different semantics and compile to different targets. SQL `1 + 2` becomes the SQL text `"1 + 2"` evaluated by PostgreSQL. PGL `${f(1 + 2)}` becomes host-language code `f(1 + 2)` evaluated during query building.

## Compilation Target

Each `query` definition compiles to a host-language function that constructs a SQL query (string + parameters). The compilation target is **not fixed to a single language** — PGL should be compilable to TypeScript, Rust, Go, or any language with a PostgreSQL driver.

```pgl
query get_user(id: text) {
    select * from users where id = $id
}
```

Compiles to (TypeScript target):
```ts
function getUser(id: string): Query<User> {
    return { sql: "select * from users where id = $1", params: [id] };
}
```

Compiles to (Rust target, hypothetical):
```rust
fn get_user(id: &str) -> Query<User> {
    Query::new("select * from users where id = $1", &[&id])
}
```

## PGL Type System as Bridge

PGL types are a **bridge type system** — a third universe that maps to both SQL types and host-language types:

| PGL type          | SQL type (for query text)    | TypeScript        | Rust (hypothetical)  |
|-------------------|------------------------------|-------------------|----------------------|
| `int`             | `integer`                    | `number`          | `i32`                |
| `bigint`          | `bigint`                     | `BigInt`          | `i64`                |
| `text`            | `text`                       | `string`          | `String`             |
| `bool`            | `boolean`                    | `boolean`         | `bool`               |
| `numeric`         | `numeric`                    | *TBD*             | `Decimal`            |
| `(x: T) => U`     | *(no SQL equivalent)*        | `(x: T) => U`     | `Fn(T) -> U`         |
| `SetOf<R>`        | *(represents query result)*  | `Promise<R[]>`    | `Vec<R>`             |

Some PGL types map to SQL (primitives, records). Some only map to the host language (functions, closures). The type checker operates purely in PGL-type-land — the target mappings are codegen's concern.

## Soundness

### Principle

PGL requires **end-to-end soundness**: the compiled output must be as sound as the PGL source. If PGL's type system distinguishes two types, the generated code must not conflate them. If PGL defines arithmetic semantics (e.g., overflow is an error), the generated code must enforce them.

### Boundary Validation

The only point where unsoundness can enter is at the **interface** between external host-language code and PGL-generated code. For example, a TypeScript caller might pass a floating-point `number` where PGL expects an `int`. This is handled by **runtime boundary checks** at PGL function entry points — validating that inputs conform to PGL's type expectations.

Once a value passes the boundary check, all subsequent operations within PGL-generated code are sound by construction — the PGL compiler has already verified the types.

### Arithmetic Semantics: Match PostgreSQL

PGL arithmetic follows PostgreSQL semantics. PostgreSQL **errors on integer overflow** rather than silently wrapping:

```sql
SELECT 2147483647 + 1;
-- ERROR: integer out of range
```

PGL-generated code must enforce the same behavior on every backend.

### Per-Type Backend Requirements

#### `integer` (32-bit signed)

- **PG behavior**: Error on overflow outside [-2147483648, 2147483647]
- **TypeScript**: Use `number`. All 32-bit integers are exactly representable in `number` (64-bit float). Emit overflow checks after arithmetic operations.
- **Rust**: Use `i32`. Overflow behavior depends on build mode (panic in debug, wrap in release) — emit explicit checked arithmetic.

```ts
// Generated TS for PGL int addition
function pgl_add_int(a: number, b: number): number {
    const r = a + b;
    if (r > 2147483647 || r < -2147483648) throw new PglIntegerOverflow();
    return r;
}
```

#### `bigint` (64-bit signed)

- **PG behavior**: Error on overflow outside [-9223372036854775808, 9223372036854775807]
- **TypeScript**: Must use `BigInt` — `number` cannot represent the full 64-bit range (loses precision past 2^53). Emit overflow checks against 64-bit bounds.
- **Rust**: Use `i64` with checked arithmetic.

```ts
// Generated TS for PGL bigint addition
function pgl_add_bigint(a: bigint, b: bigint): bigint {
    const r = a + b;
    if (r > 9223372036854775807n || r < -9223372036854775808n) throw new PglIntegerOverflow();
    return r;
}
```

**Note**: `BigInt` and `number` are separate worlds in JavaScript — they cannot be mixed in expressions. This reflects PGL's type system correctly: `int` and `bigint` are distinct types with no implicit coercion.

#### `numeric` / `decimal` (arbitrary precision)

- **PG behavior**: User-specified precision, up to 131072 digits before and 16383 digits after the decimal point. No silent precision loss.
- **TypeScript**: No native type works. `number` loses precision. `BigInt` is integer-only. Requires a library (e.g., `Decimal.js`, `big.js`) or string representation. **TBD** — needs further investigation.
- **Rust**: Use `rust_decimal::Decimal` or similar library type.

### Comparison with Other Languages

| Language | Int on JS target | Approach | Sound? |
|----------|-----------------|----------|--------|
| **Gleam** | `BigInt` | Arbitrary precision, matches Erlang semantics | Yes |
| **ReScript** | `number` (32-bit range) | Silent overflow past 32-bit bounds | No |
| **PGL** | `number` + overflow checks | Matches PG error-on-overflow semantics | Yes |
