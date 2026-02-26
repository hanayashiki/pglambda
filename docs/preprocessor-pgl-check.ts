#!/usr/bin/env npx tsx
/**
 * mdbook preprocessor that:
 * 1. Validates ```pgl code blocks via the PGL parser
 * 2. Syntax-highlights both ```pgl and ```pgl-unchecked blocks using the PGL lexer
 *
 * Protocol: https://rust-lang.github.io/mdBook/for_developers/preprocessors.html
 */

import { readFileSync } from "node:fs";
import { fromMarkdown } from "mdast-util-from-markdown";
import type { Code } from "mdast";
import { parseContent, AstStore } from "@pglambda/parser";
import { CharStreams, PGLLexer, Token } from "@pglambda/antlr";
import type { FileUri } from "@pglambda/utils";

// Handle "supports" check — we support all renderers
if (process.argv.includes("supports")) {
  process.exit(0);
}

// --- HTML escaping ---

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- Token → CSS class mapping (hljs-compatible) ---

function tokenClass(type: number, text: string): string | null {
  switch (type) {
    case PGLLexer.KW_QUERY:
    case PGLLexer.KW_TYPE:
    case PGLLexer.KW_SELECT:
    case PGLLexer.KW_FROM:
    case PGLLexer.KW_WHERE:
    case PGLLexer.KW_AS:
    case PGLLexer.KW_AND:
    case PGLLexer.KW_OR:
    case PGLLexer.KW_NOT:
    case PGLLexer.KW_IN:
    case PGLLexer.KW_LIKE:
    case PGLLexer.KW_BETWEEN:
    case PGLLexer.KW_IS:
      return "hljs-keyword";

    case PGLLexer.KW_TRUE:
    case PGLLexer.KW_FALSE:
    case PGLLexer.KW_NULL:
      return "hljs-literal";

    case PGLLexer.STRING_LITERAL:
      return "hljs-string";

    case PGLLexer.INTEGER_LITERAL:
    case PGLLexer.NUMERIC_LITERAL:
      return "hljs-number";

    case PGLLexer.LINE_COMMENT:
    case PGLLexer.BLOCK_COMMENT:
    case PGLLexer.LINE_COMMENT_QUERY:
      return "hljs-comment";

    case PGLLexer.IDENTIFIER:
      if (text.startsWith("$")) return "hljs-variable";
      return null;

    case PGLLexer.DOLLAR_LCURLY:
      return "hljs-variable";

    default:
      return null;
  }
}

// --- Lexer-based syntax highlighting ---

function highlightPgl(code: string): string {
  const inputStream = CharStreams.fromString(code);
  const lexer = new PGLLexer(inputStream);
  lexer.removeErrorListeners();

  let html = "";
  let lastEnd = 0; // track position to fill gaps (whitespace/comments are skipped)

  let token = lexer.nextToken();
  while (token.type !== Token.EOF) {
    // Emit any skipped text (whitespace, comments) between tokens
    if (token.start > lastEnd) {
      const gap = code.slice(lastEnd, token.start);
      // Detect SQL line comments in the gap
      const commentHighlighted = gap.replace(
        /(--[^\n]*)/g,
        '<span class="hljs-comment">$1</span>',
      );
      html += escapeHtmlPreservingSpans(commentHighlighted);
    }

    const text = escapeHtml(token.text);
    const cls = tokenClass(token.type, token.text);
    if (cls) {
      html += `<span class="${cls}">${text}</span>`;
    } else {
      html += text;
    }
    lastEnd = token.stop + 1;
    token = lexer.nextToken();
  }

  // Emit any trailing skipped text
  if (lastEnd < code.length) {
    const gap = code.slice(lastEnd);
    const commentHighlighted = gap.replace(
      /(--[^\n]*)/g,
      '<span class="hljs-comment">$1</span>',
    );
    html += escapeHtmlPreservingSpans(commentHighlighted);
  }

  return `<pre><code class="language-pgl">${html}</code></pre>\n`;
}

/** Escape HTML but preserve <span> tags we already inserted for comments */
function escapeHtmlPreservingSpans(text: string): string {
  return text.replace(
    /(<span class="hljs-comment">)(.*?)(<\/span>)|([^<]+|<(?!span|\/span))/g,
    (match, open, content, close, plain) => {
      if (open) return open + escapeHtml(content) + close;
      return escapeHtml(plain ?? match);
    },
  );
}

// --- Chapter processing ---

type Chapter = {
  Chapter?: {
    name: string;
    content: string;
    path: string | null;
    sub_items: Chapter[];
  };
};

let totalChecked = 0;
let failedBlocks = 0;
let totalHighlighted = 0;

function processChapter(chapter: Chapter) {
  const ch = chapter.Chapter;
  if (!ch) return;

  const filePath = ch.path ?? ch.name;
  const tree = fromMarkdown(ch.content);

  type Replacement = { start: number; end: number; html: string };
  const replacements: Replacement[] = [];

  for (const node of tree.children) {
    if (node.type !== "code") continue;
    const codeNode = node as Code;
    if (codeNode.lang !== "pgl" && codeNode.lang !== "pgl-unchecked") continue;

    const startOffset = codeNode.position!.start.offset!;
    const endOffset = codeNode.position!.end.offset!;

    // Validate pgl blocks (not pgl-unchecked)
    if (codeNode.lang === "pgl") {
      totalChecked++;
      const lineOffset = codeNode.position?.start.line ?? 0;
      const uri = `file:///docs/${filePath}#L${lineOffset}` as FileUri;
      const astStore = new AstStore();

      const result = parseContent(
        { content: codeNode.value, uri, success: true },
        { astStore },
      );

      if (!result.success) {
        failedBlocks++;
        for (const err of result.errors) {
          const line = lineOffset + err.location.line;
          process.stderr.write(
            `error: ${filePath}:${line}: ${err.message}\n`,
          );
        }
        process.stderr.write(
          `  in code block starting at ${filePath}:${lineOffset}\n`,
        );
        process.stderr.write(`  source:\n`);
        for (const srcLine of codeNode.value.split("\n")) {
          process.stderr.write(`    | ${srcLine}\n`);
        }
        process.stderr.write("\n");
      }
    }

    // Highlight both pgl and pgl-unchecked
    totalHighlighted++;
    replacements.push({
      start: startOffset,
      end: endOffset,
      html: highlightPgl(codeNode.value),
    });
  }

  // Apply replacements from end to start so offsets stay valid
  let content = ch.content;
  for (const r of replacements.reverse()) {
    content = content.slice(0, r.start) + r.html + content.slice(r.end);
  }
  ch.content = content;

  for (const sub of ch.sub_items ?? []) {
    processChapter(sub);
  }
}

// --- Main ---

function main() {
  const input = JSON.parse(readFileSync(0, "utf-8"));
  const [_context, book] = input;

  for (const item of book.items) {
    processChapter(item);
  }

  if (failedBlocks > 0) {
    process.stderr.write(
      `\npgl-check: ${failedBlocks}/${totalChecked} code blocks failed to parse\n`,
    );
    process.exit(1);
  }

  process.stderr.write(
    `pgl-check: ${totalChecked} checked, ${totalHighlighted} highlighted\n`,
  );

  process.stdout.write(JSON.stringify(book));
}

main();
