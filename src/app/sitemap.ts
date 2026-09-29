import type { MetadataRoute } from "next";

import { env } from "@/lib/config/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/es", "/en"];

  return routes.map((route) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
    lastModified: new Date(),
  }));
}
