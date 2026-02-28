import { define } from "./define.js";
import { resolve } from "./resolve.js";
import {
  PGLParserVisitor,
  PGLParser,
  Simple_select_bodyContext,
  Pgl_expr_bodyContext,
  Pgl_dollar_ident_ref_bodyContext,
  Target_labelContext,
  Target_starContext,
  type ProgContext,
  type DefContext,
  type Query_defContext,
  type Query_parameterContext,
  type Query_bodyContext,
  type Simple_selectContext,
  type Target_elContext,
  type A_exprContext,
  type A_expr_orContext,
  type A_expr_andContext,
  type A_expr_betweenContext,
  type A_expr_inContext,
  type A_expr_unary_notContext,
  type A_expr_isnullContext,
  type A_expr_is_notContext,
  type A_expr_compareContext,
  type A_expr_likeContext,
  type A_expr_addContext,
  type A_expr_mulContext,
  type A_expr_unaryContext,
  type C_exprContext,
  type AexprconstContext,
  type Pgl_exprContext,
  type Pgl_ident_refContext,
  type Pgl_query_callContext,
  type Columnref_or_pgl_dollar_ident_refContext,
  type Type_expressionContext,
  type Type_refContext,
  type ColidContext,
  type ColLabelContext,
  type Qualified_nameContext,
  type Database_defContext,
  type CreatestmtContext,
  type ColumnDefContext,
  type TypenameContext,
  type SimpletypenameContext,
  type ParserRuleContext,
  type TerminalNode,
  type RuleNode,
  type ErrorNode,
} from "@pglambda/antlr";
import type { FileUri, Span } from "@pglambda/utils";
import { HirStore } from "./store.js";
import type {
  HirId,
  HirNode,
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
  Name,
  QualifiedName,
} from "./types.js";

function spanFrom(ctx: ParserRuleContext, file: FileUri): Span {
  const start = ctx.start!;
  const stop = ctx.stop ?? start;
  return {
    file,
    start: { line: start.line, column: start.column },
    end: {
      line: stop.line,
      column: stop.column + (stop.text?.length ?? 1),
    },
  };
}

class HirVisitor extends PGLParserVisitor<HirNode | null> {
  constructor(
    private readonly store: HirStore,
    private readonly file: FileUri,
  ) {
    super();
  }

  private id(): HirId {
    return this.store.freshId();
  }

  private span(ctx: ParserRuleContext): Span {
    return spanFrom(ctx, this.file);
  }

  // --- Names ---

  private lowerColid(ctx: ColidContext): Name {
    return {
      id: this.id(),
      tag: "name",
      span: this.span(ctx),
      data: { text: ctx.getText() },
    };
  }

  private lowerColLabel(ctx: ColLabelContext): Name {
    return {
      id: this.id(),
      tag: "name",
      span: this.span(ctx),
      data: { text: ctx.getText() },
    };
  }

  private lowerQualifiedName(ctx: Qualified_nameContext): QualifiedName {
    const parts: Name[] = [this.lowerColid(ctx.colid())];
    const indirection = ctx.indirection();
    if (indirection) {
      for (const el of indirection.indirection_el_list()) {
        const attrName = el.attr_name();
        if (attrName) {
          parts.push(this.lowerColLabel(attrName.colLabel()));
        }
        // STAR in indirection (e.g. schema.*) — skip for now
      }
    }
    return {
      id: this.id(),
      tag: "qualifiedName",
      span: this.span(ctx),
      data: { parts },
    };
  }

  // --- Module ---

  visitProg = (ctx: ProgContext): Module => {
    const defs: Def[] = [];
    for (const defCtx of ctx.def_list()) {
      const def = this.lowerDef(defCtx);
      if (def) defs.push(def);
    }
    return {
      id: this.id(),
      tag: "module",
      span: this.span(ctx),
      data: { defs },
    };
  };

  private lowerDef(ctx: DefContext): Def | null {
    const queryDef = ctx.query_def();
    if (queryDef) return this.lowerQueryDef(queryDef);
    const dbDef = ctx.database_def();
    if (dbDef) return this.lowerDatabaseDef(dbDef);
    return null;
  }

  // --- Query definitions ---

  private lowerQueryDef(ctx: Query_defContext): QueryDef {
    const name = this.lowerColid(ctx.colid());

    const typeParams: Name[] = [];
    const typeParamList = ctx.type_parameter_list();
    if (typeParamList) {
      for (const colid of typeParamList.colid_list()) {
        typeParams.push(this.lowerColid(colid));
      }
    }

    const params: QueryParam[] = [];
    for (const param of ctx.query_parameter_list().query_parameter_list()) {
      params.push(this.lowerQueryParameter(param));
    }

    const body = this.lowerQueryBody(ctx.query_body());

    return {
      id: this.id(),
      tag: "query",
      span: this.span(ctx),
      data: { name, typeParams, params, body },
    };
  }

  private lowerQueryParameter(ctx: Query_parameterContext): QueryParam {
    const name = this.lowerColid(ctx.colid());
    const typeExprCtx = ctx.type_expression();
    const typeAnnotation = typeExprCtx
      ? this.lowerTypeExpression(typeExprCtx)
      : null;
    return {
      id: this.id(),
      tag: "queryParam",
      span: this.span(ctx),
      data: { name, typeAnnotation },
    };
  }

  private lowerQueryBody(ctx: Query_bodyContext): QueryBody {
    if (ctx instanceof Simple_select_bodyContext) {
      return {
        id: this.id(),
        tag: "selectBody",
        span: this.span(ctx),
        data: { stmt: this.lowerSimpleSelect(ctx.simple_select()) },
      };
    }
    if (ctx instanceof Pgl_expr_bodyContext) {
      return {
        id: this.id(),
        tag: "pglExprBody",
        span: this.span(ctx),
        data: { expr: this.lowerPglExpr(ctx.pgl_expr()) },
      };
    }
    if (ctx instanceof Pgl_dollar_ident_ref_bodyContext) {
      return {
        id: this.id(),
        tag: "paramRefBody",
        span: this.span(ctx),
        data: {
          name: this.lowerColumnrefAsName(
            ctx.columnref_or_pgl_dollar_ident_ref(),
          ),
        },
      };
    }
    throw new Error("Unknown query_body alternative");
  }

  // --- SELECT ---

  private lowerSimpleSelect(ctx: Simple_selectContext): SelectStmt {
    const targets: SelectTarget[] = [];
    for (const targetEl of ctx.target_list().target_el_list()) {
      targets.push(this.lowerTargetEl(targetEl));
    }
    return {
      id: this.id(),
      tag: "select",
      span: this.span(ctx),
      data: { targets },
    };
  }

  private lowerTargetEl(ctx: Target_elContext): SelectTarget {
    if (ctx instanceof Target_labelContext) {
      const expr = this.lowerAExpr(ctx.a_expr());
      const colLabelCtx = ctx.colLabel();
      const colidCtx = ctx.colid();
      const alias = colLabelCtx
        ? this.lowerColLabel(colLabelCtx)
        : colidCtx
          ? this.lowerColid(colidCtx)
          : // No explicit alias — synthesize from expression text
            ({
              id: this.id(),
              tag: "name" as const,
              span: this.span(ctx),
              data: { text: ctx.a_expr().getText() },
            });
      return {
        id: this.id(),
        tag: "targetExpr",
        span: this.span(ctx),
        data: { expr, alias },
      };
    }
    if (ctx instanceof Target_starContext) {
      return {
        id: this.id(),
        tag: "targetStar",
        span: this.span(ctx),
        data: {},
      } as SelectTarget;
    }
    throw new Error("Unknown target_el alternative");
  }

  // --- Expressions (flattened) ---

  private lowerAExpr(ctx: A_exprContext): Expr {
    return this.lowerAExprOr(ctx.a_expr_or());
  }

  private lowerAExprOr(ctx: A_expr_orContext): Expr {
    return this.lowerLeftAssoc(
      ctx.a_expr_and_list(),
      (c) => this.lowerAExprAnd(c),
      "OR",
      ctx,
    );
  }

  private lowerAExprAnd(ctx: A_expr_andContext): Expr {
    return this.lowerLeftAssoc(
      ctx.a_expr_between_list(),
      (c) => this.lowerAExprBetween(c),
      "AND",
      ctx,
    );
  }

  private lowerAExprBetween(ctx: A_expr_betweenContext): Expr {
    // BETWEEN not supported as HIR node yet — just pass through
    return this.lowerAExprIn(ctx.a_expr_in(0));
  }

  private lowerAExprIn(ctx: A_expr_inContext): Expr {
    // IN not supported as HIR node yet — just pass through
    return this.lowerAExprUnaryNot(ctx.a_expr_unary_not());
  }

  private lowerAExprUnaryNot(ctx: A_expr_unary_notContext): Expr {
    if (ctx.KW_NOT()) {
      return {
        id: this.id(),
        tag: "unaryOp",
        span: this.span(ctx),
        data: {
          op: "NOT" as UnaryOp,
          operand: this.lowerAExprUnaryNot(ctx.a_expr_unary_not()),
        },
      };
    }
    return this.lowerAExprIsnull(ctx.a_expr_isnull());
  }

  private lowerAExprIsnull(ctx: A_expr_isnullContext): Expr {
    // IS NULL not supported as HIR node yet — pass through
    return this.lowerAExprIsNot(ctx.a_expr_is_not());
  }

  private lowerAExprIsNot(ctx: A_expr_is_notContext): Expr {
    // IS NOT supported as HIR node yet — pass through
    return this.lowerAExprCompare(ctx.a_expr_compare());
  }

  private lowerAExprCompare(ctx: A_expr_compareContext): Expr {
    const children = ctx.a_expr_like_list();
    if (children.length === 1) {
      return this.lowerAExprLike(children[0]);
    }
    // Compare has exactly 2 children with an operator token between them
    const left = this.lowerAExprLike(children[0]);
    const right = this.lowerAExprLike(children[1]);
    const op = this.extractCompareOp(ctx);
    return {
      id: this.id(),
      tag: "binOp",
      span: this.span(ctx),
      data: { op, left, right },
    };
  }

  private extractCompareOp(ctx: A_expr_compareContext): BinOp {
    if (ctx.EQ()) return "=";
    if (ctx.NEQ()) return "<>";
    if (ctx.LT()) return "<";
    if (ctx.GT()) return ">";
    if (ctx.LTE()) return "<=";
    if (ctx.GTE()) return ">=";
    return "="; // fallback
  }

  private lowerAExprLike(ctx: A_expr_likeContext): Expr {
    const children = ctx.a_expr_add_list();
    if (children.length === 1) {
      return this.lowerAExprAdd(children[0]);
    }
    const left = this.lowerAExprAdd(children[0]);
    const right = this.lowerAExprAdd(children[1]);
    return {
      id: this.id(),
      tag: "binOp",
      span: this.span(ctx),
      data: { op: "LIKE" as BinOp, left, right },
    };
  }

  private lowerAExprAdd(ctx: A_expr_addContext): Expr {
    const children = ctx.a_expr_mul_list();
    if (children.length === 1) {
      return this.lowerAExprMul(children[0]);
    }
    // Interleaved: child0 op child1 op child2 ...
    // Operator tokens are PLUS or MINUS between children
    let result = this.lowerAExprMul(children[0]);
    const ops = this.extractInterleavedOps(ctx, [
      PGLParser.PLUS,
      PGLParser.MINUS,
    ]);
    for (let i = 1; i < children.length; i++) {
      const right = this.lowerAExprMul(children[i]);
      result = {
        id: this.id(),
        tag: "binOp",
        span: this.span(ctx),
        data: { op: ops[i - 1], left: result, right },
      };
    }
    return result;
  }

  private lowerAExprMul(ctx: A_expr_mulContext): Expr {
    const children = ctx.a_expr_unary_list();
    if (children.length === 1) {
      return this.lowerAExprUnary(children[0]);
    }
    let result = this.lowerAExprUnary(children[0]);
    const ops = this.extractInterleavedOps(ctx, [
      PGLParser.STAR,
      PGLParser.SLASH,
      PGLParser.PERCENT,
    ]);
    for (let i = 1; i < children.length; i++) {
      const right = this.lowerAExprUnary(children[i]);
      result = {
        id: this.id(),
        tag: "binOp",
        span: this.span(ctx),
        data: { op: ops[i - 1], left: result, right },
      };
    }
    return result;
  }

  private lowerAExprUnary(ctx: A_expr_unaryContext): Expr {
    const inner = this.lowerCExpr(ctx.c_expr());
    if (ctx.PLUS()) {
      return {
        id: this.id(),
        tag: "unaryOp",
        span: this.span(ctx),
        data: { op: "+" as UnaryOp, operand: inner },
      };
    }
    if (ctx.MINUS()) {
      return {
        id: this.id(),
        tag: "unaryOp",
        span: this.span(ctx),
        data: { op: "-" as UnaryOp, operand: inner },
      };
    }
    return inner;
  }

  private lowerCExpr(ctx: C_exprContext): Expr {
    if (ctx.pgl_expr()) return this.lowerPglExpr(ctx.pgl_expr());
    if (ctx.columnref_or_pgl_dollar_ident_ref())
      return this.lowerColumnref(ctx.columnref_or_pgl_dollar_ident_ref());
    if (ctx.aexprconst()) return this.lowerAExprConst(ctx.aexprconst());
    if (ctx.a_expr()) {
      return {
        id: this.id(),
        tag: "paren",
        span: this.span(ctx),
        data: { inner: this.lowerAExpr(ctx.a_expr()) },
      };
    }
    throw new Error("Unknown c_expr alternative");
  }

  // --- Atomic expressions ---

  private lowerAExprConst(ctx: AexprconstContext): Expr {
    let value: LiteralValue;
    if (ctx.INTEGER_LITERAL()) {
      value = { kind: "int", text: ctx.INTEGER_LITERAL().getText() };
    } else if (ctx.NUMERIC_LITERAL()) {
      value = { kind: "numeric", text: ctx.NUMERIC_LITERAL().getText() };
    } else if (ctx.STRING_LITERAL()) {
      value = { kind: "text", text: ctx.STRING_LITERAL().getText() };
    } else if (ctx.KW_TRUE()) {
      value = { kind: "bool", value: true };
    } else if (ctx.KW_FALSE()) {
      value = { kind: "bool", value: false };
    } else if (ctx.KW_NULL()) {
      value = { kind: "null" };
    } else {
      throw new Error("Unknown aexprconst alternative");
    }
    return {
      id: this.id(),
      tag: "literal",
      span: this.span(ctx),
      data: { value },
    };
  }

  // --- PGL expressions ---

  private lowerPglExpr(ctx: Pgl_exprContext): Expr {
    if (ctx.pgl_query_call()) return this.lowerPglQueryCall(ctx.pgl_query_call());
    if (ctx.pgl_ident_ref()) return this.lowerPglIdentRef(ctx.pgl_ident_ref());
    if (ctx.aexprconst()) return this.lowerAExprConst(ctx.aexprconst());
    throw new Error("Unknown pgl_expr alternative");
  }

  private lowerPglIdentRef(ctx: Pgl_ident_refContext): Expr {
    return {
      id: this.id(),
      tag: "pglRef",
      span: this.span(ctx),
      data: { name: this.lowerQualifiedName(ctx.qualified_name()) },
    };
  }

  private lowerPglQueryCall(ctx: Pgl_query_callContext): Expr {
    const name = this.lowerQualifiedName(ctx.qualified_name());
    const typeArgList = ctx.type_argument_list();
    const typeArgs: TypeExpr[] = typeArgList
      ? typeArgList.type_expression_list().map((te) => this.lowerTypeExpression(te))
      : [];
    const args: Expr[] = ctx
      .pgl_expr_list()
      .map((arg) => this.lowerPglExpr(arg));
    return {
      id: this.id(),
      tag: "pglCall",
      span: this.span(ctx),
      data: { name, typeArgs, args },
    };
  }

  // --- Column/param references ---

  private lowerColumnref(
    ctx: Columnref_or_pgl_dollar_ident_refContext,
  ): Expr {
    const colids = ctx.colid_list();
    if (colids.length === 1 && colids[0].getText().startsWith("$")) {
      return {
        id: this.id(),
        tag: "paramRef",
        span: this.span(ctx),
        data: { name: this.lowerColid(colids[0]) },
      };
    }
    // Regular column reference (single or dotted)
    return {
      id: this.id(),
      tag: "columnRef",
      span: this.span(ctx),
      data: { name: this.lowerColid(colids[0]) },
    };
  }

  /** For pgl_dollar_ident_ref_body — extract the name from a columnref */
  private lowerColumnrefAsName(
    ctx: Columnref_or_pgl_dollar_ident_refContext,
  ): Name {
    const colids = ctx.colid_list();
    return this.lowerColid(colids[0]);
  }

  // --- Type expressions ---

  private lowerTypeExpression(ctx: Type_expressionContext): TypeExpr {
    return this.lowerTypeRef(ctx.type_ref());
  }

  private lowerTypeRef(ctx: Type_refContext): TypeExpr {
    const qname = this.lowerQualifiedName(
      ctx.pgl_ident_ref().qualified_name(),
    );
    return {
      id: this.id(),
      tag: "typeExpr",
      span: this.span(ctx),
      data: { name: qname },
    };
  }

  // --- Database / DDL ---

  private lowerDatabaseDef(ctx: Database_defContext): DatabaseDef {
    const statements: CreateTableStmt[] = [];
    for (const ddlStmt of ctx.ddl_statement_list()) {
      statements.push(this.lowerCreateStmt(ddlStmt.createstmt()));
    }
    return {
      id: this.id(),
      tag: "database",
      span: this.span(ctx),
      data: { statements },
    };
  }

  private lowerCreateStmt(ctx: CreatestmtContext): CreateTableStmt {
    const name = this.lowerQualifiedName(ctx.qualified_name());
    const ifNotExists = !!ctx.KW_IF();
    const columns: ColumnDef[] = [];
    const tableElementList = ctx.tableelementlist();
    if (tableElementList) {
      for (const element of tableElementList.tableelement_list()) {
        const colDef = element.columnDef();
        if (colDef) {
          columns.push(this.lowerColumnDef(colDef));
        }
        // tableconstraint — skipped (deferred)
      }
    }
    return {
      id: this.id(),
      tag: "createTable",
      span: this.span(ctx),
      data: { name, ifNotExists, columns },
    };
  }

  private lowerColumnDef(ctx: ColumnDefContext): ColumnDef {
    return {
      id: this.id(),
      tag: "columnDef",
      span: this.span(ctx),
      data: {
        name: this.lowerColid(ctx.colid()),
        typeName: this.lowerTypename(ctx.typename()),
      },
    };
  }

  private lowerTypename(ctx: TypenameContext): TypeName {
    const isSetOf = !!ctx.KW_SETOF();
    const arrayBounds = ctx.opt_array_bounds();
    const arrayDimensions = arrayBounds ? arrayBounds.L_BRACKET_list().length : 0;
    const simpleType = ctx.simpletypename();
    const typeText = this.extractSimpleTypeName(simpleType);
    const typeName: Name = {
      id: this.id(),
      tag: "name",
      span: this.span(simpleType),
      data: { text: typeText },
    };
    return {
      id: this.id(),
      tag: "typeName",
      span: this.span(ctx),
      data: {
        name: {
          id: this.id(),
          tag: "qualifiedName",
          span: this.span(simpleType),
          data: { parts: [typeName] },
        },
        isSetOf,
        arrayDimensions,
      },
    };
  }

  private extractSimpleTypeName(ctx: SimpletypenameContext): string {
    if (ctx.numeric()) return ctx.numeric().getText().toLowerCase();
    if (ctx.character()) return ctx.character().getText().toLowerCase();
    if (ctx.constdatetime()) return ctx.constdatetime().getText().toLowerCase();
    if (ctx.constinterval()) return "interval";
    if (ctx.generictype())
      return ctx.generictype().type_function_name().getText();
    throw new Error("Unknown simpletypename alternative");
  }

  // --- Helpers ---

  /**
   * Build a left-associative binary expression chain from a list of children
   * that all use the same operator (e.g. a_expr_or has OR between all children).
   */
  private lowerLeftAssoc<T extends ParserRuleContext>(
    children: T[],
    lower: (c: T) => Expr,
    op: BinOp,
    parentCtx: ParserRuleContext,
  ): Expr {
    if (children.length === 1) return lower(children[0]);
    let result = lower(children[0]);
    for (let i = 1; i < children.length; i++) {
      result = {
        id: this.id(),
        tag: "binOp",
        span: this.span(parentCtx),
        data: { op, left: result, right: lower(children[i]) },
      };
    }
    return result;
  }

  /**
   * Extract interleaved operator tokens from a context with pattern:
   * child op child op child ...
   * Returns the operator BinOp strings in order.
   */
  private extractInterleavedOps(
    ctx: ParserRuleContext,
    tokenTypes: number[],
  ): BinOp[] {
    const ops: BinOp[] = [];
    const childCount = ctx.getChildCount();
    for (let i = 0; i < childCount; i++) {
      const child = ctx.getChild(i);
      if ("symbol" in child) {
        const token = child as TerminalNode;
        const type = token.symbol.type;
        if (tokenTypes.includes(type)) {
          ops.push(this.tokenToBinOp(type));
        }
      }
    }
    return ops;
  }

  private tokenToBinOp(tokenType: number): BinOp {
    switch (tokenType) {
      case PGLParser.PLUS:
        return "+";
      case PGLParser.MINUS:
        return "-";
      case PGLParser.STAR:
        return "*";
      case PGLParser.SLASH:
        return "/";
      case PGLParser.PERCENT:
        return "%";
      case PGLParser.EQ:
        return "=";
      case PGLParser.NEQ:
        return "<>";
      case PGLParser.LT:
        return "<";
      case PGLParser.GT:
        return ">";
      case PGLParser.LTE:
        return "<=";
      case PGLParser.GTE:
        return ">=";
      default:
        throw new Error(`Unknown operator token type: ${tokenType}`);
    }
  }

  // --- Default visitor methods (required by PGLParserVisitor) ---

  visitTerminal(_node: TerminalNode): HirNode | null {
    return null;
  }

  visitErrorNode(_node: ErrorNode): HirNode | null {
    return null;
  }

  visitChildren(_node: RuleNode): HirNode | null {
    return null;
  }
}

/**
 * Lower a CST parse tree into HIR.
 * Does NOT perform name resolution — that is a separate pass.
 */
export function lowerToHir(
  prog: ProgContext,
  file: FileUri,
): { module: Module; store: HirStore } {
  const store = new HirStore();
  const visitor = new HirVisitor(store, file);
  const module = visitor.visit(prog) as Module;
  return { module, store };
}

/**
 * Lower CST to HIR and perform definition extraction + name resolution.
 * Returns the HIR module and a fully-populated HirStore.
 */
export function lowerAndResolve(
  prog: ProgContext,
  file: FileUri,
): { module: Module; store: HirStore } {
  const { module, store } = lowerToHir(prog, file);
  define(module, store);
  resolve(module, store);
  return { module, store };
}
