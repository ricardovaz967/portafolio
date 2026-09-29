import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-slate-100">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-slate-300">The page you are looking for does not exist.</p>
      <Link className="text-blue-400 underline" href="/es">
        Back to portfolio
      </Link>
    </main>
  );
}
