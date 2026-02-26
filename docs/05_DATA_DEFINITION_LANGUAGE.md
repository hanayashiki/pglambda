# Data Definition Language

## The `database` Block

A `database` block contains pure PostgreSQL DDL. It defines the tables, constraints, and indexes that pglambda type-checks queries against.

```sql
database {
  create table public.users (
    id int4 primary key,
    name text not null,
    email text
  );

  create table public.posts (
    id int4 primary key,
    title text not null,
    author_id int4 references public.users(id)
  );
}
```

The content inside `database { }` is standard PostgreSQL DDL — no invented syntax. This means users can paste existing schema definitions directly.

### Qualified Names

Table names in `database` blocks should use fully qualified names (`schema.table`). PostgreSQL's `search_path` is **not** applied inside DDL blocks — what you write is what you get.

```sql
database {
  create table public.users (id text, name text);   -- explicit schema
}
```

## Name Resolution: Two Worlds

pglambda has two separate name resolution systems that do not interfere with each other:

1. **pglambda names** (modules, query calls, parameters, `${}` expressions): Resolved through the module import system.
2. **pg names** (tables, columns, schemas inside SQL): Resolved through PostgreSQL's `search_path` rules.

The `search_path` is a **compile-time setting** in the compiler configuration, not a runtime session variable. The compiler resolves unqualified table names at compile time and emits fully qualified names in generated SQL. This avoids runtime `SET LOCAL search_path` overhead and connection pooling conflicts.

```json
// pglconfig.json
{
  "compilerOptions": {
    "searchPath": ["public"]
  }
}
```

```sql
-- user writes
select id from users

-- compiler emits (fully qualified)
SELECT id FROM public.users
```

## Scoping: Global Uniqueness, Local Dependencies

Database definitions have two separate concerns:

### 1. Global Uniqueness

All `database` blocks across all files matched by the project's `include` glob are merged and checked for conflicts. Two files defining the same table differently is always a compile error, regardless of whether they reference each other.

This reflects reality — a PostgreSQL database has one definition per table, globally.

### 2. Local Dependencies via `use`

Query files must explicitly declare which DDL files they depend on via `use`. Referencing a table without `use`ing its DDL file is a compile error.

```sql
-- schema/users.pgl
database {
  create table public.users (id text primary key, name text);
}
```

```sql
-- schema/posts.pgl
database {
  create table public.posts (
    id int4 primary key,
    author_id text references public.users(id)
  );
}
```

```sql
-- queries/user-queries.pgl
use "./schema/users.pgl"  -- declares dependency on users table

query get_user($id: text) {
  select id, name from users where id = $id
}
```

```sql
-- queries/bad.pgl
-- no `use` for users-schema
query bad($id: text) {
  select id from users where id = $id  -- ERROR: table `users` not in scope
}
```

`use` is a **dependency declaration**, not a scoping mechanism. It doesn't make tables exist or not exist — it declares that this file references tables from that DDL file. This keeps dependencies explicit and enables:

- Incremental compilation (the compiler knows which queries depend on which tables)
- Codebase navigation (clear dependency graph between query files and schema files)
- Modularity (a file's dependencies are self-documenting)

### DDL files can `use` other DDL files

This enables cross-table references like foreign keys across files:

```sql
-- schema/posts.pgl
use "./schema/users.pgl"

database {
  create table public.posts (
    id int4 primary key,
    author_id text references public.users(id)  -- references users from another file
  );
}
```

### Same-file DDL

A `database` block in the same file is implicitly in scope — no `use` needed:

```sql
database {
  create table public.users (id text, name text);
}

query get_user($id: text) {
  select id, name from users where id = $id
}
```

### Multiple databases

Separate pglambda projects, each with their own `sqlconfig.json` and `include` patterns.

## Codecs (Rough Design)

> **Status:** Draft. Details to be decided.

### Problem

Some PostgreSQL types don't map cleanly to host language types. `jsonb` is untyped, `timestamptz` may need a `Date` object, `numeric` may need a decimal library. Pglambda's type system covers the pg side, but the host side is a different world.

### Soundness Constraint

`jsonb` is fundamentally untyped — PostgreSQL does not enforce any internal structure. Any type assigned to a jsonb column is a trust-me assertion, not a checked guarantee. Pglambda treats `jsonb` as **opaque** to preserve soundness.

### Codec Declaration

A codec declares a named type that maps to a pg type. The host-side type and encode/decode logic live in the host language (TypeScript), not in pglambda.

```sql
codec CustomJsonb<T> = jsonb
codec CustomTz = timestamptz
codec CustomNumeric = numeric
```

Pglambda knows: `CustomJsonb<T>` has pg type `jsonb`. It type-checks SQL using the pg side. The host type `T` is **opaque to pglambda** — it's passed through to codegen.

### Usage in DDL

Codecs can be referenced in `database` blocks via `${}` escape:

```sql
database {
  create table public.events (
    id int4 primary key,
    payload ${CustomJsonb<{ event_type: text, timestamp: int8 }>}
  );
}
```

The `${}` escape in DDL context is a codec/type reference (distinct from `${}` in queries, which is an expression).

### Type Flow

Codec types flow through the type system like any other type. When a codec-typed column passes through subqueries or expressions, the codec information is preserved:

```
events.payload : CustomJsonb<{ event_type: text }>
subquery.payload : CustomJsonb<{ event_type: text }>  -- preserved
```

### Runtime Validation

Since pglambda must carry row type information to runtime for codec decode (e.g., jsonb parsing), it can also validate all columns against the declared schema — closing the schema drift soundness hole for free.

### Host Bridge (Generalization)

Codecs are one instance of a general **host bridge** pattern: pglambda declares a signature, the host language provides the implementation. This pattern extends to host-side functions:

```sql
bridge getFullName(first: text, last: text): text
```

Pglambda type-checks the call. Codegen emits a call to the host function. The host language must provide the implementation.

The host bridge is the only point where pglambda crosses the language boundary. The codec and bridge declarations are pglambda's side of the contract; the host project fulfills it.
