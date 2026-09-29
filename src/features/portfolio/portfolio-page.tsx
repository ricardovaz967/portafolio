import { PortfolioTemplate } from "@/components/templates/portfolio-template";
import { getPortfolioContent } from "@/content";
import { AboutSection } from "@/features/about/about-section";
import { ArchitectureSection } from "@/features/architecture/architecture-section";
import { ContactSection } from "@/features/contact/contact-section";
import { EducationSection } from "@/features/education/education-section";
import { ExperienceSection } from "@/features/experience/experience-section";
import { HeroSection } from "@/features/hero/hero-section";
import { SiteHeader } from "@/features/hero/site-header";
import { ProjectsSection } from "@/features/projects/projects-section";
import { PersonJsonLd } from "@/features/seo/person-jsonld";
import { StackSection } from "@/features/stack/stack-section";
import type { SectionId } from "@/lib/content/layout";
import type { Locale, PortfolioView } from "@/types/portfolio";

interface PortfolioPageProps {
  locale: Locale;
}

export async function PortfolioPage({ locale }: PortfolioPageProps) {
  const content = await getPortfolioContent(locale);
  const navItems = content.layout.sections.flatMap((section) => {
    if (!section.visible || section.id === "hero") {
      return [];
    }
    return [{ id: section.id, label: content.nav[section.id] }];
  });

  return (
    <PortfolioTemplate
      theme={content.layout.theme}
      header={<SiteHeader locale={locale} items={navItems} />}
    >
      {content.layout.sections.map((section) =>
        section.visible ? renderSection(section.id, content, locale) : null,
      )}
      <PersonJsonLd content={content} />
    </PortfolioTemplate>
  );
}

function highlightsFor(content: PortfolioView): string[] {
  return content.stack.flatMap((group) => group.items).slice(0, 6);
}

function renderSection(id: SectionId, content: PortfolioView, locale: Locale) {
  switch (id) {
    case "hero":
      return (
        <HeroSection
          key={id}
          content={content.hero}
          imageSide={content.layout.heroImageSide}
          highlights={highlightsFor(content)}
          locale={locale}
        />
      );
    case "about":
      return <AboutSection key={id} content={content.about} locale={locale} />;
    case "projects":
      return <ProjectsSection key={id} content={content.projects} />;
    case "experience":
      return <ExperienceSection key={id} items={content.experience} locale={locale} />;
    case "education":
      return <EducationSection key={id} items={content.education} locale={locale} />;
    case "stack":
      return <StackSection key={id} groups={content.stack} locale={locale} />;
    case "architecture":
      return <ArchitectureSection key={id} content={content.architecture} />;
    case "contact":
      return <ContactSection key={id} content={content.contact} />;
  }
}
