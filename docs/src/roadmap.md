# Roadmap

## Current Vision

The immediate goal: end-to-end type-safe compilation of a simple query against a declared schema.

```sql
database {
  create table public.users (id text, name text);
}

query get_user($id: text) {
  select id, name from users where id = $id
}
```

This requires the full pipeline: parsing → DDL extraction → table-to-row-type mapping → constraint generation → type checking → code generation → runtime result validation.

### In Progress

- [ ] `database` block: parse PostgreSQL DDL, extract table → row type mappings
  - Grammar support for `database { }` wrapper
  - DDL parser for `CREATE TABLE` (columns, types, constraints)
  - Table registry: qualified name → row type
  - `use` syntax for cross-file DDL dependencies
  - Global uniqueness check (no conflicting table definitions)
- [ ] FROM clause: resolve table references to row types, introduce columns into scope
- [ ] Column reference resolution: `id` → look up in FROM scope
- [ ] SELECT * expansion from FROM row type
- [ ] WHERE clause: validate expression type is `bool`

### Not Yet Designed

- [ ] Binary operator type checking (post-resolution overload validation)
  - Operator signature registry (e.g., `= : (text, text) → bool`)
  - Overload check as Phase 3 validation (not a constraint source)
  - Result type determined by matched overload signature
- [ ] Type serialization: emit row type descriptors into generated code
  - Row descriptor per query: field names, pg types, codec references
  - Enables runtime validation and codec decode
- [ ] Runtime result parsing: validate query results against declared row types
  - Schema drift detection (missing/wrong-type columns)
  - Codec decode for non-trivial types (jsonb, timestamptz, etc.)
- [ ] Code generation (TypeScript backend)
  - Target-agnostic IR for query-builder functions
  - PGL type → TS type mapping
  - Query function → `{ sql: string, params: unknown[] }`

## Long Term

### Expressions & Operators
- Full binary operator support (+, -, *, /, ||, comparisons)
- Overload resolution for all pg operators
- Unary operators
- BETWEEN, IN, LIKE, IS NULL/TRUE/FALSE

### PGL Expression Language
- Arithmetic, function calls inside `${...}`
- Lambda definitions (`identity(x) => x`)
- PGL-level control flow

### Schema & Table Features
- JOIN syntax (INNER, LEFT, RIGHT, FULL)
- Subqueries
- CTEs (WITH, WITH RECURSIVE)
- Views as named table-like entities

### Module System
- Import/export across .pgl files
- Module name derived from filename
- File-level compilation boundaries
- SCC decomposition (Tarjan's) for mutual recursion

### Query Features
- GROUP BY / HAVING with aggregation types
- ORDER BY, LIMIT/OFFSET
- DISTINCT
- CASE expressions
- INSERT, UPDATE, DELETE with returning clauses

### Codecs & Host Bridge
- Codec declaration (`codec CustomJsonb<T> = jsonb`)
- `${}` escape in DDL for codec type references
- Host bridge functions (`bridge fn(args): ret`)
- Runtime encode/decode generation

### Advanced Type System
- Overload catalog (built-in pg operator/function signatures)
- Type cast syntax (`::`)
- NULL propagation through expressions
- Aggregate function typing

### Tooling
- Error reporting & diagnostics
- LSP support
- Schema introspection from live database
- Migration diffing (declared schema vs live database)

### Additional Backends
- Rust codegen
- Go codegen
