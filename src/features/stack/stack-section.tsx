import { SectionTitle } from "@/components/atoms/section-title";
import { StackGroup } from "@/components/molecules/stack-group";
import type { StackGroup as StackGroupType } from "@/types/portfolio";

interface StackSectionProps {
  groups: StackGroupType[];
  locale: "es" | "en";
}

export function StackSection({ groups, locale }: StackSectionProps) {
  return (
    <section id="stack" className="space-y-10">
      <SectionTitle
        eyebrow="Tech Stack"
        title={locale === "es" ? "Habilidades técnicas" : "Technical skills"}
        description={
          locale === "es"
            ? "Tecnologías y prácticas listadas en el perfil profesional."
            : "Technologies and practices listed in the professional profile."
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <StackGroup key={group.category} group={group} />
        ))}
      </div>
    </section>
  );
}
