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
query user_by_id(user: UserRow, $id: text) {
    user.id = $id
}
-- (user: UserRow, $id: text) => bool

query select_user_by_id($id: text) {
    select * from users where user_by_id!(users, $id)
}
-- ($id: text) => SetOf<UserRow>
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

See [01_TYPE_CATEGORIES.md](./docs/01_TYPE_CATEGORIES.md)

## Generic Types

Generic types are "type builders" that construct another types with types.

See [02_GENERIC_TYPES.md](./docs/02_GENERIC_TYPS.md)

---

## Type Checker

See [03_TYPE_CHECKER.md](./docs/03_TYPE_CHECKER.md)

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
- [x] Type constructor, e.g. `SetOf<UserRow>`
- [ ] `query fn() { select 1 as col } → () => SetOf<{ col: int }>`
- [ ] Implement Solver (thin wrapper around Unification)
- [x] Test: `select 1 as a, 'x' as b` → `SetOf<{a: int, b: text}>`

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
