import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { checkAndExtractMarkers } from "./check-helper.js";

describe("Checker Snapshot Tests", () => {
  const inputDir = join(dirname(fileURLToPath(import.meta.url)), "input");
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort();

  test.each(fixtures)("checks %s", async (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    const snapshot = checkAndExtractMarkers(input, filename);

    await expect(snapshot).toMatchFileSnapshot(
      `__snapshots__/${filename}.snap`,
    );
  });

  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});
