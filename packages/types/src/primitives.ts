// PostgreSQL primitive type names (SQL-standard display names)
// Maps PostgreSQL types to pglambda's type system

export type PrimitiveName =
  // Integer types
  | "smallint" // 2 bytes (-32768 to +32767)
  | "integer" // 4 bytes (-2147483648 to +2147483647)
  | "bigint" // 8 bytes

  // Floating point types
  | "real" // 4 bytes (6 decimal digits precision)
  | "double" // 8 bytes (15 decimal digits precision)
  | "numeric" // arbitrary precision decimal

  // Character types
  | "text" // variable-length string

  // Boolean
  | "boolean"

  // Date/Time types
  | "timestamp" // timestamp without time zone
  | "timestamptz" // timestamp with time zone
  | "date" // date (no time of day)
  | "time" // time of day (no date)
  | "timetz" // time with time zone
  | "interval" // time interval

  // UUID
  | "uuid" // universally unique identifier

  // JSON types
  | "json" // textual JSON data
  | "jsonb" // binary JSON data (decomposed)

  // Binary data
  | "bytea" // binary data ("byte array")

  // Network address types
  | "inet" // IPv4 or IPv6 host address
  | "cidr" // IPv4 or IPv6 network address
  | "macaddr" // MAC address

  // Geometric types
  | "point" // geometric point
  | "line" // infinite line
  | "lseg" // line segment
  | "box" // rectangular box
  | "path" // geometric path
  | "polygon" // closed geometric path
  | "circle" // circle

  // Other types
  | "money" // currency amount
  | "xml" // XML data
  | "void"; // void type (for functions returning nothing)

/**
 * Common primitive type constants for convenience
 */
export const PRIMITIVE = {
  SMALLINT: "smallint" as const,
  INTEGER: "integer" as const,
  BIGINT: "bigint" as const,
  REAL: "real" as const,
  DOUBLE: "double" as const,
  NUMERIC: "numeric" as const,
  TEXT: "text" as const,
  BOOLEAN: "boolean" as const,
  TIMESTAMP: "timestamp" as const,
  TIMESTAMPTZ: "timestamptz" as const,
  DATE: "date" as const,
  TIME: "time" as const,
  INTERVAL: "interval" as const,
  UUID: "uuid" as const,
  JSON: "json" as const,
  JSONB: "jsonb" as const,
  BYTEA: "bytea" as const,
} as const;
