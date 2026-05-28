import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const defaultCsvDir = path.resolve(repoRoot, "..", "_NOTION BACKEND", "TRIOS_v3");
const csvDir = process.env.TRIOS_CSV_DIR
  ? path.resolve(process.env.TRIOS_CSV_DIR)
  : defaultCsvDir;

let prisma;

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

function mappedEnum(value, fallback, mapping = {}) {
  const key = String(value || "")
    .trim()
    .toLowerCase();

  return mapping[key] || enumValue(value, fallback);
}

function seedId(value) {
  return `seed-${slug(value)}`;
}

function bySeedTitle(model, title) {
  return title ? prisma[model].findUnique({ where: { id: seedId(title) } }) : null;
}

async function createPrismaClient() {
  const { PrismaClient } = await import("@prisma/client");
  return new PrismaClient();
}

const applicationStatusMap = {
  "in review": "EVIDENCE_REVIEW",
  review: "EVIDENCE_REVIEW",
  pending: "SCREENING",
  approved: "ISSUED",
  published: "PUBLISHED",
};

const caseStatusMap = {
  "evidence review": "IN_REVIEW",
  review: "IN_REVIEW",
  pending: "OPEN",
};

const evidenceStatusMap = {
  pending: "SUBMITTED",
  sufficient: "ACCEPTED",
  "missing items": "NEEDS_CLARIFICATION",
};

const badgeLicenseStatusMap = {
  active: "ACTIVE",
  published: "ACTIVE",
};

const entityTypeMap = {
  person: "INDIVIDUAL",
  individual: "INDIVIDUAL",
  team: "PROVIDER",
  provider: "PROVIDER",
  organization: "ORGANIZATION",
  framework: "FRAMEWORK",
};

const complaintStatusMap = {
  new: "RECEIVED",
  open: "RECEIVED",
  received: "RECEIVED",
  closed: "CLOSED",
};

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
  const assessments = readCsv("14_Assessments.csv");
  const findings = readCsv("15_FindingsCriteriaCoverage.csv");
  const evidence = readCsv("16_Evidence.csv");
  const interviews = readCsv("17_Interviews.csv");
  const decisions = readCsv("18_Decisions.csv");
  const verificationRecords = readCsv("19_VerificationRecords.csv");
  const badgeLicenses = readCsv("20_BadgeLicenses.csv");
  const complaints = readCsv("21_ComplaintsAppeals.csv");
  const enforcementActions = readCsv("22_EnforcementActions.csv");
  const assessorCalibrations = readCsv("24_AssessorCalibration.csv");
  const tasks = readCsv("25_Tasks.csv");
  const comms = readCsv("26_CommsLog.csv");
  const publicListings = readCsv("27_PublicDirectoryListings.csv");
  const systemSettings = readCsv("30_SystemSettings.csv");

  const datasets = {
    credentialLevels,
    badgeTypes,
    standards,
    criteria,
    profiles,
    organizations,
    applications,
    cases,
    assessments,
    findings,
    evidence,
    interviews,
    decisions,
    verificationRecords,
    badgeLicenses,
    complaints,
    enforcementActions,
    assessorCalibrations,
    tasks,
    comms,
    publicListings,
    systemSettings,
  };

  if (process.env.TRIOS_DRY_RUN === "1") {
    console.table(
      Object.entries(datasets).map(([name, rows]) => ({
        dataset: name,
        rows: rows.length,
      })),
    );
    console.log("TRIOS dry run complete. No database writes were attempted.");
    return;
  }

  prisma = await createPrismaClient();

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
    const standard = row.StandardCode
      ? await prisma.standard.findUnique({ where: { standardCode: row.StandardCode } })
      : row.Standard
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
        type: mappedEnum(row.ProfileType || row.Type, "INDIVIDUAL", entityTypeMap),
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
        type: mappedEnum(row.ProfileType || row.Type, "INDIVIDUAL", entityTypeMap),
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
    const applicantProfile = row.ApplicantProfile
      ? await prisma.profile.findUnique({ where: { publicSlug: slug(row.ApplicantProfile) } })
      : null;
    const organization = row.Organization || row.ApplicantProfile
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization || row.ApplicantProfile) } })
      : null;
    const requestedLevel = row.RequestedLevel
      ? await prisma.credentialLevel.findFirst({ where: { title: row.RequestedLevel } })
      : null;

    await prisma.application.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        applicantProfileId: applicantProfile?.id,
        organizationId: organization?.id,
        applicationType: row.ApplicationType,
        requestedLevelId: requestedLevel?.id,
        submittedDate: date(row.SubmittedDate),
        status: mappedEnum(row.Status, "DRAFT", applicationStatusMap),
        source: row.Source,
        readinessScore: row.ReadinessScore ? Number(row.ReadinessScore) : null,
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        applicantProfileId: applicantProfile?.id,
        organizationId: organization?.id,
        applicationType: row.ApplicationType,
        requestedLevelId: requestedLevel?.id,
        submittedDate: date(row.SubmittedDate),
        status: mappedEnum(row.Status, "DRAFT", applicationStatusMap),
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
    const application = await bySeedTitle("application", row.Application);

    await prisma.case.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        caseType: row.CaseType,
        organizationId: organization?.id,
        applicationId: application?.id,
        requestedLevel: row.RequestedLevel,
        status: mappedEnum(row.CaseStatus || row.Status, "OPEN", caseStatusMap),
        openedDate: date(row.OpenedDate),
        targetDecisionDate: date(row.TargetDecisionDate),
        primaryContact: row.PrimaryContact,
        publicSummaryReady: bool(row.PublicSummaryReady),
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        caseType: row.CaseType,
        organizationId: organization?.id,
        applicationId: application?.id,
        requestedLevel: row.RequestedLevel,
        status: mappedEnum(row.CaseStatus || row.Status, "OPEN", caseStatusMap),
        openedDate: date(row.OpenedDate),
        targetDecisionDate: date(row.TargetDecisionDate),
        primaryContact: row.PrimaryContact,
        publicSummaryReady: bool(row.PublicSummaryReady),
        notes: row.Notes,
      },
    });
  }

  for (const row of assessments) {
    const caseRecord = await bySeedTitle("case", row.Case);
    const standard = row.Standard
      ? await prisma.standard.findFirst({ where: { title: row.Standard } })
      : null;

    if (!caseRecord) {
      continue;
    }

    await prisma.assessment.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        assessmentType: row.AssessmentType,
        caseId: caseRecord.id,
        standardId: standard?.id,
        assessorName: row.Assessor,
        status: row.Status,
        scopeSummary: row.ScopeSummary,
        startedDate: date(row.StartedDate),
        completedDate: date(row.CompletedDate),
        overallFinding: row.OverallFinding,
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        assessmentType: row.AssessmentType,
        caseId: caseRecord.id,
        standardId: standard?.id,
        assessorName: row.Assessor,
        status: row.Status,
        scopeSummary: row.ScopeSummary,
        startedDate: date(row.StartedDate),
        completedDate: date(row.CompletedDate),
        overallFinding: row.OverallFinding,
        notes: row.Notes,
      },
    });
  }

  for (const row of findings) {
    const assessment = await bySeedTitle("assessment", row.Assessment);
    const criterion = row.CriterionCode
      ? await prisma.criterion.findUnique({ where: { criterionCode: row.CriterionCode } })
      : null;

    if (!assessment) {
      continue;
    }

    await prisma.finding.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        assessmentId: assessment.id,
        criterionId: criterion?.id,
        finding: row.Finding,
        evidenceStatus: row.EvidenceStatus,
        publicSafeSummary: row.PublicSafeSummary,
        assessorNotes: row.AssessorNotes,
        correctiveAction: row.CorrectiveAction,
        dueDate: date(row.DueDate),
        closed: bool(row.Closed),
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        assessmentId: assessment.id,
        criterionId: criterion?.id,
        finding: row.Finding,
        evidenceStatus: row.EvidenceStatus,
        publicSafeSummary: row.PublicSafeSummary,
        assessorNotes: row.AssessorNotes,
        correctiveAction: row.CorrectiveAction,
        dueDate: date(row.DueDate),
        closed: bool(row.Closed),
      },
    });
  }

  for (const row of evidence) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;
    const caseRecord = await bySeedTitle("case", row.Case);
    const assessment = await bySeedTitle("assessment", row.Assessment);
    const criterion = row.CriterionCode
      ? await prisma.criterion.findUnique({ where: { criterionCode: row.CriterionCode } })
      : null;

    await prisma.evidence.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        evidenceType: row.EvidenceType,
        organizationId: organization?.id,
        caseId: caseRecord?.id,
        assessmentId: assessment?.id,
        criterionId: criterion?.id,
        submittedBy: row.SubmittedBy,
        receivedDate: date(row.ReceivedDate),
        reviewStatus: mappedEnum(row.ReviewStatus, "SUBMITTED", evidenceStatusMap),
        publicSafe: bool(row.PublicSafe),
        url: row.URL,
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        evidenceType: row.EvidenceType,
        organizationId: organization?.id,
        caseId: caseRecord?.id,
        assessmentId: assessment?.id,
        criterionId: criterion?.id,
        submittedBy: row.SubmittedBy,
        receivedDate: date(row.ReceivedDate),
        reviewStatus: mappedEnum(row.ReviewStatus, "SUBMITTED", evidenceStatusMap),
        publicSafe: bool(row.PublicSafe),
        url: row.URL,
        notes: row.Notes,
      },
    });
  }

  for (const row of interviews) {
    const caseRecord = await bySeedTitle("case", row.Case);

    if (!caseRecord) {
      continue;
    }

    await prisma.interview.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        interviewType: row.InterviewType,
        caseId: caseRecord.id,
        host: row.Host,
        participants: list(row.Participants),
        scheduledAt: date(row.ScheduledAt),
        status: row.Status,
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        interviewType: row.InterviewType,
        caseId: caseRecord.id,
        host: row.Host,
        participants: list(row.Participants),
        scheduledAt: date(row.ScheduledAt),
        status: row.Status,
        notes: row.Notes,
      },
    });
  }

  for (const row of decisions) {
    const decidedLevel = row.DecidedLevel
      ? await prisma.credentialLevel.findFirst({ where: { title: row.DecidedLevel } })
      : null;
    const caseRecord = await bySeedTitle("case", row.Case);

    if (!caseRecord) {
      continue;
    }

    await prisma.decision.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        caseId: caseRecord.id,
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
        id: row.ID || seedId(row.Title),
        title: row.Title,
        caseId: caseRecord.id,
        decisionType: row.DecisionType,
        decisionDate: date(row.DecisionDate),
        decidedLevelId: decidedLevel?.id,
        decisionBody: row.DecisionBody,
        rationalePublic: row.RationalePublic,
        rationalePrivate: row.RationalePrivate,
        status: row.Status,
        notes: row.Notes,
      },
    });
  }

  for (const row of verificationRecords) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;
    const grantedLevel = row.GrantedLevel
      ? await prisma.credentialLevel.findFirst({ where: { title: row.GrantedLevel } })
      : null;
    const decision = await bySeedTitle("decision", row.Decision);

    await prisma.verificationRecord.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        grantedLevelId: grantedLevel?.id,
        isCurrent: bool(row.IsCurrent),
        lastAuditDate: date(row.LastAuditDate),
        validTo: date(row.ValidTo),
        nextReviewWindow: row.NextReviewWindow,
        scope: row.Scope,
        decisionId: decision?.id,
        publicNote: row.PublicNote,
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        organizationId: organization?.id,
        grantedLevelId: grantedLevel?.id,
        isCurrent: bool(row.IsCurrent),
        lastAuditDate: date(row.LastAuditDate),
        validTo: date(row.ValidTo),
        nextReviewWindow: row.NextReviewWindow,
        scope: row.Scope,
        decisionId: decision?.id,
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
    const verificationRecord = await bySeedTitle("verificationRecord", row.VerificationRecord);

    await prisma.badgeLicense.upsert({
      where: { badgeId: row.BadgeID },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        personName: row.Person,
        badgeTypeId: badgeType?.id,
        issuedDate: date(row.IssuedDate),
        expiryDate: date(row.ExpiryDate),
        status: mappedEnum(row.LicenseStatus, "DRAFT", badgeLicenseStatusMap),
        verificationRecordId: verificationRecord?.id,
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
        status: mappedEnum(row.LicenseStatus, "DRAFT", badgeLicenseStatusMap),
        verificationRecordId: verificationRecord?.id,
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
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        intakeType: row.IntakeType,
        organizationId: organization?.id,
        filedBy: row.FiledBy,
        filedDate: date(row.FiledDate),
        status: mappedEnum(row.Status, "RECEIVED", complaintStatusMap),
        severity: row.Severity,
        summaryPublic: row.SummaryPublic,
        summaryPrivate: row.SummaryPrivate,
        relatedBadgeId: row.RelatedBadgeID,
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        intakeType: row.IntakeType,
        organizationId: organization?.id,
        filedBy: row.FiledBy,
        filedDate: date(row.FiledDate),
        status: mappedEnum(row.Status, "RECEIVED", complaintStatusMap),
        severity: row.Severity,
        summaryPublic: row.SummaryPublic,
        summaryPrivate: row.SummaryPrivate,
        relatedBadgeId: row.RelatedBadgeID,
        notes: row.Notes,
      },
    });
  }

  for (const row of enforcementActions) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;
    const relatedComplaint = await bySeedTitle("complaintAppeal", row.RelatedComplaint);

    await prisma.enforcementAction.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        actionType: row.ActionType,
        issuedDate: date(row.IssuedDate),
        status: row.Status,
        outcome: row.Outcome,
        relatedComplaintId: relatedComplaint?.id,
        relatedBadgeId: row.RelatedBadgeID,
        publicNote: row.PublicNote,
        privateNote: row.PrivateNote,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        organizationId: organization?.id,
        actionType: row.ActionType,
        issuedDate: date(row.IssuedDate),
        status: row.Status,
        outcome: row.Outcome,
        relatedComplaintId: relatedComplaint?.id,
        relatedBadgeId: row.RelatedBadgeID,
        publicNote: row.PublicNote,
        privateNote: row.PrivateNote,
      },
    });
  }

  for (const row of assessorCalibrations) {
    await prisma.assessorCalibration.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        calibrationDate: date(row.CalibrationDate),
        participants: list(row.Participants),
        focus: row.Focus,
        outcomeNotes: row.OutcomeNotes,
        status: row.Status,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        calibrationDate: date(row.CalibrationDate),
        participants: list(row.Participants),
        focus: row.Focus,
        outcomeNotes: row.OutcomeNotes,
        status: row.Status,
      },
    });
  }

  for (const row of tasks) {
    const caseRecord = await bySeedTitle("case", row.Case || row.RelatedCase);

    await prisma.task.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        status: row.Status,
        priority: row.Priority,
        owner: row.Owner,
        caseId: caseRecord?.id,
        relatedOrg: row.RelatedOrg,
        dueDate: date(row.DueDate),
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        status: row.Status,
        priority: row.Priority,
        owner: row.Owner,
        caseId: caseRecord?.id,
        relatedOrg: row.RelatedOrg,
        dueDate: date(row.DueDate),
        notes: row.Notes,
      },
    });
  }

  for (const row of comms) {
    const caseRecord = await bySeedTitle("case", row.Case || row.RelatedCase);

    await prisma.commsLog.upsert({
      where: { id: row.ID || seedId(row.Title) },
      update: {
        title: row.Title,
        channel: row.Channel,
        from: row.From,
        to: row.To,
        caseId: caseRecord?.id,
        date: date(row.Date),
        outcome: row.Outcome,
        summary: row.Summary,
        notes: row.Notes,
      },
      create: {
        id: row.ID || seedId(row.Title),
        title: row.Title,
        channel: row.Channel,
        from: row.From,
        to: row.To,
        caseId: caseRecord?.id,
        date: date(row.Date),
        outcome: row.Outcome,
        summary: row.Summary,
        notes: row.Notes,
      },
    });
  }

  for (const row of publicListings) {
    const organization = row.Organization
      ? await prisma.organization.findUnique({ where: { slug: slug(row.Organization) } })
      : null;
    const verificationRecord = row.VerificationRecord
      ? await bySeedTitle("verificationRecord", row.VerificationRecord)
      : await prisma.verificationRecord.findFirst({
          where: { organizationId: organization?.id, isCurrent: true },
        });

    await prisma.publicDirectoryListing.upsert({
      where: { publicSlug: row.PublicSlug || slug(row.Title) },
      update: {
        title: row.Title,
        organizationId: organization?.id,
        verificationRecordId: verificationRecord?.id,
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
        verificationRecordId: verificationRecord?.id,
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

  for (const row of systemSettings) {
    await prisma.systemSetting.upsert({
      where: { title: row.Title },
      update: {
        primaryAction: row.PrimaryAction,
        secondaryAction: row.SecondaryAction,
        slugPolicy: row.SlugPolicy,
        directoryDefaultVisibility: row.DirectoryDefaultVisibility,
        notes: row.Notes,
      },
      create: {
        title: row.Title,
        primaryAction: row.PrimaryAction,
        secondaryAction: row.SecondaryAction,
        slugPolicy: row.SlugPolicy,
        directoryDefaultVisibility: row.DirectoryDefaultVisibility,
        notes: row.Notes,
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
    await prisma?.$disconnect();
  });
