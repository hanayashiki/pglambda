import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { lowerAndPrint } from "./hir-helper.js";

describe("HIR Snapshot Tests", () => {
  const inputDir = join(
    dirname(fileURLToPath(import.meta.url)),
    "fixtures",
    "hir",
  );
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort();

  test.each(fixtures)("lowers %s", async (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    const snapshot = lowerAndPrint(input, filename);

    await expect(snapshot).toMatchFileSnapshot(
      `fixtures/hir/${filename}.snap`,
    );
  });

  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});
