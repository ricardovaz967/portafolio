"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminCVPage() {
  const [phase, setPhase] = useState<"login" | "upload" | "success">("login");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Load saved image on mount
  useEffect(() => {
    const checkSaved = async () => {
      try {
        const res = await fetch("/api/cv/status");
        const contentType = res.headers.get("content-type") ?? "";
        if (!res.ok || !contentType.includes("application/json")) {
          return;
        }
        const data: unknown = await res.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "path" in data &&
          typeof data.path === "string" &&
          data.path
        ) {
          setImageUrl(data.path);
          setPhase("success");
        }
      } catch {
        // No saved image yet
      }
    };
    checkSaved();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setPhase("upload");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setImageUrl(result.path);
        setError(null);
        setPhase("success");
      } else {
        setError(result.error || "Error al subir la imagen");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setUploading(false);
    }
  };

  if (phase === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-8">
        <div className="bg-slate-800 rounded-2xl p-12 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">Panel de Administración</h2>
          <p className="text-slate-400 text-sm mb-8">Ingresa la contraseña para modificar el CV</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white w-full"
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  if (phase === "upload") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-8">
        <div className="bg-slate-800 rounded-2xl p-12 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">Subir Nueva Imagen de CV</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          {imageUrl && (
            <div className="mb-6">
              <p className="text-slate-300 text-sm mb-2">Vista previa:</p>
              <img
                src={imageUrl}
                alt="CV Image preview"
                className="border rounded w-48 h-64 object-cover"
              />
            </div>
          )}
          
<form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleUpload}
              className="hidden"
            />
            <Button type="submit" disabled={uploading}>
              {uploading ? "Subiendo..." : "Subir imagen de CV"}
            </Button>
          </form>
          
          <p className="mt-6 text-slate-400 text-sm">
            <a href="/cv/ricardo-vazquez-dominguez-resume.pdf" target="_blank">
              Ver CV actual
            </a>
          </p>
          
          <Button
            onClick={() => router.push("/")}
            className="mt-4 w-full"
          >
            Volver al portal
          </Button>
        </div>
      </div>
    );
  }

  return null;
}