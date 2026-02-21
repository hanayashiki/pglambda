import type { Token } from "@pglambda/antlr";

export type QueryMarker = {
  label: string;
  /** 1-based line of the target (line above the comment) */
  line: number;
  /** 0-based column the ^ points to */
  column: number;
};

/**
 * Hand-parse a single `LINE_COMMENT_QUERY` token's text to extract `^` markers.
 * The token text looks like `-- ^ a    ^ b`.
 * Each `^` column in the token maps to the same column on the line above.
 */
export function extractMarkersFromToken(token: Token): QueryMarker[] {
  const text = token.text;
  const markers: QueryMarker[] = [];
  const targetLine = token.line - 1; // line above the comment

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "^") {
      const afterCaret = text.slice(i + 1);
      const labelMatch = /^\s+(\w+)/.exec(afterCaret);
      if (labelMatch) {
        markers.push({
          label: labelMatch[1],
          line: targetLine,
          column: token.column + i,
        });
      }
    }
  }

  return markers;
}
