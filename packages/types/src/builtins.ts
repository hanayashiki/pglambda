export type AnyBuiltInTypeConstructorDef = {
  name: string;
  parameters: Record<string, boolean>;
};

const typeConstructor = <D extends AnyBuiltInTypeConstructorDef>(def: D): D => {
  return def;
};

export namespace BuiltinTypeConstructors {
  export const SetOf = typeConstructor({
    name: "SetOf",
    parameters: {
      RowType: true,
    },
  });
}
