import type { Span } from "@pglambda/utils";

// --- Base & Identity (like Def<Tag, Data> in parser/definitions.ts) ---

export type HirId = number & { readonly __brand: "HirId" };

export type Hir<Tag extends string, Data> = {
  readonly id: HirId;
  readonly tag: Tag;
  readonly span: Span;
  readonly data: Data;
};

// --- Names ---

export type Name = Hir<
  "name",
  {
    text: string;
  }
>;

/** Arbitrary-depth dotted name: colid (.attr_name)* — pg supports catalog.schema.name */
export type QualifiedName = Hir<
  "qualifiedName",
  {
    parts: Name[];
  }
>;

// --- Module (top-level container) ---

export type Module = Hir<"module", { defs: Def[] }>;

export type Def = QueryDef | DatabaseDef;

// --- Query definitions ---

export type QueryDef = Hir<
  "query",
  {
    name: Name;
    typeParams: Name[];
    params: QueryParam[];
    body: QueryBody;
  }
>;

export type QueryParam = Hir<
  "queryParam",
  {
    name: Name;
    typeAnnotation: TypeExpr | null;
  }
>;

export type QueryBody =
  | Hir<"selectBody", { stmt: SelectStmt }>
  | Hir<"pglExprBody", { expr: Expr }>
  | Hir<"paramRefBody", { name: Name }>;

// --- SELECT ---

export type SelectStmt = Hir<"select", { targets: SelectTarget[] }>;

export type SelectTarget =
  | Hir<"targetExpr", { expr: Expr; alias: Name }>
  | Hir<"targetStar", Record<string, never>>;

// --- Expressions (flattened from 12-level CST precedence chain) ---

export type Expr =
  | Hir<"literal", { value: LiteralValue }>
  | Hir<"columnRef", { name: Name }>
  | Hir<"paramRef", { name: Name }>
  | Hir<"pglRef", { name: QualifiedName }>
  | Hir<"pglCall", { name: QualifiedName; typeArgs: TypeExpr[]; args: Expr[] }>
  | Hir<"binOp", { op: BinOp; left: Expr; right: Expr }>
  | Hir<"unaryOp", { op: UnaryOp; operand: Expr }>
  | Hir<"paren", { inner: Expr }>;

export type LiteralValue =
  | { kind: "int"; text: string }
  | { kind: "numeric"; text: string }
  | { kind: "text"; text: string }
  | { kind: "bool"; value: boolean }
  | { kind: "null" };

// Lowering maps token.type (PGLLexer.PLUS, etc.) → BinOp during CST→HIR
export type BinOp =
  | "="
  | "<>"
  | "<"
  | ">"
  | "<="
  | ">="
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "||"
  | "AND"
  | "OR"
  | "LIKE"
  | "ILIKE";

export type UnaryOp = "NOT" | "+" | "-";

// --- Type expressions (annotations like `: text`) ---

export type TypeExpr = Hir<"typeExpr", { name: QualifiedName }>;

// --- Database / DDL ---

export type DatabaseDef = Hir<
  "database",
  {
    statements: CreateTableStmt[];
  }
>;

export type CreateTableStmt = Hir<
  "createTable",
  {
    name: QualifiedName;
    ifNotExists: boolean;
    columns: ColumnDef[];
  }
>;

export type ColumnDef = Hir<
  "columnDef",
  {
    name: Name;
    typeName: TypeName;
  }
>;

export type TypeName = Hir<
  "typeName",
  {
    name: QualifiedName;
    isSetOf: boolean;
    arrayDimensions: number;
  }
>;

// --- HirNode (discriminated union of all HIR node types) ---

export type HirNode =
  | Name
  | QualifiedName
  | Module
  | QueryDef
  | QueryParam
  | QueryBody
  | SelectStmt
  | SelectTarget
  | Expr
  | TypeExpr
  | DatabaseDef
  | CreateTableStmt
  | ColumnDef
  | TypeName;
