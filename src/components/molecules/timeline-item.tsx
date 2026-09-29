import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TechTag } from "@/components/atoms/tech-tag";
import type { ExperienceItem } from "@/types/portfolio";

interface TimelineItemProps {
  item: ExperienceItem;
}

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#0866FF] via-[#10A37F] to-[#F5A524]" />
      <CardHeader>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.period}</p>
        <CardTitle>{item.title}</CardTitle>
        <p className="text-sm text-slate-300">{item.company}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
          {item.responsibilities.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
        {item.technologies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <TechTag key={tech} label={tech} />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
