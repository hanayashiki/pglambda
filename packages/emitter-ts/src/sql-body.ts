import type {
  QueryBody,
  Expr,
  LiteralValue,
  SelectStmt,
  SelectTarget,
  FromClause,
  TableRef,
  QualifiedName,
  HirStore,
} from "@pglambda/hir";
import { type Doc, text, concat, group, nest, join, line, softline } from "@pglambda/emitter";
import type { ImportTracker } from "./imports.js";
import { snakeToCamel } from "./names.js";

/**
 * Emit a query body as a sql`...` template literal Doc.
 *
 * @param body The HIR query body
 * @param hirStore For resolving names to definitions
 * @param rowParams Set of parameter names that are row params (get raw())
 * @param tracker Import tracker — records which runtime symbols are used
 */
export function emitSqlBody(
  body: QueryBody,
  hirStore: HirStore,
  rowParams: ReadonlySet<string>,
  tracker: ImportTracker,
): Doc {
  tracker.useValue("sql");

  switch (body.tag) {
    case "selectBody": {
      const sqlContent = emitSelect(body.data.stmt, hirStore, rowParams, tracker);
      return group(concat(
        text("sql`"),
        nest(2, concat(softline, sqlContent)),
        softline,
        text("`.build()"),
      ));
    }

    case "pglExprBody":
      return concat(
        text("sql`"),
        emitExpr(body.data.expr, hirStore, rowParams, tracker),
        text("`"),
      );

    case "paramRefBody": {
      // Body is just a parameter reference: { $name }
      const name = body.data.name.data.text;
      if (rowParams.has(name)) {
        tracker.useValue("raw");
        return concat(text("sql`${raw("), text(name), text(")}`"));
      }
      tracker.useValue("param");
      return concat(text("sql`${param("), text(name), text(")}`"));
    }
  }
}

function emitSelect(
  stmt: SelectStmt,
  hirStore: HirStore,
  rowParams: ReadonlySet<string>,
  tracker: ImportTracker,
): Doc {
  const targetDocs = stmt.data.targets.map((t) =>
    emitTarget(t, hirStore, rowParams, tracker),
  );
  const selectClause = concat(
    text("SELECT "),
    join(text(", "), targetDocs),
  );

  const clauses: Doc[] = [selectClause];
  if (stmt.data.from) clauses.push(emitFrom(stmt.data.from));
  if (stmt.data.where)
    clauses.push(concat(text("WHERE "), emitExpr(stmt.data.where, hirStore, rowParams, tracker)));

  return join(line, clauses);
}

function emitTarget(
  target: SelectTarget,
  hirStore: HirStore,
  rowParams: ReadonlySet<string>,
  tracker: ImportTracker,
): Doc {
  switch (target.tag) {
    case "targetStar":
      return text("*");
    case "targetExpr": {
      const expr = emitExpr(target.data.expr, hirStore, rowParams, tracker);
      const alias = target.data.alias.data.text;
      // Omit AS when expression is a simple column matching the alias
      if (target.data.expr.tag === "columnRef") {
        const parts = target.data.expr.data.name.data.parts;
        if (parts.length === 1 && parts[0].data.text === alias) {
          return expr;
        }
      }
      return concat(expr, text(" AS "), text(alias));
    }
  }
}

function emitFrom(from: FromClause): Doc {
  const refs = from.data.refs.map(emitTableRef);
  return concat(text("FROM "), join(text(", "), refs));
}

function emitTableRef(ref: TableRef): Doc {
  const name = qualifiedNameToSql(ref.data.name);
  if (ref.data.alias) {
    return concat(text(name), text(" AS "), text(ref.data.alias.data.text));
  }
  return text(name);
}

function qualifiedNameToSql(qn: QualifiedName): string {
  return qn.data.parts.map((p) => p.data.text).join(".");
}

function emitExpr(
  expr: Expr,
  hirStore: HirStore,
  rowParams: ReadonlySet<string>,
  tracker: ImportTracker,
): Doc {
  switch (expr.tag) {
    case "literal":
      return emitLiteral(expr.data.value);

    case "columnRef": {
      const parts = expr.data.name.data.parts;
      // Check if the first part resolves to a row param
      if (parts.length >= 2) {
        const tablePart = parts[0].data.text;
        if (rowParams.has(tablePart)) {
          // Row param: ${raw(user)}.column
          tracker.useValue("raw");
          const col = parts.slice(1).map((p) => p.data.text).join(".");
          return concat(
            text("${raw("),
            text(tablePart),
            text(")}"),
            text("." + col),
          );
        }
      }
      // Regular column ref: literal SQL
      return text(qualifiedNameToSql(expr.data.name));
    }

    case "paramRef": {
      const name = expr.data.name.data.text;
      tracker.useValue("param");
      return concat(text("${param("), text(name), text(")}"));
    }

    case "pglCall": {
      const fnName = snakeToCamel(
        expr.data.name.data.parts.map((p) => p.data.text).join("_"),
      );
      const args = expr.data.args.map((a) =>
        emitCallArg(a, hirStore, rowParams, tracker),
      );
      return concat(
        text("${"),
        text(fnName),
        text("("),
        join(text(", "), args),
        text(")}"),
      );
    }

    case "pglRef":
      return text(qualifiedNameToSql(expr.data.name));

    case "binOp":
      return concat(
        emitExpr(expr.data.left, hirStore, rowParams, tracker),
        text(` ${expr.data.op} `),
        emitExpr(expr.data.right, hirStore, rowParams, tracker),
      );

    case "unaryOp":
      if (expr.data.op === "NOT") {
        return concat(text("NOT "), emitExpr(expr.data.operand, hirStore, rowParams, tracker));
      }
      return concat(text(expr.data.op), emitExpr(expr.data.operand, hirStore, rowParams, tracker));

    case "paren":
      return concat(
        text("("),
        emitExpr(expr.data.inner, hirStore, rowParams, tracker),
        text(")"),
      );
  }
}

/** Emit a PGL call argument as a TS expression (outside the sql template). */
function emitCallArg(
  arg: Expr,
  hirStore: HirStore,
  rowParams: ReadonlySet<string>,
  tracker: ImportTracker,
): Doc {
  switch (arg.tag) {
    case "paramRef":
      // $id → just the variable name
      return text(arg.data.name.data.text);

    case "columnRef": {
      // table reference in call context → string literal
      const name = qualifiedNameToSql(arg.data.name);
      return text(`"${name}"`);
    }

    default:
      // For complex expressions in call args, emit them recursively
      return emitExpr(arg, hirStore, rowParams, tracker);
  }
}

function emitLiteral(v: LiteralValue): Doc {
  switch (v.kind) {
    case "int":
    case "numeric":
      return text(v.text);
    case "text":
      // FIXME: does not handle text with newline or other special chars correctly
      // Should use E'' instead
      return text(`'${v.text.replaceAll("'", "''")}'`);
    case "bool":
      return text(v.value ? "TRUE" : "FALSE");
    case "null":
      return text("NULL");
  }
}
