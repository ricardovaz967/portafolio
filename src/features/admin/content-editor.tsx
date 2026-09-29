"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SectionId, ThemeId } from "@/lib/content/layout";
import type {
  ArchitectureContent,
  EducationItem,
  ExperienceItem,
  Locale,
  PortfolioContent,
  PortfolioDocument,
  ProjectItem,
  StackGroup,
} from "@/types/portfolio";

interface ContentEditorProps {
  initialDocument: PortfolioDocument;
  initialHeroSrc: string;
}

interface ContentPayload {
  document: PortfolioDocument;
  heroSrc: string;
  error?: string;
}

export function ContentEditor({ initialDocument, initialHeroSrc }: ContentEditorProps) {
  const [document, setDocument] = useState(initialDocument);
  const [heroSrc, setHeroSrc] = useState(initialHeroSrc);
  const [locale, setLocale] = useState<Locale>("es");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const documentRef = useRef(document);
  const themeRequest = useRef(0);
  documentRef.current = document;

  useEffect(() => {
    const root = window.document.documentElement;
    root.dataset.theme = document.layout.theme;
    return () => {
      delete root.dataset.theme;
    };
  }, [document.layout.theme]);

  const content = document[locale];

  function update(recipe: (current: PortfolioContent) => PortfolioContent) {
    setDocument((current) => ({
      ...current,
      [locale]: recipe(current[locale]),
    }));
  }

  async function selectTheme(themeId: ThemeId) {
    const requestId = ++themeRequest.current;
    const next = {
      ...documentRef.current,
      layout: { ...documentRef.current.layout, theme: themeId },
    };
    documentRef.current = next;
    setDocument(next);
    setSaving(true);
    setError(null);
    setStatus(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = (await response.json().catch(() => null)) as ContentPayload | null;
      if (requestId !== themeRequest.current) {
        return;
      }
      if (!response.ok || !data?.document) {
        setError(data?.error ?? "No se pudo aplicar el tema.");
        return;
      }
      setHeroSrc(data.heroSrc);
      setStatus("Tema aplicado en el panel y en el sitio.");
    } finally {
      if (requestId === themeRequest.current) {
        setSaving(false);
      }
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setStatus(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });
      const data = (await response.json().catch(() => null)) as ContentPayload | null;
      if (!response.ok || !data?.document) {
        setError(data?.error ?? "No se pudo guardar.");
        return;
      }
      setDocument(data.document);
      setHeroSrc(data.heroSrc);
      setStatus("Guardado. El sitio ya muestra estos cambios.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadHero(file: File | undefined) {
    if (!file) {
      return;
    }
    setUploading(true);
    setError(null);
    setStatus(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/hero", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as ContentPayload | null;
      if (!response.ok || !data?.heroSrc) {
        setError(data?.error ?? "No se pudo subir la imagen.");
        return;
      }
      setHeroSrc(data.heroSrc);
      setStatus("Foto actualizada en el inicio.");
    } finally {
      setUploading(false);
    }
  }

  async function resetHero() {
    setUploading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/hero", { method: "DELETE" });
      const data = (await response.json().catch(() => null)) as ContentPayload | null;
      if (!response.ok || !data?.heroSrc) {
        setError(data?.error ?? "No se pudo restaurar la imagen.");
        return;
      }
      setHeroSrc(data.heroSrc);
      setStatus("Volviste a la imagen predeterminada.");
    } finally {
      setUploading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <main data-theme={document.layout.theme} className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 md:px-8">
      <form onSubmit={save} className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Editar portafolio</h1>
            <p className="mt-1 text-sm text-slate-400">Los cambios se guardan en el servidor, fuera del repositorio.</p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => window.open("/es", "_blank")}>
              Ver sitio
            </Button>
            <Button type="button" variant="ghost" onClick={() => void logout()}>
              Salir
            </Button>
          </div>
        </header>

        <Section title="Vistas, orden y tema">
          <p className="text-sm text-slate-400">
            El tema se aplica al momento en este panel y en el sitio. El orden y la visibilidad se publican al guardar.
          </p>
          <div className="grid gap-3 sm:grid-cols-5">
            {themeChoices.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => void selectTheme(theme.id)}
                className={`rounded-xl border p-3 text-left ${
                  document.layout.theme === theme.id ? "border-blue-400 ring-2 ring-blue-400" : "border-slate-700"
                }`}
              >
                <span className="mb-2 flex h-8 overflow-hidden rounded-md" style={{ backgroundColor: theme.swatch }}>
                  <span className="mt-auto h-2 w-full" style={{ backgroundColor: theme.accent }} />
                </span>
                <span className="text-sm font-medium">{theme.name}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={document.layout.heroImageSide === "left" ? "default" : "outline"}
              onClick={() =>
                setDocument((current) => ({ ...current, layout: { ...current.layout, heroImageSide: "left" } }))
              }
            >
              Foto a la izquierda
            </Button>
            <Button
              type="button"
              variant={document.layout.heroImageSide === "right" ? "default" : "outline"}
              onClick={() =>
                setDocument((current) => ({ ...current, layout: { ...current.layout, heroImageSide: "right" } }))
              }
            >
              Foto a la derecha
            </Button>
          </div>
          <ol className="space-y-2">
            {document.layout.sections.map((section, index) => (
              <li
                key={section.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 px-3 py-2"
              >
                <label className="flex items-center gap-3 text-sm text-slate-100">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    onChange={(event) =>
                      setDocument((current) => ({
                        ...current,
                        layout: {
                          ...current.layout,
                          sections: current.layout.sections.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, visible: event.target.checked } : item,
                          ),
                        },
                      }))
                    }
                  />
                  {sectionLabels[section.id]}
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={index === 0}
                    onClick={() => moveSection(setDocument, index, index - 1)}
                  >
                    Subir
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={index === document.layout.sections.length - 1}
                    onClick={() => moveSection(setDocument, index, index + 1)}
                  >
                    Bajar
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold">Imagen del hero</h2>
          <p className="mt-1 text-sm text-slate-400">
            Esta foto aparece junto a tu nombre. JPG, PNG o WebP, máximo 5 MB.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
            <img src={heroSrc} alt={content.hero.imageAlt} className="h-48 w-36 rounded-2xl object-cover" />
            <div className="flex flex-col gap-3">
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={uploading}
                onChange={(event) => void uploadHero(event.target.files?.[0])}
              />
              <Button type="button" variant="outline" disabled={uploading} onClick={() => void resetHero()}>
                {uploading ? "Actualizando…" : "Usar imagen predeterminada"}
              </Button>
            </div>
          </div>
        </section>

        <div className="flex gap-2">
          {(["es", "en"] as const).map((option) => (
            <Button
              key={option}
              type="button"
              variant={locale === option ? "default" : "outline"}
              onClick={() => setLocale(option)}
            >
              {option === "es" ? "Español" : "English"}
            </Button>
          ))}
        </div>

        <Section title="Inicio">
          <Field label="Etiqueta" value={content.hero.badge} onChange={(badge) => update((current) => ({ ...current, hero: { ...current.hero, badge } }))} />
          <Field label="Nombre" value={content.hero.name} onChange={(name) => update((current) => ({ ...current, hero: { ...current.hero, name } }))} />
          <Field label="Rol" value={content.hero.role} onChange={(role) => update((current) => ({ ...current, hero: { ...current.hero, role } }))} />
          <Area label="Descripción" value={content.hero.tagline} onChange={(tagline) => update((current) => ({ ...current, hero: { ...current.hero, tagline } }))} />
          <Field label="Texto alternativo de la foto" value={content.hero.imageAlt} onChange={(imageAlt) => update((current) => ({ ...current, hero: { ...current.hero, imageAlt } }))} />
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Botón experiencia" value={content.hero.cta.experience} onChange={(experience) => update((current) => ({ ...current, hero: { ...current.hero, cta: { ...current.hero.cta, experience } } }))} />
            <Field label="Botón CV" value={content.hero.cta.cv} onChange={(cv) => update((current) => ({ ...current, hero: { ...current.hero, cta: { ...current.hero.cta, cv } } }))} />
            <Field label="Botón contacto" value={content.hero.cta.contact} onChange={(contact) => update((current) => ({ ...current, hero: { ...current.hero, cta: { ...current.hero.cta, contact } } }))} />
          </div>
        </Section>

        <Section title="Perfil">
          <Field label="Título" value={content.about.title} onChange={(title) => update((current) => ({ ...current, about: { ...current.about, title } }))} />
          <Area label="Introducción" value={content.about.intro} onChange={(intro) => update((current) => ({ ...current, about: { ...current.about, intro } }))} />
          <Area label="Seguridad" value={content.about.securityLearning} onChange={(securityLearning) => update((current) => ({ ...current, about: { ...current.about, securityLearning } }))} />
          <Field label="Título de fortalezas" value={content.about.strengthsTitle} onChange={(strengthsTitle) => update((current) => ({ ...current, about: { ...current.about, strengthsTitle } }))} />
          <Lines label="Fortalezas" hint="Una por línea" value={content.about.strengths} onChange={(strengths) => update((current) => ({ ...current, about: { ...current.about, strengths } }))} />
          <Field label="Título de idiomas" value={content.about.languagesTitle} onChange={(languagesTitle) => update((current) => ({ ...current, about: { ...current.about, languagesTitle } }))} />
          <Lines label="Idiomas" hint="Uno por línea" value={content.about.languages} onChange={(languages) => update((current) => ({ ...current, about: { ...current.about, languages } }))} />
        </Section>

        <Section title="Proyectos">
          <Field label="Título" value={content.projects.title} onChange={(title) => update((current) => ({ ...current, projects: { ...current.projects, title } }))} />
          <Area label="Descripción" value={content.projects.description} onChange={(description) => update((current) => ({ ...current, projects: { ...current.projects, description } }))} />
          {content.projects.items.map((item, index) => (
            <article key={`project-${index}`} className="space-y-3 rounded-xl border border-slate-800 p-4">
              <Field label="Nombre" value={item.title} onChange={(title) => updateProject(update, index, { title })} />
              <Area label="Descripción" value={item.description} onChange={(description) => updateProject(update, index, { description })} />
              <Lines label="Tecnologías" hint="Una por línea" value={item.technologies} onChange={(technologies) => updateProject(update, index, { technologies })} />
              <Field label="URL del repositorio" value={item.repositoryUrl} onChange={(repositoryUrl) => updateProject(update, index, { repositoryUrl })} />
              <Field label="Texto del enlace" value={item.repositoryLabel} onChange={(repositoryLabel) => updateProject(update, index, { repositoryLabel })} />
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" disabled={index === 0} onClick={() => moveProjects(update, index, index - 1)}>
                  Subir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={index === content.projects.items.length - 1}
                  onClick={() => moveProjects(update, index, index + 1)}
                >
                  Bajar
                </Button>
                <Button type="button" variant="ghost" onClick={() => removeAt(update, "projects", index)}>
                  Quitar proyecto
                </Button>
              </div>
            </article>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update((current) => ({
                ...current,
                projects: {
                  ...current.projects,
                  items: [
                    ...current.projects.items,
                    {
                      title: "Nuevo proyecto",
                      description: "Descripción del proyecto.",
                      technologies: ["Java"],
                      repositoryUrl: "https://github.com/ricardovaz967",
                      repositoryLabel: "Ver repositorio",
                    },
                  ],
                },
              }))
            }
          >
            Agregar proyecto
          </Button>
        </Section>

        <Section title="Experiencia">
          {content.experience.map((item, index) => (
            <article key={`job-${index}`} className="space-y-3 rounded-xl border border-slate-800 p-4">
              <Field label="Periodo" value={item.period} onChange={(period) => updateExperience(update, index, { period })} />
              <Field label="Puesto" value={item.title} onChange={(title) => updateExperience(update, index, { title })} />
              <Field label="Empresa" value={item.company} onChange={(company) => updateExperience(update, index, { company })} />
              <Lines label="Responsabilidades" hint="Una por línea" value={item.responsibilities} onChange={(responsibilities) => updateExperience(update, index, { responsibilities })} />
              <Lines label="Tecnologías" hint="Una por línea" value={item.technologies} onChange={(technologies) => updateExperience(update, index, { technologies })} />
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" disabled={index === 0} onClick={() => moveExperience(update, index, index - 1)}>
                  Subir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={index === content.experience.length - 1}
                  onClick={() => moveExperience(update, index, index + 1)}
                >
                  Bajar
                </Button>
                <Button type="button" variant="ghost" onClick={() => removeExperience(update, index)}>
                  Quitar experiencia
                </Button>
              </div>
            </article>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update((current) => ({
                ...current,
                experience: [
                  ...current.experience,
                  {
                    period: "2026",
                    title: "Nuevo puesto",
                    company: "Empresa",
                    responsibilities: ["Describe el trabajo realizado."],
                    technologies: ["Java"],
                  },
                ],
              }))
            }
          >
            Agregar experiencia
          </Button>
        </Section>

        <Section title="Educación">
          {content.education.map((item, index) => (
            <article key={`edu-${index}`} className="space-y-3 rounded-xl border border-slate-800 p-4">
              <Field label="Título" value={item.title} onChange={(title) => updateEducation(update, index, { title })} />
              <Field label="Institución" value={item.institution ?? ""} onChange={(institution) => updateEducation(update, index, { institution })} />
              <Field label="Periodo" value={item.period ?? ""} onChange={(period) => updateEducation(update, index, { period })} />
              <Field label="Estado" value={item.status ?? ""} onChange={(status) => updateEducation(update, index, { status })} />
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" disabled={index === 0} onClick={() => moveEducation(update, index, index - 1)}>
                  Subir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={index === content.education.length - 1}
                  onClick={() => moveEducation(update, index, index + 1)}
                >
                  Bajar
                </Button>
                <Button type="button" variant="ghost" onClick={() => removeEducation(update, index)}>
                  Quitar
                </Button>
              </div>
            </article>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update((current) => ({
                ...current,
                education: [...current.education, { title: "Nueva formación" }],
              }))
            }
          >
            Agregar formación
          </Button>
        </Section>

        <Section title="Stack">
          {content.stack.map((group, index) => (
            <article key={`stack-${index}`} className="space-y-3 rounded-xl border border-slate-800 p-4">
              <Field label="Categoría" value={group.category} onChange={(category) => updateStack(update, index, { category })} />
              <Lines label="Tecnologías" hint="Una por línea" value={group.items} onChange={(items) => updateStack(update, index, { items })} />
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" disabled={index === 0} onClick={() => moveStack(update, index, index - 1)}>
                  Subir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={index === content.stack.length - 1}
                  onClick={() => moveStack(update, index, index + 1)}
                >
                  Bajar
                </Button>
                <Button type="button" variant="ghost" onClick={() => removeStack(update, index)}>
                  Quitar categoría
                </Button>
              </div>
            </article>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update((current) => ({
                ...current,
                stack: [...current.stack, { category: "Nueva categoría", items: ["Java"] }],
              }))
            }
          >
            Agregar categoría
          </Button>
        </Section>

        <Section title="Arquitectura">
          <Field label="Título" value={content.architecture.title} onChange={(title) => updateArchitecture(update, { title })} />
          <Area label="Descripción" value={content.architecture.description} onChange={(description) => updateArchitecture(update, { description })} />
          <Area label="Diagrama Mermaid" value={content.architecture.diagram} onChange={(diagram) => updateArchitecture(update, { diagram })} />
          <Field label="Título de decisiones" value={content.architecture.decisionsTitle} onChange={(decisionsTitle) => updateArchitecture(update, { decisionsTitle })} />
          {content.architecture.decisions.map((decision, index) => (
            <article key={`decision-${index}`} className="space-y-3 rounded-xl border border-slate-800 p-4">
              <Field label="Decisión" value={decision.title} onChange={(title) => updateDecision(update, index, title, decision.description)} />
              <Area label="Detalle" value={decision.description} onChange={(description) => updateDecision(update, index, decision.title, description)} />
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" disabled={index === 0} onClick={() => moveDecision(update, index, index - 1)}>
                  Subir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={index === content.architecture.decisions.length - 1}
                  onClick={() => moveDecision(update, index, index + 1)}
                >
                  Bajar
                </Button>
                <Button type="button" variant="ghost" onClick={() => removeDecision(update, index)}>
                  Quitar decisión
                </Button>
              </div>
            </article>
          ))}
        </Section>

        <Section title="Contacto">
          <Field label="Título" value={content.contact.title} onChange={(title) => update((current) => ({ ...current, contact: { ...current.contact, title } }))} />
          <Field label="Subtítulo" value={content.contact.subtitle} onChange={(subtitle) => update((current) => ({ ...current, contact: { ...current.contact, subtitle } }))} />
          <Field label="Correo" value={content.contact.email} onChange={(email) => update((current) => ({ ...current, contact: { ...current.contact, email } }))} />
          <Field label="Teléfono" value={content.contact.phone} onChange={(phone) => update((current) => ({ ...current, contact: { ...current.contact, phone } }))} />
          <Field label="Ubicación" value={content.contact.location} onChange={(location) => update((current) => ({ ...current, contact: { ...current.contact, location } }))} />
          <Field label="LinkedIn (usuario)" value={content.contact.linkedinHandle} onChange={(linkedinHandle) => update((current) => ({ ...current, contact: { ...current.contact, linkedinHandle } }))} />
          <Field label="GitHub (usuario)" value={content.contact.githubHandle} onChange={(githubHandle) => update((current) => ({ ...current, contact: { ...current.contact, githubHandle } }))} />
          <Field label="Botón de envío" value={content.contact.submitLabel} onChange={(submitLabel) => update((current) => ({ ...current, contact: { ...current.contact, submitLabel } }))} />
          <Field label="Mensaje de éxito" value={content.contact.successMessage} onChange={(successMessage) => update((current) => ({ ...current, contact: { ...current.contact, successMessage } }))} />
          <Field label="Mensaje de error" value={content.contact.errorMessage} onChange={(errorMessage) => update((current) => ({ ...current, contact: { ...current.contact, errorMessage } }))} />
        </Section>

        <Section title="SEO">
          <Field label="Título" value={content.seo.title} onChange={(title) => update((current) => ({ ...current, seo: { ...current.seo, title } }))} />
          <Area label="Descripción" value={content.seo.description} onChange={(description) => update((current) => ({ ...current, seo: { ...current.seo, description } }))} />
          <Lines label="Palabras clave" hint="Una por línea" value={content.seo.keywords} onChange={(keywords) => update((current) => ({ ...current, seo: { ...current.seo, keywords } }))} />
        </Section>

        <Section title="Menú">
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                ["about", "Sobre mí"],
                ["projects", "Proyectos"],
                ["experience", "Experiencia"],
                ["education", "Educación"],
                ["stack", "Stack"],
                ["architecture", "Arquitectura"],
                ["contact", "Contacto"],
              ] as const
            ).map(([key, label]) => (
              <Field
                key={key}
                label={label}
                value={content.nav[key]}
                onChange={(value) => update((current) => ({ ...current, nav: { ...current.nav, [key]: value } }))}
              />
            ))}
          </div>
        </Section>

        <div className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-xl">
          <p className={error ? "text-sm text-red-400" : "text-sm text-slate-300"}>{error ?? status ?? "Los textos se publican al guardar."}</p>
          <Button type="submit" disabled={saving}>
            {saving ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </main>
  );
}

const sectionLabels: Record<SectionId, string> = {
  hero: "Inicio",
  about: "Perfil",
  projects: "Proyectos",
  experience: "Experiencia",
  education: "Educación",
  stack: "Stack",
  architecture: "Arquitectura",
  contact: "Contacto",
};

const themeChoices = [
  { id: "midnight", name: "Medianoche", swatch: "#020617", accent: "#3b82f6" },
  { id: "ocean", name: "Océano", swatch: "#04141c", accent: "#22d3ee" },
  { id: "forest", name: "Bosque", swatch: "#07140f", accent: "#4ade80" },
  { id: "copper", name: "Cobre", swatch: "#1c1410", accent: "#f97316" },
  { id: "light", name: "Claro", swatch: "#f8fafc", accent: "#2563eb" },
] as const;

function moveList<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length || from === to) {
    return items;
  }
  const next = [...items];
  const [item] = next.splice(from, 1);
  if (item === undefined) {
    return items;
  }
  next.splice(to, 0, item);
  return next;
}

function moveSection(setDocument: Dispatch<SetStateAction<PortfolioDocument>>, from: number, to: number) {
  setDocument((current) => ({
    ...current,
    layout: {
      ...current.layout,
      sections: moveList(current.layout.sections, from, to),
    },
  }));
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-slate-300">{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-slate-300">{label}</span>
      <Textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Lines({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-slate-300">{label}</span>
      <Textarea className="min-h-24" value={value.join("\n")} onChange={(event) => onChange(event.target.value.split("\n"))} />
      <span className="text-xs text-slate-500">{hint}</span>
    </label>
  );
}

type Update = (recipe: (current: PortfolioContent) => PortfolioContent) => void;

function updateProject(update: Update, index: number, patch: Partial<ProjectItem>) {
  update((current) => ({
    ...current,
    projects: {
      ...current.projects,
      items: current.projects.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
    },
  }));
}

function removeAt(update: Update, _section: "projects", index: number) {
  update((current) => ({
    ...current,
    projects: {
      ...current.projects,
      items: current.projects.items.filter((_, itemIndex) => itemIndex !== index),
    },
  }));
}

function moveProjects(update: Update, from: number, to: number) {
  update((current) => ({
    ...current,
    projects: { ...current.projects, items: moveList(current.projects.items, from, to) },
  }));
}

function updateExperience(update: Update, index: number, patch: Partial<ExperienceItem>) {
  update((current) => ({
    ...current,
    experience: current.experience.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
  }));
}

function moveExperience(update: Update, from: number, to: number) {
  update((current) => ({
    ...current,
    experience: moveList(current.experience, from, to),
  }));
}

function removeExperience(update: Update, index: number) {
  update((current) => ({
    ...current,
    experience: current.experience.filter((_, itemIndex) => itemIndex !== index),
  }));
}

function updateEducation(update: Update, index: number, patch: Partial<EducationItem>) {
  update((current) => ({
    ...current,
    education: current.education.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
  }));
}

function moveEducation(update: Update, from: number, to: number) {
  update((current) => ({
    ...current,
    education: moveList(current.education, from, to),
  }));
}

function removeEducation(update: Update, index: number) {
  update((current) => ({
    ...current,
    education: current.education.filter((_, itemIndex) => itemIndex !== index),
  }));
}

function updateStack(update: Update, index: number, patch: Partial<StackGroup>) {
  update((current) => ({
    ...current,
    stack: current.stack.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
  }));
}

function moveStack(update: Update, from: number, to: number) {
  update((current) => ({
    ...current,
    stack: moveList(current.stack, from, to),
  }));
}

function removeStack(update: Update, index: number) {
  update((current) => ({
    ...current,
    stack: current.stack.filter((_, itemIndex) => itemIndex !== index),
  }));
}

function updateArchitecture(update: Update, patch: Partial<ArchitectureContent>) {
  update((current) => ({
    ...current,
    architecture: { ...current.architecture, ...patch },
  }));
}

function updateDecision(update: Update, index: number, title: string, description: string) {
  update((current) => ({
    ...current,
    architecture: {
      ...current.architecture,
      decisions: current.architecture.decisions.map((item, itemIndex) =>
        itemIndex === index ? { title, description } : item,
      ),
    },
  }));
}

function moveDecision(update: Update, from: number, to: number) {
  update((current) => ({
    ...current,
    architecture: {
      ...current.architecture,
      decisions: moveList(current.architecture.decisions, from, to),
    },
  }));
}

function removeDecision(update: Update, index: number) {
  update((current) => ({
    ...current,
    architecture: {
      ...current.architecture,
      decisions: current.architecture.decisions.filter((_, itemIndex) => itemIndex !== index),
    },
  }));
}
