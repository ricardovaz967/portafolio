import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to public/tmp
  const tmpDir = path.join(process.cwd(), "public", "tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const ext = file.name.split(".").pop() || "pdf";
  const filename = `cv-${Date.now()}.${ext}`;
  const filePath = path.join(tmpDir, filename);

  fs.writeFileSync(filePath, buffer);

  const relativePath = `/tmp/${filename}`;
  return NextResponse.json({ success: true, path: relativePath });
}