import type { Emitter, EmitInput, EmitOutput } from "@pglambda/emitter";
import { type Doc, concat, join, hardline, render } from "@pglambda/utils/doc";
import type { FunctionType, Type } from "@pglambda/types";
import type { QueryDef, HirStore, DefinitionId } from "@pglambda/hir";
import { emitQueryDecl } from "./query.js";
import { emitTableInterface } from "./table.js";
import { ImportTracker } from "./imports.js";
import { checkConflicts } from "./conflicts.js";
import { snakeToCamel, snakeToPascal } from "./names.js";

export { snakeToCamel, snakeToPascal } from "./names.js";
export { emitType } from "./type-map.js";
export { emitSqlBody } from "./sql-body.js";
export { emitQueryDecl } from "./query.js";
export { ImportTracker } from "./imports.js";
export { checkConflicts } from "./conflicts.js";

export class TsEmitter implements Emitter {
  emit(input: EmitInput): EmitOutput {
    const { module, hirStore, checkResult, typeStore } = input;

    // Collect all names that will appear in the generated file
    const nameEntries: {
      pglName: string;
      tsName: string;
      kind: "function" | "type";
    }[] = [];

    // Collect query defs and their types
    const queries: { def: QueryDef; fnType: FunctionType }[] = [];
    for (const def of module.data.defs) {
      if (def.tag !== "query") continue;
      const queryDef = def;
      // Look up the function type from exported types
      // We need the definition ID — find it via the query name resolution
      const fnType = findQueryFnType(
        queryDef,
        hirStore,
        checkResult.exportedTypes,
      );
      if (!fnType) continue;
      const tsName = snakeToCamel(queryDef.data.name.data.text);
      nameEntries.push({
        pglName: queryDef.data.name.data.text,
        tsName,
        kind: "function",
      });
      queries.push({ def: queryDef, fnType });
    }

    // Collect table types
    const tables: { defId: DefinitionId; name: string; rowType: Type }[] = [];
    for (const [defId, rowType] of checkResult.tableTypes) {
      const def = hirStore.getDefinition(defId);
      if (!def || def.tag !== "table") continue;
      const tsName = snakeToPascal(def.name) + "Row";
      nameEntries.push({ pglName: def.name, tsName, kind: "type" });
      tables.push({ defId, name: def.name, rowType });
    }

    // Check for conflicts
    const conflicts = checkConflicts(nameEntries);
    if (conflicts.length > 0) {
      return { ok: false, errors: conflicts };
    }

    // Emit
    const tracker = new ImportTracker();
    const parts: Doc[] = [];

    // Table interfaces
    for (const table of tables) {
      parts.push(emitTableInterface(table.name, table.rowType, typeStore));
    }

    // Query functions
    for (const { def, fnType } of queries) {
      parts.push(emitQueryDecl(def, fnType, hirStore, typeStore, tracker));
    }

    // Assemble: imports first, then body
    const body = join(concat(hardline, hardline), parts);
    const imports = tracker.emitImports();
    const file =
      imports.tag === "nil" ? body : concat(imports, hardline, hardline, body);

    return { ok: true, result: { code: render(file) } };
  }
}

function findQueryFnType(
  queryDef: QueryDef,
  hirStore: HirStore,
  exportedTypes: ReadonlyMap<DefinitionId, Type>,
): FunctionType | undefined {
  // The definition ID for the query should match the QueryDef's name node resolution
  // or we can iterate exportedTypes looking for a matching definition
  for (const [defId, type] of exportedTypes) {
    if (type.kind !== "function") continue;
    const def = hirStore.getDefinition(defId);
    if (
      def &&
      def.tag === "query" &&
      def.name === queryDef.data.name.data.text
    ) {
      return type;
    }
  }
  return undefined;
}
