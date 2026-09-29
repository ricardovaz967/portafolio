interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10A37F]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#0866FF]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5A524]" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold text-slate-50 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-pretty text-slate-300">{description}</p> : null}
    </div>
  );
}
