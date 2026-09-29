import { NextResponse } from "next/server";

import { readAdminSession, unauthorized } from "@/lib/admin/session";
import { portfolioDocumentSchema, preparePortfolioDocument } from "@/lib/content/schema";
import { heroImageSrc, readPortfolioDocument, writePortfolioDocument } from "@/lib/content/store";

export async function GET() {
  if (!(await readAdminSession())) {
    return unauthorized();
  }

  const document = await readPortfolioDocument();
  const heroSrc = await heroImageSrc(document);
  return NextResponse.json({ document, heroSrc });
}

export async function PUT(request: Request) {
  if (!(await readAdminSession())) {
    return unauthorized();
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = portfolioDocumentSchema.safeParse(preparePortfolioDocument(body));
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos: hay texto vacío o un enlace inválido." }, { status: 400 });
  }

  const current = await readPortfolioDocument();
  const document = await writePortfolioDocument({
    ...parsed.data,
    heroImageFile: current.heroImageFile,
  });
  const heroSrc = await heroImageSrc(document);
  return NextResponse.json({ document, heroSrc });
}
