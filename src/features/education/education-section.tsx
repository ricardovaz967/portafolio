import { SectionTitle } from "@/components/atoms/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EducationItem } from "@/types/portfolio";

interface EducationSectionProps {
  items: EducationItem[];
  locale: "es" | "en";
}

export function EducationSection({ items, locale }: EducationSectionProps) {
  return (
    <section id="education" className="space-y-10">
      <SectionTitle
        eyebrow="Education"
        title={locale === "es" ? "Educación y formación" : "Education and training"}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={`${item.title}-${item.period ?? item.status ?? "item"}`}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
              {item.institution ? <p className="text-sm text-slate-300">{item.institution}</p> : null}
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {item.period ? <Badge>{item.period}</Badge> : null}
              {item.status ? (
                <Badge className="border-[#f5d0a8] bg-[#fff4e5] text-[#9a3412]">{item.status}</Badge>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
