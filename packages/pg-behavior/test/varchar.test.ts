import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { pgTypeOf, tryExec } from "../src/index.js";

describe("varchar and char length behavior", () => {
  let db: PGlite;

  beforeAll(async () => {
    db = new PGlite();
    await db.exec(`
      CREATE TABLE str_test (
        short_col varchar(3),
        long_col varchar(8),
        text_col text,
        char_col char(5),
        unbound_varchar varchar
      );
    `);
  });

  afterAll(async () => {
    await db.close();
  });

  test("pg_typeof for varchar with different lengths", async () => {
    const t3 = await pgTypeOf(db, "'hi'::varchar(3)");
    const t8 = await pgTypeOf(db, "'hi'::varchar(8)");
    const tplain = await pgTypeOf(db, "'hi'::varchar");
    const ttext = await pgTypeOf(db, "'hi'::text");
    console.info("pg_typeof varchar(3):", t3);
    console.info("pg_typeof varchar(8):", t8);
    console.info("pg_typeof varchar:", tplain);
    console.info("pg_typeof text:", ttext);
  });

  test("assign short value to varchar(3)", async () => {
    const r = await tryExec(
      db,
      "INSERT INTO str_test(short_col) VALUES ('ab'::varchar(8))",
    );
    console.info("INSERT 'ab'::varchar(8) into varchar(3):", r);
    expect(r.ok).toBe(true);
  });

  test("assign too-long value to varchar(3)", async () => {
    const r = await tryExec(
      db,
      "INSERT INTO str_test(short_col) VALUES ('abcdefgh'::varchar(8))",
    );
    console.info("INSERT 'abcdefgh'::varchar(8) into varchar(3):", r);
  });

  test("assign too-long literal to varchar(3)", async () => {
    const r = await tryExec(
      db,
      "INSERT INTO str_test(short_col) VALUES ('abcd')",
    );
    console.info("INSERT 'abcd' into varchar(3):", r);
  });

  test("varchar(3) = varchar(8) comparison", async () => {
    const r = await tryExec(db, "SELECT 'hi'::varchar(3) = 'hi'::varchar(8)");
    console.info("varchar(3) = varchar(8):", r);
  });

  test("varchar(3) || varchar(8) result type", async () => {
    const t = await pgTypeOf(db, "'hi'::varchar(3) || 'world'::varchar(8)");
    console.info("pg_typeof(varchar(3) || varchar(8)) =", t);
  });

  test("varchar(n) || text result type", async () => {
    const t = await pgTypeOf(db, "'hello'::varchar(5) || 'world'::text");
    console.info("pg_typeof(varchar(5) || text) =", t);
  });

  test("text || varchar result type", async () => {
    const t = await pgTypeOf(db, "'hello'::text || 'world'::varchar");
    console.info("pg_typeof(text || varchar) =", t);
  });

  test("char(5) padding behavior", async () => {
    await db.exec("INSERT INTO str_test(char_col) VALUES ('ab')");
    const result = await db.query<{
      char_col: string;
      len: number;
      typ: string;
    }>(
      `SELECT char_col, length(char_col) AS len, pg_typeof(char_col)::text AS typ
       FROM str_test WHERE char_col IS NOT NULL LIMIT 1`,
    );
    console.info("char(5) stored value:", JSON.stringify(result.rows[0].char_col));
    console.info("char(5) length():", result.rows[0].len);
    console.info("char(5) pg_typeof:", result.rows[0].typ);
  });

  test("char(5) = text comparison", async () => {
    // Does 'ab   ' (padded) = 'ab' (unpadded)?
    const result = await db.query<{ eq: boolean }>(
      "SELECT 'ab'::char(5) = 'ab'::text AS eq",
    );
    console.info("char(5) 'ab' = text 'ab':", result.rows[0].eq);
  });

  test("text vs varchar: are they the same type?", async () => {
    // OIDs
    const oids = await db.query<{ name: string; oid: number }>(`
      SELECT typname AS name, oid FROM pg_type
      WHERE typname IN ('text', 'varchar', 'bpchar', 'char', 'name')
      ORDER BY typname
    `);
    console.info("\n=== String type OIDs ===");
    for (const row of oids.rows) {
      console.info(`  ${row.name}: oid=${row.oid}`);
    }

    // Are text and varchar the same underlying type?
    const sameType = await db.query<{ eq: boolean }>(
      "SELECT 'text'::regtype = 'varchar'::regtype AS eq",
    );
    console.info("text::regtype = varchar::regtype:", sameType.rows[0].eq);

    // Can you assign text to varchar column and vice versa?
    const r1 = await tryExec(
      db,
      "INSERT INTO str_test(text_col) VALUES ('hello'::varchar(5))",
    );
    console.info("varchar(5) → text column:", r1);

    const r2 = await tryExec(
      db,
      "INSERT INTO str_test(unbound_varchar) VALUES ('hello'::text)",
    );
    console.info("text → varchar column:", r2);

    // What about in a UNION — does PG unify them?
    const unionResult = await db.query<{ t: string }>(`
      SELECT pg_typeof(col)::text AS t
      FROM (SELECT 'a'::text AS col UNION SELECT 'b'::varchar) sub
      LIMIT 1
    `);
    console.info("UNION of text and varchar:", unionResult.rows[0].t);

    // Function that takes text — can you pass varchar?
    await db.exec("CREATE FUNCTION test_text_fn(x text) RETURNS text AS $$ SELECT x $$ LANGUAGE SQL");
    const fnResult = await tryExec(
      db,
      "SELECT test_text_fn('hello'::varchar(10))",
    );
    console.info("text function accepts varchar arg:", fnResult);

    // pg_typeof on column references
    await db.exec("DELETE FROM str_test");
    await db.exec("INSERT INTO str_test(text_col, unbound_varchar) VALUES ('hi', 'hi')");
    const colTypes = await db.query<{ tt: string; vt: string }>(`
      SELECT pg_typeof(text_col)::text AS tt, pg_typeof(unbound_varchar)::text AS vt
      FROM str_test WHERE text_col IS NOT NULL LIMIT 1
    `);
    console.info("pg_typeof(text column):", colTypes.rows[0].tt);
    console.info("pg_typeof(varchar column):", colTypes.rows[0].vt);
  });

  test("column atttypmod for varchar/char", async () => {
    const result = await db.query<{ attname: string; atttypmod: number }>(`
      SELECT attname, atttypmod FROM pg_attribute
      WHERE attrelid = 'str_test'::regclass
        AND attname IN ('short_col', 'long_col', 'text_col', 'char_col', 'unbound_varchar')
      ORDER BY attname
    `);
    for (const row of result.rows) {
      if (row.atttypmod === -1) {
        console.info(`${row.attname}: atttypmod=-1 (no length constraint)`);
      } else {
        // For varchar/char: atttypmod = max_length + VARHDRSZ(4)
        const maxLen = row.atttypmod - 4;
        console.info(
          `${row.attname}: atttypmod=${row.atttypmod} → maxLen=${maxLen}`,
        );
      }
    }
    expect(result.rows.length).toBe(5);
  });
});
