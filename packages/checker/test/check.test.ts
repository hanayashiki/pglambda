import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { checkAndExtractMarkers, checkModule } from "./check-helper.js";

describe("Checker (HIR) Snapshot Tests", () => {
  const inputDir = join(dirname(fileURLToPath(import.meta.url)), "input");
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort();

  test.each(fixtures)("checks %s", async (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    const snapshot = checkAndExtractMarkers(input, filename);

    await expect(snapshot).toMatchFileSnapshot(
      `input/${filename}.snap`,
    );
  });

  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});

describe("Checker imports/exports", () => {
  test("exports top-level query def types", () => {
    const { result, store } = checkModule(`query f() { select 1 as col }`);

    expect(result.exportedTypes.size).toBe(1);
    const [, fnType] = [...result.exportedTypes.entries()][0];
    expect(store.typeToString(fnType)).toBe("() => SetOf<{col: int}>");
  });

  test("exports multiple query defs", () => {
    const { result, store } = checkModule(
      `query f() { select 1 as a }\nquery g(x: text) { select $x as b }`,
    );

    expect(result.exportedTypes.size).toBe(2);
    const types = [...result.exportedTypes.values()].map((t) =>
      store.typeToString(t),
    );
    expect(types).toContain("() => SetOf<{a: int}>");
    expect(types).toContain("(x: text) => SetOf<{b: text}>");
  });

  test("exports generic type schemes", () => {
    const { result, store } = checkModule(
      `query identity<T>(x: T) { $x }`,
    );

    expect(result.exportedTypes.size).toBe(1);
    expect(result.exportedTypeSchemes.length).toBe(1);
    expect(store.typeSchemeToString(result.exportedTypeSchemes[0])).toBe(
      "for<T> (x: T) => T",
    );
  });

  test("imported types are not re-exported", () => {
    const modA = checkModule(`query f() { select 1 as col }`);
    const modB = checkModule(
      `query g() { select 2 as col }`,
      "b.pgl",
      modA.result.exportedTypes,
    );

    // Module B should only export its own def (g), not f
    expect(modB.result.exportedTypes.size).toBe(1);
  });
});
