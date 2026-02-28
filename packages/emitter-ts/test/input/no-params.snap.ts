import { sql } from "@pglambda/runtime";
import type { Query } from "@pglambda/runtime";

export interface UsersRow {
  id: number;
  name: string;
}

export function getUsers(): Query<{ id: number; name: string }> {
  return sql`SELECT id, name FROM users`.build();
}
