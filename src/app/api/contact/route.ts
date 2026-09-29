import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/mail/resend";
import { contactSchema } from "@/lib/validations/contact";

const requestStore = new Map<string, { count: number; updatedAt: number }>();
const RATE_LIMIT_WINDOW = 1000 * 60; // 1 minute
const RATE_LIMIT_MAX = 5;

function getRateLimitKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return `${forwarded}:${userAgent}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = requestStore.get(key);

  if (!current || now - current.updatedAt > RATE_LIMIT_WINDOW) {
    requestStore.set(key, { count: 1, updatedAt: now });
    return false;
  }

  current.count += 1;
  current.updatedAt = now;
  requestStore.set(key, current);

  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const key = getRateLimitKey(request);

  if (isRateLimited(key)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Validation error", issues: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website) {
    // Honeypot triggered: return OK to avoid giving bot feedback.
    return NextResponse.json({ success: true });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Send error" }, { status: 500 });
  }
}
