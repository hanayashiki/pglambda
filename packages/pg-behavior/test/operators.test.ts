import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { pgTypeOf, tryQuery } from "../src/index.js";

describe("operator return types", () => {
  let db: PGlite;

  beforeAll(async () => {
    db = new PGlite();
  });

  afterAll(async () => {
    await db.close();
  });

  test("full arithmetic return type matrix", async () => {
    const types = [
      "int2",
      "int4",
      "int8",
      "float4",
      "float8",
      "numeric",
    ] as const;
    const ops = ["+", "-", "*", "/"] as const;
    const matrix: Record<string, string> = {};

    for (const a of types) {
      for (const b of types) {
        for (const op of ops) {
          const key = `${a} ${op} ${b}`;
          try {
            matrix[key] = await pgTypeOf(db, `1::${a} ${op} 1::${b}`);
          } catch (e) {
            matrix[key] = `ERROR: ${(e as Error).message}`;
          }
        }
      }
    }

    console.info("\n=== Full Arithmetic Return Type Matrix ===");
    // Print as a table grouped by operator
    for (const op of ops) {
      console.info(`\n  Operator: ${op}`);
      console.info("  " + "".padEnd(10) + types.map((t) => t.padEnd(10)).join(""));
      for (const a of types) {
        const row = types.map((b) => (matrix[`${a} ${op} ${b}`] ?? "?").padEnd(10));
        console.info(`  ${a.padEnd(10)}${row.join("")}`);
      }
    }

    expect(matrix).toMatchSnapshot();
  });

  test("comparison operator acceptance matrix", async () => {
    const types = [
      "int2",
      "int4",
      "int8",
      "float4",
      "float8",
      "numeric",
      "text",
      "varchar",
      "bool",
    ] as const;
    const matrix: Record<string, boolean> = {};

    for (const a of types) {
      for (const b of types) {
        const key = `${a} = ${b}`;
        const castA = a === "varchar" ? "'x'::varchar" : a === "text" ? "'x'::text" : a === "bool" ? "true::bool" : `1::${a}`;
        const castB = b === "varchar" ? "'x'::varchar" : b === "text" ? "'x'::text" : b === "bool" ? "true::bool" : `1::${b}`;
        const r = await tryQuery(db, `SELECT ${castA} = ${castB}`);
        matrix[key] = r.ok;
      }
    }

    console.info("\n=== Comparison (=) Acceptance Matrix ===");
    console.info("  " + "".padEnd(10) + types.map((t) => t.padEnd(10)).join(""));
    for (const a of types) {
      const row = types.map((b) =>
        (matrix[`${a} = ${b}`] ? "✓" : "✗").padEnd(10),
      );
      console.info(`  ${a.padEnd(10)}${row.join("")}`);
    }

    expect(matrix).toMatchSnapshot();
  });

  test("date/time arithmetic result types", async () => {
    const cases: [string, string][] = [
      ["date + integer", "CURRENT_DATE + 1"],
      ["date - date", "CURRENT_DATE - CURRENT_DATE"],
      ["date - integer", "CURRENT_DATE - 1"],
      ["timestamp + interval", "CURRENT_TIMESTAMP + interval '1 hour'"],
      ["timestamp - timestamp", "CURRENT_TIMESTAMP - CURRENT_TIMESTAMP"],
      ["timestamp - interval", "CURRENT_TIMESTAMP - interval '1 hour'"],
      ["interval + interval", "interval '1 hour' + interval '30 min'"],
      ["interval * int", "interval '1 hour' * 2"],
      ["interval / int", "interval '1 hour' / 2"],
      ["time + interval", "CURRENT_TIME + interval '1 hour'"],
      ["time - time", "CURRENT_TIME - CURRENT_TIME"],
    ];

    const results: Record<string, string> = {};
    for (const [label, expr] of cases) {
      try {
        results[label] = await pgTypeOf(db, `(${expr})`);
      } catch (e) {
        results[label] = `ERROR: ${(e as Error).message}`;
      }
    }

    console.info("\n=== Date/Time Arithmetic Result Types ===");
    for (const [label, typ] of Object.entries(results)) {
      console.info(`  ${label} → ${typ}`);
    }

    expect(results).toMatchSnapshot();
  });

  test("division behavior: integer vs float", async () => {
    // Important: does int / int produce int (truncating) or something else?
    const results: Record<string, unknown> = {};

    const r1 = await db.query<{ v: unknown }>("SELECT 7::int4 / 2::int4 AS v");
    results["7::int4 / 2::int4 value"] = r1.rows[0].v;
    results["7::int4 / 2::int4 type"] = await pgTypeOf(
      db,
      "7::int4 / 2::int4",
    );

    const r2 = await db.query<{ v: unknown }>(
      "SELECT 7::float8 / 2::float8 AS v",
    );
    results["7::float8 / 2::float8 value"] = r2.rows[0].v;

    const r3 = await db.query<{ v: unknown }>(
      "SELECT 7::numeric / 2::numeric AS v",
    );
    results["7::numeric / 2::numeric value"] = r3.rows[0].v;

    console.info("\n=== Division Behavior ===");
    for (const [k, v] of Object.entries(results)) {
      console.info(`  ${k} = ${v}`);
    }
  });

  test("modulo operator types", async () => {
    const types = ["int2", "int4", "int8", "numeric"] as const;
    const results: Record<string, string> = {};

    for (const a of types) {
      for (const b of types) {
        const key = `${a} % ${b}`;
        try {
          results[key] = await pgTypeOf(db, `3::${a} % 2::${b}`);
        } catch (e) {
          results[key] = `ERROR: ${(e as Error).message}`;
        }
      }
    }

    console.info("\n=== Modulo (%) Return Types ===");
    for (const [expr, typ] of Object.entries(results)) {
      console.info(`  ${expr} → ${typ}`);
    }

    // float4 % float4 — does it exist?
    const rf = await tryQuery(db, "SELECT 3.0::float4 % 2.0::float4");
    console.info("float4 % float4:", rf);

    expect(results).toMatchSnapshot();
  });
});
