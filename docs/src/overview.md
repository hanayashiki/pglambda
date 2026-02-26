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

## Key Principles

1. **Strict** - Resolve names and type check the SQL based on your DDL at compile time
2. **Unflavored** - PostgreSQL syntax is kept as-is. Insert Pglambda with `$param` or `${builder()}` for dynamic part.

## Programming Language Conventions

1. **Filename**: ends with `.pgl`
2. **Module system**: Each file is a module. Module name is derived from filename (`users.pgl` → `users`)
3. **Compilation unit**: Files define the boundary of compilation. Type inference happens within file boundaries.
4. **Imports**: Go-like import syntax: `import "./path/to/file.pgl"`
5. **Exports**: Mark queries with `export` to make them visible to other modules

## Compiler Design Principles

1. **Query based** - The phases and passes on compilation units are just queries. Items are decomposed into SCCs (Strongly Connected Components) and checked together.

2. **Ready into LSP** - Results are always cached step by step, so user edits only trigger minimal updates.
