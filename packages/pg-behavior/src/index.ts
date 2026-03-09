import { PGlite } from "@electric-sql/pglite";

/**
 * Query pg_typeof() for an expression and return the type name string.
 * Example: pgTypeOf(db, "1 + 2") => "integer"
 */
export async function pgTypeOf(db: PGlite, expr: string): Promise<string> {
  const result = await db.query<{ t: string }>(`SELECT pg_typeof(${expr})::text AS t`);
  return result.rows[0].t;
}

/**
 * Check whether a SQL statement succeeds or fails.
 */
export async function tryExec(
  db: PGlite,
  sql: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await db.exec(sql);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Check whether a SQL query succeeds or fails, returning the result on success.
 */
export async function tryQuery(
  db: PGlite,
  sql: string
): Promise<{ ok: true; rows: Record<string, unknown>[] } | { ok: false; error: string }> {
  try {
    const result = await db.query(sql);
    return { ok: true, rows: result.rows as Record<string, unknown>[] };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
