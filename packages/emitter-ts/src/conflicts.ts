import type { EmitError } from "@pglambda/emitter";

const RUNTIME_VALUES = new Set(["sql", "param", "raw", "join", "insert", "update"]);
const RUNTIME_TYPES = new Set(["Query", "SqlFragment"]);

type NameEntry = {
  pglName: string;
  tsName: string;
  kind: "function" | "type";
};

/**
 * Check for name conflicts between generated names and runtime imports.
 * Returns errors if any conflicts found — emitter should abort.
 */
export function checkConflicts(entries: readonly NameEntry[]): EmitError[] {
  const errors: EmitError[] = [];
  const seen = new Map<string, NameEntry>();

  // Reserve runtime names
  for (const name of [...RUNTIME_VALUES, ...RUNTIME_TYPES]) {
    seen.set(name, { pglName: "(runtime)", tsName: name, kind: "function" });
  }

  for (const entry of entries) {
    const existing = seen.get(entry.tsName);
    if (existing) {
      const conflictWith =
        existing.pglName === "(runtime)"
          ? `runtime import '${existing.tsName}'`
          : `'${existing.pglName}'`;
      errors.push({
        message: `'${entry.pglName}' maps to '${entry.tsName}' which conflicts with ${conflictWith}`,
      });
    } else {
      seen.set(entry.tsName, entry);
    }
  }

  return errors;
}
