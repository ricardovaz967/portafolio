export const sectionIds = ["hero", "about", "projects", "experience", "education", "stack", "architecture", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];

export const themeIds = ["midnight", "ocean", "forest", "copper", "light"] as const;

export type ThemeId = (typeof themeIds)[number];

export type HeroImageSide = "left" | "right";

export interface SiteSection {
  id: SectionId;
  visible: boolean;
}

export interface SiteLayout {
  theme: ThemeId;
  heroImageSide: HeroImageSide;
  sections: SiteSection[];
}

const sectionIdSet = new Set<string>(sectionIds);
const themeIdSet = new Set<string>(themeIds);

export function defaultSiteLayout(): SiteLayout {
  return {
    theme: "midnight",
    heroImageSide: "right",
    sections: sectionIds.map((id) => ({ id, visible: true })),
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

export function normalizeSiteLayout(value: unknown): SiteLayout {
  const fallback = defaultSiteLayout();
  const record = asRecord(value);
  if (!record) {
    return fallback;
  }

  const theme = typeof record.theme === "string" && themeIdSet.has(record.theme) ? (record.theme as ThemeId) : fallback.theme;
  const heroImageSide: HeroImageSide = record.heroImageSide === "left" ? "left" : "right";
  const seen = new Set<SectionId>();
  const sections: SiteSection[] = [];

  if (Array.isArray(record.sections)) {
    for (const item of record.sections) {
      const section = asRecord(item);
      if (!section || typeof section.id !== "string" || !sectionIdSet.has(section.id) || seen.has(section.id as SectionId)) {
        continue;
      }
      const id = section.id as SectionId;
      seen.add(id);
      sections.push({ id, visible: section.visible !== false });
    }
  }

  for (const id of sectionIds) {
    if (!seen.has(id)) {
      sections.push({ id, visible: true });
    }
  }

  return { theme, heroImageSide, sections };
}
