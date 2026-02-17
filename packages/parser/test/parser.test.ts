import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  PGLLexer,
  PGLParser,
  CharStream,
  CommonTokenStream,
} from "@pglambda/antlr";
import { formatParseTree } from "../src/index.js";

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("ANTLR Parser Snapshot Tests", () => {
  const inputDir = join(__dirname, "input");
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort(); // Consistent order across platforms

  test.each(fixtures)("parses %s", (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    // Standard ANTLR parsing pipeline
    const chars = new CharStream(input);
    const lexer = new PGLLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new PGLParser(tokens);

    // Parse from root rule
    const tree = parser.prog();

    // Format parse tree with proper indentation using listener
    const formattedTree = formatParseTree(tree);

    // Snapshot the parse tree to individual file
    expect(formattedTree).toMatchFileSnapshot(`__snapshots__/${filename}.snap`);
  });

  // Ensure we have at least one test
  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});
