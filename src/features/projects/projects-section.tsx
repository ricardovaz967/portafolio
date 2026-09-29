import { ExternalLink } from "lucide-react";

import { SectionTitle } from "@/components/atoms/section-title";
import { TechTag } from "@/components/atoms/tech-tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortfolioContent } from "@/types/portfolio";

interface ProjectsSectionProps {
  content: PortfolioContent["projects"];
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section id="projects" className="space-y-10">
      <SectionTitle eyebrow="Selected work" title={content.title} description={content.description} />
      <div className="grid gap-6 md:grid-cols-2">
        {content.items.map((project) => (
          <Card key={project.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-5">
              <p className="text-sm leading-6 text-slate-300">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <TechTag key={technology} label={technology} />
                ))}
              </div>
              <a
                className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200"
                href={project.repositoryUrl}
                rel="noreferrer"
                target="_blank"
              >
                {project.repositoryLabel} <ExternalLink className="size-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
