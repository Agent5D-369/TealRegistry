import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const defaultCsvDir = path.resolve(repoRoot, "..", "_NOTION BACKEND", "TRIOS_v3");
const csvDir = process.env.TRIOS_CSV_DIR
  ? path.resolve(process.env.TRIOS_CSV_DIR)
  : defaultCsvDir;

const prisma = new PrismaClient();

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted && char === '"' && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

function readCsv(fileName) {
  const fullPath = path.join(csvDir, fileName);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Missing CSV: ${fullPath}`);
    return [];
  }

  const rows = parseCsv(fs.readFileSync(fullPath, "utf8"));
  const [headers = [], ...records] = rows;

  return records.map((record) =>
    Object.fromEntries(headers.map((header, index) => [header, (record[index] ?? "").trim()])),
  );
}

function bool(value) {
  return ["yes", "true", "1", "published", "active"].includes(String(value).toLowerCase());
}

function date(value) {
  return value ? new Date(value) : null;
}

function list(value) {
  return value ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function enumValue(value, fallback) {
  const normalized = String(value || fallback)
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .toUpperCase();

  return normalized || fallback;
}

async function main() {
  console.log(`Importing TRIOS seed data from ${csvDir}`);

  const credentialLevels = readCsv("00_CredentialLevels.csv");
  const badgeTypes = readCsv("01_BadgeTypes.csv");
  const standards = readCsv("06_Standards.csv");
  const criteria = readCsv("07_Criteria.csv");
  const profiles = readCsv("08_Profiles.csv");
  const organizations = readCsv("09_Organizations.csv");
  const applications = readCsv("12_Applications.csv");
  const cases = readCsv("13_Cases.csv");
  const evidence = readCsv("16_Evidence.csv");
  const decisions = readCsv("18_Decisions.csv");
  const verificationRecords = readCsv("19_VerificationRecords.csv");
  const badgeLicenses = readCsv("20_BadgeLicenses.csv");
  const complaints = readCsv("21_ComplaintsAppeals.csv");
  const publicListings = readCsv("27_PublicDirectoryListings.csv");

  for (const row of credentialLevels) {
    await prisma.credentialLevel.upsert({
      where: { title: row.Title },
      update: {
        levelOrder: Number(row.LevelOrder || 0),
        track: row.Track,
        publicLabel: row.PublicLabel,
        evidenceRequired: row.EvidenceRequired,
        whoEligible: row.WhoEligible,
        badgeType: row.BadgeType,
        notes: row.Notes,
      },
      create: {
        title: row.Title,
        levelOrder: Number(row.LevelOrder || 0),
        track: row.Track,
        publicLabel: row.PublicLabel,
        evidenceRequired: row.EvidenceRequired,
        whoEligible: row.WhoEligible,
        badgeType: row.BadgeType,
        notes: row.Notes,
      },
    });
  }

  for (const row of badgeTypes) {
    await prisma.badgeType.upsert({
      where: { title: row.Title },
      update: {
        category: row.Category,
        appliesTo: row.AppliesTo,
        publicClaim: row.PublicClaim,
        requiresVerification: bool(row.RequiresVerification),
        artworkFile: row.ArtworkFile,
      },
      create: {
        title: row.Title,
        category: row.Category,
        appliesTo: row.AppliesTo,
        publicClaim: row.PublicClaim,
        requiresVerification: bool(row.RequiresVerification),
        artworkFile: row.ArtworkFile,
      },
    });
  }

  for (const row of standards) {
    await prisma.standard.upsert({
      where: { standardCode: row.StandardCode },
      update: {
        title: row.Title,
        status: row.Status,
        effectiveDate: date(row.EffectiveDate),
        summary: row.Summary,
        publicUrl: row.PublicURL,
        notes: row.Notes,
      },
      create: {
        title: row.Title,
        standardCode: row.StandardCode,
        status: row.Status,
        effectiveDate: date(row.EffectiveDate),
        summary: row.Summary,
        publicUrl: row.PublicURL,
        notes: row.Notes,
      },
    });
  }

  for (const row of criteria) {
    const standard = row.Standard
      ? await prisma.standard.findFirst({ where: { title: row.Standard } })
      : null;

    if (!standard || !row.CriterionCode) {
      continue;
    }

    await prisma.criterion.upsert({
      where: { criterionCode: row.CriterionCode },
      update: {
        title: row.Title,
        standardId: standard.id,
        domain: row.Domain,
        severity: row.Severity,
        assessmentMethod: row.AssessmentMethod,
        evidenceExamples: row.EvidenceExamples,
        publicSafeExample: row.PublicSafeExample,
        notes: row.Notes,
      },
      create: {
        title: row.Title,
        criterionCode: row.CriterionCode,
        standardId: standard.id,
        domain: row.Domain,
        severity: row.Severity,
        assessmentMethod: row.AssessmentMethod,
        evidenceExamples: row.EvidenceExamples,
        publicSafeExample: row.PublicSafeExample,
        notes: row.Notes,
      },
    });
  }

  for (const row of profiles) {
    await prisma.profile.upsert({
      where: { publicSlug: row.PublicSlug || slug(row.Title) },
      update: {
        name: row.Title,
        type: enumValue(row.Type, "INDIVIDUAL"),
        country: row.Country,
        sector: row.Sector,
        visibility: enumValue(row.Visibility, "PRIVATE"),
        website: row.Website,
        primaryEmail: row.PrimaryEmail,
        notes: row.Notes,
      },
      create: {
        name: row.Title,
        publicSlug: row.PublicSlug || slug(row.Title),
        type: enumValue(row.Type, "INDIVIDUAL"),
        country: row.Country,
        sector: row.Sector,
        visibility: enumValue(row.Visibility, "PRIVATE"),
        website: row.Website,
        primaryEmail: row.PrimaryEmail,
        notes: row.Notes,
      },
    });
  }

  for (const row of organizations) {
    await prisma.organization.upsert({
      where: { slug: slug(row.Title) },
      update: {
        name: row.Title,
        orgType: row.OrgType,
        country: row.Country,
        sectors: list(row.Sectors),
        size: row.Size,
        publicStatus: row.PublicStatus,
        directoryEligible: bool(row.DirectoryEligible),
        shortPublicDescription: row.ShortPublicDescription,
        primaryContact: row.PrimaryContact,
        website: row.Website,
        notes: row.Notes,
      },
      create: {
        name: row.Title,
        slug: slug(row.Title),
        orgType: row.OrgType,
        country: row.Country,
        sectors: list(row.Sectors),
        size: row.Size,
        publicStatus: row.PublicStatus,
        directoryEligible: bool(row.DirectoryEligible),
        shortPublicDescription: row.ShortPublicDescription,
        primaryContact: row.PrimaryContact,
        website: row.Website,
        notes: row.Notes,
      },
    });
  }

  for (const row of applications) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;
    const requestedLevel = row.RequestedLevel
      ? await prisma.credentialLevel.findFirst({ where: { title: row.RequestedLevel } })
      : null;

    await prisma.application.upsert({
      where: { id: row.ID || `seed-${slug(row.Title)}` },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        applicationType: row.ApplicationType,
        requestedLevelId: requestedLevel?.id,
        submittedDate: date(row.SubmittedDate),
        status: enumValue(row.Status, "DRAFT"),
        source: row.Source,
        readinessScore: row.ReadinessScore ? Number(row.ReadinessScore) : null,
        notes: row.Notes,
      },
      create: {
        id: row.ID || `seed-${slug(row.Title)}`,
        title: row.Title,
        organizationId: organization?.id,
        applicationType: row.ApplicationType,
        requestedLevelId: requestedLevel?.id,
        submittedDate: date(row.SubmittedDate),
        status: enumValue(row.Status, "DRAFT"),
        source: row.Source,
        readinessScore: row.ReadinessScore ? Number(row.ReadinessScore) : null,
        notes: row.Notes,
      },
    });
  }

  for (const row of cases) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;

    await prisma.case.upsert({
      where: { id: row.ID || `seed-${slug(row.Title)}` },
      update: {
        title: row.Title,
        caseType: row.CaseType,
        organizationId: organization?.id,
        requestedLevel: row.RequestedLevel,
        status: enumValue(row.Status, "OPEN"),
        openedDate: date(row.OpenedDate),
        targetDecisionDate: date(row.TargetDecisionDate),
        primaryContact: row.PrimaryContact,
        publicSummaryReady: bool(row.PublicSummaryReady),
        notes: row.Notes,
      },
      create: {
        id: row.ID || `seed-${slug(row.Title)}`,
        title: row.Title,
        caseType: row.CaseType,
        organizationId: organization?.id,
        requestedLevel: row.RequestedLevel,
        status: enumValue(row.Status, "OPEN"),
        openedDate: date(row.OpenedDate),
        targetDecisionDate: date(row.TargetDecisionDate),
        primaryContact: row.PrimaryContact,
        publicSummaryReady: bool(row.PublicSummaryReady),
        notes: row.Notes,
      },
    });
  }

  for (const row of evidence) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;

    await prisma.evidence.upsert({
      where: { id: row.ID || `seed-${slug(row.Title)}` },
      update: {
        title: row.Title,
        evidenceType: row.EvidenceType,
        organizationId: organization?.id,
        submittedBy: row.SubmittedBy,
        receivedDate: date(row.ReceivedDate),
        reviewStatus: enumValue(row.ReviewStatus, "SUBMITTED"),
        publicSafe: bool(row.PublicSafe),
        url: row.URL,
        notes: row.Notes,
      },
      create: {
        id: row.ID || `seed-${slug(row.Title)}`,
        title: row.Title,
        evidenceType: row.EvidenceType,
        organizationId: organization?.id,
        submittedBy: row.SubmittedBy,
        receivedDate: date(row.ReceivedDate),
        reviewStatus: enumValue(row.ReviewStatus, "SUBMITTED"),
        publicSafe: bool(row.PublicSafe),
        url: row.URL,
        notes: row.Notes,
      },
    });
  }

  for (const row of decisions) {
    const decidedLevel = row.DecidedLevel
      ? await prisma.credentialLevel.findFirst({ where: { title: row.DecidedLevel } })
      : null;

    await prisma.decision.upsert({
      where: { id: row.ID || `seed-${slug(row.Title)}` },
      update: {
        title: row.Title,
        caseId: row.CaseID || `seed-${slug(row.Case || row.Title)}`,
        decisionType: row.DecisionType,
        decisionDate: date(row.DecisionDate),
        decidedLevelId: decidedLevel?.id,
        decisionBody: row.DecisionBody,
        rationalePublic: row.RationalePublic,
        rationalePrivate: row.RationalePrivate,
        status: row.Status,
        notes: row.Notes,
      },
      create: {
        id: row.ID || `seed-${slug(row.Title)}`,
        title: row.Title,
        caseId: row.CaseID || `seed-${slug(row.Case || row.Title)}`,
        decisionType: row.DecisionType,
        decisionDate: date(row.DecisionDate),
        decidedLevelId: decidedLevel?.id,
        decisionBody: row.DecisionBody,
        rationalePublic: row.RationalePublic,
        rationalePrivate: row.RationalePrivate,
        status: row.Status,
        notes: row.Notes,
      },
    }).catch(() => null);
  }

  for (const row of verificationRecords) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;
    const grantedLevel = row.GrantedLevel
      ? await prisma.credentialLevel.findFirst({ where: { title: row.GrantedLevel } })
      : null;

    await prisma.verificationRecord.upsert({
      where: { id: row.ID || `seed-${slug(row.Title)}` },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        grantedLevelId: grantedLevel?.id,
        isCurrent: bool(row.IsCurrent),
        lastAuditDate: date(row.LastAuditDate),
        validTo: date(row.ValidTo),
        nextReviewWindow: row.NextReviewWindow,
        scope: row.Scope,
        publicNote: row.PublicNote,
        notes: row.Notes,
      },
      create: {
        id: row.ID || `seed-${slug(row.Title)}`,
        title: row.Title,
        organizationId: organization?.id,
        grantedLevelId: grantedLevel?.id,
        isCurrent: bool(row.IsCurrent),
        lastAuditDate: date(row.LastAuditDate),
        validTo: date(row.ValidTo),
        nextReviewWindow: row.NextReviewWindow,
        scope: row.Scope,
        publicNote: row.PublicNote,
        notes: row.Notes,
      },
    });
  }

  for (const row of badgeLicenses) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;
    const badgeType = row.BadgeType
      ? await prisma.badgeType.findFirst({ where: { title: row.BadgeType } })
      : null;

    await prisma.badgeLicense.upsert({
      where: { badgeId: row.BadgeID },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        personName: row.Person,
        badgeTypeId: badgeType?.id,
        issuedDate: date(row.IssuedDate),
        expiryDate: date(row.ExpiryDate),
        status: enumValue(row.LicenseStatus, "DRAFT"),
        verifyUrl: row.VerifyURL,
        qrCodeTarget: row.QRCodeTarget,
        misuseFlags: row.MisuseFlags,
        notes: row.Notes,
      },
      create: {
        title: row.Title,
        badgeId: row.BadgeID,
        organizationId: organization?.id,
        personName: row.Person,
        badgeTypeId: badgeType?.id,
        issuedDate: date(row.IssuedDate),
        expiryDate: date(row.ExpiryDate),
        status: enumValue(row.LicenseStatus, "DRAFT"),
        verifyUrl: row.VerifyURL,
        qrCodeTarget: row.QRCodeTarget,
        misuseFlags: row.MisuseFlags,
        notes: row.Notes,
      },
    });
  }

  for (const row of complaints) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;

    await prisma.complaintAppeal.upsert({
      where: { id: row.ID || `seed-${slug(row.Title)}` },
      update: {
        title: row.Title,
        intakeType: row.IntakeType,
        organizationId: organization?.id,
        filedBy: row.FiledBy,
        filedDate: date(row.FiledDate),
        status: enumValue(row.Status, "RECEIVED"),
        severity: row.Severity,
        summaryPublic: row.SummaryPublic,
        summaryPrivate: row.SummaryPrivate,
        relatedBadgeId: row.RelatedBadgeID,
        notes: row.Notes,
      },
      create: {
        id: row.ID || `seed-${slug(row.Title)}`,
        title: row.Title,
        intakeType: row.IntakeType,
        organizationId: organization?.id,
        filedBy: row.FiledBy,
        filedDate: date(row.FiledDate),
        status: enumValue(row.Status, "RECEIVED"),
        severity: row.Severity,
        summaryPublic: row.SummaryPublic,
        summaryPrivate: row.SummaryPrivate,
        relatedBadgeId: row.RelatedBadgeID,
        notes: row.Notes,
      },
    });
  }

  for (const row of publicListings) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;

    await prisma.publicDirectoryListing.upsert({
      where: { publicSlug: row.PublicSlug || slug(row.Title) },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        status: row.Status,
        featured: bool(row.Featured),
        shortBlurb: row.ShortBlurb,
        primaryCta: row.PrimaryCTA,
        notes: row.Notes,
        publishedAt: date(row.PublishedAt),
      },
      create: {
        title: row.Title,
        organizationId: organization?.id,
        publicSlug: row.PublicSlug || slug(row.Title),
        status: row.Status,
        featured: bool(row.Featured),
        shortBlurb: row.ShortBlurb,
        primaryCta: row.PrimaryCTA,
        notes: row.Notes,
        publishedAt: date(row.PublishedAt),
      },
    });
  }

  console.log("TRIOS seed import complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
