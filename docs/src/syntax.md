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

```pgl-unchecked
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

```pgl-unchecked
-- users.pgl
export query get_user_by_id(id: text) {
    select * from users where id = $id
}

export query get_user_by_email(email: text) {
    select * from users where email = $email
}
```

```pgl-unchecked
-- admin.pgl
import "./users.pgl"

query check_admin(id: text) {
    select * from admins
    where user_id in ${users.get_user_by_id($id)}.id
}

query admin_by_email(email: text) {
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
