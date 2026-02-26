# Postgres Query Execution Order

SQL clauses are evaluated in this order (not the order they appear in the query):

1. **FROM / JOIN** — identify source tables, build the working row set
2. **WHERE** — filter rows
3. **GROUP BY** — aggregate rows into groups
4. **HAVING** — filter groups
5. **SELECT** — evaluate expressions, compute output columns
6. **DISTINCT** — remove duplicate rows
7. **ORDER BY** — sort result
8. **LIMIT / OFFSET** — truncate result set

Key implication: column aliases defined in SELECT are not visible to WHERE or GROUP BY (they haven't been evaluated yet). They are visible to ORDER BY.

# Query Result Fields Metadata

PostgreSQL returns field metadata for each column in a query result. The `pg` driver exposes this via `result.fields`:

```typescript
{
  name: string       // column name or alias
  tableID: number    // OID of source table (0 if computed/no table)
  columnID: number   // attribute number within source table (0 if computed)
  dataTypeID: number // OID of the column's data type
  dataTypeSize: number
  dataTypeModifier: number
  format: string     // 'text' or 'binary'
}
```

**Limitations for pglambda:**

- **Duplicate column names are indistinguishable.** When a JOIN produces two columns with the same name (e.g., `SELECT * FROM users JOIN orders` where both have `id`), both fields have identical metadata — same `name`, same `tableID: 0`, same `columnID: 0`. The only way to tell them apart is by position (array index).

- **Table aliases are not reflected.** `FROM users AS u` — the field metadata still shows `tableID` as the OID of the `users` table, not the alias `u`. Aliases are purely syntactic.

- **Computed expressions have no table.** `SELECT id + 1 AS next_id` → `tableID: 0, columnID: 0`. There is no way to trace it back to a source column.

- **Set-returning functions have no table identity.** `SELECT * FROM unnest(a) AS x(id), unnest(b) AS y(id)` → both columns are named `id` with `tableID: 0, columnID: 0`. Completely indistinguishable by metadata.

- **Object mode loses data.** When the PG driver returns results as JS objects, duplicate column names cause the last value to overwrite earlier ones. Only array mode (`rowMode: 'array'`) preserves all columns.

# Local alias limitations

Table aliases in SQL are local to the FROM clause. They do not survive subquery boundaries.

**Aliases work within a FROM clause:**
```pgl
-- u and o are valid qualifiers here
SELECT u.id, o.id
FROM users u JOIN orders o ON u.id = o.user_id
```

**Aliases do not survive subqueries:**
```pgl
-- ERROR: missing FROM-clause entry for table "users"
SELECT users.id
FROM (SELECT * FROM users JOIN orders ON users.id = orders.user_id) sub

-- ERROR: column reference "id" is ambiguous
SELECT sub.id
FROM (SELECT * FROM users JOIN orders ON users.id = orders.user_id) sub

-- OK: "product" is unique across both tables
SELECT sub.product
FROM (SELECT * FROM users JOIN orders ON users.id = orders.user_id) sub
```

**Set-returning functions are worse:**
```pgl
-- Both columns named "id", completely indistinguishable
SELECT * FROM unnest(array[1,2]) AS x(id), unnest(array[3,4]) AS y(id)
-- x.id and y.id work inside the FROM clause
-- but through a subquery, only positional access can distinguish them
```

**Implication for pglambda:** The two-level row type `{u: {id: int}, o: {id: int}}` is valid within a single FROM clause. To preserve this structure across boundaries, the compiler rewrites columns with prefixed aliases (e.g., `u.id AS "u.id"`). For stable cross-boundary naming, use views — they are persistent named entities like tables.
