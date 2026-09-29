import { NextResponse } from "next/server";

import { readAdminSession, unauthorized } from "@/lib/admin/session";
import { clearHeroImage, detectHeroExtension, heroImageSrc, saveHeroImage } from "@/lib/content/store";

const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await readAdminSession())) {
    return unauthorized();
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Selecciona una imagen." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "La imagen debe pesar menos de 5 MB." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = detectHeroExtension(bytes);
  if (!extension) {
    return NextResponse.json({ error: "Usa una imagen JPG, PNG o WebP." }, { status: 400 });
  }

  const document = await saveHeroImage(bytes, extension);
  const heroSrc = await heroImageSrc(document);
  return NextResponse.json({ document, heroSrc });
}

export async function DELETE() {
  if (!(await readAdminSession())) {
    return unauthorized();
  }

  const document = await clearHeroImage();
  const heroSrc = await heroImageSrc(document);
  return NextResponse.json({ document, heroSrc });
}
