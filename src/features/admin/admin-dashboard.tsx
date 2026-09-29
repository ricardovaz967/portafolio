"use client";

import { useState } from "react";

import { ContentEditor } from "@/features/admin/content-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PortfolioDocument } from "@/types/portfolio";

type Phase = "loading" | "login" | "editor" | "error";

interface ContentPayload {
  document: PortfolioDocument;
  heroSrc: string;
}

interface AdminDashboardProps {
  initialPhase: "login" | "editor";
  initialDocument?: PortfolioDocument;
  initialHeroSrc?: string;
}

export function AdminDashboard({ initialPhase, initialDocument, initialHeroSrc }: AdminDashboardProps) {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<ContentPayload | null>(
    initialDocument && initialHeroSrc ? { document: initialDocument, heroSrc: initialHeroSrc } : null,
  );
  const [submitting, setSubmitting] = useState(false);

  async function loadContent() {
    const response = await fetch("/api/admin/content");
    if (response.status === 401) {
      setPhase("login");
      return;
    }
    if (!response.ok) {
      setPhase("error");
      return;
    }
    const data = (await response.json()) as ContentPayload;
    setPayload(data);
    setPhase("editor");
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setError(data?.error ?? "No fue posible entrar.");
        return;
      }
      setPassword("");
      await loadContent();
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        Cargando panel…
      </main>
    );
  }

  if (phase === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-300">
        No se pudo leer el contenido guardado.
      </main>
    );
  }

  if (phase === "login" || !payload) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-50">Panel del portafolio</h1>
            <p className="mt-2 text-sm text-slate-400">
              Desde aquí cambias textos y la foto del inicio. El sitio se actualiza sin tocar el repositorio.
            </p>
          </div>
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Entrando…" : "Entrar"}
          </Button>
        </form>
      </main>
    );
  }

  return <ContentEditor initialDocument={payload.document} initialHeroSrc={payload.heroSrc} />;
}
