import type { PortfolioContent } from "@/types/portfolio";

export function getPersonJsonLd(content: PortfolioContent) {
  const sameAs = [
    content.contact.linkedinHandle
      ? `https://www.linkedin.com/in/${content.contact.linkedinHandle}`
      : null,
    content.contact.githubHandle ? `https://github.com/${content.contact.githubHandle}` : null,
  ].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.hero.name,
    jobTitle: content.hero.role,
    email: content.contact.email,
    telephone: content.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.contact.location,
      addressCountry: "MX",
    },
    sameAs,
    knowsAbout: content.stack.flatMap((group) => group.items).slice(0, 16),
    description: content.seo.description,
  };
}
