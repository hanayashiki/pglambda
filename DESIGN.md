# Overview

We are building a type-safe SQL builder language called **pglambda**.

Source code:

```pgl
query get_user_by_id(id: text) {
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
query get_user_by_id(id: text) {
    select * from users where id = $id
}
```

## PGL Identifiers

PGL uses a unified identifier system where `$` is a legal character anywhere in identifiers (like JavaScript/TypeScript). The `$` prefix is a naming convention that distinguishes PGL references from SQL identifiers:

- **Parameter declaration**: bare names — `query f(id: text) { ... }`
- **PGL reference in SQL**: `$` prefix — `select * from users where id = $id`
- **Query call**: `${...}` wrapper — `${user_by_id(users, $id)}`

Identifiers are case-sensitive (like TypeScript), while SQL keywords remain case-insensitive (PostgreSQL convention).

## Query Composition

You can call one builder inside another using `${...}` syntax. Each `query` definition compiles to a host-language function that builds and returns a SQL query. The `${...}` syntax calls other query-builder functions during query construction.

```pgl
query user_by_id(user: UserRow, id: text) {
    user.id = $id
}
-- (user: UserRow, id: text) => bool

query select_user_by_id(id: text) {
    select * from users where ${user_by_id(users, $id)}
}
-- (id: text) => SetOf<UserRow>
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
    where user_id in ${users.get_user_by_id($id)}.id
}

query admin_by_email($email: text) {
    select a.*
    from admins a
    join ${users.get_user_by_email($email)} u on a.user_id = u.id
}
```

**Key points:**

- Import paths are relative: `"./users.pgl"`, `"../shared/auth.pgl"`
- Module name is the filename without `.pgl`: `users.pgl` → `users`
- Access exported items with dot notation: `users.get_user_by_id`
- Only `export` marked queries are visible to other modules
- Files are compilation units — type inference stays within file boundaries

---

## Execution Model

See [04_EXECUTION_MODEL.md](./docs/04_EXECUTION_MODEL.md) — covers the two expression worlds (SQL vs PGL), compilation targets, the bridge type system, and soundness requirements.

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

## Roadmap

See [00_ROADMAP.md](./docs/00_ROADMAP.md)

## Data Definition Language

See [05_DATA_DEFINITION_LANGUAGE.md](./docs/05_DATA_DEFINITION_LANGUAGE.md)
