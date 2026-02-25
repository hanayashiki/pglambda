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
	public static readonly KW_SELECT = 3;
	public static readonly KW_FROM = 4;
	public static readonly KW_WHERE = 5;
	public static readonly KW_AS = 6;
	public static readonly KW_AND = 7;
	public static readonly KW_OR = 8;
	public static readonly KW_NOT = 9;
	public static readonly KW_TRUE = 10;
	public static readonly KW_FALSE = 11;
	public static readonly KW_NULL = 12;
	public static readonly KW_IS = 13;
	public static readonly KW_IN = 14;
	public static readonly KW_LIKE = 15;
	public static readonly KW_BETWEEN = 16;
	public static readonly COLONCOLON = 17;
	public static readonly COLON = 18;
	public static readonly COMMA = 19;
	public static readonly DOT = 20;
	public static readonly SEMICOLON = 21;
	public static readonly STAR = 22;
	public static readonly L_PAREN = 23;
	public static readonly R_PAREN = 24;
	public static readonly L_CURLY = 25;
	public static readonly R_CURLY = 26;
	public static readonly L_BRACKET = 27;
	public static readonly R_BRACKET = 28;
	public static readonly EQ = 29;
	public static readonly NEQ = 30;
	public static readonly LT = 31;
	public static readonly GT = 32;
	public static readonly LTE = 33;
	public static readonly GTE = 34;
	public static readonly PLUS = 35;
	public static readonly MINUS = 36;
	public static readonly SLASH = 37;
	public static readonly PERCENT = 38;
	public static readonly DOLLAR_LCURLY = 39;
	public static readonly INTEGER_LITERAL = 40;
	public static readonly NUMERIC_LITERAL = 41;
	public static readonly STRING_LITERAL = 42;
	public static readonly IDENTIFIER = 43;
	public static readonly QUOTED_IDENTIFIER = 44;
	public static readonly WS = 45;
	public static readonly LINE_COMMENT_QUERY = 46;
	public static readonly LINE_COMMENT = 47;
	public static readonly BLOCK_COMMENT = 48;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_identifier = 0;
	public static readonly RULE_qualified_name = 1;
	public static readonly RULE_prog = 2;
	public static readonly RULE_def = 3;
	public static readonly RULE_query_def = 4;
	public static readonly RULE_type_parameter_list = 5;
	public static readonly RULE_query_parameter_list = 6;
	public static readonly RULE_query_parameter = 7;
	public static readonly RULE_query_body = 8;
	public static readonly RULE_simple_select = 9;
	public static readonly RULE_target_list = 10;
	public static readonly RULE_target_el = 11;
	public static readonly RULE_from_clause = 12;
	public static readonly RULE_from_list = 13;
	public static readonly RULE_table_ref = 14;
	public static readonly RULE_relation_expr = 15;
	public static readonly RULE_where_clause = 16;
	public static readonly RULE_a_expr = 17;
	public static readonly RULE_a_expr_or = 18;
	public static readonly RULE_a_expr_and = 19;
	public static readonly RULE_a_expr_between = 20;
	public static readonly RULE_a_expr_in = 21;
	public static readonly RULE_a_expr_unary_not = 22;
	public static readonly RULE_a_expr_isnull = 23;
	public static readonly RULE_a_expr_is_not = 24;
	public static readonly RULE_a_expr_compare = 25;
	public static readonly RULE_a_expr_like = 26;
	public static readonly RULE_a_expr_add = 27;
	public static readonly RULE_a_expr_mul = 28;
	public static readonly RULE_a_expr_unary = 29;
	public static readonly RULE_c_expr = 30;
	public static readonly RULE_pgl_expr = 31;
	public static readonly RULE_pgl_query_call = 32;
	public static readonly RULE_type_argument_list = 33;
	public static readonly RULE_columnref = 34;
	public static readonly RULE_aexprconst = 35;
	public static readonly RULE_type_def = 36;
	public static readonly RULE_type_expression = 37;
	public static readonly literalNames: (string | null)[] = [ null, "'query'", 
                                                            "'type'", "'select'", 
                                                            "'from'", "'where'", 
                                                            "'as'", "'and'", 
                                                            "'or'", "'not'", 
                                                            "'true'", "'false'", 
                                                            "'null'", "'is'", 
                                                            "'in'", "'like'", 
                                                            "'between'", 
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
		"identifier", "qualified_name", "prog", "def", "query_def", "type_parameter_list", 
		"query_parameter_list", "query_parameter", "query_body", "simple_select", 
		"target_list", "target_el", "from_clause", "from_list", "table_ref", "relation_expr", 
		"where_clause", "a_expr", "a_expr_or", "a_expr_and", "a_expr_between", 
		"a_expr_in", "a_expr_unary_not", "a_expr_isnull", "a_expr_is_not", "a_expr_compare", 
		"a_expr_like", "a_expr_add", "a_expr_mul", "a_expr_unary", "c_expr", "pgl_expr", 
		"pgl_query_call", "type_argument_list", "columnref", "aexprconst", "type_def", 
		"type_expression",
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
	public identifier(): IdentifierContext {
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, PGLParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 76;
			_la = this._input.LA(1);
			if(!(_la===43 || _la===44)) {
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
	public qualified_name(): Qualified_nameContext {
		let localctx: Qualified_nameContext = new Qualified_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, PGLParser.RULE_qualified_name);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 78;
			this.identifier();
			this.state = 83;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 79;
				this.match(PGLParser.DOT);
				this.state = 80;
				this.identifier();
				}
				}
				this.state = 85;
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
	public prog(): ProgContext {
		let localctx: ProgContext = new ProgContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, PGLParser.RULE_prog);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 89;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1 || _la===2) {
				{
				{
				this.state = 86;
				this.def();
				}
				}
				this.state = 91;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 92;
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
		this.enterRule(localctx, 6, PGLParser.RULE_def);
		try {
			this.state = 96;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 94;
				this.query_def();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 95;
				this.type_def();
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
		this.enterRule(localctx, 8, PGLParser.RULE_query_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 98;
			this.match(PGLParser.KW_QUERY);
			this.state = 99;
			this.identifier();
			this.state = 101;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===31) {
				{
				this.state = 100;
				this.type_parameter_list();
				}
			}

			this.state = 103;
			this.query_parameter_list();
			this.state = 104;
			this.match(PGLParser.L_CURLY);
			this.state = 105;
			this.query_body();
			this.state = 106;
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
		this.enterRule(localctx, 10, PGLParser.RULE_type_parameter_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 108;
			this.match(PGLParser.LT);
			this.state = 109;
			this.identifier();
			this.state = 114;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===19) {
				{
				{
				this.state = 110;
				this.match(PGLParser.COMMA);
				this.state = 111;
				this.identifier();
				}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 117;
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
		this.enterRule(localctx, 12, PGLParser.RULE_query_parameter_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 119;
			this.match(PGLParser.L_PAREN);
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43 || _la===44) {
				{
				this.state = 120;
				this.query_parameter();
				this.state = 125;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 121;
						this.match(PGLParser.COMMA);
						this.state = 122;
						this.query_parameter();
						}
						}
					}
					this.state = 127;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				}
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===19) {
					{
					this.state = 128;
					this.match(PGLParser.COMMA);
					}
				}

				}
			}

			this.state = 133;
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
		this.enterRule(localctx, 14, PGLParser.RULE_query_parameter);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 135;
			this.identifier();
			this.state = 138;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 136;
				this.match(PGLParser.COLON);
				this.state = 137;
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
		this.enterRule(localctx, 16, PGLParser.RULE_query_body);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 140;
			this.simple_select();
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
		this.enterRule(localctx, 18, PGLParser.RULE_simple_select);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 142;
			this.match(PGLParser.KW_SELECT);
			this.state = 143;
			this.target_list();
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 144;
				this.from_clause();
				}
			}

			this.state = 148;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 147;
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
		this.enterRule(localctx, 20, PGLParser.RULE_target_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 150;
			this.target_el();
			this.state = 155;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===19) {
				{
				{
				this.state = 151;
				this.match(PGLParser.COMMA);
				this.state = 152;
				this.target_el();
				}
				}
				this.state = 157;
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
		this.enterRule(localctx, 22, PGLParser.RULE_target_el);
		let _la: number;
		try {
			this.state = 166;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 10:
			case 11:
			case 12:
			case 23:
			case 35:
			case 36:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
				localctx = new Target_labelContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 158;
				this.a_expr();
				this.state = 163;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===6 || _la===43 || _la===44) {
					{
					this.state = 160;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===6) {
						{
						this.state = 159;
						this.match(PGLParser.KW_AS);
						}
					}

					this.state = 162;
					this.identifier();
					}
				}

				}
				break;
			case 22:
				localctx = new Target_starContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 165;
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
		this.enterRule(localctx, 24, PGLParser.RULE_from_clause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 168;
			this.match(PGLParser.KW_FROM);
			this.state = 169;
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
		this.enterRule(localctx, 26, PGLParser.RULE_from_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 171;
			this.table_ref();
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===19) {
				{
				{
				this.state = 172;
				this.match(PGLParser.COMMA);
				this.state = 173;
				this.table_ref();
				}
				}
				this.state = 178;
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
		this.enterRule(localctx, 28, PGLParser.RULE_table_ref);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 179;
			this.relation_expr();
			this.state = 184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6 || _la===43 || _la===44) {
				{
				this.state = 181;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===6) {
					{
					this.state = 180;
					this.match(PGLParser.KW_AS);
					}
				}

				this.state = 183;
				this.identifier();
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
	public relation_expr(): Relation_exprContext {
		let localctx: Relation_exprContext = new Relation_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, PGLParser.RULE_relation_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
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
		this.enterRule(localctx, 32, PGLParser.RULE_where_clause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 188;
			this.match(PGLParser.KW_WHERE);
			this.state = 189;
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
		this.enterRule(localctx, 34, PGLParser.RULE_a_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 191;
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
		this.enterRule(localctx, 36, PGLParser.RULE_a_expr_or);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 193;
			this.a_expr_and();
			this.state = 198;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 194;
				this.match(PGLParser.KW_OR);
				this.state = 195;
				this.a_expr_and();
				}
				}
				this.state = 200;
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
		this.enterRule(localctx, 38, PGLParser.RULE_a_expr_and);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 201;
			this.a_expr_between();
			this.state = 206;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 202;
				this.match(PGLParser.KW_AND);
				this.state = 203;
				this.a_expr_between();
				}
				}
				this.state = 208;
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
		this.enterRule(localctx, 40, PGLParser.RULE_a_expr_between);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.a_expr_in();
			this.state = 218;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===16) {
				{
				this.state = 211;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 210;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 213;
				this.match(PGLParser.KW_BETWEEN);
				this.state = 214;
				this.a_expr_in();
				this.state = 215;
				this.match(PGLParser.KW_AND);
				this.state = 216;
				this.a_expr_in();
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
	public a_expr_in(): A_expr_inContext {
		let localctx: A_expr_inContext = new A_expr_inContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, PGLParser.RULE_a_expr_in);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 220;
			this.a_expr_unary_not();
			this.state = 237;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 222;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 221;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 224;
				this.match(PGLParser.KW_IN);
				this.state = 225;
				this.match(PGLParser.L_PAREN);
				this.state = 234;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 8396288) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1011) !== 0)) {
					{
					this.state = 226;
					this.a_expr();
					this.state = 231;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===19) {
						{
						{
						this.state = 227;
						this.match(PGLParser.COMMA);
						this.state = 228;
						this.a_expr();
						}
						}
						this.state = 233;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 236;
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
		this.enterRule(localctx, 44, PGLParser.RULE_a_expr_unary_not);
		try {
			this.state = 242;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 239;
				this.match(PGLParser.KW_NOT);
				this.state = 240;
				this.a_expr_unary_not();
				}
				break;
			case 10:
			case 11:
			case 12:
			case 23:
			case 35:
			case 36:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 241;
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
		this.enterRule(localctx, 46, PGLParser.RULE_a_expr_isnull);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 244;
			this.a_expr_is_not();
			this.state = 250;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 245;
				this.match(PGLParser.KW_IS);
				this.state = 247;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 246;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 249;
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
		this.enterRule(localctx, 48, PGLParser.RULE_a_expr_is_not);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 252;
			this.a_expr_compare();
			this.state = 258;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				this.state = 253;
				this.match(PGLParser.KW_IS);
				this.state = 255;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 254;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 257;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 7168) !== 0))) {
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
		this.enterRule(localctx, 50, PGLParser.RULE_a_expr_compare);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 260;
			this.a_expr_like();
			this.state = 263;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & 63) !== 0)) {
				{
				this.state = 261;
				_la = this._input.LA(1);
				if(!(((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & 63) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 262;
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
		this.enterRule(localctx, 52, PGLParser.RULE_a_expr_like);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 265;
			this.a_expr_add();
			this.state = 271;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 266;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 269;
				this.match(PGLParser.KW_LIKE);
				this.state = 270;
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
		this.enterRule(localctx, 54, PGLParser.RULE_a_expr_add);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 273;
			this.a_expr_mul();
			this.state = 278;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===35 || _la===36) {
				{
				{
				this.state = 274;
				_la = this._input.LA(1);
				if(!(_la===35 || _la===36)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 275;
				this.a_expr_mul();
				}
				}
				this.state = 280;
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
		this.enterRule(localctx, 56, PGLParser.RULE_a_expr_mul);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 281;
			this.a_expr_unary();
			this.state = 286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 22)) & ~0x1F) === 0 && ((1 << (_la - 22)) & 98305) !== 0)) {
				{
				{
				this.state = 282;
				_la = this._input.LA(1);
				if(!(((((_la - 22)) & ~0x1F) === 0 && ((1 << (_la - 22)) & 98305) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 283;
				this.a_expr_unary();
				}
				}
				this.state = 288;
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
		this.enterRule(localctx, 58, PGLParser.RULE_a_expr_unary);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===35 || _la===36) {
				{
				this.state = 289;
				_la = this._input.LA(1);
				if(!(_la===35 || _la===36)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 292;
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
		this.enterRule(localctx, 60, PGLParser.RULE_c_expr);
		try {
			this.state = 301;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 39:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 294;
				this.pgl_expr();
				}
				break;
			case 43:
			case 44:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 295;
				this.columnref();
				}
				break;
			case 10:
			case 11:
			case 12:
			case 40:
			case 41:
			case 42:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 296;
				this.aexprconst();
				}
				break;
			case 23:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 297;
				this.match(PGLParser.L_PAREN);
				this.state = 298;
				this.a_expr();
				this.state = 299;
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
		this.enterRule(localctx, 62, PGLParser.RULE_pgl_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 303;
			this.match(PGLParser.DOLLAR_LCURLY);
			this.state = 304;
			this.pgl_query_call();
			this.state = 305;
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
	public pgl_query_call(): Pgl_query_callContext {
		let localctx: Pgl_query_callContext = new Pgl_query_callContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, PGLParser.RULE_pgl_query_call);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 307;
			this.qualified_name();
			this.state = 309;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===17) {
				{
				this.state = 308;
				this.type_argument_list();
				}
			}

			this.state = 311;
			this.match(PGLParser.L_PAREN);
			this.state = 320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 8396288) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 1011) !== 0)) {
				{
				this.state = 312;
				this.a_expr();
				this.state = 317;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===19) {
					{
					{
					this.state = 313;
					this.match(PGLParser.COMMA);
					this.state = 314;
					this.a_expr();
					}
					}
					this.state = 319;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 322;
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
		this.enterRule(localctx, 66, PGLParser.RULE_type_argument_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 324;
			this.match(PGLParser.COLONCOLON);
			this.state = 325;
			this.match(PGLParser.LT);
			this.state = 326;
			this.type_expression();
			this.state = 331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===19) {
				{
				{
				this.state = 327;
				this.match(PGLParser.COMMA);
				this.state = 328;
				this.type_expression();
				}
				}
				this.state = 333;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 334;
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
	public columnref(): ColumnrefContext {
		let localctx: ColumnrefContext = new ColumnrefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, PGLParser.RULE_columnref);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 336;
			this.identifier();
			this.state = 344;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 337;
				this.match(PGLParser.DOT);
				this.state = 340;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
				case 44:
					{
					this.state = 338;
					this.identifier();
					}
					break;
				case 22:
					{
					this.state = 339;
					this.match(PGLParser.STAR);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 346;
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
		this.enterRule(localctx, 70, PGLParser.RULE_aexprconst);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 347;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 7168) !== 0) || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 7) !== 0))) {
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
		this.enterRule(localctx, 72, PGLParser.RULE_type_def);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 349;
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
		this.enterRule(localctx, 74, PGLParser.RULE_type_expression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 351;
			this.identifier();
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

	public static readonly _serializedATN: number[] = [4,1,48,354,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,1,0,1,0,1,1,
	1,1,1,1,5,1,82,8,1,10,1,12,1,85,9,1,1,2,5,2,88,8,2,10,2,12,2,91,9,2,1,2,
	1,2,1,3,1,3,3,3,97,8,3,1,4,1,4,1,4,3,4,102,8,4,1,4,1,4,1,4,1,4,1,4,1,5,
	1,5,1,5,1,5,5,5,113,8,5,10,5,12,5,116,9,5,1,5,1,5,1,6,1,6,1,6,1,6,5,6,124,
	8,6,10,6,12,6,127,9,6,1,6,3,6,130,8,6,3,6,132,8,6,1,6,1,6,1,7,1,7,1,7,3,
	7,139,8,7,1,8,1,8,1,9,1,9,1,9,3,9,146,8,9,1,9,3,9,149,8,9,1,10,1,10,1,10,
	5,10,154,8,10,10,10,12,10,157,9,10,1,11,1,11,3,11,161,8,11,1,11,3,11,164,
	8,11,1,11,3,11,167,8,11,1,12,1,12,1,12,1,13,1,13,1,13,5,13,175,8,13,10,
	13,12,13,178,9,13,1,14,1,14,3,14,182,8,14,1,14,3,14,185,8,14,1,15,1,15,
	1,16,1,16,1,16,1,17,1,17,1,18,1,18,1,18,5,18,197,8,18,10,18,12,18,200,9,
	18,1,19,1,19,1,19,5,19,205,8,19,10,19,12,19,208,9,19,1,20,1,20,3,20,212,
	8,20,1,20,1,20,1,20,1,20,1,20,3,20,219,8,20,1,21,1,21,3,21,223,8,21,1,21,
	1,21,1,21,1,21,1,21,5,21,230,8,21,10,21,12,21,233,9,21,3,21,235,8,21,1,
	21,3,21,238,8,21,1,22,1,22,1,22,3,22,243,8,22,1,23,1,23,1,23,3,23,248,8,
	23,1,23,3,23,251,8,23,1,24,1,24,1,24,3,24,256,8,24,1,24,3,24,259,8,24,1,
	25,1,25,1,25,3,25,264,8,25,1,26,1,26,3,26,268,8,26,1,26,1,26,3,26,272,8,
	26,1,27,1,27,1,27,5,27,277,8,27,10,27,12,27,280,9,27,1,28,1,28,1,28,5,28,
	285,8,28,10,28,12,28,288,9,28,1,29,3,29,291,8,29,1,29,1,29,1,30,1,30,1,
	30,1,30,1,30,1,30,1,30,3,30,302,8,30,1,31,1,31,1,31,1,31,1,32,1,32,3,32,
	310,8,32,1,32,1,32,1,32,1,32,5,32,316,8,32,10,32,12,32,319,9,32,3,32,321,
	8,32,1,32,1,32,1,33,1,33,1,33,1,33,1,33,5,33,330,8,33,10,33,12,33,333,9,
	33,1,33,1,33,1,34,1,34,1,34,1,34,3,34,341,8,34,5,34,343,8,34,10,34,12,34,
	346,9,34,1,35,1,35,1,36,1,36,1,37,1,37,1,37,0,0,38,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,
	66,68,70,72,74,0,6,1,0,43,44,1,0,10,12,1,0,29,34,1,0,35,36,2,0,22,22,37,
	38,2,0,10,12,40,42,361,0,76,1,0,0,0,2,78,1,0,0,0,4,89,1,0,0,0,6,96,1,0,
	0,0,8,98,1,0,0,0,10,108,1,0,0,0,12,119,1,0,0,0,14,135,1,0,0,0,16,140,1,
	0,0,0,18,142,1,0,0,0,20,150,1,0,0,0,22,166,1,0,0,0,24,168,1,0,0,0,26,171,
	1,0,0,0,28,179,1,0,0,0,30,186,1,0,0,0,32,188,1,0,0,0,34,191,1,0,0,0,36,
	193,1,0,0,0,38,201,1,0,0,0,40,209,1,0,0,0,42,220,1,0,0,0,44,242,1,0,0,0,
	46,244,1,0,0,0,48,252,1,0,0,0,50,260,1,0,0,0,52,265,1,0,0,0,54,273,1,0,
	0,0,56,281,1,0,0,0,58,290,1,0,0,0,60,301,1,0,0,0,62,303,1,0,0,0,64,307,
	1,0,0,0,66,324,1,0,0,0,68,336,1,0,0,0,70,347,1,0,0,0,72,349,1,0,0,0,74,
	351,1,0,0,0,76,77,7,0,0,0,77,1,1,0,0,0,78,83,3,0,0,0,79,80,5,20,0,0,80,
	82,3,0,0,0,81,79,1,0,0,0,82,85,1,0,0,0,83,81,1,0,0,0,83,84,1,0,0,0,84,3,
	1,0,0,0,85,83,1,0,0,0,86,88,3,6,3,0,87,86,1,0,0,0,88,91,1,0,0,0,89,87,1,
	0,0,0,89,90,1,0,0,0,90,92,1,0,0,0,91,89,1,0,0,0,92,93,5,0,0,1,93,5,1,0,
	0,0,94,97,3,8,4,0,95,97,3,72,36,0,96,94,1,0,0,0,96,95,1,0,0,0,97,7,1,0,
	0,0,98,99,5,1,0,0,99,101,3,0,0,0,100,102,3,10,5,0,101,100,1,0,0,0,101,102,
	1,0,0,0,102,103,1,0,0,0,103,104,3,12,6,0,104,105,5,25,0,0,105,106,3,16,
	8,0,106,107,5,26,0,0,107,9,1,0,0,0,108,109,5,31,0,0,109,114,3,0,0,0,110,
	111,5,19,0,0,111,113,3,0,0,0,112,110,1,0,0,0,113,116,1,0,0,0,114,112,1,
	0,0,0,114,115,1,0,0,0,115,117,1,0,0,0,116,114,1,0,0,0,117,118,5,32,0,0,
	118,11,1,0,0,0,119,131,5,23,0,0,120,125,3,14,7,0,121,122,5,19,0,0,122,124,
	3,14,7,0,123,121,1,0,0,0,124,127,1,0,0,0,125,123,1,0,0,0,125,126,1,0,0,
	0,126,129,1,0,0,0,127,125,1,0,0,0,128,130,5,19,0,0,129,128,1,0,0,0,129,
	130,1,0,0,0,130,132,1,0,0,0,131,120,1,0,0,0,131,132,1,0,0,0,132,133,1,0,
	0,0,133,134,5,24,0,0,134,13,1,0,0,0,135,138,3,0,0,0,136,137,5,18,0,0,137,
	139,3,74,37,0,138,136,1,0,0,0,138,139,1,0,0,0,139,15,1,0,0,0,140,141,3,
	18,9,0,141,17,1,0,0,0,142,143,5,3,0,0,143,145,3,20,10,0,144,146,3,24,12,
	0,145,144,1,0,0,0,145,146,1,0,0,0,146,148,1,0,0,0,147,149,3,32,16,0,148,
	147,1,0,0,0,148,149,1,0,0,0,149,19,1,0,0,0,150,155,3,22,11,0,151,152,5,
	19,0,0,152,154,3,22,11,0,153,151,1,0,0,0,154,157,1,0,0,0,155,153,1,0,0,
	0,155,156,1,0,0,0,156,21,1,0,0,0,157,155,1,0,0,0,158,163,3,34,17,0,159,
	161,5,6,0,0,160,159,1,0,0,0,160,161,1,0,0,0,161,162,1,0,0,0,162,164,3,0,
	0,0,163,160,1,0,0,0,163,164,1,0,0,0,164,167,1,0,0,0,165,167,5,22,0,0,166,
	158,1,0,0,0,166,165,1,0,0,0,167,23,1,0,0,0,168,169,5,4,0,0,169,170,3,26,
	13,0,170,25,1,0,0,0,171,176,3,28,14,0,172,173,5,19,0,0,173,175,3,28,14,
	0,174,172,1,0,0,0,175,178,1,0,0,0,176,174,1,0,0,0,176,177,1,0,0,0,177,27,
	1,0,0,0,178,176,1,0,0,0,179,184,3,30,15,0,180,182,5,6,0,0,181,180,1,0,0,
	0,181,182,1,0,0,0,182,183,1,0,0,0,183,185,3,0,0,0,184,181,1,0,0,0,184,185,
	1,0,0,0,185,29,1,0,0,0,186,187,3,2,1,0,187,31,1,0,0,0,188,189,5,5,0,0,189,
	190,3,34,17,0,190,33,1,0,0,0,191,192,3,36,18,0,192,35,1,0,0,0,193,198,3,
	38,19,0,194,195,5,8,0,0,195,197,3,38,19,0,196,194,1,0,0,0,197,200,1,0,0,
	0,198,196,1,0,0,0,198,199,1,0,0,0,199,37,1,0,0,0,200,198,1,0,0,0,201,206,
	3,40,20,0,202,203,5,7,0,0,203,205,3,40,20,0,204,202,1,0,0,0,205,208,1,0,
	0,0,206,204,1,0,0,0,206,207,1,0,0,0,207,39,1,0,0,0,208,206,1,0,0,0,209,
	218,3,42,21,0,210,212,5,9,0,0,211,210,1,0,0,0,211,212,1,0,0,0,212,213,1,
	0,0,0,213,214,5,16,0,0,214,215,3,42,21,0,215,216,5,7,0,0,216,217,3,42,21,
	0,217,219,1,0,0,0,218,211,1,0,0,0,218,219,1,0,0,0,219,41,1,0,0,0,220,237,
	3,44,22,0,221,223,5,9,0,0,222,221,1,0,0,0,222,223,1,0,0,0,223,224,1,0,0,
	0,224,225,5,14,0,0,225,234,5,23,0,0,226,231,3,34,17,0,227,228,5,19,0,0,
	228,230,3,34,17,0,229,227,1,0,0,0,230,233,1,0,0,0,231,229,1,0,0,0,231,232,
	1,0,0,0,232,235,1,0,0,0,233,231,1,0,0,0,234,226,1,0,0,0,234,235,1,0,0,0,
	235,236,1,0,0,0,236,238,5,24,0,0,237,222,1,0,0,0,237,238,1,0,0,0,238,43,
	1,0,0,0,239,240,5,9,0,0,240,243,3,44,22,0,241,243,3,46,23,0,242,239,1,0,
	0,0,242,241,1,0,0,0,243,45,1,0,0,0,244,250,3,48,24,0,245,247,5,13,0,0,246,
	248,5,9,0,0,247,246,1,0,0,0,247,248,1,0,0,0,248,249,1,0,0,0,249,251,5,12,
	0,0,250,245,1,0,0,0,250,251,1,0,0,0,251,47,1,0,0,0,252,258,3,50,25,0,253,
	255,5,13,0,0,254,256,5,9,0,0,255,254,1,0,0,0,255,256,1,0,0,0,256,257,1,
	0,0,0,257,259,7,1,0,0,258,253,1,0,0,0,258,259,1,0,0,0,259,49,1,0,0,0,260,
	263,3,52,26,0,261,262,7,2,0,0,262,264,3,52,26,0,263,261,1,0,0,0,263,264,
	1,0,0,0,264,51,1,0,0,0,265,271,3,54,27,0,266,268,5,9,0,0,267,266,1,0,0,
	0,267,268,1,0,0,0,268,269,1,0,0,0,269,270,5,15,0,0,270,272,3,54,27,0,271,
	267,1,0,0,0,271,272,1,0,0,0,272,53,1,0,0,0,273,278,3,56,28,0,274,275,7,
	3,0,0,275,277,3,56,28,0,276,274,1,0,0,0,277,280,1,0,0,0,278,276,1,0,0,0,
	278,279,1,0,0,0,279,55,1,0,0,0,280,278,1,0,0,0,281,286,3,58,29,0,282,283,
	7,4,0,0,283,285,3,58,29,0,284,282,1,0,0,0,285,288,1,0,0,0,286,284,1,0,0,
	0,286,287,1,0,0,0,287,57,1,0,0,0,288,286,1,0,0,0,289,291,7,3,0,0,290,289,
	1,0,0,0,290,291,1,0,0,0,291,292,1,0,0,0,292,293,3,60,30,0,293,59,1,0,0,
	0,294,302,3,62,31,0,295,302,3,68,34,0,296,302,3,70,35,0,297,298,5,23,0,
	0,298,299,3,34,17,0,299,300,5,24,0,0,300,302,1,0,0,0,301,294,1,0,0,0,301,
	295,1,0,0,0,301,296,1,0,0,0,301,297,1,0,0,0,302,61,1,0,0,0,303,304,5,39,
	0,0,304,305,3,64,32,0,305,306,5,26,0,0,306,63,1,0,0,0,307,309,3,2,1,0,308,
	310,3,66,33,0,309,308,1,0,0,0,309,310,1,0,0,0,310,311,1,0,0,0,311,320,5,
	23,0,0,312,317,3,34,17,0,313,314,5,19,0,0,314,316,3,34,17,0,315,313,1,0,
	0,0,316,319,1,0,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,321,1,0,0,0,319,
	317,1,0,0,0,320,312,1,0,0,0,320,321,1,0,0,0,321,322,1,0,0,0,322,323,5,24,
	0,0,323,65,1,0,0,0,324,325,5,17,0,0,325,326,5,31,0,0,326,331,3,74,37,0,
	327,328,5,19,0,0,328,330,3,74,37,0,329,327,1,0,0,0,330,333,1,0,0,0,331,
	329,1,0,0,0,331,332,1,0,0,0,332,334,1,0,0,0,333,331,1,0,0,0,334,335,5,32,
	0,0,335,67,1,0,0,0,336,344,3,0,0,0,337,340,5,20,0,0,338,341,3,0,0,0,339,
	341,5,22,0,0,340,338,1,0,0,0,340,339,1,0,0,0,341,343,1,0,0,0,342,337,1,
	0,0,0,343,346,1,0,0,0,344,342,1,0,0,0,344,345,1,0,0,0,345,69,1,0,0,0,346,
	344,1,0,0,0,347,348,7,5,0,0,348,71,1,0,0,0,349,350,5,2,0,0,350,73,1,0,0,
	0,351,352,3,0,0,0,352,75,1,0,0,0,44,83,89,96,101,114,125,129,131,138,145,
	148,155,160,163,166,176,181,184,198,206,211,218,222,231,234,237,242,247,
	250,255,258,263,267,271,278,286,290,301,309,317,320,331,340,344];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PGLParser.__ATN) {
			PGLParser.__ATN = new ATNDeserializer().deserialize(PGLParser._serializedATN);
		}

		return PGLParser.__ATN;
	}


	static DecisionsToDFA = PGLParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

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


export class Qualified_nameContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(PGLParser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(PGLParser.DOT, i);
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
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
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
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
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
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
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
	public simple_select(): Simple_selectContext {
		return this.getTypedRuleContext(Simple_selectContext, 0) as Simple_selectContext;
	}
    public get ruleIndex(): number {
    	return PGLParser.RULE_query_body;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterQuery_body) {
	 		listener.enterQuery_body(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitQuery_body) {
	 		listener.exitQuery_body(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitQuery_body) {
			return visitor.visitQuery_body(this);
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
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public KW_AS(): TerminalNode {
		return this.getToken(PGLParser.KW_AS, 0);
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
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public KW_AS(): TerminalNode {
		return this.getToken(PGLParser.KW_AS, 0);
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
	public pgl_expr(): Pgl_exprContext {
		return this.getTypedRuleContext(Pgl_exprContext, 0) as Pgl_exprContext;
	}
	public columnref(): ColumnrefContext {
		return this.getTypedRuleContext(ColumnrefContext, 0) as ColumnrefContext;
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
	public DOLLAR_LCURLY(): TerminalNode {
		return this.getToken(PGLParser.DOLLAR_LCURLY, 0);
	}
	public pgl_query_call(): Pgl_query_callContext {
		return this.getTypedRuleContext(Pgl_query_callContext, 0) as Pgl_query_callContext;
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(PGLParser.R_CURLY, 0);
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


export class ColumnrefContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
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
    	return PGLParser.RULE_columnref;
	}
	public enterRule(listener: PGLParserListener): void {
	    if(listener.enterColumnref) {
	 		listener.enterColumnref(this);
		}
	}
	public exitRule(listener: PGLParserListener): void {
	    if(listener.exitColumnref) {
	 		listener.exitColumnref(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PGLParserVisitor<Result>): Result {
		if (visitor.visitColumnref) {
			return visitor.visitColumnref(this);
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
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
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
