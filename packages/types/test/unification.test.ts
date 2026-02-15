import { describe, test, expect, beforeEach } from "vitest";
import { TypeStore } from "../src/type-store.ts";
import { Unification } from "../src/unification.ts";

describe("Unification", () => {
  let store: TypeStore;
  let u: Unification;

  beforeEach(() => {
    store = new TypeStore();
    u = new Unification(store);
  });

  test("infers type parameter", () => {
    const alpha = store.typevar("alpha");
    const int = store.primitive("int");

    // Constraint: T_$x = T_1 (i.e., alpha = int)
    u.unify(alpha, int);

    const result = u.getResult();
    expect(result.errors).toHaveLength(0);
    expect(u.resolve(alpha)).toBe(int);
  });

  test("int | null does not unify with int", () => {
    const int = store.primitive("int");
    const nullableInt = store.nullable(int);

    u.unify(nullableInt, int);

    const result = u.getResult();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].errorKind).toBe("kind_mismatch");
  });

  test("int | null does not unify with text | null", () => {
    const int = store.primitive("int");
    const text = store.primitive("text");
    const nullableInt = store.nullable(int);
    const nullableText = store.nullable(text);

    u.unify(nullableInt, nullableText);

    const result = u.getResult();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].errorKind).toBe("kind_mismatch");
  });

  test("record with typevar field unifies", () => {
    const alpha = store.typevar("alpha");
    const int = store.primitive("int");
    const rec1 = store.record({ a: int });
    const rec2 = store.record({ a: alpha });

    u.unify(rec1, rec2);

    const result = u.getResult();
    expect(result.errors).toHaveLength(0);
    expect(u.resolve(alpha)).toBe(int);
  });

  test("records with different fields fail", () => {
    const int = store.primitive("int");
    const rec1 = store.record({ a: int });
    const rec2 = store.record({ b: int });

    u.unify(rec1, rec2);

    const result = u.getResult();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].errorKind).toBe("field_mismatch");
  });
});
