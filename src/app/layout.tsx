import type { Metadata } from "next";

import { env } from "@/lib/config/env";
import { Analytics } from "@/lib/analytics/analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: "Ricardo Israel Vázquez Domínguez | Java Backend Developer",
  description:
    "Java Backend Developer experienced in enterprise applications, REST APIs, SQL, and Spring Boot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
