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
	public static readonly COLON = 17;
	public static readonly COMMA = 18;
	public static readonly DOT = 19;
	public static readonly SEMICOLON = 20;
	public static readonly STAR = 21;
	public static readonly L_PAREN = 22;
	public static readonly R_PAREN = 23;
	public static readonly L_CURLY = 24;
	public static readonly R_CURLY = 25;
	public static readonly L_BRACKET = 26;
	public static readonly R_BRACKET = 27;
	public static readonly EQ = 28;
	public static readonly NEQ = 29;
	public static readonly LT = 30;
	public static readonly GT = 31;
	public static readonly LTE = 32;
	public static readonly GTE = 33;
	public static readonly PLUS = 34;
	public static readonly MINUS = 35;
	public static readonly SLASH = 36;
	public static readonly PERCENT = 37;
	public static readonly INTEGER_LITERAL = 38;
	public static readonly NUMERIC_LITERAL = 39;
	public static readonly STRING_LITERAL = 40;
	public static readonly IDENTIFIER = 41;
	public static readonly QUOTED_IDENTIFIER = 42;
	public static readonly PARAM = 43;
	public static readonly WS = 44;
	public static readonly LINE_COMMENT = 45;
	public static readonly BLOCK_COMMENT = 46;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_identifier = 0;
	public static readonly RULE_qualified_name = 1;
	public static readonly RULE_prog = 2;
	public static readonly RULE_def = 3;
	public static readonly RULE_query_def = 4;
	public static readonly RULE_query_parameter_list = 5;
	public static readonly RULE_query_parameter = 6;
	public static readonly RULE_query_body = 7;
	public static readonly RULE_simple_select = 8;
	public static readonly RULE_target_list = 9;
	public static readonly RULE_target_el = 10;
	public static readonly RULE_from_clause = 11;
	public static readonly RULE_from_list = 12;
	public static readonly RULE_table_ref = 13;
	public static readonly RULE_relation_expr = 14;
	public static readonly RULE_where_clause = 15;
	public static readonly RULE_a_expr = 16;
	public static readonly RULE_a_expr_or = 17;
	public static readonly RULE_a_expr_and = 18;
	public static readonly RULE_a_expr_between = 19;
	public static readonly RULE_a_expr_in = 20;
	public static readonly RULE_a_expr_unary_not = 21;
	public static readonly RULE_a_expr_isnull = 22;
	public static readonly RULE_a_expr_is_not = 23;
	public static readonly RULE_a_expr_compare = 24;
	public static readonly RULE_a_expr_like = 25;
	public static readonly RULE_a_expr_add = 26;
	public static readonly RULE_a_expr_mul = 27;
	public static readonly RULE_a_expr_unary = 28;
	public static readonly RULE_c_expr = 29;
	public static readonly RULE_columnref = 30;
	public static readonly RULE_aexprconst = 31;
	public static readonly RULE_type_def = 32;
	public static readonly RULE_type_expression = 33;
	public static readonly literalNames: (string | null)[] = [ null, "'query'", 
                                                            "'type'", "'select'", 
                                                            "'from'", "'where'", 
                                                            "'as'", "'and'", 
                                                            "'or'", "'not'", 
                                                            "'true'", "'false'", 
                                                            "'null'", "'is'", 
                                                            "'in'", "'like'", 
                                                            "'between'", 
                                                            "':'", "','", 
                                                            "'.'", "';'", 
                                                            "'*'", "'('", 
                                                            "')'", "'{'", 
                                                            "'}'", "'['", 
                                                            "']'", "'='", 
                                                            null, "'<'", 
                                                            "'>'", "'<='", 
                                                            "'>='", "'+'", 
                                                            "'-'", "'/'", 
                                                            "'%'" ];
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
                                                             "INTEGER_LITERAL", 
                                                             "NUMERIC_LITERAL", 
                                                             "STRING_LITERAL", 
                                                             "IDENTIFIER", 
                                                             "QUOTED_IDENTIFIER", 
                                                             "PARAM", "WS", 
                                                             "LINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"identifier", "qualified_name", "prog", "def", "query_def", "query_parameter_list", 
		"query_parameter", "query_body", "simple_select", "target_list", "target_el", 
		"from_clause", "from_list", "table_ref", "relation_expr", "where_clause", 
		"a_expr", "a_expr_or", "a_expr_and", "a_expr_between", "a_expr_in", "a_expr_unary_not", 
		"a_expr_isnull", "a_expr_is_not", "a_expr_compare", "a_expr_like", "a_expr_add", 
		"a_expr_mul", "a_expr_unary", "c_expr", "columnref", "aexprconst", "type_def", 
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
			this.state = 68;
			_la = this._input.LA(1);
			if(!(_la===41 || _la===42)) {
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
			this.state = 70;
			this.identifier();
			this.state = 75;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===19) {
				{
				{
				this.state = 71;
				this.match(PGLParser.DOT);
				this.state = 72;
				this.identifier();
				}
				}
				this.state = 77;
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
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1 || _la===2) {
				{
				{
				this.state = 78;
				this.def();
				}
				}
				this.state = 83;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 84;
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
			this.state = 88;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 86;
				this.query_def();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 87;
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
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 90;
			this.match(PGLParser.KW_QUERY);
			this.state = 91;
			this.identifier();
			this.state = 92;
			this.query_parameter_list();
			this.state = 93;
			this.match(PGLParser.L_CURLY);
			this.state = 94;
			this.query_body();
			this.state = 95;
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
	public query_parameter_list(): Query_parameter_listContext {
		let localctx: Query_parameter_listContext = new Query_parameter_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, PGLParser.RULE_query_parameter_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 97;
			this.match(PGLParser.L_PAREN);
			this.state = 109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 98;
				this.query_parameter();
				this.state = 103;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 99;
						this.match(PGLParser.COMMA);
						this.state = 100;
						this.query_parameter();
						}
						}
					}
					this.state = 105;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				this.state = 107;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===18) {
					{
					this.state = 106;
					this.match(PGLParser.COMMA);
					}
				}

				}
			}

			this.state = 111;
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
		this.enterRule(localctx, 12, PGLParser.RULE_query_parameter);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 113;
			this.match(PGLParser.PARAM);
			this.state = 116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===17) {
				{
				this.state = 114;
				this.match(PGLParser.COLON);
				this.state = 115;
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
		this.enterRule(localctx, 14, PGLParser.RULE_query_body);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 118;
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
		this.enterRule(localctx, 16, PGLParser.RULE_simple_select);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 120;
			this.match(PGLParser.KW_SELECT);
			this.state = 121;
			this.target_list();
			this.state = 123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 122;
				this.from_clause();
				}
			}

			this.state = 126;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 125;
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
		this.enterRule(localctx, 18, PGLParser.RULE_target_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 128;
			this.target_el();
			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===18) {
				{
				{
				this.state = 129;
				this.match(PGLParser.COMMA);
				this.state = 130;
				this.target_el();
				}
				}
				this.state = 135;
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
		this.enterRule(localctx, 20, PGLParser.RULE_target_el);
		let _la: number;
		try {
			this.state = 144;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 10:
			case 11:
			case 12:
			case 22:
			case 34:
			case 35:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
				localctx = new Target_labelContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 136;
				this.a_expr();
				this.state = 141;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===6 || _la===41 || _la===42) {
					{
					this.state = 138;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===6) {
						{
						this.state = 137;
						this.match(PGLParser.KW_AS);
						}
					}

					this.state = 140;
					this.identifier();
					}
				}

				}
				break;
			case 21:
				localctx = new Target_starContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 143;
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
		this.enterRule(localctx, 22, PGLParser.RULE_from_clause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 146;
			this.match(PGLParser.KW_FROM);
			this.state = 147;
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
		this.enterRule(localctx, 24, PGLParser.RULE_from_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 149;
			this.table_ref();
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===18) {
				{
				{
				this.state = 150;
				this.match(PGLParser.COMMA);
				this.state = 151;
				this.table_ref();
				}
				}
				this.state = 156;
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
		this.enterRule(localctx, 26, PGLParser.RULE_table_ref);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 157;
			this.relation_expr();
			this.state = 162;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6 || _la===41 || _la===42) {
				{
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===6) {
					{
					this.state = 158;
					this.match(PGLParser.KW_AS);
					}
				}

				this.state = 161;
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
		this.enterRule(localctx, 28, PGLParser.RULE_relation_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 164;
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
		this.enterRule(localctx, 30, PGLParser.RULE_where_clause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 166;
			this.match(PGLParser.KW_WHERE);
			this.state = 167;
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
		this.enterRule(localctx, 32, PGLParser.RULE_a_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 169;
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
		this.enterRule(localctx, 34, PGLParser.RULE_a_expr_or);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 171;
			this.a_expr_and();
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 172;
				this.match(PGLParser.KW_OR);
				this.state = 173;
				this.a_expr_and();
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
	public a_expr_and(): A_expr_andContext {
		let localctx: A_expr_andContext = new A_expr_andContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, PGLParser.RULE_a_expr_and);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 179;
			this.a_expr_between();
			this.state = 184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 180;
				this.match(PGLParser.KW_AND);
				this.state = 181;
				this.a_expr_between();
				}
				}
				this.state = 186;
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
		this.enterRule(localctx, 38, PGLParser.RULE_a_expr_between);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 187;
			this.a_expr_in();
			this.state = 196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===16) {
				{
				this.state = 189;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 188;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 191;
				this.match(PGLParser.KW_BETWEEN);
				this.state = 192;
				this.a_expr_in();
				this.state = 193;
				this.match(PGLParser.KW_AND);
				this.state = 194;
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
		this.enterRule(localctx, 40, PGLParser.RULE_a_expr_in);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 198;
			this.a_expr_unary_not();
			this.state = 215;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 200;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 199;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 202;
				this.match(PGLParser.KW_IN);
				this.state = 203;
				this.match(PGLParser.L_PAREN);
				this.state = 212;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4201984) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 1011) !== 0)) {
					{
					this.state = 204;
					this.a_expr();
					this.state = 209;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===18) {
						{
						{
						this.state = 205;
						this.match(PGLParser.COMMA);
						this.state = 206;
						this.a_expr();
						}
						}
						this.state = 211;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 214;
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
		this.enterRule(localctx, 42, PGLParser.RULE_a_expr_unary_not);
		try {
			this.state = 220;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 217;
				this.match(PGLParser.KW_NOT);
				this.state = 218;
				this.a_expr_unary_not();
				}
				break;
			case 10:
			case 11:
			case 12:
			case 22:
			case 34:
			case 35:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 219;
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
		this.enterRule(localctx, 44, PGLParser.RULE_a_expr_isnull);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 222;
			this.a_expr_is_not();
			this.state = 228;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 223;
				this.match(PGLParser.KW_IS);
				this.state = 225;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 224;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 227;
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
		this.enterRule(localctx, 46, PGLParser.RULE_a_expr_is_not);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			this.a_expr_compare();
			this.state = 236;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 231;
				this.match(PGLParser.KW_IS);
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 232;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 235;
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
		this.enterRule(localctx, 48, PGLParser.RULE_a_expr_compare);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 238;
			this.a_expr_like();
			this.state = 241;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 63) !== 0)) {
				{
				this.state = 239;
				_la = this._input.LA(1);
				if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 63) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 240;
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
		this.enterRule(localctx, 50, PGLParser.RULE_a_expr_like);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 243;
			this.a_expr_add();
			this.state = 249;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				{
				this.state = 245;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 244;
					this.match(PGLParser.KW_NOT);
					}
				}

				this.state = 247;
				this.match(PGLParser.KW_LIKE);
				this.state = 248;
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
		this.enterRule(localctx, 52, PGLParser.RULE_a_expr_add);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.a_expr_mul();
			this.state = 256;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===34 || _la===35) {
				{
				{
				this.state = 252;
				_la = this._input.LA(1);
				if(!(_la===34 || _la===35)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 253;
				this.a_expr_mul();
				}
				}
				this.state = 258;
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
		this.enterRule(localctx, 54, PGLParser.RULE_a_expr_mul);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 259;
			this.a_expr_unary();
			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & 98305) !== 0)) {
				{
				{
				this.state = 260;
				_la = this._input.LA(1);
				if(!(((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & 98305) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 261;
				this.a_expr_unary();
				}
				}
				this.state = 266;
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
		this.enterRule(localctx, 56, PGLParser.RULE_a_expr_unary);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===34 || _la===35) {
				{
				this.state = 267;
				_la = this._input.LA(1);
				if(!(_la===34 || _la===35)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 270;
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
		this.enterRule(localctx, 58, PGLParser.RULE_c_expr);
		try {
			this.state = 279;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 41:
			case 42:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 272;
				this.columnref();
				}
				break;
			case 43:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 273;
				this.match(PGLParser.PARAM);
				}
				break;
			case 10:
			case 11:
			case 12:
			case 38:
			case 39:
			case 40:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 274;
				this.aexprconst();
				}
				break;
			case 22:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 275;
				this.match(PGLParser.L_PAREN);
				this.state = 276;
				this.a_expr();
				this.state = 277;
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
	public columnref(): ColumnrefContext {
		let localctx: ColumnrefContext = new ColumnrefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, PGLParser.RULE_columnref);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 281;
			this.identifier();
			this.state = 289;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===19) {
				{
				{
				this.state = 282;
				this.match(PGLParser.DOT);
				this.state = 285;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 41:
				case 42:
					{
					this.state = 283;
					this.identifier();
					}
					break;
				case 21:
					{
					this.state = 284;
					this.match(PGLParser.STAR);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 291;
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
		this.enterRule(localctx, 62, PGLParser.RULE_aexprconst);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 292;
			_la = this._input.LA(1);
			if(!(((((_la - 10)) & ~0x1F) === 0 && ((1 << (_la - 10)) & 1879048199) !== 0))) {
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
		this.enterRule(localctx, 64, PGLParser.RULE_type_def);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 294;
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
		this.enterRule(localctx, 66, PGLParser.RULE_type_expression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 296;
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

	public static readonly _serializedATN: number[] = [4,1,46,299,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,1,0,1,0,1,1,1,1,1,1,5,1,74,8,1,10,1,12,1,77,9,1,1,2,
	5,2,80,8,2,10,2,12,2,83,9,2,1,2,1,2,1,3,1,3,3,3,89,8,3,1,4,1,4,1,4,1,4,
	1,4,1,4,1,4,1,5,1,5,1,5,1,5,5,5,102,8,5,10,5,12,5,105,9,5,1,5,3,5,108,8,
	5,3,5,110,8,5,1,5,1,5,1,6,1,6,1,6,3,6,117,8,6,1,7,1,7,1,8,1,8,1,8,3,8,124,
	8,8,1,8,3,8,127,8,8,1,9,1,9,1,9,5,9,132,8,9,10,9,12,9,135,9,9,1,10,1,10,
	3,10,139,8,10,1,10,3,10,142,8,10,1,10,3,10,145,8,10,1,11,1,11,1,11,1,12,
	1,12,1,12,5,12,153,8,12,10,12,12,12,156,9,12,1,13,1,13,3,13,160,8,13,1,
	13,3,13,163,8,13,1,14,1,14,1,15,1,15,1,15,1,16,1,16,1,17,1,17,1,17,5,17,
	175,8,17,10,17,12,17,178,9,17,1,18,1,18,1,18,5,18,183,8,18,10,18,12,18,
	186,9,18,1,19,1,19,3,19,190,8,19,1,19,1,19,1,19,1,19,1,19,3,19,197,8,19,
	1,20,1,20,3,20,201,8,20,1,20,1,20,1,20,1,20,1,20,5,20,208,8,20,10,20,12,
	20,211,9,20,3,20,213,8,20,1,20,3,20,216,8,20,1,21,1,21,1,21,3,21,221,8,
	21,1,22,1,22,1,22,3,22,226,8,22,1,22,3,22,229,8,22,1,23,1,23,1,23,3,23,
	234,8,23,1,23,3,23,237,8,23,1,24,1,24,1,24,3,24,242,8,24,1,25,1,25,3,25,
	246,8,25,1,25,1,25,3,25,250,8,25,1,26,1,26,1,26,5,26,255,8,26,10,26,12,
	26,258,9,26,1,27,1,27,1,27,5,27,263,8,27,10,27,12,27,266,9,27,1,28,3,28,
	269,8,28,1,28,1,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,280,8,29,1,30,
	1,30,1,30,1,30,3,30,286,8,30,5,30,288,8,30,10,30,12,30,291,9,30,1,31,1,
	31,1,32,1,32,1,33,1,33,1,33,0,0,34,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
	28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,0,6,1,0,41,
	42,1,0,10,12,1,0,28,33,1,0,34,35,2,0,21,21,36,37,2,0,10,12,38,40,304,0,
	68,1,0,0,0,2,70,1,0,0,0,4,81,1,0,0,0,6,88,1,0,0,0,8,90,1,0,0,0,10,97,1,
	0,0,0,12,113,1,0,0,0,14,118,1,0,0,0,16,120,1,0,0,0,18,128,1,0,0,0,20,144,
	1,0,0,0,22,146,1,0,0,0,24,149,1,0,0,0,26,157,1,0,0,0,28,164,1,0,0,0,30,
	166,1,0,0,0,32,169,1,0,0,0,34,171,1,0,0,0,36,179,1,0,0,0,38,187,1,0,0,0,
	40,198,1,0,0,0,42,220,1,0,0,0,44,222,1,0,0,0,46,230,1,0,0,0,48,238,1,0,
	0,0,50,243,1,0,0,0,52,251,1,0,0,0,54,259,1,0,0,0,56,268,1,0,0,0,58,279,
	1,0,0,0,60,281,1,0,0,0,62,292,1,0,0,0,64,294,1,0,0,0,66,296,1,0,0,0,68,
	69,7,0,0,0,69,1,1,0,0,0,70,75,3,0,0,0,71,72,5,19,0,0,72,74,3,0,0,0,73,71,
	1,0,0,0,74,77,1,0,0,0,75,73,1,0,0,0,75,76,1,0,0,0,76,3,1,0,0,0,77,75,1,
	0,0,0,78,80,3,6,3,0,79,78,1,0,0,0,80,83,1,0,0,0,81,79,1,0,0,0,81,82,1,0,
	0,0,82,84,1,0,0,0,83,81,1,0,0,0,84,85,5,0,0,1,85,5,1,0,0,0,86,89,3,8,4,
	0,87,89,3,64,32,0,88,86,1,0,0,0,88,87,1,0,0,0,89,7,1,0,0,0,90,91,5,1,0,
	0,91,92,3,0,0,0,92,93,3,10,5,0,93,94,5,24,0,0,94,95,3,14,7,0,95,96,5,25,
	0,0,96,9,1,0,0,0,97,109,5,22,0,0,98,103,3,12,6,0,99,100,5,18,0,0,100,102,
	3,12,6,0,101,99,1,0,0,0,102,105,1,0,0,0,103,101,1,0,0,0,103,104,1,0,0,0,
	104,107,1,0,0,0,105,103,1,0,0,0,106,108,5,18,0,0,107,106,1,0,0,0,107,108,
	1,0,0,0,108,110,1,0,0,0,109,98,1,0,0,0,109,110,1,0,0,0,110,111,1,0,0,0,
	111,112,5,23,0,0,112,11,1,0,0,0,113,116,5,43,0,0,114,115,5,17,0,0,115,117,
	3,66,33,0,116,114,1,0,0,0,116,117,1,0,0,0,117,13,1,0,0,0,118,119,3,16,8,
	0,119,15,1,0,0,0,120,121,5,3,0,0,121,123,3,18,9,0,122,124,3,22,11,0,123,
	122,1,0,0,0,123,124,1,0,0,0,124,126,1,0,0,0,125,127,3,30,15,0,126,125,1,
	0,0,0,126,127,1,0,0,0,127,17,1,0,0,0,128,133,3,20,10,0,129,130,5,18,0,0,
	130,132,3,20,10,0,131,129,1,0,0,0,132,135,1,0,0,0,133,131,1,0,0,0,133,134,
	1,0,0,0,134,19,1,0,0,0,135,133,1,0,0,0,136,141,3,32,16,0,137,139,5,6,0,
	0,138,137,1,0,0,0,138,139,1,0,0,0,139,140,1,0,0,0,140,142,3,0,0,0,141,138,
	1,0,0,0,141,142,1,0,0,0,142,145,1,0,0,0,143,145,5,21,0,0,144,136,1,0,0,
	0,144,143,1,0,0,0,145,21,1,0,0,0,146,147,5,4,0,0,147,148,3,24,12,0,148,
	23,1,0,0,0,149,154,3,26,13,0,150,151,5,18,0,0,151,153,3,26,13,0,152,150,
	1,0,0,0,153,156,1,0,0,0,154,152,1,0,0,0,154,155,1,0,0,0,155,25,1,0,0,0,
	156,154,1,0,0,0,157,162,3,28,14,0,158,160,5,6,0,0,159,158,1,0,0,0,159,160,
	1,0,0,0,160,161,1,0,0,0,161,163,3,0,0,0,162,159,1,0,0,0,162,163,1,0,0,0,
	163,27,1,0,0,0,164,165,3,2,1,0,165,29,1,0,0,0,166,167,5,5,0,0,167,168,3,
	32,16,0,168,31,1,0,0,0,169,170,3,34,17,0,170,33,1,0,0,0,171,176,3,36,18,
	0,172,173,5,8,0,0,173,175,3,36,18,0,174,172,1,0,0,0,175,178,1,0,0,0,176,
	174,1,0,0,0,176,177,1,0,0,0,177,35,1,0,0,0,178,176,1,0,0,0,179,184,3,38,
	19,0,180,181,5,7,0,0,181,183,3,38,19,0,182,180,1,0,0,0,183,186,1,0,0,0,
	184,182,1,0,0,0,184,185,1,0,0,0,185,37,1,0,0,0,186,184,1,0,0,0,187,196,
	3,40,20,0,188,190,5,9,0,0,189,188,1,0,0,0,189,190,1,0,0,0,190,191,1,0,0,
	0,191,192,5,16,0,0,192,193,3,40,20,0,193,194,5,7,0,0,194,195,3,40,20,0,
	195,197,1,0,0,0,196,189,1,0,0,0,196,197,1,0,0,0,197,39,1,0,0,0,198,215,
	3,42,21,0,199,201,5,9,0,0,200,199,1,0,0,0,200,201,1,0,0,0,201,202,1,0,0,
	0,202,203,5,14,0,0,203,212,5,22,0,0,204,209,3,32,16,0,205,206,5,18,0,0,
	206,208,3,32,16,0,207,205,1,0,0,0,208,211,1,0,0,0,209,207,1,0,0,0,209,210,
	1,0,0,0,210,213,1,0,0,0,211,209,1,0,0,0,212,204,1,0,0,0,212,213,1,0,0,0,
	213,214,1,0,0,0,214,216,5,23,0,0,215,200,1,0,0,0,215,216,1,0,0,0,216,41,
	1,0,0,0,217,218,5,9,0,0,218,221,3,42,21,0,219,221,3,44,22,0,220,217,1,0,
	0,0,220,219,1,0,0,0,221,43,1,0,0,0,222,228,3,46,23,0,223,225,5,13,0,0,224,
	226,5,9,0,0,225,224,1,0,0,0,225,226,1,0,0,0,226,227,1,0,0,0,227,229,5,12,
	0,0,228,223,1,0,0,0,228,229,1,0,0,0,229,45,1,0,0,0,230,236,3,48,24,0,231,
	233,5,13,0,0,232,234,5,9,0,0,233,232,1,0,0,0,233,234,1,0,0,0,234,235,1,
	0,0,0,235,237,7,1,0,0,236,231,1,0,0,0,236,237,1,0,0,0,237,47,1,0,0,0,238,
	241,3,50,25,0,239,240,7,2,0,0,240,242,3,50,25,0,241,239,1,0,0,0,241,242,
	1,0,0,0,242,49,1,0,0,0,243,249,3,52,26,0,244,246,5,9,0,0,245,244,1,0,0,
	0,245,246,1,0,0,0,246,247,1,0,0,0,247,248,5,15,0,0,248,250,3,52,26,0,249,
	245,1,0,0,0,249,250,1,0,0,0,250,51,1,0,0,0,251,256,3,54,27,0,252,253,7,
	3,0,0,253,255,3,54,27,0,254,252,1,0,0,0,255,258,1,0,0,0,256,254,1,0,0,0,
	256,257,1,0,0,0,257,53,1,0,0,0,258,256,1,0,0,0,259,264,3,56,28,0,260,261,
	7,4,0,0,261,263,3,56,28,0,262,260,1,0,0,0,263,266,1,0,0,0,264,262,1,0,0,
	0,264,265,1,0,0,0,265,55,1,0,0,0,266,264,1,0,0,0,267,269,7,3,0,0,268,267,
	1,0,0,0,268,269,1,0,0,0,269,270,1,0,0,0,270,271,3,58,29,0,271,57,1,0,0,
	0,272,280,3,60,30,0,273,280,5,43,0,0,274,280,3,62,31,0,275,276,5,22,0,0,
	276,277,3,32,16,0,277,278,5,23,0,0,278,280,1,0,0,0,279,272,1,0,0,0,279,
	273,1,0,0,0,279,274,1,0,0,0,279,275,1,0,0,0,280,59,1,0,0,0,281,289,3,0,
	0,0,282,285,5,19,0,0,283,286,3,0,0,0,284,286,5,21,0,0,285,283,1,0,0,0,285,
	284,1,0,0,0,286,288,1,0,0,0,287,282,1,0,0,0,288,291,1,0,0,0,289,287,1,0,
	0,0,289,290,1,0,0,0,290,61,1,0,0,0,291,289,1,0,0,0,292,293,7,5,0,0,293,
	63,1,0,0,0,294,295,5,2,0,0,295,65,1,0,0,0,296,297,3,0,0,0,297,67,1,0,0,
	0,38,75,81,88,103,107,109,116,123,126,133,138,141,144,154,159,162,176,184,
	189,196,200,209,212,215,220,225,228,233,236,241,245,249,256,264,268,279,
	285,289];

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
}


export class Query_parameterContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PARAM(): TerminalNode {
		return this.getToken(PGLParser.PARAM, 0);
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
}


export class C_exprContext extends ParserRuleContext {
	constructor(parser?: PGLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public columnref(): ColumnrefContext {
		return this.getTypedRuleContext(ColumnrefContext, 0) as ColumnrefContext;
	}
	public PARAM(): TerminalNode {
		return this.getToken(PGLParser.PARAM, 0);
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
}
