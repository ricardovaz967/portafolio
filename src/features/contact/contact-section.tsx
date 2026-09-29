import { Code2, Mail, MapPin, Phone, UserRound } from "lucide-react";

import { SectionTitle } from "@/components/atoms/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/features/contact/contact-form";
import type { ContactContent } from "@/types/portfolio";

interface ContactSectionProps {
  content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className="space-y-10">
      <SectionTitle title={content.title} description={content.subtitle} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardContent className="space-y-4 pt-6 text-sm text-slate-300">
            <p className="flex items-center gap-2">
              <Mail className="size-4 text-blue-300" />
              <a className="hover:text-slate-100" href={`mailto:${content.email}`}>
                {content.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-blue-300" />
              <a className="hover:text-slate-100" href={`tel:${content.phone.replace(/[^\d+]/g, "")}`}>
                {content.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-blue-300" />
              {content.location}
            </p>
            <a
              className="flex items-center gap-2 hover:text-slate-100"
              href={`https://www.linkedin.com/in/${content.linkedinHandle}`}
              rel="noreferrer"
              target="_blank"
            >
              <UserRound className="size-4 text-blue-300" />
              LinkedIn: {content.linkedinHandle}
            </a>
            <a
              className="flex items-center gap-2 hover:text-slate-100"
              href={`https://github.com/${content.githubHandle}`}
              rel="noreferrer"
              target="_blank"
            >
              <Code2 className="size-4 text-blue-300" />
              GitHub: {content.githubHandle}
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <ContactForm content={content} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
