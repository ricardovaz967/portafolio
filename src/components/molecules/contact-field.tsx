import type React from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFieldProps {
  label: string;
  error?: string | undefined;
  multiline?: boolean;
  inputProps: React.ComponentProps<"input">;
  textareaProps: React.ComponentProps<"textarea">;
}

export function ContactField({
  label,
  error,
  multiline = false,
  inputProps,
  textareaProps,
}: ContactFieldProps) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-slate-200">{label}</span>
      {multiline ? <Textarea {...textareaProps} /> : <Input {...inputProps} />}
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
