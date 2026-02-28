// Generated from src/PGLParser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import PGLParserListener from "./PGLParserListener.js";
import PGLParserVisitor from "./PGLParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class PGLParser extends Parser {
	public static readonly KW_QUERY = 1;
	public static readonly KW_TYPE = 2;
	public static readonly KW_DATABASE = 3;
	public static readonly KW_SELECT = 4;
	public static readonly KW_FROM = 5;
	public static readonly KW_WHERE = 6;
	public static readonly KW_AS = 7;
	public static readonly KW_AND = 8;
	public static readonly KW_OR = 9;
	public static readonly KW_NOT = 10;
	public static readonly KW_TRUE = 11;
	public static readonly KW_FALSE = 12;
	public static readonly KW_NULL = 13;
	public static readonly KW_IS = 14;
	public static readonly KW_IN = 15;
	public static readonly KW_LIKE = 16;
	public static readonly KW_BETWEEN = 17;
	public static readonly KW_CREATE = 18;
	public static readonly KW_TABLE = 19;
	public static readonly KW_CONSTRAINT = 20;
	public static readonly KW_CHECK = 21;
	public static readonly KW_IF = 22;
	public static readonly KW_EXISTS = 23;
	public static readonly KW_PRIMARY = 24;
	public static readonly KW_KEY = 25;
	public static readonly KW_UNIQUE = 26;
	public static readonly KW_FOREIGN = 27;
	public static readonly KW_REFERENCES = 28;
	public static readonly KW_DEFAULT = 29;
	public static readonly KW_ON = 30;
	public static readonly KW_DELETE = 31;
	public static readonly KW_UPDATE = 32;
	public static readonly KW_CASCADE = 33;
	public static readonly KW_RESTRICT = 34;
	public static readonly KW_NO = 35;
	public static readonly KW_ACTION = 36;
	public static readonly KW_SET = 37;
	public static readonly KW_MATCH = 38;
	public static readonly KW_FULL = 39;
	public static readonly KW_PARTIAL = 40;
	public static readonly KW_SIMPLE = 41;
	public static readonly KW_SETOF = 42;
	public static readonly KW_TEMPORARY = 43;
	public static readonly KW_TEMP = 44;
	public static readonly KW_UNLOGGED = 45;
	public static readonly KW_LOCAL = 46;
	public static readonly KW_GLOBAL = 47;
	public static readonly KW_INHERITS = 48;
	public static readonly KW_PARTITION = 49;
	public static readonly KW_BY = 50;
	public static readonly KW_USING = 51;
	public static readonly KW_OIDS = 52;
	public static readonly KW_COMMIT = 53;
	public static readonly KW_DROP = 54;
	public static readonly KW_PRESERVE = 55;
	public static readonly KW_ROWS = 56;
	public static readonly KW_TABLESPACE = 57;
	public static readonly KW_INT = 58;
	public static readonly KW_INTEGER = 59;
	public static readonly KW_SMALLINT = 60;
	public static readonly KW_BIGINT = 61;
	public static readonly KW_REAL = 62;
	public static readonly KW_FLOAT = 63;
	public static readonly KW_DOUBLE = 64;
	public static readonly KW_PRECISION = 65;
	public static readonly KW_DECIMAL = 66;
	public static readonly KW_NUMERIC = 67;
	public static readonly KW_BOOLEAN = 68;
	public static readonly KW_CHARACTER = 69;
	public static readonly KW_CHAR = 70;
	public static readonly KW_VARCHAR = 71;
	public static readonly KW_VARYING = 72;
	public static readonly KW_TIMESTAMP = 73;
	public static readonly KW_TIME = 74;
	public static readonly KW_WITH = 75;
	public static readonly KW_WITHOUT = 76;
	public static readonly KW_ZONE = 77;
	public static readonly KW_INTERVAL = 78;
	public static readonly COLONCOLON = 79;
	public static readonly COLON = 80;
	public static readonly COMMA = 81;
	public static readonly DOT = 82;
	public static readonly SEMICOLON = 83;
	public static readonly STAR = 84;
	public static readonly L_PAREN = 85;
	public static readonly R_PAREN = 86;
	public static readonly L_CURLY = 87;
	public static readonly R_CURLY = 88;
	public static readonly L_BRACKET = 89;
	public static readonly R_BRACKET = 90;
	public static readonly EQ = 91;
	public static readonly NEQ = 92;
	public static readonly LT = 93;
	public static readonly GT = 94;
	public static readonly LTE = 95;
	public static readonly GTE = 96;
	public static readonly PLUS = 97;
	public static readonly MINUS = 98;
	public static readonly SLASH = 99;
	public static readonly PERCENT = 100;
	public static readonly DOLLAR_LCURLY = 101;
	public static readonly INTEGER_LITERAL = 102;
	public static readonly NUMERIC_LITERAL = 103;
	public static readonly STRING_LITERAL = 104;
	public static readonly IDENTIFIER = 105;
	public static readonly QUOTED_IDENTIFIER = 106;
	public static readonly WS = 107;
	public static readonly LINE_COMMENT_QUERY = 108;
	public static readonly LINE_COMMENT = 109;
	public static readonly BLOCK_COMMENT = 110;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_unreserved_keyword = 0;
	public static readonly RULE_col_name_keyword = 1;
	public static readonly RULE_type_func_name_keyword = 2;
	public static readonly RULE_reserved_keyword = 3;
	public static readonly RULE_identifier = 4;
	public static readonly RULE_colid = 5;
	public static readonly RULE_type_function_name = 6;
	public static readonly RULE_colLabel = 7;
	public static readonly RULE_qualified_name = 8;
	public static readonly RULE_indirection = 9;
	public static readonly RULE_indirection_el = 10;
	public static readonly RULE_attr_name = 11;
	public static readonly RULE_prog = 12;
	public static readonly RULE_def = 13;
	public static readonly RULE_query_def = 14;
	public static readonly RULE_type_parameter_list = 15;
	public static readonly RULE_query_parameter_list = 16;
	public static readonly RULE_query_parameter = 17;
	public static readonly RULE_query_body = 18;
	public static readonly RULE_simple_select = 19;
	public static readonly RULE_target_list = 20;
	public static readonly RULE_target_el = 21;
	public static readonly RULE_from_clause = 22;
	public static readonly RULE_from_list = 23;
	public static readonly RULE_table_ref = 24;
	public static readonly RULE_relation_expr = 25;
	public static readonly RULE_where_clause = 26;
	public static readonly RULE_a_expr = 27;
	public static readonly RULE_a_expr_or = 28;
	public static readonly RULE_a_expr_and = 29;
	public static readonly RULE_a_expr_between = 30;
	public static readonly RULE_a_expr_in = 31;
	public static readonly RULE_a_expr_unary_not = 32;
	public static readonly RULE_a_expr_isnull = 33;
	public static readonly RULE_a_expr_is_not = 34;
	public static readonly RULE_a_expr_compare = 35;
	public static readonly RULE_a_expr_like = 36;
	public static readonly RULE_a_expr_add = 37;
	public static readonly RULE_a_expr_mul = 38;
	public static readonly RULE_a_expr_unary = 39;
	public static readonly RULE_c_expr = 40;
	public static readonly RULE_pgl_expr = 41;
	public static readonly RULE_pgl_ident_ref = 42;
	public static readonly RULE_pgl_query_call = 43;
	public static readonly RULE_type_argument_list = 44;
	public static readonly RULE_columnref_or_pgl_dollar_ident_ref = 45;
	public static readonly RULE_aexprconst = 46;
	public static readonly RULE_type_def = 47;
	public static readonly RULE_type_expression = 48;
	public static readonly RULE_type_ref = 49;
	public static readonly RULE_database_def = 50;
	public static readonly RULE_ddl_statement = 51;
	public static readonly RULE_createstmt = 52;
	public static readonly RULE_opttemp = 53;
	public static readonly RULE_optinherit = 54;
	public static readonly RULE_qualified_name_list = 55;
	public static readonly RULE_optpartitionspec = 56;
	public static readonly RULE_part_params = 57;
	public static readonly RULE_part_elem = 58;
	public static readonly RULE_table_access_method_clause = 59;
	public static readonly RULE_optwith = 60;
	public static readonly RULE_reloptions = 61;
	public static readonly RULE_reloption_elem = 62;
	public static readonly RULE_oncommitoption = 63;
	public static readonly RULE_opttablespace = 64;
	public static readonly RULE_tableelementlist = 65;
	public static readonly RULE_tableelement = 66;
	public static readonly RULE_columnDef = 67;
	public static readonly RULE_colquallist = 68;
	public static readonly RULE_colconstraint = 69;
	public static readonly RULE_colconstraintelem = 70;
	public static readonly RULE_tableconstraint = 71;
	public static readonly RULE_constraintelem = 72;
	public static readonly RULE_columnlist = 73;
	public static readonly RULE_columnElem = 74;
	public static readonly RULE_key_match = 75;
	public static readonly RULE_key_actions = 76;
	public static readonly RULE_key_update = 77;
	public static readonly RULE_key_delete = 78;
	public static readonly RULE_key_action = 79;
	public static readonly RULE_typename = 80;
	public static readonly RULE_opt_array_bounds = 81;
	public static readonly RULE_simpletypename = 82;
	public static readonly RULE_numeric = 83;
	public static readonly RULE_character = 84;
	public static readonly RULE_constdatetime = 85;
	public static readonly RULE_timezone_ = 86;
	public static readonly RULE_constinterval = 87;
	public static readonly RULE_generictype = 88;
	public static readonly literalNames: (string | null)[] = [ null, "'query'", 
                                                            "'type'", "'database'", 
                                                            "'select'", 
                                                            "'from'", "'where'", 
                                                            "'as'", "'and'", 
                                                            "'or'", "'not'", 
                                                            "'true'", "'false'", 
                                                            "'null'", "'is'", 
                                                            "'in'", "'like'", 
                                                            "'between'", 
                                                            "'create'", 
                                                            "'table'", "'constraint'", 
                                                            "'check'", "'if'", 
                                                            "'exists'", 
                                                            "'primary'", 
                                                            "'key'", "'unique'", 
                                                            "'foreign'", 
                                                            "'references'", 
                                                            "'default'", 
                                                            "'on'", "'delete'", 
                                                            "'update'", 
                                                            "'cascade'", 
                                                            "'restrict'", 
                                                            "'no'", "'action'", 
                                                            "'set'", "'match'", 
                                                            "'full'", "'partial'", 
                                                            "'simple'", 
                                                            "'setof'", "'temporary'", 
                                                            "'temp'", "'unlogged'", 
                                                            "'local'", "'global'", 
                                                            "'inherits'", 
                                                            "'partition'", 
                                                            "'by'", "'using'", 
                                                            "'oids'", "'commit'", 
                                                            "'drop'", "'preserve'", 
                                                            "'rows'", "'tablespace'", 
                                                            "'int'", "'integer'", 
                                                            "'smallint'", 
                                                            "'bigint'", 
                                                            "'real'", "'float'", 
                                                            "'double'", 
                                                            "'precision'", 
                                                            "'decimal'", 
                                                            "'numeric'", 
                                                            "'boolean'", 
                                                            "'character'", 
                                                            "'char'", "'varchar'", 
                                                            "'varying'", 
                                                            "'timestamp'", 
                                                            "'time'", "'with'", 
                                                            "'without'", 
                                                            "'zone'", "'interval'", 
                                                            "'::'", "':'", 
                                                            "','", "'.'", 
                                                            "';'", "'*'", 
                                                            "'('", "')'", 
                                                            "'{'", "'}'", 
                                                            "'['", "']'", 
                                                            "'='", null, 
                                                            "'<'", "'>'", 
                                                            "'<='", "'>='", 
                                                            "'+'", "'-'", 
                                                            "'/'", "'%'", 
                                                            "'${'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "KW_QUERY", 
                                                             "KW_TYPE", 
                                                             "KW_DATABASE", 
                                                             "KW_SELECT", 
                                                             "KW_FROM", 
                                                             "KW_WHERE", 
                                                             "KW_AS", "KW_AND", 
                                                             "KW_OR", "KW_NOT", 
                                                             "KW_TRUE", 
                                                             "KW_FALSE", 
                                                             "KW_NULL", 
                                                             "KW_IS", "KW_IN", 
                                                             "KW_LIKE", 
                                                             "KW_BETWEEN", 
                                                             "KW_CREATE", 
                                                             "KW_TABLE", 
                                                             "KW_CONSTRAINT", 
                                                             "KW_CHECK", 
                                                             "KW_IF", "KW_EXISTS", 
                                                             "KW_PRIMARY", 
                                                             "KW_KEY", "KW_UNIQUE", 
                                                             "KW_FOREIGN", 
                                                             "KW_REFERENCES", 
                                                             "KW_DEFAULT", 
                                                             "KW_ON", "KW_DELETE", 
                                                             "KW_UPDATE", 
                                                             "KW_CASCADE", 
                                                             "KW_RESTRICT", 
                                                             "KW_NO", "KW_ACTION", 
                                                             "KW_SET", "KW_MATCH", 
                                                             "KW_FULL", 
                                                             "KW_PARTIAL", 
                                                             "KW_SIMPLE", 
                                                             "KW_SETOF", 
                                                             "KW_TEMPORARY", 
                                                             "KW_TEMP", 
                                                             "KW_UNLOGGED", 
                                                             "KW_LOCAL", 
                                                             "KW_GLOBAL", 
                                                             "KW_INHERITS", 
                                                             "KW_PARTITION", 
                                                             "KW_BY", "KW_USING", 
                                                             "KW_OIDS", 
                                                             "KW_COMMIT", 
                                                             "KW_DROP", 
                                                             "KW_PRESERVE", 
                                                             "KW_ROWS", 
                                                             "KW_TABLESPACE", 
                                                             "KW_INT", "KW_INTEGER", 
                                                             "KW_SMALLINT", 
                                                             "KW_BIGINT", 
                                                             "KW_REAL", 
                                                             "KW_FLOAT", 
                                                             "KW_DOUBLE", 
                                                             "KW_PRECISION", 
                                                             "KW_DECIMAL", 
                                                             "KW_NUMERIC", 
                                                             "KW_BOOLEAN", 
                                                             "KW_CHARACTER", 
                                                             "KW_CHAR", 
                                                             "KW_VARCHAR", 
                                                             "KW_VARYING", 
                                                             "KW_TIMESTAMP", 
                                                             "KW_TIME", 
                                                             "KW_WITH", 
                                                             "KW_WITHOUT", 
                                                             "KW_ZONE", 
                                                             "KW_INTERVAL", 
                                                             "COLONCOLON", 
                                                             "COLON", "COMMA", 
                                                             "DOT", "SEMICOLON", 
                                                             "STAR", "L_PAREN", 
                                                             "R_PAREN", 
                                                             "L_CURLY", 
                                                             "R_CURLY", 
                                                             "L_BRACKET", 
                                                             "R_BRACKET", 
                                                             "EQ", "NEQ", 
                                                             "LT", "GT", 
                                                             "LTE", "GTE", 
                                                             "PLUS", "MINUS", 
                                                             "SLASH", "PERCENT", 
                                                             "DOLLAR_LCURLY", 
                                                             "INTEGER_LITERAL", 
                                                             "NUMERIC_LITERAL", 
                                                             "STRING_LITERAL", 
                                                             "IDENTIFIER", 
                                                             "QUOTED_IDENTIFIER", 
                                                             "WS", "LINE_COMMENT_QUERY", 
                                                             "LINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"unreserved_keyword", "col_name_keyword", "type_func_name_keyword", "reserved_keyword", 
		"identifier", "colid", "type_function_name", "colLabel", "qualified_name", 
		"indirection", "indirection_el", "attr_name", "prog", "def", "query_def", 
		"type_parameter_list", "query_parameter_list", "query_parameter", "query_body", 
		"simple_select", "target_list", "target_el", "from_clause", "from_list", 
		"table_ref", "relation_expr", "where_clause", "a_expr", "a_expr_or", "a_expr_and", 
		"a_expr_between", "a_expr_in", "a_expr_unary_not", "a_expr_isnull", "a_expr_is_not", 
		"a_expr_compare", "a_expr_like", "a_expr_add", "a_expr_mul", "a_expr_unary", 
		"c_expr", "pgl_expr", "pgl_ident_ref", "pgl_query_call", "type_argument_list", 
		"columnref_or_pgl_dollar_ident_ref", "aexprconst", "type_def", "type_expression", 
		"type_ref", "database_def", "ddl_statement", "createstmt", "opttemp", 
		"optinherit", "qualified_name_list", "optpartitionspec", "part_params", 
		"part_elem", "table_access_method_clause", "optwith", "reloptions", "reloption_elem", 
		"oncommitoption", "opttablespace", "tableelementlist", "tableelement", 
		"columnDef", "colquallist", "colconstraint", "colconstraintelem", "tableconstraint", 
		"constraintelem", "columnlist", "columnElem", "key_match", "key_actions", 
		"key_update", "key_delete", "key_action", "typename", "opt_array_bounds", 
		"simpletypename", "numeric", "character", "constdatetime", "timezone_", 
		"constinterval", "generictype",
	];
	public get grammarFileName(): string { return "PGLParser.g4"; }
	public get literalNames(): (string | null)[] { return PGLParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return PGLParser.symbolicNames; }
	public get ruleNames(): string[] { return PGLParser.ruleNames; }
	public get serializedATN(): number[] { return PGLParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, PGLParser._ATN, PGLParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public unreserved_keyword(): Unreserved_keywordContext {
		let localctx: Unreserved_keywordContext = new Unreserved_keywordContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PGLParser.RULE_unreserved_keyword);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 178;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2185232398) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 67107711) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 12545) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public col_name_keyword(): Col_name_keywordContext {
		let localctx: Col_name_keywordContext = new Col_name_keywordContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PGLParser.RULE_col_name_keyword);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 180;
			_la = this._input.LA(1);
			if(!(((((_la - 17)) & ~0x1F) === 0 && ((1 << (_la - 17)) & 33554497) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 1163199) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_func_name_keyword(): Type_func_name_keywordContext {
		let localctx: Type_func_name_keywordContext = new Type_func_name_keywordContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PGLParser.RULE_type_func_name_keyword);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 182;
			_la = this._input.LA(1);
			if(!(((((_la - 14)) & ~0x1F) === 0 && ((1 << (_la - 14)) & 33554437) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public reserved_keyword(): Reserved_keywordContext {
		let localctx: Reserved_keywordContext = new Reserved_keywordContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, PGLParser.RULE_reserved_keyword);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 184;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2101133296) !== 0) || _la===75)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, PGLParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			_la = this._input.LA(1);
			if(!(_la===105 || _la===106)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public colid(): ColidContext {
		let localctx: ColidContext = new ColidContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PGLParser.RULE_colid);
		try {
			this.state = 191;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 105:
			case 106:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 188;
				this.identifier();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 22:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 64:
			case 72:
			case 76:
			case 77:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 189;
				this.unreserved_keyword();
				}
				break;
			case 17:
			case 23:
			case 42:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 73:
			case 74:
			case 78:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 190;
				this.col_name_keyword();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_function_name(): Type_function_nameContext {
		let localctx: Type_function_nameContext = new Type_function_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, PGLParser.RULE_type_function_name);
		try {
			this.state = 196;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 105:
			case 106:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 193;
				this.identifier();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 22:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 64:
			case 72:
			case 76:
			case 77:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 194;
				this.unreserved_keyword();
				}
				break;
			case 14:
			case 16:
			case 39:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 195;
				this.type_func_name_keyword();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public colLabel(): ColLabelContext {
		let localctx: ColLabelContext = new ColLabelContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, PGLParser.RULE_colLabel);
		try {
			this.state = 203;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 105:
			case 106:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 198;
				this.identifier();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 22:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 64:
			case 72:
			case 76:
			case 77:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 199;
				this.unreserved_keyword();
				}
				break;
			case 17:
			case 23:
			case 42:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 73:
			case 74:
			case 78:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 200;
				this.col_name_keyword();
				}
				break;
			case 14:
			case 16:
			case 39:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 201;
				this.type_func_name_keyword();
				}
				break;
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 15:
			case 18:
			case 19:
			case 20:
			case 21:
			case 24:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 75:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 202;
				this.reserved_keyword();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualified_name(): Qualified_nameContext {
		let localctx: Qualified_nameContext = new Qualified_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, PGLParser.RULE_qualified_name);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 205;
			this.colid();
			this.state = 207;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===82) {
				{
				this.state = 206;
				this.indirection();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public indirection(): IndirectionContext {
		let localctx: IndirectionContext = new IndirectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, PGLParser.RULE_indirection);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 210;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 209;
				this.indirection_el();
				}
				}
				this.state = 212;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===82);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public indirection_el(): Indirection_elContext {
		let localctx: Indirection_elContext = new Indirection_elContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, PGLParser.RULE_indirection_el);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 214;
			this.match(PGLParser.DOT);
			this.state = 217;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 105:
			case 106:
				{
				this.state = 215;
				this.attr_name();
				}
				break;
			case 84:
				{
				this.state = 216;
				this.match(PGLParser.STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public attr_name(): Attr_nameContext {
		let localctx: Attr_nameContext = new Attr_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, PGLParser.RULE_attr_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 219;
			this.colLabel();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let localctx: ProgContext = new ProgContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, PGLParser.RULE_prog);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0)) {
				{
				{
				this.state = 221;
				this.def();
				}
				}
				this.state = 226;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 227;
			this.match(PGLParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public def(): DefContext {
		let localctx: DefContext = new DefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, PGLParser.RULE_def);
		try {
			this.state = 232;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 229;
				this.query_def();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 230;
				this.type_def();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 231;
				this.database_def();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public query_def(): Query_defContext {
		let localctx: Query_defContext = new Query_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, PGLParser.RULE_query_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 234;
			this.match(PGLParser.KW_QUERY);
			this.state = 235;
			this.colid();
			this.state = 237;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===93) {
				{
				this.state = 236;
				this.type_parameter_list();
				}
			}

			this.state = 239;
			this.query_parameter_list();
			this.state = 240;
			this.match(PGLParser.L_CURLY);
			this.state = 241;
			this.query_body();
			this.state = 242;
			this.match(PGLParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_parameter_list(): Type_parameter_listContext {
		let localctx: Type_parameter_listContext = new Type_parameter_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, PGLParser.RULE_type_parameter_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 244;
			this.match(PGLParser.LT);
			this.state = 245;
			this.colid();
			this.state = 250;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 246;
				this.match(PGLParser.COMMA);
				this.state = 247;
				this.colid();
				}
				}
				this.state = 252;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 253;
			this.match(PGLParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public query_parameter_list(): Query_parameter_listContext {
		let localctx: Query_parameter_listContext = new Query_parameter_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, PGLParser.RULE_query_parameter_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 255;
			this.match(PGLParser.L_PAREN);
			this.state = 267;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2193752078) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967167) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 30719) !== 0) || _la===105 || _la===106) {
				{
				this.state = 256;
				this.query_parameter();
				this.state = 261;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 257;
						this.match(PGLParser.COMMA);
						this.state = 258;
						this.query_parameter();
						}
						}
					}
					this.state = 263;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
				}
				this.state = 265;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===81) {
					{
					this.state = 264;
					this.match(PGLParser.COMMA);
					}
				}

				}
			}

			this.state = 269;
			this.match(PGLParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public query_parameter(): Query_parameterContext {
		let localctx: Query_parameterContext = new Query_parameterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, PGLParser.RULE_query_parameter);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 271;
			this.colid();
			this.state = 274;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===80) {
				{
				this.state = 272;
				this.match(PGLParser.COLON);
				this.state = 273;
				this.type_expression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public query_body(): Query_bodyContext {
		let localctx: Query_bodyContext = new Query_bodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, PGLParser.RULE_query_body);
		try {
			this.state = 282;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
				localctx = new Simple_select_bodyContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 276;
				this.simple_select();
				}
				break;
			case 101:
				localctx = new Pgl_expr_bodyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 277;
				this.match(PGLParser.DOLLAR_LCURLY);
				this.state = 278;
				this.pgl_expr();
				this.state = 279;
				this.match(PGLParser.R_CURLY);
				}
				break;
			case 1:
			case 2:
			case 3:
			case 17:
			case 22:
			case 23:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 76:
			case 77:
			case 78:
			case 105:
			case 106:
				localctx = new Pgl_dollar_ident_ref_bodyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 281;
				this.columnref_or_pgl_dollar_ident_ref();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simple_select(): Simple_selectContext {
		let localctx: Simple_selectContext = new Simple_selectContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, PGLParser.RULE_simple_select);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 284;
			this.match(PGLParser.KW_SELECT);
			this.state = 285;
			this.target_list();
			this.state = 287;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 286;
				this.from_clause();
				}
			}

			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 289;
				this.where_clause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public target_list(): Target_listContext {
		let localctx: Target_listContext = new Target_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, PGLParser.RULE_target_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 292;
			this.target_el();
			this.state = 297;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 293;
				this.match(PGLParser.COMMA);
				this.state = 294;
				this.target_el();
				}
				}
				this.state = 299;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public target_el(): Target_elContext {
		let localctx: Target_elContext = new Target_elContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, PGLParser.RULE_target_el);
		try {
			this.state = 307;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
			case 3:
			case 10:
			case 11:
			case 12:
			case 13:
			case 17:
			case 22:
			case 23:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 76:
			case 77:
			case 78:
			case 85:
			case 97:
			case 98:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
				localctx = new Target_labelContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 300;
				this.a_expr();
				this.state = 304;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 7:
					{
					this.state = 301;
					this.match(PGLParser.KW_AS);
					this.state = 302;
					this.colLabel();
					}
					break;
				case 1:
				case 2:
				case 3:
				case 17:
				case 22:
				case 23:
				case 25:
				case 31:
				case 32:
				case 33:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				case 40:
				case 41:
				case 42:
				case 43:
				case 44:
				case 45:
				case 46:
				case 47:
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
				case 58:
				case 59:
				case 60:
				case 61:
				case 62:
				case 63:
				case 64:
				case 65:
				case 66:
				case 67:
				case 68:
				case 69:
				case 70:
				case 71:
				case 72:
				case 73:
				case 74:
				case 76:
				case 77:
				case 78:
				case 105:
				case 106:
					{
					this.state = 303;
					this.colid();
					}
					break;
				case 5:
				case 6:
				case 81:
				case 88:
					break;
				default:
					break;
				}
				}
				break;
			case 84:
				localctx = new Target_starContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 306;
				this.match(PGLParser.STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public from_clause(): From_clauseContext {
		let localctx: From_clauseContext = new From_clauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, PGLParser.RULE_from_clause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 309;
			this.match(PGLParser.KW_FROM);
			this.state = 310;
			this.from_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public from_list(): From_listContext {
		let localctx: From_listContext = new From_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, PGLParser.RULE_from_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 312;
			this.table_ref();
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 313;
				this.match(PGLParser.COMMA);
				this.state = 314;
				this.table_ref();
				}
				}
				this.state = 319;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public table_ref(): Table_refContext {
		let localctx: Table_refContext = new Table_refContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, PGLParser.RULE_table_ref);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 320;
			this.relation_expr();
			this.state = 324;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
				{
				this.state = 321;
				this.match(PGLParser.KW_AS);
				this.state = 322;
				this.colLabel();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 17:
			case 22:
			case 23:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 76:
			case 77:
			case 78:
			case 105:
			case 106:
				{
				this.state = 323;
				this.colid();
				}
				break;
			case 6:
			case 81:
			case 88:
				break;
			default:
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public relation_expr(): Relation_exprContext {
		let localctx: Relation_exprContext = new Relation_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, PGLParser.RULE_relation_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 326;
			this.qualified_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public where_clause(): Where_clauseContext {
		let localctx: Where_clauseContext = new Where_clauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, PGLParser.RULE_where_clause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 328;
			this.match(PGLParser.KW_WHERE);
			this.state = 329;
			this.a_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr(): A_exprContext {
		let localctx: A_exprContext = new A_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, PGLParser.RULE_a_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 331;
			this.a_expr_or();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_or(): A_expr_orContext {
		let localctx: A_expr_orContext = new A_expr_orContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, PGLParser.RULE_a_expr_or);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 333;
			this.a_expr_and();
			this.state = 338;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===9) {
				{
				{
				this.state = 334;
				this.match(PGLParser.KW_OR);
				this.state = 335;
				this.a_expr_and();
				}
				}
				this.state = 340;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_and(): A_expr_andContext {
		let localctx: A_expr_andContext = new A_expr_andContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, PGLParser.RULE_a_expr_and);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 341;
			this.a_expr_between();
			this.state = 346;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 342;
				this.match(PGLParser.KW_AND);
				this.state = 343;
				this.a_expr_between();
				}
				}
				this.state = 348;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_between(): A_expr_betweenContext {
		let localctx: A_expr_betweenContext = new A_expr_betweenContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, PGLParser.RULE_a_expr_between);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 349;
			this.a_expr_in();
			this.state = 358;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 351;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 350;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 353;
				this.match(PGLParser.KW_BETWEEN);
				this.state = 354;
				this.a_expr_in();
				this.state = 355;
				this.match(PGLParser.KW_AND);
				this.state = 356;
				this.a_expr_in();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_in(): A_expr_inContext {
		let localctx: A_expr_inContext = new A_expr_inContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, PGLParser.RULE_a_expr_in);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 360;
			this.a_expr_unary_not();
			this.state = 377;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				{
				this.state = 362;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 361;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 364;
				this.match(PGLParser.KW_IN);
				this.state = 365;
				this.match(PGLParser.L_PAREN);
				this.state = 374;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2193767438) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967167) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2127871) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 1011) !== 0)) {
					{
					this.state = 366;
					this.a_expr();
					this.state = 371;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===81) {
						{
						{
						this.state = 367;
						this.match(PGLParser.COMMA);
						this.state = 368;
						this.a_expr();
						}
						}
						this.state = 373;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 376;
				this.match(PGLParser.R_PAREN);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_unary_not(): A_expr_unary_notContext {
		let localctx: A_expr_unary_notContext = new A_expr_unary_notContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, PGLParser.RULE_a_expr_unary_not);
		try {
			this.state = 382;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 379;
				this.match(PGLParser.KW_NOT);
				this.state = 380;
				this.a_expr_unary_not();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 11:
			case 12:
			case 13:
			case 17:
			case 22:
			case 23:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 76:
			case 77:
			case 78:
			case 85:
			case 97:
			case 98:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 381;
				this.a_expr_isnull();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_isnull(): A_expr_isnullContext {
		let localctx: A_expr_isnullContext = new A_expr_isnullContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, PGLParser.RULE_a_expr_isnull);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 384;
			this.a_expr_is_not();
			this.state = 390;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===14) {
				{
				this.state = 385;
				this.match(PGLParser.KW_IS);
				this.state = 387;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 386;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 389;
				this.match(PGLParser.KW_NULL);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_is_not(): A_expr_is_notContext {
		let localctx: A_expr_is_notContext = new A_expr_is_notContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, PGLParser.RULE_a_expr_is_not);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 392;
			this.a_expr_compare();
			this.state = 398;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				{
				this.state = 393;
				this.match(PGLParser.KW_IS);
				this.state = 395;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 394;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 397;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 14336) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_compare(): A_expr_compareContext {
		let localctx: A_expr_compareContext = new A_expr_compareContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, PGLParser.RULE_a_expr_compare);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 400;
			this.a_expr_like();
			this.state = 403;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 63) !== 0)) {
				{
				this.state = 401;
				_la = this._input.LA(1);
				if(!(((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & 63) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 402;
				this.a_expr_like();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_like(): A_expr_likeContext {
		let localctx: A_expr_likeContext = new A_expr_likeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, PGLParser.RULE_a_expr_like);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 405;
			this.a_expr_add();
			this.state = 411;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				{
				this.state = 407;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 406;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 409;
				this.match(PGLParser.KW_LIKE);
				this.state = 410;
				this.a_expr_add();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_add(): A_expr_addContext {
		let localctx: A_expr_addContext = new A_expr_addContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, PGLParser.RULE_a_expr_add);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 413;
			this.a_expr_mul();
			this.state = 418;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===97 || _la===98) {
				{
				{
				this.state = 414;
				_la = this._input.LA(1);
				if(!(_la===97 || _la===98)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 415;
				this.a_expr_mul();
				}
				}
				this.state = 420;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_mul(): A_expr_mulContext {
		let localctx: A_expr_mulContext = new A_expr_mulContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, PGLParser.RULE_a_expr_mul);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 421;
			this.a_expr_unary();
			this.state = 426;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 84)) & ~0x1F) === 0 && ((1 << (_la - 84)) & 98305) !== 0)) {
				{
				{
				this.state = 422;
				_la = this._input.LA(1);
				if(!(((((_la - 84)) & ~0x1F) === 0 && ((1 << (_la - 84)) & 98305) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 423;
				this.a_expr_unary();
				}
				}
				this.state = 428;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public a_expr_unary(): A_expr_unaryContext {
		let localctx: A_expr_unaryContext = new A_expr_unaryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, PGLParser.RULE_a_expr_unary);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 430;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===97 || _la===98) {
				{
				this.state = 429;
				_la = this._input.LA(1);
				if(!(_la===97 || _la===98)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 432;
			this.c_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public c_expr(): C_exprContext {
		let localctx: C_exprContext = new C_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, PGLParser.RULE_c_expr);
		try {
			this.state = 444;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 101:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 434;
				this.match(PGLParser.DOLLAR_LCURLY);
				this.state = 435;
				this.pgl_expr();
				this.state = 436;
				this.match(PGLParser.R_CURLY);
				}
				break;
			case 1:
			case 2:
			case 3:
			case 17:
			case 22:
			case 23:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 76:
			case 77:
			case 78:
			case 105:
			case 106:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 438;
				this.columnref_or_pgl_dollar_ident_ref();
				}
				break;
			case 11:
			case 12:
			case 13:
			case 102:
			case 103:
			case 104:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 439;
				this.aexprconst();
				}
				break;
			case 85:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 440;
				this.match(PGLParser.L_PAREN);
				this.state = 441;
				this.a_expr();
				this.state = 442;
				this.match(PGLParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pgl_expr(): Pgl_exprContext {
		let localctx: Pgl_exprContext = new Pgl_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, PGLParser.RULE_pgl_expr);
		try {
			this.state = 449;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 446;
				this.pgl_query_call();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 447;
				this.pgl_ident_ref();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 448;
				this.aexprconst();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pgl_ident_ref(): Pgl_ident_refContext {
		let localctx: Pgl_ident_refContext = new Pgl_ident_refContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, PGLParser.RULE_pgl_ident_ref);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 451;
			this.qualified_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pgl_query_call(): Pgl_query_callContext {
		let localctx: Pgl_query_callContext = new Pgl_query_callContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, PGLParser.RULE_pgl_query_call);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 453;
			this.qualified_name();
			this.state = 455;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===79) {
				{
				this.state = 454;
				this.type_argument_list();
				}
			}

			this.state = 457;
			this.match(PGLParser.L_PAREN);
			this.state = 466;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2193766414) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967167) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 30719) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 31) !== 0)) {
				{
				this.state = 458;
				this.pgl_expr();
				this.state = 463;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===81) {
					{
					{
					this.state = 459;
					this.match(PGLParser.COMMA);
					this.state = 460;
					this.pgl_expr();
					}
					}
					this.state = 465;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 468;
			this.match(PGLParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_argument_list(): Type_argument_listContext {
		let localctx: Type_argument_listContext = new Type_argument_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, PGLParser.RULE_type_argument_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 470;
			this.match(PGLParser.COLONCOLON);
			this.state = 471;
			this.match(PGLParser.LT);
			this.state = 472;
			this.type_expression();
			this.state = 477;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 473;
				this.match(PGLParser.COMMA);
				this.state = 474;
				this.type_expression();
				}
				}
				this.state = 479;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 480;
			this.match(PGLParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public columnref_or_pgl_dollar_ident_ref(): Columnref_or_pgl_dollar_ident_refContext {
		let localctx: Columnref_or_pgl_dollar_ident_refContext = new Columnref_or_pgl_dollar_ident_refContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, PGLParser.RULE_columnref_or_pgl_dollar_ident_ref);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 482;
			this.colid();
			this.state = 490;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===82) {
				{
				{
				this.state = 483;
				this.match(PGLParser.DOT);
				this.state = 486;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 1:
				case 2:
				case 3:
				case 17:
				case 22:
				case 23:
				case 25:
				case 31:
				case 32:
				case 33:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				case 40:
				case 41:
				case 42:
				case 43:
				case 44:
				case 45:
				case 46:
				case 47:
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
				case 58:
				case 59:
				case 60:
				case 61:
				case 62:
				case 63:
				case 64:
				case 65:
				case 66:
				case 67:
				case 68:
				case 69:
				case 70:
				case 71:
				case 72:
				case 73:
				case 74:
				case 76:
				case 77:
				case 78:
				case 105:
				case 106:
					{
					this.state = 484;
					this.colid();
					}
					break;
				case 84:
					{
					this.state = 485;
					this.match(PGLParser.STAR);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 492;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public aexprconst(): AexprconstContext {
		let localctx: AexprconstContext = new AexprconstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, PGLParser.RULE_aexprconst);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 493;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 14336) !== 0) || ((((_la - 102)) & ~0x1F) === 0 && ((1 << (_la - 102)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_def(): Type_defContext {
		let localctx: Type_defContext = new Type_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, PGLParser.RULE_type_def);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 495;
			this.match(PGLParser.KW_TYPE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_expression(): Type_expressionContext {
		let localctx: Type_expressionContext = new Type_expressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, PGLParser.RULE_type_expression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 497;
			this.type_ref();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_ref(): Type_refContext {
		let localctx: Type_refContext = new Type_refContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, PGLParser.RULE_type_ref);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 499;
			this.pgl_ident_ref();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public database_def(): Database_defContext {
		let localctx: Database_defContext = new Database_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, PGLParser.RULE_database_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 501;
			this.match(PGLParser.KW_DATABASE);
			this.state = 502;
			this.match(PGLParser.L_CURLY);
			this.state = 506;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===18) {
				{
				{
				this.state = 503;
				this.ddl_statement();
				}
				}
				this.state = 508;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 509;
			this.match(PGLParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ddl_statement(): Ddl_statementContext {
		let localctx: Ddl_statementContext = new Ddl_statementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, PGLParser.RULE_ddl_statement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 511;
			this.createstmt();
			this.state = 512;
			this.match(PGLParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public createstmt(): CreatestmtContext {
		let localctx: CreatestmtContext = new CreatestmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, PGLParser.RULE_createstmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 514;
			this.match(PGLParser.KW_CREATE);
			this.state = 516;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & 31) !== 0)) {
				{
				this.state = 515;
				this.opttemp();
				}
			}

			this.state = 518;
			this.match(PGLParser.KW_TABLE);
			this.state = 522;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				{
				this.state = 519;
				this.match(PGLParser.KW_IF);
				this.state = 520;
				this.match(PGLParser.KW_NOT);
				this.state = 521;
				this.match(PGLParser.KW_EXISTS);
				}
				break;
			}
			this.state = 524;
			this.qualified_name();
			this.state = 525;
			this.match(PGLParser.L_PAREN);
			this.state = 527;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2415001614) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967167) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 30719) !== 0) || _la===105 || _la===106) {
				{
				this.state = 526;
				this.tableelementlist();
				}
			}

			this.state = 529;
			this.match(PGLParser.R_PAREN);
			this.state = 531;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===48) {
				{
				this.state = 530;
				this.optinherit();
				}
			}

			this.state = 534;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===49) {
				{
				this.state = 533;
				this.optpartitionspec();
				}
			}

			this.state = 537;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===51) {
				{
				this.state = 536;
				this.table_access_method_clause();
				}
			}

			this.state = 540;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===75 || _la===76) {
				{
				this.state = 539;
				this.optwith();
				}
			}

			this.state = 543;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===30) {
				{
				this.state = 542;
				this.oncommitoption();
				}
			}

			this.state = 546;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===57) {
				{
				this.state = 545;
				this.opttablespace();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public opttemp(): OpttempContext {
		let localctx: OpttempContext = new OpttempContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, PGLParser.RULE_opttemp);
		let _la: number;
		try {
			this.state = 553;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 43:
			case 44:
			case 46:
			case 47:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 549;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===46 || _la===47) {
					{
					this.state = 548;
					_la = this._input.LA(1);
					if(!(_la===46 || _la===47)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				this.state = 551;
				_la = this._input.LA(1);
				if(!(_la===43 || _la===44)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 45:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 552;
				this.match(PGLParser.KW_UNLOGGED);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public optinherit(): OptinheritContext {
		let localctx: OptinheritContext = new OptinheritContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, PGLParser.RULE_optinherit);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 555;
			this.match(PGLParser.KW_INHERITS);
			this.state = 556;
			this.match(PGLParser.L_PAREN);
			this.state = 557;
			this.qualified_name_list();
			this.state = 558;
			this.match(PGLParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualified_name_list(): Qualified_name_listContext {
		let localctx: Qualified_name_listContext = new Qualified_name_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, PGLParser.RULE_qualified_name_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 560;
			this.qualified_name();
			this.state = 565;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 561;
				this.match(PGLParser.COMMA);
				this.state = 562;
				this.qualified_name();
				}
				}
				this.state = 567;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public optpartitionspec(): OptpartitionspecContext {
		let localctx: OptpartitionspecContext = new OptpartitionspecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, PGLParser.RULE_optpartitionspec);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 568;
			this.match(PGLParser.KW_PARTITION);
			this.state = 569;
			this.match(PGLParser.KW_BY);
			this.state = 570;
			this.colid();
			this.state = 571;
			this.match(PGLParser.L_PAREN);
			this.state = 572;
			this.part_params();
			this.state = 573;
			this.match(PGLParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public part_params(): Part_paramsContext {
		let localctx: Part_paramsContext = new Part_paramsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, PGLParser.RULE_part_params);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 575;
			this.part_elem();
			this.state = 580;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 576;
				this.match(PGLParser.COMMA);
				this.state = 577;
				this.part_elem();
				}
				}
				this.state = 582;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public part_elem(): Part_elemContext {
		let localctx: Part_elemContext = new Part_elemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, PGLParser.RULE_part_elem);
		try {
			this.state = 588;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
			case 3:
			case 17:
			case 22:
			case 23:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 76:
			case 77:
			case 78:
			case 105:
			case 106:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 583;
				this.colid();
				}
				break;
			case 85:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 584;
				this.match(PGLParser.L_PAREN);
				this.state = 585;
				this.a_expr();
				this.state = 586;
				this.match(PGLParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public table_access_method_clause(): Table_access_method_clauseContext {
		let localctx: Table_access_method_clauseContext = new Table_access_method_clauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, PGLParser.RULE_table_access_method_clause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 590;
			this.match(PGLParser.KW_USING);
			this.state = 591;
			this.colid();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public optwith(): OptwithContext {
		let localctx: OptwithContext = new OptwithContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, PGLParser.RULE_optwith);
		try {
			this.state = 597;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 75:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 593;
				this.match(PGLParser.KW_WITH);
				this.state = 594;
				this.reloptions();
				}
				break;
			case 76:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 595;
				this.match(PGLParser.KW_WITHOUT);
				this.state = 596;
				this.match(PGLParser.KW_OIDS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public reloptions(): ReloptionsContext {
		let localctx: ReloptionsContext = new ReloptionsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, PGLParser.RULE_reloptions);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 599;
			this.match(PGLParser.L_PAREN);
			this.state = 600;
			this.reloption_elem();
			this.state = 605;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 601;
				this.match(PGLParser.COMMA);
				this.state = 602;
				this.reloption_elem();
				}
				}
				this.state = 607;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 608;
			this.match(PGLParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public reloption_elem(): Reloption_elemContext {
		let localctx: Reloption_elemContext = new Reloption_elemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, PGLParser.RULE_reloption_elem);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 610;
			this.colLabel();
			this.state = 616;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===91) {
				{
				this.state = 611;
				this.match(PGLParser.EQ);
				this.state = 614;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 11:
				case 12:
				case 13:
				case 102:
				case 103:
				case 104:
					{
					this.state = 612;
					this.aexprconst();
					}
					break;
				case 1:
				case 2:
				case 3:
				case 17:
				case 22:
				case 23:
				case 25:
				case 31:
				case 32:
				case 33:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				case 40:
				case 41:
				case 42:
				case 43:
				case 44:
				case 45:
				case 46:
				case 47:
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
				case 58:
				case 59:
				case 60:
				case 61:
				case 62:
				case 63:
				case 64:
				case 65:
				case 66:
				case 67:
				case 68:
				case 69:
				case 70:
				case 71:
				case 72:
				case 73:
				case 74:
				case 76:
				case 77:
				case 78:
				case 105:
				case 106:
					{
					this.state = 613;
					this.colid();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public oncommitoption(): OncommitoptionContext {
		let localctx: OncommitoptionContext = new OncommitoptionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, PGLParser.RULE_oncommitoption);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 618;
			this.match(PGLParser.KW_ON);
			this.state = 619;
			this.match(PGLParser.KW_COMMIT);
			this.state = 625;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 54:
				{
				this.state = 620;
				this.match(PGLParser.KW_DROP);
				}
				break;
			case 31:
				{
				this.state = 621;
				this.match(PGLParser.KW_DELETE);
				this.state = 622;
				this.match(PGLParser.KW_ROWS);
				}
				break;
			case 55:
				{
				this.state = 623;
				this.match(PGLParser.KW_PRESERVE);
				this.state = 624;
				this.match(PGLParser.KW_ROWS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public opttablespace(): OpttablespaceContext {
		let localctx: OpttablespaceContext = new OpttablespaceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, PGLParser.RULE_opttablespace);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 627;
			this.match(PGLParser.KW_TABLESPACE);
			this.state = 628;
			this.colid();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tableelementlist(): TableelementlistContext {
		let localctx: TableelementlistContext = new TableelementlistContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, PGLParser.RULE_tableelementlist);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 630;
			this.tableelement();
			this.state = 635;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 631;
				this.match(PGLParser.COMMA);
				this.state = 632;
				this.tableelement();
				}
				}
				this.state = 637;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tableelement(): TableelementContext {
		let localctx: TableelementContext = new TableelementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, PGLParser.RULE_tableelement);
		try {
			this.state = 640;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
			case 21:
			case 24:
			case 26:
			case 27:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 638;
				this.tableconstraint();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 17:
			case 22:
			case 23:
			case 25:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 76:
			case 77:
			case 78:
			case 105:
			case 106:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 639;
				this.columnDef();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public columnDef(): ColumnDefContext {
		let localctx: ColumnDefContext = new ColumnDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, PGLParser.RULE_columnDef);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 642;
			this.colid();
			this.state = 643;
			this.typename();
			this.state = 644;
			this.colquallist();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public colquallist(): ColquallistContext {
		let localctx: ColquallistContext = new ColquallistContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, PGLParser.RULE_colquallist);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 649;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 892347392) !== 0)) {
				{
				{
				this.state = 646;
				this.colconstraint();
				}
				}
				this.state = 651;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public colconstraint(): ColconstraintContext {
		let localctx: ColconstraintContext = new ColconstraintContext(this, this._ctx, this.state);
		this.enterRule(localctx, 138, PGLParser.RULE_colconstraint);
		try {
			this.state = 657;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 652;
				this.match(PGLParser.KW_CONSTRAINT);
				this.state = 653;
				this.colid();
				this.state = 654;
				this.colconstraintelem();
				}
				break;
			case 10:
			case 13:
			case 21:
			case 24:
			case 26:
			case 28:
			case 29:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 656;
				this.colconstraintelem();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public colconstraintelem(): ColconstraintelemContext {
		let localctx: ColconstraintelemContext = new ColconstraintelemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 140, PGLParser.RULE_colconstraintelem);
		let _la: number;
		try {
			this.state = 686;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				localctx = new Col_not_nullContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 659;
				this.match(PGLParser.KW_NOT);
				this.state = 660;
				this.match(PGLParser.KW_NULL);
				}
				break;
			case 13:
				localctx = new Col_nullContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 661;
				this.match(PGLParser.KW_NULL);
				}
				break;
			case 24:
				localctx = new Col_primary_keyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 662;
				this.match(PGLParser.KW_PRIMARY);
				this.state = 663;
				this.match(PGLParser.KW_KEY);
				}
				break;
			case 26:
				localctx = new Col_uniqueContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 664;
				this.match(PGLParser.KW_UNIQUE);
				}
				break;
			case 21:
				localctx = new Col_checkContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 665;
				this.match(PGLParser.KW_CHECK);
				this.state = 666;
				this.match(PGLParser.L_PAREN);
				this.state = 667;
				this.a_expr();
				this.state = 668;
				this.match(PGLParser.R_PAREN);
				}
				break;
			case 29:
				localctx = new Col_defaultContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 670;
				this.match(PGLParser.KW_DEFAULT);
				this.state = 671;
				this.a_expr();
				}
				break;
			case 28:
				localctx = new Col_referencesContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 672;
				this.match(PGLParser.KW_REFERENCES);
				this.state = 673;
				this.qualified_name();
				this.state = 678;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===85) {
					{
					this.state = 674;
					this.match(PGLParser.L_PAREN);
					this.state = 675;
					this.columnlist();
					this.state = 676;
					this.match(PGLParser.R_PAREN);
					}
				}

				this.state = 681;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===38) {
					{
					this.state = 680;
					this.key_match();
					}
				}

				this.state = 684;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===30) {
					{
					this.state = 683;
					this.key_actions();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tableconstraint(): TableconstraintContext {
		let localctx: TableconstraintContext = new TableconstraintContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, PGLParser.RULE_tableconstraint);
		try {
			this.state = 693;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 688;
				this.match(PGLParser.KW_CONSTRAINT);
				this.state = 689;
				this.colid();
				this.state = 690;
				this.constraintelem();
				}
				break;
			case 21:
			case 24:
			case 26:
			case 27:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 692;
				this.constraintelem();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constraintelem(): ConstraintelemContext {
		let localctx: ConstraintelemContext = new ConstraintelemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 144, PGLParser.RULE_constraintelem);
		let _la: number;
		try {
			this.state = 730;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 21:
				localctx = new Tbl_checkContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 695;
				this.match(PGLParser.KW_CHECK);
				this.state = 696;
				this.match(PGLParser.L_PAREN);
				this.state = 697;
				this.a_expr();
				this.state = 698;
				this.match(PGLParser.R_PAREN);
				}
				break;
			case 26:
				localctx = new Tbl_uniqueContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 700;
				this.match(PGLParser.KW_UNIQUE);
				this.state = 701;
				this.match(PGLParser.L_PAREN);
				this.state = 702;
				this.columnlist();
				this.state = 703;
				this.match(PGLParser.R_PAREN);
				}
				break;
			case 24:
				localctx = new Tbl_primary_keyContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 705;
				this.match(PGLParser.KW_PRIMARY);
				this.state = 706;
				this.match(PGLParser.KW_KEY);
				this.state = 707;
				this.match(PGLParser.L_PAREN);
				this.state = 708;
				this.columnlist();
				this.state = 709;
				this.match(PGLParser.R_PAREN);
				}
				break;
			case 27:
				localctx = new Tbl_foreign_keyContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 711;
				this.match(PGLParser.KW_FOREIGN);
				this.state = 712;
				this.match(PGLParser.KW_KEY);
				this.state = 713;
				this.match(PGLParser.L_PAREN);
				this.state = 714;
				this.columnlist();
				this.state = 715;
				this.match(PGLParser.R_PAREN);
				this.state = 716;
				this.match(PGLParser.KW_REFERENCES);
				this.state = 717;
				this.qualified_name();
				this.state = 722;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===85) {
					{
					this.state = 718;
					this.match(PGLParser.L_PAREN);
					this.state = 719;
					this.columnlist();
					this.state = 720;
					this.match(PGLParser.R_PAREN);
					}
				}

				this.state = 725;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===38) {
					{
					this.state = 724;
					this.key_match();
					}
				}

				this.state = 728;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===30) {
					{
					this.state = 727;
					this.key_actions();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public columnlist(): ColumnlistContext {
		let localctx: ColumnlistContext = new ColumnlistContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, PGLParser.RULE_columnlist);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 732;
			this.columnElem();
			this.state = 737;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 733;
				this.match(PGLParser.COMMA);
				this.state = 734;
				this.columnElem();
				}
				}
				this.state = 739;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public columnElem(): ColumnElemContext {
		let localctx: ColumnElemContext = new ColumnElemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 148, PGLParser.RULE_columnElem);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 740;
			this.colid();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key_match(): Key_matchContext {
		let localctx: Key_matchContext = new Key_matchContext(this, this._ctx, this.state);
		this.enterRule(localctx, 150, PGLParser.RULE_key_match);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 742;
			this.match(PGLParser.KW_MATCH);
			this.state = 743;
			_la = this._input.LA(1);
			if(!(((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key_actions(): Key_actionsContext {
		let localctx: Key_actionsContext = new Key_actionsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 152, PGLParser.RULE_key_actions);
		try {
			this.state = 753;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 745;
				this.key_update();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 746;
				this.key_delete();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 747;
				this.key_update();
				this.state = 748;
				this.key_delete();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 750;
				this.key_delete();
				this.state = 751;
				this.key_update();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key_update(): Key_updateContext {
		let localctx: Key_updateContext = new Key_updateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 154, PGLParser.RULE_key_update);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 755;
			this.match(PGLParser.KW_ON);
			this.state = 756;
			this.match(PGLParser.KW_UPDATE);
			this.state = 757;
			this.key_action();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key_delete(): Key_deleteContext {
		let localctx: Key_deleteContext = new Key_deleteContext(this, this._ctx, this.state);
		this.enterRule(localctx, 156, PGLParser.RULE_key_delete);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 759;
			this.match(PGLParser.KW_ON);
			this.state = 760;
			this.match(PGLParser.KW_DELETE);
			this.state = 761;
			this.key_action();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key_action(): Key_actionContext {
		let localctx: Key_actionContext = new Key_actionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 158, PGLParser.RULE_key_action);
		try {
			this.state = 771;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 84, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 763;
				this.match(PGLParser.KW_NO);
				this.state = 764;
				this.match(PGLParser.KW_ACTION);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 765;
				this.match(PGLParser.KW_RESTRICT);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 766;
				this.match(PGLParser.KW_CASCADE);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 767;
				this.match(PGLParser.KW_SET);
				this.state = 768;
				this.match(PGLParser.KW_NULL);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 769;
				this.match(PGLParser.KW_SET);
				this.state = 770;
				this.match(PGLParser.KW_DEFAULT);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typename(): TypenameContext {
		let localctx: TypenameContext = new TypenameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 160, PGLParser.RULE_typename);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 774;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===42) {
				{
				this.state = 773;
				this.match(PGLParser.KW_SETOF);
				}
			}

			this.state = 776;
			this.simpletypename();
			this.state = 777;
			this.opt_array_bounds();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public opt_array_bounds(): Opt_array_boundsContext {
		let localctx: Opt_array_boundsContext = new Opt_array_boundsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 162, PGLParser.RULE_opt_array_bounds);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 786;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===89) {
				{
				{
				this.state = 779;
				this.match(PGLParser.L_BRACKET);
				this.state = 781;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===102) {
					{
					this.state = 780;
					this.match(PGLParser.INTEGER_LITERAL);
					}
				}

				this.state = 783;
				this.match(PGLParser.R_BRACKET);
				}
				}
				this.state = 788;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simpletypename(): SimpletypenameContext {
		let localctx: SimpletypenameContext = new SimpletypenameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 164, PGLParser.RULE_simpletypename);
		try {
			this.state = 794;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 88, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 789;
				this.numeric();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 790;
				this.character();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 791;
				this.constdatetime();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 792;
				this.constinterval();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 793;
				this.generictype();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public numeric(): NumericContext {
		let localctx: NumericContext = new NumericContext(this, this._ctx, this.state);
		this.enterRule(localctx, 166, PGLParser.RULE_numeric);
		let _la: number;
		try {
			this.state = 830;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 58:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 796;
				this.match(PGLParser.KW_INT);
				}
				break;
			case 59:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 797;
				this.match(PGLParser.KW_INTEGER);
				}
				break;
			case 60:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 798;
				this.match(PGLParser.KW_SMALLINT);
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 799;
				this.match(PGLParser.KW_BIGINT);
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 800;
				this.match(PGLParser.KW_REAL);
				}
				break;
			case 63:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 801;
				this.match(PGLParser.KW_FLOAT);
				this.state = 805;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===85) {
					{
					this.state = 802;
					this.match(PGLParser.L_PAREN);
					this.state = 803;
					this.match(PGLParser.INTEGER_LITERAL);
					this.state = 804;
					this.match(PGLParser.R_PAREN);
					}
				}

				}
				break;
			case 64:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 807;
				this.match(PGLParser.KW_DOUBLE);
				this.state = 808;
				this.match(PGLParser.KW_PRECISION);
				}
				break;
			case 66:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 809;
				this.match(PGLParser.KW_DECIMAL);
				this.state = 817;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===85) {
					{
					this.state = 810;
					this.match(PGLParser.L_PAREN);
					this.state = 811;
					this.match(PGLParser.INTEGER_LITERAL);
					this.state = 814;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===81) {
						{
						this.state = 812;
						this.match(PGLParser.COMMA);
						this.state = 813;
						this.match(PGLParser.INTEGER_LITERAL);
						}
					}

					this.state = 816;
					this.match(PGLParser.R_PAREN);
					}
				}

				}
				break;
			case 67:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 819;
				this.match(PGLParser.KW_NUMERIC);
				this.state = 827;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===85) {
					{
					this.state = 820;
					this.match(PGLParser.L_PAREN);
					this.state = 821;
					this.match(PGLParser.INTEGER_LITERAL);
					this.state = 824;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===81) {
						{
						this.state = 822;
						this.match(PGLParser.COMMA);
						this.state = 823;
						this.match(PGLParser.INTEGER_LITERAL);
						}
					}

					this.state = 826;
					this.match(PGLParser.R_PAREN);
					}
				}

				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 829;
				this.match(PGLParser.KW_BOOLEAN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public character(): CharacterContext {
		let localctx: CharacterContext = new CharacterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 168, PGLParser.RULE_character);
		let _la: number;
		try {
			this.state = 847;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 69:
			case 70:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 832;
				_la = this._input.LA(1);
				if(!(_la===69 || _la===70)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 834;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===72) {
					{
					this.state = 833;
					this.match(PGLParser.KW_VARYING);
					}
				}

				this.state = 839;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===85) {
					{
					this.state = 836;
					this.match(PGLParser.L_PAREN);
					this.state = 837;
					this.match(PGLParser.INTEGER_LITERAL);
					this.state = 838;
					this.match(PGLParser.R_PAREN);
					}
				}

				}
				break;
			case 71:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 841;
				this.match(PGLParser.KW_VARCHAR);
				this.state = 845;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===85) {
					{
					this.state = 842;
					this.match(PGLParser.L_PAREN);
					this.state = 843;
					this.match(PGLParser.INTEGER_LITERAL);
					this.state = 844;
					this.match(PGLParser.R_PAREN);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constdatetime(): ConstdatetimeContext {
		let localctx: ConstdatetimeContext = new ConstdatetimeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 170, PGLParser.RULE_constdatetime);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 849;
			_la = this._input.LA(1);
			if(!(_la===73 || _la===74)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 853;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===85) {
				{
				this.state = 850;
				this.match(PGLParser.L_PAREN);
				this.state = 851;
				this.match(PGLParser.INTEGER_LITERAL);
				this.state = 852;
				this.match(PGLParser.R_PAREN);
				}
			}

			this.state = 856;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===75 || _la===76) {
				{
				this.state = 855;
				this.timezone_();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public timezone_(): Timezone_Context {
		let localctx: Timezone_Context = new Timezone_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 172, PGLParser.RULE_timezone_);
		try {
			this.state = 864;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 75:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 858;
				this.match(PGLParser.KW_WITH);
				this.state = 859;
				this.match(PGLParser.KW_TIME);
				this.state = 860;
				this.match(PGLParser.KW_ZONE);
				}
				break;
			case 76:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 861;
				this.match(PGLParser.KW_WITHOUT);
				this.state = 862;
				this.match(PGLParser.KW_TIME);
				this.state = 863;
				this.match(PGLParser.KW_ZONE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constinterval(): ConstintervalContext {
		let localctx: ConstintervalContext = new ConstintervalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 174, PGLParser.RULE_constinterval);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 866;
			this.match(PGLParser.KW_INTERVAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public generictype(): GenerictypeContext {
		let localctx: GenerictypeContext = new GenerictypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 176, PGLParser.RULE_generictype);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 868;
			this.type_function_name();
			this.state = 879;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===85) {
				{
				this.state = 869;
				this.match(PGLParser.L_PAREN);
				this.state = 870;
				this.match(PGLParser.INTEGER_LITERAL);
				this.state = 875;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===81) {
					{
					{
					this.state = 871;
					this.match(PGLParser.COMMA);
					this.state = 872;
					this.match(PGLParser.INTEGER_LITERAL);
					}
					}
					this.state = 877;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 878;
				this.match(PGLParser.R_PAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,110,882,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,
	2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,
	75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,
	7,82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,1,0,1,
	0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,5,3,5,192,8,5,1,6,1,6,1,6,3,
	6,197,8,6,1,7,1,7,1,7,1,7,1,7,3,7,204,8,7,1,8,1,8,3,8,208,8,8,1,9,4,9,211,
	8,9,11,9,12,9,212,1,10,1,10,1,10,3,10,218,8,10,1,11,1,11,1,12,5,12,223,
	8,12,10,12,12,12,226,9,12,1,12,1,12,1,13,1,13,1,13,3,13,233,8,13,1,14,1,
	14,1,14,3,14,238,8,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,5,15,
	249,8,15,10,15,12,15,252,9,15,1,15,1,15,1,16,1,16,1,16,1,16,5,16,260,8,
	16,10,16,12,16,263,9,16,1,16,3,16,266,8,16,3,16,268,8,16,1,16,1,16,1,17,
	1,17,1,17,3,17,275,8,17,1,18,1,18,1,18,1,18,1,18,1,18,3,18,283,8,18,1,19,
	1,19,1,19,3,19,288,8,19,1,19,3,19,291,8,19,1,20,1,20,1,20,5,20,296,8,20,
	10,20,12,20,299,9,20,1,21,1,21,1,21,1,21,3,21,305,8,21,1,21,3,21,308,8,
	21,1,22,1,22,1,22,1,23,1,23,1,23,5,23,316,8,23,10,23,12,23,319,9,23,1,24,
	1,24,1,24,1,24,3,24,325,8,24,1,25,1,25,1,26,1,26,1,26,1,27,1,27,1,28,1,
	28,1,28,5,28,337,8,28,10,28,12,28,340,9,28,1,29,1,29,1,29,5,29,345,8,29,
	10,29,12,29,348,9,29,1,30,1,30,3,30,352,8,30,1,30,1,30,1,30,1,30,1,30,3,
	30,359,8,30,1,31,1,31,3,31,363,8,31,1,31,1,31,1,31,1,31,1,31,5,31,370,8,
	31,10,31,12,31,373,9,31,3,31,375,8,31,1,31,3,31,378,8,31,1,32,1,32,1,32,
	3,32,383,8,32,1,33,1,33,1,33,3,33,388,8,33,1,33,3,33,391,8,33,1,34,1,34,
	1,34,3,34,396,8,34,1,34,3,34,399,8,34,1,35,1,35,1,35,3,35,404,8,35,1,36,
	1,36,3,36,408,8,36,1,36,1,36,3,36,412,8,36,1,37,1,37,1,37,5,37,417,8,37,
	10,37,12,37,420,9,37,1,38,1,38,1,38,5,38,425,8,38,10,38,12,38,428,9,38,
	1,39,3,39,431,8,39,1,39,1,39,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,
	40,1,40,3,40,445,8,40,1,41,1,41,1,41,3,41,450,8,41,1,42,1,42,1,43,1,43,
	3,43,456,8,43,1,43,1,43,1,43,1,43,5,43,462,8,43,10,43,12,43,465,9,43,3,
	43,467,8,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,5,44,476,8,44,10,44,12,44,
	479,9,44,1,44,1,44,1,45,1,45,1,45,1,45,3,45,487,8,45,5,45,489,8,45,10,45,
	12,45,492,9,45,1,46,1,46,1,47,1,47,1,48,1,48,1,49,1,49,1,50,1,50,1,50,5,
	50,505,8,50,10,50,12,50,508,9,50,1,50,1,50,1,51,1,51,1,51,1,52,1,52,3,52,
	517,8,52,1,52,1,52,1,52,1,52,3,52,523,8,52,1,52,1,52,1,52,3,52,528,8,52,
	1,52,1,52,3,52,532,8,52,1,52,3,52,535,8,52,1,52,3,52,538,8,52,1,52,3,52,
	541,8,52,1,52,3,52,544,8,52,1,52,3,52,547,8,52,1,53,3,53,550,8,53,1,53,
	1,53,3,53,554,8,53,1,54,1,54,1,54,1,54,1,54,1,55,1,55,1,55,5,55,564,8,55,
	10,55,12,55,567,9,55,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,57,1,57,1,57,
	5,57,579,8,57,10,57,12,57,582,9,57,1,58,1,58,1,58,1,58,1,58,3,58,589,8,
	58,1,59,1,59,1,59,1,60,1,60,1,60,1,60,3,60,598,8,60,1,61,1,61,1,61,1,61,
	5,61,604,8,61,10,61,12,61,607,9,61,1,61,1,61,1,62,1,62,1,62,1,62,3,62,615,
	8,62,3,62,617,8,62,1,63,1,63,1,63,1,63,1,63,1,63,1,63,3,63,626,8,63,1,64,
	1,64,1,64,1,65,1,65,1,65,5,65,634,8,65,10,65,12,65,637,9,65,1,66,1,66,3,
	66,641,8,66,1,67,1,67,1,67,1,67,1,68,5,68,648,8,68,10,68,12,68,651,9,68,
	1,69,1,69,1,69,1,69,1,69,3,69,658,8,69,1,70,1,70,1,70,1,70,1,70,1,70,1,
	70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,3,70,679,
	8,70,1,70,3,70,682,8,70,1,70,3,70,685,8,70,3,70,687,8,70,1,71,1,71,1,71,
	1,71,1,71,3,71,694,8,71,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,
	72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,
	1,72,1,72,1,72,3,72,723,8,72,1,72,3,72,726,8,72,1,72,3,72,729,8,72,3,72,
	731,8,72,1,73,1,73,1,73,5,73,736,8,73,10,73,12,73,739,9,73,1,74,1,74,1,
	75,1,75,1,75,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,3,76,754,8,76,1,77,
	1,77,1,77,1,77,1,78,1,78,1,78,1,78,1,79,1,79,1,79,1,79,1,79,1,79,1,79,1,
	79,3,79,772,8,79,1,80,3,80,775,8,80,1,80,1,80,1,80,1,81,1,81,3,81,782,8,
	81,1,81,5,81,785,8,81,10,81,12,81,788,9,81,1,82,1,82,1,82,1,82,1,82,3,82,
	795,8,82,1,83,1,83,1,83,1,83,1,83,1,83,1,83,1,83,1,83,3,83,806,8,83,1,83,
	1,83,1,83,1,83,1,83,1,83,1,83,3,83,815,8,83,1,83,3,83,818,8,83,1,83,1,83,
	1,83,1,83,1,83,3,83,825,8,83,1,83,3,83,828,8,83,1,83,3,83,831,8,83,1,84,
	1,84,3,84,835,8,84,1,84,1,84,1,84,3,84,840,8,84,1,84,1,84,1,84,1,84,3,84,
	846,8,84,3,84,848,8,84,1,85,1,85,1,85,1,85,3,85,854,8,85,1,85,3,85,857,
	8,85,1,86,1,86,1,86,1,86,1,86,1,86,3,86,865,8,86,1,87,1,87,1,88,1,88,1,
	88,1,88,1,88,5,88,874,8,88,10,88,12,88,877,9,88,1,88,3,88,880,8,88,1,88,
	0,0,89,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,
	46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,
	94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,
	132,134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,
	168,170,172,174,176,0,15,9,0,1,3,22,22,25,25,31,38,40,41,43,57,64,64,72,
	72,76,77,7,0,17,17,23,23,42,42,58,63,65,71,73,74,78,78,3,0,14,14,16,16,
	39,39,6,0,4,13,15,15,18,21,24,24,26,30,75,75,1,0,105,106,1,0,11,13,1,0,
	91,96,1,0,97,98,2,0,84,84,99,100,2,0,11,13,102,104,1,0,46,47,1,0,43,44,
	1,0,39,41,1,0,69,70,1,0,73,74,932,0,178,1,0,0,0,2,180,1,0,0,0,4,182,1,0,
	0,0,6,184,1,0,0,0,8,186,1,0,0,0,10,191,1,0,0,0,12,196,1,0,0,0,14,203,1,
	0,0,0,16,205,1,0,0,0,18,210,1,0,0,0,20,214,1,0,0,0,22,219,1,0,0,0,24,224,
	1,0,0,0,26,232,1,0,0,0,28,234,1,0,0,0,30,244,1,0,0,0,32,255,1,0,0,0,34,
	271,1,0,0,0,36,282,1,0,0,0,38,284,1,0,0,0,40,292,1,0,0,0,42,307,1,0,0,0,
	44,309,1,0,0,0,46,312,1,0,0,0,48,320,1,0,0,0,50,326,1,0,0,0,52,328,1,0,
	0,0,54,331,1,0,0,0,56,333,1,0,0,0,58,341,1,0,0,0,60,349,1,0,0,0,62,360,
	1,0,0,0,64,382,1,0,0,0,66,384,1,0,0,0,68,392,1,0,0,0,70,400,1,0,0,0,72,
	405,1,0,0,0,74,413,1,0,0,0,76,421,1,0,0,0,78,430,1,0,0,0,80,444,1,0,0,0,
	82,449,1,0,0,0,84,451,1,0,0,0,86,453,1,0,0,0,88,470,1,0,0,0,90,482,1,0,
	0,0,92,493,1,0,0,0,94,495,1,0,0,0,96,497,1,0,0,0,98,499,1,0,0,0,100,501,
	1,0,0,0,102,511,1,0,0,0,104,514,1,0,0,0,106,553,1,0,0,0,108,555,1,0,0,0,
	110,560,1,0,0,0,112,568,1,0,0,0,114,575,1,0,0,0,116,588,1,0,0,0,118,590,
	1,0,0,0,120,597,1,0,0,0,122,599,1,0,0,0,124,610,1,0,0,0,126,618,1,0,0,0,
	128,627,1,0,0,0,130,630,1,0,0,0,132,640,1,0,0,0,134,642,1,0,0,0,136,649,
	1,0,0,0,138,657,1,0,0,0,140,686,1,0,0,0,142,693,1,0,0,0,144,730,1,0,0,0,
	146,732,1,0,0,0,148,740,1,0,0,0,150,742,1,0,0,0,152,753,1,0,0,0,154,755,
	1,0,0,0,156,759,1,0,0,0,158,771,1,0,0,0,160,774,1,0,0,0,162,786,1,0,0,0,
	164,794,1,0,0,0,166,830,1,0,0,0,168,847,1,0,0,0,170,849,1,0,0,0,172,864,
	1,0,0,0,174,866,1,0,0,0,176,868,1,0,0,0,178,179,7,0,0,0,179,1,1,0,0,0,180,
	181,7,1,0,0,181,3,1,0,0,0,182,183,7,2,0,0,183,5,1,0,0,0,184,185,7,3,0,0,
	185,7,1,0,0,0,186,187,7,4,0,0,187,9,1,0,0,0,188,192,3,8,4,0,189,192,3,0,
	0,0,190,192,3,2,1,0,191,188,1,0,0,0,191,189,1,0,0,0,191,190,1,0,0,0,192,
	11,1,0,0,0,193,197,3,8,4,0,194,197,3,0,0,0,195,197,3,4,2,0,196,193,1,0,
	0,0,196,194,1,0,0,0,196,195,1,0,0,0,197,13,1,0,0,0,198,204,3,8,4,0,199,
	204,3,0,0,0,200,204,3,2,1,0,201,204,3,4,2,0,202,204,3,6,3,0,203,198,1,0,
	0,0,203,199,1,0,0,0,203,200,1,0,0,0,203,201,1,0,0,0,203,202,1,0,0,0,204,
	15,1,0,0,0,205,207,3,10,5,0,206,208,3,18,9,0,207,206,1,0,0,0,207,208,1,
	0,0,0,208,17,1,0,0,0,209,211,3,20,10,0,210,209,1,0,0,0,211,212,1,0,0,0,
	212,210,1,0,0,0,212,213,1,0,0,0,213,19,1,0,0,0,214,217,5,82,0,0,215,218,
	3,22,11,0,216,218,5,84,0,0,217,215,1,0,0,0,217,216,1,0,0,0,218,21,1,0,0,
	0,219,220,3,14,7,0,220,23,1,0,0,0,221,223,3,26,13,0,222,221,1,0,0,0,223,
	226,1,0,0,0,224,222,1,0,0,0,224,225,1,0,0,0,225,227,1,0,0,0,226,224,1,0,
	0,0,227,228,5,0,0,1,228,25,1,0,0,0,229,233,3,28,14,0,230,233,3,94,47,0,
	231,233,3,100,50,0,232,229,1,0,0,0,232,230,1,0,0,0,232,231,1,0,0,0,233,
	27,1,0,0,0,234,235,5,1,0,0,235,237,3,10,5,0,236,238,3,30,15,0,237,236,1,
	0,0,0,237,238,1,0,0,0,238,239,1,0,0,0,239,240,3,32,16,0,240,241,5,87,0,
	0,241,242,3,36,18,0,242,243,5,88,0,0,243,29,1,0,0,0,244,245,5,93,0,0,245,
	250,3,10,5,0,246,247,5,81,0,0,247,249,3,10,5,0,248,246,1,0,0,0,249,252,
	1,0,0,0,250,248,1,0,0,0,250,251,1,0,0,0,251,253,1,0,0,0,252,250,1,0,0,0,
	253,254,5,94,0,0,254,31,1,0,0,0,255,267,5,85,0,0,256,261,3,34,17,0,257,
	258,5,81,0,0,258,260,3,34,17,0,259,257,1,0,0,0,260,263,1,0,0,0,261,259,
	1,0,0,0,261,262,1,0,0,0,262,265,1,0,0,0,263,261,1,0,0,0,264,266,5,81,0,
	0,265,264,1,0,0,0,265,266,1,0,0,0,266,268,1,0,0,0,267,256,1,0,0,0,267,268,
	1,0,0,0,268,269,1,0,0,0,269,270,5,86,0,0,270,33,1,0,0,0,271,274,3,10,5,
	0,272,273,5,80,0,0,273,275,3,96,48,0,274,272,1,0,0,0,274,275,1,0,0,0,275,
	35,1,0,0,0,276,283,3,38,19,0,277,278,5,101,0,0,278,279,3,82,41,0,279,280,
	5,88,0,0,280,283,1,0,0,0,281,283,3,90,45,0,282,276,1,0,0,0,282,277,1,0,
	0,0,282,281,1,0,0,0,283,37,1,0,0,0,284,285,5,4,0,0,285,287,3,40,20,0,286,
	288,3,44,22,0,287,286,1,0,0,0,287,288,1,0,0,0,288,290,1,0,0,0,289,291,3,
	52,26,0,290,289,1,0,0,0,290,291,1,0,0,0,291,39,1,0,0,0,292,297,3,42,21,
	0,293,294,5,81,0,0,294,296,3,42,21,0,295,293,1,0,0,0,296,299,1,0,0,0,297,
	295,1,0,0,0,297,298,1,0,0,0,298,41,1,0,0,0,299,297,1,0,0,0,300,304,3,54,
	27,0,301,302,5,7,0,0,302,305,3,14,7,0,303,305,3,10,5,0,304,301,1,0,0,0,
	304,303,1,0,0,0,304,305,1,0,0,0,305,308,1,0,0,0,306,308,5,84,0,0,307,300,
	1,0,0,0,307,306,1,0,0,0,308,43,1,0,0,0,309,310,5,5,0,0,310,311,3,46,23,
	0,311,45,1,0,0,0,312,317,3,48,24,0,313,314,5,81,0,0,314,316,3,48,24,0,315,
	313,1,0,0,0,316,319,1,0,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,47,1,0,
	0,0,319,317,1,0,0,0,320,324,3,50,25,0,321,322,5,7,0,0,322,325,3,14,7,0,
	323,325,3,10,5,0,324,321,1,0,0,0,324,323,1,0,0,0,324,325,1,0,0,0,325,49,
	1,0,0,0,326,327,3,16,8,0,327,51,1,0,0,0,328,329,5,6,0,0,329,330,3,54,27,
	0,330,53,1,0,0,0,331,332,3,56,28,0,332,55,1,0,0,0,333,338,3,58,29,0,334,
	335,5,9,0,0,335,337,3,58,29,0,336,334,1,0,0,0,337,340,1,0,0,0,338,336,1,
	0,0,0,338,339,1,0,0,0,339,57,1,0,0,0,340,338,1,0,0,0,341,346,3,60,30,0,
	342,343,5,8,0,0,343,345,3,60,30,0,344,342,1,0,0,0,345,348,1,0,0,0,346,344,
	1,0,0,0,346,347,1,0,0,0,347,59,1,0,0,0,348,346,1,0,0,0,349,358,3,62,31,
	0,350,352,5,10,0,0,351,350,1,0,0,0,351,352,1,0,0,0,352,353,1,0,0,0,353,
	354,5,17,0,0,354,355,3,62,31,0,355,356,5,8,0,0,356,357,3,62,31,0,357,359,
	1,0,0,0,358,351,1,0,0,0,358,359,1,0,0,0,359,61,1,0,0,0,360,377,3,64,32,
	0,361,363,5,10,0,0,362,361,1,0,0,0,362,363,1,0,0,0,363,364,1,0,0,0,364,
	365,5,15,0,0,365,374,5,85,0,0,366,371,3,54,27,0,367,368,5,81,0,0,368,370,
	3,54,27,0,369,367,1,0,0,0,370,373,1,0,0,0,371,369,1,0,0,0,371,372,1,0,0,
	0,372,375,1,0,0,0,373,371,1,0,0,0,374,366,1,0,0,0,374,375,1,0,0,0,375,376,
	1,0,0,0,376,378,5,86,0,0,377,362,1,0,0,0,377,378,1,0,0,0,378,63,1,0,0,0,
	379,380,5,10,0,0,380,383,3,64,32,0,381,383,3,66,33,0,382,379,1,0,0,0,382,
	381,1,0,0,0,383,65,1,0,0,0,384,390,3,68,34,0,385,387,5,14,0,0,386,388,5,
	10,0,0,387,386,1,0,0,0,387,388,1,0,0,0,388,389,1,0,0,0,389,391,5,13,0,0,
	390,385,1,0,0,0,390,391,1,0,0,0,391,67,1,0,0,0,392,398,3,70,35,0,393,395,
	5,14,0,0,394,396,5,10,0,0,395,394,1,0,0,0,395,396,1,0,0,0,396,397,1,0,0,
	0,397,399,7,5,0,0,398,393,1,0,0,0,398,399,1,0,0,0,399,69,1,0,0,0,400,403,
	3,72,36,0,401,402,7,6,0,0,402,404,3,72,36,0,403,401,1,0,0,0,403,404,1,0,
	0,0,404,71,1,0,0,0,405,411,3,74,37,0,406,408,5,10,0,0,407,406,1,0,0,0,407,
	408,1,0,0,0,408,409,1,0,0,0,409,410,5,16,0,0,410,412,3,74,37,0,411,407,
	1,0,0,0,411,412,1,0,0,0,412,73,1,0,0,0,413,418,3,76,38,0,414,415,7,7,0,
	0,415,417,3,76,38,0,416,414,1,0,0,0,417,420,1,0,0,0,418,416,1,0,0,0,418,
	419,1,0,0,0,419,75,1,0,0,0,420,418,1,0,0,0,421,426,3,78,39,0,422,423,7,
	8,0,0,423,425,3,78,39,0,424,422,1,0,0,0,425,428,1,0,0,0,426,424,1,0,0,0,
	426,427,1,0,0,0,427,77,1,0,0,0,428,426,1,0,0,0,429,431,7,7,0,0,430,429,
	1,0,0,0,430,431,1,0,0,0,431,432,1,0,0,0,432,433,3,80,40,0,433,79,1,0,0,
	0,434,435,5,101,0,0,435,436,3,82,41,0,436,437,5,88,0,0,437,445,1,0,0,0,
	438,445,3,90,45,0,439,445,3,92,46,0,440,441,5,85,0,0,441,442,3,54,27,0,
	442,443,5,86,0,0,443,445,1,0,0,0,444,434,1,0,0,0,444,438,1,0,0,0,444,439,
	1,0,0,0,444,440,1,0,0,0,445,81,1,0,0,0,446,450,3,86,43,0,447,450,3,84,42,
	0,448,450,3,92,46,0,449,446,1,0,0,0,449,447,1,0,0,0,449,448,1,0,0,0,450,
	83,1,0,0,0,451,452,3,16,8,0,452,85,1,0,0,0,453,455,3,16,8,0,454,456,3,88,
	44,0,455,454,1,0,0,0,455,456,1,0,0,0,456,457,1,0,0,0,457,466,5,85,0,0,458,
	463,3,82,41,0,459,460,5,81,0,0,460,462,3,82,41,0,461,459,1,0,0,0,462,465,
	1,0,0,0,463,461,1,0,0,0,463,464,1,0,0,0,464,467,1,0,0,0,465,463,1,0,0,0,
	466,458,1,0,0,0,466,467,1,0,0,0,467,468,1,0,0,0,468,469,5,86,0,0,469,87,
	1,0,0,0,470,471,5,79,0,0,471,472,5,93,0,0,472,477,3,96,48,0,473,474,5,81,
	0,0,474,476,3,96,48,0,475,473,1,0,0,0,476,479,1,0,0,0,477,475,1,0,0,0,477,
	478,1,0,0,0,478,480,1,0,0,0,479,477,1,0,0,0,480,481,5,94,0,0,481,89,1,0,
	0,0,482,490,3,10,5,0,483,486,5,82,0,0,484,487,3,10,5,0,485,487,5,84,0,0,
	486,484,1,0,0,0,486,485,1,0,0,0,487,489,1,0,0,0,488,483,1,0,0,0,489,492,
	1,0,0,0,490,488,1,0,0,0,490,491,1,0,0,0,491,91,1,0,0,0,492,490,1,0,0,0,
	493,494,7,9,0,0,494,93,1,0,0,0,495,496,5,2,0,0,496,95,1,0,0,0,497,498,3,
	98,49,0,498,97,1,0,0,0,499,500,3,84,42,0,500,99,1,0,0,0,501,502,5,3,0,0,
	502,506,5,87,0,0,503,505,3,102,51,0,504,503,1,0,0,0,505,508,1,0,0,0,506,
	504,1,0,0,0,506,507,1,0,0,0,507,509,1,0,0,0,508,506,1,0,0,0,509,510,5,88,
	0,0,510,101,1,0,0,0,511,512,3,104,52,0,512,513,5,83,0,0,513,103,1,0,0,0,
	514,516,5,18,0,0,515,517,3,106,53,0,516,515,1,0,0,0,516,517,1,0,0,0,517,
	518,1,0,0,0,518,522,5,19,0,0,519,520,5,22,0,0,520,521,5,10,0,0,521,523,
	5,23,0,0,522,519,1,0,0,0,522,523,1,0,0,0,523,524,1,0,0,0,524,525,3,16,8,
	0,525,527,5,85,0,0,526,528,3,130,65,0,527,526,1,0,0,0,527,528,1,0,0,0,528,
	529,1,0,0,0,529,531,5,86,0,0,530,532,3,108,54,0,531,530,1,0,0,0,531,532,
	1,0,0,0,532,534,1,0,0,0,533,535,3,112,56,0,534,533,1,0,0,0,534,535,1,0,
	0,0,535,537,1,0,0,0,536,538,3,118,59,0,537,536,1,0,0,0,537,538,1,0,0,0,
	538,540,1,0,0,0,539,541,3,120,60,0,540,539,1,0,0,0,540,541,1,0,0,0,541,
	543,1,0,0,0,542,544,3,126,63,0,543,542,1,0,0,0,543,544,1,0,0,0,544,546,
	1,0,0,0,545,547,3,128,64,0,546,545,1,0,0,0,546,547,1,0,0,0,547,105,1,0,
	0,0,548,550,7,10,0,0,549,548,1,0,0,0,549,550,1,0,0,0,550,551,1,0,0,0,551,
	554,7,11,0,0,552,554,5,45,0,0,553,549,1,0,0,0,553,552,1,0,0,0,554,107,1,
	0,0,0,555,556,5,48,0,0,556,557,5,85,0,0,557,558,3,110,55,0,558,559,5,86,
	0,0,559,109,1,0,0,0,560,565,3,16,8,0,561,562,5,81,0,0,562,564,3,16,8,0,
	563,561,1,0,0,0,564,567,1,0,0,0,565,563,1,0,0,0,565,566,1,0,0,0,566,111,
	1,0,0,0,567,565,1,0,0,0,568,569,5,49,0,0,569,570,5,50,0,0,570,571,3,10,
	5,0,571,572,5,85,0,0,572,573,3,114,57,0,573,574,5,86,0,0,574,113,1,0,0,
	0,575,580,3,116,58,0,576,577,5,81,0,0,577,579,3,116,58,0,578,576,1,0,0,
	0,579,582,1,0,0,0,580,578,1,0,0,0,580,581,1,0,0,0,581,115,1,0,0,0,582,580,
	1,0,0,0,583,589,3,10,5,0,584,585,5,85,0,0,585,586,3,54,27,0,586,587,5,86,
	0,0,587,589,1,0,0,0,588,583,1,0,0,0,588,584,1,0,0,0,589,117,1,0,0,0,590,
	591,5,51,0,0,591,592,3,10,5,0,592,119,1,0,0,0,593,594,5,75,0,0,594,598,
	3,122,61,0,595,596,5,76,0,0,596,598,5,52,0,0,597,593,1,0,0,0,597,595,1,
	0,0,0,598,121,1,0,0,0,599,600,5,85,0,0,600,605,3,124,62,0,601,602,5,81,
	0,0,602,604,3,124,62,0,603,601,1,0,0,0,604,607,1,0,0,0,605,603,1,0,0,0,
	605,606,1,0,0,0,606,608,1,0,0,0,607,605,1,0,0,0,608,609,5,86,0,0,609,123,
	1,0,0,0,610,616,3,14,7,0,611,614,5,91,0,0,612,615,3,92,46,0,613,615,3,10,
	5,0,614,612,1,0,0,0,614,613,1,0,0,0,615,617,1,0,0,0,616,611,1,0,0,0,616,
	617,1,0,0,0,617,125,1,0,0,0,618,619,5,30,0,0,619,625,5,53,0,0,620,626,5,
	54,0,0,621,622,5,31,0,0,622,626,5,56,0,0,623,624,5,55,0,0,624,626,5,56,
	0,0,625,620,1,0,0,0,625,621,1,0,0,0,625,623,1,0,0,0,626,127,1,0,0,0,627,
	628,5,57,0,0,628,629,3,10,5,0,629,129,1,0,0,0,630,635,3,132,66,0,631,632,
	5,81,0,0,632,634,3,132,66,0,633,631,1,0,0,0,634,637,1,0,0,0,635,633,1,0,
	0,0,635,636,1,0,0,0,636,131,1,0,0,0,637,635,1,0,0,0,638,641,3,142,71,0,
	639,641,3,134,67,0,640,638,1,0,0,0,640,639,1,0,0,0,641,133,1,0,0,0,642,
	643,3,10,5,0,643,644,3,160,80,0,644,645,3,136,68,0,645,135,1,0,0,0,646,
	648,3,138,69,0,647,646,1,0,0,0,648,651,1,0,0,0,649,647,1,0,0,0,649,650,
	1,0,0,0,650,137,1,0,0,0,651,649,1,0,0,0,652,653,5,20,0,0,653,654,3,10,5,
	0,654,655,3,140,70,0,655,658,1,0,0,0,656,658,3,140,70,0,657,652,1,0,0,0,
	657,656,1,0,0,0,658,139,1,0,0,0,659,660,5,10,0,0,660,687,5,13,0,0,661,687,
	5,13,0,0,662,663,5,24,0,0,663,687,5,25,0,0,664,687,5,26,0,0,665,666,5,21,
	0,0,666,667,5,85,0,0,667,668,3,54,27,0,668,669,5,86,0,0,669,687,1,0,0,0,
	670,671,5,29,0,0,671,687,3,54,27,0,672,673,5,28,0,0,673,678,3,16,8,0,674,
	675,5,85,0,0,675,676,3,146,73,0,676,677,5,86,0,0,677,679,1,0,0,0,678,674,
	1,0,0,0,678,679,1,0,0,0,679,681,1,0,0,0,680,682,3,150,75,0,681,680,1,0,
	0,0,681,682,1,0,0,0,682,684,1,0,0,0,683,685,3,152,76,0,684,683,1,0,0,0,
	684,685,1,0,0,0,685,687,1,0,0,0,686,659,1,0,0,0,686,661,1,0,0,0,686,662,
	1,0,0,0,686,664,1,0,0,0,686,665,1,0,0,0,686,670,1,0,0,0,686,672,1,0,0,0,
	687,141,1,0,0,0,688,689,5,20,0,0,689,690,3,10,5,0,690,691,3,144,72,0,691,
	694,1,0,0,0,692,694,3,144,72,0,693,688,1,0,0,0,693,692,1,0,0,0,694,143,
	1,0,0,0,695,696,5,21,0,0,696,697,5,85,0,0,697,698,3,54,27,0,698,699,5,86,
	0,0,699,731,1,0,0,0,700,701,5,26,0,0,701,702,5,85,0,0,702,703,3,146,73,
	0,703,704,5,86,0,0,704,731,1,0,0,0,705,706,5,24,0,0,706,707,5,25,0,0,707,
	708,5,85,0,0,708,709,3,146,73,0,709,710,5,86,0,0,710,731,1,0,0,0,711,712,
	5,27,0,0,712,713,5,25,0,0,713,714,5,85,0,0,714,715,3,146,73,0,715,716,5,
	86,0,0,716,717,5,28,0,0,717,722,3,16,8,0,718,719,5,85,0,0,719,720,3,146,
	73,0,720,721,5,86,0,0,721,723,1,0,0,0,722,718,1,0,0,0,722,723,1,0,0,0,723,
	725,1,0,0,0,724,726,3,150,75,0,725,724,1,0,0,0,725,726,1,0,0,0,726,728,
	1,0,0,0,727,729,3,152,76,0,728,727,1,0,0,0,728,729,1,0,0,0,729,731,1,0,
	0,0,730,695,1,0,0,0,730,700,1,0,0,0,730,705,1,0,0,0,730,711,1,0,0,0,731,
	145,1,0,0,0,732,737,3,148,74,0,733,734,5,81,0,0,734,736,3,148,74,0,735,
	733,1,0,0,0,736,739,1,0,0,0,737,735,1,0,0,0,737,738,1,0,0,0,738,147,1,0,
	0,0,739,737,1,0,0,0,740,741,3,10,5,0,741,149,1,0,0,0,742,743,5,38,0,0,743,
	744,7,12,0,0,744,151,1,0,0,0,745,754,3,154,77,0,746,754,3,156,78,0,747,
	748,3,154,77,0,748,749,3,156,78,0,749,754,1,0,0,0,750,751,3,156,78,0,751,
	752,3,154,77,0,752,754,1,0,0,0,753,745,1,0,0,0,753,746,1,0,0,0,753,747,
	1,0,0,0,753,750,1,0,0,0,754,153,1,0,0,0,755,756,5,30,0,0,756,757,5,32,0,
	0,757,758,3,158,79,0,758,155,1,0,0,0,759,760,5,30,0,0,760,761,5,31,0,0,
	761,762,3,158,79,0,762,157,1,0,0,0,763,764,5,35,0,0,764,772,5,36,0,0,765,
	772,5,34,0,0,766,772,5,33,0,0,767,768,5,37,0,0,768,772,5,13,0,0,769,770,
	5,37,0,0,770,772,5,29,0,0,771,763,1,0,0,0,771,765,1,0,0,0,771,766,1,0,0,
	0,771,767,1,0,0,0,771,769,1,0,0,0,772,159,1,0,0,0,773,775,5,42,0,0,774,
	773,1,0,0,0,774,775,1,0,0,0,775,776,1,0,0,0,776,777,3,164,82,0,777,778,
	3,162,81,0,778,161,1,0,0,0,779,781,5,89,0,0,780,782,5,102,0,0,781,780,1,
	0,0,0,781,782,1,0,0,0,782,783,1,0,0,0,783,785,5,90,0,0,784,779,1,0,0,0,
	785,788,1,0,0,0,786,784,1,0,0,0,786,787,1,0,0,0,787,163,1,0,0,0,788,786,
	1,0,0,0,789,795,3,166,83,0,790,795,3,168,84,0,791,795,3,170,85,0,792,795,
	3,174,87,0,793,795,3,176,88,0,794,789,1,0,0,0,794,790,1,0,0,0,794,791,1,
	0,0,0,794,792,1,0,0,0,794,793,1,0,0,0,795,165,1,0,0,0,796,831,5,58,0,0,
	797,831,5,59,0,0,798,831,5,60,0,0,799,831,5,61,0,0,800,831,5,62,0,0,801,
	805,5,63,0,0,802,803,5,85,0,0,803,804,5,102,0,0,804,806,5,86,0,0,805,802,
	1,0,0,0,805,806,1,0,0,0,806,831,1,0,0,0,807,808,5,64,0,0,808,831,5,65,0,
	0,809,817,5,66,0,0,810,811,5,85,0,0,811,814,5,102,0,0,812,813,5,81,0,0,
	813,815,5,102,0,0,814,812,1,0,0,0,814,815,1,0,0,0,815,816,1,0,0,0,816,818,
	5,86,0,0,817,810,1,0,0,0,817,818,1,0,0,0,818,831,1,0,0,0,819,827,5,67,0,
	0,820,821,5,85,0,0,821,824,5,102,0,0,822,823,5,81,0,0,823,825,5,102,0,0,
	824,822,1,0,0,0,824,825,1,0,0,0,825,826,1,0,0,0,826,828,5,86,0,0,827,820,
	1,0,0,0,827,828,1,0,0,0,828,831,1,0,0,0,829,831,5,68,0,0,830,796,1,0,0,
	0,830,797,1,0,0,0,830,798,1,0,0,0,830,799,1,0,0,0,830,800,1,0,0,0,830,801,
	1,0,0,0,830,807,1,0,0,0,830,809,1,0,0,0,830,819,1,0,0,0,830,829,1,0,0,0,
	831,167,1,0,0,0,832,834,7,13,0,0,833,835,5,72,0,0,834,833,1,0,0,0,834,835,
	1,0,0,0,835,839,1,0,0,0,836,837,5,85,0,0,837,838,5,102,0,0,838,840,5,86,
	0,0,839,836,1,0,0,0,839,840,1,0,0,0,840,848,1,0,0,0,841,845,5,71,0,0,842,
	843,5,85,0,0,843,844,5,102,0,0,844,846,5,86,0,0,845,842,1,0,0,0,845,846,
	1,0,0,0,846,848,1,0,0,0,847,832,1,0,0,0,847,841,1,0,0,0,848,169,1,0,0,0,
	849,853,7,14,0,0,850,851,5,85,0,0,851,852,5,102,0,0,852,854,5,86,0,0,853,
	850,1,0,0,0,853,854,1,0,0,0,854,856,1,0,0,0,855,857,3,172,86,0,856,855,
	1,0,0,0,856,857,1,0,0,0,857,171,1,0,0,0,858,859,5,75,0,0,859,860,5,74,0,
	0,860,865,5,77,0,0,861,862,5,76,0,0,862,863,5,74,0,0,863,865,5,77,0,0,864,
	858,1,0,0,0,864,861,1,0,0,0,865,173,1,0,0,0,866,867,5,78,0,0,867,175,1,
	0,0,0,868,879,3,12,6,0,869,870,5,85,0,0,870,875,5,102,0,0,871,872,5,81,
	0,0,872,874,5,102,0,0,873,871,1,0,0,0,874,877,1,0,0,0,875,873,1,0,0,0,875,
	876,1,0,0,0,876,878,1,0,0,0,877,875,1,0,0,0,878,880,5,86,0,0,879,869,1,
	0,0,0,879,880,1,0,0,0,880,177,1,0,0,0,104,191,196,203,207,212,217,224,232,
	237,250,261,265,267,274,282,287,290,297,304,307,317,324,338,346,351,358,
	362,371,374,377,382,387,390,395,398,403,407,411,418,426,430,444,449,455,
	463,466,477,486,490,506,516,522,527,531,534,537,540,543,546,549,553,565,
	580,588,597,605,614,616,625,635,640,649,657,678,681,684,686,693,722,725,
	728,730,737,753,771,774,781,786,794,805,814,817,824,827,830,834,839,845,
	847,853,856,864,875,879];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PGLParser.__ATN) {
			PGLParser.__ATN = new ATNDeserializer().deserialize(PGLParser._serializedATN);
		}

		return PGLParser.__ATN;
	}


	static DecisionsToDFA = PGLParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class Unreserved_keywordContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_QUERY(): TerminalNode {
		return this.getToken(PGLParser.KW_QUERY, 0);
	}
	public KW_TYPE(): TerminalNode {
		return this.getToken(PGLParser.KW_TYPE, 0);
	}
	public KW_DATABASE(): TerminalNode {
		return this.getToken(PGLParser.KW_DATABASE, 0);
	}
	public KW_IF(): TerminalNode {
		return this.getToken(PGLParser.KW_IF, 0);
	}
	public KW_KEY(): TerminalNode {
		return this.getToken(PGLParser.KW_KEY, 0);
	}
	public KW_DELETE(): TerminalNode {
		return this.getToken(PGLParser.KW_DELETE, 0);
	}
	public KW_UPDATE(): TerminalNode {
		return this.getToken(PGLParser.KW_UPDATE, 0);
	}
	public KW_CASCADE(): TerminalNode {
		return this.getToken(PGLParser.KW_CASCADE, 0);
	}
	public KW_RESTRICT(): TerminalNode {
		return this.getToken(PGLParser.KW_RESTRICT, 0);
	}
	public KW_NO(): TerminalNode {
		return this.getToken(PGLParser.KW_NO, 0);
	}
	public KW_ACTION(): TerminalNode {
		return this.getToken(PGLParser.KW_ACTION, 0);
	}
	public KW_SET(): TerminalNode {
		return this.getToken(PGLParser.KW_SET, 0);
	}
	public KW_MATCH(): TerminalNode {
		return this.getToken(PGLParser.KW_MATCH, 0);
	}
	public KW_PARTIAL(): TerminalNode {
		return this.getToken(PGLParser.KW_PARTIAL, 0);
	}
	public KW_SIMPLE(): TerminalNode {
		return this.getToken(PGLParser.KW_SIMPLE, 0);
	}
	public KW_DOUBLE(): TerminalNode {
		return this.getToken(PGLParser.KW_DOUBLE, 0);
	}
	public KW_VARYING(): TerminalNode {
		return this.getToken(PGLParser.KW_VARYING, 0);
	}
	public KW_WITHOUT(): TerminalNode {
		return this.getToken(PGLParser.KW_WITHOUT, 0);
	}
	public KW_ZONE(): TerminalNode {
		return this.getToken(PGLParser.KW_ZONE, 0);
	}
	public KW_TEMPORARY(): TerminalNode {
		return this.getToken(PGLParser.KW_TEMPORARY, 0);
	}
	public KW_TEMP(): TerminalNode {
		return this.getToken(PGLParser.KW_TEMP, 0);
	}
	public KW_UNLOGGED(): TerminalNode {
		return this.getToken(PGLParser.KW_UNLOGGED, 0);
	}
	public KW_LOCAL(): TerminalNode {
		return this.getToken(PGLParser.KW_LOCAL, 0);
	}
	public KW_GLOBAL(): TerminalNode {
		return this.getToken(PGLParser.KW_GLOBAL, 0);
	}
	public KW_INHERITS(): TerminalNode {
		return this.getToken(PGLParser.KW_INHERITS, 0);
	}
	public KW_PARTITION(): TerminalNode {
		return this.getToken(PGLParser.KW_PARTITION, 0);
	}
	public KW_BY(): TerminalNode {
		return this.getToken(PGLParser.KW_BY, 0);
	}
	public KW_USING(): TerminalNode {
		return this.getToken(PGLParser.KW_USING, 0);
	}
	public KW_OIDS(): TerminalNode {
		return this.getToken(PGLParser.KW_OIDS, 0);
	}
	public KW_COMMIT(): TerminalNode {
		return this.getToken(PGLParser.KW_COMMIT, 0);
	}
	public KW_DROP(): TerminalNode {
		return this.getToken(PGLParser.KW_DROP, 0);
	}
	public KW_PRESERVE(): TerminalNode {
		return this.getToken(PGLParser.KW_PRESERVE, 0);
	}
	public KW_ROWS(): TerminalNode {
		return this.getToken(PGLParser.KW_ROWS, 0);
	}
	public KW_TABLESPACE(): TerminalNode {
		return this.getToken(PGLParser.KW_TABLESPACE, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_unreserved_keyword;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterUnreserved_keyword) {
	 		listener.enterUnreserved_keyword(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitUnreserved_keyword) {
	 		listener.exitUnreserved_keyword(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitUnreserved_keyword) {
			return visitor.visitUnreserved_keyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Col_name_keywordContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_BETWEEN(): TerminalNode {
		return this.getToken(PGLParser.KW_BETWEEN, 0);
	}
	public KW_EXISTS(): TerminalNode {
		return this.getToken(PGLParser.KW_EXISTS, 0);
	}
	public KW_BIGINT(): TerminalNode {
		return this.getToken(PGLParser.KW_BIGINT, 0);
	}
	public KW_BOOLEAN(): TerminalNode {
		return this.getToken(PGLParser.KW_BOOLEAN, 0);
	}
	public KW_CHAR(): TerminalNode {
		return this.getToken(PGLParser.KW_CHAR, 0);
	}
	public KW_CHARACTER(): TerminalNode {
		return this.getToken(PGLParser.KW_CHARACTER, 0);
	}
	public KW_DECIMAL(): TerminalNode {
		return this.getToken(PGLParser.KW_DECIMAL, 0);
	}
	public KW_FLOAT(): TerminalNode {
		return this.getToken(PGLParser.KW_FLOAT, 0);
	}
	public KW_INT(): TerminalNode {
		return this.getToken(PGLParser.KW_INT, 0);
	}
	public KW_INTEGER(): TerminalNode {
		return this.getToken(PGLParser.KW_INTEGER, 0);
	}
	public KW_INTERVAL(): TerminalNode {
		return this.getToken(PGLParser.KW_INTERVAL, 0);
	}
	public KW_NUMERIC(): TerminalNode {
		return this.getToken(PGLParser.KW_NUMERIC, 0);
	}
	public KW_PRECISION(): TerminalNode {
		return this.getToken(PGLParser.KW_PRECISION, 0);
	}
	public KW_REAL(): TerminalNode {
		return this.getToken(PGLParser.KW_REAL, 0);
	}
	public KW_SMALLINT(): TerminalNode {
		return this.getToken(PGLParser.KW_SMALLINT, 0);
	}
	public KW_TIMESTAMP(): TerminalNode {
		return this.getToken(PGLParser.KW_TIMESTAMP, 0);
	}
	public KW_TIME(): TerminalNode {
		return this.getToken(PGLParser.KW_TIME, 0);
	}
	public KW_VARCHAR(): TerminalNode {
		return this.getToken(PGLParser.KW_VARCHAR, 0);
	}
	public KW_SETOF(): TerminalNode {
		return this.getToken(PGLParser.KW_SETOF, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_col_name_keyword;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_name_keyword) {
	 		listener.enterCol_name_keyword(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_name_keyword) {
	 		listener.exitCol_name_keyword(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_name_keyword) {
			return visitor.visitCol_name_keyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_func_name_keywordContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_IS(): TerminalNode {
		return this.getToken(PGLParser.KW_IS, 0);
	}
	public KW_LIKE(): TerminalNode {
		return this.getToken(PGLParser.KW_LIKE, 0);
	}
	public KW_FULL(): TerminalNode {
		return this.getToken(PGLParser.KW_FULL, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_type_func_name_keyword;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterType_func_name_keyword) {
	 		listener.enterType_func_name_keyword(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitType_func_name_keyword) {
	 		listener.exitType_func_name_keyword(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitType_func_name_keyword) {
			return visitor.visitType_func_name_keyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Reserved_keywordContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_SELECT(): TerminalNode {
		return this.getToken(PGLParser.KW_SELECT, 0);
	}
	public KW_FROM(): TerminalNode {
		return this.getToken(PGLParser.KW_FROM, 0);
	}
	public KW_WHERE(): TerminalNode {
		return this.getToken(PGLParser.KW_WHERE, 0);
	}
	public KW_AS(): TerminalNode {
		return this.getToken(PGLParser.KW_AS, 0);
	}
	public KW_AND(): TerminalNode {
		return this.getToken(PGLParser.KW_AND, 0);
	}
	public KW_OR(): TerminalNode {
		return this.getToken(PGLParser.KW_OR, 0);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
	public KW_TRUE(): TerminalNode {
		return this.getToken(PGLParser.KW_TRUE, 0);
	}
	public KW_FALSE(): TerminalNode {
		return this.getToken(PGLParser.KW_FALSE, 0);
	}
	public KW_NULL(): TerminalNode {
		return this.getToken(PGLParser.KW_NULL, 0);
	}
	public KW_IN(): TerminalNode {
		return this.getToken(PGLParser.KW_IN, 0);
	}
	public KW_CREATE(): TerminalNode {
		return this.getToken(PGLParser.KW_CREATE, 0);
	}
	public KW_TABLE(): TerminalNode {
		return this.getToken(PGLParser.KW_TABLE, 0);
	}
	public KW_CONSTRAINT(): TerminalNode {
		return this.getToken(PGLParser.KW_CONSTRAINT, 0);
	}
	public KW_CHECK(): TerminalNode {
		return this.getToken(PGLParser.KW_CHECK, 0);
	}
	public KW_PRIMARY(): TerminalNode {
		return this.getToken(PGLParser.KW_PRIMARY, 0);
	}
	public KW_UNIQUE(): TerminalNode {
		return this.getToken(PGLParser.KW_UNIQUE, 0);
	}
	public KW_FOREIGN(): TerminalNode {
		return this.getToken(PGLParser.KW_FOREIGN, 0);
	}
	public KW_REFERENCES(): TerminalNode {
		return this.getToken(PGLParser.KW_REFERENCES, 0);
	}
	public KW_DEFAULT(): TerminalNode {
		return this.getToken(PGLParser.KW_DEFAULT, 0);
	}
	public KW_ON(): TerminalNode {
		return this.getToken(PGLParser.KW_ON, 0);
	}
	public KW_WITH(): TerminalNode {
		return this.getToken(PGLParser.KW_WITH, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_reserved_keyword;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterReserved_keyword) {
	 		listener.enterReserved_keyword(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitReserved_keyword) {
	 		listener.exitReserved_keyword(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitReserved_keyword) {
			return visitor.visitReserved_keyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(PGLParser.IDENTIFIER, 0);
	}
	public QUOTED_IDENTIFIER(): TerminalNode {
		return this.getToken(PGLParser.QUOTED_IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_identifier;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterIdentifier) {
	 		listener.enterIdentifier(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitIdentifier) {
	 		listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColidContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public unreserved_keyword(): Unreserved_keywordContext {
		return this.getTypedRuleContext(Unreserved_keywordContext, 0) as Unreserved_keywordContext;
	}
	public col_name_keyword(): Col_name_keywordContext {
		return this.getTypedRuleContext(Col_name_keywordContext, 0) as Col_name_keywordContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_colid;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColid) {
	 		listener.enterColid(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColid) {
	 		listener.exitColid(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColid) {
			return visitor.visitColid(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_function_nameContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public unreserved_keyword(): Unreserved_keywordContext {
		return this.getTypedRuleContext(Unreserved_keywordContext, 0) as Unreserved_keywordContext;
	}
	public type_func_name_keyword(): Type_func_name_keywordContext {
		return this.getTypedRuleContext(Type_func_name_keywordContext, 0) as Type_func_name_keywordContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_type_function_name;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterType_function_name) {
	 		listener.enterType_function_name(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitType_function_name) {
	 		listener.exitType_function_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitType_function_name) {
			return visitor.visitType_function_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColLabelContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public unreserved_keyword(): Unreserved_keywordContext {
		return this.getTypedRuleContext(Unreserved_keywordContext, 0) as Unreserved_keywordContext;
	}
	public col_name_keyword(): Col_name_keywordContext {
		return this.getTypedRuleContext(Col_name_keywordContext, 0) as Col_name_keywordContext;
	}
	public type_func_name_keyword(): Type_func_name_keywordContext {
		return this.getTypedRuleContext(Type_func_name_keywordContext, 0) as Type_func_name_keywordContext;
	}
	public reserved_keyword(): Reserved_keywordContext {
		return this.getTypedRuleContext(Reserved_keywordContext, 0) as Reserved_keywordContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_colLabel;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColLabel) {
	 		listener.enterColLabel(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColLabel) {
	 		listener.exitColLabel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColLabel) {
			return visitor.visitColLabel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Qualified_nameContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public indirection(): IndirectionContext {
		return this.getTypedRuleContext(IndirectionContext, 0) as IndirectionContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_qualified_name;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterQualified_name) {
	 		listener.enterQualified_name(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitQualified_name) {
	 		listener.exitQualified_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitQualified_name) {
			return visitor.visitQualified_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IndirectionContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public indirection_el_list(): Indirection_elContext[] {
		return this.getTypedRuleContexts(Indirection_elContext) as Indirection_elContext[];
	}
	public indirection_el(i: number): Indirection_elContext {
		return this.getTypedRuleContext(Indirection_elContext, i) as Indirection_elContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_indirection;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterIndirection) {
	 		listener.enterIndirection(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitIndirection) {
	 		listener.exitIndirection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitIndirection) {
			return visitor.visitIndirection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Indirection_elContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOT(): TerminalNode {
		return this.getToken(PGLParser.DOT, 0);
	}
	public attr_name(): Attr_nameContext {
		return this.getTypedRuleContext(Attr_nameContext, 0) as Attr_nameContext;
	}
	public STAR(): TerminalNode {
		return this.getToken(PGLParser.STAR, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_indirection_el;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterIndirection_el) {
	 		listener.enterIndirection_el(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitIndirection_el) {
	 		listener.exitIndirection_el(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitIndirection_el) {
			return visitor.visitIndirection_el(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Attr_nameContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colLabel(): ColLabelContext {
		return this.getTypedRuleContext(ColLabelContext, 0) as ColLabelContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_attr_name;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterAttr_name) {
	 		listener.enterAttr_name(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitAttr_name) {
	 		listener.exitAttr_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitAttr_name) {
			return visitor.visitAttr_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ProgContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(PGLParser.EOF, 0);
	}
	public def_list(): DefContext[] {
		return this.getTypedRuleContexts(DefContext) as DefContext[];
	}
	public def(i: number): DefContext {
		return this.getTypedRuleContext(DefContext, i) as DefContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_prog;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterProg) {
	 		listener.enterProg(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitProg) {
	 		listener.exitProg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitProg) {
			return visitor.visitProg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public query_def(): Query_defContext {
		return this.getTypedRuleContext(Query_defContext, 0) as Query_defContext;
	}
	public type_def(): Type_defContext {
		return this.getTypedRuleContext(Type_defContext, 0) as Type_defContext;
	}
	public database_def(): Database_defContext {
		return this.getTypedRuleContext(Database_defContext, 0) as Database_defContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_def;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterDef) {
	 		listener.enterDef(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitDef) {
	 		listener.exitDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitDef) {
			return visitor.visitDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Query_defContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_QUERY(): TerminalNode {
		return this.getToken(PGLParser.KW_QUERY, 0);
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public query_parameter_list(): Query_parameter_listContext {
		return this.getTypedRuleContext(Query_parameter_listContext, 0) as Query_parameter_listContext;
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(PGLParser.L_CURLY, 0);
	}
	public query_body(): Query_bodyContext {
		return this.getTypedRuleContext(Query_bodyContext, 0) as Query_bodyContext;
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(PGLParser.R_CURLY, 0);
	}
	public type_parameter_list(): Type_parameter_listContext {
		return this.getTypedRuleContext(Type_parameter_listContext, 0) as Type_parameter_listContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_query_def;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterQuery_def) {
	 		listener.enterQuery_def(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitQuery_def) {
	 		listener.exitQuery_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitQuery_def) {
			return visitor.visitQuery_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_parameter_listContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LT(): TerminalNode {
		return this.getToken(PGLParser.LT, 0);
	}
	public colid_list(): ColidContext[] {
		return this.getTypedRuleContexts(ColidContext) as ColidContext[];
	}
	public colid(i: number): ColidContext {
		return this.getTypedRuleContext(ColidContext, i) as ColidContext;
	}
	public GT(): TerminalNode {
		return this.getToken(PGLParser.GT, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_type_parameter_list;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterType_parameter_list) {
	 		listener.enterType_parameter_list(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitType_parameter_list) {
	 		listener.exitType_parameter_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitType_parameter_list) {
			return visitor.visitType_parameter_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Query_parameter_listContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public query_parameter_list(): Query_parameterContext[] {
		return this.getTypedRuleContexts(Query_parameterContext) as Query_parameterContext[];
	}
	public query_parameter(i: number): Query_parameterContext {
		return this.getTypedRuleContext(Query_parameterContext, i) as Query_parameterContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_query_parameter_list;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterQuery_parameter_list) {
	 		listener.enterQuery_parameter_list(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitQuery_parameter_list) {
	 		listener.exitQuery_parameter_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitQuery_parameter_list) {
			return visitor.visitQuery_parameter_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Query_parameterContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(PGLParser.COLON, 0);
	}
	public type_expression(): Type_expressionContext {
		return this.getTypedRuleContext(Type_expressionContext, 0) as Type_expressionContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_query_parameter;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterQuery_parameter) {
	 		listener.enterQuery_parameter(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitQuery_parameter) {
	 		listener.exitQuery_parameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitQuery_parameter) {
			return visitor.visitQuery_parameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Query_bodyContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_query_body;
	}
	public override copyFrom(ctx: Query_bodyContext): void {
		super.copyFrom(ctx);
	}
}
export class Pgl_dollar_ident_ref_bodyContext extends Query_bodyContext {
	constructor(parser: PGLParser, ctx: Query_bodyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public columnref_or_pgl_dollar_ident_ref(): Columnref_or_pgl_dollar_ident_refContext {
		return this.getTypedRuleContext(Columnref_or_pgl_dollar_ident_refContext, 0) as Columnref_or_pgl_dollar_ident_refContext;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterPgl_dollar_ident_ref_body) {
	 		listener.enterPgl_dollar_ident_ref_body(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitPgl_dollar_ident_ref_body) {
	 		listener.exitPgl_dollar_ident_ref_body(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitPgl_dollar_ident_ref_body) {
			return visitor.visitPgl_dollar_ident_ref_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Pgl_expr_bodyContext extends Query_bodyContext {
	constructor(parser: PGLParser, ctx: Query_bodyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DOLLAR_LCURLY(): TerminalNode {
		return this.getToken(PGLParser.DOLLAR_LCURLY, 0);
	}
	public pgl_expr(): Pgl_exprContext {
		return this.getTypedRuleContext(Pgl_exprContext, 0) as Pgl_exprContext;
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(PGLParser.R_CURLY, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterPgl_expr_body) {
	 		listener.enterPgl_expr_body(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitPgl_expr_body) {
	 		listener.exitPgl_expr_body(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitPgl_expr_body) {
			return visitor.visitPgl_expr_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Simple_select_bodyContext extends Query_bodyContext {
	constructor(parser: PGLParser, ctx: Query_bodyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public simple_select(): Simple_selectContext {
		return this.getTypedRuleContext(Simple_selectContext, 0) as Simple_selectContext;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterSimple_select_body) {
	 		listener.enterSimple_select_body(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitSimple_select_body) {
	 		listener.exitSimple_select_body(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitSimple_select_body) {
			return visitor.visitSimple_select_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_selectContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_SELECT(): TerminalNode {
		return this.getToken(PGLParser.KW_SELECT, 0);
	}
	public target_list(): Target_listContext {
		return this.getTypedRuleContext(Target_listContext, 0) as Target_listContext;
	}
	public from_clause(): From_clauseContext {
		return this.getTypedRuleContext(From_clauseContext, 0) as From_clauseContext;
	}
	public where_clause(): Where_clauseContext {
		return this.getTypedRuleContext(Where_clauseContext, 0) as Where_clauseContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_simple_select;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterSimple_select) {
	 		listener.enterSimple_select(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitSimple_select) {
	 		listener.exitSimple_select(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitSimple_select) {
			return visitor.visitSimple_select(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Target_listContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public target_el_list(): Target_elContext[] {
		return this.getTypedRuleContexts(Target_elContext) as Target_elContext[];
	}
	public target_el(i: number): Target_elContext {
		return this.getTypedRuleContext(Target_elContext, i) as Target_elContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_target_list;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTarget_list) {
	 		listener.enterTarget_list(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTarget_list) {
	 		listener.exitTarget_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTarget_list) {
			return visitor.visitTarget_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Target_elContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_target_el;
	}
	public override copyFrom(ctx: Target_elContext): void {
		super.copyFrom(ctx);
	}
}
export class Target_labelContext extends Target_elContext {
	constructor(parser: PGLParser, ctx: Target_elContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public a_expr(): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, 0) as A_exprContext;
	}
	public KW_AS(): TerminalNode {
		return this.getToken(PGLParser.KW_AS, 0);
	}
	public colLabel(): ColLabelContext {
		return this.getTypedRuleContext(ColLabelContext, 0) as ColLabelContext;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTarget_label) {
	 		listener.enterTarget_label(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTarget_label) {
	 		listener.exitTarget_label(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTarget_label) {
			return visitor.visitTarget_label(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Target_starContext extends Target_elContext {
	constructor(parser: PGLParser, ctx: Target_elContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STAR(): TerminalNode {
		return this.getToken(PGLParser.STAR, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTarget_star) {
	 		listener.enterTarget_star(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTarget_star) {
	 		listener.exitTarget_star(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTarget_star) {
			return visitor.visitTarget_star(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class From_clauseContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_FROM(): TerminalNode {
		return this.getToken(PGLParser.KW_FROM, 0);
	}
	public from_list(): From_listContext {
		return this.getTypedRuleContext(From_listContext, 0) as From_listContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_from_clause;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterFrom_clause) {
	 		listener.enterFrom_clause(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitFrom_clause) {
	 		listener.exitFrom_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitFrom_clause) {
			return visitor.visitFrom_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class From_listContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public table_ref_list(): Table_refContext[] {
		return this.getTypedRuleContexts(Table_refContext) as Table_refContext[];
	}
	public table_ref(i: number): Table_refContext {
		return this.getTypedRuleContext(Table_refContext, i) as Table_refContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_from_list;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterFrom_list) {
	 		listener.enterFrom_list(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitFrom_list) {
	 		listener.exitFrom_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitFrom_list) {
			return visitor.visitFrom_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Table_refContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public relation_expr(): Relation_exprContext {
		return this.getTypedRuleContext(Relation_exprContext, 0) as Relation_exprContext;
	}
	public KW_AS(): TerminalNode {
		return this.getToken(PGLParser.KW_AS, 0);
	}
	public colLabel(): ColLabelContext {
		return this.getTypedRuleContext(ColLabelContext, 0) as ColLabelContext;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_table_ref;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTable_ref) {
	 		listener.enterTable_ref(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTable_ref) {
	 		listener.exitTable_ref(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTable_ref) {
			return visitor.visitTable_ref(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Relation_exprContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualified_name(): Qualified_nameContext {
		return this.getTypedRuleContext(Qualified_nameContext, 0) as Qualified_nameContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_relation_expr;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterRelation_expr) {
	 		listener.enterRelation_expr(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitRelation_expr) {
	 		listener.exitRelation_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitRelation_expr) {
			return visitor.visitRelation_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Where_clauseContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_WHERE(): TerminalNode {
		return this.getToken(PGLParser.KW_WHERE, 0);
	}
	public a_expr(): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, 0) as A_exprContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_where_clause;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterWhere_clause) {
	 		listener.enterWhere_clause(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitWhere_clause) {
	 		listener.exitWhere_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitWhere_clause) {
			return visitor.visitWhere_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_exprContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_or(): A_expr_orContext {
		return this.getTypedRuleContext(A_expr_orContext, 0) as A_expr_orContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr) {
	 		listener.enterA_expr(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr) {
	 		listener.exitA_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr) {
			return visitor.visitA_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_orContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_and_list(): A_expr_andContext[] {
		return this.getTypedRuleContexts(A_expr_andContext) as A_expr_andContext[];
	}
	public a_expr_and(i: number): A_expr_andContext {
		return this.getTypedRuleContext(A_expr_andContext, i) as A_expr_andContext;
	}
	public KW_OR_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.KW_OR);
	}
	public KW_OR(i: number): TerminalNode {
		return this.getToken(PGLParser.KW_OR, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_or;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_or) {
	 		listener.enterA_expr_or(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_or) {
	 		listener.exitA_expr_or(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_or) {
			return visitor.visitA_expr_or(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_andContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_between_list(): A_expr_betweenContext[] {
		return this.getTypedRuleContexts(A_expr_betweenContext) as A_expr_betweenContext[];
	}
	public a_expr_between(i: number): A_expr_betweenContext {
		return this.getTypedRuleContext(A_expr_betweenContext, i) as A_expr_betweenContext;
	}
	public KW_AND_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.KW_AND);
	}
	public KW_AND(i: number): TerminalNode {
		return this.getToken(PGLParser.KW_AND, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_and;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_and) {
	 		listener.enterA_expr_and(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_and) {
	 		listener.exitA_expr_and(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_and) {
			return visitor.visitA_expr_and(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_betweenContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_in_list(): A_expr_inContext[] {
		return this.getTypedRuleContexts(A_expr_inContext) as A_expr_inContext[];
	}
	public a_expr_in(i: number): A_expr_inContext {
		return this.getTypedRuleContext(A_expr_inContext, i) as A_expr_inContext;
	}
	public KW_BETWEEN(): TerminalNode {
		return this.getToken(PGLParser.KW_BETWEEN, 0);
	}
	public KW_AND(): TerminalNode {
		return this.getToken(PGLParser.KW_AND, 0);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_between;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_between) {
	 		listener.enterA_expr_between(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_between) {
	 		listener.exitA_expr_between(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_between) {
			return visitor.visitA_expr_between(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_inContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_unary_not(): A_expr_unary_notContext {
		return this.getTypedRuleContext(A_expr_unary_notContext, 0) as A_expr_unary_notContext;
	}
	public KW_IN(): TerminalNode {
		return this.getToken(PGLParser.KW_IN, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
	public a_expr_list(): A_exprContext[] {
		return this.getTypedRuleContexts(A_exprContext) as A_exprContext[];
	}
	public a_expr(i: number): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, i) as A_exprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_in;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_in) {
	 		listener.enterA_expr_in(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_in) {
	 		listener.exitA_expr_in(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_in) {
			return visitor.visitA_expr_in(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_unary_notContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
	public a_expr_unary_not(): A_expr_unary_notContext {
		return this.getTypedRuleContext(A_expr_unary_notContext, 0) as A_expr_unary_notContext;
	}
	public a_expr_isnull(): A_expr_isnullContext {
		return this.getTypedRuleContext(A_expr_isnullContext, 0) as A_expr_isnullContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_unary_not;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_unary_not) {
	 		listener.enterA_expr_unary_not(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_unary_not) {
	 		listener.exitA_expr_unary_not(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_unary_not) {
			return visitor.visitA_expr_unary_not(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_isnullContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_is_not(): A_expr_is_notContext {
		return this.getTypedRuleContext(A_expr_is_notContext, 0) as A_expr_is_notContext;
	}
	public KW_IS(): TerminalNode {
		return this.getToken(PGLParser.KW_IS, 0);
	}
	public KW_NULL(): TerminalNode {
		return this.getToken(PGLParser.KW_NULL, 0);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_isnull;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_isnull) {
	 		listener.enterA_expr_isnull(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_isnull) {
	 		listener.exitA_expr_isnull(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_isnull) {
			return visitor.visitA_expr_isnull(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_is_notContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_compare(): A_expr_compareContext {
		return this.getTypedRuleContext(A_expr_compareContext, 0) as A_expr_compareContext;
	}
	public KW_IS(): TerminalNode {
		return this.getToken(PGLParser.KW_IS, 0);
	}
	public KW_TRUE(): TerminalNode {
		return this.getToken(PGLParser.KW_TRUE, 0);
	}
	public KW_FALSE(): TerminalNode {
		return this.getToken(PGLParser.KW_FALSE, 0);
	}
	public KW_NULL(): TerminalNode {
		return this.getToken(PGLParser.KW_NULL, 0);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_is_not;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_is_not) {
	 		listener.enterA_expr_is_not(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_is_not) {
	 		listener.exitA_expr_is_not(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_is_not) {
			return visitor.visitA_expr_is_not(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_compareContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_like_list(): A_expr_likeContext[] {
		return this.getTypedRuleContexts(A_expr_likeContext) as A_expr_likeContext[];
	}
	public a_expr_like(i: number): A_expr_likeContext {
		return this.getTypedRuleContext(A_expr_likeContext, i) as A_expr_likeContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(PGLParser.EQ, 0);
	}
	public NEQ(): TerminalNode {
		return this.getToken(PGLParser.NEQ, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(PGLParser.LT, 0);
	}
	public GT(): TerminalNode {
		return this.getToken(PGLParser.GT, 0);
	}
	public LTE(): TerminalNode {
		return this.getToken(PGLParser.LTE, 0);
	}
	public GTE(): TerminalNode {
		return this.getToken(PGLParser.GTE, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_compare;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_compare) {
	 		listener.enterA_expr_compare(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_compare) {
	 		listener.exitA_expr_compare(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_compare) {
			return visitor.visitA_expr_compare(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_likeContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_add_list(): A_expr_addContext[] {
		return this.getTypedRuleContexts(A_expr_addContext) as A_expr_addContext[];
	}
	public a_expr_add(i: number): A_expr_addContext {
		return this.getTypedRuleContext(A_expr_addContext, i) as A_expr_addContext;
	}
	public KW_LIKE(): TerminalNode {
		return this.getToken(PGLParser.KW_LIKE, 0);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_like;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_like) {
	 		listener.enterA_expr_like(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_like) {
	 		listener.exitA_expr_like(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_like) {
			return visitor.visitA_expr_like(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_addContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_mul_list(): A_expr_mulContext[] {
		return this.getTypedRuleContexts(A_expr_mulContext) as A_expr_mulContext[];
	}
	public a_expr_mul(i: number): A_expr_mulContext {
		return this.getTypedRuleContext(A_expr_mulContext, i) as A_expr_mulContext;
	}
	public PLUS_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.PLUS);
	}
	public PLUS(i: number): TerminalNode {
		return this.getToken(PGLParser.PLUS, i);
	}
	public MINUS_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.MINUS);
	}
	public MINUS(i: number): TerminalNode {
		return this.getToken(PGLParser.MINUS, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_add;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_add) {
	 		listener.enterA_expr_add(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_add) {
	 		listener.exitA_expr_add(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_add) {
			return visitor.visitA_expr_add(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_mulContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public a_expr_unary_list(): A_expr_unaryContext[] {
		return this.getTypedRuleContexts(A_expr_unaryContext) as A_expr_unaryContext[];
	}
	public a_expr_unary(i: number): A_expr_unaryContext {
		return this.getTypedRuleContext(A_expr_unaryContext, i) as A_expr_unaryContext;
	}
	public STAR_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.STAR);
	}
	public STAR(i: number): TerminalNode {
		return this.getToken(PGLParser.STAR, i);
	}
	public SLASH_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.SLASH);
	}
	public SLASH(i: number): TerminalNode {
		return this.getToken(PGLParser.SLASH, i);
	}
	public PERCENT_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.PERCENT);
	}
	public PERCENT(i: number): TerminalNode {
		return this.getToken(PGLParser.PERCENT, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_mul;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_mul) {
	 		listener.enterA_expr_mul(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_mul) {
	 		listener.exitA_expr_mul(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_mul) {
			return visitor.visitA_expr_mul(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class A_expr_unaryContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public c_expr(): C_exprContext {
		return this.getTypedRuleContext(C_exprContext, 0) as C_exprContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(PGLParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(PGLParser.MINUS, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_a_expr_unary;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterA_expr_unary) {
	 		listener.enterA_expr_unary(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitA_expr_unary) {
	 		listener.exitA_expr_unary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitA_expr_unary) {
			return visitor.visitA_expr_unary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class C_exprContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOLLAR_LCURLY(): TerminalNode {
		return this.getToken(PGLParser.DOLLAR_LCURLY, 0);
	}
	public pgl_expr(): Pgl_exprContext {
		return this.getTypedRuleContext(Pgl_exprContext, 0) as Pgl_exprContext;
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(PGLParser.R_CURLY, 0);
	}
	public columnref_or_pgl_dollar_ident_ref(): Columnref_or_pgl_dollar_ident_refContext {
		return this.getTypedRuleContext(Columnref_or_pgl_dollar_ident_refContext, 0) as Columnref_or_pgl_dollar_ident_refContext;
	}
	public aexprconst(): AexprconstContext {
		return this.getTypedRuleContext(AexprconstContext, 0) as AexprconstContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public a_expr(): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, 0) as A_exprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_c_expr;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterC_expr) {
	 		listener.enterC_expr(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitC_expr) {
	 		listener.exitC_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitC_expr) {
			return visitor.visitC_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pgl_exprContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pgl_query_call(): Pgl_query_callContext {
		return this.getTypedRuleContext(Pgl_query_callContext, 0) as Pgl_query_callContext;
	}
	public pgl_ident_ref(): Pgl_ident_refContext {
		return this.getTypedRuleContext(Pgl_ident_refContext, 0) as Pgl_ident_refContext;
	}
	public aexprconst(): AexprconstContext {
		return this.getTypedRuleContext(AexprconstContext, 0) as AexprconstContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_pgl_expr;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterPgl_expr) {
	 		listener.enterPgl_expr(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitPgl_expr) {
	 		listener.exitPgl_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitPgl_expr) {
			return visitor.visitPgl_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pgl_ident_refContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualified_name(): Qualified_nameContext {
		return this.getTypedRuleContext(Qualified_nameContext, 0) as Qualified_nameContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_pgl_ident_ref;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterPgl_ident_ref) {
	 		listener.enterPgl_ident_ref(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitPgl_ident_ref) {
	 		listener.exitPgl_ident_ref(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitPgl_ident_ref) {
			return visitor.visitPgl_ident_ref(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pgl_query_callContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualified_name(): Qualified_nameContext {
		return this.getTypedRuleContext(Qualified_nameContext, 0) as Qualified_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public type_argument_list(): Type_argument_listContext {
		return this.getTypedRuleContext(Type_argument_listContext, 0) as Type_argument_listContext;
	}
	public pgl_expr_list(): Pgl_exprContext[] {
		return this.getTypedRuleContexts(Pgl_exprContext) as Pgl_exprContext[];
	}
	public pgl_expr(i: number): Pgl_exprContext {
		return this.getTypedRuleContext(Pgl_exprContext, i) as Pgl_exprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_pgl_query_call;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterPgl_query_call) {
	 		listener.enterPgl_query_call(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitPgl_query_call) {
	 		listener.exitPgl_query_call(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitPgl_query_call) {
			return visitor.visitPgl_query_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_argument_listContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COLONCOLON(): TerminalNode {
		return this.getToken(PGLParser.COLONCOLON, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(PGLParser.LT, 0);
	}
	public type_expression_list(): Type_expressionContext[] {
		return this.getTypedRuleContexts(Type_expressionContext) as Type_expressionContext[];
	}
	public type_expression(i: number): Type_expressionContext {
		return this.getTypedRuleContext(Type_expressionContext, i) as Type_expressionContext;
	}
	public GT(): TerminalNode {
		return this.getToken(PGLParser.GT, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_type_argument_list;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterType_argument_list) {
	 		listener.enterType_argument_list(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitType_argument_list) {
	 		listener.exitType_argument_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitType_argument_list) {
			return visitor.visitType_argument_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Columnref_or_pgl_dollar_ident_refContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colid_list(): ColidContext[] {
		return this.getTypedRuleContexts(ColidContext) as ColidContext[];
	}
	public colid(i: number): ColidContext {
		return this.getTypedRuleContext(ColidContext, i) as ColidContext;
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(PGLParser.DOT, i);
	}
	public STAR_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.STAR);
	}
	public STAR(i: number): TerminalNode {
		return this.getToken(PGLParser.STAR, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_columnref_or_pgl_dollar_ident_ref;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColumnref_or_pgl_dollar_ident_ref) {
	 		listener.enterColumnref_or_pgl_dollar_ident_ref(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColumnref_or_pgl_dollar_ident_ref) {
	 		listener.exitColumnref_or_pgl_dollar_ident_ref(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColumnref_or_pgl_dollar_ident_ref) {
			return visitor.visitColumnref_or_pgl_dollar_ident_ref(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AexprconstContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER_LITERAL(): TerminalNode {
		return this.getToken(PGLParser.INTEGER_LITERAL, 0);
	}
	public NUMERIC_LITERAL(): TerminalNode {
		return this.getToken(PGLParser.NUMERIC_LITERAL, 0);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(PGLParser.STRING_LITERAL, 0);
	}
	public KW_TRUE(): TerminalNode {
		return this.getToken(PGLParser.KW_TRUE, 0);
	}
	public KW_FALSE(): TerminalNode {
		return this.getToken(PGLParser.KW_FALSE, 0);
	}
	public KW_NULL(): TerminalNode {
		return this.getToken(PGLParser.KW_NULL, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_aexprconst;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterAexprconst) {
	 		listener.enterAexprconst(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitAexprconst) {
	 		listener.exitAexprconst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitAexprconst) {
			return visitor.visitAexprconst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_defContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_TYPE(): TerminalNode {
		return this.getToken(PGLParser.KW_TYPE, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_type_def;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterType_def) {
	 		listener.enterType_def(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitType_def) {
	 		listener.exitType_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitType_def) {
			return visitor.visitType_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_expressionContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_ref(): Type_refContext {
		return this.getTypedRuleContext(Type_refContext, 0) as Type_refContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_type_expression;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterType_expression) {
	 		listener.enterType_expression(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitType_expression) {
	 		listener.exitType_expression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitType_expression) {
			return visitor.visitType_expression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_refContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pgl_ident_ref(): Pgl_ident_refContext {
		return this.getTypedRuleContext(Pgl_ident_refContext, 0) as Pgl_ident_refContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_type_ref;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterType_ref) {
	 		listener.enterType_ref(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitType_ref) {
	 		listener.exitType_ref(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitType_ref) {
			return visitor.visitType_ref(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Database_defContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_DATABASE(): TerminalNode {
		return this.getToken(PGLParser.KW_DATABASE, 0);
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(PGLParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(PGLParser.R_CURLY, 0);
	}
	public ddl_statement_list(): Ddl_statementContext[] {
		return this.getTypedRuleContexts(Ddl_statementContext) as Ddl_statementContext[];
	}
	public ddl_statement(i: number): Ddl_statementContext {
		return this.getTypedRuleContext(Ddl_statementContext, i) as Ddl_statementContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_database_def;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterDatabase_def) {
	 		listener.enterDatabase_def(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitDatabase_def) {
	 		listener.exitDatabase_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitDatabase_def) {
			return visitor.visitDatabase_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ddl_statementContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public createstmt(): CreatestmtContext {
		return this.getTypedRuleContext(CreatestmtContext, 0) as CreatestmtContext;
	}
	public SEMICOLON(): TerminalNode {
		return this.getToken(PGLParser.SEMICOLON, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_ddl_statement;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterDdl_statement) {
	 		listener.enterDdl_statement(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitDdl_statement) {
	 		listener.exitDdl_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitDdl_statement) {
			return visitor.visitDdl_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreatestmtContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_CREATE(): TerminalNode {
		return this.getToken(PGLParser.KW_CREATE, 0);
	}
	public KW_TABLE(): TerminalNode {
		return this.getToken(PGLParser.KW_TABLE, 0);
	}
	public qualified_name(): Qualified_nameContext {
		return this.getTypedRuleContext(Qualified_nameContext, 0) as Qualified_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public opttemp(): OpttempContext {
		return this.getTypedRuleContext(OpttempContext, 0) as OpttempContext;
	}
	public KW_IF(): TerminalNode {
		return this.getToken(PGLParser.KW_IF, 0);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
	public KW_EXISTS(): TerminalNode {
		return this.getToken(PGLParser.KW_EXISTS, 0);
	}
	public tableelementlist(): TableelementlistContext {
		return this.getTypedRuleContext(TableelementlistContext, 0) as TableelementlistContext;
	}
	public optinherit(): OptinheritContext {
		return this.getTypedRuleContext(OptinheritContext, 0) as OptinheritContext;
	}
	public optpartitionspec(): OptpartitionspecContext {
		return this.getTypedRuleContext(OptpartitionspecContext, 0) as OptpartitionspecContext;
	}
	public table_access_method_clause(): Table_access_method_clauseContext {
		return this.getTypedRuleContext(Table_access_method_clauseContext, 0) as Table_access_method_clauseContext;
	}
	public optwith(): OptwithContext {
		return this.getTypedRuleContext(OptwithContext, 0) as OptwithContext;
	}
	public oncommitoption(): OncommitoptionContext {
		return this.getTypedRuleContext(OncommitoptionContext, 0) as OncommitoptionContext;
	}
	public opttablespace(): OpttablespaceContext {
		return this.getTypedRuleContext(OpttablespaceContext, 0) as OpttablespaceContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_createstmt;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCreatestmt) {
	 		listener.enterCreatestmt(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCreatestmt) {
	 		listener.exitCreatestmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCreatestmt) {
			return visitor.visitCreatestmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OpttempContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_TEMPORARY(): TerminalNode {
		return this.getToken(PGLParser.KW_TEMPORARY, 0);
	}
	public KW_TEMP(): TerminalNode {
		return this.getToken(PGLParser.KW_TEMP, 0);
	}
	public KW_LOCAL(): TerminalNode {
		return this.getToken(PGLParser.KW_LOCAL, 0);
	}
	public KW_GLOBAL(): TerminalNode {
		return this.getToken(PGLParser.KW_GLOBAL, 0);
	}
	public KW_UNLOGGED(): TerminalNode {
		return this.getToken(PGLParser.KW_UNLOGGED, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_opttemp;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterOpttemp) {
	 		listener.enterOpttemp(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitOpttemp) {
	 		listener.exitOpttemp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitOpttemp) {
			return visitor.visitOpttemp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptinheritContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_INHERITS(): TerminalNode {
		return this.getToken(PGLParser.KW_INHERITS, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public qualified_name_list(): Qualified_name_listContext {
		return this.getTypedRuleContext(Qualified_name_listContext, 0) as Qualified_name_listContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_optinherit;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterOptinherit) {
	 		listener.enterOptinherit(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitOptinherit) {
	 		listener.exitOptinherit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitOptinherit) {
			return visitor.visitOptinherit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Qualified_name_listContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualified_name_list(): Qualified_nameContext[] {
		return this.getTypedRuleContexts(Qualified_nameContext) as Qualified_nameContext[];
	}
	public qualified_name(i: number): Qualified_nameContext {
		return this.getTypedRuleContext(Qualified_nameContext, i) as Qualified_nameContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_qualified_name_list;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterQualified_name_list) {
	 		listener.enterQualified_name_list(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitQualified_name_list) {
	 		listener.exitQualified_name_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitQualified_name_list) {
			return visitor.visitQualified_name_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptpartitionspecContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_PARTITION(): TerminalNode {
		return this.getToken(PGLParser.KW_PARTITION, 0);
	}
	public KW_BY(): TerminalNode {
		return this.getToken(PGLParser.KW_BY, 0);
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public part_params(): Part_paramsContext {
		return this.getTypedRuleContext(Part_paramsContext, 0) as Part_paramsContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_optpartitionspec;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterOptpartitionspec) {
	 		listener.enterOptpartitionspec(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitOptpartitionspec) {
	 		listener.exitOptpartitionspec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitOptpartitionspec) {
			return visitor.visitOptpartitionspec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Part_paramsContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public part_elem_list(): Part_elemContext[] {
		return this.getTypedRuleContexts(Part_elemContext) as Part_elemContext[];
	}
	public part_elem(i: number): Part_elemContext {
		return this.getTypedRuleContext(Part_elemContext, i) as Part_elemContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_part_params;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterPart_params) {
	 		listener.enterPart_params(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitPart_params) {
	 		listener.exitPart_params(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitPart_params) {
			return visitor.visitPart_params(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Part_elemContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public a_expr(): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, 0) as A_exprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_part_elem;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterPart_elem) {
	 		listener.enterPart_elem(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitPart_elem) {
	 		listener.exitPart_elem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitPart_elem) {
			return visitor.visitPart_elem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Table_access_method_clauseContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_USING(): TerminalNode {
		return this.getToken(PGLParser.KW_USING, 0);
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_table_access_method_clause;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTable_access_method_clause) {
	 		listener.enterTable_access_method_clause(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTable_access_method_clause) {
	 		listener.exitTable_access_method_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTable_access_method_clause) {
			return visitor.visitTable_access_method_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptwithContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_WITH(): TerminalNode {
		return this.getToken(PGLParser.KW_WITH, 0);
	}
	public reloptions(): ReloptionsContext {
		return this.getTypedRuleContext(ReloptionsContext, 0) as ReloptionsContext;
	}
	public KW_WITHOUT(): TerminalNode {
		return this.getToken(PGLParser.KW_WITHOUT, 0);
	}
	public KW_OIDS(): TerminalNode {
		return this.getToken(PGLParser.KW_OIDS, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_optwith;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterOptwith) {
	 		listener.enterOptwith(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitOptwith) {
	 		listener.exitOptwith(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitOptwith) {
			return visitor.visitOptwith(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReloptionsContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public reloption_elem_list(): Reloption_elemContext[] {
		return this.getTypedRuleContexts(Reloption_elemContext) as Reloption_elemContext[];
	}
	public reloption_elem(i: number): Reloption_elemContext {
		return this.getTypedRuleContext(Reloption_elemContext, i) as Reloption_elemContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_reloptions;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterReloptions) {
	 		listener.enterReloptions(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitReloptions) {
	 		listener.exitReloptions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitReloptions) {
			return visitor.visitReloptions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Reloption_elemContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colLabel(): ColLabelContext {
		return this.getTypedRuleContext(ColLabelContext, 0) as ColLabelContext;
	}
	public EQ(): TerminalNode {
		return this.getToken(PGLParser.EQ, 0);
	}
	public aexprconst(): AexprconstContext {
		return this.getTypedRuleContext(AexprconstContext, 0) as AexprconstContext;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_reloption_elem;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterReloption_elem) {
	 		listener.enterReloption_elem(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitReloption_elem) {
	 		listener.exitReloption_elem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitReloption_elem) {
			return visitor.visitReloption_elem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OncommitoptionContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_ON(): TerminalNode {
		return this.getToken(PGLParser.KW_ON, 0);
	}
	public KW_COMMIT(): TerminalNode {
		return this.getToken(PGLParser.KW_COMMIT, 0);
	}
	public KW_DROP(): TerminalNode {
		return this.getToken(PGLParser.KW_DROP, 0);
	}
	public KW_DELETE(): TerminalNode {
		return this.getToken(PGLParser.KW_DELETE, 0);
	}
	public KW_ROWS(): TerminalNode {
		return this.getToken(PGLParser.KW_ROWS, 0);
	}
	public KW_PRESERVE(): TerminalNode {
		return this.getToken(PGLParser.KW_PRESERVE, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_oncommitoption;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterOncommitoption) {
	 		listener.enterOncommitoption(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitOncommitoption) {
	 		listener.exitOncommitoption(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitOncommitoption) {
			return visitor.visitOncommitoption(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OpttablespaceContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_TABLESPACE(): TerminalNode {
		return this.getToken(PGLParser.KW_TABLESPACE, 0);
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_opttablespace;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterOpttablespace) {
	 		listener.enterOpttablespace(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitOpttablespace) {
	 		listener.exitOpttablespace(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitOpttablespace) {
			return visitor.visitOpttablespace(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableelementlistContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tableelement_list(): TableelementContext[] {
		return this.getTypedRuleContexts(TableelementContext) as TableelementContext[];
	}
	public tableelement(i: number): TableelementContext {
		return this.getTypedRuleContext(TableelementContext, i) as TableelementContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_tableelementlist;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTableelementlist) {
	 		listener.enterTableelementlist(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTableelementlist) {
	 		listener.exitTableelementlist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTableelementlist) {
			return visitor.visitTableelementlist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableelementContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tableconstraint(): TableconstraintContext {
		return this.getTypedRuleContext(TableconstraintContext, 0) as TableconstraintContext;
	}
	public columnDef(): ColumnDefContext {
		return this.getTypedRuleContext(ColumnDefContext, 0) as ColumnDefContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_tableelement;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTableelement) {
	 		listener.enterTableelement(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTableelement) {
	 		listener.exitTableelement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTableelement) {
			return visitor.visitTableelement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnDefContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public typename(): TypenameContext {
		return this.getTypedRuleContext(TypenameContext, 0) as TypenameContext;
	}
	public colquallist(): ColquallistContext {
		return this.getTypedRuleContext(ColquallistContext, 0) as ColquallistContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_columnDef;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColumnDef) {
	 		listener.enterColumnDef(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColumnDef) {
	 		listener.exitColumnDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColumnDef) {
			return visitor.visitColumnDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColquallistContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colconstraint_list(): ColconstraintContext[] {
		return this.getTypedRuleContexts(ColconstraintContext) as ColconstraintContext[];
	}
	public colconstraint(i: number): ColconstraintContext {
		return this.getTypedRuleContext(ColconstraintContext, i) as ColconstraintContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_colquallist;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColquallist) {
	 		listener.enterColquallist(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColquallist) {
	 		listener.exitColquallist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColquallist) {
			return visitor.visitColquallist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColconstraintContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_CONSTRAINT(): TerminalNode {
		return this.getToken(PGLParser.KW_CONSTRAINT, 0);
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public colconstraintelem(): ColconstraintelemContext {
		return this.getTypedRuleContext(ColconstraintelemContext, 0) as ColconstraintelemContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_colconstraint;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColconstraint) {
	 		listener.enterColconstraint(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColconstraint) {
	 		listener.exitColconstraint(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColconstraint) {
			return visitor.visitColconstraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColconstraintelemContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_colconstraintelem;
	}
	public override copyFrom(ctx: ColconstraintelemContext): void {
		super.copyFrom(ctx);
	}
}
export class Col_not_nullContext extends ColconstraintelemContext {
	constructor(parser: PGLParser, ctx: ColconstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_NOT(): TerminalNode {
		return this.getToken(PGLParser.KW_NOT, 0);
	}
	public KW_NULL(): TerminalNode {
		return this.getToken(PGLParser.KW_NULL, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_not_null) {
	 		listener.enterCol_not_null(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_not_null) {
	 		listener.exitCol_not_null(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_not_null) {
			return visitor.visitCol_not_null(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Col_checkContext extends ColconstraintelemContext {
	constructor(parser: PGLParser, ctx: ColconstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_CHECK(): TerminalNode {
		return this.getToken(PGLParser.KW_CHECK, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public a_expr(): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, 0) as A_exprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_check) {
	 		listener.enterCol_check(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_check) {
	 		listener.exitCol_check(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_check) {
			return visitor.visitCol_check(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Col_primary_keyContext extends ColconstraintelemContext {
	constructor(parser: PGLParser, ctx: ColconstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_PRIMARY(): TerminalNode {
		return this.getToken(PGLParser.KW_PRIMARY, 0);
	}
	public KW_KEY(): TerminalNode {
		return this.getToken(PGLParser.KW_KEY, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_primary_key) {
	 		listener.enterCol_primary_key(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_primary_key) {
	 		listener.exitCol_primary_key(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_primary_key) {
			return visitor.visitCol_primary_key(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Col_referencesContext extends ColconstraintelemContext {
	constructor(parser: PGLParser, ctx: ColconstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_REFERENCES(): TerminalNode {
		return this.getToken(PGLParser.KW_REFERENCES, 0);
	}
	public qualified_name(): Qualified_nameContext {
		return this.getTypedRuleContext(Qualified_nameContext, 0) as Qualified_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public columnlist(): ColumnlistContext {
		return this.getTypedRuleContext(ColumnlistContext, 0) as ColumnlistContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public key_match(): Key_matchContext {
		return this.getTypedRuleContext(Key_matchContext, 0) as Key_matchContext;
	}
	public key_actions(): Key_actionsContext {
		return this.getTypedRuleContext(Key_actionsContext, 0) as Key_actionsContext;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_references) {
	 		listener.enterCol_references(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_references) {
	 		listener.exitCol_references(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_references) {
			return visitor.visitCol_references(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Col_nullContext extends ColconstraintelemContext {
	constructor(parser: PGLParser, ctx: ColconstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_NULL(): TerminalNode {
		return this.getToken(PGLParser.KW_NULL, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_null) {
	 		listener.enterCol_null(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_null) {
	 		listener.exitCol_null(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_null) {
			return visitor.visitCol_null(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Col_uniqueContext extends ColconstraintelemContext {
	constructor(parser: PGLParser, ctx: ColconstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_UNIQUE(): TerminalNode {
		return this.getToken(PGLParser.KW_UNIQUE, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_unique) {
	 		listener.enterCol_unique(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_unique) {
	 		listener.exitCol_unique(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_unique) {
			return visitor.visitCol_unique(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Col_defaultContext extends ColconstraintelemContext {
	constructor(parser: PGLParser, ctx: ColconstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_DEFAULT(): TerminalNode {
		return this.getToken(PGLParser.KW_DEFAULT, 0);
	}
	public a_expr(): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, 0) as A_exprContext;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCol_default) {
	 		listener.enterCol_default(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCol_default) {
	 		listener.exitCol_default(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCol_default) {
			return visitor.visitCol_default(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableconstraintContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_CONSTRAINT(): TerminalNode {
		return this.getToken(PGLParser.KW_CONSTRAINT, 0);
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
	public constraintelem(): ConstraintelemContext {
		return this.getTypedRuleContext(ConstraintelemContext, 0) as ConstraintelemContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_tableconstraint;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTableconstraint) {
	 		listener.enterTableconstraint(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTableconstraint) {
	 		listener.exitTableconstraint(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTableconstraint) {
			return visitor.visitTableconstraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstraintelemContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_constraintelem;
	}
	public override copyFrom(ctx: ConstraintelemContext): void {
		super.copyFrom(ctx);
	}
}
export class Tbl_checkContext extends ConstraintelemContext {
	constructor(parser: PGLParser, ctx: ConstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_CHECK(): TerminalNode {
		return this.getToken(PGLParser.KW_CHECK, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public a_expr(): A_exprContext {
		return this.getTypedRuleContext(A_exprContext, 0) as A_exprContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTbl_check) {
	 		listener.enterTbl_check(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTbl_check) {
	 		listener.exitTbl_check(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTbl_check) {
			return visitor.visitTbl_check(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Tbl_primary_keyContext extends ConstraintelemContext {
	constructor(parser: PGLParser, ctx: ConstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_PRIMARY(): TerminalNode {
		return this.getToken(PGLParser.KW_PRIMARY, 0);
	}
	public KW_KEY(): TerminalNode {
		return this.getToken(PGLParser.KW_KEY, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public columnlist(): ColumnlistContext {
		return this.getTypedRuleContext(ColumnlistContext, 0) as ColumnlistContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTbl_primary_key) {
	 		listener.enterTbl_primary_key(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTbl_primary_key) {
	 		listener.exitTbl_primary_key(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTbl_primary_key) {
			return visitor.visitTbl_primary_key(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Tbl_foreign_keyContext extends ConstraintelemContext {
	constructor(parser: PGLParser, ctx: ConstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_FOREIGN(): TerminalNode {
		return this.getToken(PGLParser.KW_FOREIGN, 0);
	}
	public KW_KEY(): TerminalNode {
		return this.getToken(PGLParser.KW_KEY, 0);
	}
	public L_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.L_PAREN);
	}
	public L_PAREN(i: number): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, i);
	}
	public columnlist_list(): ColumnlistContext[] {
		return this.getTypedRuleContexts(ColumnlistContext) as ColumnlistContext[];
	}
	public columnlist(i: number): ColumnlistContext {
		return this.getTypedRuleContext(ColumnlistContext, i) as ColumnlistContext;
	}
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, i);
	}
	public KW_REFERENCES(): TerminalNode {
		return this.getToken(PGLParser.KW_REFERENCES, 0);
	}
	public qualified_name(): Qualified_nameContext {
		return this.getTypedRuleContext(Qualified_nameContext, 0) as Qualified_nameContext;
	}
	public key_match(): Key_matchContext {
		return this.getTypedRuleContext(Key_matchContext, 0) as Key_matchContext;
	}
	public key_actions(): Key_actionsContext {
		return this.getTypedRuleContext(Key_actionsContext, 0) as Key_actionsContext;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTbl_foreign_key) {
	 		listener.enterTbl_foreign_key(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTbl_foreign_key) {
	 		listener.exitTbl_foreign_key(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTbl_foreign_key) {
			return visitor.visitTbl_foreign_key(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Tbl_uniqueContext extends ConstraintelemContext {
	constructor(parser: PGLParser, ctx: ConstraintelemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KW_UNIQUE(): TerminalNode {
		return this.getToken(PGLParser.KW_UNIQUE, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public columnlist(): ColumnlistContext {
		return this.getTypedRuleContext(ColumnlistContext, 0) as ColumnlistContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTbl_unique) {
	 		listener.enterTbl_unique(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTbl_unique) {
	 		listener.exitTbl_unique(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTbl_unique) {
			return visitor.visitTbl_unique(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnlistContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public columnElem_list(): ColumnElemContext[] {
		return this.getTypedRuleContexts(ColumnElemContext) as ColumnElemContext[];
	}
	public columnElem(i: number): ColumnElemContext {
		return this.getTypedRuleContext(ColumnElemContext, i) as ColumnElemContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_columnlist;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColumnlist) {
	 		listener.enterColumnlist(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColumnlist) {
	 		listener.exitColumnlist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColumnlist) {
			return visitor.visitColumnlist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnElemContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public colid(): ColidContext {
		return this.getTypedRuleContext(ColidContext, 0) as ColidContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_columnElem;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColumnElem) {
	 		listener.enterColumnElem(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColumnElem) {
	 		listener.exitColumnElem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColumnElem) {
			return visitor.visitColumnElem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Key_matchContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_MATCH(): TerminalNode {
		return this.getToken(PGLParser.KW_MATCH, 0);
	}
	public KW_FULL(): TerminalNode {
		return this.getToken(PGLParser.KW_FULL, 0);
	}
	public KW_PARTIAL(): TerminalNode {
		return this.getToken(PGLParser.KW_PARTIAL, 0);
	}
	public KW_SIMPLE(): TerminalNode {
		return this.getToken(PGLParser.KW_SIMPLE, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_key_match;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterKey_match) {
	 		listener.enterKey_match(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitKey_match) {
	 		listener.exitKey_match(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitKey_match) {
			return visitor.visitKey_match(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Key_actionsContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public key_update(): Key_updateContext {
		return this.getTypedRuleContext(Key_updateContext, 0) as Key_updateContext;
	}
	public key_delete(): Key_deleteContext {
		return this.getTypedRuleContext(Key_deleteContext, 0) as Key_deleteContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_key_actions;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterKey_actions) {
	 		listener.enterKey_actions(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitKey_actions) {
	 		listener.exitKey_actions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitKey_actions) {
			return visitor.visitKey_actions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Key_updateContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_ON(): TerminalNode {
		return this.getToken(PGLParser.KW_ON, 0);
	}
	public KW_UPDATE(): TerminalNode {
		return this.getToken(PGLParser.KW_UPDATE, 0);
	}
	public key_action(): Key_actionContext {
		return this.getTypedRuleContext(Key_actionContext, 0) as Key_actionContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_key_update;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterKey_update) {
	 		listener.enterKey_update(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitKey_update) {
	 		listener.exitKey_update(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitKey_update) {
			return visitor.visitKey_update(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Key_deleteContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_ON(): TerminalNode {
		return this.getToken(PGLParser.KW_ON, 0);
	}
	public KW_DELETE(): TerminalNode {
		return this.getToken(PGLParser.KW_DELETE, 0);
	}
	public key_action(): Key_actionContext {
		return this.getTypedRuleContext(Key_actionContext, 0) as Key_actionContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_key_delete;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterKey_delete) {
	 		listener.enterKey_delete(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitKey_delete) {
	 		listener.exitKey_delete(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitKey_delete) {
			return visitor.visitKey_delete(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Key_actionContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_NO(): TerminalNode {
		return this.getToken(PGLParser.KW_NO, 0);
	}
	public KW_ACTION(): TerminalNode {
		return this.getToken(PGLParser.KW_ACTION, 0);
	}
	public KW_RESTRICT(): TerminalNode {
		return this.getToken(PGLParser.KW_RESTRICT, 0);
	}
	public KW_CASCADE(): TerminalNode {
		return this.getToken(PGLParser.KW_CASCADE, 0);
	}
	public KW_SET(): TerminalNode {
		return this.getToken(PGLParser.KW_SET, 0);
	}
	public KW_NULL(): TerminalNode {
		return this.getToken(PGLParser.KW_NULL, 0);
	}
	public KW_DEFAULT(): TerminalNode {
		return this.getToken(PGLParser.KW_DEFAULT, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_key_action;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterKey_action) {
	 		listener.enterKey_action(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitKey_action) {
	 		listener.exitKey_action(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitKey_action) {
			return visitor.visitKey_action(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypenameContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public simpletypename(): SimpletypenameContext {
		return this.getTypedRuleContext(SimpletypenameContext, 0) as SimpletypenameContext;
	}
	public opt_array_bounds(): Opt_array_boundsContext {
		return this.getTypedRuleContext(Opt_array_boundsContext, 0) as Opt_array_boundsContext;
	}
	public KW_SETOF(): TerminalNode {
		return this.getToken(PGLParser.KW_SETOF, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_typename;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTypename) {
	 		listener.enterTypename(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTypename) {
	 		listener.exitTypename(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTypename) {
			return visitor.visitTypename(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Opt_array_boundsContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.L_BRACKET);
	}
	public L_BRACKET(i: number): TerminalNode {
		return this.getToken(PGLParser.L_BRACKET, i);
	}
	public R_BRACKET_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.R_BRACKET);
	}
	public R_BRACKET(i: number): TerminalNode {
		return this.getToken(PGLParser.R_BRACKET, i);
	}
	public INTEGER_LITERAL_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.INTEGER_LITERAL);
	}
	public INTEGER_LITERAL(i: number): TerminalNode {
		return this.getToken(PGLParser.INTEGER_LITERAL, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_opt_array_bounds;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterOpt_array_bounds) {
	 		listener.enterOpt_array_bounds(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitOpt_array_bounds) {
	 		listener.exitOpt_array_bounds(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitOpt_array_bounds) {
			return visitor.visitOpt_array_bounds(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpletypenameContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public numeric(): NumericContext {
		return this.getTypedRuleContext(NumericContext, 0) as NumericContext;
	}
	public character(): CharacterContext {
		return this.getTypedRuleContext(CharacterContext, 0) as CharacterContext;
	}
	public constdatetime(): ConstdatetimeContext {
		return this.getTypedRuleContext(ConstdatetimeContext, 0) as ConstdatetimeContext;
	}
	public constinterval(): ConstintervalContext {
		return this.getTypedRuleContext(ConstintervalContext, 0) as ConstintervalContext;
	}
	public generictype(): GenerictypeContext {
		return this.getTypedRuleContext(GenerictypeContext, 0) as GenerictypeContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_simpletypename;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterSimpletypename) {
	 		listener.enterSimpletypename(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitSimpletypename) {
	 		listener.exitSimpletypename(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitSimpletypename) {
			return visitor.visitSimpletypename(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumericContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_INT(): TerminalNode {
		return this.getToken(PGLParser.KW_INT, 0);
	}
	public KW_INTEGER(): TerminalNode {
		return this.getToken(PGLParser.KW_INTEGER, 0);
	}
	public KW_SMALLINT(): TerminalNode {
		return this.getToken(PGLParser.KW_SMALLINT, 0);
	}
	public KW_BIGINT(): TerminalNode {
		return this.getToken(PGLParser.KW_BIGINT, 0);
	}
	public KW_REAL(): TerminalNode {
		return this.getToken(PGLParser.KW_REAL, 0);
	}
	public KW_FLOAT(): TerminalNode {
		return this.getToken(PGLParser.KW_FLOAT, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public INTEGER_LITERAL_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.INTEGER_LITERAL);
	}
	public INTEGER_LITERAL(i: number): TerminalNode {
		return this.getToken(PGLParser.INTEGER_LITERAL, i);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public KW_DOUBLE(): TerminalNode {
		return this.getToken(PGLParser.KW_DOUBLE, 0);
	}
	public KW_PRECISION(): TerminalNode {
		return this.getToken(PGLParser.KW_PRECISION, 0);
	}
	public KW_DECIMAL(): TerminalNode {
		return this.getToken(PGLParser.KW_DECIMAL, 0);
	}
	public COMMA(): TerminalNode {
		return this.getToken(PGLParser.COMMA, 0);
	}
	public KW_NUMERIC(): TerminalNode {
		return this.getToken(PGLParser.KW_NUMERIC, 0);
	}
	public KW_BOOLEAN(): TerminalNode {
		return this.getToken(PGLParser.KW_BOOLEAN, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_numeric;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterNumeric) {
	 		listener.enterNumeric(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitNumeric) {
	 		listener.exitNumeric(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitNumeric) {
			return visitor.visitNumeric(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CharacterContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_CHARACTER(): TerminalNode {
		return this.getToken(PGLParser.KW_CHARACTER, 0);
	}
	public KW_CHAR(): TerminalNode {
		return this.getToken(PGLParser.KW_CHAR, 0);
	}
	public KW_VARYING(): TerminalNode {
		return this.getToken(PGLParser.KW_VARYING, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public INTEGER_LITERAL(): TerminalNode {
		return this.getToken(PGLParser.INTEGER_LITERAL, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public KW_VARCHAR(): TerminalNode {
		return this.getToken(PGLParser.KW_VARCHAR, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_character;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterCharacter) {
	 		listener.enterCharacter(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitCharacter) {
	 		listener.exitCharacter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitCharacter) {
			return visitor.visitCharacter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstdatetimeContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_TIMESTAMP(): TerminalNode {
		return this.getToken(PGLParser.KW_TIMESTAMP, 0);
	}
	public KW_TIME(): TerminalNode {
		return this.getToken(PGLParser.KW_TIME, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public INTEGER_LITERAL(): TerminalNode {
		return this.getToken(PGLParser.INTEGER_LITERAL, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public timezone_(): Timezone_Context {
		return this.getTypedRuleContext(Timezone_Context, 0) as Timezone_Context;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_constdatetime;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterConstdatetime) {
	 		listener.enterConstdatetime(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitConstdatetime) {
	 		listener.exitConstdatetime(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitConstdatetime) {
			return visitor.visitConstdatetime(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Timezone_Context extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_WITH(): TerminalNode {
		return this.getToken(PGLParser.KW_WITH, 0);
	}
	public KW_TIME(): TerminalNode {
		return this.getToken(PGLParser.KW_TIME, 0);
	}
	public KW_ZONE(): TerminalNode {
		return this.getToken(PGLParser.KW_ZONE, 0);
	}
	public KW_WITHOUT(): TerminalNode {
		return this.getToken(PGLParser.KW_WITHOUT, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_timezone_;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterTimezone_) {
	 		listener.enterTimezone_(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitTimezone_) {
	 		listener.exitTimezone_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitTimezone_) {
			return visitor.visitTimezone_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstintervalContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KW_INTERVAL(): TerminalNode {
		return this.getToken(PGLParser.KW_INTERVAL, 0);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_constinterval;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterConstinterval) {
	 		listener.enterConstinterval(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitConstinterval) {
	 		listener.exitConstinterval(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitConstinterval) {
			return visitor.visitConstinterval(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenerictypeContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_function_name(): Type_function_nameContext {
		return this.getTypedRuleContext(Type_function_nameContext, 0) as Type_function_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(PGLParser.L_PAREN, 0);
	}
	public INTEGER_LITERAL_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.INTEGER_LITERAL);
	}
	public INTEGER_LITERAL(i: number): TerminalNode {
		return this.getToken(PGLParser.INTEGER_LITERAL, i);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(PGLParser.R_PAREN, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(PGLParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_generictype;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterGenerictype) {
	 		listener.enterGenerictype(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitGenerictype) {
	 		listener.exitGenerictype(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitGenerictype) {
			return visitor.visitGenerictype(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
