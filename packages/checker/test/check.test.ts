// import { describe, test, expect } from "vitest";
// import { parseContent, AstStore } from "@pglambda/parser";
// import type { FileUri } from "@pglambda/utils";
// import { TypeStore, typeToString } from "@pglambda/types";
// import { checkSimpleSelect } from "../src/checkers/select.js";

// const astStore = new AstStore();

// /**
//  * Parse a PGL query, type-check its simple_select, and assert the expected type.
//  */
// function check(source: string, expected: string) {
//   const result = parseContent(
//     { content: source, uri: "test.pgl" as FileUri, success: true },
//     { astStore },
//   );
//   expect(result.success).toBe(true);
//   const tree = result.parseTree!;
//   const ctx = tree.def(0).query_def().query_body().simple_select();
//   const store = new TypeStore();
//   const checked = checkSimpleSelect(ctx, store);

//   expect(checked.errors).toEqual([]);
//   expect(typeToString(checked.type)).toBe(expected);
// }

// describe("checkSimpleSelect", () => {
//   test("select 1 as col → {col: int}", () => {
//     check("query q() { select 1 as col }", "{col: int}");
//   });

//   test("select 'hi' as s → {s: text}", () => {
//     check("query q() { select 'hi' as s }", "{s: text}");
//   });

//   test("select 1 as a, 'x' as b → {a: int, b: text}", () => {
//     check("query q() { select 1 as a, 'x' as b }", "{a: int, b: text}");
//   });

//   test("select true as flag → {flag: bool}", () => {
//     check("query q() { select true as flag }", "{flag: bool}");
//   });

//   test("select 1.5 as n → {n: numeric}", () => {
//     check("query q() { select 1.5 as n }", "{n: numeric}");
//   });
// });
// TODO: restore the test after refactoring
