import { describe, test, expect } from "vitest";
import type { FileUri } from "@pglambda/utils";
import { parseContent, type ParseContentContext } from "../src/index.js";
import { AstStore } from "#ast-store.js";
import { PGLParser } from "@pglambda/antlr";

const ctx: ParseContentContext = {
  astStore: new AstStore(),
};

function parse(source: string) {
  return parseContent({ content: source, uri: "file:///test.pgl" as FileUri, success: true }, ctx);
}

describe("query markers", () => {
  test("no markers returns empty", () => {
    const result = parse(`query foo() {\n    select * from users\n}`);
    expect(result.markers).toEqual([]);
  });

  test("regular comments produce no markers", () => {
    const result = parse(`-- this is a comment\nquery foo() {\n    select 1\n}`);
    expect(result.markers).toEqual([]);
  });

  test("resolves marker to select node", () => {
    const result = parse(`
      query foo() {
        select 1
        --  ^ a
      }
    `);

    expect(result.success).toBe(true);
    expect(result.markers).toHaveLength(1);
    expect(result.markers[0].label).toBe("a");
    expect(result.markers[0].node?.ruleIndex).toBe(PGLParser.RULE_simple_select);
  });

  test("resolves marker to literal", () => {
    const result = parse(`
      query foo() {
        select 1
        --     ^ a
      }
    `);

    expect(result.success).toBe(true);
    expect(result.markers).toHaveLength(1);
    expect(result.markers[0].label).toBe("a");
    expect(result.markers[0].node?.ruleIndex).toBe(PGLParser.RULE_aexprconst);
  });

  test("multiple markers resolve to different nodes", () => {
    const result = parse(`
      query foo() {
        select 1 from users
        --  ^ a      ^ b
      }
    `);

    expect(result.success).toBe(true);
    expect(result.markers).toHaveLength(2);
    expect(result.markers[0].label).toBe("a");
    expect(result.markers[1].label).toBe("b");
  });
});
