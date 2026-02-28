// Generated from src/PGLParser.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { Unreserved_keywordContext } from "./PGLParser.js";
import { Col_name_keywordContext } from "./PGLParser.js";
import { Type_func_name_keywordContext } from "./PGLParser.js";
import { Reserved_keywordContext } from "./PGLParser.js";
import { IdentifierContext } from "./PGLParser.js";
import { ColidContext } from "./PGLParser.js";
import { Type_function_nameContext } from "./PGLParser.js";
import { ColLabelContext } from "./PGLParser.js";
import { Qualified_nameContext } from "./PGLParser.js";
import { IndirectionContext } from "./PGLParser.js";
import { Indirection_elContext } from "./PGLParser.js";
import { Attr_nameContext } from "./PGLParser.js";
import { ProgContext } from "./PGLParser.js";
import { DefContext } from "./PGLParser.js";
import { Query_defContext } from "./PGLParser.js";
import { Type_parameter_listContext } from "./PGLParser.js";
import { Query_parameter_listContext } from "./PGLParser.js";
import { Query_parameterContext } from "./PGLParser.js";
import { Simple_select_bodyContext } from "./PGLParser.js";
import { Pgl_expr_bodyContext } from "./PGLParser.js";
import { Pgl_dollar_ident_ref_bodyContext } from "./PGLParser.js";
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
import { Database_defContext } from "./PGLParser.js";
import { Ddl_statementContext } from "./PGLParser.js";
import { CreatestmtContext } from "./PGLParser.js";
import { OpttempContext } from "./PGLParser.js";
import { OptinheritContext } from "./PGLParser.js";
import { Qualified_name_listContext } from "./PGLParser.js";
import { OptpartitionspecContext } from "./PGLParser.js";
import { Part_paramsContext } from "./PGLParser.js";
import { Part_elemContext } from "./PGLParser.js";
import { Table_access_method_clauseContext } from "./PGLParser.js";
import { OptwithContext } from "./PGLParser.js";
import { ReloptionsContext } from "./PGLParser.js";
import { Reloption_elemContext } from "./PGLParser.js";
import { OncommitoptionContext } from "./PGLParser.js";
import { OpttablespaceContext } from "./PGLParser.js";
import { TableelementlistContext } from "./PGLParser.js";
import { TableelementContext } from "./PGLParser.js";
import { ColumnDefContext } from "./PGLParser.js";
import { ColquallistContext } from "./PGLParser.js";
import { ColconstraintContext } from "./PGLParser.js";
import { Col_not_nullContext } from "./PGLParser.js";
import { Col_nullContext } from "./PGLParser.js";
import { Col_primary_keyContext } from "./PGLParser.js";
import { Col_uniqueContext } from "./PGLParser.js";
import { Col_checkContext } from "./PGLParser.js";
import { Col_defaultContext } from "./PGLParser.js";
import { Col_referencesContext } from "./PGLParser.js";
import { TableconstraintContext } from "./PGLParser.js";
import { Tbl_checkContext } from "./PGLParser.js";
import { Tbl_uniqueContext } from "./PGLParser.js";
import { Tbl_primary_keyContext } from "./PGLParser.js";
import { Tbl_foreign_keyContext } from "./PGLParser.js";
import { ColumnlistContext } from "./PGLParser.js";
import { ColumnElemContext } from "./PGLParser.js";
import { Key_matchContext } from "./PGLParser.js";
import { Key_actionsContext } from "./PGLParser.js";
import { Key_updateContext } from "./PGLParser.js";
import { Key_deleteContext } from "./PGLParser.js";
import { Key_actionContext } from "./PGLParser.js";
import { TypenameContext } from "./PGLParser.js";
import { Opt_array_boundsContext } from "./PGLParser.js";
import { SimpletypenameContext } from "./PGLParser.js";
import { NumericContext } from "./PGLParser.js";
import { CharacterContext } from "./PGLParser.js";
import { ConstdatetimeContext } from "./PGLParser.js";
import { Timezone_Context } from "./PGLParser.js";
import { ConstintervalContext } from "./PGLParser.js";
import { GenerictypeContext } from "./PGLParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `PGLParser`.
 */
export default class PGLParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `PGLParser.unreserved_keyword`.
	 * @param ctx the parse tree
	 */
	enterUnreserved_keyword?: (ctx: Unreserved_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.unreserved_keyword`.
	 * @param ctx the parse tree
	 */
	exitUnreserved_keyword?: (ctx: Unreserved_keywordContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.col_name_keyword`.
	 * @param ctx the parse tree
	 */
	enterCol_name_keyword?: (ctx: Col_name_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.col_name_keyword`.
	 * @param ctx the parse tree
	 */
	exitCol_name_keyword?: (ctx: Col_name_keywordContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.type_func_name_keyword`.
	 * @param ctx the parse tree
	 */
	enterType_func_name_keyword?: (ctx: Type_func_name_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.type_func_name_keyword`.
	 * @param ctx the parse tree
	 */
	exitType_func_name_keyword?: (ctx: Type_func_name_keywordContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.reserved_keyword`.
	 * @param ctx the parse tree
	 */
	enterReserved_keyword?: (ctx: Reserved_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.reserved_keyword`.
	 * @param ctx the parse tree
	 */
	exitReserved_keyword?: (ctx: Reserved_keywordContext) => void;
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
	 * Enter a parse tree produced by `PGLParser.colid`.
	 * @param ctx the parse tree
	 */
	enterColid?: (ctx: ColidContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.colid`.
	 * @param ctx the parse tree
	 */
	exitColid?: (ctx: ColidContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.type_function_name`.
	 * @param ctx the parse tree
	 */
	enterType_function_name?: (ctx: Type_function_nameContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.type_function_name`.
	 * @param ctx the parse tree
	 */
	exitType_function_name?: (ctx: Type_function_nameContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.colLabel`.
	 * @param ctx the parse tree
	 */
	enterColLabel?: (ctx: ColLabelContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.colLabel`.
	 * @param ctx the parse tree
	 */
	exitColLabel?: (ctx: ColLabelContext) => void;
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
	 * Enter a parse tree produced by `PGLParser.indirection`.
	 * @param ctx the parse tree
	 */
	enterIndirection?: (ctx: IndirectionContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.indirection`.
	 * @param ctx the parse tree
	 */
	exitIndirection?: (ctx: IndirectionContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.indirection_el`.
	 * @param ctx the parse tree
	 */
	enterIndirection_el?: (ctx: Indirection_elContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.indirection_el`.
	 * @param ctx the parse tree
	 */
	exitIndirection_el?: (ctx: Indirection_elContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.attr_name`.
	 * @param ctx the parse tree
	 */
	enterAttr_name?: (ctx: Attr_nameContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.attr_name`.
	 * @param ctx the parse tree
	 */
	exitAttr_name?: (ctx: Attr_nameContext) => void;
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
	 * Enter a parse tree produced by the `simple_select_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	enterSimple_select_body?: (ctx: Simple_select_bodyContext) => void;
	/**
	 * Exit a parse tree produced by the `simple_select_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	exitSimple_select_body?: (ctx: Simple_select_bodyContext) => void;
	/**
	 * Enter a parse tree produced by the `pgl_expr_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	enterPgl_expr_body?: (ctx: Pgl_expr_bodyContext) => void;
	/**
	 * Exit a parse tree produced by the `pgl_expr_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	exitPgl_expr_body?: (ctx: Pgl_expr_bodyContext) => void;
	/**
	 * Enter a parse tree produced by the `pgl_dollar_ident_ref_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	enterPgl_dollar_ident_ref_body?: (ctx: Pgl_dollar_ident_ref_bodyContext) => void;
	/**
	 * Exit a parse tree produced by the `pgl_dollar_ident_ref_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 */
	exitPgl_dollar_ident_ref_body?: (ctx: Pgl_dollar_ident_ref_bodyContext) => void;
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
	/**
	 * Enter a parse tree produced by `PGLParser.database_def`.
	 * @param ctx the parse tree
	 */
	enterDatabase_def?: (ctx: Database_defContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.database_def`.
	 * @param ctx the parse tree
	 */
	exitDatabase_def?: (ctx: Database_defContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.ddl_statement`.
	 * @param ctx the parse tree
	 */
	enterDdl_statement?: (ctx: Ddl_statementContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.ddl_statement`.
	 * @param ctx the parse tree
	 */
	exitDdl_statement?: (ctx: Ddl_statementContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.createstmt`.
	 * @param ctx the parse tree
	 */
	enterCreatestmt?: (ctx: CreatestmtContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.createstmt`.
	 * @param ctx the parse tree
	 */
	exitCreatestmt?: (ctx: CreatestmtContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.opttemp`.
	 * @param ctx the parse tree
	 */
	enterOpttemp?: (ctx: OpttempContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.opttemp`.
	 * @param ctx the parse tree
	 */
	exitOpttemp?: (ctx: OpttempContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.optinherit`.
	 * @param ctx the parse tree
	 */
	enterOptinherit?: (ctx: OptinheritContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.optinherit`.
	 * @param ctx the parse tree
	 */
	exitOptinherit?: (ctx: OptinheritContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.qualified_name_list`.
	 * @param ctx the parse tree
	 */
	enterQualified_name_list?: (ctx: Qualified_name_listContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.qualified_name_list`.
	 * @param ctx the parse tree
	 */
	exitQualified_name_list?: (ctx: Qualified_name_listContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.optpartitionspec`.
	 * @param ctx the parse tree
	 */
	enterOptpartitionspec?: (ctx: OptpartitionspecContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.optpartitionspec`.
	 * @param ctx the parse tree
	 */
	exitOptpartitionspec?: (ctx: OptpartitionspecContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.part_params`.
	 * @param ctx the parse tree
	 */
	enterPart_params?: (ctx: Part_paramsContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.part_params`.
	 * @param ctx the parse tree
	 */
	exitPart_params?: (ctx: Part_paramsContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.part_elem`.
	 * @param ctx the parse tree
	 */
	enterPart_elem?: (ctx: Part_elemContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.part_elem`.
	 * @param ctx the parse tree
	 */
	exitPart_elem?: (ctx: Part_elemContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.table_access_method_clause`.
	 * @param ctx the parse tree
	 */
	enterTable_access_method_clause?: (ctx: Table_access_method_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.table_access_method_clause`.
	 * @param ctx the parse tree
	 */
	exitTable_access_method_clause?: (ctx: Table_access_method_clauseContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.optwith`.
	 * @param ctx the parse tree
	 */
	enterOptwith?: (ctx: OptwithContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.optwith`.
	 * @param ctx the parse tree
	 */
	exitOptwith?: (ctx: OptwithContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.reloptions`.
	 * @param ctx the parse tree
	 */
	enterReloptions?: (ctx: ReloptionsContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.reloptions`.
	 * @param ctx the parse tree
	 */
	exitReloptions?: (ctx: ReloptionsContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.reloption_elem`.
	 * @param ctx the parse tree
	 */
	enterReloption_elem?: (ctx: Reloption_elemContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.reloption_elem`.
	 * @param ctx the parse tree
	 */
	exitReloption_elem?: (ctx: Reloption_elemContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.oncommitoption`.
	 * @param ctx the parse tree
	 */
	enterOncommitoption?: (ctx: OncommitoptionContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.oncommitoption`.
	 * @param ctx the parse tree
	 */
	exitOncommitoption?: (ctx: OncommitoptionContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.opttablespace`.
	 * @param ctx the parse tree
	 */
	enterOpttablespace?: (ctx: OpttablespaceContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.opttablespace`.
	 * @param ctx the parse tree
	 */
	exitOpttablespace?: (ctx: OpttablespaceContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.tableelementlist`.
	 * @param ctx the parse tree
	 */
	enterTableelementlist?: (ctx: TableelementlistContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.tableelementlist`.
	 * @param ctx the parse tree
	 */
	exitTableelementlist?: (ctx: TableelementlistContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.tableelement`.
	 * @param ctx the parse tree
	 */
	enterTableelement?: (ctx: TableelementContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.tableelement`.
	 * @param ctx the parse tree
	 */
	exitTableelement?: (ctx: TableelementContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.columnDef`.
	 * @param ctx the parse tree
	 */
	enterColumnDef?: (ctx: ColumnDefContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.columnDef`.
	 * @param ctx the parse tree
	 */
	exitColumnDef?: (ctx: ColumnDefContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.colquallist`.
	 * @param ctx the parse tree
	 */
	enterColquallist?: (ctx: ColquallistContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.colquallist`.
	 * @param ctx the parse tree
	 */
	exitColquallist?: (ctx: ColquallistContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.colconstraint`.
	 * @param ctx the parse tree
	 */
	enterColconstraint?: (ctx: ColconstraintContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.colconstraint`.
	 * @param ctx the parse tree
	 */
	exitColconstraint?: (ctx: ColconstraintContext) => void;
	/**
	 * Enter a parse tree produced by the `col_not_null`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	enterCol_not_null?: (ctx: Col_not_nullContext) => void;
	/**
	 * Exit a parse tree produced by the `col_not_null`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	exitCol_not_null?: (ctx: Col_not_nullContext) => void;
	/**
	 * Enter a parse tree produced by the `col_null`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	enterCol_null?: (ctx: Col_nullContext) => void;
	/**
	 * Exit a parse tree produced by the `col_null`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	exitCol_null?: (ctx: Col_nullContext) => void;
	/**
	 * Enter a parse tree produced by the `col_primary_key`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	enterCol_primary_key?: (ctx: Col_primary_keyContext) => void;
	/**
	 * Exit a parse tree produced by the `col_primary_key`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	exitCol_primary_key?: (ctx: Col_primary_keyContext) => void;
	/**
	 * Enter a parse tree produced by the `col_unique`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	enterCol_unique?: (ctx: Col_uniqueContext) => void;
	/**
	 * Exit a parse tree produced by the `col_unique`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	exitCol_unique?: (ctx: Col_uniqueContext) => void;
	/**
	 * Enter a parse tree produced by the `col_check`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	enterCol_check?: (ctx: Col_checkContext) => void;
	/**
	 * Exit a parse tree produced by the `col_check`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	exitCol_check?: (ctx: Col_checkContext) => void;
	/**
	 * Enter a parse tree produced by the `col_default`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	enterCol_default?: (ctx: Col_defaultContext) => void;
	/**
	 * Exit a parse tree produced by the `col_default`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	exitCol_default?: (ctx: Col_defaultContext) => void;
	/**
	 * Enter a parse tree produced by the `col_references`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	enterCol_references?: (ctx: Col_referencesContext) => void;
	/**
	 * Exit a parse tree produced by the `col_references`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 */
	exitCol_references?: (ctx: Col_referencesContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.tableconstraint`.
	 * @param ctx the parse tree
	 */
	enterTableconstraint?: (ctx: TableconstraintContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.tableconstraint`.
	 * @param ctx the parse tree
	 */
	exitTableconstraint?: (ctx: TableconstraintContext) => void;
	/**
	 * Enter a parse tree produced by the `tbl_check`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	enterTbl_check?: (ctx: Tbl_checkContext) => void;
	/**
	 * Exit a parse tree produced by the `tbl_check`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	exitTbl_check?: (ctx: Tbl_checkContext) => void;
	/**
	 * Enter a parse tree produced by the `tbl_unique`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	enterTbl_unique?: (ctx: Tbl_uniqueContext) => void;
	/**
	 * Exit a parse tree produced by the `tbl_unique`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	exitTbl_unique?: (ctx: Tbl_uniqueContext) => void;
	/**
	 * Enter a parse tree produced by the `tbl_primary_key`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	enterTbl_primary_key?: (ctx: Tbl_primary_keyContext) => void;
	/**
	 * Exit a parse tree produced by the `tbl_primary_key`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	exitTbl_primary_key?: (ctx: Tbl_primary_keyContext) => void;
	/**
	 * Enter a parse tree produced by the `tbl_foreign_key`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	enterTbl_foreign_key?: (ctx: Tbl_foreign_keyContext) => void;
	/**
	 * Exit a parse tree produced by the `tbl_foreign_key`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 */
	exitTbl_foreign_key?: (ctx: Tbl_foreign_keyContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.columnlist`.
	 * @param ctx the parse tree
	 */
	enterColumnlist?: (ctx: ColumnlistContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.columnlist`.
	 * @param ctx the parse tree
	 */
	exitColumnlist?: (ctx: ColumnlistContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.columnElem`.
	 * @param ctx the parse tree
	 */
	enterColumnElem?: (ctx: ColumnElemContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.columnElem`.
	 * @param ctx the parse tree
	 */
	exitColumnElem?: (ctx: ColumnElemContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.key_match`.
	 * @param ctx the parse tree
	 */
	enterKey_match?: (ctx: Key_matchContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.key_match`.
	 * @param ctx the parse tree
	 */
	exitKey_match?: (ctx: Key_matchContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.key_actions`.
	 * @param ctx the parse tree
	 */
	enterKey_actions?: (ctx: Key_actionsContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.key_actions`.
	 * @param ctx the parse tree
	 */
	exitKey_actions?: (ctx: Key_actionsContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.key_update`.
	 * @param ctx the parse tree
	 */
	enterKey_update?: (ctx: Key_updateContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.key_update`.
	 * @param ctx the parse tree
	 */
	exitKey_update?: (ctx: Key_updateContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.key_delete`.
	 * @param ctx the parse tree
	 */
	enterKey_delete?: (ctx: Key_deleteContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.key_delete`.
	 * @param ctx the parse tree
	 */
	exitKey_delete?: (ctx: Key_deleteContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.key_action`.
	 * @param ctx the parse tree
	 */
	enterKey_action?: (ctx: Key_actionContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.key_action`.
	 * @param ctx the parse tree
	 */
	exitKey_action?: (ctx: Key_actionContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.typename`.
	 * @param ctx the parse tree
	 */
	enterTypename?: (ctx: TypenameContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.typename`.
	 * @param ctx the parse tree
	 */
	exitTypename?: (ctx: TypenameContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.opt_array_bounds`.
	 * @param ctx the parse tree
	 */
	enterOpt_array_bounds?: (ctx: Opt_array_boundsContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.opt_array_bounds`.
	 * @param ctx the parse tree
	 */
	exitOpt_array_bounds?: (ctx: Opt_array_boundsContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.simpletypename`.
	 * @param ctx the parse tree
	 */
	enterSimpletypename?: (ctx: SimpletypenameContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.simpletypename`.
	 * @param ctx the parse tree
	 */
	exitSimpletypename?: (ctx: SimpletypenameContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.numeric`.
	 * @param ctx the parse tree
	 */
	enterNumeric?: (ctx: NumericContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.numeric`.
	 * @param ctx the parse tree
	 */
	exitNumeric?: (ctx: NumericContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.character`.
	 * @param ctx the parse tree
	 */
	enterCharacter?: (ctx: CharacterContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.character`.
	 * @param ctx the parse tree
	 */
	exitCharacter?: (ctx: CharacterContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.constdatetime`.
	 * @param ctx the parse tree
	 */
	enterConstdatetime?: (ctx: ConstdatetimeContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.constdatetime`.
	 * @param ctx the parse tree
	 */
	exitConstdatetime?: (ctx: ConstdatetimeContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.timezone_`.
	 * @param ctx the parse tree
	 */
	enterTimezone_?: (ctx: Timezone_Context) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.timezone_`.
	 * @param ctx the parse tree
	 */
	exitTimezone_?: (ctx: Timezone_Context) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.constinterval`.
	 * @param ctx the parse tree
	 */
	enterConstinterval?: (ctx: ConstintervalContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.constinterval`.
	 * @param ctx the parse tree
	 */
	exitConstinterval?: (ctx: ConstintervalContext) => void;
	/**
	 * Enter a parse tree produced by `PGLParser.generictype`.
	 * @param ctx the parse tree
	 */
	enterGenerictype?: (ctx: GenerictypeContext) => void;
	/**
	 * Exit a parse tree produced by `PGLParser.generictype`.
	 * @param ctx the parse tree
	 */
	exitGenerictype?: (ctx: GenerictypeContext) => void;
}

