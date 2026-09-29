import { initializeSentry } from "@/lib/sentry/config";

export async function register() {
  initializeSentry();
}
