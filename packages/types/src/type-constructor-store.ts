import type { TypeConstructor, TypeConstructorId } from "./type.js";
import { type AnyBuiltInTypeConstructorDef, BuiltinTypeConstructors } from "./builtins.js";

export class TypeConstructorStore {
  private nextId = 0;
  private constructorCache = new Map<string, TypeConstructor>();
  private constructorById = new Map<TypeConstructorId, TypeConstructor>();

  constructor() {
    for (const def of Object.values(BuiltinTypeConstructors)) {
      this.registerBuiltin(def);
    }
  }

  private freshCtorId(): TypeConstructorId {
    return this.nextId++ as TypeConstructorId;
  }

  private registerBuiltin(def: AnyBuiltInTypeConstructorDef): TypeConstructorId {
    const id = this.freshCtorId();
    const ctor: TypeConstructor = {
      id,
      name: def.name,
      parameters: Object.keys(def.parameters), // Convert Record to array
    };
    this.constructorCache.set(def.name, ctor);
    this.constructorById.set(id, ctor);
    return id;
  }

  /**
   * Get type constructor by ID
   * @throws Error if constructor not found
   */
  get(id: TypeConstructorId): TypeConstructor {
    const ctor = this.constructorById.get(id);
    if (!ctor) {
      throw new Error(`Type constructor with ID ${id} not found`);
    }
    return ctor;
  }

  /**
   * Look up type constructor by name
   * Returns undefined if not found
   */
  lookup(name: string): TypeConstructor | undefined {
    return this.constructorCache.get(name);
  }

  /**
   * Get constructor name by ID (for error messages, pretty printing)
   */
  getName(id: TypeConstructorId): string {
    return this.get(id).name;
  }
}
