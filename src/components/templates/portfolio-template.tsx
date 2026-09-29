import type React from "react";

interface PortfolioTemplateProps {
  theme: string;
  header: React.ReactNode;
  children: React.ReactNode;
}

export function PortfolioTemplate({ theme, header, children }: PortfolioTemplateProps) {
  return (
    <div data-theme={theme} className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(ellipse_at_8%_0%,rgba(8,102,255,0.2),transparent_42%),radial-gradient(ellipse_at_88%_6%,rgba(16,163,127,0.16),transparent_36%),radial-gradient(ellipse_at_62%_0%,rgba(245,165,36,0.1),transparent_30%)]"
      />
      <div className="relative">
        {header}
        <main className="mx-auto flex max-w-6xl flex-col gap-28 px-6 pb-28 pt-14 md:px-10">{children}</main>
      </div>
    </div>
  );
}
