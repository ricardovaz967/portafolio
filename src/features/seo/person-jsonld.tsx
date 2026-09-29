import { getPersonJsonLd } from "@/lib/seo/jsonld";
import type { PortfolioView } from "@/types/portfolio";

interface PersonJsonLdProps {
  content: PortfolioView;
}

export function PersonJsonLd({ content }: PersonJsonLdProps) {
  const payload = getPersonJsonLd(content);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
      type="application/ld+json"
    />
  );
}
