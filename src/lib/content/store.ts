import { mkdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { portfolioEn } from "@/content/en/portfolio";
import { portfolioEs } from "@/content/es/portfolio";
import { portfolioDocumentSchema, preparePortfolioDocument } from "@/lib/content/schema";
import { defaultSiteLayout } from "@/lib/content/layout";
import type { Locale, PortfolioDocument, PortfolioView } from "@/types/portfolio";

const HERO_FILES = ["hero.jpg", "hero.png", "hero.webp"] as const;

type HeroExtension = (typeof HERO_FILES)[number] extends `hero.${infer Extension}` ? Extension : never;

function dataDir(): string {
  return process.env.PORTFOLIO_DATA_DIR || path.join(process.cwd(), "data");
}

function contentFile(): string {
  return path.join(dataDir(), "portfolio.json");
}

export function uploadsDir(): string {
  return path.join(dataDir(), "uploads");
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

function seedDocument(): PortfolioDocument {
  return {
    heroImageFile: null,
    layout: defaultSiteLayout(),
    es: portfolioEs,
    en: portfolioEn,
  };
}

let cache: { mtimeMs: number; document: PortfolioDocument } | null = null;
let queue: Promise<unknown> = Promise.resolve();

function exclusive<T>(operation: () => Promise<T>): Promise<T> {
  const run = queue.then(operation, operation);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function readPortfolioDocument(): Promise<PortfolioDocument> {
  return exclusive(async () => {
    await mkdir(dataDir(), { recursive: true });

    try {
      const fileStat = await stat(contentFile());
      if (cache && cache.mtimeMs === fileStat.mtimeMs) {
        return cache.document;
      }

      const raw = await readFile(contentFile(), "utf8");
      const document = portfolioDocumentSchema.parse(preparePortfolioDocument(JSON.parse(raw)));
      cache = { mtimeMs: fileStat.mtimeMs, document };
      return document;
    } catch (error) {
      if (!isMissingFile(error)) {
        throw error;
      }

      return writeUnlocked(seedDocument());
    }
  });
}

async function writeUnlocked(document: PortfolioDocument): Promise<PortfolioDocument> {
  const parsed = portfolioDocumentSchema.parse(document);
  await mkdir(dataDir(), { recursive: true });
  const target = contentFile();
  const temporary = `${target}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  await rename(temporary, target);
  const fileStat = await stat(target);
  cache = { mtimeMs: fileStat.mtimeMs, document: parsed };
  return parsed;
}

export function writePortfolioDocument(document: PortfolioDocument): Promise<PortfolioDocument> {
  return exclusive(() => writeUnlocked(document));
}

function contentTypeFor(filename: string): string {
  if (filename.endsWith(".png")) {
    return "image/png";
  }
  if (filename.endsWith(".webp")) {
    return "image/webp";
  }
  return "image/jpeg";
}

export async function heroImageSrc(document: PortfolioDocument): Promise<string> {
  if (!document.heroImageFile) {
    return "/images/hero.png";
  }

  const filename = path.basename(document.heroImageFile);
  if (!HERO_FILES.includes(filename as (typeof HERO_FILES)[number])) {
    return "/images/hero.png";
  }

  try {
    const fileStat = await stat(path.join(uploadsDir(), filename));
    return `/api/media/hero?v=${Math.floor(fileStat.mtimeMs)}`;
  } catch {
    return "/images/hero.png";
  }
}

export async function getPortfolioContent(locale: Locale): Promise<PortfolioView> {
  const document = await readPortfolioDocument();
  const imageSrc = await heroImageSrc(document);

  return {
    ...document[locale],
    layout: document.layout,
    hero: {
      ...document[locale].hero,
      imageSrc,
    },
  };
}

export async function loadResumePhoto(): Promise<{ data: Buffer; format: "png" | "jpg" } | null> {
  const uploaded = await readHeroImageFile();
  if (uploaded?.contentType === "image/png") {
    return { data: uploaded.bytes, format: "png" };
  }
  if (uploaded?.contentType === "image/jpeg") {
    return { data: uploaded.bytes, format: "jpg" };
  }
  return null;
}

export async function readHeroImageFile(): Promise<{ bytes: Buffer; contentType: string } | null> {
  const document = await readPortfolioDocument();
  if (!document.heroImageFile) {
    return null;
  }

  const filename = path.basename(document.heroImageFile);
  if (!HERO_FILES.includes(filename as (typeof HERO_FILES)[number])) {
    return null;
  }

  try {
    const bytes = await readFile(path.join(uploadsDir(), filename));
    return { bytes, contentType: contentTypeFor(filename) };
  } catch (error) {
    if (isMissingFile(error)) {
      return null;
    }
    throw error;
  }
}

async function removeHeroFiles(): Promise<void> {
  await mkdir(uploadsDir(), { recursive: true });
  await Promise.all(
    HERO_FILES.map(async (filename) => {
      await unlink(path.join(uploadsDir(), filename)).catch((error: unknown) => {
        if (!isMissingFile(error)) {
          throw error;
        }
      });
    }),
  );
}

export function detectHeroExtension(bytes: Buffer): HeroExtension | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }
  if (
    bytes.length >= 8 &&
    bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return "png";
  }
  if (
    bytes.length >= 12 &&
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

export async function saveHeroImage(bytes: Buffer, extension: HeroExtension): Promise<PortfolioDocument> {
  await removeHeroFiles();
  const filename = `hero.${extension}`;
  await writeFile(path.join(uploadsDir(), filename), bytes);
  const document = await readPortfolioDocument();
  return writePortfolioDocument({ ...document, heroImageFile: filename });
}

export async function clearHeroImage(): Promise<PortfolioDocument> {
  await removeHeroFiles();
  const document = await readPortfolioDocument();
  return writePortfolioDocument({ ...document, heroImageFile: null });
}
