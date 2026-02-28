import type { Type, TypeStore } from "@pglambda/types";
import type { PrimitiveName } from "@pglambda/types";
import { type Doc, text, concat, group, nest, join, line } from "@pglambda/emitter";

const PRIMITIVE_TO_TS: Record<PrimitiveName, string> = {
  // string types
  text: "string",
  uuid: "string",
  inet: "string",
  cidr: "string",
  macaddr: "string",
  money: "string",
  xml: "string",
  time: "string",
  timetz: "string",
  interval: "string",

  // number types
  smallint: "number",
  integer: "number",
  real: "number",
  double: "number",

  // PG returns these as strings (arbitrary precision / 8-byte)
  bigint: "string",
  numeric: "string",

  // boolean
  boolean: "boolean",

  // Date types
  timestamp: "Date",
  timestamptz: "Date",
  date: "Date",

  // JSON
  json: "unknown",
  jsonb: "unknown",

  // binary
  bytea: "Buffer",

  // void
  void: "void",

  // geometric — all represented as strings
  point: "string",
  line: "string",
  lseg: "string",
  box: "string",
  path: "string",
  polygon: "string",
  circle: "string",
};

/**
 * Convert a PGL Type to a TypeScript type annotation Doc.
 *
 * For SetOf<R>, this unwraps to just R — the caller is responsible
 * for wrapping in Query<R> when needed.
 */
export function emitType(type: Type, store: TypeStore): Doc {
  switch (type.kind) {
    case "primitive":
      return text(PRIMITIVE_TO_TS[type.name]);

    case "record": {
      const entries = Object.entries(type.fields)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, fieldType]) =>
          concat(text(name), text(": "), emitType(fieldType, store)),
        );
      if (entries.length === 0) return text("Record<string, never>");
      return group(concat(
        text("{"),
        nest(2, concat(line, join(concat(text(";"), line), entries))),
        line,
        text("}"),
      ));
    }

    case "array":
      return concat(emitType(type.elementType, store), text("[]"));

    case "nullable":
      return concat(emitType(type.innerType, store), text(" | null"));

    case "applied": {
      // SetOf<R> → unwrap to just R
      const ctor = store.ctors.get(type.constructorId);
      if (ctor.name === "SetOf" && type.arguments.length === 1) {
        return emitType(type.arguments[0], store);
      }
      // Generic fallback
      const args = type.arguments.map((a) => emitType(a, store));
      return concat(text(ctor.name), text("<"), join(text(", "), args), text(">"));
    }

    case "function":
    case "typevar":
    case "param":
    case "error":
      // These shouldn't appear in emitted output — fallback
      return text("unknown");
  }
}
