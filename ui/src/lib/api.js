const directApiBase = process.env.NEXT_PUBLIC_PROXY_URL?.replace(/\/$/, "");

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return directApiBase ? `${directApiBase}${normalizedPath}` : `/api${normalizedPath}`;
}
