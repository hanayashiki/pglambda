import {
  Unification,
  type Type,
  type TypeStore,
  type TypeConstructorId,
  type TypeScheme,
  type TypeSchemeId,
  type AppliedType,
} from "@pglambda/types";
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
  private readonly defToScheme = new Map<ContentHash, TypeSchemeId>();

  private constraints: EqualityConstraint[] = [];
  private unification: Unification;
  private readonly setOfCtorId: TypeConstructorId;

  constructor(
    private sccIn: SCCIn,
    private readonly store: TypeStore,
    private readonly ast: AstStore,
  ) {
    this.unification = new Unification(store);
    this.astToType = new Map();

    // Look up SetOf constructor
    const setOfCtor = store.ctors.lookup("SetOf");
    if (!setOfCtor) {
      throw new Error("SetOf type constructor not registered");
    }
    this.setOfCtorId = setOfCtor.id;
  }

  get typeStore(): TypeStore {
    return this.store;
  }

  get astStore(): AstStore {
    return this.ast;
  }

  getType(hash: ContentHash): Type | undefined {
    return this.sccIn.imports.get(hash) ?? this.astToType.get(hash);
  }

  addEquality(constraint: EqualityConstraint): void {
    this.constraints.push(constraint);
    this.unification.unify(constraint.t1, constraint.t2);
  }

  addError(message: string): void {
    this.errors.push({ message });
  }

  setDefScheme(defHash: ContentHash, schemeId: TypeSchemeId): void {
    this.defToScheme.set(defHash, schemeId);
  }

  getDefScheme(defHash: ContentHash): TypeSchemeId | undefined {
    return this.defToScheme.get(defHash);
  }

  /**
   * Instantiate a type scheme, resolving typevars through unification
   * bindings so that ParamType nodes inside bound types get replaced.
   */
  instantiate(scheme: TypeScheme): Type {
    return this.store.instantiate(scheme, (t) => this.unification.resolve(t));
  }

  /**
   * Helper method for creating SetOf types
   * TODO: create a type safe version.
   */
  setOf(rowType: Type): AppliedType {
    return this.store.apply(this.setOfCtorId, [rowType]);
  }

  /** Collect all constraints from AST and solve the types. */
  check(): CheckResult {
    // 0. Partition nodes: generic defs first, then the rest
    const sortedNodes = this.partitionNodes();

    // 1. Visit generic defs first to resolve the type scheme, then other nodes
    const checker = new Checker(this);
    for (const node of sortedNodes) {
      checker.visit(this.ast.getAs(node));
    }

    // 2. Constraints already unified during visitor via addEquality
    const unificationResult = this.unification.getResult();

    // 3. Resolve exported node types through substitution
    const exportedTypes = new Map<ContentHash, Type>();
    for (const hash of this.sccIn.exportedNodes) {
      const type = this.resolveExport(hash);
      if (type) {
        exportedTypes.set(hash, this.unification.deepResolve(type));
      }
    }

    // 4. Resolve type scheme bodies through substitution
    const exportedTypeSchemes: TypeScheme[] = [];
    for (const scheme of this.store.schemes.values()) {
      const resolvedBody = this.unification.deepResolve(scheme.body);
      exportedTypeSchemes.push({
        ...scheme,
        body: resolvedBody,
      });
    }

    return {
      scc: {
        nodes: this.sccIn.nodes,
        imports: this.sccIn.imports,
        exportedTypes,
        exportedTypeSchemes,
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

  /**
   * Partition SCC nodes: generic defs first, then the rest.
   * Errors if multiple generic defs are found (non-trivial SCC not supported yet).
   */
  private partitionNodes(): ContentHash[] {
    const genericDefNodes: ContentHash[] = [];
    const otherNodes: ContentHash[] = [];
    for (const node of this.sccIn.nodes) {
      const def = this.ast.getDefinition(node);
      if (def && def.tag === "query" && def.data.typeParams.length > 0) {
        genericDefNodes.push(node);
      } else {
        otherNodes.push(node);
      }
    }

    if (genericDefNodes.length > 1) {
      this.errors.push({
        message: "Non-trivial SCC with multiple generic definitions not supported yet",
      });
    }

    return [...genericDefNodes, ...otherNodes];
  }

  /**
   * Get or lazily create a typevar placeholder for a node hash.
   * Safe for forward references — callers constrain the typevar later.
   */
  getOrCreateTypeVar(hash: ContentHash): Type {
    if (this.sccIn.imports.has(hash)) {
      return this.sccIn.imports.get(hash)!;
    }
    const existing = this.astToType.get(hash);
    if (existing) return existing;
    const tv = this.store.typevar();
    this.astToType.set(hash, tv);
    return tv;
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
