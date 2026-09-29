import { SectionTitle } from "@/components/atoms/section-title";
import { TimelineItem } from "@/components/molecules/timeline-item";
import type { ExperienceItem } from "@/types/portfolio";

interface ExperienceSectionProps {
  items: ExperienceItem[];
  locale: "es" | "en";
}

export function ExperienceSection({ items, locale }: ExperienceSectionProps) {
  const title = locale === "es" ? "Experiencia profesional" : "Professional experience";
  const description =
    locale === "es"
      ? "Roles y responsabilidades según trayectoria laboral."
      : "Roles and responsibilities from professional experience.";

  return (
    <section id="experience" className="space-y-10">
      <SectionTitle eyebrow="Experience" title={title} description={description} />
      <div className="grid gap-6">
        {items.map((item) => (
          <TimelineItem key={`${item.period}-${item.title}`} item={item} />
        ))}
      </div>
    </section>
  );
}
