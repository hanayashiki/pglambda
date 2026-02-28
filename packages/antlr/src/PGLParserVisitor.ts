// Generated from src/PGLParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PGLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class PGLParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `PGLParser.unreserved_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnreserved_keyword?: (ctx: Unreserved_keywordContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.col_name_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_name_keyword?: (ctx: Col_name_keywordContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.type_func_name_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_func_name_keyword?: (ctx: Type_func_name_keywordContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.reserved_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReserved_keyword?: (ctx: Reserved_keywordContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.colid`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColid?: (ctx: ColidContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.type_function_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_function_name?: (ctx: Type_function_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.colLabel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColLabel?: (ctx: ColLabelContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.qualified_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualified_name?: (ctx: Qualified_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.indirection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndirection?: (ctx: IndirectionContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.indirection_el`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndirection_el?: (ctx: Indirection_elContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.attr_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_name?: (ctx: Attr_nameContext) => Result;
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
	 * Visit a parse tree produced by the `simple_select_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_select_body?: (ctx: Simple_select_bodyContext) => Result;
	/**
	 * Visit a parse tree produced by the `pgl_expr_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPgl_expr_body?: (ctx: Pgl_expr_bodyContext) => Result;
	/**
	 * Visit a parse tree produced by the `pgl_dollar_ident_ref_body`
	 * labeled alternative in `PGLParser.query_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPgl_dollar_ident_ref_body?: (ctx: Pgl_dollar_ident_ref_bodyContext) => Result;
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
	 * Visit a parse tree produced by `PGLParser.pgl_ident_ref`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPgl_ident_ref?: (ctx: Pgl_ident_refContext) => Result;
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
	 * Visit a parse tree produced by `PGLParser.columnref_or_pgl_dollar_ident_ref`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnref_or_pgl_dollar_ident_ref?: (ctx: Columnref_or_pgl_dollar_ident_refContext) => Result;
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
	/**
	 * Visit a parse tree produced by `PGLParser.type_ref`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_ref?: (ctx: Type_refContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.database_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDatabase_def?: (ctx: Database_defContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.ddl_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDdl_statement?: (ctx: Ddl_statementContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.createstmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreatestmt?: (ctx: CreatestmtContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.opttemp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpttemp?: (ctx: OpttempContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.optinherit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptinherit?: (ctx: OptinheritContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.qualified_name_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualified_name_list?: (ctx: Qualified_name_listContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.optpartitionspec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptpartitionspec?: (ctx: OptpartitionspecContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.part_params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPart_params?: (ctx: Part_paramsContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.part_elem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPart_elem?: (ctx: Part_elemContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.table_access_method_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_access_method_clause?: (ctx: Table_access_method_clauseContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.optwith`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptwith?: (ctx: OptwithContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.reloptions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReloptions?: (ctx: ReloptionsContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.reloption_elem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReloption_elem?: (ctx: Reloption_elemContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.oncommitoption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOncommitoption?: (ctx: OncommitoptionContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.opttablespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpttablespace?: (ctx: OpttablespaceContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.tableelementlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableelementlist?: (ctx: TableelementlistContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.tableelement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableelement?: (ctx: TableelementContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.columnDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnDef?: (ctx: ColumnDefContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.colquallist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColquallist?: (ctx: ColquallistContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.colconstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColconstraint?: (ctx: ColconstraintContext) => Result;
	/**
	 * Visit a parse tree produced by the `col_not_null`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_not_null?: (ctx: Col_not_nullContext) => Result;
	/**
	 * Visit a parse tree produced by the `col_null`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_null?: (ctx: Col_nullContext) => Result;
	/**
	 * Visit a parse tree produced by the `col_primary_key`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_primary_key?: (ctx: Col_primary_keyContext) => Result;
	/**
	 * Visit a parse tree produced by the `col_unique`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_unique?: (ctx: Col_uniqueContext) => Result;
	/**
	 * Visit a parse tree produced by the `col_check`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_check?: (ctx: Col_checkContext) => Result;
	/**
	 * Visit a parse tree produced by the `col_default`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_default?: (ctx: Col_defaultContext) => Result;
	/**
	 * Visit a parse tree produced by the `col_references`
	 * labeled alternative in `PGLParser.colconstraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCol_references?: (ctx: Col_referencesContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.tableconstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableconstraint?: (ctx: TableconstraintContext) => Result;
	/**
	 * Visit a parse tree produced by the `tbl_check`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTbl_check?: (ctx: Tbl_checkContext) => Result;
	/**
	 * Visit a parse tree produced by the `tbl_unique`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTbl_unique?: (ctx: Tbl_uniqueContext) => Result;
	/**
	 * Visit a parse tree produced by the `tbl_primary_key`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTbl_primary_key?: (ctx: Tbl_primary_keyContext) => Result;
	/**
	 * Visit a parse tree produced by the `tbl_foreign_key`
	 * labeled alternative in `PGLParser.constraintelem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTbl_foreign_key?: (ctx: Tbl_foreign_keyContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.columnlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnlist?: (ctx: ColumnlistContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.columnElem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnElem?: (ctx: ColumnElemContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.key_match`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKey_match?: (ctx: Key_matchContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.key_actions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKey_actions?: (ctx: Key_actionsContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.key_update`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKey_update?: (ctx: Key_updateContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.key_delete`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKey_delete?: (ctx: Key_deleteContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.key_action`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKey_action?: (ctx: Key_actionContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.typename`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypename?: (ctx: TypenameContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.opt_array_bounds`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpt_array_bounds?: (ctx: Opt_array_boundsContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.simpletypename`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpletypename?: (ctx: SimpletypenameContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.numeric`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumeric?: (ctx: NumericContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.character`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCharacter?: (ctx: CharacterContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.constdatetime`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstdatetime?: (ctx: ConstdatetimeContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.timezone_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimezone_?: (ctx: Timezone_Context) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.constinterval`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstinterval?: (ctx: ConstintervalContext) => Result;
	/**
	 * Visit a parse tree produced by `PGLParser.generictype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerictype?: (ctx: GenerictypeContext) => Result;
}

