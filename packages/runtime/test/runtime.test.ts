import { describe, test, expect } from "vitest";
import {
  sql,
  param,
  raw,
  join,
  insert,
  update,
  type Query,
  type SqlFragment,
} from "../src/index.js";

describe("sql tagged template", () => {
  // Test 1: Simple SELECT with param
  test("simple query with param", () => {
    function getUser(id: string): Query<{ id: string; name: string }> {
      return sql`SELECT id, name FROM users WHERE id = ${param(id)}`.build();
    }

    const q = getUser("abc");
    expect(q.sql).toBe("SELECT id, name FROM users WHERE id = $1");
    expect(q.params).toEqual(["abc"]);
  });

  // Test 2: No params
  test("query without params", () => {
    function getUsers(): Query<{ id: string; name: string }> {
      return sql`SELECT id, name FROM users`.build();
    }

    const q = getUsers();
    expect(q.sql).toBe("SELECT id, name FROM users");
    expect(q.params).toEqual([]);
  });

  // Test 3: Multiple params
  test("multiple params", () => {
    function search(name: string, minAge: number): Query<any> {
      return sql`SELECT * FROM users WHERE name = ${param(name)} AND age > ${param(minAge)}`.build();
    }

    const q = search("alice", 18);
    expect(q.sql).toBe("SELECT * FROM users WHERE name = $1 AND age > $2");
    expect(q.params).toEqual(["alice", 18]);
  });

  // Test 4: Same param value used twice — gets separate positions
  test("same param twice", () => {
    function search(term: string): Query<any> {
      return sql`SELECT * FROM users WHERE name LIKE ${param(term)} OR email LIKE ${param(term)}`.build();
    }

    const q = search("%alice%");
    expect(q.sql).toBe("SELECT * FROM users WHERE name LIKE $1 OR email LIKE $2");
    expect(q.params).toEqual(["%alice%", "%alice%"]);
  });

  // Test 5: Fragment composition
  test("fragment composition", () => {
    function userById(user: string, id: string): SqlFragment {
      return sql`${raw(user)}.id = ${param(id)}`;
    }

    function selectUserById(id: string): Query<any> {
      return sql`SELECT * FROM users WHERE ${userById("users", id)}`.build();
    }

    const q = selectUserById("abc");
    expect(q.sql).toBe("SELECT * FROM users WHERE users.id = $1");
    expect(q.params).toEqual(["abc"]);
  });

  // Test 6: Nested composition
  test("nested composition", () => {
    function userById(user: string, id: string): SqlFragment {
      return sql`${raw(user)}.id = ${param(id)}`;
    }

    function activeUser(user: string): SqlFragment {
      return sql`${raw(user)}.active = TRUE`;
    }

    function userByIdAndActive(user: string, id: string): SqlFragment {
      return sql`${userById(user, id)} AND ${activeUser(user)}`;
    }

    function selectActiveUser(id: string): Query<any> {
      return sql`SELECT * FROM users WHERE ${userByIdAndActive("users", id)}`.build();
    }

    const q = selectActiveUser("abc");
    expect(q.sql).toBe("SELECT * FROM users WHERE users.id = $1 AND users.active = TRUE");
    expect(q.params).toEqual(["abc"]);
  });
});

describe("raw", () => {
  // Test 7: raw identifiers
  test("raw identifiers", () => {
    const q = sql`SELECT ${raw("id")}, ${raw("name")} FROM ${raw("public.users")}`.build();
    expect(q.sql).toBe("SELECT id, name FROM public.users");
    expect(q.params).toEqual([]);
  });
});

describe("join", () => {
  // Test 8: join fragments
  test("join fragments", () => {
    const cols = [sql`id`, sql`name`, sql`email`];
    const q = sql`SELECT ${join(cols, ", ")} FROM users`.build();
    expect(q.sql).toBe("SELECT id, name, email FROM users");
    expect(q.params).toEqual([]);
  });
});

describe("insert", () => {
  // Test 9: insert helper
  test("insert from object", () => {
    type UsersInsert = { id: string; name: string; email: string };

    function createUser(input: UsersInsert): Query<any> {
      return sql`${insert("users", input)} RETURNING *`.build();
    }

    const q = createUser({ id: "1", name: "alice", email: "a@b.c" });
    expect(q.sql).toBe('INSERT INTO users ("id", "name", "email") VALUES ($1, $2, $3) RETURNING *');
    expect(q.params).toEqual(["1", "alice", "a@b.c"]);
  });
});

describe("update", () => {
  // Test 10: update helper
  test("update from partial object", () => {
    type UsersUpdate = Partial<{ name: string; email: string }>;

    function updateUser(id: string, patch: UsersUpdate): Query<any> {
      return sql`${update("users", patch)} WHERE id = ${param(id)}`.build();
    }

    const q = updateUser("1", { name: "bob" });
    expect(q.sql).toBe('UPDATE users SET "name" = $1 WHERE id = $2');
    expect(q.params).toEqual(["bob", "1"]);
  });
});
