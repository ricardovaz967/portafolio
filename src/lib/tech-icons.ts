const ICON_ALIASES: Record<string, string> = {
  java: "openjdk",
  "spring boot": "spring",
  "spring core": "spring",
  "spring mvc": "spring",
  "spring security": "spring",
  "spring data jpa": "spring",
  hibernate: "hibernate",
  jwt: "jsonwebtokens",
  angular: "angular",
  typescript: "typescript",
  "html/css": "html5",
  git: "git",
  github: "github",
  maven: "apachemaven",
  postman: "postman",
  "intellij idea": "intellijidea",
  "vs code": "visualstudiocode",
  docker: "docker",
  "docker (en curso)": "docker",
  "docker (in progress)": "docker",
  linux: "linux",
  windows: "windows11",
  "sql server": "microsoftsqlserver",
  mysql: "mysql",
  postgresql: "postgresql",
  "owasp top 10": "owasp",
  "ssl/tls": "letsencrypt",
};

/** Practices / concepts without reliable brand logos use a local monogram. */
const LOCAL_ONLY = new Set([
  "mvc",
  "solid",
  "clean architecture",
  "dependency injection",
  "api design",
  "microservices",
  "sql optimization",
  "soap",
  "rest apis",
]);

export function normalizeTechLabel(label: string): string {
  return label.trim().toLowerCase();
}

export function getTechIconSlug(label: string): string | null {
  const key = normalizeTechLabel(label);
  if (LOCAL_ONLY.has(key)) return null;
  return ICON_ALIASES[key] ?? null;
}

export function getTechIconUrl(label: string): string | null {
  const slug = getTechIconSlug(label);
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/94A3B8`;
}

export function getTechInitials(label: string): string {
  const clean = label.replace(/\(.*?\)/g, "").trim();
  const parts = clean.split(/[\s/]+/).filter(Boolean);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}
