// Generated from src/PGLParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


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
import { Pgl_query_callContext } from "./PGLParser.js";
import { Type_argument_listContext } from "./PGLParser.js";
import { ColumnrefContext } from "./PGLParser.js";
import { AexprconstContext } from "./PGLParser.js";
import { Type_defContext } from "./PGLParser.js";
import { Type_expressionContext } from "./PGLParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PGLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class PGLParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `PGLParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.qualified_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualified_name?: (ctx: Qualified_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDef?: (ctx: DefContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.query_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery_def?: (ctx: Query_defContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.type_parameter_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_parameter_list?: (ctx: Type_parameter_listContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.query_parameter_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery_parameter_list?: (ctx: Query_parameter_listContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.query_parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery_parameter?: (ctx: Query_parameterContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.query_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery_body?: (ctx: Query_bodyContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.simple_select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_select?: (ctx: Simple_selectContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.target_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTarget_list?: (ctx: Target_listContext) => Result;
	/**
	 * Visit a parse tree produced by the `target_label`
	 * labeled alternative in `PGLParser.target_el`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTarget_label?: (ctx: Target_labelContext) => Result;
	/**
	 * Visit a parse tree produced by the `target_star`
	 * labeled alternative in `PGLParser.target_el`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTarget_star?: (ctx: Target_starContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.from_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrom_clause?: (ctx: From_clauseContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.from_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrom_list?: (ctx: From_listContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.table_ref`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_ref?: (ctx: Table_refContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.relation_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelation_expr?: (ctx: Relation_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.where_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhere_clause?: (ctx: Where_clauseContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr?: (ctx: A_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_or`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_or?: (ctx: A_expr_orContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_and`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_and?: (ctx: A_expr_andContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_between`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_between?: (ctx: A_expr_betweenContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_in`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_in?: (ctx: A_expr_inContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_unary_not`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_unary_not?: (ctx: A_expr_unary_notContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_isnull`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_isnull?: (ctx: A_expr_isnullContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_is_not`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_is_not?: (ctx: A_expr_is_notContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_compare`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_compare?: (ctx: A_expr_compareContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_like`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_like?: (ctx: A_expr_likeContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_add`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_add?: (ctx: A_expr_addContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_mul`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_mul?: (ctx: A_expr_mulContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.a_expr_unary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitA_expr_unary?: (ctx: A_expr_unaryContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.c_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitC_expr?: (ctx: C_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.pgl_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPgl_expr?: (ctx: Pgl_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.pgl_query_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPgl_query_call?: (ctx: Pgl_query_callContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.type_argument_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_argument_list?: (ctx: Type_argument_listContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.columnref`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnref?: (ctx: ColumnrefContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.aexprconst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAexprconst?: (ctx: AexprconstContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.type_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_def?: (ctx: Type_defContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.type_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_expression?: (ctx: Type_expressionContext) => Result;
}

