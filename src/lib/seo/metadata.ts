import type { Metadata } from "next";

import { getPortfolioContent } from "@/content";
import { env } from "@/lib/config/env";
import type { Locale } from "@/types/portfolio";

export async function buildLocaleMetadata(locale: Locale): Promise<Metadata> {
  const content = await getPortfolioContent(locale);
  const path = locale === "es" ? "/es" : "/en";
  const url = `${env.NEXT_PUBLIC_SITE_URL}${path}`;

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: path,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url,
      siteName: content.hero.name,
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image",
          width: 1200,
          height: 630,
          alt: content.hero.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/og-image"],
    },
  };
}
