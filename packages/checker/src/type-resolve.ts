import type { SimpleTypeName } from "@pglambda/hir";
import type { PrimitiveName } from "@pglambda/types";

const numericBaseMap: Record<string, PrimitiveName> = {
  int: "integer",
  integer: "integer",
  smallint: "smallint",
  bigint: "bigint",
  real: "real",
  float: "double",
  double: "double",
  decimal: "numeric",
  numeric: "numeric",
  boolean: "boolean",
};

/**
 * Map a HIR SimpleTypeName to a PrimitiveName for the type system.
 * Returns null for types not yet supported (e.g. user-defined domains).
 */
export function simpleTypeToPrimitive(st: SimpleTypeName): PrimitiveName | null {
  switch (st.kind) {
    case "numeric":
      return numericBaseMap[st.base] ?? null;
    case "character":
      return "text";
    case "datetime":
      if (st.base === "timestamp")
        return st.timezone === "with" ? "timestamptz" : "timestamp";
      return st.timezone === "with" ? "timetz" : "time";
    case "interval":
      return "interval";
    case "named":
      return null;
  }
}
