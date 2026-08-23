import type { MetadataRoute } from "next";
import { audiencePages, glossaryEntries } from "@/data/education";
import { caseStudies } from "@/data/case-studies";
import { getDirectoryRecords, isOfficialBadgeId } from "@/lib/registry-records";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/registry",
    "/case-studies",
    "/credentials",
    "/standards",
    "/standards/verification",
    "/standards/renewal",
    "/standards/independence",
    "/verify",
    "/apply",
    "/report-misuse",
  ];
  const directoryRecords = await getDirectoryRecords();
  const registryRoutes = directoryRecords.map((record) => `/registry/${record.slug}`);
  const caseStudyRoutes = caseStudies.map((study) => `/case-studies/${study.slug}`);
  const audienceRoutes = audiencePages.map((audience) => `/audiences/${audience.slug}`);
  const glossaryRoutes = glossaryEntries.map((entry) => `/glossary/${entry.slug}`);
  const verifyRoutes = directoryRecords
    .filter((record) => isOfficialBadgeId(record.badgeId))
    .map((record) => `/verify/${encodeURIComponent(record.badgeId)}`);

  return [...staticRoutes, ...registryRoutes, ...caseStudyRoutes, ...audienceRoutes, ...glossaryRoutes, ...verifyRoutes].map((route) => {
    const isRegistryProfile = route.startsWith("/registry/");
    const isCaseStudy = route.startsWith("/case-studies/");
    const isPublicHub = route === "/registry" || route === "/case-studies" || route === "/verify";

    return {
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: isRegistryProfile || isCaseStudy ? "weekly" : "monthly",
      priority: isRegistryProfile ? 0.95 : isCaseStudy ? 0.92 : isPublicHub ? 0.88 : 0.7,
    };
  });
}