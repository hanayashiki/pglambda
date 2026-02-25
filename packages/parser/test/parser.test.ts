import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { FileUri } from "@pglambda/utils";
import {
  formatParseTree,
  parseContent,
  type ParseContentContext,
} from "../src/index.js";
import { AstStore } from "#ast-store.js";

// ESM equivalent of __dirname
const ctx: ParseContentContext = {
  astStore: new AstStore(),
};

describe("ANTLR Parser Snapshot Tests", () => {
  const inputDir = join(dirname(fileURLToPath(import.meta.url)), "fixtures", "parser");
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort(); // Consistent order across platforms

  test.each(fixtures)("parses %s", (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    const result = parseContent(
      {
        content: input,
        uri: `file:///${filename}` as FileUri,
        success: true,
      },
      ctx,
    );

    // Format parse tree with proper indentation using listener
    const formattedTree = formatParseTree(result.parseTree!);

    // Snapshot the parse tree to individual file
    expect(formattedTree).toMatchFileSnapshot(`fixtures/parser/__snapshots__/${filename}.snap`);
  });

  // Ensure we have at least one test
  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});

describe("Content Hash", () => {
  test("each node gets a unique ID", () => {
    const result = parseContent(
      {
        content: `query f(x: text) { select $x as x }`,
        uri: "file:///test.pgl" as FileUri,
        success: true,
      },
      { astStore: new AstStore() },
    );

    const hashes = new Set<string>();
    const tree = result.parseTree!;

    // Collect all content hashes via the ast store
    function collectHashes(node: any) {
      if (node.contentHash) {
        expect(hashes.has(node.contentHash)).toBe(false);
        hashes.add(node.contentHash);
      }
      const count = node.getChildCount?.() ?? 0;
      for (let i = 0; i < count; i++) {
        collectHashes(node.getChild(i));
      }
    }

    collectHashes(tree);
    expect(hashes.size).toBeGreaterThan(0);
  });
});
