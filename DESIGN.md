# Overview

We are building a type-safe SQL builder language called **pglambda**.

Source code:

```pgl
query get_user_by_id($id: text) {
    select * from users where id = $id
}
```

Compiled code (draft):

```ts
class Client {
  async getUserById(id: string): Promise<User[]> {
    return await this.pg.execute("select * from users where id = $1", [id]);
  }
}
```

## Programming Language Conventions

1. **Filename**: ends with `.pgl`
2. **Module system**: Each file is a module. Module name is derived from filename (`users.pgl` → `users`)
3. **Compilation unit**: Files define the boundary of compilation. Type inference happens within file boundaries.
4. **Imports**: Go-like import syntax: `import "./path/to/file.pgl"`
5. **Exports**: Mark queries with `export` to make them visible to other modules

---

# Syntax

## Simple Query Builder

```pgl
query get_user_by_id($id: text) {
    select * from users where id = $id
}
```

## Nested Query Builder

You can call one builder inside another using `!` syntax. This inlines the callee's body at compile time, distinguishing it from SQL function calls.

```pgl
query user_by_id(user: Row<users>, $id: text) {
    user.id = $id
}

query select_user_by_id($id: text) {
    select * from users where user_by_id!(users, $id)
}
```

## Modules & Imports

Each `.pgl` file is a module. Use `export` to make queries available to other modules, and `import` to use queries from other files.

**Example:**

```pgl
// users.pgl
export query get_user_by_id($id: text) {
    select * from users where id = $id
}

export query get_user_by_email($email: text) {
    select * from users where email = $email
}
```

```pgl
// admin.pgl
import "./users.pgl"

query check_admin($id: text) {
    select * from admins
    where user_id in users.get_user_by_id!($id).id
}

query admin_by_email($email: text) {
    select a.*
    from admins a
    join users.get_user_by_email!($email) u on a.user_id = u.id
}
```

**Key points:**

- Import paths are relative: `"./users.pgl"`, `"../shared/auth.pgl"`
- Module name is the filename without `.pgl`: `users.pgl` → `users`
- Access exported items with dot notation: `users.get_user_by_id`
- Only `export` marked queries are visible to other modules
- Files are compilation units — type inference stays within file boundaries

---

# Type System

pglambda uses a constraint-based type inference system to provide type safety without requiring extensive type annotations. The type checker performs pure type inference, deriving types from usage patterns and database schema information.

## Design Philosophy: Strict Typing

**pglambda is stricter than PostgreSQL.** We do not model PostgreSQL's implicit type coercion system. This makes the type checker simpler, more predictable, and safer.

### No Implicit Coercion

**PostgreSQL allows (with implicit casts):**

```sql
SELECT '1' + 1;        -- Works: '1' coerced to int → 2
SELECT 1 + 1.5;        -- Works: 1 coerced to numeric → 2.5
SELECT 'hello' || 123; -- Works: 123 coerced to text → 'hello123'
```

**pglambda rejects (strict typing):**

```pgl
select '1' + 1         -- ERROR: Cannot add text and int
select 1 + 1.5         -- ERROR: Cannot add int and numeric
select 'hello' || 123  -- ERROR: Cannot concat text and int
```

**Users must be explicit:**

```pgl
select '1'::int + 1           -- OK: explicit cast
select 1::numeric + 1.5       -- OK: explicit cast
select 'hello' || 123::text   -- OK: explicit cast
```

### Benefits

1. **Simpler type system** - No cast tracking, no coercion rule database
2. **Predictable** - Type errors are local and obvious
3. **Safer** - Accidental type mismatches caught at compile time
4. **Maintainable** - Don't need to track PostgreSQL's evolving cast rules across versions

### Function Overloading

While we don't support implicit coercion, we **do** support function and operator overloading, because PostgreSQL operators are genuinely polymorphic:

```pgl
-- Different overloads of +
1 + 2                           -- int + int → int
1.5 + 2.5                       -- numeric + numeric → numeric
'2024-01-01'::date + 7          -- date + int → date
interval '1 hour' + interval '30 min'  -- interval + interval → interval

-- Different overloads of ||
'hello' || 'world'              -- text || text → text
ARRAY[1] || ARRAY[2]            -- T[] || T[] → T[]
```

These are different functions with different type signatures, not automatic type conversions.

## Type Categories

### Base Types

- **Primitive types**: `int`, `int2`, `int4`, `int8`, `numeric`, `text`, `bool`, `timestamp`, etc.
- **Null handling**: `T | null` for nullable types
- **Type variables**: `α`, `β`, etc. (unknowns to be inferred)

### Composite Types

- **Array types**: `T[]` for arrays
- **Record types**: `{field1: T1, field2: T2}` for row types

### Polymorphism

- **Ad-hoc polymorphism**: Operators like `+`, `||` work on multiple types via overloading
- **Overload resolution**: Select the correct function signature based on argument types

---

# Type Checker Architecture

The type checker uses a **constraint-based inference algorithm** with **strongly connected component (SCC) decomposition** to handle mutually recursive definitions efficiently.

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. AST Traversal                                                │
│    Extract typed items (variables, expressions, columns)        │
│    Build referential dependency graph                           │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. SCC Decomposition (Tarjan's Algorithm)                       │
│    Partition dependency graph into strongly connected components│
│    Compute topological order for processing                     │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Constraint Generation (entire AST, single pass)              │
│    Generate equality constraints: T1 = T2                       │
│    Generate overload checks: op(args) -> result                 │
│    Tag each constraint with its SCC                             │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Constraint Solving (per SCC in topological order)            │
│    4a. Solve equality constraints via unification               │
│    4b. Validate overload constraints (check existence)          │
│    4c. Freeze solved types for next SCC                         │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Type Assignment & Error Reporting                            │
│    Apply final substitution to AST nodes                        │
│    Emit type errors (mismatches, under-constrained, etc.)       │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. Typed Items

A **typed item** is any program element that has a type:

- **Variables**: Query parameters (`$id`), column aliases, CTEs
- **Expressions**: Literals, operators, function applications
- **Column references**: Table columns, wildcards (`*`)
- **Query results**: SELECT clause output types

Each typed item is assigned a unique type variable during constraint generation.

### 2. Referential Dependency Graph

The dependency graph captures **lexical dependencies** between typed items:

- **Nodes**: Typed items
- **Edges**: Item `A` depends on item `B` if `A` references `B` in its definition

**Example:**

```pgl
query example($user_id: int) {
    select name, age
    from users
    where id = $user_id
}
```

Dependencies:

- `where id = $user_id` → depends on `$user_id` and `id` column
- `id = $user_id` → depends on types of `id` and `$user_id`

### 3. SCC Decomposition

**Why SCCs?** Mutually recursive definitions create cycles in the dependency graph. Traditional top-down type inference fails on cycles. SCC decomposition allows us to:

1. **Partition** the graph into strongly connected components
2. **Solve constraints** within each SCC simultaneously
3. **Process SCCs** in topological order (dependencies before dependents)

**Algorithm:** Tarjan's algorithm (linear time, single DFS pass)

**Example with cycles:**

```pgl
-- Mutually recursive CTEs
with recursive
  a as (select * from b where x > 0),
  b as (select * from a where y < 10)
select * from a
```

Here, `a` and `b` form an SCC and their types must be inferred together.

### 4. Constraint Generation

For each typed item, generate constraints based on its syntactic form. Constraints are generated in a single AST traversal and collected for later solving.

**Two types of constraints:**

1. **Equality constraints** (`T1 = T2`) - Drive type inference via unification
2. **Overload checks** (`overload_check(op, args, result)`) - Validate after inference

#### Literals

```
42       ⇒  T_literal = int
'hello'  ⇒  T_literal = text
true     ⇒  T_literal = bool
null     ⇒  T_literal = α | null  (fresh type variable α)
```

**Constraints:** Equality only (concrete type)

#### Binary Operators

```
e1 + e2  ⇒
  Equality: T_e1 = T_e2  (both operands must have same type)
  Overload check: +(T_e1, T_e2) -> T_result

e1 = e2  ⇒
  Equality: T_e1 = T_e2
  Overload check: =(T_e1, T_e2) -> bool
  Equality: T_result = bool

e1 || e2 ⇒
  Equality: T_e1 = T_e2
  Overload check: ||(T_e1, T_e2) -> T_result
```

**Key insight:** Equality constraints determine operand types. Overload checks verify compatibility and determine result type.

#### Function Applications

```
concat(e1, e2, ..., en) ⇒
  Overload check: concat(T_e1, T_e2, ..., T_en) -> T_result

coalesce(e1, e2) ⇒
  Overload check: coalesce(T_e1, T_e2) -> T_result
```

For built-in functions with strict signatures, you can also generate equality constraints:

```
concat(e1, e2) ⇒
  Equality: T_e1 = text, T_e2 = text
  Overload check: concat(text, text) -> T_result
  Equality: T_result = text
```

#### Row Type Model

SQL rows are modeled as **record types with unique field names** — intentionally stricter than SQL (which allows duplicate names and positional access), analogous to how TypeScript models JS objects with interfaces.

**Scope (internal):** A FROM clause produces a two-level record of records, keyed by table name or alias. This is used for column resolution within the query — not exposed in the result type.

```
FROM users u JOIN orders o ON u.id = o.user_id  ⇒
  Scope = {u: {id: int, name: text}, o: {id: int, product: text}}
```

**Result type (flat):** The SELECT list determines the output — a flat record keyed by column name or explicit alias. Table prefixes are stripped; only the column name survives.

```
SELECT u.name, o.product  ⇒  {name: text, product: text}
SELECT u.id AS user_id     ⇒  {user_id: int}
SELECT 1 AS value          ⇒  {value: int}
```

**Column access rules:**

- **Table-qualified** (required for table columns): `u.id` → `Scope.u.id`
- **Unqualified** (only for aliased computed expressions): `u.id + 1 AS next_id`
- **Bare column names from tables are not allowed** — makes the query self-documenting without schema knowledge
- **Computed expressions require explicit aliases** — no auto-generated `?column?` names
- **Duplicate output column names are an error** — `SELECT u.id, o.id` requires aliases to disambiguate

The schema is only needed to _verify_ that a column exists and has a given type, not to determine the result type structure.

**Local alias limitation.** Table aliases are local to the FROM clause and do not survive SQL subquery boundaries. For stable naming across boundaries, use views — they are persistent named entities like tables.

#### Column Reference Constraints

```
-- Qualified column access (output keyed by column name)
select u.name from users u  ⇒
  Equality: T_name = schema(users).name
  Equality: T_result = {name: T_name}

-- Explicit alias overrides the column name
select u.id as user_id from users u  ⇒
  Equality: T_user_id = schema(users).id
  Equality: T_result = {user_id: T_user_id}

-- Computed expression with alias
select u.id + 1 as next_id from users u  ⇒
  Equality: T_next_id = T_(u.id + 1)
  Equality: T_result = {next_id: T_next_id}

-- SELECT * from single table
select * from users  ⇒
  Equality: T_result = schema(users)

-- SELECT * from join (ERROR if duplicate column names)
select * from users u join orders o  ⇒
  Equality: T_result = schema(users) ∪ schema(orders)
  (ERROR if any column name appears in both tables)
```

#### WHERE Clauses

```
where condition  ⇒
  Equality: T_condition = bool
```

### 5. Constraint Solving

Constraints are solved **per SCC** in topological order. Each SCC follows a two-phase solving process:

#### Phase 1: Solve Equality Constraints (Type Inference)

Equality constraints drive type inference via **unification**:

1. **Substitution**: Maintain a substitution map `σ: TypeVar → Type`
2. **Unification**: For each equality constraint `T1 = T2`:
   - If both are type variables: `σ[α] = β` (link variables)
   - If one is type variable, one concrete: `σ[α] = int` (bind to concrete type)
   - If both are concrete: Check equality, emit error if mismatch
3. **Occurs check**: Prevent infinite types (`α = α[]` is an error)

**SCC-specific handling:**

- Process all equality constraints for items in the SCC simultaneously
- This handles mutually recursive definitions (items can reference each other)
- If cyclic type dependencies exist, emit error

#### Phase 2: Validate Overload Constraints (Type Checking)

After equality constraints are solved, validate overload constraints:

1. **Apply substitution**: Get concrete types for all type variables
2. **Overload lookup**: For each `overload_check(op, [T1, T2, ...], T_result)`:
   - Apply substitution to get concrete argument types
   - Look up overload: Does `op(T1, T2, ...) -> R` exist?
   - If no matching overload: Emit type error
   - If overload found: Unify `T_result = R`
3. **Determine result types**: Overload signatures provide result types

**Key distinction:**

- **Equality constraints** determine input types (from literals, schema, context)
- **Overload checks** determine output types (from function signatures) and validate compatibility

#### Example Flow

```pgl
select x + 1 where x : α (unknown)
```

**Phase 1 (Equality):**

- Constraint: `T_1 = int` (literal)
- Constraint: `T_x = T_1` (operands of + must match)
- Unify: `α = int`

**Phase 2 (Overload):**

- Constraint: `overload_check(+, [int, int], T_result)`
- Lookup: `+(int, int) -> int` exists
- Unify: `T_result = int`

**Result:** `x : int`, result type is `int`

### 6. Type Assignment

After solving:

1. **Apply substitution** to all type variables
2. **Attach types** to AST nodes for code generation
3. **Emit errors** for:
   - Unsatisfiable constraints (type mismatch)
   - Ambiguous types (under-constrained)
   - Missing schema information

---

## Type Inference Examples

### Example 1: Simple Query

```pgl
query get_user($id: int) {
    select name, age from users where id = $id
}
```

**Constraints:**

- `T_$id = int` (annotation)
- `T_id = schema(users).id = int` (from schema)
- `T_id = T_$id` (from `id = $id`)
- `T_name = schema(users).name = text`
- `T_age = schema(users).age = int`
- `T_result = {name: text, age: int}`

**Solution:** All constraints satisfied, inferred return type is `{name: text, age: int}[]`

### Example 2: Type Inference with Overloaded Operator

```pgl
query example($x) {
    select $x + 1 as result
}
```

**Constraint Generation:**

Equality constraints:

- `T_1 = int` (literal 1)
- `T_$x = T_1` (operands of + must have same type)

Overload check:

- `overload_check(+, [T_$x, T_1], T_result)`

**Constraint Solving:**

Phase 1 (Equality - Type Inference):

- Unify `T_1 = int` → `σ[T_1] = int`
- Unify `T_$x = T_1` → `σ[T_$x] = int`

Phase 2 (Overload - Type Validation):

- Apply substitution: `+(int, int) -> T_result`
- Lookup overload: `+(int, int) -> int` exists ✓
- Unify: `T_result = int`

**Solution:** `$x : int` (inferred from equality constraints), `result : int` (from overload signature)

**Key point:** The type of `$x` comes from the equality constraint (`T_$x = T_1 = int`), NOT from the overload. The overload only validates compatibility and provides the result type.

### Example 3: SCC with Mutual Recursion

```pgl
with recursive
  evens as (select 0 as n union all select n+2 from odds where n < 10),
  odds  as (select 1 as n union all select n+2 from evens where n < 10)
select * from evens
```

**SCC:** `{evens, odds}` form a strongly connected component

**Constraints (within SCC):**

- `T_evens = {n: int}`
- `T_odds = {n: int}`
- Both reference each other, constraints solved simultaneously

**Solution:** Both inferred as `{n: int}`

---

## Implementation Phases

**Philosophy:** Implement the novel/unclear parts first (constraint algorithm), then add standard algorithms (module system, SCC) later.

**Architecture:** PGL files are modules and define the boundary of compilation. Each file is type-checked independently (after its dependencies), with SCCs confined to within-file recursion. This simplifies analysis and provides a predictable compilation model.

### Phase 1: Constraint-Based Type Inference (Core Algorithm) with Internal Row Polymorphism

**Goal:** Implement constraint-based type inference using row polymorphism internally to eliminate fixed-point loops. Row types are not exposed to users — they're used only during inference and closed to produce user-facing closed record types.

**Key insight:** Field access on type variables generates equality constraints with open record types (e.g., `α.field` → `α = {field: β | ρ}`). Unification solves all constraints in one pass. After inference, close all unbound row variables to produce closed record types.

- [x] Define type representation (TypeStore with structural sharing)
- [x] Extend type representation for row polymorphism:
  - [x] Add `rest: Type | null` field to RecordType (`null` = closed record, TypeVariable = open record)
  - [x] Update TypeStore.record() to support optional `rest` parameter
  - [x] Hash-consing for open records (canonicalize by fields + rest)
  - [x] Test: create and cache open/closed records
- [x] Implement unification algorithm (equality constraints only):
  - [x] Core unification: `unify(T1, T2)` mutates shared substitution
  - [x] Handle type variable = type variable
  - [x] Handle type variable = concrete type
  - [x] Handle concrete type = concrete type (structural equality)
  - [x] Occurs check (prevent infinite types: `α = α[]`)
  - [x] Substitution with provenance tracking (BindingSource)
  - [x] Test basic unification (primitives, arrays, nullables, closed records)
  - [x] Extend unification for row polymorphism:
    - [x] Unify closed with open record: `{a: int, b: text} = {a: β | ρ}` → `β = int, ρ = {b: text}`
    - [x] Unify two open records: `{a: int | ρ1} = {b: text | ρ2}` → merge non-common fields into row variables
    - [x] Row variable occurs check: prevent `ρ = {a: int, b: ρ}`
    - [x] Test row unification
- [x] Define equality constraint type: `T1 = T2` (handled by Unification)

### Phase 2: Minimal Checker PoC

**Goal:** Type-check `select 1 as col` → row type `{col: int}`. The checker operates on `simple_select` (not `query_def` — that requires function types).

**Core concepts:**

- **SCC** as the unit of type checking, with imports (external types depended on) and exports (types produced) keyed by AST ContentHash
- **Constraint generation** from `simple_select`: literals → primitive types, target aliases → record fields
- **Solver** wrapping Unification to resolve constraints

- [x] Define SCC type (imports/exports by ContentHash)
- [x] Define equality constraint type
- [x] Implement constraint generator for `simple_select`:
  - Literals: `42 → int`, `'hello' → text`, `true/false → bool`, `null → nullable`
  - Target list with aliases → record fields
  - `simple_select` → row type (RecordType) from target list wrapped by `SetOf`
- [x] Nominal type with generics, e.g. `SetOf<UserRow>`
- [ ] `query fn() { select 1 as col } → () => SetOf<{ col: int }>`
- [ ] Implement Solver (thin wrapper around Unification)
- [ ] Test: `select 1 as a, 'x' as b` → `SetOf<{a: int, b: text}>`

### Phase 3: Minimal TypeScript Generation

- [ ] Design an interface representation of a generated library
- [ ] Use that interface to generate TypeScript query client
  - Map our types to their types
  - Handle tsconfig for import syntax

### Roadmap

- Expressions & operators (binary ops, overload resolution)
- Schema & FROM clause (table references, column resolution)
- Query parameters & function types (`query_def`)
- Module system (imports, exports, file boundaries)
- SCC decomposition (Tarjan's, mutual recursion)
- Error reporting & diagnostics
- Advanced features (aggregations, subqueries, CASE, catalog integration)
