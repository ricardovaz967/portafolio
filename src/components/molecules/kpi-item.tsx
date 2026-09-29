import { MetricPill } from "@/components/atoms/metric-pill";

interface KpiItemProps {
  label: string;
  value: string;
}

export function KpiItem({ label, value }: KpiItemProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-left">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-2">
        <MetricPill value={value} />
      </div>
    </div>
  );
}
