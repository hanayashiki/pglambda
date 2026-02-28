import { type Doc, text, join, hardline, nil } from "@pglambda/emitter";

/** Tracks which @pglambda/runtime symbols are used during emission. */
export class ImportTracker {
  private readonly values = new Set<string>();
  private readonly types = new Set<string>();

  useValue(name: string): void {
    this.values.add(name);
  }

  useType(name: string): void {
    this.types.add(name);
  }

  /** Emit import declarations. Returns nil if nothing was used. */
  emitImports(): Doc {
    const parts: Doc[] = [];

    if (this.values.size > 0) {
      const names = [...this.values].sort().join(", ");
      parts.push(text(`import { ${names} } from "@pglambda/runtime";`));
    }

    if (this.types.size > 0) {
      const names = [...this.types].sort().join(", ");
      parts.push(text(`import type { ${names} } from "@pglambda/runtime";`));
    }

    if (parts.length === 0) return nil;
    return join(hardline, parts);
  }
}
