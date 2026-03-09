import type { Type, TypeStore } from "@pglambda/types";
import { type Doc, text, concat, nest, join, hardline } from "@pglambda/utils/doc";
import { emitType } from "./type-map.js";
import { snakeToPascal } from "./names.js";

/**
 * Emit a table row type as a TypeScript interface.
 *
 * The record type fields become interface properties.
 * Always uses multi-line format for readability.
 */
export function emitTableInterface(tableName: string, rowType: Type, store: TypeStore): Doc {
  const interfaceName = snakeToPascal(tableName) + "Row";

  if (rowType.kind !== "record") {
    // Shouldn't happen, but handle gracefully
    return concat(text(`export interface ${interfaceName} {}`));
  }

  const fields = Object.entries(rowType.fields)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, fieldType]) =>
      concat(text(name), text(": "), emitType(fieldType, store), text(";"))
    );

  return concat(
    text(`export interface ${interfaceName} {`),
    nest(2, concat(hardline, join(hardline, fields))),
    hardline,
    text("}")
  );
}
