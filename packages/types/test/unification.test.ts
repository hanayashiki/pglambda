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

  describe("Row polymorphism", () => {
    test("open record unifies with closed superset", () => {
      const rho = store.typevar("rho");
      const beta = store.typevar("beta");
      const int = store.primitive("int");
      const text = store.primitive("text");

      const open = store.record({ id: beta }, rho);
      const closed = store.record({ id: int, name: text });

      u.unify(open, closed);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
      expect(u.resolve(beta)).toBe(int);

      // rho should resolve to {name: text}
      const resolvedRho = u.resolve(rho);
      expect(resolvedRho.kind).toBe("record");
      if (resolvedRho.kind === "record") {
        expect(resolvedRho.fields.name).toBe(text);
      }
    });

    test("two open records unify", () => {
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");
      const int = store.primitive("int");

      const open1 = store.record({ a: int }, rho1);
      const open2 = store.record({ a: int }, rho2);

      u.unify(open1, open2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // rho1 and rho2 should unify
      expect(u.resolve(rho1)).toBe(u.resolve(rho2));
    });

    test("closed record unifies with open record (subset)", () => {
      const rho = store.typevar("rho");
      const int = store.primitive("int");

      const closed = store.record({ a: int });
      const open = store.record({ a: int }, rho);

      u.unify(closed, open);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // rho should resolve to {} (empty record)
      // In practice, it might remain unbound
    });

    test("mutual recursion with field access (motivating example)", () => {
      // Simulates: f1() { return f2().id }, f2() { return f1().id }
      const f1 = store.typevar("f1");
      const f2 = store.typevar("f2");
      const id1 = store.typevar("id1");
      const id2 = store.typevar("id2");
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");

      // f2 = {id: id1 | rho1} (from f2().id access)
      u.unify(f2, store.record({ id: id1 }, rho1));

      // f1 = {id: id2 | rho2} (from f1().id access)
      u.unify(f1, store.record({ id: id2 }, rho2));

      // f1 = f2 (mutual recursion constraint)
      u.unify(f1, f2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // Both f1 and f2 should resolve to records
      const resolvedF1 = u.resolve(f1);
      const resolvedF2 = u.resolve(f2);
      expect(resolvedF1.kind).toBe("record");
      expect(resolvedF2.kind).toBe("record");

      // id1 and id2 should unify
      expect(u.resolve(id1)).toBe(u.resolve(id2));

      // rho1 and rho2 should unify
      expect(u.resolve(rho1)).toBe(u.resolve(rho2));
    });

    test("field mismatch in common fields", () => {
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");
      const int = store.primitive("int");
      const text = store.primitive("text");

      const open1 = store.record({ a: int }, rho1);
      const open2 = store.record({ a: text }, rho2);

      u.unify(open1, open2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("kind_mismatch");
    });

    test("occurs check prevents infinite row types", () => {
      const rho = store.typevar("rho");
      const int = store.primitive("int");

      const recursive = store.record({ a: int }, rho);

      u.unify(rho, recursive);

      const result = u.getResult();
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("occurs_check");
    });
  });
});
