lexer grammar PGLLexer;

options {
	caseInsensitive = true;
}

channels { QUERY_MARKER }

// DSL keywords
KW_QUERY: 'query';
KW_TYPE: 'type';

// SQL keywords
KW_SELECT: 'select';
KW_FROM: 'from';
KW_WHERE: 'where';
KW_AS: 'as';
KW_AND: 'and';
KW_OR: 'or';
KW_NOT: 'not';
KW_TRUE: 'true';
KW_FALSE: 'false';
KW_NULL: 'null';
KW_IS: 'is';
KW_IN: 'in';
KW_LIKE: 'like';
KW_BETWEEN: 'between';

// Punctuation
COLONCOLON: '::';
COLON: ':';
COMMA: ',';
DOT: '.';
SEMICOLON: ';';
STAR: '*';
L_PAREN: '(';
R_PAREN: ')';
L_CURLY: '{';
R_CURLY: '}';
L_BRACKET: '[';
R_BRACKET: ']';

// Operators
EQ: '=';
NEQ: '<>' | '!=';
LT: '<';
GT: '>';
LTE: '<=';
GTE: '>=';
PLUS: '+';
MINUS: '-';
SLASH: '/';
PERCENT: '%';
EXCL: '!';

// Literals
INTEGER_LITERAL: [0-9]+;
NUMERIC_LITERAL: [0-9]+ '.' [0-9]* | '.' [0-9]+;
STRING_LITERAL options { caseInsensitive = false; }:
	'\'' ('\'\'' | ~['\r\n])* '\'';

// Identifiers
IDENTIFIER: [a-z_] [a-z_0-9]*;
QUOTED_IDENTIFIER options { caseInsensitive = false; }:
	'"' ('""' | ~["\r\n])* '"';
PARAM: '$' [a-z_] [a-z_0-9]*;

// Whitespace & comments
WS: [ \t\r\n]+ -> skip;
LINE_COMMENT_QUERY: '--' [ \t]* '^' ~[\r\n]* -> channel(QUERY_MARKER);
LINE_COMMENT: '--' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;
