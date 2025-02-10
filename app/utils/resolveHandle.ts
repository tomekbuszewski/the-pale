export function resolveHandle(input: string): string {
  const cleanUrl = input.replace(/\/$/, "");
  const segments = cleanUrl.split("/");
  return segments[segments.length - 1];
}
