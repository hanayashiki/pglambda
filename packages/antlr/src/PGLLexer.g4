lexer grammar PGLLexer;

options {
	caseInsensitive = true;
}

channels {
	QUERY_MARKER
}

// DSL keywords
KW_QUERY: 'query';
KW_TYPE: 'type';
KW_DATABASE: 'database';

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

// DDL keywords
KW_CREATE: 'create';
KW_TABLE: 'table';
KW_CONSTRAINT: 'constraint';
KW_CHECK: 'check';
KW_IF: 'if';
KW_EXISTS: 'exists';
KW_PRIMARY: 'primary';
KW_KEY: 'key';
KW_UNIQUE: 'unique';
KW_FOREIGN: 'foreign';
KW_REFERENCES: 'references';
KW_DEFAULT: 'default';
KW_ON: 'on';
KW_DELETE: 'delete';
KW_UPDATE: 'update';
KW_CASCADE: 'cascade';
KW_RESTRICT: 'restrict';
KW_NO: 'no';
KW_ACTION: 'action';
KW_SET: 'set';
KW_MATCH: 'match';
KW_FULL: 'full';
KW_PARTIAL: 'partial';
KW_SIMPLE: 'simple';
KW_SETOF: 'setof';

// CREATE TABLE attribute keywords
KW_TEMPORARY: 'temporary';
KW_TEMP: 'temp';
KW_UNLOGGED: 'unlogged';
KW_LOCAL: 'local';
KW_GLOBAL: 'global';
KW_INHERITS: 'inherits';
KW_PARTITION: 'partition';
KW_BY: 'by';
KW_USING: 'using';
KW_OIDS: 'oids';
KW_COMMIT: 'commit';
KW_DROP: 'drop';
KW_PRESERVE: 'preserve';
KW_ROWS: 'rows';
KW_TABLESPACE: 'tablespace';

// Numeric type keywords (matches PostgreSQL grammar's numeric rule)
KW_INT: 'int';
KW_INTEGER: 'integer';
KW_SMALLINT: 'smallint';
KW_BIGINT: 'bigint';
KW_REAL: 'real';
KW_FLOAT: 'float';
KW_DOUBLE: 'double';
KW_PRECISION: 'precision';
KW_DECIMAL: 'decimal';
KW_NUMERIC: 'numeric';
KW_BOOLEAN: 'boolean';

// Character type keywords (matches PostgreSQL grammar's character rule)
KW_CHARACTER: 'character';
KW_CHAR: 'char';
KW_VARCHAR: 'varchar';
KW_VARYING: 'varying';

// Datetime type keywords (matches PostgreSQL grammar's constdatetime rule)
KW_TIMESTAMP: 'timestamp';
KW_TIME: 'time';
KW_WITH: 'with';
KW_WITHOUT: 'without';
KW_ZONE: 'zone';
KW_INTERVAL: 'interval';

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
DOLLAR_LCURLY: '${';

// Literals
INTEGER_LITERAL: [0-9]+;
NUMERIC_LITERAL: [0-9]+ '.' [0-9]* | '.' [0-9]+;
STRING_LITERAL options {
	caseInsensitive = false;
}: '\'' ('\'\'' | ~['\r\n])* '\'';

// Identifiers
IDENTIFIER options {
	caseInsensitive = false;
}: [a-zA-Z_$] [a-zA-Z_0-9$]*;
QUOTED_IDENTIFIER options {
	caseInsensitive = false;
}: '"' ('""' | ~["\r\n])* '"';

// Whitespace & comments
WS: [ \t\r\n]+ -> skip;
LINE_COMMENT_QUERY:
	'--' [ \t]* '^' ~[\r\n]* -> channel(QUERY_MARKER);
LINE_COMMENT: '--' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;