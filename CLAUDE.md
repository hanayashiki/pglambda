# pglambda Project Guide

> **📖 Full Design Documentation:** See [./docs/src/SUMMARY.md](./docs/src/SUMMARY.md) for comprehensive project design, architecture, and implementation roadmap.

## Project Overview

**pglambda** is a type-safe SQL builder language that compiles `.pgl` files into TypeScript with full type safety.

### Quick Example

```pgl
query get_user_by_id($id: text) {
    select * from users where id = $id
}
```
↓ compiles to ↓
```ts
getUserById(id: string): User[]
```

## Key Design Principles

1. **Strict typing** - NO implicit coercion (stricter than PostgreSQL)
2. **Files are modules** - Compilation boundaries at file level
3. **Constraint-based inference** - With SCC decomposition for recursion
4. **Row polymorphism (internal)** - One-pass unification, no fixed-point loops

See [DESIGN.md](DESIGN.md) sections:
- **Type System** - Design philosophy, no implicit coercion
- **Type Checker Architecture** - Constraint-based inference algorithm
- **Implementation Phases** - Current progress and roadmap

## Monorepo Structure

```
packages/
├── compiler/     # Main pglambda compiler
├── tequila/      # Incremental computation cache (like Salsa)
├── vfs/          # Virtual File System abstraction
└── ...
```

### Package: tequila

**Incremental computation framework** using dependency tracking and invalidation.

Key concepts:
- **Inputs**: External data sources (files, DB schema)
- **Tracked computations**: Derived values with dependency tracking
- **Invalidation**: `===` comparison for change detection
- **Context preservation**: Use `db.get()` to maintain tracking context

**Important:** Wrappers from `defineInput`/`defineTracked` MUST use the provided `db` parameter (not ignore it) to preserve dependency tracking context.

### Package: vfs

**Virtual File System** abstraction using `better-result` library.

- **MemoryVFS**: In-memory implementation for testing
- **NodeVFS**: Node.js filesystem implementation
- **Result type**: `Result.ok(value)` / `Result.err(error)` from `better-result`
- **Glob support**: Pattern matching with minimatch

### Package: compiler

**Main pglambda compiler** structured around tequila queries for incremental compilation.

#### Query Architecture Principles

1. **Phases as Queries**: Each compiler phase is a tequila query
   - Input queries for external data (files, schema)
   - Tracked queries for derived computations (parsing, type checking)
   - Queries compose via `db.get()` to preserve dependency tracking

2. **HostedQuery Pattern**: Queries that need compiler context use `hostedQuery` wrapper
   ```typescript
   export const loadTextContent = hostedQuery(async (db, uri, ctx) => {
     const result = await ctx.vfs.readFile(uri);
     // ... use ctx.vfs, ctx.options
   });
   ```

3. **Query Organization**:
   - One query per file in `queries/` folders
   - Queries organized by compilation phase
   - Clear dependencies between phases

## Dependencies (pnpm catalog)

```yaml
catalog:
  zod: 4.3.6
  better-result: 2.7.0
  minimatch: ^10.0.1
```

## Implementation Status

### ✅ Completed
- TypeStore with structural sharing
- Row polymorphism support (open/closed records)
- Unification algorithm with row types
- Substitution with provenance tracking
- VFS implementation with better-result
- Compiler folder structure with query-based architecture
- `loadTextContent` input query (reads .pgl files)

### 🚧 Current Phase: Compiler Query Pipeline
**Building incremental compilation infrastructure**

Next tasks:
- Implement parsing query (AST generation)
- Implement import extraction and module resolution queries
- Define constraint types (field access, assignable, overload)
- Implement Solver (orchestrates constraint solving)
- Test solver with row polymorphism

## Coding Guidelines

### TypeScript Conventions
- **verbatimModuleSyntax**: Use `export type` for type-only exports
- **Imports**: `.js` extensions in import paths
- **No global state**: Per-instance tracking (e.g., schema names per DB)

### Result Type Usage (better-result)

The `better-result` library provides a Result type for error handling without exceptions.

**Creating Results:**
```typescript
import { Result } from "better-result";

return Result.ok(value);      // Success
return Result.err(error);     // Failure
```

**Checking and Unwrapping:**
```typescript
// Check result state (instance method - preferred)
if (result.isOk()) {
  const value = result.value;  // Access success value
}

if (result.isErr()) {
  const error = result.error;  // Access error
}

// Static methods (alternative)
if (Result.isOk(result)) { ... }
if (Result.isErr(result)) { ... }

// Safe unwrapping
const value = result.unwrapOr(defaultValue);

// Pattern matching
result.match({
  ok: (value) => handleSuccess(value),
  err: (error) => handleError(error),
});
```

**Common Pattern in VFS Queries:**
```typescript
const result = await ctx.vfs.readFile(path);

if (result.isOk()) {
  return { content: result.value, success: true };
} else {
  return { content: "", success: false };
}
```

**Type Annotations:**
```typescript
async function foo(): Promise<Result<string, Error>> { ... }
```

## Testing
- Use vitest for testing
- Each package has `pnpm test` command
- Run `pnpm check` for type checking

## Important Notes

1. **Files define compilation boundaries** - Type inference is scoped to files
2. **SCCs must fit within files** - No cross-file mutual recursion
3. **Stricter than PostgreSQL** - Explicit casts required
4. **Row polymorphism is internal** - Users see closed record types
5. **One-pass unification** - No fixed-point iteration needed
