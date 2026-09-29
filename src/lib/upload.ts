export async function fetchCVImage(): Promise<string | null> {
  try {
    const res = await fetch("/api/cv/status");
    const contentType = res.headers.get("content-type") ?? "";

    if (!res.ok || !contentType.includes("application/json")) {
      return null;
    }

    const data: unknown = await res.json();
    if (
      typeof data === "object" &&
      data !== null &&
      "path" in data &&
      typeof data.path === "string"
    ) {
      return data.path;
    }

    return null;
  } catch {
    return null;
  }
}
