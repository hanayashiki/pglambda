import { param, sql } from "@pglambda/runtime";
import type { Query } from "@pglambda/runtime";

export interface UsersRow {
  age: number;
  id: number;
  name: string;
}

export function search(name: string, min_age: number): Query<{
  age: number;
  id: number;
  name: string
}> {
  return sql`
    SELECT id, name, age
    FROM users
    WHERE name = ${param(name)} AND age > ${param(min_age)}
  `.build();
}
