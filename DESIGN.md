# Overview

We are building a type-safe SQL builder language called **pglambda**.

Source code:

```pgl
query get_user_by_id($id: text) {
    select * from users where id = $id
}
```

Compiled code:

```ts
class Client {
    function getUserById(id: string): User[] {
        return this.pg.execute("select * from users where id = $1", [id]);
    }
}
```

## Programming Language Conventions

1. Filename: ends with `.pgl`

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
- **Record types**: `{field1: T1, field2: T2}` for row types (always closed - no row polymorphism initially)

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

#### Column References
```
select * from users  ⇒
  Equality: T_result = schema(users)

select name from t   ⇒
  Equality: T_name = schema(t).name
  Equality: T_result = {name: T_name}
```

**Schema lookups generate equality constraints** with concrete types from the database schema.

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

### Phase 1: Foundation
- [ ] Define type representation:
  - Primitive types (int, text, bool, numeric, etc.)
  - Type variables (α, β, ...)
  - Composite types (arrays, records, nullable)
- [ ] Implement AST visitor to extract typed items
- [ ] Build referential dependency graph

### Phase 2: SCC Algorithm
- [ ] Implement Tarjan's algorithm for SCC decomposition
- [ ] Topological sort for processing order
- [ ] Test with mutually recursive CTEs

### Phase 3: Constraint System
- [ ] Define constraint types:
  - Equality constraints: `T1 = T2`
  - Overload checks: `op(args) -> result`
- [ ] Implement constraint generation for each AST node type:
  - Literals → equality to concrete type
  - Operators → equality + overload check
  - Functions → overload check
  - Columns → equality to schema type
- [ ] Tag constraints with SCC membership

### Phase 4: Unification & Overload Resolution
- [ ] Implement unification algorithm:
  - Handle type variable = type variable
  - Handle type variable = concrete type
  - Occurs check
  - Substitution management
- [ ] Implement overload resolution:
  - Define operator/function signatures (hardcoded or from catalog)
  - Lookup matching overload by concrete argument types
  - Extract result type from overload signature

### Phase 5: Schema Integration
- [ ] Extract schema from database (or schema file)
- [ ] Map PostgreSQL types to pglambda types:
  - int4 → int
  - text, varchar → text
  - bool → bool
  - Handle nullable columns (T | null)
- [ ] Resolve column types from schema during constraint generation

### Phase 6: Error Reporting
- [ ] Collect and report type errors:
  - Unification failures (type mismatch)
  - Missing overloads (no matching function signature)
  - Under-constrained types (ambiguous type variables)
  - Missing schema information
- [ ] Source location tracking for error messages
- [ ] Clear error messages with type mismatch explanations

---

## Future Enhancements

- **Implicit coercion (opt-in)**: Add a "loose mode" that inserts implicit casts like PostgreSQL
- **Bidirectional type checking**: Allow optional type annotations for better error messages
- **Row polymorphism**: Type `select * from t` without knowing all columns ahead of time
- **Subtyping**: Model PostgreSQL type hierarchies (e.g., `int2 <: int4 <: int8 <: numeric`)
- **Generic/polymorphic type variables**: For user-defined functions and query builders
- **Higher-kinded types**: For advanced generic query combinators
- **Effect system**: Track query side effects (read-only vs read-write)
- **Query from PostgreSQL catalog**: Load operator/function overloads from `pg_operator`, `pg_proc` instead of hardcoding

