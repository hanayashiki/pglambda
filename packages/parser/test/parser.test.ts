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
  const inputDir = join(dirname(fileURLToPath(import.meta.url)), "input");
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
    expect(formattedTree).toMatchFileSnapshot(`__snapshots__/${filename}.snap`);
  });

  // Ensure we have at least one test
  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});

describe("Content Hash", () => {
  const queryA = `
    query get_user_by_id($id: text) {
      select * from users where id = $id
    }
  `;

  const queryB = `
    query get_all_users() {
      select * from users
    }
  `;

  test("same query produces same hash across modules", () => {
    const moduleAB = parseContent(
      {
        content: `${queryA}\n${queryB}`,
        uri: "file:///ab.pgl" as FileUri,
        success: true,
      },
      ctx,
    );

    const moduleA = parseContent(
      {
        content: queryA,
        uri: "file:///a.pgl" as FileUri,
        success: true,
      },
      ctx,
    );

    const abDefs = moduleAB.parseTree!.def_list();
    const aDefs = moduleA.parseTree!.def_list();

    const hashAinAB = abDefs[0].query_def().contentHash;
    const hashAinA = aDefs[0].query_def().contentHash;

    expect(hashAinAB).toBeTypeOf("string");
    expect(hashAinAB).toBe(hashAinA);

    // AstStore returns the same cached node for matching hashes
    const cachedFromAB = ctx.astStore.ensure(abDefs[0].query_def());
    const cachedFromA = ctx.astStore.ensure(aDefs[0].query_def());
    expect(cachedFromAB).toBe(cachedFromA);
  });
});
