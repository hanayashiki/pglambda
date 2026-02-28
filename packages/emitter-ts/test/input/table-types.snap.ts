import { sql } from "@pglambda/runtime";
import type { Query } from "@pglambda/runtime";

export interface UsersRow {
  email: string | null;
  id: number;
  is_active: boolean;
  name: string;
}

export function getAllUsers(): Query<{
  email: string | null;
  id: number;
  is_active: boolean;
  name: string
}> {
  return sql`SELECT id, name, email, is_active FROM users`.build();
}
