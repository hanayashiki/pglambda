import { param, sql } from "@pglambda/runtime";
import type { Query } from "@pglambda/runtime";

export interface UsersRow {
  id: number;
  name: string;
}

export function getUser(id: number): Query<{ id: number; name: string }> {
  return sql`SELECT id, name FROM users WHERE id = ${param(id)}`.build();
}
