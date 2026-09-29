import { Badge } from "@/components/ui/badge";

interface MetricPillProps {
  value: string;
}

export function MetricPill({ value }: MetricPillProps) {
  return <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-200">{value}</Badge>;
}
