import type { Expr, HirId } from "@pglambda/hir";
import type { Type } from "@pglambda/types";
import { ctx } from "./ctx.js";

export function checkExpr(e: Expr): Type {
  switch (e.tag) {
    case "literal":
      return ctx.getOrInsert(e.id, () => {
        switch (e.data.value.kind) {
          case "int":
            return ctx.typeStore.primitive("integer");
          case "numeric":
            return ctx.typeStore.primitive("numeric");
          case "text":
            return ctx.typeStore.primitive("text");
          case "bool":
            return ctx.typeStore.primitive("boolean");
          case "null":
            return ctx.typeStore.nullable(ctx.typeStore.typevar());
        }
      });

    case "paramRef": {
      return ctx.getOrInsert(e.id, () => {
        const defId = ctx.hirStore.getResolution(e.data.name.id);
        if (!defId) return ctx.typeStore.error("Unresolved parameter reference");
        const defType = ctx.getOrCreateTypeVar(defId as HirId);
        ctx.getOrInsert(e.data.name.id, () => defType);
        return defType;
      });
    }

    case "pglRef": {
      return ctx.getOrInsert(e.id, () => {
        const parts = e.data.name.data.parts;
        if (parts.length !== 1) {
          return ctx.typeStore.error("Module-qualified references not implemented");
        }
        const defId = ctx.hirStore.getResolution(parts[0].id);
        if (!defId) return ctx.typeStore.error("Unresolved reference");
        const defType = ctx.getOrCreateTypeVar(defId as HirId);
        ctx.getOrInsert(parts[0].id, () => defType);
        return defType;
      });
    }

    case "pglCall": {
      return ctx.getOrInsert(e.id, () => {
        const parts = e.data.name.data.parts;
        if (parts.length !== 1) {
          return ctx.typeStore.error("Module-qualified calls not supported yet");
        }
        const defId = ctx.hirStore.getResolution(parts[0].id);
        if (!defId) return ctx.typeStore.error("Unresolved function call");

        const schemeId = ctx.getDefScheme(defId as HirId);
        let calledType: Type;
        if (schemeId !== undefined) {
          const scheme = ctx.typeStore.schemes.get(schemeId)!;
          calledType = ctx.instantiate(scheme);
        } else {
          calledType = ctx.getOrCreateTypeVar(defId as HirId);
        }

        const argTypes = e.data.args.map((arg) => checkExpr(arg));

        const resultTypeVar = ctx.typeStore.typevar();
        const paramNames = argTypes.map((_, i) => `$${i}`);
        const expectedFnType = ctx.typeStore.fn(paramNames, argTypes, resultTypeVar);

        ctx.addEquality({ t1: calledType, t2: expectedFnType });
        return resultTypeVar;
      });
    }

    case "binOp":
      return ctx.getOrInsert(e.id, () => {
        // Recurse into sub-expressions (needed for nested refs/calls)
        checkExpr(e.data.left);
        checkExpr(e.data.right);

        // Return result type only — operand coercion constraints deferred
        // (PG has complex coercion rules that need careful design)
        switch (e.data.op) {
          case "=":
          case "<>":
          case "<":
          case ">":
          case "<=":
          case ">=":
          case "AND":
          case "OR":
          case "LIKE":
          case "ILIKE":
            return ctx.typeStore.primitive("boolean");

          case "+":
          case "-":
          case "*":
          case "/":
          case "%":
            return ctx.typeStore.typevar();

          case "||":
            return ctx.typeStore.primitive("text");
        }
      });

    case "unaryOp":
      return ctx.getOrInsert(e.id, () => {
        // Recurse into operand — no operand constraints for now
        checkExpr(e.data.operand);
        switch (e.data.op) {
          case "NOT":
            return ctx.typeStore.primitive("boolean");
          case "+":
          case "-":
            return ctx.typeStore.typevar();
        }
      });

    case "paren":
      return checkExpr(e.data.inner);

    case "columnRef":
      return ctx.getOrInsert(e.id, () => {
        const defId = ctx.hirStore.getResolution(e.data.name.id);
        if (!defId) return ctx.typeStore.error("Unresolved column reference");

        const tableType = ctx.getTableType(defId);
        if (!tableType) return ctx.typeStore.error("Column reference does not resolve to a table");
        if (tableType.kind !== "record")
          return ctx.typeStore.error("Expected record type for column reference");

        const colName = e.data.name.data.parts.at(-1)!.data.text;
        const fieldType = tableType.fields[colName];
        if (!fieldType) return ctx.typeStore.error(`Column "${colName}" not found in table`);
        // Store type on inner nodes so markers can find them
        ctx.getOrInsert(e.data.name.id, () => fieldType);
        for (const part of e.data.name.data.parts) {
          ctx.getOrInsert(part.id, () => fieldType);
        }
        return fieldType;
      });
  }
}
