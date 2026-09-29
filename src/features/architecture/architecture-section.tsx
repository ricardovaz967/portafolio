import { SectionTitle } from "@/components/atoms/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MermaidDiagram } from "@/features/architecture/mermaid-diagram";
import type { ArchitectureContent } from "@/types/portfolio";

interface ArchitectureSectionProps {
  content: ArchitectureContent;
}

export function ArchitectureSection({ content }: ArchitectureSectionProps) {
  return (
    <section id="architecture" className="space-y-10">
      <SectionTitle eyebrow="Architecture" title={content.title} description={content.description} />
      <Card>
        <CardHeader>
          <CardTitle>{content.decisionsTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <MermaidDiagram chart={content.diagram} />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {content.decisions.map((decision) => (
          <Card key={decision.title}>
            <CardHeader>
              <CardTitle className="text-base">{decision.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-300">{decision.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
