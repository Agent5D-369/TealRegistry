export const tealPrinciples = [
  {
    name: "Self-Management",
    plain: "Clear authority without one central controller.",
    definition:
      "A system can coordinate work, authority, and accountability through explicit roles, decision rights, and agreements instead of founder bottlenecks or hidden hierarchy.",
    evidence: [
      "Role cards, circle charters, or written role definitions",
      "Decision-making records using consent, advice, or delegated authority",
      "Escalation paths that do not default to one personality",
      "Operating agreements that show how power flows",
    ],
    watchFor: "Founder bottlenecks, vague flatness, informal power, or charisma overriding stated roles.",
  },
  {
    name: "Wholeness",
    plain: "Truth, conflict, care, learning, and accountability can happen without punishment.",
    definition:
      "People can bring human reality into the work. Conflict is named early, feedback is structured, and emotional signals are treated as information instead of disruption.",
    evidence: [
      "Conflict-resolution or tension-processing practices",
      "Feedback norms, repair agreements, or codes of conduct",
      "Clear pathways for raising concerns without retaliation",
      "Examples of conflict handled constructively",
    ],
    watchFor: "Niceness replacing truth, informal exile, triangulation, silence, fear, or burnout.",
  },
  {
    name: "Evolutionary Purpose",
    plain: "Purpose guides real decisions and can adapt as reality changes.",
    definition:
      "The organization can change direction based on learning, stakeholder feedback, and emerging conditions without identity collapse or power struggle.",
    evidence: [
      "Purpose statements tied to decision criteria",
      "Strategic review notes, pivots, or change logs",
      "Records showing stopped or changed work when it no longer fit",
      "Feedback systems that influence direction",
    ],
    watchFor: "Purpose used as branding, rigid dogma, ego-driven strategy, or sunk-cost decision-making.",
  },
];

export const publicStandards = [
  {
    title: "Teal Core Standard v1.0",
    publicName: "The Teal Core Standard",
    summary:
      "Defines the three non-negotiables in observable terms: Self-Management, Wholeness, and Evolutionary Purpose.",
    publicUse: "Use this to understand what must be present before a Teal claim can be trusted.",
  },
  {
    title: "Evidence & Interpretation Guide v1.0",
    publicName: "Evidence and Interpretation Guide",
    summary:
      "Explains what counts as evidence, how reviewers interpret claims, and what can be shared publicly without exposing sensitive internal material.",
    publicUse: "Use this to prepare evidence, read public listings, or understand why a claim may be limited.",
  },
];

export const verificationSteps = [
  {
    title: "Application and evidence submission",
    body: "The applicant selects a track and submits evidence mapped to all three Teal principles.",
  },
  {
    title: "Initial completeness review",
    body: "A reviewer checks whether the submission is complete and asks clarifying questions where needed.",
  },
  {
    title: "Evidence assessment",
    body: "Artifacts are reviewed against standards. Interviews or observation may be requested for deeper levels.",
  },
  {
    title: "Outcome and public record",
    body: "A decision is issued, the public listing is updated, and the renewal clock starts if status is granted.",
  },
];

export const verificationOutcomes = [
  "Teal Verified",
  "Teal Verified (Conditional)",
  "Not Yet Verified",
  "Verification Deferred",
];

export const statusLabels = [
  {
    label: "Teal Aligned",
    meaning: "Self-attested alignment with Teal Registry standards. No external review conducted.",
  },
  {
    label: "Teal Trained",
    meaning: "Education completed. Training does not indicate verified implementation.",
  },
  {
    label: "Teal Verified",
    meaning: "Implementation has been reviewed based on submitted evidence at a point in time.",
  },
  {
    label: "Teal Certified",
    meaning: "Deeper review, stronger evidence, observed practice, and renewal obligations.",
  },
  {
    label: "Verification Paused",
    meaning: "Status is temporarily removed or limited while review, repair, or clarification occurs.",
  },
  {
    label: "Verification Not Renewed",
    meaning: "A prior verification has ended or was not renewed. The old claim should not be used.",
  },
];

export const misusePublicFlow = [
  {
    title: "Submit a neutral report",
    body: "Send the entity name, claimed status, URL where the claim appears, and a short description.",
  },
  {
    title: "Registry checks the public record",
    body: "The team checks whether the entity is listed and whether the claim matches the current status.",
  },
  {
    title: "Private correction first",
    body: "Most problems are handled through clarification or correction before public action is considered.",
  },
  {
    title: "Public record updated if needed",
    body: "If the concern affects public trust, the directory, status, or clarification notice is updated.",
  },
];

export const independenceBoundaries = [
  "Teal Registry sets standards, reviews evidence, publishes records, and protects badge integrity.",
  "Training and implementation support may help applicants prepare, but they do not grant status.",
  "Assessors may not review their own clients, trainees, affiliated projects, or conflicted relationships.",
  "Support, sponsorship, enhanced listings, or visibility products do not influence verification outcomes.",
  "Public records show the exact scope reviewed; no badge should be treated as a broad endorsement.",
];

export const applicationTracks = [
  {
    title: "Organization / Project",
    who: "Land projects, communities, regenerative businesses, service organizations, and operating teams.",
    evidence:
      "Governance evidence, role clarity, conflict infrastructure, purpose stewardship, and financial or resource decision practices.",
  },
  {
    title: "Practitioner",
    who: "Consultants, implementers, facilitators, educators, and people supporting Teal practice.",
    evidence:
      "Training records, implementation case summaries, client references, ethics disclosures, and scope-of-practice boundaries.",
  },
  {
    title: "Provider / Framework",
    who: "Training providers, implementation teams, and frameworks that want accreditation or recognition.",
    evidence:
      "Curriculum mapping, delivery quality, assessor independence, claims language, and renewal commitments.",
  },
];
