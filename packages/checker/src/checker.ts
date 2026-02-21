import {
  Target_labelContext,
  PGLParserVisitor,
  type ParserRuleContext,
  type AexprconstContext,
  type A_expr_orContext,
  type A_expr_andContext,
  type A_expr_compareContext,
  type A_expr_likeContext,
  type A_expr_addContext,
  type A_expr_mulContext,
  type A_expr_unary_notContext,
  type Simple_selectContext,
} from "@pglambda/antlr";
import type { Type, TypeStore } from "@pglambda/types";
import type { CheckContext } from "./check-context.js";

export class Checker extends PGLParserVisitor<Type> {
  typeStore: TypeStore;

  constructor(private ctx: CheckContext) {
    super();

    this.typeStore = ctx.typeStore;
  }

  /** Reusable handler for binary precedence nodes with a *_list() accessor. */
  private binaryOrPassthrough<T extends ParserRuleContext>(
    children: T[],
    errorMsg: string,
  ): Type {
    if (children.length === 1) {
      return this.visit(children[0]);
    }
    return this.typeStore.error(errorMsg);
  }

  // --- Expression visitors (binary-or-passthrough) ---

  visitA_expr_or = (ctx: A_expr_orContext): Type =>
    this.binaryOrPassthrough(
      ctx.a_expr_and_list(),
      "OR expressions not supported yet",
    );

  visitA_expr_and = (ctx: A_expr_andContext): Type =>
    this.binaryOrPassthrough(
      ctx.a_expr_between_list(),
      "AND expressions not supported yet",
    );

  visitA_expr_compare = (ctx: A_expr_compareContext): Type =>
    this.binaryOrPassthrough(
      ctx.a_expr_like_list(),
      "Comparison expressions not supported yet",
    );

  visitA_expr_like = (ctx: A_expr_likeContext): Type =>
    this.binaryOrPassthrough(
      ctx.a_expr_add_list(),
      "LIKE expressions not supported yet",
    );

  visitA_expr_add = (ctx: A_expr_addContext): Type =>
    this.binaryOrPassthrough(
      ctx.a_expr_mul_list(),
      "Arithmetic expressions not supported yet",
    );

  visitA_expr_mul = (ctx: A_expr_mulContext): Type =>
    this.binaryOrPassthrough(
      ctx.a_expr_unary_list(),
      "Multiplication expressions not supported yet",
    );

  // --- Special expression visitors ---

  visitA_expr_unary_not = (ctx: A_expr_unary_notContext): Type => {
    if (ctx.KW_NOT()) {
      return this.typeStore.error("NOT expressions not supported yet");
    }
    return this.visit(ctx.a_expr_isnull());
  };

  visitAexprconst = (ctx: AexprconstContext): Type =>
    this.ctx.getOrInsert(ctx.contentHash, () => {
      if (ctx.INTEGER_LITERAL()) {
        return this.typeStore.primitive("int");
      }
      if (ctx.NUMERIC_LITERAL()) {
        return this.typeStore.primitive("numeric");
      }
      if (ctx.STRING_LITERAL()) {
        return this.typeStore.primitive("text");
      }
      if (ctx.KW_TRUE() || ctx.KW_FALSE()) {
        return this.typeStore.primitive("bool");
      }
      if (ctx.KW_NULL()) {
        return this.typeStore.nullable(this.typeStore.typevar());
      }
      return this.typeStore.error("Unknown constant type");
    });

  // --- Statement visitors ---

  visitSimple_select = (ctx: Simple_selectContext): Type =>
    this.ctx.getOrInsert(ctx.contentHash, () => {
      const fields: Record<string, Type> = {};

      for (const targetEl of ctx.target_list().target_el_list()) {
        if (targetEl instanceof Target_labelContext) {
          const exprType = this.visit(targetEl.a_expr());

          const alias = targetEl.identifier();
          if (!alias) {
            this.ctx.addError("Target expression requires an alias");
            continue;
          }

          const aliasName = alias.getText();
          if (aliasName in fields) {
            this.ctx.addError(`Duplicate column alias: ${aliasName}`);
            continue;
          }

          const fieldType = this.typeStore.typevar();
          this.ctx.addEquality({ t1: fieldType, t2: exprType });
          fields[aliasName] = fieldType;
        } else {
          this.ctx.addError("SELECT * is not supported yet (no schema)");
        }
      }

      return this.typeStore.array(this.typeStore.record(fields)); // TODO: use set type
    });
}
