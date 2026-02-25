// Generated from src/PGLParser.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { IdentifierContext } from "./PGLParser.js";
import { Qualified_nameContext } from "./PGLParser.js";
import { ProgContext } from "./PGLParser.js";
import { DefContext } from "./PGLParser.js";
import { Query_defContext } from "./PGLParser.js";
import { Type_parameter_listContext } from "./PGLParser.js";
import { Query_parameter_listContext } from "./PGLParser.js";
import { Query_parameterContext } from "./PGLParser.js";
import { Query_bodyContext } from "./PGLParser.js";
import { Simple_selectContext } from "./PGLParser.js";
import { Target_listContext } from "./PGLParser.js";
import { Target_labelContext } from "./PGLParser.js";
import { Target_starContext } from "./PGLParser.js";
import { From_clauseContext } from "./PGLParser.js";
import { From_listContext } from "./PGLParser.js";
import { Table_refContext } from "./PGLParser.js";
import { Relation_exprContext } from "./PGLParser.js";
import { Where_clauseContext } from "./PGLParser.js";
import { A_exprContext } from "./PGLParser.js";
import { A_expr_orContext } from "./PGLParser.js";
import { A_expr_andContext } from "./PGLParser.js";
import { A_expr_betweenContext } from "./PGLParser.js";
import { A_expr_inContext } from "./PGLParser.js";
import { A_expr_unary_notContext } from "./PGLParser.js";
import { A_expr_isnullContext } from "./PGLParser.js";
import { A_expr_is_notContext } from "./PGLParser.js";
import { A_expr_compareContext } from "./PGLParser.js";
import { A_expr_likeContext } from "./PGLParser.js";
import { A_expr_addContext } from "./PGLParser.js";
import { A_expr_mulContext } from "./PGLParser.js";
import { A_expr_unaryContext } from "./PGLParser.js";
import { C_exprContext } from "./PGLParser.js";
import { Pgl_exprContext } from "./PGLParser.js";
import { Pgl_ident_refContext } from "./PGLParser.js";
import { Pgl_query_callContext } from "./PGLParser.js";
import { Type_argument_listContext } from "./PGLParser.js";
import { Columnref_or_pgl_dollar_ident_refContext } from "./PGLParser.js";
import { AexprconstContext } from "./PGLParser.js";
import { Type_defContext } from "./PGLParser.js";
import { Type_expressionContext } from "./PGLParser.js";
import { Type_refContext } from "./PGLParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `PGLParser`.
 */
export default class PGLParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `PGLParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.qualified_name`.
	 * @param ctx the parse tree
	 */
	enterQualified_name?: (ctx: Qualified_nameContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.qualified_name`.
	 * @param ctx the parse tree
	 */
	exitQualified_name?: (ctx: Qualified_nameContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.prog`.
	 * @param ctx the parse tree
	 */
	enterProg?: (ctx: ProgContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.prog`.
	 * @param ctx the parse tree
	 */
	exitProg?: (ctx: ProgContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.def`.
	 * @param ctx the parse tree
	 */
	enterDef?: (ctx: DefContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.def`.
	 * @param ctx the parse tree
	 */
	exitDef?: (ctx: DefContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.query_def`.
	 * @param ctx the parse tree
	 */
	enterQuery_def?: (ctx: Query_defContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.query_def`.
	 * @param ctx the parse tree
	 */
	exitQuery_def?: (ctx: Query_defContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.type_parameter_list`.
	 * @param ctx the parse tree
	 */
	enterType_parameter_list?: (ctx: Type_parameter_listContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.type_parameter_list`.
	 * @param ctx the parse tree
	 */
	exitType_parameter_list?: (ctx: Type_parameter_listContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.query_parameter_list`.
	 * @param ctx the parse tree
	 */
	enterQuery_parameter_list?: (ctx: Query_parameter_listContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.query_parameter_list`.
	 * @param ctx the parse tree
	 */
	exitQuery_parameter_list?: (ctx: Query_parameter_listContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.query_parameter`.
	 * @param ctx the parse tree
	 */
	enterQuery_parameter?: (ctx: Query_parameterContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.query_parameter`.
	 * @param ctx the parse tree
	 */
	exitQuery_parameter?: (ctx: Query_parameterContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	enterQuery_body?: (ctx: Query_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	exitQuery_body?: (ctx: Query_bodyContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.simple_select`.
	 * @param ctx the parse tree
	 */
	enterSimple_select?: (ctx: Simple_selectContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.simple_select`.
	 * @param ctx the parse tree
	 */
	exitSimple_select?: (ctx: Simple_selectContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.target_list`.
	 * @param ctx the parse tree
	 */
	enterTarget_list?: (ctx: Target_listContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.target_list`.
	 * @param ctx the parse tree
	 */
	exitTarget_list?: (ctx: Target_listContext) => void;
	/**
	 * Enter a parse tree produced by the `target_label`
	 * labeled alternative in `PGLParser.target_el`.
	 * @param ctx the parse tree
	 */
	enterTarget_label?: (ctx: Target_labelContext) => void;
	/**
	 * Exit a parse tree produced by the `target_label`
	 * labeled alternative in `PGLParser.target_el`.
	 * @param ctx the parse tree
	 */
	exitTarget_label?: (ctx: Target_labelContext) => void;
	/**
	 * Enter a parse tree produced by the `target_star`
	 * labeled alternative in `PGLParser.target_el`.
	 * @param ctx the parse tree
	 */
	enterTarget_star?: (ctx: Target_starContext) => void;
	/**
	 * Exit a parse tree produced by the `target_star`
	 * labeled alternative in `PGLParser.target_el`.
	 * @param ctx the parse tree
	 */
	exitTarget_star?: (ctx: Target_starContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.from_clause`.
	 * @param ctx the parse tree
	 */
	enterFrom_clause?: (ctx: From_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.from_clause`.
	 * @param ctx the parse tree
	 */
	exitFrom_clause?: (ctx: From_clauseContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.from_list`.
	 * @param ctx the parse tree
	 */
	enterFrom_list?: (ctx: From_listContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.from_list`.
	 * @param ctx the parse tree
	 */
	exitFrom_list?: (ctx: From_listContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.table_ref`.
	 * @param ctx the parse tree
	 */
	enterTable_ref?: (ctx: Table_refContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.table_ref`.
	 * @param ctx the parse tree
	 */
	exitTable_ref?: (ctx: Table_refContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.relation_expr`.
	 * @param ctx the parse tree
	 */
	enterRelation_expr?: (ctx: Relation_exprContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.relation_expr`.
	 * @param ctx the parse tree
	 */
	exitRelation_expr?: (ctx: Relation_exprContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.where_clause`.
	 * @param ctx the parse tree
	 */
	enterWhere_clause?: (ctx: Where_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.where_clause`.
	 * @param ctx the parse tree
	 */
	exitWhere_clause?: (ctx: Where_clauseContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr`.
	 * @param ctx the parse tree
	 */
	enterA_expr?: (ctx: A_exprContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr`.
	 * @param ctx the parse tree
	 */
	exitA_expr?: (ctx: A_exprContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_or`.
	 * @param ctx the parse tree
	 */
	enterA_expr_or?: (ctx: A_expr_orContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_or`.
	 * @param ctx the parse tree
	 */
	exitA_expr_or?: (ctx: A_expr_orContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_and`.
	 * @param ctx the parse tree
	 */
	enterA_expr_and?: (ctx: A_expr_andContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_and`.
	 * @param ctx the parse tree
	 */
	exitA_expr_and?: (ctx: A_expr_andContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_between`.
	 * @param ctx the parse tree
	 */
	enterA_expr_between?: (ctx: A_expr_betweenContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_between`.
	 * @param ctx the parse tree
	 */
	exitA_expr_between?: (ctx: A_expr_betweenContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_in`.
	 * @param ctx the parse tree
	 */
	enterA_expr_in?: (ctx: A_expr_inContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_in`.
	 * @param ctx the parse tree
	 */
	exitA_expr_in?: (ctx: A_expr_inContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_unary_not`.
	 * @param ctx the parse tree
	 */
	enterA_expr_unary_not?: (ctx: A_expr_unary_notContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_unary_not`.
	 * @param ctx the parse tree
	 */
	exitA_expr_unary_not?: (ctx: A_expr_unary_notContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_isnull`.
	 * @param ctx the parse tree
	 */
	enterA_expr_isnull?: (ctx: A_expr_isnullContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_isnull`.
	 * @param ctx the parse tree
	 */
	exitA_expr_isnull?: (ctx: A_expr_isnullContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_is_not`.
	 * @param ctx the parse tree
	 */
	enterA_expr_is_not?: (ctx: A_expr_is_notContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_is_not`.
	 * @param ctx the parse tree
	 */
	exitA_expr_is_not?: (ctx: A_expr_is_notContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_compare`.
	 * @param ctx the parse tree
	 */
	enterA_expr_compare?: (ctx: A_expr_compareContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_compare`.
	 * @param ctx the parse tree
	 */
	exitA_expr_compare?: (ctx: A_expr_compareContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_like`.
	 * @param ctx the parse tree
	 */
	enterA_expr_like?: (ctx: A_expr_likeContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_like`.
	 * @param ctx the parse tree
	 */
	exitA_expr_like?: (ctx: A_expr_likeContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_add`.
	 * @param ctx the parse tree
	 */
	enterA_expr_add?: (ctx: A_expr_addContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_add`.
	 * @param ctx the parse tree
	 */
	exitA_expr_add?: (ctx: A_expr_addContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_mul`.
	 * @param ctx the parse tree
	 */
	enterA_expr_mul?: (ctx: A_expr_mulContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_mul`.
	 * @param ctx the parse tree
	 */
	exitA_expr_mul?: (ctx: A_expr_mulContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.a_expr_unary`.
	 * @param ctx the parse tree
	 */
	enterA_expr_unary?: (ctx: A_expr_unaryContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.a_expr_unary`.
	 * @param ctx the parse tree
	 */
	exitA_expr_unary?: (ctx: A_expr_unaryContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.c_expr`.
	 * @param ctx the parse tree
	 */
	enterC_expr?: (ctx: C_exprContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.c_expr`.
	 * @param ctx the parse tree
	 */
	exitC_expr?: (ctx: C_exprContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.pgl_expr`.
	 * @param ctx the parse tree
	 */
	enterPgl_expr?: (ctx: Pgl_exprContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.pgl_expr`.
	 * @param ctx the parse tree
	 */
	exitPgl_expr?: (ctx: Pgl_exprContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.pgl_ident_ref`.
	 * @param ctx the parse tree
	 */
	enterPgl_ident_ref?: (ctx: Pgl_ident_refContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.pgl_ident_ref`.
	 * @param ctx the parse tree
	 */
	exitPgl_ident_ref?: (ctx: Pgl_ident_refContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.pgl_query_call`.
	 * @param ctx the parse tree
	 */
	enterPgl_query_call?: (ctx: Pgl_query_callContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.pgl_query_call`.
	 * @param ctx the parse tree
	 */
	exitPgl_query_call?: (ctx: Pgl_query_callContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.type_argument_list`.
	 * @param ctx the parse tree
	 */
	enterType_argument_list?: (ctx: Type_argument_listContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.type_argument_list`.
	 * @param ctx the parse tree
	 */
	exitType_argument_list?: (ctx: Type_argument_listContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.columnref_or_pgl_dollar_ident_ref`.
	 * @param ctx the parse tree
	 */
	enterColumnref_or_pgl_dollar_ident_ref?: (ctx: Columnref_or_pgl_dollar_ident_refContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.columnref_or_pgl_dollar_ident_ref`.
	 * @param ctx the parse tree
	 */
	exitColumnref_or_pgl_dollar_ident_ref?: (ctx: Columnref_or_pgl_dollar_ident_refContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.aexprconst`.
	 * @param ctx the parse tree
	 */
	enterAexprconst?: (ctx: AexprconstContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.aexprconst`.
	 * @param ctx the parse tree
	 */
	exitAexprconst?: (ctx: AexprconstContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.type_def`.
	 * @param ctx the parse tree
	 */
	enterType_def?: (ctx: Type_defContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.type_def`.
	 * @param ctx the parse tree
	 */
	exitType_def?: (ctx: Type_defContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.type_expression`.
	 * @param ctx the parse tree
	 */
	enterType_expression?: (ctx: Type_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.type_expression`.
	 * @param ctx the parse tree
	 */
	exitType_expression?: (ctx: Type_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.type_ref`.
	 * @param ctx the parse tree
	 */
	enterType_ref?: (ctx: Type_refContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.type_ref`.
	 * @param ctx the parse tree
	 */
	exitType_ref?: (ctx: Type_refContext) => void;
}

