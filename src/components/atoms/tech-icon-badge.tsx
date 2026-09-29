import Image from "next/image";

import { getTechIconUrl, getTechInitials } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

interface TechIconBadgeProps {
  label: string;
  className?: string;
}

export function TechIconBadge({ label, className }: TechIconBadgeProps) {
  const iconUrl = getTechIconUrl(label);

  return (
    <div
      className={cn(
        "group flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 transition hover:border-blue-500/40 hover:bg-slate-900",
        className,
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-700 bg-slate-950">
        {iconUrl ? (
          <Image
            alt=""
            aria-hidden
            className="size-5 object-contain opacity-90 transition group-hover:opacity-100"
            height={20}
            src={iconUrl}
            unoptimized
            width={20}
          />
        ) : (
          <span className="font-mono text-[10px] font-semibold tracking-wide text-blue-300">
            {getTechInitials(label)}
          </span>
        )}
      </span>
      <span className="text-sm text-slate-200">{label}</span>
    </div>
  );
}
