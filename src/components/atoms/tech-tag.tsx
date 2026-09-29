import { Badge } from "@/components/ui/badge";

interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return <Badge className="text-slate-300">{label}</Badge>;
}
