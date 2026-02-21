import { Unification, type Type, type TypeStore } from "@pglambda/types";
import type { EqualityConstraint } from "./constraint.js";
import type { AstStore } from "@pglambda/parser";
import type { ContentHash, SCC, SCCIn } from "./scc.js";
import { Checker } from "./checker.js";
import { ParserRuleContext } from "@pglambda/antlr";

export type CheckError = { message: string };

export type CheckResult = {
  readonly scc: SCC;
  readonly errors: readonly CheckError[];
};

/**
 * Checker — per-SCC type checking orchestrator.
 *
 * Owns the Solver and TypeStore for a single SCC.
 * Constraint generators call addEquality/addError but never solve.
 * The SCC-level caller creates the Checker, drives constraint generation,
 * then calls solve() and resolve().
 */
export class CheckContext {
  private readonly errors: CheckError[] = [];
  private readonly astToType: Map<ContentHash, Type>;

  private constraints: EqualityConstraint[] = [];
  private unification: Unification;

  constructor(
    private sccIn: SCCIn,
    private readonly store: TypeStore,
    private readonly ast: AstStore,
  ) {
    this.unification = new Unification(store);
    this.astToType = new Map();
  }

  get typeStore(): TypeStore {
    return this.store;
  }

  addEquality(constraint: EqualityConstraint): void {
    this.constraints.push(constraint);
  }

  addError(message: string): void {
    this.errors.push({ message });
  }

  /** Collect all constraints from AST and solve the types. */
  check(): CheckResult {
    // 1. Visit all SCC nodes — populates astToType and constraints
    const checker = new Checker(this);
    for (const node of this.sccIn.nodes) {
      checker.visit(this.ast.getAs(node));
    }

    // 2. Unify all collected constraints
    for (const { t1, t2 } of this.constraints) {
      this.unification.unify(t1, t2);
    }
    const unificationResult = this.unification.getResult();

    // 3. Resolve exported node types through substitution
    const typeExports = new Map<ContentHash, Type>();
    for (const hash of this.sccIn.exportedNodes) {
      const type = this.resolveExport(hash);
      if (type) {
        typeExports.set(hash, this.unification.resolve(type));
      }
    }

    return {
      scc: {
        nodes: this.sccIn.nodes,
        imports: this.sccIn.imports,
        exports: typeExports,
      },
      errors: [
        ...this.errors,
        ...unificationResult.errors.map((e) => ({ message: e.message })),
      ],
    };
  }

  /**
   * Resolve the type for an exported node hash.
   * If the hash has a direct entry in astToType, return it.
   * Otherwise, chase single-child pass-through nodes in the AST.
   */
  private resolveExport(hash: ContentHash): Type | undefined {
    if (this.astToType.has(hash)) {
      return this.astToType.get(hash)!;
    }

    // Pass-through: walk down to the single rule-node child
    const node = this.ast.getAs<ParserRuleContext>(hash);
    const childCount = node.getChildCount();
    for (let i = 0; i < childCount; i++) {
      const child = node.getChild(i);
      if (child instanceof ParserRuleContext) {
        return this.resolveExport(child.contentHash);
      }
    }

    return undefined;
  }

  getOrInsert(hash: ContentHash, check: () => Type): Type {
    if (this.sccIn.imports.has(hash)) {
      return this.sccIn.imports.get(hash)!;
    } else if (this.astToType.has(hash)) {
      return this.astToType.get(hash)!;
    } else {
      const t = check();
      this.astToType.set(hash, t);
      return t;
    }
  }
}
