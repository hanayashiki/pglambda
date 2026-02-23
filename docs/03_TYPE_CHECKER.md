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
│    4a. Resolve generic signatures (Phase 1)                     │
│    4b. Solve equality constraints via unification (Phase 2)     │
│    4c. Validate overload constraints (Phase 3)                  │
│    4d. Generalize & freeze solved types for next SCC            │
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

Constraints are solved **per SCC** in topological order. Each SCC follows a multi-phase solving process:

#### Phase 1: Resolve Generic Signatures

Phase 1 pre-builds TypeSchemes for generic definitions from their annotations, so that other members of the same SCC can instantiate them during Phase 2.

**Rule:**

- **Trivial SCC** (single item, no self-recursion): **Skip Phase 1.** The body does not reference itself, so no scheme is needed during Phase 2. The definition proceeds directly to Phase 2 where its body is checked with declared type parameters represented as `ParamType` nodes (scoped to the definition's scheme ID). The scheme is constructed directly from the body's result type, which already contains `ParamType` — no generalization step needed.
- **Non-trivial SCC** (multiple items, or a single self-recursive item): Generic definitions must have an explicit full signature (including return type). Phase 1 builds their TypeSchemes from annotations before Phase 2 begins. A self-recursive generic definition (e.g., `query f<T>(x: T) { ... f!(x) ... }`) needs its own scheme to instantiate the recursive call, creating the same circular dependency as mutual recursion.

For each generic def in a non-trivial SCC:
1. Verify the signature is fully annotated (error if not)
2. Allocate a scheme ID and build `ParamType` nodes scoped to it
3. Build the TypeScheme from annotations (parameter types + return type, using `ParamType`)
4. The scheme is now available for instantiation in Phase 2

**Rationale:** In a non-trivial SCC, a generic def's scheme is needed by other SCC members during Phase 2, but building the scheme from the body would require checking the body, which depends on the other members — a circular dependency. Requiring an explicit signature breaks the cycle. In a trivial SCC, this circularity doesn't exist: no other member needs the scheme, so we can skip Phase 1 and infer the scheme from the body in Phase 2.

**ParamType scoping:** Each `ParamType` carries a `schemeId` identifying which generic definition it belongs to. `ParamType(schemeA, 0)` and `ParamType(schemeB, 0)` are different types that will not unify — even if both represent "the first type parameter." This ensures soundness regardless of how constraints are generated or whether multiple generic definitions are checked in the same unification context.

**Example — non-trivial SCC (Phase 1 required):**
```pgl
-- Both form an SCC (f1 → f2 → f1). Both are generic.
-- Return type annotations required because they're in a non-trivial SCC.

query f1<T>(x: T): SetOf<{val: T}> {
  select * from f2!(x)    -- body references f2, checked in Phase 2
}

query f2<U>(y: U): SetOf<{val: U}> {
  select * from f1!(y)    -- body references f1, checked in Phase 2
}
```

Phase 1 builds both schemes purely from annotations, each with its own scheme ID: `f1: ∀T. (x: T) => SetOf<{val: T}>`, `f2: ∀U. (y: U) => SetOf<{val: U}>`. Phase 2 checks bodies with both schemes available for instantiation — call sites replace `ParamType` with fresh type vars.

**Example — trivial SCC (Phase 1 skipped):**
```pgl
-- Single definition, no mutual recursion → skip Phase 1.
-- Phase 2 checks the body with T, U as ParamType nodes.
-- Scheme is constructed directly from the result.
query map<T, U>(hmms: T, f: (s: T) => U) {
  f(s)
}
-- hmms: ParamType(schemeMap, 0), f: fn(ParamType(schemeMap, 0)) => ParamType(schemeMap, 1)
-- Body result: ParamType(schemeMap, 1)
-- Scheme: ∀T,U. (hmms: T, f: (s: T) => U) => U
```

#### Phase 2: Solve Equality Constraints (Type Inference)

Equality constraints drive type inference via **unification**:

1. **Substitution**: Maintain a substitution map `σ: TypeVar → Type`
2. **Unification**: For each equality constraint `T1 = T2`:
   - If both are type variables: `σ[α] = β` (link variables)
   - If one is type variable, one concrete: `σ[α] = int` (bind to concrete type)
   - If type variable meets ParamType: `σ[α] = ParamType(s, i)` (bind type var to the param)
   - If both are ParamType: equal iff same `schemeId` and `index`, error otherwise
   - If ParamType meets concrete type: error (type parameter cannot be unified with a concrete type)
   - If both are concrete: Check equality, emit error if mismatch
3. **Occurs check**: Prevent infinite types (`α = α[]` is an error)

**ParamType in unification:** `ParamType` behaves as a unique constant (like a skolem variable). It only unifies with the exact same `ParamType` (matching both `schemeId` and `index`). A type variable CAN be bound to a `ParamType`, allowing type information to flow through the body. But a `ParamType` can never be bound to a concrete type — this enforces that the generic body works for all instantiations.

**SCC-specific handling:**

- Process all equality constraints for items in the SCC simultaneously
- Generic defs have their schemes available — at call sites, `ParamType` in the scheme is replaced with fresh type vars (instantiation)
- Non-generic defs use monomorphic type variables (standard HM within an SCC)
- If cyclic type dependencies exist, emit error

#### Phase 3: Validate Overload Constraints (Type Checking)

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

#### Phase 4: Resolve & Freeze

After solving, finalize types for export to downstream SCCs:

1. **Deep-resolve** all type variables through the substitution
2. **Check for ambiguity**: Any type variable that remains free (not bound to a concrete type or `ParamType`) after deep-resolution is an ambiguous type error
3. **Freeze**: Export the resolved types/schemes. Downstream SCCs instantiate schemes with fresh type variables at each use site.

**Generic definitions** (with declared type parameters) already have `ParamType` nodes in their types from Phase 2 — no generalization step is needed. The scheme is constructed directly:

```
query map<T, U>(hmms: T, f: (s: T) => U) { f(s) }

Phase 2 types already contain ParamType:
  hmms: ParamType(s, 0)
  f: fn(ParamType(s, 0)) => ParamType(s, 1)
  body result: ParamType(s, 1)

Scheme (constructed directly): ∀T,U. (hmms: T, f: (s: T) => U) => U
```

**Non-generic definitions** have all type variables resolved to concrete types. Any remaining free type variable is an ambiguous type error (since pglambda requires explicit type parameter declarations):

```
query get_one() { select 1 as x }

Phase 2 result: () => {x: int}
All variables resolved → monomorphic scheme: () => {x: int}
```

#### Example Flow

```pgl
select x + 1 where x : α (unknown)
```

**Phase 2 (Equality):**

- Constraint: `T_1 = int` (literal)
- Constraint: `T_x = T_1` (operands of + must match)
- Unify: `α = int`

**Phase 3 (Overload):**

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

Phase 2 (Equality - Type Inference):

- Unify `T_1 = int` → `σ[T_1] = int`
- Unify `T_$x = T_1` → `σ[T_$x] = int`

Phase 3 (Overload - Type Validation):

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
