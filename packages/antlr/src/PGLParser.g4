parser grammar PGLParser;

options
{
	tokenVocab = PGLLexer;
}

/* =========================================================================== Keyword
 * classification
 * 
 * PostgreSQL classifies keywords into four categories that control where each word can appear as a
 * name. We follow the same classification from PostgreSQL 17 gram.y, restricted to the keywords we
 * actually define.
 * 
 * Reference: packages/parser/playground/pgsql/gram.y (keyword lists)
 * ===========================================================================
 */

unreserved_keyword:
	KW_QUERY /* pglambda DSL */
	| KW_TYPE /* pglambda DSL */
	| KW_DATABASE /* pglambda DSL */
	| KW_IF
	| KW_KEY
	| KW_DELETE
	| KW_UPDATE
	| KW_CASCADE
	| KW_RESTRICT
	| KW_NO
	| KW_ACTION
	| KW_SET
	| KW_MATCH
	| KW_PARTIAL
	| KW_SIMPLE
	| KW_DOUBLE
	| KW_VARYING
	| KW_WITHOUT
	| KW_ZONE
	| KW_TEMPORARY
	| KW_TEMP
	| KW_UNLOGGED
	| KW_LOCAL
	| KW_GLOBAL
	| KW_INHERITS
	| KW_PARTITION
	| KW_BY
	| KW_USING
	| KW_OIDS
	| KW_COMMIT
	| KW_DROP
	| KW_PRESERVE
	| KW_ROWS
	| KW_TABLESPACE;

/*
 * col_name_keyword — can be column/table names, but NOT type/function names.
 * 
 * Type keywords appear here because they can be followed by '(' in typename productions, which
 * looks too much like a function call for the parser.
 */
col_name_keyword:
	KW_BETWEEN
	| KW_EXISTS
	| KW_BIGINT
	| KW_BOOLEAN
	| KW_CHAR
	| KW_CHARACTER
	| KW_DECIMAL
	| KW_FLOAT
	| KW_INT
	| KW_INTEGER
	| KW_INTERVAL
	| KW_NUMERIC
	| KW_PRECISION
	| KW_REAL
	| KW_SMALLINT
	| KW_TIMESTAMP
	| KW_TIME
	| KW_VARCHAR
	| KW_SETOF;

/*
 * type_func_name_keyword — can be type/function names, but NOT column names.
 * 
 * These are keywords used as operators in expressions; they can't be column names because they
 * would be ambiguous with variables.
 */
type_func_name_keyword: KW_IS | KW_LIKE | KW_FULL;

/*
 * reserved_keyword — usable only as a colLabel (with AS).
 * 
 * These keywords cannot be used as identifiers without quoting.
 */
reserved_keyword:
	KW_SELECT
	| KW_FROM
	| KW_WHERE
	| KW_AS
	| KW_AND
	| KW_OR
	| KW_NOT
	| KW_TRUE
	| KW_FALSE
	| KW_NULL
	| KW_IN
	| KW_CREATE
	| KW_TABLE
	| KW_CONSTRAINT
	| KW_CHECK
	| KW_PRIMARY
	| KW_UNIQUE
	| KW_FOREIGN
	| KW_REFERENCES
	| KW_DEFAULT
	| KW_ON
	| KW_WITH;

/* ===========================================================================
 * Identifier rules
 *
 *   identifier         — bare or quoted identifier (base token)
 *   colid              — column/table/query names
 *   type_function_name — type or function names
 *   colLabel           — anything (for use after AS)
 *
 * PostgreSQL's identifier also supports:
 *   Identifier uescape_?, UnicodeQuotedIdentifier, PLSQLVARIABLENAME
 * We omit those — no UESCAPE, no U&"..." unicode identifiers, no PL/pgSQL.
 * =========================================================================== */

identifier
	: IDENTIFIER
	| QUOTED_IDENTIFIER
	;

colid
	: identifier
	| unreserved_keyword
	| col_name_keyword
	;

type_function_name
	: identifier
	| unreserved_keyword
	| type_func_name_keyword
	;

colLabel
	: identifier
	| unreserved_keyword
	| col_name_keyword
	| type_func_name_keyword
	| reserved_keyword
	;

qualified_name: colid indirection?;

/*
 * indirection / indirection_el — dotted name components
 * 
 * Matches PostgreSQL's indirection / indirection_el / attr_name. We omit array subscript forms (
 * '[' a_expr ']' / slicing ). attr_name is ColLabel in PG (any keyword allowed after dot).
 */

indirection: indirection_el+;

indirection_el: DOT (attr_name | STAR);

attr_name: colLabel;

/* =========================================================================== prog
 * ===========================================================================
 */

prog: def* EOF;

def: query_def | type_def | database_def;

/* =========================================================================== query_def
 * ===========================================================================
 */

query_def:
	KW_QUERY colid type_parameter_list? query_parameter_list L_CURLY query_body R_CURLY;

type_parameter_list: LT colid (COMMA colid)* GT;

query_parameter_list:
	L_PAREN (query_parameter (COMMA query_parameter)* COMMA?)? R_PAREN;

query_parameter: colid (COLON type_expression)?;

/* query_body */

query_body:
	simple_select						# simple_select_body
	| DOLLAR_LCURLY pgl_expr R_CURLY	# pgl_expr_body
	| columnref_or_pgl_dollar_ident_ref	# pgl_dollar_ident_ref_body;

simple_select: KW_SELECT target_list from_clause? where_clause?;

/* target_list */

target_list: target_el (COMMA target_el)*;

target_el:
	a_expr (KW_AS colLabel | colid)?	# target_label
	| STAR								# target_star;

/* from_clause
 *
 * Currently supports: simple table references with optional aliases.
 * Not supported: JOINs, subqueries, function calls in FROM, LATERAL, CTEs.
 */

from_clause: KW_FROM from_list;

from_list: table_ref (COMMA table_ref)*;

table_ref: relation_expr (KW_AS colLabel | colid)?;

relation_expr: qualified_name;

/* where_clause */

where_clause: KW_WHERE a_expr;

/* =========================================================================== a_expr — expression
 * hierarchy (precedence low -> high)
 * 
 * PG level | ours | status ----------------------|--------------------|--------- a_expr_qual | |
 * skip — custom operators a_expr_lessless | | skip — bitwise shift << >> a_expr_or | a_expr_or |
 * done a_expr_and | a_expr_and | done a_expr_between | a_expr_between | done a_expr_in | a_expr_in
 * | done a_expr_unary_not | a_expr_unary_not | done a_expr_isnull | a_expr_isnull | done
 * a_expr_is_not | a_expr_is_not | done a_expr_compare | a_expr_compare | done a_expr_like |
 * a_expr_like | done a_expr_qual_op | | skip — custom operators a_expr_unary_qualop | | skip —
 * unary custom operators a_expr_add | a_expr_add | done a_expr_mul | a_expr_mul | done a_expr_caret
 * | | skip — exponentiation ^ a_expr_unary_sign | a_expr_unary | done a_expr_at_time_zone | | skip
 * — AT TIME ZONE a_expr_collate | | skip — COLLATE a_expr_typecast | | todo — :: type cast c_expr |
 * c_expr | done ===========================================================================
 */

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

/* c_expr — atomic expressions */

c_expr:
	DOLLAR_LCURLY pgl_expr R_CURLY
	| columnref_or_pgl_dollar_ident_ref
	| aexprconst
	| L_PAREN a_expr R_PAREN;

/* =========================================================================== pgl_expr — PGL
 * expression language (inside ${...})
 * ===========================================================================
 */

pgl_expr: pgl_query_call | pgl_ident_ref | aexprconst;

pgl_ident_ref: qualified_name;

pgl_query_call:
	qualified_name type_argument_list? L_PAREN (
		pgl_expr (COMMA pgl_expr)*
	)? R_PAREN;

type_argument_list:
	COLONCOLON LT type_expression (COMMA type_expression)* GT;

columnref_or_pgl_dollar_ident_ref: colid (DOT (colid | STAR))*;

aexprconst:
	INTEGER_LITERAL
	| NUMERIC_LITERAL
	| STRING_LITERAL
	| KW_TRUE
	| KW_FALSE
	| KW_NULL;

/* =========================================================================== type_def (stub — not
 * yet implemented) ===========================================================================
 */

type_def: KW_TYPE;

/* type_expression */

type_expression: type_ref;

type_ref: pgl_ident_ref;

/* =========================================================================== DDL — database { ...
 * } block
 * 
 * Follows the PostgreSQL grammar structure (createstmt, columnDef, typename, colconstraint,
 * constraintelem, key_actions) reduced to the subset needed for pglambda's type extraction.
 * 
 * Rule names match the official PostgreSQL 17 grammar where possible. Reference:
 * packages/parser/playground/pgsql/gram.y
 * ===========================================================================
 */

database_def: KW_DATABASE L_CURLY ddl_statement* R_CURLY;

ddl_statement: createstmt SEMICOLON;

/*
 * createstmt — CREATE TABLE
 * 
 * Matches PostgreSQL's createstmt (first form — column definitions).
 * 
 * Not supported (yet): OF type form, PARTITION OF form, tablelikeclause.
 */

createstmt:
	KW_CREATE opttemp? KW_TABLE (KW_IF KW_NOT KW_EXISTS)? qualified_name L_PAREN tableelementlist?
		R_PAREN optinherit? optpartitionspec? table_access_method_clause? optwith? oncommitoption?
		opttablespace?;

opttemp: (KW_LOCAL | KW_GLOBAL)? (KW_TEMPORARY | KW_TEMP)
	| KW_UNLOGGED;

optinherit: KW_INHERITS L_PAREN qualified_name_list R_PAREN;

qualified_name_list: qualified_name (COMMA qualified_name)*;

optpartitionspec:
	KW_PARTITION KW_BY colid L_PAREN part_params R_PAREN;

part_params: part_elem (COMMA part_elem)*;

/* Simplified: skip collate_ / class_ / func_expr_windowless */
part_elem: colid | L_PAREN a_expr R_PAREN;

table_access_method_clause: KW_USING colid;

optwith: KW_WITH reloptions | KW_WITHOUT KW_OIDS;

reloptions:
	L_PAREN reloption_elem (COMMA reloption_elem)* R_PAREN;

/* Simplified def_arg to aexprconst | colid */
reloption_elem: colLabel (EQ (aexprconst | colid))?;

oncommitoption:
	KW_ON KW_COMMIT (
		KW_DROP
		| KW_DELETE KW_ROWS
		| KW_PRESERVE KW_ROWS
	);

opttablespace: KW_TABLESPACE colid;

tableelementlist: tableelement (COMMA tableelement)*;

/*
 * tableconstraint listed first so that PRIMARY KEY (...) / UNIQUE (...) / FOREIGN KEY (...) / CHECK
 * (...) are tried before columnDef. ANTLR's LL(*) prediction resolves the overlap via 2-3 token
 * look-ahead: PRIMARY KEY ( -> tableconstraint primary int4 -> columnDef (column named "primary")
 * 
 *
 * Not supported (yet): tablelikeclause (LIKE source_table ...)
 */
tableelement: tableconstraint | columnDef;

/*
 * columnDef — column definition
 * 
 * Matches PostgreSQL's: colid typename create_generic_options? colquallist We omit
 * create_generic_options (OPTIONS for foreign tables).
 */

columnDef: colid typename colquallist;

colquallist: colconstraint*;

/*
 * colconstraint / colconstraintelem — column constraints
 * 
 * Matches PostgreSQL's colconstraint / colconstraintelem.
 * 
 * NOTE: PostgreSQL uses DEFAULT b_expr (a_expr minus AND/OR/NOT/IS/IN/ BETWEEN/LIKE). We use a_expr
 * for simplicity and reject invalid boolean operators during post-parse semantic analysis.
 * 
 * Not supported (yet): constraintattr (DEFERRABLE / INITIALLY DEFERRED/IMMEDIATE), COLLATE,
 * GENERATED ... AS IDENTITY, GENERATED ... AS (expr) STORED.
 */

colconstraint:
	KW_CONSTRAINT colid colconstraintelem
	| colconstraintelem;

colconstraintelem:
	KW_NOT KW_NULL																			# col_not_null
	| KW_NULL																				# col_null
	| KW_PRIMARY KW_KEY																		# col_primary_key
	| KW_UNIQUE																				# col_unique
	| KW_CHECK L_PAREN a_expr R_PAREN														# col_check
	| KW_DEFAULT a_expr																		# col_default
	| KW_REFERENCES qualified_name (L_PAREN columnlist R_PAREN)? key_match? key_actions?	#
		col_references;

/*
 * tableconstraint / constraintelem — table-level constraints
 * 
 * Matches PostgreSQL's tableconstraint / constraintelem.
 * 
 * Not supported (yet): EXCLUDE, existingindex (USING INDEX), c_include_ (INCLUDE),
 * constraintattributespec (DEFERRABLE / INITIALLY ...), definition_ / optconstablespace (index
 * parameters).
 */

tableconstraint:
	KW_CONSTRAINT colid constraintelem
	| constraintelem;

constraintelem:
	KW_CHECK L_PAREN a_expr R_PAREN					# tbl_check
	| KW_UNIQUE L_PAREN columnlist R_PAREN			# tbl_unique
	| KW_PRIMARY KW_KEY L_PAREN columnlist R_PAREN	# tbl_primary_key
	| KW_FOREIGN KW_KEY L_PAREN columnlist R_PAREN KW_REFERENCES qualified_name (
		L_PAREN columnlist R_PAREN
	)? key_match? key_actions? # tbl_foreign_key;

/*
 * columnlist / columnElem — list of column names
 * 
 * Matches PostgreSQL's columnlist / columnElem.
 */

columnlist: columnElem (COMMA columnElem)*;

columnElem: colid;

/*
 * key_match — MATCH clause for foreign keys
 * 
 * Matches PostgreSQL's key_match.
 */

key_match: KW_MATCH (KW_FULL | KW_PARTIAL | KW_SIMPLE);

/*
 * key_actions / key_update / key_delete / key_action
 * 
 * Matches PostgreSQL's key_actions structure exactly: key_actions: key_update | key_delete |
 * key_update key_delete | key_delete key_update
 */

key_actions:
	key_update
	| key_delete
	| key_update key_delete
	| key_delete key_update;

key_update: KW_ON KW_UPDATE key_action;

key_delete: KW_ON KW_DELETE key_action;

key_action:
	KW_NO KW_ACTION
	| KW_RESTRICT
	| KW_CASCADE
	| KW_SET KW_NULL
	| KW_SET KW_DEFAULT;

/* =========================================================================== DDL data types —
 * typename / simpletypename
 * 
 * Follows the PostgreSQL grammar's typename decomposition:
 * 
 * typename -> SETOF? simpletypename (opt_array_bounds | ARRAY ...) simpletypename -> generictype |
 * numeric | character | constdatetime | constinterval (...) | bit | jsonType
 * 
 * We omit: bit, jsonType, and interval field qualifiers.
 * 
 * Reference: PostgreSQL 17 gram.y
 * ===========================================================================
 */

typename: KW_SETOF? simpletypename opt_array_bounds;

opt_array_bounds: (L_BRACKET INTEGER_LITERAL? R_BRACKET)*;

simpletypename:
	numeric
	| character
	| constdatetime
	| constinterval
	| generictype;

/* numeric — matches PostgreSQL's numeric rule */

numeric:
	KW_INT
	| KW_INTEGER
	| KW_SMALLINT
	| KW_BIGINT
	| KW_REAL
	| KW_FLOAT (L_PAREN INTEGER_LITERAL R_PAREN)?
	| KW_DOUBLE KW_PRECISION
	| KW_DECIMAL (
		L_PAREN INTEGER_LITERAL (COMMA INTEGER_LITERAL)? R_PAREN
	)?
	| KW_NUMERIC (
		L_PAREN INTEGER_LITERAL (COMMA INTEGER_LITERAL)? R_PAREN
	)?
	| KW_BOOLEAN;

/* character — matches PostgreSQL's character / character_c rule */

character: (KW_CHARACTER | KW_CHAR) KW_VARYING? (
		L_PAREN INTEGER_LITERAL R_PAREN
	)?
	| KW_VARCHAR (L_PAREN INTEGER_LITERAL R_PAREN)?;

/* constdatetime — matches PostgreSQL's constdatetime / timezone_ rules */

constdatetime: (KW_TIMESTAMP | KW_TIME) (
		L_PAREN INTEGER_LITERAL R_PAREN
	)? timezone_?;

timezone_: KW_WITH KW_TIME KW_ZONE | KW_WITHOUT KW_TIME KW_ZONE;

/*
 * constinterval — matches PostgreSQL's constinterval
 * 
 * Not supported (yet): interval field qualifiers (YEAR, MONTH, DAY, ...)
 */

constinterval: KW_INTERVAL;

/*
 * generictype — catch-all for user-defined types and built-in types that are plain identifiers
 * (text, uuid, int4, float8, jsonb, bytea, ...).
 * 
 * Matches PostgreSQL's: type_function_name attrs? type_modifiers_? We omit attrs (schema-qualified
 * type names like pg_catalog.int4) and simplify type_modifiers_ to integer literals only.
 */

generictype:
	type_function_name (
		L_PAREN INTEGER_LITERAL (COMMA INTEGER_LITERAL)* R_PAREN
	)?;