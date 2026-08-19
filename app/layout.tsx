import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Teal Registry | Public Directory for Teal, Regenerative, and Self-Organizing Organizations",
    template: "%s | Teal Registry",
  },
  description:
    "Search Teal Registry for public profiles, case studies, verification records, standards, sociocracy examples, self-managing organizations, ecovillages, regenerative businesses, and intentional communities.",
  keywords: [
    "Teal Registry",
    "teal organizations",
    "self organizing organizations",
    "self managing organizations",
    "sociocracy ecovillage",
    "regenerative business directory",
    "intentional community directory",
    "teal certification",
    "badge verification",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Teal Registry",
    title: "Teal Registry | Directory, Case Studies, and Verification for Teal Claims",
    description:
      "Public directory and proof library for Teal, regenerative, self-organizing, sociocratic, and intentional-community work.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Teal Registry",
        url: siteUrl,
        logo: `${siteUrl}/assets/tealregistry-lockup.png`,
        description:
          "Teal Registry publishes public directory profiles, verification records, case studies, and standards for Teal, regenerative, self-organizing, and intentional-community work.",
        knowsAbout: [
          "Teal organizations",
          "self-organization",
          "sociocracy",
          "self-management",
          "regenerative organizations",
          "intentional communities",
          "ecovillages",
          "credential verification",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Teal Registry",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/registry?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
