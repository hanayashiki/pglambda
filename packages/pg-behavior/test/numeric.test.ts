import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { pgTypeOf, tryExec } from "../src/index.js";

describe("numeric precision and scale", () => {
  let db: PGlite;

  beforeAll(async () => {
    db = new PGlite();
    await db.exec(`
      CREATE TABLE num_test (
        a numeric(2,1),
        b numeric(3,2),
        c numeric
      );
      INSERT INTO num_test VALUES (1.5, 2.75, 100.123);
    `);
  });

  afterAll(async () => {
    await db.close();
  });

  test("pg_typeof of numeric literal", async () => {
    const t = await pgTypeOf(db, "1.5");
    console.info("pg_typeof(1.5) =", t);
    expect(t).toBe("numeric");
  });

  test("pg_typeof of numeric(p,s) cast", async () => {
    const t = await pgTypeOf(db, "1.5::numeric(2,1)");
    console.info("pg_typeof(1.5::numeric(2,1)) =", t);
    // Does PG report the parameterized form or just "numeric"?
  });

  test("numeric(2,1) * numeric(3,2) result type", async () => {
    const t = await pgTypeOf(db, "(SELECT a * b FROM num_test LIMIT 1)");
    console.info("pg_typeof(numeric(2,1) * numeric(3,2)) =", t);
  });

  test("numeric(2,1) + numeric(3,2) result type", async () => {
    const t = await pgTypeOf(db, "(SELECT a + b FROM num_test LIMIT 1)");
    console.info("pg_typeof(numeric(2,1) + numeric(3,2)) =", t);
  });

  test("numeric(p,s) op unparameterized numeric", async () => {
    const t = await pgTypeOf(
      db,
      "(SELECT a + c FROM num_test LIMIT 1)",
    );
    console.info("pg_typeof(numeric(2,1) + numeric) =", t);
  });

  test("column types preserve precision in pg_attribute", async () => {
    const result = await db.query<{ attname: string; atttypmod: number }>(`
      SELECT attname, atttypmod FROM pg_attribute
      WHERE attrelid = 'num_test'::regclass
        AND attname IN ('a', 'b', 'c')
      ORDER BY attname
    `);
    for (const row of result.rows) {
      // atttypmod for numeric: ((precision << 16) | scale) + VARHDRSZ(4)
      const typmod = row.atttypmod;
      if (typmod === -1) {
        console.info(`${row.attname}: atttypmod=-1 (unparameterized)`);
      } else {
        const precision = ((typmod - 4) >> 16) & 0xffff;
        const scale = (typmod - 4) & 0xffff;
        console.info(
          `${row.attname}: atttypmod=${typmod} → precision=${precision}, scale=${scale}`,
        );
      }
    }
    expect(result.rows.length).toBe(3);
  });

  test("assignment: value fits into numeric(2,1)", async () => {
    const r = await tryExec(db, "INSERT INTO num_test(a) VALUES (9.9)");
    console.info("INSERT 9.9 into numeric(2,1):", r);
    expect(r.ok).toBe(true);
  });

  test("assignment: value overflows numeric(2,1) precision", async () => {
    const r = await tryExec(db, "INSERT INTO num_test(a) VALUES (99.9)");
    console.info("INSERT 99.9 into numeric(2,1):", r);
    // precision=2 means max 2 total digits, so 99.9 should fail
  });

  test("assignment: scale truncation into numeric(2,1)", async () => {
    // 1.55 has scale=2 but column is scale=1 — does PG round?
    const r = await tryExec(db, "INSERT INTO num_test(a) VALUES (1.55)");
    console.info("INSERT 1.55 into numeric(2,1):", r);
    if (r.ok) {
      const result = await db.query<{ a: string }>(
        "SELECT a FROM num_test ORDER BY ctid DESC LIMIT 1",
      );
      console.info("Stored value:", result.rows[0].a);
    }
  });
});
