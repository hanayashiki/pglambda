export interface Query<TRow> {
  readonly "~type"?: TRow;

  readonly sql: string;
  readonly params: readonly unknown[];
}

export class Param {
  constructor(readonly value: unknown) {}
}

export type SqlValue = Param | SqlFragment;

export class SqlFragment {
  constructor(readonly parts: (string | Param)[]) {}

  build<TRow = unknown>(): Query<TRow> {
    const params: unknown[] = [];
    let sql = "";
    for (const part of this.parts) {
      if (typeof part === "string") {
        sql += part;
      } else {
        params.push(part.value);
        sql += `$${params.length}`;
      }
    }
    return { sql, params };
  }
}

export function param(value: unknown): Param {
  return new Param(value);
}

export function sql(strings: TemplateStringsArray, ...values: SqlValue[]): SqlFragment {
  const parts: (string | Param)[] = [];
  for (let i = 0; i < strings.length; i++) {
    if (strings[i]) parts.push(strings[i]);
    if (i < values.length) {
      const v = values[i];
      if (v instanceof SqlFragment) {
        parts.push(...v.parts);
      } else if (v instanceof Param) {
        parts.push(v);
      }
    }
  }
  return new SqlFragment(parts);
}

export function raw(s: string): SqlFragment {
  return new SqlFragment([s]);
}

export function join(fragments: SqlFragment[], separator: string): SqlFragment {
  const parts: (string | Param)[] = [];
  for (let i = 0; i < fragments.length; i++) {
    if (i > 0) parts.push(separator);
    parts.push(...fragments[i].parts);
  }
  return new SqlFragment(parts);
}

function quoteIdent(name: string): string {
  return `"${name.replace(/"/g, '""')}"`;
}

export function insert(table: string, row: Record<string, unknown>): SqlFragment {
  const keys = Object.keys(row);
  const cols = keys.map(quoteIdent).join(", ");
  const vals = join(
    keys.map((k) => sql`${param(row[k])}`),
    ", "
  );
  return sql`INSERT INTO ${raw(table)} (${raw(cols)}) VALUES (${vals})`;
}

export function update(table: string, patch: Record<string, unknown>): SqlFragment {
  const sets = join(
    Object.keys(patch).map((k) => sql`${raw(quoteIdent(k))} = ${param(patch[k])}`),
    ", "
  );
  return sql`UPDATE ${raw(table)} SET ${sets}`;
}
