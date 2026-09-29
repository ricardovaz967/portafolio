import { NextResponse } from "next/server";

import { readHeroImageFile } from "@/lib/content/store";

export async function GET() {
  const image = await readHeroImageFile();
  if (!image) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(new Uint8Array(image.bytes), {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
