export type CredentialLevel = {
  level: number;
  title: string;
  track: "entry" | "learning" | "practice" | "delivery" | "oversight" | "ecosystem";
  publicLabel: string;
  evidenceRequired: string;
  eligible: string;
  note: string;
  badgeImage: string;
  claim: string;
  targetDescription: string;
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
  badgeImage: string;
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
    evidenceRequired: "Personal or public commitment",
    eligible: "Individuals, organizations",
    note: "They have publicly committed to Teal practices. Teal Registry has not yet checked the evidence.",
    badgeImage: "/assets/badges/teal-aligned.png",
    claim: "Listed in registry",
    targetDescription:
      "Useful for people and projects ready to be visible. It tells partners and funders this is a declared direction, not yet an independently reviewed claim.",
  },
  {
    level: 2,
    title: "Teal Trained",
    track: "learning",
    publicLabel: "Trained (Education completed)",
    evidenceRequired: "Completed approved training",
    eligible: "Individuals",
    note: "They completed approved learning. This does not prove how they behave in real work.",
    badgeImage: "/assets/badges/teal-trained.png",
    claim: "Training complete",
    targetDescription:
      "Useful for learners, hiring teams, and training partners. It confirms education was completed while making clear that practice still needs to be observed.",
  },
  {
    level: 3,
    title: "Teal Verified",
    track: "practice",
    publicLabel: "Verified (Independent review)",
    evidenceRequired: "Evidence checked",
    eligible: "Organizations",
    note: "Documents, examples, or interviews were reviewed for a specific claim.",
    badgeImage: "/assets/badges/teal-verified.png",
    claim: "Evidence reviewed",
    targetDescription:
      "Useful when a project needs outside confidence in a specific claim. Reviewers looked at evidence, but only for the scope named in the public record.",
  },
  {
    level: 4,
    title: "Teal Certified",
    track: "practice",
    publicLabel: "Certified (Independent certification)",
    evidenceRequired: "Evidence and interviews",
    eligible: "Individuals, organizations",
    note: "A deeper review found the practice is real within the stated scope.",
    badgeImage: "/assets/badges/teal-certified.png",
    claim: "Independently certified",
    targetDescription:
      "Useful for teams asking others to trust their way of working. It shows an independent review found the practice credible within a defined scope.",
  },
  {
    level: 5,
    title: "Teal Certified Advanced",
    track: "practice",
    publicLabel: "Certified Advanced (Durability)",
    evidenceRequired: "Practice over time",
    eligible: "Individuals, organizations",
    note: "The practice has held up over time, pressure, complexity, and real consequences.",
    badgeImage: "/assets/badges/teal-certified-advanced.png",
    claim: "Evidence and practice at scale",
    targetDescription:
      "Useful for mature organizations, funders, and communities making higher-stakes decisions. It signals the practice has held up over time and pressure.",
  },
  {
    level: 6,
    title: "Teal Accredited - Training",
    track: "delivery",
    publicLabel: "Accredited (Training)",
    evidenceRequired: "Provider reviewed",
    eligible: "Teams, organizations",
    note: "They may teach Teal methods. They cannot certify that a learner or client is Teal.",
    badgeImage: "/assets/badges/teal-accredited-training.png",
    claim: "Accredited training provider",
    targetDescription:
      "Useful for learners choosing a training path. It shows the provider has been reviewed to teach, while certification decisions stay independent.",
  },
  {
    level: 7,
    title: "Teal Accredited - Implementation",
    track: "delivery",
    publicLabel: "Accredited (Implementation)",
    evidenceRequired: "Delivery reviewed",
    eligible: "Teams, organizations",
    note: "They may help organizations implement. They cannot verify their own clients.",
    badgeImage: "/assets/badges/teal-accredited-implementation.png",
    claim: "Accredited implementation team",
    targetDescription:
      "Useful for leaders choosing implementation help. It shows delivery capability has been reviewed, while client verification remains separate.",
  },
  {
    level: 8,
    title: "Teal Assessor",
    track: "oversight",
    publicLabel: "Assessor (Authorized reviewer)",
    evidenceRequired: "Reviewer authorized",
    eligible: "Individuals",
    note: "They may review evidence for Teal Registry and must follow conflict-of-interest rules.",
    badgeImage: "/assets/badges/teal-assessor.png",
    claim: "Authorized reviewer",
    targetDescription:
      "Useful for applicants and registry governance. It identifies reviewers authorized to assess evidence and bound by conflict-of-interest rules.",
  },
  {
    level: 9,
    title: "Teal Recognized Framework",
    track: "ecosystem",
    publicLabel: "Recognized Framework",
    evidenceRequired: "Framework mapped",
    eligible: "Frameworks",
    note: "The framework maps to Teal principles. This does not verify any organization using it.",
    badgeImage: "/assets/badges/teal-recognized-framework.png",
    claim: "Recognized framework",
    targetDescription:
      "Useful for educators, consultants, and buyers comparing methods. It confirms a framework maps to Teal principles without certifying every user of it.",
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
    scope: "Public commitment only",
    lastReview: "Not yet independently reviewed",
    validTo: "No expiration until reviewed",
    verificationId: "TR-VR-0001",
    badgeId: "TR-AL-0001",
    badgeImage: "/assets/badges/teal-aligned.png",
    publicSummary:
      "This project has made a public Teal-aligned commitment. Independent evidence review has not happened yet.",
    evidence: ["Public commitment", "Profile listed", "Review not complete"],
  },
  {
    name: "Sample Implementation Team",
    slug: "sample-implementation-team",
    entityType: "Provider",
    country: "United States",
    sector: "Organizational Development",
    status: "In Review",
    scope: "Applying to become an accredited implementation team",
    lastReview: "Application opened",
    validTo: "Decision pending",
    verificationId: "TR-APP-0002",
    badgeId: "Pending",
    badgeImage: "/assets/badges/teal-accredited-implementation.png",
    publicSummary:
      "This team is in review. They may not claim Teal Registry accreditation until a decision is issued.",
    evidence: ["Application received", "Readiness check", "Reviewer assigned"],
  },
  {
    name: "Teal Practice Standard",
    slug: "teal-core-standard-v1",
    entityType: "Framework",
    country: "Global",
    sector: "Frameworks and methods",
    status: "Draft",
    scope: "How purpose, decision-making, and human practices show up in real life",
    lastReview: "Still being shaped",
    validTo: "Not issued",
    verificationId: "TR-STD-CORE-1",
    badgeId: "Not applicable",
    badgeImage: "/assets/badges/teal-recognized-framework.png",
    publicSummary:
      "This is the practical review guide behind Teal Registry decisions. It translates Teal ideals into observable signals.",
    evidence: ["Practice signals", "Evidence examples", "Public explanation"],
  },
];

export const standards = [
  {
    code: "TR-CORE-1.0",
    title: "How We Tell Whether Teal Is Real",
    status: "Draft",
    summary:
      "A practical guide for checking whether purpose, shared power, and healthy human practices are actually happening.",
    criteria: ["Purpose guides decisions", "Power is not hidden", "Conflict can be handled", "People are treated as whole humans"],
  },
  {
    code: "TR-EVID-1.0",
    title: "What Counts as Real Evidence",
    status: "Draft",
    summary:
      "A plain-language guide to the kinds of proof reviewers look for and what can be shared publicly.",
    criteria: ["Decision examples", "Team practices", "Interview signals", "Safe public summaries"],
  },
];

export const portalRoles: PortalRole[] = [
  {
    role: "Learners",
    summary: "See what learning is complete and what claims are safe to make next.",
    actions: ["Training history", "Next steps", "What you can claim"],
  },
  {
    role: "Candidates",
    summary: "Apply for recognition without guessing what reviewers need to see.",
    actions: ["Application", "Evidence checklist", "Review timeline"],
  },
  {
    role: "Organizations",
    summary: "Show funders, partners, teams, and communities what has actually been reviewed.",
    actions: ["Public profile", "Review cases", "Badge use"],
  },
  {
    role: "Providers",
    summary: "Keep training or implementation work clearly separate from certification decisions.",
    actions: ["Learner completions", "Program record", "Accreditation renewal"],
  },
  {
    role: "Assessors",
    summary: "Review claims consistently, document findings, and stay clear of conflicts.",
    actions: ["Review queue", "Evidence notes", "Conflict checks"],
  },
  {
    role: "Admins",
    summary: "Protect the registry by managing decisions, badge status, renewals, and misuse.",
    actions: ["Decision board", "Badge status", "Public record history"],
  },
];
