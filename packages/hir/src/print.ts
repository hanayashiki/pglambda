import type {
  HirNode,
  Expr,
  SelectTarget,
  FromClause,
  TableRef,
  QueryBody,
  QueryParam,
  LiteralValue,
  TypeExpr,
  TypeName,
  SimpleTypeName,
  QualifiedName,
  Name,
  ColumnDef,
  CreateTableStmt,
} from "./types.js";

export function printHir(node: HirNode): string {
  return printNode(node, 0);
}

function ind(depth: number): string {
  return "  ".repeat(depth);
}

function printNode(node: HirNode, indent: number): string {
  switch (node.tag) {
    case "module":
      return node.data.defs.map((d) => printNode(d, indent)).join("\n\n");

    case "query":
      return printQuery(node.data, indent);

    case "queryParam":
      return printQueryParam(node.data);

    case "selectBody":
    case "pglExprBody":
    case "paramRefBody":
      return printBody(node, indent);

    case "select": {
      const targets = node.data.targets.map((t) => printTarget(t)).join(", ");
      const from = node.data.from ? ` ${printFrom(node.data.from)}` : "";
      const where = node.data.where ? ` where ${printExpr(node.data.where)}` : "";
      return `select ${targets}${from}${where}`;
    }

    case "fromClause":
      return printFrom(node);

    case "tableRef":
      return printTableRef(node);

    case "targetExpr":
      return `${printExpr(node.data.expr)} as ${printName(node.data.alias)}`;

    case "targetStar":
      return "*";

    case "literal":
      return printLiteral(node.data.value);

    case "columnRef":
      return printQualifiedName(node.data.name);

    case "paramRef":
      return "$" + printName(node.data.name);

    case "pglRef":
      return printQualifiedName(node.data.name);

    case "pglCall":
      return printPglCall(node.data);

    case "binOp":
      return `(${printExpr(node.data.left)} ${node.data.op} ${printExpr(node.data.right)})`;

    case "unaryOp":
      return node.data.op === "NOT"
        ? `(NOT ${printExpr(node.data.operand)})`
        : `(${node.data.op}${printExpr(node.data.operand)})`;

    case "paren":
      return `(${printExpr(node.data.inner)})`;

    case "typeExpr":
      return printQualifiedName(node.data.name);

    case "database": {
      const stmts = node.data.statements
        .map((s) => `${printNode(s, indent + 1)};`)
        .join("\n\n");
      return `${ind(indent)}database {\n${stmts}\n${ind(indent)}}`;
    }

    case "createTable":
      return printCreateTable(node, indent);

    case "columnDef":
      return printColumnDef(node as ColumnDef);

    case "typeName":
      return printTypeName(node as TypeName);

    case "name":
      return printName(node as Name);

    case "qualifiedName":
      return printQualifiedName(node as QualifiedName);
  }
}

function printName(n: Name): string {
  return n.data.text;
}

function printQualifiedName(qn: QualifiedName): string {
  return qn.data.parts.map((p) => p.data.text).join(".");
}

function printQuery(
  data: {
    name: Name;
    typeParams: Name[];
    params: QueryParam[];
    body: QueryBody;
  },
  indent: number,
): string {
  const name = printName(data.name);
  const typeParams =
    data.typeParams.length > 0
      ? `<${data.typeParams.map((t) => t.data.text).join(", ")}>`
      : "";
  const params = `(${data.params.map((p) => printQueryParam(p.data)).join(", ")})`;
  const body = printBody(data.body, indent + 1);
  return `${ind(indent)}query ${name}${typeParams}${params} {\n${ind(indent + 1)}${body}\n${ind(indent)}}`;
}

function printQueryParam(data: {
  name: Name;
  typeAnnotation: TypeExpr | null;
}): string {
  const name = printName(data.name);
  if (data.typeAnnotation) {
    return `${name}: ${printQualifiedName(data.typeAnnotation.data.name)}`;
  }
  return name;
}

function printBody(body: QueryBody, indent: number): string {
  switch (body.tag) {
    case "selectBody":
      return printNode(body.data.stmt, indent);
    case "pglExprBody":
      return printExpr(body.data.expr);
    case "paramRefBody":
      return "$" + printName(body.data.name);
  }
}

function printFrom(from: FromClause): string {
  return `from ${from.data.refs.map((r) => printTableRef(r)).join(", ")}`;
}

function printTableRef(ref: TableRef): string {
  const name = printQualifiedName(ref.data.name);
  return ref.data.alias ? `${name} as ${printName(ref.data.alias)}` : name;
}

function printTarget(t: SelectTarget): string {
  switch (t.tag) {
    case "targetExpr":
      return `${printExpr(t.data.expr)} as ${printName(t.data.alias)}`;
    case "targetStar":
      return "*";
  }
}

function printExpr(e: Expr): string {
  switch (e.tag) {
    case "literal":
      return printLiteral(e.data.value);
    case "columnRef":
      return printQualifiedName(e.data.name);
    case "paramRef":
      return "$" + printName(e.data.name);
    case "pglRef":
      return printQualifiedName(e.data.name);
    case "pglCall":
      return printPglCall(e.data);
    case "binOp":
      return `(${printExpr(e.data.left)} ${e.data.op} ${printExpr(e.data.right)})`;
    case "unaryOp":
      return e.data.op === "NOT"
        ? `(NOT ${printExpr(e.data.operand)})`
        : `(${e.data.op}${printExpr(e.data.operand)})`;
    case "paren":
      return `(${printExpr(e.data.inner)})`;
  }
}

function printLiteral(v: LiteralValue): string {
  switch (v.kind) {
    case "int":
    case "numeric":
      return v.text;
    case "text":
      return v.text;
    case "bool":
      return v.value ? "true" : "false";
    case "null":
      return "null";
  }
}

function printPglCall(data: {
  name: QualifiedName;
  typeArgs: TypeExpr[];
  args: Expr[];
}): string {
  const name = printQualifiedName(data.name);
  const typeArgs =
    data.typeArgs.length > 0
      ? `::<${data.typeArgs.map((t) => printQualifiedName(t.data.name)).join(", ")}>`
      : "";
  const args = data.args.map((a) => printExpr(a)).join(", ");
  return `${name}${typeArgs}(${args})`;
}

function printTypeName(tn: TypeName): string {
  const prefix = tn.data.isSetOf ? "setof " : "";
  const name = printSimpleTypeName(tn.data.simpleType);
  const arrays = "[]".repeat(tn.data.arrayDimensions);
  return `${prefix}${name}${arrays}`;
}

function printSimpleTypeName(st: SimpleTypeName): string {
  switch (st.kind) {
    case "numeric": {
      const base = st.base === "double" ? "double precision" : st.base;
      const params =
        st.precision !== null
          ? st.scale !== null
            ? `(${st.precision}, ${st.scale})`
            : `(${st.precision})`
          : "";
      return `${base}${params}`;
    }
    case "character": {
      const base = st.varying ? "varchar" : "char";
      return st.length !== null ? `${base}(${st.length})` : base;
    }
    case "datetime": {
      const prec = st.precision !== null ? `(${st.precision})` : "";
      const tz =
        st.timezone === "with"
          ? " with time zone"
          : st.timezone === "without"
            ? " without time zone"
            : "";
      return `${st.base}${prec}${tz}`;
    }
    case "interval":
      return "interval";
    case "named":
      return st.params.length > 0
        ? `${st.name}(${st.params.join(", ")})`
        : st.name;
  }
}

function printColumnDef(col: ColumnDef): string {
  const parts = [printName(col.data.name), printTypeName(col.data.typeName)];
  const c = col.data.constraints;
  if (c.primaryKey) parts.push("primary key");
  else if (c.notNull) parts.push("not null");
  if (c.unique && !c.primaryKey) parts.push("unique");
  if (c.defaultExpr) parts.push(`default ${printExpr(c.defaultExpr)}`);
  return parts.join(" ");
}

function printCreateTable({ data }: CreateTableStmt, indent: number): string {
  const name = printQualifiedName(data.name);
  const cols = data.columns
    .map((c) => `${ind(indent + 1)}${printColumnDef(c)}`)
    .join(",\n");
  return `${ind(indent)}create table ${name} (\n${cols}\n${ind(indent)})`;
}
