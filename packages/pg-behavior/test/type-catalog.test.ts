import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { tryExec, tryQuery } from "../src/index.js";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("pg_type catalog mutability", () => {
  let db: PGlite;

  beforeAll(async () => {
    db = new PGlite();
  });

  afterAll(async () => {
    await db.close();
  });

  test("superuser CAN rename a built-in type via UPDATE pg_type", async () => {
    const rename = await tryExec(db, `UPDATE pg_type SET typname = 'myint' WHERE typname = 'int4'`);
    expect(rename.ok).toBe(true);

    // int4 still resolves — PG uses a syscache, not a fresh catalog lookup
    const useOld = await tryQuery(db, `SELECT 1::int4`);
    console.info("SELECT 1::int4 after rename:", useOld);
    expect(useOld.ok).toBe(true);

    // The new name also works
    const useNew = await tryQuery(db, `SELECT 1::myint`);
    console.info("SELECT 1::myint after rename:", useNew);
    expect(useNew.ok).toBe(true);

    // Restore
    await tryExec(db, `UPDATE pg_type SET typname = 'int4' WHERE typname = 'myint'`);
  });

  test("superuser CAN delete from pg_type", async () => {
    const del = await tryExec(db, `DELETE FROM pg_type WHERE typname = 'uuid'`);
    expect(del.ok).toBe(true);

    // uuid is now unresolvable
    const use = await tryQuery(db, `SELECT 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid`);
    console.info("SELECT ...::uuid after delete:", use);
    expect(use.ok).toBe(false);
  });
});

describe("pg_type mutation survives restart (persistent dataDir)", () => {
  let dataDir: string;

  beforeAll(async () => {
    dataDir = await mkdtemp(join(tmpdir(), "pglite-catalog-"));
  });

  afterAll(async () => {
    await rm(dataDir, { recursive: true, force: true });
  });

  test("rename int4, close, reopen — does the rename persist?", async () => {
    // Session 1: rename int4 → myint
    const db1 = new PGlite(dataDir);
    await db1.waitReady;

    const rename = await tryExec(
      db1,
      `UPDATE pg_type SET typname = 'myint' WHERE typname = 'int4'`
    );
    console.info("Session 1 — rename int4→myint:", rename);
    expect(rename.ok).toBe(true);

    await db1.close();

    // Session 2: reopen the same dataDir
    const db2 = new PGlite(dataDir);
    await db2.waitReady;

    // Can we still use int4? (syscache rebuilt from disk)
    const useOld = await tryQuery(db2, `SELECT 1::int4`);
    console.info("Session 2 — SELECT 1::int4:", useOld);

    // Can we use myint?
    const useNew = await tryQuery(db2, `SELECT 1::myint`);
    console.info("Session 2 — SELECT 1::myint:", useNew);

    // What does pg_type say?
    const check = await tryQuery(db2, `SELECT typname FROM pg_type WHERE oid = 23`);
    console.info("Session 2 — pg_type oid=23 typname:", check);

    await db2.close();
  });
});
