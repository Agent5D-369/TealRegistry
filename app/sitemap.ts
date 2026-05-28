import type { MetadataRoute } from "next";
import { audiencePages, glossaryEntries } from "@/data/education";
import { getDirectoryRecords } from "@/lib/registry-records";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://tealregistry.com";
  const now = new Date();
  const staticRoutes = ["", "/registry", "/credentials", "/standards", "/apply", "/report-misuse"];
  const directoryRecords = await getDirectoryRecords();
  const registryRoutes = directoryRecords.map((record) => `/registry/${record.slug}`);
  const audienceRoutes = audiencePages.map((audience) => `/audiences/${audience.slug}`);
  const glossaryRoutes = glossaryEntries.map((entry) => `/glossary/${entry.slug}`);
  const verifyRoutes = directoryRecords
    .filter((record) => !["Pending", "Not applicable"].includes(record.badgeId))
    .map((record) => `/verify/${encodeURIComponent(record.badgeId)}`);

  return [...staticRoutes, ...registryRoutes, ...audienceRoutes, ...glossaryRoutes, ...verifyRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/registry/") ? "weekly" : "monthly",
    priority: route.startsWith("/registry/") ? 0.9 : 0.7,
  }));
}
