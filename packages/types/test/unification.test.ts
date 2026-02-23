import { describe, test, expect, beforeEach } from "vitest";
import { TypeStore } from "../src/type-store.ts";
import { Unification } from "../src/unification.ts";
import type { TypeConstructorId, AppliedType } from "../src/type.ts";

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

  // Note: Row polymorphism tests are in row-unification.test.ts

  describe("applied type unification", () => {
    let setOfCtorId: TypeConstructorId;

    beforeEach(() => {
      store = new TypeStore();
      u = new Unification(store);
      // Look up SetOf by name
      const setOfCtor = store.ctors.lookup("SetOf");
      if (!setOfCtor) throw new Error("SetOf not registered");
      setOfCtorId = setOfCtor.id;
    });

    test("unifies same applied types", () => {
      const recordType = store.record({ col: store.primitive("int") });
      const set1 = store.apply(setOfCtorId, [recordType]);
      const set2 = store.apply(setOfCtorId, [recordType]);

      u.unify(set1, set2);
      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
    });

    test("unifies applied types with type variables", () => {
      const alpha = store.typevar("alpha");
      const int = store.primitive("int");
      const set1 = store.apply(setOfCtorId, [alpha]);
      const set2 = store.apply(setOfCtorId, [int]);

      u.unify(set1, set2);
      expect(u.resolve(alpha)).toBe(int);
      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
    });

    test("occurs check with applied types", () => {
      const alpha = store.typevar("alpha");
      const setOfAlpha = store.apply(setOfCtorId, [alpha]);

      u.unify(alpha, setOfAlpha); // α = SetOf<α> → error
      const result = u.getResult();
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].errorKind).toBe("occurs_check");
    });

    test("deepResolve resolves arguments", () => {
      const alpha = store.typevar("alpha");
      const int = store.primitive("int");
      const setOfAlpha = store.apply(setOfCtorId, [alpha]);

      u.unify(alpha, int);
      const resolved = u.deepResolve(setOfAlpha);

      expect(resolved.kind).toBe("applied");
      const resolvedApplied = resolved as AppliedType;
      expect(resolvedApplied.arguments[0]).toBe(int);
    });

    test("deepResolve preserves identity when no changes", () => {
      const int = store.primitive("int");
      const setOfInt = store.apply(setOfCtorId, [int]);

      const resolved = u.deepResolve(setOfInt);
      expect(resolved).toBe(setOfInt); // Same instance due to structural sharing
    });

    test("nested applied types with type variables resolve correctly", () => {
      const alpha = store.typevar("alpha");
      const beta = store.typevar("beta");
      const int = store.primitive("int");
      const text = store.primitive("text");

      const recAlpha = store.record({ col: alpha });
      const recBeta = store.record({ col: beta });
      const setOfRecAlpha = store.apply(setOfCtorId, [recAlpha]);
      const setOfRecBeta = store.apply(setOfCtorId, [recBeta]);

      // Unify: SetOf<{col: alpha}> = SetOf<{col: int}>
      const recInt = store.record({ col: int });
      const setOfRecInt = store.apply(setOfCtorId, [recInt]);
      u.unify(setOfRecAlpha, setOfRecInt);
      expect(u.resolve(alpha)).toBe(int);

      // Unify: SetOf<{col: beta}> = SetOf<{col: text}>
      const recText = store.record({ col: text });
      const setOfRecText = store.apply(setOfCtorId, [recText]);
      u.unify(setOfRecBeta, setOfRecText);
      expect(u.resolve(beta)).toBe(text);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
    });
  });
});
