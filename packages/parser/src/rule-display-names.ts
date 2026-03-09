import type { PGLRuleName } from "@pglambda/antlr";

const RULE_DISPLAY_NAMES: Partial<Record<PGLRuleName, string>> = {
  colid: "identifier",
  qualified_name: "qualified name",
  // expression precedence chain
  a_expr: "expression",
  a_expr_or: "expression",
  a_expr_and: "expression",
  a_expr_between: "expression",
  a_expr_in: "expression",
  a_expr_unary_not: "expression",
  a_expr_isnull: "expression",
  a_expr_is_not: "expression",
  a_expr_compare: "expression",
  a_expr_like: "expression",
  a_expr_add: "expression",
  a_expr_mul: "expression",
  a_expr_unary: "expression",
  c_expr: "expression",
  // SQL constructs
  simple_select: "SELECT statement",
  query_body: "query body",
  query_def: "query definition",
  type_def: "type definition",
  database_def: "database definition",
  table_ref: "table reference",
  from_clause: "FROM clause",
  where_clause: "WHERE clause",
  target_list: "select list",
  aexprconst: "literal",
  typename: "type name",
};

export function displayRuleName(name: string): string {
  return RULE_DISPLAY_NAMES[name as PGLRuleName] ?? name;
}
