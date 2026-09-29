import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TechIconBadge } from "@/components/atoms/tech-icon-badge";
import type { StackGroup as StackGroupType } from "@/types/portfolio";

interface StackGroupProps {
  group: StackGroupType;
}

export function StackGroup({ group }: StackGroupProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.category}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {group.items.map((item) => (
          <TechIconBadge key={item} label={item} />
        ))}
      </CardContent>
    </Card>
  );
}
