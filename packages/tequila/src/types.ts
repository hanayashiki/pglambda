import type { AnyKeySchema } from "./key.js";

export interface CachedValue<V> {
  value: V;
  verified: boolean;
  dependencies?: DependencyRecord[];
}

export interface DependencyRecord {
  schema: AnyKeySchema;
  key: any;
  value: any; // Stored for === comparison
}

export interface ExecutionContext {
  schema: AnyKeySchema;
  key: any;
  dependencies: DependencyRecord[];
  parent?: ExecutionContext;
}
