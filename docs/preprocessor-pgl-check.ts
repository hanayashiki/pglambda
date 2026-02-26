#!/usr/bin/env npx tsx
/**
 * mdbook preprocessor that validates all ```pgl code blocks by running them
 * through the PGL parser. Fails the build if any block has syntax errors.
 *
 * Protocol: https://rust-lang.github.io/mdBook/for_developers/preprocessors.html
 */

import { readFileSync } from "node:fs";
import { fromMarkdown } from "mdast-util-from-markdown";
import type { Code } from "mdast";
import { parseContent, AstStore } from "@pglambda/parser";
import type { FileUri } from "@pglambda/utils";

// Handle "supports" check — we support all renderers
if (process.argv.includes("supports")) {
  process.exit(0);
}

type Chapter = {
  Chapter?: {
    name: string;
    content: string;
    path: string | null;
    sub_items: Chapter[];
  };
};

let totalBlocks = 0;
let failedBlocks = 0;

function checkChapter(chapter: Chapter) {
  const ch = chapter.Chapter;
  if (!ch) return;

  const filePath = ch.path ?? ch.name;
  const tree = fromMarkdown(ch.content);

  for (const node of tree.children) {
    if (node.type !== "code") continue;
    const codeNode = node as Code;
    if (codeNode.lang !== "pgl") continue;

    totalBlocks++;
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

  for (const sub of ch.sub_items ?? []) {
    checkChapter(sub);
  }
}

function main() {
  // Read book JSON from stdin synchronously
  const input = JSON.parse(readFileSync(0, "utf-8"));
  const [_context, book] = input;

  for (const item of book.items) {
    checkChapter(item);
  }

  if (failedBlocks > 0) {
    process.stderr.write(
      `\npgl-check: ${failedBlocks}/${totalBlocks} code blocks failed to parse\n`,
    );
    process.exit(1);
  }

  process.stderr.write(
    `pgl-check: all ${totalBlocks} code blocks parsed successfully\n`,
  );

  // Output the book unchanged
  process.stdout.write(JSON.stringify(book));
}

main();
