import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { pgTypeOf, tryExec, tryQuery } from "../src/index.js";

describe("implicit coercion rules", () => {
  let db: PGlite;

  beforeAll(async () => {
    db = new PGlite();
    await db.exec(`
      CREATE TABLE coerce_test (
        c_int2 int2,
        c_int4 int4,
        c_int8 int8,
        c_float4 float4,
        c_float8 float8,
        c_numeric numeric,
        c_text text,
        c_varchar varchar(10),
        c_bool bool
      );
    `);
  });

  afterAll(async () => {
    await db.close();
  });

  test("numeric type assignment coercion matrix", async () => {
    const sourceTypes = ["int2", "int4", "int8", "float4", "float8", "numeric"] as const;
    const columns = ["c_int2", "c_int4", "c_int8", "c_float4", "c_float8", "c_numeric"] as const;

    const matrix: Record<string, boolean> = {};

    for (const srcType of sourceTypes) {
      for (const col of columns) {
        const key = `${srcType} → ${col}`;
        const r = await tryExec(db, `INSERT INTO coerce_test(${col}) VALUES (1::${srcType})`);
        matrix[key] = r.ok;
      }
    }

    console.info("\n=== Numeric Assignment Coercion Matrix ===");
    console.info("(source type → target column = allowed?)");
    for (const [expr, ok] of Object.entries(matrix)) {
      console.info(`  ${expr}: ${ok ? "✓" : "✗"}`);
    }

    expect(matrix).toMatchSnapshot();
  });

  test("text to numeric implicit coercion in expressions", async () => {
    // PG's behavior with string-to-number in expressions
    const r1 = await tryQuery(db, "SELECT '1'::text + 1");
    console.info("'1'::text + 1:", r1);

    const r2 = await tryQuery(db, "SELECT '1' + 1");
    console.info("'1' + 1:", r2);

    const r3 = await tryQuery(db, "SELECT 1 + '1'");
    console.info("1 + '1':", r3);
  });

  test("text concatenation coercion", async () => {
    // Does PG auto-coerce non-text types for || ?
    const r1 = await tryQuery(db, "SELECT 'hello' || 123");
    console.info("'hello' || 123:", r1);

    const r2 = await tryQuery(db, "SELECT 123 || 'hello'");
    console.info("123 || 'hello':", r2);

    const r3 = await tryQuery(db, "SELECT 'count: ' || 42::int4");
    console.info("'count: ' || 42::int4:", r3);
  });

  test("int to numeric implicit coercion", async () => {
    const t = await pgTypeOf(db, "1 + 1.5");
    console.info("pg_typeof(1 + 1.5) =", t);

    const t2 = await pgTypeOf(db, "1::int4 + 1.5::numeric");
    console.info("pg_typeof(int4 + numeric) =", t2);

    const t3 = await pgTypeOf(db, "1::int4 + 1.5::float8");
    console.info("pg_typeof(int4 + float8) =", t3);
  });

  test("bool coercion", async () => {
    const r1 = await tryQuery(db, "SELECT 1::bool");
    console.info("1::bool:", r1);

    const r2 = await tryQuery(db, "SELECT 'true'::bool");
    console.info("'true'::bool:", r2);

    const r3 = await tryQuery(db, "SELECT 0::bool");
    console.info("0::bool:", r3);

    // Can you use int in boolean context directly?
    const r4 = await tryQuery(db, "SELECT * FROM coerce_test WHERE 1");
    console.info("WHERE 1:", r4);
  });

  test("cross-type string/numeric assignment", async () => {
    const r1 = await tryExec(db, "INSERT INTO coerce_test(c_text) VALUES (123)");
    console.info("INSERT 123 into text:", r1);

    const r2 = await tryExec(db, "INSERT INTO coerce_test(c_int4) VALUES ('123')");
    console.info("INSERT '123' into int4:", r2);

    const r3 = await tryExec(db, "INSERT INTO coerce_test(c_int4) VALUES ('abc')");
    console.info("INSERT 'abc' into int4:", r3);
  });
});
