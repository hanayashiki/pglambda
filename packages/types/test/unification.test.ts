import { describe, test, expect, beforeEach } from "vitest";
import { TypeStore } from "../src/type-store.ts";
import { Unification } from "../src/unification.ts";
import type {
  TypeConstructorId,
  TypeSchemeId,
  AppliedType,
} from "../src/type.ts";

describe("Unification", () => {
  let store: TypeStore;
  let u: Unification;

  beforeEach(() => {
    store = new TypeStore();
    u = new Unification(store);
  });

  test("infers type parameter", () => {
    const alpha = store.typevar("alpha");
    const int = store.primitive("integer");

    // Constraint: T_$x = T_1 (i.e., alpha = int)
    u.unify(alpha, int);

    const result = u.getResult();
    expect(result.errors).toHaveLength(0);
    expect(u.resolve(alpha)).toBe(int);
  });

  test("int | null does not unify with int", () => {
    const int = store.primitive("integer");
    const nullableInt = store.nullable(int);

    u.unify(nullableInt, int);

    const result = u.getResult();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].errorKind).toBe("kind_mismatch");
  });

  test("int | null does not unify with text | null", () => {
    const int = store.primitive("integer");
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
    const int = store.primitive("integer");
    const rec1 = store.record({ a: int });
    const rec2 = store.record({ a: alpha });

    u.unify(rec1, rec2);

    const result = u.getResult();
    expect(result.errors).toHaveLength(0);
    expect(u.resolve(alpha)).toBe(int);
  });

  test("records with different fields fail", () => {
    const int = store.primitive("integer");
    const rec1 = store.record({ a: int });
    const rec2 = store.record({ b: int });

    u.unify(rec1, rec2);

    const result = u.getResult();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].errorKind).toBe("field_mismatch");
  });

  describe("function type unification", () => {
    test("unifies matching function types", () => {
      const int = store.primitive("integer");
      const text = store.primitive("text");
      const fn1 = store.fn(["x"], [int], text);
      const fn2 = store.fn(["y"], [int], text);

      u.unify(fn1, fn2);
      expect(u.getResult().errors).toHaveLength(0);
    });

    test("infers through function parameter types", () => {
      const alpha = store.typevar("alpha");
      const int = store.primitive("integer");
      const text = store.primitive("text");
      const fn1 = store.fn(["x"], [alpha], text);
      const fn2 = store.fn(["x"], [int], text);

      u.unify(fn1, fn2);
      expect(u.getResult().errors).toHaveLength(0);
      expect(u.resolve(alpha)).toBe(int);
    });

    test("infers through function return type", () => {
      const alpha = store.typevar("alpha");
      const int = store.primitive("integer");
      const fn1 = store.fn(["x"], [int], alpha);
      const fn2 = store.fn(["x"], [int], int);

      u.unify(fn1, fn2);
      expect(u.getResult().errors).toHaveLength(0);
      expect(u.resolve(alpha)).toBe(int);
    });

    test("arity mismatch is an error", () => {
      const int = store.primitive("integer");
      const fn1 = store.fn(["x"], [int], int);
      const fn2 = store.fn(["x", "y"], [int, int], int);

      u.unify(fn1, fn2);
      expect(u.getResult().errors).toHaveLength(1);
      expect(u.getResult().errors[0].errorKind).toBe("kind_mismatch");
    });

    test("parameter type mismatch is an error", () => {
      const int = store.primitive("integer");
      const text = store.primitive("text");
      const fn1 = store.fn(["x"], [int], int);
      const fn2 = store.fn(["x"], [text], int);

      u.unify(fn1, fn2);
      expect(u.getResult().errors).toHaveLength(1);
    });
  });

  describe("param type unification", () => {
    const s1 = 0 as TypeSchemeId;
    const s2 = 1 as TypeSchemeId;

    test("same ParamType unifies with itself", () => {
      const p = store.param(s1, 0);
      u.unify(p, p);
      expect(u.getResult().errors).toHaveLength(0);
    });

    test("different index is an error", () => {
      const p0 = store.param(s1, 0);
      const p1 = store.param(s1, 1);
      u.unify(p0, p1);
      expect(u.getResult().errors).toHaveLength(1);
      expect(u.getResult().errors[0].errorKind).toBe("kind_mismatch");
    });

    test("different schemeId is an error", () => {
      const pa = store.param(s1, 0);
      const pb = store.param(s2, 0);
      u.unify(pa, pb);
      expect(u.getResult().errors).toHaveLength(1);
      expect(u.getResult().errors[0].errorKind).toBe("kind_mismatch");
    });

    test("typevar binds to ParamType", () => {
      const alpha = store.typevar("alpha");
      const p = store.param(s1, 0);
      u.unify(alpha, p);
      expect(u.getResult().errors).toHaveLength(0);
      expect(u.resolve(alpha)).toBe(p);
    });

    test("ParamType vs concrete type is an error", () => {
      const p = store.param(s1, 0);
      const int = store.primitive("integer");
      u.unify(p, int);
      expect(u.getResult().errors).toHaveLength(1);
      expect(u.getResult().errors[0].errorKind).toBe("kind_mismatch");
    });

    test("deepResolve passes through ParamType", () => {
      const p = store.param(s1, 0);
      const int = store.primitive("integer");
      const fnType = store.fn(["x"], [p], int);
      const resolved = u.deepResolve(fnType);
      expect(resolved).toBe(fnType);
    });

    test("deepResolve resolves typevar bound to ParamType", () => {
      const alpha = store.typevar("alpha");
      const p = store.param(s1, 0);
      const int = store.primitive("integer");
      u.unify(alpha, p);

      const fnType = store.fn(["x"], [alpha], int);
      const resolved = u.deepResolve(fnType);
      expect(resolved).not.toBe(fnType);
      expect(resolved.kind).toBe("function");
      if (resolved.kind === "function") {
        expect(resolved.parameterTypes[0]).toBe(p);
      }
    });
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
      const recordType = store.record({ col: store.primitive("integer") });
      const set1 = store.apply(setOfCtorId, [recordType]);
      const set2 = store.apply(setOfCtorId, [recordType]);

      u.unify(set1, set2);
      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
    });

    test("unifies applied types with type variables", () => {
      const alpha = store.typevar("alpha");
      const int = store.primitive("integer");
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
      const int = store.primitive("integer");
      const setOfAlpha = store.apply(setOfCtorId, [alpha]);

      u.unify(alpha, int);
      const resolved = u.deepResolve(setOfAlpha);

      expect(resolved.kind).toBe("applied");
      const resolvedApplied = resolved as AppliedType;
      expect(resolvedApplied.arguments[0]).toBe(int);
    });

    test("deepResolve preserves identity when no changes", () => {
      const int = store.primitive("integer");
      const setOfInt = store.apply(setOfCtorId, [int]);

      const resolved = u.deepResolve(setOfInt);
      expect(resolved).toBe(setOfInt); // Same instance due to structural sharing
    });

    test("nested applied types with type variables resolve correctly", () => {
      const alpha = store.typevar("alpha");
      const beta = store.typevar("beta");
      const int = store.primitive("integer");
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
