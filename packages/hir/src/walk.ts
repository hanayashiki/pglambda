import type { HirNode } from "./types.js";

/**
 * Return the direct HIR children of a node.
 */
export function hirChildren(node: HirNode): HirNode[] {
  switch (node.tag) {
    // --- Names ---
    case "name":
      return [];
    case "qualifiedName":
      return node.data.parts;

    // --- Module ---
    case "module":
      return node.data.defs;

    // --- Query definitions ---
    case "query":
      return [node.data.name, ...node.data.typeParams, ...node.data.params, node.data.body];
    case "queryParam":
      return node.data.typeAnnotation
        ? [node.data.name, node.data.typeAnnotation]
        : [node.data.name];

    // --- Query body ---
    case "selectBody":
      return [node.data.stmt];
    case "pglExprBody":
      return [node.data.expr];
    case "paramRefBody":
      return [node.data.name];

    // --- SELECT ---
    case "select": {
      const children: HirNode[] = [...node.data.targets];
      if (node.data.from) children.push(node.data.from);
      if (node.data.where) children.push(node.data.where);
      return children;
    }
    case "targetExpr":
      return [node.data.expr, node.data.alias];
    case "targetStar":
      return [];

    // --- FROM ---
    case "fromClause":
      return node.data.refs;
    case "tableRef":
      return node.data.alias ? [node.data.name, node.data.alias] : [node.data.name];

    // --- Expressions ---
    case "literal":
      return [];
    case "columnRef":
      return [node.data.name];
    case "paramRef":
      return [node.data.name];
    case "pglRef":
      return [node.data.name];
    case "pglCall":
      return [node.data.name, ...node.data.typeArgs, ...node.data.args];
    case "binOp":
      return [node.data.left, node.data.right];
    case "unaryOp":
      return [node.data.operand];
    case "paren":
      return [node.data.inner];

    // --- Type expressions ---
    case "typeExpr":
      return [node.data.name];

    // --- Database / DDL ---
    case "database":
      return node.data.statements;
    case "createTable":
      return [node.data.name, ...node.data.columns];
    case "columnDef": {
      const children: HirNode[] = [node.data.name, node.data.typeName];
      if (node.data.constraints.defaultExpr) children.push(node.data.constraints.defaultExpr);
      return children;
    }
    case "typeName":
      return [];
  }
}

/**
 * Walk a HIR tree depth-first, calling `visit` on each node.
 * If `visit` returns `false`, children are skipped.
 */
export function walkHir(node: HirNode, visit: (node: HirNode) => void | false): void {
  if (visit(node) === false) return;
  for (const child of hirChildren(node)) {
    walkHir(child, visit);
  }
}
