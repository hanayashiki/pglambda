import { describe, test, expect } from "vitest";
import type { FileUri } from "@pglambda/utils";
import {
  parseContent,
  type QueryDefinition,
  type DefinitionId,
} from "../src/index.js";
import { AstStore } from "#ast-store.js";

describe("Definition Extraction", () => {
  test("extracts generic query definition", () => {
    const store = new AstStore();
    const result = parseContent(
      {
        content: `query f<T>($id: T) { select $id as x }`,
        uri: "file:///test.pgl" as FileUri,
        success: true,
      },
      { astStore: store },
    );

    const tree = result.parseTree!;
    const queryDefCtx = tree.def_list()[0].query_def();

    // QueryDefinition registered
    const def = store.getDefinition(queryDefCtx.contentHash as DefinitionId);
    expect(def).toBeDefined();
    expect(def!.tag).toBe("query");
    const qd = def as QueryDefinition;
    expect(qd.name).toBe("f");
    expect(qd.data.typeParams).toHaveLength(1);
    expect(qd.data.typeParams[0].name).toBe("T");
    expect(qd.data.params).toHaveLength(1);
    expect(qd.data.params[0].name).toBe("$id");
    expect(qd.data.params[0].data.annotationHash).not.toBeNull();

    // File scope has "f"
    const fileScope = store.getScope(tree.contentHash);
    expect(fileScope).toBeDefined();
    expect(fileScope!.parent).toBeNull();
    expect(fileScope!.valueDefinitions.get("f")).toBe(qd.id);

    // Query scope has "T" and "$id"
    const queryScope = store.getScope(queryDefCtx.contentHash);
    expect(queryScope).toBeDefined();
    expect(queryScope!.parent).toBe(tree.contentHash);
    expect(queryScope!.typeDefinitions.has("T")).toBe(true);
    expect(queryScope!.valueDefinitions.has("$id")).toBe(true);
  });

  test("extracts multiple queries in file scope", () => {
    const store = new AstStore();
    const result = parseContent(
      {
        content: `query a() { select 1 as x }\nquery b() { select 2 as y }`,
        uri: "file:///test.pgl" as FileUri,
        success: true,
      },
      { astStore: store },
    );

    const tree = result.parseTree!;
    const fileScope = store.getScope(tree.contentHash);
    expect(fileScope).toBeDefined();
    expect(fileScope!.valueDefinitions.has("a")).toBe(true);
    expect(fileScope!.valueDefinitions.has("b")).toBe(true);
  });

  test("query without type params has empty typeParams", () => {
    const store = new AstStore();
    const result = parseContent(
      {
        content: `query g($x: text) { select $x as y }`,
        uri: "file:///test.pgl" as FileUri,
        success: true,
      },
      { astStore: store },
    );

    const tree = result.parseTree!;
    const queryDefCtx = tree.def_list()[0].query_def();
    const def = store.getDefinition(queryDefCtx.contentHash as DefinitionId) as QueryDefinition;
    expect(def.data.typeParams).toHaveLength(0);
    expect(def.data.params).toHaveLength(1);
    expect(def.data.params[0].name).toBe("$x");
  });
});
