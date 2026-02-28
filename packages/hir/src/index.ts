export type {
  HirId,
  Hir,
  Name,
  QualifiedName,
  Module,
  Def,
  QueryDef,
  QueryParam,
  QueryBody,
  SelectStmt,
  SelectTarget,
  Expr,
  LiteralValue,
  BinOp,
  UnaryOp,
  TypeExpr,
  DatabaseDef,
  CreateTableStmt,
  ColumnDef,
  TypeName,
  HirNode,
} from "./types.js";

export {
  HirStore,
  type DefinitionId,
  type TypeParamDefinition,
  type QueryParamDefinition,
  type QueryDefinition,
  type Definition,
  type ScopeId,
  type Scope,
} from "./store.js";

export { lowerToHir, lowerAndResolve } from "./lower.js";
export { define } from "./define.js";
export { resolve } from "./resolve.js";
export { printHir } from "./print.js";
export { hirChildren, walkHir } from "./walk.js";
