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
  region: string;
  sector: string;
  website?: string;
  status: string;
  scope: string;
  lastReview: string;
  validTo: string;
  verificationId: string;
  badgeId: string;
  badgeImage: string;
  publicSummary: string;
  evidence: string[];
  tagline: string;
  listingType: "Verified" | "Public research profile" | "In review" | "Framework";
  audience: string[];
  highlights: string[];
  tealSignals: Array<{ title: string; summary: string }>;
  sourceNotes: string[];
  mediaPolicy: string;
  reviewSummary: {
    average: number | null;
    count: number;
    note: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
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
    name: "Riverbend Commons",
    slug: "riverbend-commons",
    entityType: "Organization",
    country: "Costa Rica",
    region: "Central America",
    sector: "Regenerative Land Stewardship",
    website: "https://example.com/riverbend-commons",
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
    tagline: "A regenerative land stewardship profile prepared for public discovery and future verification.",
    listingType: "Public research profile",
    audience: ["Funders", "Land stewards", "Community partners", "Prospective residents"],
    highlights: [
      "Regenerative land stewardship focus",
      "Public Teal-aligned commitment recorded",
      "Clear boundary between listed and independently verified status",
    ],
    tealSignals: [
      {
        title: "Evolutionary Purpose",
        summary: "The profile is organized around land stewardship and community benefit rather than a generic business description.",
      },
      {
        title: "Self-Organization",
        summary: "Decision-making evidence has not been independently reviewed yet, so this remains a discovery profile.",
      },
      {
        title: "Wholeness",
        summary: "Culture and conflict practices still need direct evidence before stronger claims are made.",
      },
    ],
    sourceNotes: [
      "Prepared as a public research profile until the organization claims or verifies the listing.",
      "Public facts should be sourced from official channels, public interviews, directory entries, and owner-provided corrections.",
    ],
    mediaPolicy:
      "Images are not copied from the organization's website unless the owner provides permission or a clear reusable license exists.",
    reviewSummary: {
      average: null,
      count: 0,
      note: "Verified user reviews are planned but not yet open for this listing.",
    },
    seo: {
      title: "Riverbend Commons Teal Registry profile",
      description:
        "Explore the Riverbend Commons Teal Registry profile, public Teal-aligned status, regenerative land stewardship focus, and verification boundaries.",
      keywords: ["Riverbend Commons", "regenerative land stewardship", "intentional community", "Teal organization", "Costa Rica"],
    },
  },
  {
    name: "Northstar Implementation Team",
    slug: "northstar-implementation-team",
    entityType: "Provider",
    country: "United States",
    region: "North America",
    sector: "Organizational Development",
    website: "https://example.com/northstar-implementation-team",
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
    tagline: "An implementation-provider profile tracking accreditation readiness and review status.",
    listingType: "In review",
    audience: ["Founders", "Operators", "People teams", "Implementation buyers"],
    highlights: [
      "Applying for accredited implementation team status",
      "Review boundary makes clear that accreditation is not yet issued",
      "Useful for buyers comparing support options before engaging a provider",
    ],
    tealSignals: [
      {
        title: "Evolutionary Purpose",
        summary: "The review examines whether implementation work serves the client's living purpose rather than selling a fixed playbook.",
      },
      {
        title: "Self-Organization",
        summary: "Provider methods are checked for how they help teams distribute authority with clear agreements.",
      },
      {
        title: "Wholeness",
        summary: "Reviewers look for evidence that delivery practices support honesty, conflict repair, and psychological safety.",
      },
    ],
    sourceNotes: [
      "Application status is tracked separately from public accreditation status.",
      "Provider claims require reviewer evidence before Teal Registry accreditation language can be used.",
    ],
    mediaPolicy:
      "Profile media should be owner-provided or generated as original Teal Registry graphics until the provider grants asset rights.",
    reviewSummary: {
      average: null,
      count: 0,
      note: "Verified client reviews will be accepted after accreditation review controls are active.",
    },
    seo: {
      title: "Northstar Implementation Team Teal accreditation profile",
      description:
        "Review the Northstar Implementation Team Teal Registry profile, accreditation status, implementation focus, and verification boundary.",
      keywords: ["Teal implementation", "organizational development", "self-management consulting", "Teal accreditation"],
    },
  },
  {
    name: "Teal Practice Standard",
    slug: "teal-core-standard-v1",
    entityType: "Framework",
    country: "Global",
    region: "Global",
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
    tagline: "The practical standard used to translate Teal claims into observable review signals.",
    listingType: "Framework",
    audience: ["Assessors", "Founders", "Framework authors", "Training providers"],
    highlights: [
      "Defines how Teal claims are interpreted for review",
      "Keeps public language understandable for non-specialists",
      "Separates framework recognition from organization verification",
    ],
    tealSignals: [
      {
        title: "Evolutionary Purpose",
        summary: "The standard asks whether purpose guides decisions in daily work.",
      },
      {
        title: "Self-Organization",
        summary: "The standard asks whether power, roles, and decisions are clear enough to review.",
      },
      {
        title: "Wholeness",
        summary: "The standard asks whether people practices support truth, accountability, and repair.",
      },
    ],
    sourceNotes: [
      "Framework content is maintained by Teal Registry as the review guide evolves.",
      "Recognition of a framework does not verify every organization using it.",
    ],
    mediaPolicy: "Teal Registry owns the registry standard graphics and may create explanatory visuals from this page.",
    reviewSummary: {
      average: null,
      count: 0,
      note: "Public feedback will be collected through standards review cycles.",
    },
    seo: {
      title: "Teal Practice Standard public profile",
      description:
        "Read the Teal Practice Standard profile and learn how Teal Registry evaluates purpose, self-organization, and wholeness.",
      keywords: ["Teal standard", "Teal organization", "self-organization", "evolutionary purpose", "wholeness"],
    },
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
