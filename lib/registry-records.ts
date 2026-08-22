import { directoryRecords, type DirectoryRecord } from "@/data/registry";
import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";

type PublicListingWithRelations = {
  title: string;
  publicSlug: string;
  status: string;
  listingType: string | null;
  tagline: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  targetAudiences: string[];
  highlights: string[];
  tealSignalMap: unknown;
  sourceNotes: string[];
  mediaPolicy: string | null;
  shortBlurb: string | null;
  organization: {
    name: string;
    country: string | null;
    sectors: string[];
    website: string | null;
    publicStatus: string | null;
    shortPublicDescription: string | null;
  } | null;
  verificationRecord: {
    title: string;
    scope: string;
    lastAuditDate: Date | null;
    validTo: Date | null;
    nextReviewWindow: string | null;
    publicNote: string | null;
    grantedLevel: {
      title: string;
      publicLabel: string;
    } | null;
    badgeLicenses: Array<{
      badgeId: string;
      status: string;
      issuedDate: Date | null;
      expiryDate: Date | null;
      badgeType: {
        artworkFile: string | null;
        publicClaim: string;
      } | null;
    }>;
  } | null;
  reviews: Array<{
    rating: number;
    published: boolean;
  }>;
};

function formatDate(value: Date | null | undefined, fallback: string) {
  return value
    ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(value)
    : fallback;
}

function safeSignals(value: unknown): DirectoryRecord["tealSignals"] {
  if (!Array.isArray(value)) {
    return [
      {
        title: "Evolutionary Purpose",
        summary: "The public profile needs source-backed evidence before this question can be answered.",
      },
      {
        title: "Self-Organization",
        summary: "Decision-making evidence needs review before this question can be answered.",
      },
      {
        title: "Wholeness",
        summary: "Culture and accountability evidence needs review before this question can be answered.",
      },
    ];
  }

  return value
    .filter((item): item is { title: string; summary: string } => {
      return (
        typeof item === "object" &&
        item !== null &&
        "title" in item &&
        "summary" in item &&
        typeof item.title === "string" &&
        typeof item.summary === "string"
      );
    })
    .slice(0, 3);
}

function badgeImageFromArtwork(artworkFile: string | null | undefined, isPublicResearch: boolean) {
  if (!artworkFile) {
    return isPublicResearch ? "/assets/tealregistry-mark.png" : "/assets/badges/teal-aligned.png";
  }

  if (artworkFile.startsWith("/")) {
    return artworkFile;
  }

  return `/assets/badges/${artworkFile}`;
}

export function isOfficialBadgeId(value: string) {
  return /^TR-[A-Z0-9]+-\d{4,}$/i.test(value);
}

function mapListingToRecord(listing: PublicListingWithRelations): DirectoryRecord {
  const organization = listing.organization;
  const verification = listing.verificationRecord;
  const badge = verification?.badgeLicenses[0];
  const listingType = (listing.listingType as DirectoryRecord["listingType"]) ?? "Public research profile";
  const isPublicResearch = !verification && listingType === "Public research profile";
  const displayName = organization?.name ?? listing.title;
  const databaseSummary =
    listing.shortBlurb ??
    organization?.shortPublicDescription ??
    "This profile is prepared as a public research listing until the organization claims or verifies it.";
  const publicResearchSummary = `${displayName} is a public research profile. This page does not claim the organization, provider, or framework is Teal. It records public context and asks what would need evidence before any Teal, regenerative, certification, accreditation, endorsement, or recognition claim could be trusted. ${databaseSummary}`;
  const publishedReviews = listing.reviews.filter((review) => review.published);
  const average =
    publishedReviews.length > 0
      ? Number(
          (
            publishedReviews.reduce((sum, review) => sum + review.rating, 0) / publishedReviews.length
          ).toFixed(1),
        )
      : null;

  const status =
    verification?.grantedLevel?.title ??
    organization?.publicStatus ??
    listing.status ??
    "Public research profile";

  return {
    name: displayName,
    slug: listing.publicSlug,
    entityType: "Organization",
    country: organization?.country ?? "Global",
    region: organization?.country ?? "Global",
    sector: organization?.sectors?.[0] ?? "Regenerative work",
    website: organization?.website ?? undefined,
    status,
    scope: verification?.scope ?? "Public research profile",
    lastReview: formatDate(verification?.lastAuditDate, "Not yet independently reviewed"),
    validTo:
      verification?.nextReviewWindow ??
      formatDate(verification?.validTo, "No renewal window published yet"),
    verificationId: verification?.title ?? listing.publicSlug,
    badgeId: badge?.badgeId ?? (isPublicResearch ? "No badge issued" : "Pending"),
    badgeImage: badgeImageFromArtwork(badge?.badgeType?.artworkFile, isPublicResearch),
    publicSummary:
      verification?.publicNote ??
      (isPublicResearch ? publicResearchSummary : databaseSummary),
    evidence: [
      listing.status,
      verification ? "Verification record linked" : "Public research profile",
      badge ? `Badge ${badge.status.toLowerCase()}` : "Badge not issued",
    ],
    tagline:
      isPublicResearch
        ? `${displayName}: public research profile, not a Teal Registry credential.`
        : listing.tagline ?? `A Teal Registry public profile for ${displayName}.`,
    listingType,
    audience: listing.targetAudiences.length > 0 ? listing.targetAudiences : ["Funders", "Partners", "Community members"],
    highlights:
      listing.highlights.length > 0
        ? listing.highlights
        : ["Public profile prepared for discovery", "Verification boundary shown clearly"],
    tealSignals: safeSignals(listing.tealSignalMap),
    sourceNotes: isPublicResearch
      ? [
          "This is a public research profile, not a Teal Registry credential, accreditation, endorsement, or recognized-framework decision.",
          ...listing.sourceNotes,
          "Public facts should be source-backed or owner-confirmed before stronger claims are published.",
        ]
      : listing.sourceNotes.length > 0
        ? listing.sourceNotes
        : ["Public facts should be source-backed or owner-confirmed before stronger claims are published."],
    sourceLinks: organization?.website
      ? [{ label: `${organization.name} official website`, href: organization.website }]
      : [],
    mediaPolicy:
      listing.mediaPolicy ??
      "Images are owner-provided, clearly licensed, or original Teal Registry graphics.",
    reviewSummary: {
      average,
      count: publishedReviews.length,
      note:
        publishedReviews.length > 0
          ? "Verified reviews are published for this listing."
          : "Verified user reviews are planned but not yet open for this listing.",
    },
    seo: {
      title: listing.seoTitle ?? `${displayName} Teal Registry profile`,
      description:
        listing.seoDescription ??
        listing.shortBlurb ??
        `Review the Teal Registry profile for ${displayName}.`,
      keywords:
        listing.seoKeywords.length > 0
          ? listing.seoKeywords
          : [displayName, "Teal Registry", "public research profile"],
    },
  };
}

async function fetchPublishedRecords() {
  const prisma = getPrisma();
  const listings = await prisma.publicDirectoryListing.findMany({
    where: {
      status: {
        not: "Draft",
      },
    },
    orderBy: [{ featured: "desc" }, { title: "asc" }],
    include: {
      organization: true,
      reviews: true,
      verificationRecord: {
        include: {
          grantedLevel: true,
          badgeLicenses: {
            include: {
              badgeType: true,
            },
          },
        },
      },
    },
  });

  return listings.map((listing) => mapListingToRecord(listing as PublicListingWithRelations));
}

export async function getDirectoryRecords() {
  if (!hasDatabaseUrl()) {
    return directoryRecords;
  }

  try {
    const records = await fetchPublishedRecords();
    if (records.length === 0) {
      return directoryRecords;
    }

    const recordBySlug = new Map<string, DirectoryRecord>();
    directoryRecords.forEach((record) => recordBySlug.set(record.slug, record));
    records.forEach((record) => recordBySlug.set(record.slug, record));

    return Array.from(recordBySlug.values());
  } catch (error) {
    console.warn("Falling back to static directory records.", error);
    return directoryRecords;
  }
}

export async function getDirectoryRecordBySlug(slug: string) {
  const records = await getDirectoryRecords();
  return records.find((record) => record.slug === slug);
}

export async function getDirectoryRecordByBadgeId(badgeId: string) {
  const decoded = decodeURIComponent(badgeId);
  if (!isOfficialBadgeId(decoded)) {
    return undefined;
  }

  const records = await getDirectoryRecords();
  return records.find((record) => record.badgeId === decoded);
}

