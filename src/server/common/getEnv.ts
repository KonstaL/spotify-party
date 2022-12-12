export function env(str: string): string {
  const val = process.env[str];
  if (!val) throw new Error(`Missing env var ${str}`);
  return val;
}
