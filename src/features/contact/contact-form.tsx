"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ContactField } from "@/components/molecules/contact-field";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import type { ContactContent } from "@/types/portfolio";

interface ContactFormProps {
  content: ContactContent;
}

export function ContactForm({ content }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    reset();
    setStatus("success");
  });

  return (
    <motion.form
      aria-live="polite"
      className="space-y-4"
      initial={{ opacity: 0, y: 12 }}
      onSubmit={onSubmit}
      transition={{ duration: 0.35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <input className="hidden" tabIndex={-1} {...register("website")} />
      <ContactField
        label="Nombre / Name"
        error={errors.name?.message}
        inputProps={register("name")}
        textareaProps={{}}
      />
      <ContactField
        label="Email"
        error={errors.email?.message}
        inputProps={register("email")}
        textareaProps={{}}
      />
      <ContactField
        label="Empresa / Company"
        error={errors.company?.message}
        inputProps={register("company")}
        textareaProps={{}}
      />
      <ContactField
        label="Mensaje / Message"
        error={errors.message?.message}
        multiline
        inputProps={{}}
        textareaProps={register("message")}
      />
      <Button disabled={isSubmitting} type="submit">
        {content.submitLabel}
      </Button>
      {status === "success" ? <p className="text-sm text-emerald-300">{content.successMessage}</p> : null}
      {status === "error" ? <p className="text-sm text-red-300">{content.errorMessage}</p> : null}
    </motion.form>
  );
}
