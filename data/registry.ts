export type CredentialLevel = {
  level: number;
  title: string;
  track: "entry" | "learning" | "practice" | "delivery" | "oversight" | "ecosystem";
  publicLabel: string;
  evidenceRequired: string;
  eligible: string;
  note: string;
};

export type DirectoryRecord = {
  name: string;
  slug: string;
  entityType: "Organization" | "Individual" | "Provider" | "Framework";
  country: string;
  sector: string;
  status: string;
  scope: string;
  lastReview: string;
  validTo: string;
  verificationId: string;
  badgeId: string;
  publicSummary: string;
  evidence: string[];
};

export type PortalRole = {
  role: string;
  summary: string;
  actions: string[];
};

export const credentialLevels: CredentialLevel[] = [
  {
    level: 1,
    title: "Teal Aligned",
    track: "entry",
    publicLabel: "Aligned (Self-attested)",
    evidenceRequired: "No",
    eligible: "Individuals, organizations",
    note: "Self-attestation listing. This is intent, not independent verification.",
  },
  {
    level: 2,
    title: "Teal Trained",
    track: "learning",
    publicLabel: "Trained (Education completed)",
    evidenceRequired: "Training completion",
    eligible: "Individuals",
    note: "Education completed through an accredited provider. This confirms learning, not behavior.",
  },
  {
    level: 3,
    title: "Teal Verified",
    track: "practice",
    publicLabel: "Verified (Independent review)",
    evidenceRequired: "Yes",
    eligible: "Organizations",
    note: "Evidence reviewed against a defined scope.",
  },
  {
    level: 4,
    title: "Teal Certified",
    track: "practice",
    publicLabel: "Certified (Independent certification)",
    evidenceRequired: "Yes",
    eligible: "Individuals, organizations",
    note: "Evidence plus interviews and a broader scope review.",
  },
  {
    level: 5,
    title: "Teal Certified Advanced",
    track: "practice",
    publicLabel: "Certified Advanced (Durability)",
    evidenceRequired: "Yes",
    eligible: "Individuals, organizations",
    note: "Demonstrated practice over time and under real operational load.",
  },
  {
    level: 6,
    title: "Teal Accredited - Training",
    track: "delivery",
    publicLabel: "Accredited (Training)",
    evidenceRequired: "Yes",
    eligible: "Teams, organizations",
    note: "Authorized to deliver training. Training providers cannot certify outcomes.",
  },
  {
    level: 7,
    title: "Teal Accredited - Implementation",
    track: "delivery",
    publicLabel: "Accredited (Implementation)",
    evidenceRequired: "Yes",
    eligible: "Teams, organizations",
    note: "Authorized to implement. Implementation teams cannot certify their own work.",
  },
  {
    level: 8,
    title: "Teal Assessor",
    track: "oversight",
    publicLabel: "Assessor (Authorized reviewer)",
    evidenceRequired: "Yes",
    eligible: "Individuals",
    note: "Authorized reviewers bound by ethics, calibration, and recusal rules.",
  },
  {
    level: 9,
    title: "Teal Recognized Framework",
    track: "ecosystem",
    publicLabel: "Recognized Framework",
    evidenceRequired: "Yes",
    eligible: "Frameworks",
    note: "Framework mapped to the standard. This is not an endorsement of organization outcomes.",
  },
];

export const directoryRecords: DirectoryRecord[] = [
  {
    name: "Sample Regenerative Project",
    slug: "sample-regenerative-project",
    entityType: "Organization",
    country: "Costa Rica",
    sector: "Regenerative Land Stewardship",
    status: "Teal Aligned",
    scope: "Self-attested listing",
    lastReview: "Pending independent review",
    validTo: "Not time-bound",
    verificationId: "TR-VR-0001",
    badgeId: "TR-AL-0001",
    publicSummary:
      "A seed record used to demonstrate public verification before independent assessment is complete.",
    evidence: ["Self-attestation", "Public profile", "Review application in progress"],
  },
  {
    name: "Sample Implementation Team",
    slug: "sample-implementation-team",
    entityType: "Provider",
    country: "United States",
    sector: "Organizational Development",
    status: "In Review",
    scope: "Accredited implementation team candidate",
    lastReview: "2026-01-31",
    validTo: "Decision pending",
    verificationId: "TR-APP-0002",
    badgeId: "Pending",
    publicSummary:
      "Accreditation application in review. No public accreditation claim is currently authorized.",
    evidence: ["Application", "Readiness score", "Assessor assignment"],
  },
  {
    name: "Teal Core Standard v1.0",
    slug: "teal-core-standard-v1",
    entityType: "Framework",
    country: "Global",
    sector: "Standards",
    status: "Draft",
    scope: "Evolutionary purpose, self-management, and wholeness criteria",
    lastReview: "Draft standard",
    validTo: "Not issued",
    verificationId: "TR-STD-CORE-1",
    badgeId: "Not applicable",
    publicSummary:
      "The draft core standard defines observable criteria for Teal-aligned claims.",
    evidence: ["Standard draft", "Criteria map", "Public-safe evidence examples"],
  },
];

export const standards = [
  {
    code: "TR-CORE-1.0",
    title: "Teal Core Standard v1.0",
    status: "Draft",
    summary:
      "Observable criteria for evolutionary purpose, self-management, and wholeness.",
    criteria: ["EP-01", "EP-02", "SM-01", "SM-02", "WH-01", "WH-02"],
  },
  {
    code: "TR-EVID-1.0",
    title: "Evidence & Interpretation Guide v1.0",
    status: "Draft",
    summary:
      "What counts as evidence, how claims are interpreted, and what may be disclosed publicly.",
    criteria: ["Public-safe evidence", "Review method", "Disclosure rules"],
  },
];

export const portalRoles: PortalRole[] = [
  {
    role: "Learners",
    summary: "Track accredited training completions and understand eligible next steps.",
    actions: ["Training records", "Pathway eligibility", "Claim guidance"],
  },
  {
    role: "Candidates",
    summary: "Apply, upload evidence, complete attestations, and follow case status.",
    actions: ["Applications", "Evidence vault", "Interview timeline"],
  },
  {
    role: "Organizations",
    summary: "Manage organization profiles, team permissions, renewals, and public listings.",
    actions: ["Org profile", "Credential cases", "Badge licenses"],
  },
  {
    role: "Providers",
    summary: "Submit training completions and maintain accreditation records.",
    actions: ["Learner completions", "Program records", "Provider renewal"],
  },
  {
    role: "Assessors",
    summary: "Review evidence, score criteria, declare conflicts, and prepare findings.",
    actions: ["Case queue", "Criteria scoring", "COI declarations"],
  },
  {
    role: "Admins",
    summary: "Run intake, decisions, badge issuance, directory publishing, and enforcement.",
    actions: ["Decision board", "Badge issuance", "Audit log"],
  },
];
