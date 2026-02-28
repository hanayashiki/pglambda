import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { checkDdlAndSnapshot } from "./ddl-helper.js";

describe("DDL table type resolution", () => {
  const inputDir = join(dirname(fileURLToPath(import.meta.url)), "input/ddl");
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort();

  test.each(fixtures)("resolves %s", async (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    const snapshot = checkDdlAndSnapshot(input, filename);

    await expect(snapshot).toMatchFileSnapshot(
      `input/ddl/${filename}.snap`,
    );
  });

  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});
