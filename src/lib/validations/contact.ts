import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(20).max(2000),
  website: z.string().max(0).optional(), // Honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
