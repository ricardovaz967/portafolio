import { z } from "zod";

import { normalizeSiteLayout, sectionIds, themeIds } from "@/lib/content/layout";

const text = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) => z.string().trim().max(max).optional();
const lines = (maxItem: number, maxItems: number) =>
  z.array(z.string().trim().min(1).max(maxItem)).max(maxItems);

const heroSchema = z.object({
  name: text(120),
  role: text(200),
  tagline: text(600),
  badge: text(80),
  imageAlt: text(180),
  cta: z.object({
    experience: text(80),
    cv: text(80),
    contact: text(80),
  }),
});

const portfolioContentSchema = z.object({
  nav: z.object({
    about: text(40),
    projects: text(40),
    experience: text(40),
    education: text(40),
    stack: text(40),
    architecture: text(40),
    contact: text(40),
  }),
  hero: heroSchema,
  about: z.object({
    title: text(80),
    intro: text(1500),
    securityLearning: text(800),
    strengthsTitle: text(80),
    strengths: lines(80, 12),
    languagesTitle: text(80),
    languages: lines(80, 8),
  }),
  projects: z.object({
    title: text(120),
    description: text(400),
    items: z
      .array(
        z.object({
          title: text(120),
          description: text(800),
          technologies: lines(40, 20),
          repositoryUrl: z.string().trim().url().max(300),
          repositoryLabel: text(60),
        }),
      )
      .max(12),
  }),
  experience: z
    .array(
      z.object({
        period: text(80),
        title: text(120),
        company: text(120),
        responsibilities: lines(300, 20),
        technologies: lines(40, 20),
      }),
    )
    .max(12),
  education: z
    .array(
      z.object({
        title: text(180),
        institution: optionalText(180),
        period: optionalText(80),
        status: optionalText(80),
      }),
    )
    .max(16),
  stack: z
    .array(
      z.object({
        category: text(80),
        items: lines(60, 24),
      }),
    )
    .max(12),
  architecture: z.object({
    title: text(120),
    description: text(600),
    diagram: text(4000),
    decisionsTitle: text(120),
    decisions: z
      .array(
        z.object({
          title: text(120),
          description: text(800),
        }),
      )
      .max(8),
  }),
  contact: z.object({
    title: text(80),
    subtitle: text(120),
    email: z.string().trim().email().max(160),
    phone: text(40),
    location: text(80),
    linkedinHandle: text(120),
    githubHandle: text(80),
    submitLabel: text(60),
    successMessage: text(200),
    errorMessage: text(200),
  }),
  seo: z.object({
    title: text(160),
    description: text(400),
    keywords: lines(60, 24),
  }),
});

export const portfolioDocumentSchema = z.object({
  heroImageFile: z.string().trim().max(40).nullable(),
  layout: z.object({
    theme: z.enum(themeIds),
    heroImageSide: z.enum(["left", "right"]),
    sections: z
      .array(
        z.object({
          id: z.enum(sectionIds),
          visible: z.boolean(),
        }),
      )
      .length(sectionIds.length),
  }),
  es: portfolioContentSchema,
  en: portfolioContentSchema,
});

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function cleanStrings(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }
  return value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
}

function prepareLocale(value: unknown): unknown {
  const content = asRecord(value);
  if (!content) {
    return value;
  }

  const about = asRecord(content.about);
  const projects = asRecord(content.projects);
  const seo = asRecord(content.seo);

  return {
    ...content,
    about: about
      ? {
          ...about,
          strengths: cleanStrings(about.strengths),
          languages: cleanStrings(about.languages),
        }
      : content.about,
    projects: projects
      ? {
          ...projects,
          items: Array.isArray(projects.items)
            ? projects.items.map((item) => {
                const project = asRecord(item);
                return project ? { ...project, technologies: cleanStrings(project.technologies) } : item;
              })
            : projects.items,
        }
      : content.projects,
    experience: Array.isArray(content.experience)
      ? content.experience.map((item) => {
          const job = asRecord(item);
          return job
            ? {
                ...job,
                responsibilities: cleanStrings(job.responsibilities),
                technologies: cleanStrings(job.technologies),
              }
            : item;
        })
      : content.experience,
    stack: Array.isArray(content.stack)
      ? content.stack.map((item) => {
          const group = asRecord(item);
          return group ? { ...group, items: cleanStrings(group.items) } : item;
        })
      : content.stack,
    seo: seo ? { ...seo, keywords: cleanStrings(seo.keywords) } : content.seo,
  };
}

export function preparePortfolioDocument(value: unknown): unknown {
  const document = asRecord(value);
  if (!document) {
    return value;
  }

  return {
    ...document,
    layout: normalizeSiteLayout(document.layout),
    es: prepareLocale(document.es),
    en: prepareLocale(document.en),
  };
}
