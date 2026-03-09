import type { QueryDef, HirStore } from "@pglambda/hir";
import type { FunctionType, TypeStore, Type } from "@pglambda/types";
import {
  type Doc,
  text,
  concat,
  group,
  nest,
  join,
  line,
  softline,
  hardline,
} from "@pglambda/utils/doc";
import { emitType } from "./type-map.js";
import { emitSqlBody } from "./sql-body.js";
import { snakeToCamel } from "./names.js";
import type { ImportTracker } from "./imports.js";

/**
 * Determine if a type is SetOf (i.e., a full query, not a fragment).
 */
function isSetOf(type: Type, store: TypeStore): boolean {
  if (type.kind !== "applied") return false;
  const ctor = store.ctors.get(type.constructorId);
  return ctor.name === "SetOf";
}

/**
 * Classify a parameter by its type.
 * Record type → row param (TS type: string, used with raw())
 * Otherwise → value param (TS type from type-map, used with param())
 */
function isRowParam(type: Type): boolean {
  return type.kind === "record";
}

/**
 * Emit a query definition as a TypeScript function declaration.
 */
export function emitQueryDecl(
  def: QueryDef,
  fnType: FunctionType,
  hirStore: HirStore,
  store: TypeStore,
  tracker: ImportTracker
): Doc {
  const fnName = snakeToCamel(def.data.name.data.text);
  const isFullQuery = isSetOf(fnType.returnType, store);

  // Collect row param names
  const rowParams = new Set<string>();
  for (let i = 0; i < fnType.parameterTypes.length; i++) {
    if (isRowParam(fnType.parameterTypes[i])) {
      rowParams.add(fnType.parameters[i]);
    }
  }

  // Parameters
  const params = fnType.parameters.map((name, i) => {
    const paramType = fnType.parameterTypes[i];
    const tsType = isRowParam(paramType) ? text("string") : emitType(paramType, store);
    return concat(text(name), text(": "), tsType);
  });

  // Return type
  let returnType: Doc;
  if (isFullQuery) {
    tracker.useType("Query");
    const rowType = emitType(fnType.returnType, store); // emitType unwraps SetOf
    returnType = concat(text("Query<"), rowType, text(">"));
  } else {
    tracker.useType("SqlFragment");
    returnType = text("SqlFragment");
  }

  // Body
  const body = emitSqlBody(def.data.body, hirStore, rowParams, tracker);

  // Assemble function
  const paramList =
    params.length > 0
      ? group(
          concat(
            text("("),
            nest(2, concat(softline, join(concat(text(","), line), params))),
            softline,
            text(")")
          )
        )
      : text("()");

  return concat(
    text("export function "),
    text(fnName),
    paramList,
    text(": "),
    returnType,
    text(" {"),
    nest(2, concat(hardline, text("return "), body, text(";"))),
    hardline,
    text("}")
  );
}
