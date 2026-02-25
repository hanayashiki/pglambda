import {
  Target_labelContext,
  PGLParserVisitor,
  type ParserRuleContext,
  type IdentifierContext,
  type Qualified_nameContext,
  type ProgContext,
  type DefContext,
  type Query_defContext,
  type Query_parameter_listContext,
  type Query_parameterContext,
  type Query_bodyContext,
  type Simple_selectContext,
  type Target_listContext,
  type Target_starContext,
  type From_clauseContext,
  type From_listContext,
  type Table_refContext,
  type Relation_exprContext,
  type Where_clauseContext,
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
  type Columnref_or_pgl_dollar_ident_refContext,
  type AexprconstContext,
  type Type_defContext,
  type Type_expressionContext,
  type Type_parameter_listContext,
  type Pgl_exprContext,
  type Pgl_ident_refContext,
  type Pgl_query_callContext,
  type Type_argument_listContext,
  type Type_refContext,
  RuleNode,
} from "@pglambda/antlr";
import type {
  PrimitiveName,
  Type,
  TypeStore,
  TypeSchemeId,
} from "@pglambda/types";
import type { CheckContext } from "./check-context.js";

export class Checker
  extends PGLParserVisitor<Type>
  implements Required<PGLParserVisitor<Type>>
{
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

  visitChildren(_: RuleNode): never {
    throw new Error(`every syntax rule must be explictly handled.`);
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

  // --- Expression visitors (passthrough) ---

  visitA_expr = (ctx: A_exprContext): Type => this.visit(ctx.a_expr_or());

  visitA_expr_between = (ctx: A_expr_betweenContext): Type => {
    if (ctx.KW_BETWEEN()) {
      return this.typeStore.error("BETWEEN expressions not supported yet");
    }
    return this.visit(ctx.a_expr_in(0));
  };

  visitA_expr_in = (ctx: A_expr_inContext): Type => {
    if (ctx.KW_IN()) {
      return this.typeStore.error("IN expressions not supported yet");
    }
    return this.visit(ctx.a_expr_unary_not());
  };

  visitA_expr_isnull = (ctx: A_expr_isnullContext): Type => {
    if (ctx.KW_IS()) {
      return this.typeStore.error("IS NULL expressions not supported yet");
    }
    return this.visit(ctx.a_expr_is_not());
  };

  visitA_expr_is_not = (ctx: A_expr_is_notContext): Type => {
    if (ctx.KW_IS()) {
      return this.typeStore.error("IS NOT expressions not supported yet");
    }
    return this.visit(ctx.a_expr_compare());
  };

  visitA_expr_unary = (ctx: A_expr_unaryContext): Type => {
    if (ctx.PLUS() || ctx.MINUS()) {
      return this.typeStore.error("Unary +/- expressions not supported yet");
    }
    return this.visit(ctx.c_expr());
  };

  visitC_expr = (ctx: C_exprContext): Type => {
    if (ctx.pgl_expr()) return this.visit(ctx.pgl_expr());
    if (ctx.columnref_or_pgl_dollar_ident_ref())
      return this.visit(ctx.columnref_or_pgl_dollar_ident_ref());
    if (ctx.aexprconst()) return this.visit(ctx.aexprconst());
    if (ctx.a_expr()) return this.visit(ctx.a_expr());
    return this.typeStore.error("Unknown c_expr");
  };

  visitPgl_expr = (ctx: Pgl_exprContext): Type => {
    if (ctx.pgl_query_call()) return this.visit(ctx.pgl_query_call());
    if (ctx.pgl_ident_ref()) return this.visit(ctx.pgl_ident_ref());
    return this.typeStore.error("Unknown pgl_expr");
  };

  visitPgl_ident_ref = (ctx: Pgl_ident_refContext): Type =>
    this.ctx.getOrInsert(ctx.contentHash, () => {
      const qname = ctx.qualified_name();
      const idents = qname.identifier_list();
      if (idents.length !== 1) {
        throw new Error("Module-qualified references not implemented");
      }
      const defId = this.ctx.astStore.getResolution(idents[0].contentHash);
      if (!defId) return this.typeStore.error("Unresolved reference");
      const defType = this.ctx.getOrCreateTypeVar(defId);
      // Propagate type to qualified_name and identifier for marker resolution
      this.ctx.getOrInsert(qname.contentHash, () => defType);
      this.ctx.getOrInsert(idents[0].contentHash, () => defType);
      return defType;
    });

  visitPgl_query_call = (_ctx: Pgl_query_callContext): Type =>
    this.typeStore.error("PGL query calls not supported yet");

  visitType_argument_list = (_ctx: Type_argument_listContext): Type =>
    this.typeStore.error("Type argument lists not supported yet");

  visitColumnref_or_pgl_dollar_ident_ref = (
    ctx: Columnref_or_pgl_dollar_ident_refContext,
  ): Type =>
    this.ctx.getOrInsert(ctx.contentHash, () => {
      const idents = ctx.identifier_list();
      if (idents.length !== 1) {
        return this.typeStore.error("Column references not supported yet");
      }
      const text = idents[0].getText();
      if (!text.startsWith("$")) {
        return this.typeStore.error("Column references not supported yet");
      }
      const defId = this.ctx.astStore.getResolution(idents[0].contentHash);
      if (!defId) return this.typeStore.error("Unresolved reference");
      const defType = this.ctx.getOrCreateTypeVar(defId);
      this.ctx.getOrInsert(idents[0].contentHash, () => defType);
      return defType;
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

      return this.ctx.setOf(this.typeStore.record(fields));
    });

  // --- Program structure visitors ---

  visitProg = (ctx: ProgContext): Type => {
    for (const def of ctx.def_list()) {
      this.visit(def);
    }
    return this.typeStore.error("prog");
  };

  visitDef = (ctx: DefContext): Type => {
    const queryDef = ctx.query_def();
    if (queryDef) return this.visit(queryDef);
    const typeDef = ctx.type_def();
    if (typeDef) return this.visit(typeDef);
    return this.typeStore.error("Unknown def");
  };

  visitQuery_def = (ctx: Query_defContext): Type =>
    this.ctx.getOrInsert(ctx.contentHash, () => {
      const typeParamList = ctx.type_parameter_list();
      if (typeParamList) {
        const schemeId = this.typeStore.schemes.freshId();
        this.checkTypeParameterList(typeParamList, schemeId);
      }
      this.visit(ctx.query_parameter_list());
      return this.visit(ctx.query_body());
    });

  private checkTypeParameterList(
    ctx: Type_parameter_listContext,
    schemeId: TypeSchemeId,
  ): void {
    const idents = ctx.identifier_list();
    const names = idents.map((id) => id.getText());
    // FIXME: Per 03_TYPE_CHECKER.md, trivial SCCs should skip Phase 1 and
    // construct the scheme from the body's result type after Phase 2.
    // Non-trivial SCCs need Phase 1 to pre-build schemes from explicit
    // annotations before checking bodies. Currently we always register a
    // placeholder scheme here.
    this.typeStore.schemes.register({
      id: schemeId,
      name: "",
      parameters: names,
      body: this.typeStore.error("unresolved scheme body"),
    });
    for (let i = 0; i < idents.length; i++) {
      const tv = this.ctx.getOrCreateTypeVar(idents[i].contentHash);
      this.ctx.addEquality({ t1: tv, t2: this.typeStore.param(schemeId, i) });
    }
  }

  visitType_parameter_list = (_ctx: Type_parameter_listContext): Type =>
    this.typeStore.error("type_parameter_list");

  visitQuery_parameter_list = (ctx: Query_parameter_listContext): Type => {
    for (const param of ctx.query_parameter_list()) {
      this.visit(param);
    }
    return this.typeStore.error("query_parameter_list");
  };

  visitQuery_parameter = (ctx: Query_parameterContext): Type =>
    this.ctx.getOrInsert(ctx.contentHash, () => {
      const typeExpr = ctx.type_expression();
      if (typeExpr) return this.visit(typeExpr);
      return this.typeStore.typevar();
    });

  visitQuery_body = (ctx: Query_bodyContext): Type =>
    this.visit(ctx.simple_select());

  // --- Target visitors ---

  visitTarget_list = (ctx: Target_listContext): Type => {
    for (const el of ctx.target_el_list()) {
      this.visit(el);
    }
    return this.typeStore.error("target_list");
  };

  visitTarget_label = (ctx: Target_labelContext): Type =>
    this.visit(ctx.a_expr());

  visitTarget_star = (_ctx: Target_starContext): Type =>
    this.typeStore.error("SELECT * not supported yet");

  // --- FROM / WHERE visitors ---

  visitFrom_clause = (ctx: From_clauseContext): Type =>
    this.visit(ctx.from_list());

  visitFrom_list = (ctx: From_listContext): Type => {
    for (const ref of ctx.table_ref_list()) {
      this.visit(ref);
    }
    return this.typeStore.error("from_list");
  };

  visitTable_ref = (ctx: Table_refContext): Type =>
    this.visit(ctx.relation_expr());

  visitRelation_expr = (ctx: Relation_exprContext): Type =>
    this.visit(ctx.qualified_name());

  visitWhere_clause = (ctx: Where_clauseContext): Type =>
    this.visit(ctx.a_expr());

  // --- Atomic / type visitors ---

  visitIdentifier = (_ctx: IdentifierContext): Type =>
    this.typeStore.error("identifier");

  visitQualified_name = (ctx: Qualified_nameContext): Type => {
    for (const id of ctx.identifier_list()) {
      this.visit(id);
    }
    return this.typeStore.error("qualified_name");
  };

  visitType_def = (_ctx: Type_defContext): Type =>
    this.typeStore.error("Type definitions not supported yet");

  visitType_expression = (ctx: Type_expressionContext): Type =>
    this.visit(ctx.type_ref());

  visitType_ref = (ctx: Type_refContext): Type =>
    this.ctx.getOrInsert(ctx.contentHash, () => {
      const pglRef = ctx.pgl_ident_ref();
      const qname = pglRef.qualified_name();
      const idents = qname.identifier_list();
      if (idents.length !== 1) {
        return this.typeStore.error("Qualified type names not supported yet");
      }
      let type: Type;
      const defId = this.ctx.astStore.getResolution(idents[0].contentHash);
      if (defId) {
        type = this.ctx.getOrCreateTypeVar(defId);
      } else {
        // Not resolved — treat as primitive type name
        type = this.typeStore.primitive(idents[0].getText() as PrimitiveName);
      }
      // Propagate type to inner nodes for marker resolution
      this.ctx.getOrInsert(pglRef.contentHash, () => type);
      this.ctx.getOrInsert(qname.contentHash, () => type);
      this.ctx.getOrInsert(idents[0].contentHash, () => type);
      return type;
    });
}
