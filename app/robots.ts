import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/registry", "/credentials", "/standards", "/apply", "/report-misuse"],
      disallow: ["/admin", "/dashboard", "/login"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
