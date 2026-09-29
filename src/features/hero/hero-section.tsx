import { ArrowRight, Download, Mail } from "lucide-react";

import { LinkButton } from "@/components/atoms/link-button";
import type { HeroImageSide } from "@/lib/content/layout";
import type { Locale, PortfolioView } from "@/types/portfolio";

const chipColors = ["bg-[#0866FF]", "bg-[#10A37F]", "bg-[#7C5CFF]", "bg-[#F5A524]", "bg-[#38BDF8]", "bg-[#E11D48]"];

interface HeroSectionProps {
  content: PortfolioView["hero"];
  imageSide: HeroImageSide;
  highlights: string[];
  locale: Locale;
}

export function HeroSection({ content, imageSide, highlights, locale }: HeroSectionProps) {
  const photoFirst = imageSide !== "right";

  return (
    <section>
      <div className={`flex flex-col gap-6 sm:items-center ${photoFirst ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
        <img
          src={content.imageSrc}
          alt={content.imageAlt}
          className="h-44 w-36 shrink-0 rounded-2xl object-cover object-[center_18%] ring-1 ring-white/15 sm:h-52 sm:w-40"
        />

        <div className="min-w-0">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
            <span className="size-1.5 rounded-full bg-[#10A37F]" />
            {content.badge}
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl">
            {content.name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">{content.role}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 md:text-base">{content.tagline}</p>
          {highlights.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {highlights.map((item, index) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-100"
                >
                  <span className={`size-1.5 rounded-full ${chipColors[index % chipColors.length]}`} />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#experience" size="lg">
              {content.cta.experience}
              <ArrowRight className="ml-2 size-4" />
            </LinkButton>
            <LinkButton href={`/api/cv/${locale}`} size="lg" variant="outline">
              {content.cta.cv}
              <Download className="ml-2 size-4" />
            </LinkButton>
            <LinkButton href="#contact" size="lg" variant="ghost">
              {content.cta.contact}
              <Mail className="ml-2 size-4" />
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
