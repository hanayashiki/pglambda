import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { pgTypeOf, tryExec } from "../src/index.js";

describe("integer size safety", () => {
  let db: PGlite;

  beforeAll(async () => {
    db = new PGlite();
    await db.exec(`
      CREATE TABLE int_test (
        small_col int2,
        regular_col int4,
        big_col int8
      );
    `);
  });

  afterAll(async () => {
    await db.close();
  });

  test("pg_typeof of integer literals", async () => {
    const t1 = await pgTypeOf(db, "1");
    const t2 = await pgTypeOf(db, "1::int2");
    const t3 = await pgTypeOf(db, "1::int4");
    const t4 = await pgTypeOf(db, "1::int8");
    console.info("pg_typeof(1) =", t1);
    console.info("pg_typeof(1::int2) =", t2);
    console.info("pg_typeof(1::int4) =", t3);
    console.info("pg_typeof(1::int8) =", t4);
  });

  test("assign int8 value to int4 column (fits)", async () => {
    const r = await tryExec(db, "INSERT INTO int_test(regular_col) VALUES (1::int8)");
    console.info("INSERT 1::int8 into int4:", r);
  });

  test("assign int8 value to int4 column (overflows)", async () => {
    const r = await tryExec(db, "INSERT INTO int_test(regular_col) VALUES (2147483648::int8)");
    console.info("INSERT 2147483648::int8 into int4:", r);
  });

  test("assign int4 to int2 column (fits)", async () => {
    const r = await tryExec(db, "INSERT INTO int_test(small_col) VALUES (100::int4)");
    console.info("INSERT 100::int4 into int2:", r);
  });

  test("assign int4 to int2 column (overflows)", async () => {
    const r = await tryExec(db, "INSERT INTO int_test(small_col) VALUES (40000::int4)");
    console.info("INSERT 40000::int4 into int2:", r);
  });

  test("int4 = int8 comparison", async () => {
    const r = await tryExec(db, "SELECT 1::int4 = 1::int8");
    console.info("int4 = int8 comparison:", r);
  });

  test("int2 = int4 comparison", async () => {
    const r = await tryExec(db, "SELECT 1::int2 = 1::int4");
    console.info("int2 = int4 comparison:", r);
  });

  test("integer arithmetic promotion matrix", async () => {
    const sizes = ["int2", "int4", "int8"] as const;
    const ops = ["+", "-", "*", "/"] as const;
    const matrix: Record<string, string> = {};

    for (const a of sizes) {
      for (const b of sizes) {
        for (const op of ops) {
          const key = `${a} ${op} ${b}`;
          matrix[key] = await pgTypeOf(db, `1::${a} ${op} 1::${b}`);
        }
      }
    }

    console.info("\n=== Integer Arithmetic Promotion Matrix ===");
    for (const [expr, type] of Object.entries(matrix)) {
      console.info(`  ${expr} → ${type}`);
    }

    expect(matrix).toMatchSnapshot();
  });
});
