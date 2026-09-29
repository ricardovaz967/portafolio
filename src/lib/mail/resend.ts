import { Resend } from "resend";

import { env } from "@/lib/config/env";
import type { ContactInput } from "@/lib/validations/contact";

const sender = "Portfolio <onboarding@resend.dev>";

export async function sendContactEmail(payload: ContactInput) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    return { skipped: true as const };
  }

  const resend = new Resend(env.RESEND_API_KEY);

  await resend.emails.send({
    from: sender,
    to: env.CONTACT_TO_EMAIL,
    subject: `Nuevo contacto portfolio: ${payload.name}`,
    replyTo: payload.email,
    text: [
      `Nombre: ${payload.name}`,
      `Email: ${payload.email}`,
      `Empresa: ${payload.company ?? "N/A"}`,
      "",
      payload.message,
    ].join("\n"),
  });

  return { skipped: false as const };
}
