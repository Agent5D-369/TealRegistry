export const tealBasics = [
  {
    title: "Evolutionary Purpose",
    body: "The organization is guided by a living purpose people can use when making real decisions. If the work is mainly driven by ego, extraction, optics, or short-term targets, the claim is not regenerative yet.",
  },
  {
    title: "Self-Organization",
    body: "Power is distributed through clear agreements, not hidden hierarchy. People know how decisions get made, who holds which responsibilities, and how to challenge choices without punishment.",
  },
  {
    title: "Wholeness",
    body: "People can bring truth, care, conflict, learning, and accountability into the work. A culture that requires masks, silence, fear, or burnout cannot credibly call itself Teal.",
  },
];

export const publicRoutes = [
  { href: "/registry", label: "Registry" },
  { href: "/credentials", label: "Credentials" },
  { href: "/standards", label: "Standards" },
  { href: "/apply", label: "Apply" },
  { href: "/report-misuse", label: "Report Misuse" },
];

export const portalRoutes = [
  { href: "/login", label: "Login" },
  { href: "/dashboard/candidate", label: "Candidate" },
  { href: "/dashboard/organization", label: "Organization" },
  { href: "/dashboard/assessor", label: "Assessor" },
  { href: "/admin", label: "Admin" },
];

export const applicationPathways = [
  {
    title: "Public listing",
    audience: "For projects and people ready to be visible as Teal-aligned.",
    steps: ["Confirm identity", "Declare scope", "Publish public commitment"],
  },
  {
    title: "Independent review",
    audience: "For organizations that need evidence checked before making a stronger claim.",
    steps: ["Submit evidence", "Complete review", "Receive decision"],
  },
  {
    title: "Accreditation",
    audience: "For training providers and implementation teams serving the Teal ecosystem.",
    steps: ["Map program", "Review delivery", "Renew annually"],
  },
];

export const adminWorkflows = [
  {
    title: "Applications",
    summary: "Intake, readiness screening, missing information, pathway fit, and applicant communication.",
    states: ["Draft", "Submitted", "Screening", "Evidence review", "Decision"],
  },
  {
    title: "Cases",
    summary: "Reviewer assignment, conflict checks, assessment notes, interviews, findings, and deadlines.",
    states: ["Open", "Assigned", "In review", "Findings ready", "Closed"],
  },
  {
    title: "Decisions",
    summary: "Approval, denial, public rationale, badge issuance, renewal windows, and audit trail.",
    states: ["Pending", "Approved", "Issued", "Published", "Renewal scheduled"],
  },
  {
    title: "Misuse reports",
    summary: "Concern intake, triage, investigation, public notice, enforcement action, appeal, and closure.",
    states: ["Received", "Triage", "Investigation", "Action proposed", "Closed"],
  },
];

export const dashboardSnapshots = {
  candidate: [
    "Application pathway selected",
    "Evidence checklist in progress",
    "Reviewer questions awaiting response",
    "Public claim preview before decision",
  ],
  organization: [
    "Directory profile readiness",
    "Active badge licenses",
    "Renewal and review windows",
    "Evidence library by claim",
  ],
  assessor: [
    "Assigned cases",
    "Conflict-of-interest declarations",
    "Evidence review queue",
    "Findings and decision packet",
  ],
  admin: [
    "Application operations",
    "Badge issuance and revocation",
    "Renewals and expirations",
    "Misuse and public notice workflow",
  ],
};

export const canvaTemplatePlan = [
  {
    title: "Badge announcement",
    format: "LinkedIn square and story",
    value: "Helps credential holders explain what was verified without overstating the claim.",
  },
  {
    title: "Verified profile card",
    format: "Directory share graphic",
    value: "Gives funders and partners a clean summary of status, scope, and review window.",
  },
  {
    title: "Certificate PDF",
    format: "Printable credential certificate",
    value: "Creates a polished document for boards, procurement, learning records, and events.",
  },
  {
    title: "Trust ladder infographic",
    format: "One-page explainer",
    value: "Explains Teal in plain language and shows the difference between alignment, training, verification, and certification.",
  },
];
