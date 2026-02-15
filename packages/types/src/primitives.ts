// PostgreSQL primitive type names
// Maps PostgreSQL types to pglambda's type system

export type PrimitiveName =
  // Integer types
  | 'int2' // smallint (-32768 to +32767)
  | 'int4' // integer (-2147483648 to +2147483647)
  | 'int8' // bigint
  | 'int' // Alias for int4

  // Floating point types
  | 'float4' // real (6 decimal digits precision)
  | 'float8' // double precision (15 decimal digits precision)
  | 'numeric' // arbitrary precision decimal

  // Character types
  | 'text' // variable-length string
  | 'varchar' // variable-length with limit
  | 'char' // fixed-length string
  | 'bpchar' // blank-padded char

  // Boolean
  | 'bool' // boolean (true/false)

  // Date/Time types
  | 'timestamp' // timestamp without time zone
  | 'timestamptz' // timestamp with time zone
  | 'date' // date (no time of day)
  | 'time' // time of day (no date)
  | 'timetz' // time with time zone
  | 'interval' // time interval

  // UUID
  | 'uuid' // universally unique identifier

  // JSON types
  | 'json' // textual JSON data
  | 'jsonb' // binary JSON data (decomposed)

  // Binary data
  | 'bytea' // binary data ("byte array")

  // Network address types
  | 'inet' // IPv4 or IPv6 host address
  | 'cidr' // IPv4 or IPv6 network address
  | 'macaddr' // MAC address

  // Geometric types
  | 'point' // geometric point
  | 'line' // infinite line
  | 'lseg' // line segment
  | 'box' // rectangular box
  | 'path' // geometric path
  | 'polygon' // closed geometric path
  | 'circle' // circle

  // Other types
  | 'money' // currency amount
  | 'xml' // XML data
  | 'void'; // void type (for functions returning nothing)

/**
 * Common primitive type constants for convenience
 */
export const PRIMITIVE = {
  INT: 'int' as const,
  INT2: 'int2' as const,
  INT4: 'int4' as const,
  INT8: 'int8' as const,
  FLOAT4: 'float4' as const,
  FLOAT8: 'float8' as const,
  NUMERIC: 'numeric' as const,
  TEXT: 'text' as const,
  VARCHAR: 'varchar' as const,
  CHAR: 'char' as const,
  BOOL: 'bool' as const,
  TIMESTAMP: 'timestamp' as const,
  TIMESTAMPTZ: 'timestamptz' as const,
  DATE: 'date' as const,
  TIME: 'time' as const,
  INTERVAL: 'interval' as const,
  UUID: 'uuid' as const,
  JSON: 'json' as const,
  JSONB: 'jsonb' as const,
  BYTEA: 'bytea' as const,
} as const;
