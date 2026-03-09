import type { AnyKeySchema } from "./key.js";

export interface CachedValue<V> {
  value: V;
  verified: boolean;
  dependencies?: DependencyRecord[];
}

export interface DependencyRecord {
  schema: AnyKeySchema;
  key: unknown;
  value: unknown; // Stored for === comparison
}

export interface ExecutionContext {
  schema: AnyKeySchema;
  key: unknown;
  dependencies: DependencyRecord[];
  parent?: ExecutionContext;
}
