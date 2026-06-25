import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";

const NOTION_VERSION = "2022-06-28";

const DEFAULT_DATABASES = {
  apply: "38a130aa-ffa3-8127-acc3-f3c8ce8d0f3b",
  entities: "38a130aa-ffa3-8184-a2d9-dee5912e4c66",
  reports: "38a130aa-ffa3-819b-84db-f97526d042a0",
  verificationRecords: "38a130aa-ffa3-816f-8ed4-e68db66d3290",
} as const;

type NotionProperty =
  | { title: Array<{ text: { content: string } }> }
  | { rich_text: Array<{ text: { content: string } }> }
  | { select: { name: string } | null }
  | { email: string | null }
  | { url: string | null }
  | { checkbox: boolean }
  | { date: { start: string } | null };

type NotionPage = {
  id: string;
  properties: Record<string, unknown>;
};

export type ApplyIntakeInput = {
  name: string;
  email: string;
  organization?: string;
  pathway: string;
  targetSlug?: string;
  message?: string;
};

export type ReportMisuseInput = {
  badgeId: string;
  claimUrl: string;
  description: string;
  evidence?: string;
  contact?: string;
};

function getDatabaseId(key: keyof typeof DEFAULT_DATABASES) {
  const envKey = `NOTION_TRIOS_${key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}_DATABASE_ID`;
  return process.env[envKey] ?? DEFAULT_DATABASES[key];
}

function getNotionToken() {
  return process.env.NOTION_TRIOS_TOKEN;
}

export function hasTriosNotionConfig() {
  return Boolean(getNotionToken());
}

function notionHeaders() {
  const token = getNotionToken();
  if (!token) {
    throw new Error("NOTION_TRIOS_TOKEN is not configured.");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

function title(value: string): NotionProperty {
  return { title: [{ text: { content: value.slice(0, 2000) } }] };
}

function richText(value: string | undefined): NotionProperty {
  return { rich_text: [{ text: { content: (value ?? "").slice(0, 2000) } }] };
}

function select(value: string): NotionProperty {
  return { select: { name: value } };
}

function email(value: string | undefined): NotionProperty {
  return { email: value || null };
}

function url(value: string | undefined): NotionProperty {
  return { url: value || null };
}

function checkbox(value: boolean): NotionProperty {
  return { checkbox: value };
}

function date(value = new Date()): NotionProperty {
  return { date: { start: value.toISOString().slice(0, 10) } };
}

async function notionPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`https://api.notion.com/v1${path}`, {
    method: "POST",
    headers: notionHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Notion API ${response.status}: ${detail}`);
  }

  return response.json() as Promise<T>;
}

function propertyText(page: NotionPage, name: string) {
  const property = page.properties[name] as
    | { title?: Array<{ plain_text?: string }>; rich_text?: Array<{ plain_text?: string }>; url?: string | null; select?: { name?: string } | null; checkbox?: boolean }
    | undefined;

  if (!property) return "";
  if (property.title) return property.title.map((item) => item.plain_text ?? "").join("");
  if (property.rich_text) return property.rich_text.map((item) => item.plain_text ?? "").join("");
  if (property.url) return property.url;
  if (property.select?.name) return property.select.name;
  if (typeof property.checkbox === "boolean") return property.checkbox ? "true" : "false";
  return "";
}

function propertyCheckbox(page: NotionPage, name: string) {
  const property = page.properties[name] as { checkbox?: boolean } | undefined;
  return Boolean(property?.checkbox);
}

export async function createApplyIntake(input: ApplyIntakeInput) {
  return notionPost<{ id: string; url: string }>("/pages", {
    parent: { database_id: getDatabaseId("apply") },
    properties: {
      Submission: title(`${input.organization || input.name} - ${input.pathway}`),
      SubmissionType: select(input.targetSlug ? "Claim listing" : "Apply"),
      Name: richText(input.name),
      Email: email(input.email),
      Organization: richText(input.organization),
      TargetSlug: richText(input.targetSlug),
      Pathway: select(input.pathway),
      Status: select("New"),
      SubmittedDate: date(),
      Notes: richText(input.message),
    },
  });
}

export async function createMisuseReport(input: ReportMisuseInput) {
  const summary = [
    input.description,
    input.evidence ? `Evidence: ${input.evidence}` : "",
    input.contact ? `Contact: ${input.contact}` : "Anonymous or no contact provided.",
  ]
    .filter(Boolean)
    .join("\n\n");

  return notionPost<{ id: string; url: string }>("/pages", {
    parent: { database_id: getDatabaseId("reports") },
    properties: {
      Report: title(`Report - ${input.badgeId}`),
      ReportID: richText(`TR-REPORT-${Date.now()}`),
      ClaimedEntity: richText(input.badgeId),
      RelatedVerificationID: richText(input.badgeId),
      ReportCategory: select("Badge misuse"),
      ReportStatus: select("New"),
      TriageLevel: select("B - fixable misuse"),
      SubmittedDate: date(),
      Owner: richText("Unassigned"),
      NextActionDate: date(),
      PublicSafeSummary: richText(input.description),
      InternalNotes: richText(`Claim URL: ${input.claimUrl}\n\n${summary}`),
    },
  });
}

export async function fetchPublishedVerificationRecords() {
  const response = await notionPost<{ results: NotionPage[] }>(
    `/databases/${getDatabaseId("verificationRecords")}/query`,
    {
      page_size: 100,
      filter: {
        property: "IsPublic",
        checkbox: {
          equals: true,
        },
      },
    },
  );

  return response.results.map((page) => ({
    id: page.id,
    title: propertyText(page, "Record"),
    verificationId: propertyText(page, "VerificationID"),
    entityName: propertyText(page, "EntityName"),
    recordType: propertyText(page, "RecordType"),
    statusLevel: propertyText(page, "StatusLevel"),
    isPublic: propertyCheckbox(page, "IsPublic"),
    publicSlug: propertyText(page, "PublicSlug"),
    canonicalVerifyUrl: propertyText(page, "CanonicalVerifyURL"),
    scopeDisplay: propertyText(page, "ScopeDisplay"),
    publicSummary: propertyText(page, "PublicSummary"),
    publicDetail: propertyText(page, "PublicDetail"),
    sourceNotes: propertyText(page, "SourceNotes"),
  }));
}

export async function syncTriosPublicRecordsToDatabase() {
  if (!hasDatabaseUrl()) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const prisma = getPrisma();
  const records = await fetchPublishedVerificationRecords();
  let synced = 0;

  for (const record of records) {
    if (!record.publicSlug || !record.entityName) continue;

    const organization = await prisma.organization.upsert({
      where: { slug: record.publicSlug },
      update: {
        name: record.entityName,
        publicStatus: record.statusLevel,
        shortPublicDescription: record.publicSummary,
        directoryEligible: true,
      },
      create: {
        name: record.entityName,
        slug: record.publicSlug,
        publicStatus: record.statusLevel,
        shortPublicDescription: record.publicSummary,
        directoryEligible: true,
      },
    });

    const verification = await prisma.verificationRecord.upsert({
      where: { id: record.verificationId || record.id },
      update: {
        title: record.verificationId || record.title,
        organizationId: organization.id,
        isCurrent: record.isPublic,
        scope: record.scopeDisplay || "Public record",
        publicNote: record.publicSummary,
      },
      create: {
        id: record.verificationId || record.id,
        title: record.verificationId || record.title,
        organizationId: organization.id,
        isCurrent: record.isPublic,
        scope: record.scopeDisplay || "Public record",
        publicNote: record.publicSummary,
      },
    });

    await prisma.publicDirectoryListing.upsert({
      where: { publicSlug: record.publicSlug },
      update: {
        title: record.entityName,
        organizationId: organization.id,
        verificationRecordId: verification.id,
        status: record.statusLevel || "Public research profile",
        listingType: record.recordType || "Public research profile",
        shortBlurb: record.publicSummary,
        sourceNotes: record.sourceNotes ? [record.sourceNotes] : [],
        seoTitle: `${record.entityName} Teal Registry profile`,
        seoDescription: record.publicSummary,
        publishedAt: new Date(),
      },
      create: {
        title: record.entityName,
        publicSlug: record.publicSlug,
        organizationId: organization.id,
        verificationRecordId: verification.id,
        status: record.statusLevel || "Public research profile",
        listingType: record.recordType || "Public research profile",
        shortBlurb: record.publicSummary,
        sourceNotes: record.sourceNotes ? [record.sourceNotes] : [],
        seoTitle: `${record.entityName} Teal Registry profile`,
        seoDescription: record.publicSummary,
        publishedAt: new Date(),
      },
    });

    synced += 1;
  }

  return { synced, found: records.length };
}
