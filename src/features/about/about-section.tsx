import { SectionTitle } from "@/components/atoms/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AboutContent } from "@/types/portfolio";

const securityTones = [
  "border-[#0866FF]/40 bg-[#0866FF]/15 text-[#9ec1ff]",
  "border-[#10A37F]/40 bg-[#10A37F]/15 text-[#8ee0c8]",
  "border-[#7C5CFF]/40 bg-[#7C5CFF]/15 text-[#c4b5fd]",
  "border-[#F5A524]/40 bg-[#F5A524]/15 text-[#fcd34d]",
];

interface AboutSectionProps {
  content: AboutContent;
  locale: "es" | "en";
}

export function AboutSection({ content, locale }: AboutSectionProps) {
  return (
    <section id="about" className="space-y-10">
      <SectionTitle title={content.title} description={content.intro} />
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-base">
            {locale === "es"
              ? "Aprendizaje en seguridad de aplicaciones"
              : "Application security learning"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-300">
          <p>{content.securityLearning}</p>
          <div className="flex flex-wrap gap-2">
            {["Spring Security", "JWT", "SSL/TLS", "OWASP Top 10"].map((item, index) => (
              <Badge key={item} className={securityTones[index]}>
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{content.strengthsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {content.strengths.map((strength) => (
              <Badge key={strength}>{strength}</Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{content.languagesTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            {content.languages.map((language) => (
              <p key={language}>{language}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
