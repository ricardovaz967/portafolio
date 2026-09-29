import Link from "next/link";

import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  const { className, size, variant } = props;

  return (
    <Link className={cn(buttonVariants({ size, variant, className }))} href={href}>
      {children}
    </Link>
  );
}
