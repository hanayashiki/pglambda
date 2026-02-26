import type { TypeScheme, TypeSchemeId } from "./type.js";

export class TypeSchemeStore {
  private nextId = 0;
  private schemeById = new Map<TypeSchemeId, TypeScheme>();

  freshId(): TypeSchemeId {
    return this.nextId++ as TypeSchemeId;
  }

  register(scheme: TypeScheme): void {
    this.schemeById.set(scheme.id, scheme);
  }

  get(id: TypeSchemeId): TypeScheme | undefined {
    return this.schemeById.get(id);
  }

  values(): IterableIterator<TypeScheme> {
    return this.schemeById.values();
  }
}
