import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioPage } from "@/features/portfolio/portfolio-page";
import { locales } from "@/i18n/config";
import { buildLocaleMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/types/portfolio";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {};
  }
  return buildLocaleMetadata(locale as Locale);
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <PortfolioPage locale={locale as Locale} />;
}
