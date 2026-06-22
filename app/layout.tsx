import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03373a",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://tealregistry.com"),
  title: {
    default: "Teal Registry | Independent Certification for Regenerative Organizations",
    template: "%s | Teal Registry",
  },
  description:
    "The independent certification authority for teal-aligned regenerative businesses, intentional communities, training providers, and co-creators. Verify badges, explore the directory, and begin your certification journey.",
  keywords: [
    "teal certification", "regenerative business certification", "teal organization",
    "intentional community certification", "teal verified", "regenerative certification",
    "teal registry", "organizational certification", "teal management",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tealregistry.com",
    siteName: "Teal Registry",
    title: "Teal Registry | Independent Certification for Regenerative Organizations",
    description: "The independent certification authority for teal-aligned regenerative businesses, intentional communities, training providers, and co-creators.",
    images: [{ url: "/assets/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teal Registry",
    description: "Independent certification for regenerative organizations.",
    images: ["/assets/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
