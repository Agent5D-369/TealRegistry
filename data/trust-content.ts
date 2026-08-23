export const tealPrinciples = [
  {
    name: "Self-Organization",
    plain: "Clear authority without one central controller.",
    definition:
      "The system can coordinate work, authority, and accountability through explicit roles, decision rights, and agreements instead of founder bottlenecks or hidden hierarchy.",
    practice: [
      "Roles have defined scope, authority, and accountabilities",
      "Decisions are made where the information lives",
      "Authority is explicit, not personality-based",
      "Leadership exists, but it is contextual and role-bound",
    ],
    evidence: [
      "Role charters, role cards, or written role definitions",
      "Documented decision-making processes such as consent, advice, or delegated authority",
      "Clear escalation paths that do not default to founders",
      "Operating agreements that describe how power flows",
    ],
    watchFor: "Founder bottlenecks, informal power overriding stated roles, or flat structures with hidden hierarchy.",
    references: ["Buurtzorg", "Morning Star", "Haier"],
    referenceNote:
      "These examples are not presented as flawless or formally verified by Teal Registry. They are useful because self-organization is structurally encoded, not only dependent on charisma.",
  },
  {
    name: "Wholeness",
    plain: "Truth, conflict, care, learning, and accountability can happen without punishment.",
    definition:
      "The system supports honest communication, emotional reality, and human complexity without creating incentives to hide, posture, or avoid hard conversations.",
    practice: [
      "Conflict is named early rather than suppressed",
      "Feedback is expected and structured",
      "Emotional signals are treated as information, not disruption",
      "People are not required to fragment themselves to belong",
    ],
    evidence: [
      "Conflict-resolution or tension-processing practices",
      "Feedback norms, repair agreements, or codes of conduct",
      "Clear pathways for raising concerns without retaliation",
      "Examples of conflict handled constructively",
    ],
    watchFor: "Avoidance framed as niceness, explosions after long suppression, informal exile, triangulation, silence, fear, or burnout.",
    references: ["Patagonia", "AES", "Sociocratic and cooperative organizations with explicit tension-processing practices"],
    referenceNote:
      "Wholeness is visible when hard conversations are routine, structured, and safe enough to use before damage compounds.",
  },
  {
    name: "Evolutionary Purpose",
    plain: "Purpose guides real decisions and can adapt as reality changes.",
    definition:
      "The organization can adapt direction based on learning, stakeholder feedback, and emerging conditions rather than rigid plans, ego-driven control, or sunk cost.",
    practice: [
      "Purpose statements guide decisions, not just branding",
      "Current activities are regularly reviewed against purpose",
      "Work can be stopped or changed when it no longer fits",
      "Listening systems integrate feedback from inside and outside the organization",
    ],
    evidence: [
      "Purpose statements tied to decision criteria",
      "Strategic review notes, pivots, or change logs",
      "Records showing stopped or changed work when it no longer fit",
      "Feedback systems that influence direction",
    ],
    watchFor: "Purpose frozen as dogma, disagreement treated as disloyalty, reputation-driven strategy, or sunk-cost decision-making.",
    references: ["Buurtzorg", "Patagonia", "Purpose-led B Corps and steward-owned firms"],
    referenceNote:
      "Evolutionary purpose is evident when change is metabolized through governance and practice, not resisted as a threat to identity.",
  },
];

export const publicStandards = [
  {
    title: "Core operating standard",
    publicName: "The three Teal non-negotiables",
    summary:
      "A regenerative organization must show self-organization, wholeness, and evolutionary purpose together. One strong principle cannot cover for a missing one.",
    publicUse: "Use this to understand the minimum conditions before a Teal claim should be trusted.",
  },
  {
    title: "Evidence standard",
    publicName: "What counts as evidence",
    summary:
      "A story can help people care, but evidence is what makes a public claim safer to trust. Reviewers look for roles, decisions, agreements, conflict practices, purpose records, and examples under real load.",
    publicUse: "Use this to prepare evidence, read public listings, or see why a claim may be limited.",
  },
  {
    title: "Public claim standard",
    publicName: "What a badge may and may not say",
    summary:
      "Every public claim must state the current status, scope, review basis, date, limits, and whether Teal Registry has independently reviewed it.",
    publicUse: "Use this to avoid overstating a listing, credential, framework, or training claim.",
  },
  {
    title: "Independence standard",
    publicName: "Standards stay separate from training and sales",
    summary:
      "Training, consulting, sponsorship, or enhanced visibility may help someone prepare, but none of those can grant or influence verification status.",
    publicUse: "Use this to understand why credibility depends on clean boundaries.",
  },
];

export const standardsUseCases = [
  {
    title: "Listing",
    body: "A profile can organize public information, but it must not imply certification unless a review decision exists.",
  },
  {
    title: "Training and implementation",
    body: "Education can help teams build capacity. It does not prove the operating system has changed.",
  },
  {
    title: "Verification",
    body: "Claims are reviewed against evidence, not rhetoric, aesthetics, popularity, or intention.",
  },
  {
    title: "Continuous refinement",
    body: "Standards evolve as practice evolves, but current public records must stay clear and traceable.",
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