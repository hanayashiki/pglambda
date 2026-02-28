# PGL Grammar Conformity Report

Comparison of `PGLParser.g4` against the official PostgreSQL ANTLR grammar
(`packages/parser/playground/pgsql-antlr/PostgreSQLParser.g4`).

PGL is an intentional subset of PostgreSQL's syntax, augmented with PGL-specific
DSL constructs. This document tracks every known difference.

---

## Table of Contents

- [indirection_el](#indirection_el)
- [Expression Hierarchy](#expression-hierarchy)
- [c_expr](#c_expr)
- [b_expr](#b_expr)
- [SELECT Statement](#select-statement)
- [FROM Clause / table_ref](#from-clause--table_ref)
- [target_el](#target_el)
- [Operators](#operators)
- [Subqueries](#subqueries)
- [DML](#dml)
- [DDL — CREATE TABLE](#ddl--create-table)
- [Type System](#type-system)
- [Constants (aexprconst)](#constants-aexprconst)
- [Identifiers](#identifiers)
- [Absent Feature Categories](#absent-feature-categories)
- [Keyword Counts](#keyword-counts)
- [PGL-Specific Rules](#pgl-specific-rules)
- [Token Naming Conventions](#token-naming-conventions)

---

## indirection_el

| Feature | PGL | PostgreSQL |
|---------|-----|------------|
| `DOT (attr_name \| STAR)` | yes | yes |
| `[a_expr]` array subscript | **missing** | yes |
| `[lo:hi]` slice syntax | **missing** | yes |

PGL comment (lines 143-149) notes this omission is intentional.

---

## Expression Hierarchy

### Skipped levels (entirely absent from PGL)

| PostgreSQL Rule | Purpose | PGL Status |
|-----------------|---------|------------|
| `a_expr_qual` | Postfix custom operators (semantic predicate) | skipped |
| `a_expr_lessless` | Bitwise shift `<<` / `>>` | skipped |
| `a_expr_qual_op` | Infix custom operators | skipped |
| `a_expr_unary_qualop` | Prefix custom operators | skipped |
| `a_expr_caret` | Exponentiation `^` | skipped |
| `a_expr_at_time_zone` | `AT TIME ZONE` | skipped |
| `a_expr_collate` | `COLLATE` | skipped |
| `a_expr_typecast` | `::` type cast | **todo** |

### Partial levels (present but incomplete)

| Rule | Missing from PGL |
|------|-----------------|
| `a_expr_between` | `BETWEEN SYMMETRIC` |
| `a_expr_in` | Subquery form `IN (SELECT ...)`; PGL allows empty `IN ()` |
| `a_expr_isnull` | PGL uses `IS [NOT] NULL`; PG uses `ISNULL`/`NOTNULL` tokens |
| `a_expr_is_not` | `IS [NOT] UNKNOWN`, `IS [NOT] DISTINCT FROM`, `IS [NOT] OF (types)`, `IS [NOT] DOCUMENT`, `IS [NOT] NORMALIZED` |
| `a_expr_compare` | Subquery comparisons `op ANY/ALL/SOME (subquery)` |
| `a_expr_like` | `ILIKE`, `SIMILAR TO`, `ESCAPE` clause |

---

## c_expr

### Missing from PGL

- `EXISTS select_with_parens`
- `ARRAY (select | array_expr)` — array constructors
- `PARAM opt_indirection` — positional params `$1`, `$2`
- `GROUPING (expr_list)`
- `UNIQUE select_with_parens`
- `case_expr` — `CASE WHEN ... THEN ... ELSE ... END`
- `func_expr` — all SQL function calls (CAST, EXTRACT, OVERLAY, POSITION, SUBSTRING, TRIM, COALESCE, NULLIF, GREATEST, LEAST, etc.)
- `select_with_parens indirection?` — subquery expressions
- `explicit_row` / `implicit_row` — ROW constructors
- `row OVERLAPS row`
- `DEFAULT` as expression
- `(a_expr) opt_indirection` — PGL has parens but no `opt_indirection` after closing paren

### PGL additions (not in PostgreSQL)

- `DOLLAR_LCURLY pgl_expr R_CURLY` — PGL interpolation `${...}`

---

## b_expr

Absent entirely. PGL uses `a_expr` everywhere (including DEFAULT values) instead of `b_expr`.
PGL comment (lines 386-389) says invalid boolean operators will be rejected during semantic analysis.

---

## SELECT Statement

Missing from PGL's `simple_select`:

- `DISTINCT` / `DISTINCT ON`
- `GROUP BY` (including GROUPING SETS, CUBE, ROLLUP)
- `HAVING`
- `ORDER BY`
- `LIMIT` / `OFFSET` / `FETCH FIRST`
- `UNION` / `INTERSECT` / `EXCEPT`
- `WITH` / CTEs
- `INTO`
- `FOR UPDATE` / `FOR SHARE`
- `VALUES` clause
- `WINDOW` clause
- Parenthesized subselects `(SELECT ...)`

---

## FROM Clause / table_ref

Missing from PGL:

- **All JOIN syntax** — CROSS, INNER, LEFT/RIGHT/FULL OUTER, NATURAL
- **join_qual** — `ON` and `USING` clauses
- `LATERAL`
- Subqueries in FROM
- Functions in FROM (`func_table`)
- `XMLTABLE`
- `TABLESAMPLE`
- `ONLY` (exclude inheritance)
- `relation_expr STAR` (include inheritance)
- `alias_clause` column alias lists — e.g., `AS alias(col1, col2)`

### relation_expr

PGL: `qualified_name` only.
PostgreSQL: `qualified_name STAR?` | `ONLY (qualified_name | (qualified_name))`.

---

## target_el

PGL uses `colid` for bare labels; PostgreSQL uses `bareColLabel` (a much broader
category backed by 400+ keywords).

PGL uses `KW_AS colLabel | colid`; PostgreSQL also supports `bareColLabel` without AS.

---

## Operators

PGL has only built-in operators: `=`, `<>`, `<`, `>`, `<=`, `>=`, `+`, `-`, `*`, `/`, `%`.

Missing:
- Custom `OPERATOR(...)` syntax
- `any_operator`, `qual_op`, `all_op`, `subquery_Op` rules
- The `Operator` token class for user-defined operators

---

## Subqueries

No subquery support at all:
- No `select_with_parens`
- No `EXISTS`
- No `ANY` / `ALL` / `SOME`
- No `ARRAY(SELECT ...)`
- No `UNIQUE`
- No `IN (SELECT ...)`

---

## DML

Only SELECT is supported. Missing:

- `INSERT` (including ON CONFLICT, RETURNING, OVERRIDING)
- `UPDATE` (including SET clause, FROM, RETURNING)
- `DELETE` (including USING, RETURNING)
- `MERGE`
- `COPY`
- All other DDL/DML (ALTER, DROP, GRANT, REVOKE, TRUNCATE, etc.)

---

## DDL -- CREATE TABLE

### createstmt

| Feature | PGL | PostgreSQL |
|---------|-----|------------|
| `IF NOT EXISTS` | yes | yes |
| `opttemp` (`TEMPORARY` / `TEMP` / `UNLOGGED` / `LOCAL` / `GLOBAL`) | yes | yes |
| `optinherit` (`INHERITS (...)`) | yes | yes |
| `optpartitionspec` (`PARTITION BY ...`) | yes (simplified `part_elem`) | yes |
| `table_access_method_clause` (`USING name`) | yes | yes |
| `optwith` (`WITH (...) / WITHOUT OIDS`) | yes (simplified `reloption_elem`) | yes |
| `oncommitoption` (`ON COMMIT ...`) | yes | yes |
| `opttablespace` (`TABLESPACE name`) | yes | yes |
| Empty element list `()` | yes | yes |
| `OF type` (typed table) | **no** | yes |
| `PARTITION OF` (partition table) | **no** | yes |
| `LIKE source_table` (`tablelikeclause`) | **no** | yes |

#### Simplifications vs PostgreSQL

- `part_elem`: only `colid | (a_expr)`. PostgreSQL also supports `func_expr_windowless`, `collate_`, `class_` (opclass).
- `reloption_elem`: value is `aexprconst | colid`. PostgreSQL uses `def_arg` (func_type, reserved_keyword, qual_all_op, NumericOnly, sconst).

### tableelement

PGL: `tableconstraint | columnDef`.
PostgreSQL adds: `tablelikeclause` (LIKE source_table ...).

### columnDef

PGL omits `create_generic_options` (OPTIONS for foreign tables).

### Column constraints missing

- `GENERATED ... AS IDENTITY`
- `GENERATED ... AS (expr) STORED`
- `COLLATE`
- `DEFERRABLE` / `NOT DEFERRABLE` / `INITIALLY DEFERRED` / `INITIALLY IMMEDIATE`
- `NO INHERIT` on CHECK
- `definition_` and `optconstablespace` on UNIQUE / PRIMARY KEY

### colconstraintelem differences

- PGL uses `a_expr` for DEFAULT; PostgreSQL uses `b_expr`

### Table constraints missing

- `EXCLUDE` constraints
- `USING INDEX existing_index`
- `INCLUDE` clause
- `constraintattributespec` (DEFERRABLE etc.)
- `definition_` / `optconstablespace` (index parameters)

---

## Type System

| Feature | PGL | PostgreSQL |
|---------|-----|------------|
| `BIT` / `BIT VARYING` | **no** | yes |
| `JSON` type | **no** | yes |
| `NCHAR` / `NATIONAL CHARACTER` | **no** | yes |
| `DEC` (alias for DECIMAL) | **no** | yes |
| `ARRAY[n]` syntax | **no** | yes |
| Interval qualifiers (YEAR, MONTH, DAY...) | **no** | yes |
| Schema-qualified types (`schema.type`) | **no** | yes |
| Type modifiers as expressions | **no** (integer literals only) | yes |

### typename

PGL: `SETOF? simpletypename opt_array_bounds`.
PostgreSQL adds: `ARRAY (OPEN_BRACKET iconst CLOSE_BRACKET)?`.

### simpletypename

PGL: `numeric | character | constdatetime | constinterval | generictype`.
PostgreSQL adds: `bit`, `jsonType`, interval qualifiers after `constinterval`.

### generictype

PGL omits `attrs?` (schema-qualified type names).
PGL simplifies `type_modifiers_` to integer literals only; PostgreSQL allows general expressions.

### numeric

PostgreSQL has `DEC` as an alias for DECIMAL; PGL does not.

### character

PostgreSQL has `NCHAR` / `NATIONAL CHARACTER` / `NATIONAL CHAR`; PGL does not.

---

## Constants (aexprconst)

PGL: `INTEGER_LITERAL | NUMERIC_LITERAL | STRING_LITERAL | TRUE | FALSE | NULL`.

Missing:
- `B'...'` (binary string constant)
- `X'...'` (hexadecimal string constant)
- Typed string literals (`date '2024-01-01'`)
- `consttypename sconst` (type-prefixed string literals)
- Interval literals with qualifiers

---

## Identifiers

### identifier

PGL: `IDENTIFIER | QUOTED_IDENTIFIER`.
PostgreSQL: `Identifier uescape_? | QuotedIdentifier | UnicodeQuotedIdentifier | PLSQLVARIABLENAME`.

PGL omits: `UESCAPE` clause, `U&"..."` unicode identifiers, PL/pgSQL variables.

Both PGL and PostgreSQL use `identifier` as the base for `colid`, `type_function_name`, and `colLabel`.

### nonreservedword

Exists in PostgreSQL but not PGL.

### bareColLabel

Exists in PostgreSQL (backed by `bare_label_keyword` — 400+ keywords) but not PGL.

---

## Absent Feature Categories

These entire feature areas have no representation in PGL:

- **Window functions** — OVER, PARTITION BY, frame clauses, WITHIN GROUP, FILTER
- **CASE expressions** — CASE WHEN ... THEN ... ELSE ... END
- **Function calls in SQL** — only PGL's `pgl_query_call` inside `${...}`
- **Array / ROW constructors**
- **XML support** — XMLTABLE, XMLELEMENT, XMLFOREST, XMLPARSE, etc.
- **JSON support** — JSON_OBJECT, JSON_ARRAY, JSON_QUERY, JSON_VALUE, etc.
- **Special function syntax** — CAST, EXTRACT, OVERLAY, POSITION, SUBSTRING, TRIM, COALESCE, NULLIF, GREATEST, LEAST
- **Current-value functions** — CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP, CURRENT_USER, SESSION_USER, etc.
- **Dollar-quoted strings**
- **Unicode escape** (UESCAPE)
- **PL/pgSQL variables** (PLSQLVARIABLENAME)
- **Custom operators** (the `Operator` token class)

---

## Keyword Counts

| Category | PGL | PostgreSQL |
|----------|-----|------------|
| unreserved_keyword | 33 | 330+ |
| col_name_keyword | 17 | 48 |
| type_func_name_keyword | 3 | 16 |
| reserved_keyword | 20 | 62 |
| bare_label_keyword | **absent** | 400+ |
| **Total** | ~73 | ~500+ |

---

## PGL-Specific Rules

These rules exist only in PGL and have no PostgreSQL counterpart:

| Rule | Purpose |
|------|---------|
| `prog` | Top-level: `def* EOF` |
| `def` | `query_def \| type_def \| database_def` |
| `query_def` | Named query with typed parameters |
| `type_parameter_list` | Generic type params `<T, U>` |
| `query_parameter_list` | Parameter list with trailing comma support |
| `query_parameter` | `colid (: type_expression)?` |
| `query_body` | SELECT or `${pgl_expr}` or bare dollar-ident |
| `pgl_expr` | `pgl_query_call \| pgl_ident_ref \| aexprconst` |
| `pgl_query_call` | Function call with optional type arguments |
| `type_argument_list` | `::<type1, type2>` syntax |
| `columnref_or_pgl_dollar_ident_ref` | Combined column ref / dollar-ident |
| `type_def` | Stub (not yet implemented) |
| `type_expression` / `type_ref` | PGL type expression system |
| `database_def` | `database { ddl_statement* }` block |
| `ddl_statement` | `createstmt ;` |

### PGL-specific tokens

- `DOLLAR_LCURLY` / `R_CURLY` — for `${...}` interpolation
- `L_CURLY` / `R_CURLY` — for block delimiters `{ }`
- `COLONCOLON` — for `::` type argument prefix
- `LT` / `GT` — dual use as angle brackets in type parameter lists

---

## Token Naming Conventions

| Concept | PGL Token | PostgreSQL Token |
|---------|-----------|------------------|
| Opening paren | `L_PAREN` | `OPEN_PAREN` |
| Closing paren | `R_PAREN` | `CLOSE_PAREN` |
| Opening bracket | `L_BRACKET` | `OPEN_BRACKET` |
| Closing bracket | `R_BRACKET` | `CLOSE_BRACKET` |
| Equal | `EQ` | `EQUAL` |
| Not equal | `NEQ` | `NOT_EQUALS` |
| Less-or-equal | `LTE` | `LESS_EQUALS` |
| Greater-or-equal | `GTE` | `GREATER_EQUALS` |
| Identifier | `IDENTIFIER` | `Identifier` |
| Quoted identifier | `QUOTED_IDENTIFIER` | `QuotedIdentifier` |
| Integer | `INTEGER_LITERAL` | `Integral` (via `iconst`) |
| Decimal | `NUMERIC_LITERAL` | `Numeric` (via `fconst`) |
| String | `STRING_LITERAL` | `StringConstant` (via `sconst`) |
| Keywords | `KW_SELECT`, `KW_FROM`, ... | `SELECT`, `FROM`, ... |
