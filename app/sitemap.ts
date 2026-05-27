import type { MetadataRoute } from "next";
import { directoryRecords } from "@/data/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://tealregistry.com";
  const now = new Date();
  const staticRoutes = ["", "/registry", "/credentials", "/standards", "/apply", "/report-misuse"];
  const registryRoutes = directoryRecords.map((record) => `/registry/${record.slug}`);
  const verifyRoutes = directoryRecords
    .filter((record) => !["Pending", "Not applicable"].includes(record.badgeId))
    .map((record) => `/verify/${encodeURIComponent(record.badgeId)}`);

  return [...staticRoutes, ...registryRoutes, ...verifyRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/registry/") ? "weekly" : "monthly",
    priority: route.startsWith("/registry/") ? 0.9 : 0.7,
  }));
}
