import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/types/portfolio";

interface SiteHeaderProps {
  locale: Locale;
  items: { id: string; label: string }[];
}

export function SiteHeader({ locale, items }: SiteHeaderProps) {
  const altLocale = locale === "es" ? "en" : "es";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 md:px-10">
        <Link className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-100" href={`/${locale}`}>
          <span className="flex gap-0.5" aria-hidden>
            <span className="size-2 rounded-full bg-[#0866FF]" />
            <span className="size-2 rounded-full bg-[#10A37F]" />
          </span>
          Ricardo Vázquez
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-400 md:flex">
          {items.map((item) => (
            <a key={item.id} className="transition-colors hover:text-slate-100" href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <Link href={`/${altLocale}`}>
          <Badge>{altLocale.toUpperCase()}</Badge>
        </Link>
      </div>
    </header>
  );
}
