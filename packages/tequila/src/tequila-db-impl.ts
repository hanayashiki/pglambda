import type { AnyKeySchema, KeyType, QueryFunction, ValueType } from "./key.js";
import type { TequilaNode } from "./node.js";
import type { TequilaDB } from "./tequila-db.js";
import type {
  CachedValue,
  DependencyRecord,
  ExecutionContext,
} from "./types.js";

/**
 * Context-aware DB wrapper that carries execution context for async-safe dependency tracking
 */
class TequilaDBWithContext implements TequilaDB {
  constructor(
    private impl: TequilaDBImpl,
    private context: ExecutionContext,
  ) {}

  async get<S extends AnyKeySchema>(
    schema: S,
    key: KeyType<S>,
  ): Promise<ValueType<S>> {
    return this.impl.getWithContext(schema, key, this.context);
  }

  defineInput<S extends AnyKeySchema>(
    schema: S,
    fn: QueryFunction<S>,
  ): QueryFunction<S> {
    return this.impl.defineInput(schema, fn);
  }

  defineTracked<S extends AnyKeySchema>(
    schema: S,
    fn: QueryFunction<S>,
  ): QueryFunction<S> {
    return this.impl.defineTracked(schema, fn);
  }

  invalidateInput<S extends AnyKeySchema>(schema: S, key: KeyType<S>): void {
    this.impl.invalidateInput(schema, key);
  }

  invalidateAll(): void {
    this.impl.invalidateAll();
  }
}

export class TequilaDBImpl implements TequilaDB {
  // Registry: Map from KeySchema to its registered node (input or tracked function)
  private nodes: Map<AnyKeySchema, TequilaNode<any, any>> = new Map();

  // Cache: Map from KeySchema to Map from key to cached result
  private cache: Map<AnyKeySchema, Map<any, CachedValue<any>>> = new Map();

  // Reverse dependencies: For each (schema, key), track which other (schema, key) pairs depend on it
  private reverseDeps: Map<
    AnyKeySchema,
    Map<any, Set<{ schema: AnyKeySchema; key: any }>>
  > = new Map();

  // In-flight computations: Deduplicate concurrent gets for the same key
  private inFlight: Map<AnyKeySchema, Map<any, Promise<any>>> = new Map();

  // Track schema names used in this DB instance to ensure uniqueness
  private schemaNames: Set<string> = new Set();

  async get<S extends AnyKeySchema>(
    schema: S,
    key: KeyType<S>,
  ): Promise<ValueType<S>> {
    return this.getWithContext(schema, key, undefined);
  }

  /** @internal */
  async getWithContext<S extends AnyKeySchema>(
    schema: S,
    key: KeyType<S>,
    parentContext: ExecutionContext | undefined,
  ): Promise<ValueType<S>> {
    // Step 1: Check cache and verify dependencies
    const schemaCache = this.cache.get(schema);
    const cached = schemaCache?.get(key);

    if (cached) {
      if (cached.verified) {
        // Fast path: verified cache hit
        // Record in parent's dependencies if in tracking context
        if (parentContext) {
          parentContext.dependencies.push({ schema, key, value: cached.value });
        }
        return cached.value;
      }

      // Verify dependencies haven't changed
      if (cached.dependencies) {
        let allUnchanged = true;
        for (const dep of cached.dependencies) {
          // Don't pass parentContext when verifying - just check the value
          const currentValue = await this.getWithContext(
            dep.schema,
            dep.key,
            undefined,
          );
          if (currentValue !== dep.value) {
            allUnchanged = false;
            break;
          }
        }

        if (allUnchanged) {
          // Dependencies unchanged, mark as verified
          cached.verified = true;

          // Record in parent's dependencies if in tracking context
          if (parentContext) {
            parentContext.dependencies.push({
              schema,
              key,
              value: cached.value,
            });
          }

          return cached.value;
        }
      }
    }

    // Step 2: Check for cycles BEFORE checking in-flight
    // (otherwise we'd deadlock waiting for ourselves)
    let currentCtx = parentContext;
    while (currentCtx) {
      if (currentCtx.schema === schema && currentCtx.key === key) {
        throw new Error(
          `Dependency cycle detected involving schema ${schema.name} and key ${key}`,
        );
      }
      currentCtx = currentCtx.parent;
    }

    // Step 3: Check if already computing (deduplication)
    const inFlightPromise = this.inFlight.get(schema)?.get(key);
    if (inFlightPromise) {
      const value = await inFlightPromise;
      // Record in parent's dependencies if in tracking context
      if (parentContext) {
        parentContext.dependencies.push({ schema, key, value });
      }
      return value;
    }

    // Step 4: Start computation
    const computePromise = this.compute(schema, key, parentContext);

    // Store in-flight promise
    if (!this.inFlight.has(schema)) {
      this.inFlight.set(schema, new Map());
    }
    this.inFlight.get(schema)!.set(key, computePromise);

    try {
      return await computePromise;
    } finally {
      // Remove from in-flight
      this.inFlight.get(schema)?.delete(key);
    }
  }

  private async compute<S extends AnyKeySchema>(
    schema: S,
    key: KeyType<S>,
    parentContext: ExecutionContext | undefined,
  ): Promise<ValueType<S>> {
    // Step 1: Compute value
    const node = this.nodes.get(schema);
    if (!node) {
      throw new Error(`No node registered for schema ${schema.name}`);
    }

    // Cycle detection already done in getWithContext
    let value: ValueType<S>;
    let collectedDeps: DependencyRecord[] | undefined;

    if (node.type === "tracked") {
      // Set up tracking context
      const context: ExecutionContext = {
        schema,
        key,
        dependencies: [],
        parent: parentContext,
      };

      // Create a context-aware DB wrapper
      const contextDB = new TequilaDBWithContext(this, context);

      value = await node.fn(contextDB, key);
      collectedDeps = context.dependencies;
    } else {
      // Input nodes don't track dependencies
      value = await node.fn(this, key);
    }

    // Step 2: Update cache
    if (!this.cache.has(schema)) {
      this.cache.set(schema, new Map());
    }
    this.cache.get(schema)!.set(key, {
      value,
      verified: true,
      dependencies: collectedDeps,
    });

    // Step 3: Update reverse dependencies
    if (collectedDeps) {
      for (const dep of collectedDeps) {
        if (!this.reverseDeps.has(dep.schema)) {
          this.reverseDeps.set(dep.schema, new Map());
        }
        if (!this.reverseDeps.get(dep.schema)!.has(dep.key)) {
          this.reverseDeps.get(dep.schema)!.set(dep.key, new Set());
        }
        this.reverseDeps.get(dep.schema)!.get(dep.key)!.add({ schema, key });
      }
    }

    // Step 4: Record in parent's dependencies if in tracking context
    if (parentContext) {
      parentContext.dependencies.push({ schema, key, value });
    }

    return value;
  }

  defineInput<S extends AnyKeySchema>(
    keySchema: S,
    fn: QueryFunction<S>,
  ): QueryFunction<S> {
    // Check for duplicate schema names in this DB instance
    if (this.schemaNames.has(keySchema.name)) {
      throw new Error(
        `Schema with name '${keySchema.name}' has already been defined in this DB`,
      );
    }
    this.schemaNames.add(keySchema.name);

    const node: TequilaNode<KeyType<S>, ValueType<S>> = {
      type: "input",
      keySchema,
      fn,
    };
    this.nodes.set(keySchema, node);

    // Return wrapper that delegates to db.get() to preserve context
    return (db: TequilaDB, key: KeyType<S>) => db.get(keySchema, key);
  }

  defineTracked<S extends AnyKeySchema>(
    keySchema: S,
    fn: QueryFunction<S>,
  ): QueryFunction<S> {
    // Check for duplicate schema names in this DB instance
    if (this.schemaNames.has(keySchema.name)) {
      throw new Error(
        `Schema with name '${keySchema.name}' has already been defined in this DB`,
      );
    }
    this.schemaNames.add(keySchema.name);

    const node: TequilaNode<KeyType<S>, ValueType<S>> = {
      type: "tracked",
      keySchema,
      fn,
    };
    this.nodes.set(keySchema, node);

    // Return wrapper that delegates to db.get() to preserve context
    return (db: TequilaDB, key: KeyType<S>) => db.get(keySchema, key);
  }

  invalidateInput<S extends AnyKeySchema>(schema: S, key: KeyType<S>): void {
    const schemaCache = this.cache.get(schema);
    const cached = schemaCache?.get(key);
    if (cached) {
      cached.verified = false;
    }

    // Recursively invalidate all dependents
    const dependents = this.reverseDeps.get(schema)?.get(key);
    if (dependents) {
      for (const dep of dependents) {
        this.invalidateInput(dep.schema, dep.key);
      }
    }
  }

  invalidateAll(): void {
    // Mark all cached values as unverified
    for (const schemaCache of this.cache.values()) {
      for (const cached of schemaCache.values()) {
        cached.verified = false;
      }
    }
  }
}
