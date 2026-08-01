export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://etesalgostarr.ir/phpStoreSite"
).replace(/\/$/, "");

export const API_ORIGIN = new URL(API_BASE_URL).origin;

export function resolveImageUrl(path: string) {
  if (!path || path.startsWith("data:") || /^https?:\/\//.test(path)) return path;
  if (path.startsWith("/Image/")) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}
