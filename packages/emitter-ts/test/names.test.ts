import { describe, test, expect } from "vitest";
import { snakeToCamel, snakeToPascal } from "../src/names.js";

describe("snakeToCamel", () => {
  test("single word", () => {
    expect(snakeToCamel("users")).toBe("users");
  });

  test("two words", () => {
    expect(snakeToCamel("get_user")).toBe("getUser");
  });

  test("multiple words", () => {
    expect(snakeToCamel("get_user_by_id")).toBe("getUserById");
  });

  test("already camel", () => {
    expect(snakeToCamel("getUser")).toBe("getUser");
  });
});

describe("snakeToPascal", () => {
  test("single word", () => {
    expect(snakeToPascal("users")).toBe("Users");
  });

  test("two words", () => {
    expect(snakeToPascal("user_role")).toBe("UserRole");
  });

  test("already pascal", () => {
    expect(snakeToPascal("Users")).toBe("Users");
  });
});
