import { AdminDashboard } from "@/features/admin/admin-dashboard";
import { readAdminSession } from "@/lib/admin/session";
import { heroImageSrc, readPortfolioDocument } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await readAdminSession();
  if (!authenticated) {
    return <AdminDashboard initialPhase="login" />;
  }

  const document = await readPortfolioDocument();
  const heroSrc = await heroImageSrc(document);
  return (
    <AdminDashboard initialPhase="editor" initialDocument={document} initialHeroSrc={heroSrc} />
  );
}
