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
  credentialLevel?: string;
  featured?: boolean;
  scope: string;
  lastReview: string;
  validTo: string;
  verificationId: string;
  badgeId: string;
  badgeImage: string;
  summary?: string;
  publicSummary: string;
  evidence: string[];
  tagline: string;
  listingType: "Verified" | "Public research profile" | "In review" | "Framework";
  audience: string[];
  highlights: string[];
  tealSignals: Array<{ title: string; summary: string }>;
  sourceNotes: string[];
  sourceLinks: Array<{ label: string; href: string }>;
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

type StarterProfileInput = {
  name: string;
  slug: string;
  entityType: DirectoryRecord["entityType"];
  country: string;
  region: string;
  sector: string;
  website: string;
  category: string;
  theme: string;
  sourceNote: string;
  keywords: string[];
};

function starterBadgeImage(entityType: DirectoryRecord["entityType"]) {
  if (entityType === "Framework") {
    return "/assets/badges/teal-recognized-framework.png";
  }

  if (entityType === "Provider") {
    return "/assets/badges/teal-accredited-training.png";
  }

  return "/assets/badges/teal-aligned.png";
}

function createStarterProfile(input: StarterProfileInput, index: number): DirectoryRecord {
  const label = `${input.name} Teal Registry public research profile`;

  return {
    name: input.name,
    slug: input.slug,
    entityType: input.entityType,
    country: input.country,
    region: input.region,
    sector: input.sector,
    website: input.website,
    status: "Public research profile",
    scope: "Discovery listing based on public information; not independently verified by Teal Registry.",
    lastReview: "Prepared for starter directory research",
    validTo: "Claim, correction, or verification needed before any badge claim",
    verificationId: `TR-PUBLIC-${String(index + 1).padStart(4, "0")}`,
    badgeId: "No badge issued",
    badgeImage: starterBadgeImage(input.entityType),
    publicSummary: `${input.name} is included as a starter ${input.category.toLowerCase()} profile because it is publicly associated with ${input.theme}. This page is designed to help funders, partners, members, and searchers understand the fit, the limits, and the next step without implying certification.`,
    evidence: [
      "Public research profile",
      "Claim not verified by Teal Registry",
      "Owner can claim, correct, or submit evidence",
    ],
    tagline: `${input.theme} profile for people comparing credible Teal, regenerative, and self-organizing work.`,
    listingType: "Public research profile",
    audience: ["Founders", "Funders", "Partners", "Prospective members", "Researchers"],
    highlights: [
      `Publicly associated with ${input.theme}`,
      "Profile structured for human readers, search engines, and answer engines",
      "Clear path to claim the listing, correct facts, add approved media, and request review",
    ],
    tealSignals: [
      {
        title: "Evolutionary Purpose",
        summary: `The public profile is organized around the stated purpose and ${input.theme.toLowerCase()}, then asks whether that purpose guides real decisions.`,
      },
      {
        title: "Self-Organization",
        summary:
          "The listing does not assume distributed power. It invites source-backed examples of decision rights, roles, governance, and accountability.",
      },
      {
        title: "Wholeness",
        summary:
          "The listing invites evidence about culture, conflict repair, care, learning, and the human experience of working or living there.",
      },
    ],
    sourceNotes: [
      input.sourceNote,
      "Teal Registry does not copy protected website text or images into starter listings. Media should be owner-provided, clearly licensed, or created as original registry graphics.",
      "This listing should be corrected or expanded by the organization before stronger claims are made.",
    ],
    sourceLinks: [{ label: `${input.name} official website`, href: input.website }],
    mediaPolicy:
      "Use owner-provided media, clearly licensed media, or original Teal Registry visuals. Do not scrape and reuse copyrighted website photography without permission.",
    reviewSummary: {
      average: null,
      count: 0,
      note:
        "Verified reviews are planned for claimed listings. Reviews should confirm real experience, relationship type, and recency before publication.",
    },
    seo: {
      title: label,
      description: `Review the ${input.name} public research profile on Teal Registry, including ${input.theme}, Teal signal questions, source notes, and claim options.`,
      keywords: [input.name, input.category, input.theme, "Teal Registry", "regenerative organization", ...input.keywords],
    },
  };
}

const starterProfileRecords: DirectoryRecord[] = [
  ...[
    {
      name: "Buurtzorg",
      slug: "buurtzorg",
      entityType: "Organization",
      country: "Netherlands",
      region: "Europe",
      sector: "Healthcare",
      website: "https://www.buurtzorg.com/",
      category: "Self-managing organization",
      theme: "neighborhood nursing teams and self-management",
      sourceNote: "Starter profile based on public information from Buurtzorg's official site and widely cited public case studies.",
      keywords: ["self management", "nursing teams", "healthcare"],
    },
    {
      name: "Morning Star",
      slug: "morning-star",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Food production",
      website: "https://www.morningstarco.com/",
      category: "Self-managing organization",
      theme: "self-management in large-scale food production",
      sourceNote: "Starter profile based on public information from Morning Star and public writing about its self-management practices.",
      keywords: ["self management", "food production", "tomato processing"],
    },
    {
      name: "Patagonia",
      slug: "patagonia",
      entityType: "Organization",
      country: "United States",
      region: "Global",
      sector: "Outdoor apparel",
      website: "https://www.patagonia.com/",
      category: "Regenerative business",
      theme: "purpose-led business and environmental responsibility",
      sourceNote: "Starter profile based on public information from Patagonia's official site and public benefit-oriented reporting.",
      keywords: ["purpose led business", "environmental responsibility", "B Corp"],
    },
    {
      name: "Dr. Bronner's",
      slug: "dr-bronners",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Consumer goods",
      website: "https://www.drbronner.com/",
      category: "Regenerative business",
      theme: "mission-led operations, fair trade, and regenerative organic agriculture",
      sourceNote: "Starter profile based on public information from Dr. Bronner's official site and public impact reporting.",
      keywords: ["regenerative organic", "fair trade", "mission led business"],
    },
    {
      name: "Ecosia",
      slug: "ecosia",
      entityType: "Organization",
      country: "Germany",
      region: "Europe",
      sector: "Technology",
      website: "https://www.ecosia.org/",
      category: "Regenerative business",
      theme: "search technology funding tree planting and climate action",
      sourceNote: "Starter profile based on public information from Ecosia's official site and public impact disclosures.",
      keywords: ["climate tech", "tree planting", "search engine"],
    },
    {
      name: "Interface",
      slug: "interface",
      entityType: "Organization",
      country: "United States",
      region: "Global",
      sector: "Manufacturing",
      website: "https://www.interface.com/",
      category: "Regenerative business",
      theme: "sustainability transformation in commercial flooring",
      sourceNote: "Starter profile based on public information from Interface's official site and sustainability materials.",
      keywords: ["sustainable manufacturing", "climate", "flooring"],
    },
    {
      name: "Guayaki Yerba Mate",
      slug: "guayaki-yerba-mate",
      entityType: "Organization",
      country: "United States",
      region: "Americas",
      sector: "Food and beverage",
      website: "https://guayaki.com/",
      category: "Regenerative business",
      theme: "market-driven regeneration and rainforest-linked supply chains",
      sourceNote: "Starter profile based on public information from Guayaki's official site and public marketplace materials.",
      keywords: ["regenerative supply chain", "yerba mate", "rainforest"],
    },
    {
      name: "Sounds True",
      slug: "sounds-true",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Publishing and education",
      website: "https://www.soundstrue.com/",
      category: "Purpose-led organization",
      theme: "inner development, learning, and purpose-led publishing",
      sourceNote: "Starter profile based on public information from Sounds True and public writing about purpose-centered organizations.",
      keywords: ["purpose led", "learning", "publishing"],
    },
    {
      name: "Semco Partners",
      slug: "semco-partners",
      entityType: "Organization",
      country: "Brazil",
      region: "South America",
      sector: "Business group",
      website: "https://semcopartners.com/",
      category: "Self-managing organization",
      theme: "participatory management and workplace democracy",
      sourceNote: "Starter profile based on public information from Semco and public materials about participatory management.",
      keywords: ["workplace democracy", "participatory management", "self management"],
    },
    {
      name: "Zingerman's Community of Businesses",
      slug: "zingermans-community-of-businesses",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Food and hospitality",
      website: "https://www.zingermanscommunity.com/",
      category: "Purpose-led organization",
      theme: "visioning, open-book management, and community business practices",
      sourceNote: "Starter profile based on public information from Zingerman's Community of Businesses.",
      keywords: ["open book management", "visioning", "community business"],
    },
  ],
  ...[
    {
      name: "Auroville",
      slug: "auroville",
      entityType: "Organization",
      country: "India",
      region: "Asia",
      sector: "Intentional community",
      website: "https://auroville.org/",
      category: "Intentional community",
      theme: "international intentional community and human unity experiment",
      sourceNote: "Starter profile based on public information from Auroville's official site.",
      keywords: ["intentional community", "ecovillage", "human unity"],
    },
    {
      name: "Findhorn Ecovillage",
      slug: "findhorn-ecovillage",
      entityType: "Organization",
      country: "Scotland",
      region: "Europe",
      sector: "Ecovillage",
      website: "https://www.findhorn.org/",
      category: "Intentional community",
      theme: "ecovillage living, education, and spiritual community",
      sourceNote: "Starter profile based on public information from Findhorn-related official channels.",
      keywords: ["ecovillage", "intentional community", "education"],
    },
    {
      name: "Damanhur",
      slug: "damanhur",
      entityType: "Organization",
      country: "Italy",
      region: "Europe",
      sector: "Ecovillage",
      website: "https://damanhur.org/",
      category: "Intentional community",
      theme: "federation community, art, spirituality, and ecological living",
      sourceNote: "Starter profile based on public information from Damanhur's official site.",
      keywords: ["ecovillage", "intentional community", "spiritual community"],
    },
    {
      name: "Tamera Peace Research and Education Center",
      slug: "tamera",
      entityType: "Organization",
      country: "Portugal",
      region: "Europe",
      sector: "Peace research community",
      website: "https://www.tamera.org/",
      category: "Intentional community",
      theme: "peace research, water retention landscapes, and community experimentation",
      sourceNote: "Starter profile based on public information from Tamera's official site.",
      keywords: ["peace research", "water retention", "intentional community"],
    },
    {
      name: "Dancing Rabbit Ecovillage",
      slug: "dancing-rabbit-ecovillage",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Ecovillage",
      website: "https://www.dancingrabbit.org/",
      category: "Intentional community",
      theme: "sustainable village living and ecological experimentation",
      sourceNote: "Starter profile based on public information from Dancing Rabbit Ecovillage.",
      keywords: ["ecovillage", "sustainable living", "intentional community"],
    },
    {
      name: "Twin Oaks Community",
      slug: "twin-oaks-community",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Intentional community",
      website: "https://www.twinoaks.org/",
      category: "Intentional community",
      theme: "income-sharing intentional community and cooperative living",
      sourceNote: "Starter profile based on public information from Twin Oaks Community.",
      keywords: ["income sharing", "intentional community", "cooperative living"],
    },
    {
      name: "Earthaven Ecovillage",
      slug: "earthaven-ecovillage",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Ecovillage",
      website: "https://www.earthaven.org/",
      category: "Intentional community",
      theme: "permaculture, village building, and ecological living",
      sourceNote: "Starter profile based on public information from Earthaven Ecovillage.",
      keywords: ["permaculture", "ecovillage", "intentional community"],
    },
    {
      name: "Svanholm",
      slug: "svanholm",
      entityType: "Organization",
      country: "Denmark",
      region: "Europe",
      sector: "Intentional community",
      website: "https://www.svanholm.dk/",
      category: "Intentional community",
      theme: "large-scale intentional community, organic farming, and shared resources",
      sourceNote: "Starter profile based on public information from Svanholm.",
      keywords: ["organic farming", "intentional community", "shared economy"],
    },
    {
      name: "Sieben Linden Ecovillage",
      slug: "sieben-linden-ecovillage",
      entityType: "Organization",
      country: "Germany",
      region: "Europe",
      sector: "Ecovillage",
      website: "https://siebenlinden.org/",
      category: "Intentional community",
      theme: "ecovillage education, low-impact living, and community practice",
      sourceNote: "Starter profile based on public information from Sieben Linden.",
      keywords: ["ecovillage", "low impact living", "community education"],
    },
    {
      name: "Los Angeles Eco-Village",
      slug: "los-angeles-eco-village",
      entityType: "Organization",
      country: "United States",
      region: "North America",
      sector: "Urban ecovillage",
      website: "https://laecovillage.org/",
      category: "Intentional community",
      theme: "urban ecovillage, cooperative culture, and neighborhood regeneration",
      sourceNote: "Starter profile based on public information from Los Angeles Eco-Village.",
      keywords: ["urban ecovillage", "cooperative culture", "Los Angeles"],
    },
  ],
  ...[
    {
      name: "Sociocracy For All",
      slug: "sociocracy-for-all",
      entityType: "Provider",
      country: "Global",
      region: "Global",
      sector: "Governance education",
      website: "https://www.sociocracyforall.org/",
      category: "Training provider",
      theme: "sociocracy education, consent decision-making, and distributed governance",
      sourceNote: "Starter profile based on public information from Sociocracy For All.",
      keywords: ["sociocracy", "governance training", "consent decision making"],
    },
    {
      name: "HolacracyOne",
      slug: "holacracyone",
      entityType: "Provider",
      country: "United States",
      region: "Global",
      sector: "Self-management implementation",
      website: "https://www.holacracy.org/",
      category: "Implementation provider",
      theme: "Holacracy training, implementation, and role-based self-management",
      sourceNote: "Starter profile based on public information from Holacracy's official site.",
      keywords: ["Holacracy", "self management", "roles"],
    },
    {
      name: "Enspiral",
      slug: "enspiral",
      entityType: "Provider",
      country: "New Zealand",
      region: "Oceania",
      sector: "Networked organization",
      website: "https://enspiral.com/",
      category: "Practice network",
      theme: "networked organizing, shared resources, and social impact ventures",
      sourceNote: "Starter profile based on public information from Enspiral.",
      keywords: ["networked organization", "social enterprise", "self organization"],
    },
    {
      name: "Greaterthan",
      slug: "greaterthan",
      entityType: "Provider",
      country: "Global",
      region: "Global",
      sector: "Organizational consulting",
      website: "https://www.greaterthan.works/",
      category: "Implementation provider",
      theme: "participatory organizing, distributed leadership, and governance support",
      sourceNote: "Starter profile based on public information from Greaterthan.",
      keywords: ["distributed leadership", "participatory organizing", "governance"],
    },
    {
      name: "The Ready",
      slug: "the-ready",
      entityType: "Provider",
      country: "United States",
      region: "Global",
      sector: "Organizational transformation",
      website: "https://www.theready.com/",
      category: "Implementation provider",
      theme: "future-of-work transformation and adaptive operating systems",
      sourceNote: "Starter profile based on public information from The Ready.",
      keywords: ["future of work", "adaptive organization", "organizational design"],
    },
    {
      name: "Corporate Rebels",
      slug: "corporate-rebels",
      entityType: "Provider",
      country: "Netherlands",
      region: "Global",
      sector: "Workplace transformation",
      website: "https://www.corporate-rebels.com/",
      category: "Education provider",
      theme: "progressive workplaces, learning journeys, and workplace inspiration",
      sourceNote: "Starter profile based on public information from Corporate Rebels.",
      keywords: ["progressive workplaces", "workplace innovation", "future of work"],
    },
    {
      name: "NOBL",
      slug: "nobl",
      entityType: "Provider",
      country: "United States",
      region: "Global",
      sector: "Organizational design",
      website: "https://nobl.io/",
      category: "Implementation provider",
      theme: "organizational design, change, and team effectiveness",
      sourceNote: "Starter profile based on public information from NOBL.",
      keywords: ["organizational design", "change management", "team effectiveness"],
    },
    {
      name: "Percolab",
      slug: "percolab",
      entityType: "Provider",
      country: "Canada",
      region: "Global",
      sector: "Participatory design",
      website: "https://www.percolab.com/",
      category: "Practice provider",
      theme: "participatory leadership, collaboration, and social innovation",
      sourceNote: "Starter profile based on public information from Percolab.",
      keywords: ["participatory leadership", "social innovation", "collaboration"],
    },
    {
      name: "Encode.org",
      slug: "encode-org",
      entityType: "Provider",
      country: "Global",
      region: "Global",
      sector: "Legal and governance design",
      website: "https://encode.org/",
      category: "Governance provider",
      theme: "legal, financial, and governance patterns for purpose-driven organizations",
      sourceNote: "Starter profile based on public information from Encode.org.",
      keywords: ["governance", "legal design", "purpose driven organizations"],
    },
    {
      name: "Reinventing Organizations Wiki",
      slug: "reinventing-organizations-wiki",
      entityType: "Provider",
      country: "Global",
      region: "Global",
      sector: "Knowledge commons",
      website: "https://reinventingorganizationswiki.com/",
      category: "Knowledge resource",
      theme: "public learning resources for Teal and self-managing organizations",
      sourceNote: "Starter profile based on public information from the Reinventing Organizations Wiki.",
      keywords: ["Teal organizations", "self management", "knowledge commons"],
    },
  ],
  ...[
    {
      name: "Sociocracy",
      slug: "sociocracy",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Governance framework",
      website: "https://www.sociocracyforall.org/sociocracy/",
      category: "Framework",
      theme: "consent decision-making, circles, and distributed governance",
      sourceNote: "Starter profile based on public sociocracy education materials.",
      keywords: ["sociocracy", "consent", "circle governance"],
    },
    {
      name: "Holacracy",
      slug: "holacracy",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Self-management framework",
      website: "https://www.holacracy.org/",
      category: "Framework",
      theme: "role-based self-management and governance practice",
      sourceNote: "Starter profile based on public information from Holacracy's official site.",
      keywords: ["Holacracy", "roles", "self management"],
    },
    {
      name: "Sociocracy 3.0",
      slug: "sociocracy-3-0",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Governance pattern library",
      website: "https://sociocracy30.org/",
      category: "Framework",
      theme: "patterns for effective collaboration and organizational agility",
      sourceNote: "Starter profile based on public information from Sociocracy 3.0.",
      keywords: ["S3", "collaboration patterns", "organizational agility"],
    },
    {
      name: "Nonviolent Communication",
      slug: "nonviolent-communication",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Communication framework",
      website: "https://www.cnvc.org/",
      category: "Framework",
      theme: "needs-based communication, conflict repair, and human connection",
      sourceNote: "Starter profile based on public information from the Center for Nonviolent Communication.",
      keywords: ["NVC", "conflict repair", "communication"],
    },
    {
      name: "Permaculture",
      slug: "permaculture",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Regenerative design",
      website: "https://permacultureprinciples.com/",
      category: "Framework",
      theme: "regenerative design ethics and whole-system land practice",
      sourceNote: "Starter profile based on public permaculture principle resources.",
      keywords: ["permaculture", "regenerative design", "land stewardship"],
    },
    {
      name: "B Corp Certification",
      slug: "b-corp-certification",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Business accountability",
      website: "https://www.bcorporation.net/",
      category: "Framework",
      theme: "stakeholder governance and social-environmental business accountability",
      sourceNote: "Starter profile based on public information from B Lab.",
      keywords: ["B Corp", "stakeholder governance", "business accountability"],
    },
    {
      name: "Regenerative Organic Certified",
      slug: "regenerative-organic-certified",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Agriculture certification",
      website: "https://regenorganic.org/",
      category: "Framework",
      theme: "soil health, animal welfare, and farmworker fairness",
      sourceNote: "Starter profile based on public information from Regenerative Organic Alliance.",
      keywords: ["regenerative organic", "soil health", "agriculture certification"],
    },
    {
      name: "Dragon Dreaming",
      slug: "dragon-dreaming",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Project design",
      website: "https://dragondreaming.org/",
      category: "Framework",
      theme: "collaborative project design, community building, and celebration",
      sourceNote: "Starter profile based on public information from Dragon Dreaming resources.",
      keywords: ["project design", "collaboration", "community building"],
    },
    {
      name: "Art of Hosting",
      slug: "art-of-hosting",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Participatory leadership",
      website: "https://artofhosting.org/",
      category: "Framework",
      theme: "participatory leadership, meaningful conversation, and collective intelligence",
      sourceNote: "Starter profile based on public information from Art of Hosting.",
      keywords: ["participatory leadership", "collective intelligence", "hosting"],
    },
    {
      name: "Doughnut Economics",
      slug: "doughnut-economics",
      entityType: "Framework",
      country: "Global",
      region: "Global",
      sector: "Economic framework",
      website: "https://doughnuteconomics.org/",
      category: "Framework",
      theme: "social foundation and ecological ceiling for regenerative economics",
      sourceNote: "Starter profile based on public information from Doughnut Economics Action Lab.",
      keywords: ["regenerative economics", "social foundation", "ecological ceiling"],
    },
  ],
].map((record, index) => createStarterProfile(record as StarterProfileInput, index));

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
    sourceLinks: [{ label: "Example source placeholder", href: "https://example.com/riverbend-commons" }],
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
    sourceLinks: [
      { label: "Example source placeholder", href: "https://example.com/northstar-implementation-team" },
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
    sourceLinks: [{ label: "Teal Registry standards", href: "/standards" }],
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
  ...starterProfileRecords,
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
