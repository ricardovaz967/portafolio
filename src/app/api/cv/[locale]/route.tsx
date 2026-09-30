import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";

import { getPortfolioContent } from "@/content";
import { locales } from "@/i18n/config";
import { ResumeDocument } from "@/lib/cv/resume-document";
import { loadResumePhoto } from "@/lib/content/store";
import type { Locale } from "@/types/portfolio";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ locale: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return NextResponse.json({ error: "Idioma no disponible" }, { status: 404 });
  }

  let pdf: Buffer;
  try {
    const content = await getPortfolioContent(locale as Locale);
    const photo = await loadResumePhoto();
    pdf = await renderToBuffer(<ResumeDocument content={content} photo={photo} locale={locale as Locale} />);
  } catch (error) {
    console.error("CV PDF failed", error);
    return NextResponse.json({ error: "No se pudo generar el CV" }, { status: 500 });
  }
  const filename = `ricardo-vazquez-dominguez-${locale}.pdf`;

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
