parser grammar PGLParser;

options
{
	tokenVocab = PGLLexer;
}

// atomic

identifier: IDENTIFIER | QUOTED_IDENTIFIER;
qualified_name: identifier (DOT identifier)*;

// prog

prog: def* EOF;

def: query_def | type_def;

// query_def

query_def:
	KW_QUERY identifier type_parameter_list? query_parameter_list L_CURLY query_body R_CURLY;

type_parameter_list: LT identifier (COMMA identifier)* GT;

query_parameter_list:
	L_PAREN (query_parameter (COMMA query_parameter)* COMMA?)? R_PAREN;

query_parameter: identifier (COLON type_expression)?;

// query_body

query_body:
	simple_select # simple_select_body
	| DOLLAR_LCURLY pgl_expr R_CURLY # pgl_expr_body
	| columnref_or_pgl_dollar_ident_ref  # pgl_dollar_ident_ref_body;

simple_select: KW_SELECT target_list from_clause? where_clause?;

// target_list

target_list: target_el (COMMA target_el)*;

target_el:
	a_expr (KW_AS? identifier)?	# target_label
	| STAR						# target_star;

// from_clause

from_clause: KW_FROM from_list;

from_list: table_ref (COMMA table_ref)*;

table_ref: relation_expr (KW_AS? identifier)?;

relation_expr: qualified_name;

// where_clause

where_clause: KW_WHERE a_expr;

// a_expr — expression hierarchy (precedence low to high)
// 
// PG level | ours | status -------------------|-------------------|-------- a_expr_qual | | skip —
// custom operators a_expr_lessless | | skip — bitwise shift << >> a_expr_or | a_expr_or | done
// a_expr_and | a_expr_and | done a_expr_between | a_expr_between | done a_expr_in | a_expr_in |
// done a_expr_unary_not | a_expr_unary_not | done a_expr_isnull | a_expr_isnull | done
// a_expr_is_not | a_expr_is_not | done a_expr_compare | a_expr_compare | done a_expr_like |
// a_expr_like | done a_expr_qual_op | | skip — custom operators a_expr_unary_qualop| | skip — unary
// custom operators a_expr_add | a_expr_add | done a_expr_mul | a_expr_mul | done a_expr_caret | |
// skip — exponentiation ^ a_expr_unary_sign | a_expr_unary | done a_expr_at_time_zone| | skip — AT
// TIME ZONE a_expr_collate | | skip — COLLATE a_expr_typecast | | todo — :: type cast c_expr |
// c_expr | done

a_expr: a_expr_or;

a_expr_or: a_expr_and (KW_OR a_expr_and)*;

a_expr_and: a_expr_between (KW_AND a_expr_between)*;

a_expr_between:
	a_expr_in (KW_NOT? KW_BETWEEN a_expr_in KW_AND a_expr_in)?;

a_expr_in:
	a_expr_unary_not (
		KW_NOT? KW_IN L_PAREN (a_expr (COMMA a_expr)*)? R_PAREN
	)?;

a_expr_unary_not: KW_NOT a_expr_unary_not | a_expr_isnull;

a_expr_isnull: a_expr_is_not (KW_IS KW_NOT? KW_NULL)?;

a_expr_is_not:
	a_expr_compare (KW_IS KW_NOT? (KW_TRUE | KW_FALSE | KW_NULL))?;

a_expr_compare:
	a_expr_like ((EQ | NEQ | LT | GT | LTE | GTE) a_expr_like)?;

a_expr_like: a_expr_add (KW_NOT? KW_LIKE a_expr_add)?;

a_expr_add: a_expr_mul ((PLUS | MINUS) a_expr_mul)*;

a_expr_mul:
	a_expr_unary ((STAR | SLASH | PERCENT) a_expr_unary)*;

a_expr_unary: (PLUS | MINUS)? c_expr;

// c_expr — atomic expressions

c_expr:
	DOLLAR_LCURLY pgl_expr R_CURLY
	| columnref_or_pgl_dollar_ident_ref
	| aexprconst
	| L_PAREN a_expr R_PAREN;

// pgl_expr — PGL expression language (inside ${...})

pgl_expr: pgl_query_call | pgl_ident_ref | aexprconst;

pgl_ident_ref: qualified_name;

pgl_query_call:
	qualified_name type_argument_list? L_PAREN (
		pgl_expr (COMMA pgl_expr)*
	)? R_PAREN;

type_argument_list:
	COLONCOLON LT type_expression (COMMA type_expression)* GT;

columnref_or_pgl_dollar_ident_ref:
	identifier (DOT (identifier | STAR))*;

aexprconst:
	INTEGER_LITERAL
	| NUMERIC_LITERAL
	| STRING_LITERAL
	| KW_TRUE
	| KW_FALSE
	| KW_NULL;

// type_def

type_def: KW_TYPE;

// type_expression

type_expression: type_ref;

type_ref: pgl_ident_ref;