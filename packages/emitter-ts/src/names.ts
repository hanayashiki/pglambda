/** Convert snake_case to camelCase. Pure function. */
export function snakeToCamel(name: string): string {
  return name.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** Convert snake_case to PascalCase. Pure function. */
export function snakeToPascal(name: string): string {
  const camel = snakeToCamel(name);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}
