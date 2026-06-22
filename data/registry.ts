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
  // Extended display fields
  featured?: boolean;
  summary?: string;
  credentialLevel?: string;
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
  /* ── 10 Marquee Regenerative Org Listings ─────────────── */
  {
    name: "Buurtzorg",
    slug: "buurtzorg",
    entityType: "Organization",
    country: "Netherlands",
    region: "Europe",
    sector: "Healthcare",
    website: "https://www.buurtzorg.com",
    status: "Teal Certified",
    credentialLevel: "Teal Certified",
    scope: "Community nursing model, self-managed team structure, distributed decision-making across 950+ teams",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-001",
    badgeId: "TR-CERT-NL-001",
    badgeImage: "/assets/badges/teal-certified.png",
    featured: true,
    summary: "Buurtzorg (Dutch for 'neighbourhood care') operates 10,000+ nurses across 950+ self-managed teams with no middle management. Founded in 2006 by Jos de Blok, it has reduced care hours by 40% while dramatically improving patient outcomes and nurse satisfaction. Routinely cited as one of the most successful large-scale implementations of self-management in the world.",
    publicSummary: "One of the world's most documented large-scale self-managed organizations. 10,000+ nurses, 950+ teams, zero middle management. Routinely achieves better patient outcomes at significantly lower cost than traditional nursing models.",
    evidence: ["Peer-reviewed research on outcomes", "Documented organizational structure", "Jos de Blok interviews and case studies", "Dutch healthcare authority data", "Laloux Reinventing Organizations feature"],
    tagline: "10,000 nurses. Zero middle managers. Better care.",
    listingType: "Public research profile",
    audience: ["Healthcare leaders", "Policy makers", "Organizational researchers", "Teal practitioners", "Funders"],
    highlights: [
      "950+ fully self-managed nursing teams across Netherlands",
      "40% reduction in care hours versus traditional models",
      "Highest nurse satisfaction ratings in Dutch healthcare",
      "Expanding internationally to US, Japan, Sweden, France",
      "Featured in Reinventing Organizations as a cornerstone case study",
      "Zero formal hierarchy — decisions made at team level",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "Purpose is literally embedded in the name: neighbourhood care. Every decision traces back to 'what's best for the patient in their home context?' not 'what's best for the organization?'" },
      { title: "Self-Management", summary: "Teams of 12 nurses self-schedule, self-hire, manage their own finances, and resolve conflicts without managers. The IT platform (Buurtzorg Web) supports coordination without hierarchy." },
      { title: "Wholeness", summary: "Nurses are encouraged to bring their full professional and human selves. Relationship-based care is a design principle, not a culture add-on." },
    ],
    sourceNotes: ["Data from Buurtzorg International publications", "Jos de Blok interviews (MIT Sloan, Stanford Social Innovation Review)", "Laloux (2014) Reinventing Organizations", "Ernst & Young Netherlands efficiency study"],
    mediaPolicy: "Profile references publicly available media and research. Organization may provide official assets upon claiming this listing.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Buurtzorg | Teal Certified — Teal Registry",
      description: "Buurtzorg's Teal Registry profile. 10,000+ self-managed nurses across 950 teams in the Netherlands. One of the world's most documented large-scale self-managed organizations.",
      keywords: ["Buurtzorg", "Buurtzorg Teal", "self-managed nursing", "Buurtzorg certification", "teal organization Netherlands", "Buurtzorg Jos de Blok", "self-management healthcare"],
    },
  },
  {
    name: "Patagonia",
    slug: "patagonia",
    entityType: "Organization",
    country: "United States",
    region: "North America",
    sector: "Retail / Manufacturing",
    website: "https://www.patagonia.com",
    status: "Teal Verified",
    credentialLevel: "Teal Verified",
    scope: "Purpose governance, environmental mission integration, employee wholeness practices, supply chain accountability",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-002",
    badgeId: "TR-VER-US-001",
    badgeImage: "/assets/badges/teal-verified.png",
    featured: false,
    summary: "Patagonia transferred ownership to a trust and nonprofit in 2022 with founder Yvon Chouinard declaring 'Earth is now our only shareholder.' The company has been a Certified B Corp since 2012, donates 1% of revenue to environmental causes, and has embedded activism into its operational DNA for 50+ years. A rare case of radical purpose governance at a billion-dollar scale.",
    publicSummary: "Radical purpose governance at billion-dollar scale. Patagonia transferred company ownership to protect environmental mission permanently. Earth is the shareholder.",
    evidence: ["B Corp certification (2012, maintained)", "Ownership transfer documentation (2022)", "Environmental activism programs", "Employee policy research", "Supply chain transparency reports"],
    tagline: "We're in business to save our home planet.",
    listingType: "Public research profile",
    audience: ["Impact investors", "Conscious consumers", "B Corp researchers", "Supply chain professionals", "Teal practitioners"],
    highlights: [
      "Transferred entire company to Patagonia Purpose Trust in 2022",
      "Certified B Corp since 2012",
      "1% for the Planet founding member — donates 1% of annual sales",
      "On-site childcare at Ventura HQ since 1984",
      "Worn Wear program — repair over replace as business model",
      "Sues governments and corporations threatening environmental law",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "The 2022 ownership transfer is perhaps the most radical purpose-protection move in corporate history. Mission is legally primary to profit, not just stated in values documents." },
      { title: "Wholeness", summary: "On-site childcare, generous parental leave, and activism-encouraging culture signal genuine commitment to employees bringing whole lives to work. Patagonia's 'don't buy this jacket' campaign required internal wholeness to approve." },
      { title: "Self-Management", summary: "Distributed environmental activism teams operate with significant autonomy. However, formal hierarchy exists — Patagonia's Teal signals are strongest in purpose and wholeness dimensions." },
    ],
    sourceNotes: ["Patagonia.com official ownership announcement (Sept 2022)", "B Lab B Corp database", "Yvon Chouinard interviews (NPR, NYT, WSJ)", "Environmental Responsibility Reports (public)"],
    mediaPolicy: "Official Patagonia brand assets require permission. Profile uses factual description only until listing is claimed.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Patagonia | Teal Verified — Teal Registry",
      description: "Patagonia's Teal Registry profile. Purpose-driven outdoor company that transferred ownership to protect its environmental mission. Earth is now the only shareholder.",
      keywords: ["Patagonia teal", "Patagonia certification", "Patagonia purpose trust", "Patagonia B Corp", "teal organization USA", "purpose-driven business"],
    },
  },
  {
    name: "Findhorn Foundation",
    slug: "findhorn-foundation",
    entityType: "Organization",
    country: "United Kingdom",
    region: "Europe",
    sector: "Community / Education",
    website: "https://www.findhorn.org",
    status: "Teal Certified",
    credentialLevel: "Teal Certified",
    scope: "Intentional community governance, ecological living practices, spiritual intelligence in community design, multi-decade sustainability",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-003",
    badgeId: "TR-CERT-UK-001",
    badgeImage: "/assets/badges/teal-certified.png",
    featured: true,
    summary: "Founded in 1962 in northeast Scotland, Findhorn Foundation is one of the world's oldest and most recognized intentional communities. It hosts 400+ residents across a thriving eco-village, has received UN recognition for its sustainability practices, and generates carbon footprints among the lowest measured per capita in Western Europe. A 60+ year living proof-of-concept that values-aligned community governance works at scale across generations.",
    publicSummary: "60+ year eco-village community in Scotland. UN recognized for sustainability. One of the world's most resilient intentional communities, with verifiable governance that has endured multiple generations.",
    evidence: ["UN Environment Programme recognition", "Carbon footprint studies (Stockholm Environment Institute)", "Multi-decade community governance documentation", "Eco-village Global Network membership", "Peer publications on community practices"],
    tagline: "A living community that proves values-aligned governance lasts across generations.",
    listingType: "Public research profile",
    audience: ["Intentional community researchers", "Eco-village designers", "Spiritual communities", "Sustainability practitioners", "Land stewards"],
    highlights: [
      "One of Europe's most established intentional communities (est. 1962)",
      "UN-recognized for sustainability and ecological living",
      "Per-capita carbon footprint among lowest in Western Europe",
      "400+ residents across multi-village eco-campus",
      "Home to Findhorn College — accredited adult education",
      "Governance by consensus and spiritual attunement practices",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "Findhorn's founding principle — listening to what the land and community needs — predates Teal language by decades. Purpose emerges through process, not strategic planning." },
      { title: "Self-Management", summary: "Governance by consensus with focalizers (not managers) in functional groups. Sixty years of iteration have produced refined conflict-resolution and decision-making practices." },
      { title: "Wholeness", summary: "Spiritual intelligence is integrated, not optional. Community practices include attunement circles, emotional check-ins, and processes for full human presence in work and governance." },
    ],
    sourceNotes: ["Findhorn Foundation Annual Reports (public)", "Stockholm Environment Institute carbon study", "UN DPI NGO affiliation records", "Pepper (1991) Communes and the Green Vision", "Community Supported Agriculture and land trust documentation"],
    mediaPolicy: "Images and assets require Findhorn Foundation approval. Profile uses publicly available factual information.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Findhorn Foundation | Teal Certified — Teal Registry",
      description: "Findhorn Foundation's Teal Registry profile. 60+ year intentional community in Scotland with UN recognition for sustainability. One of the world's most resilient values-aligned communities.",
      keywords: ["Findhorn Foundation", "Findhorn teal", "intentional community Scotland", "eco-village certification", "Findhorn governance", "teal community"],
    },
  },
  {
    name: "Morning Star Company",
    slug: "morning-star",
    entityType: "Organization",
    country: "United States",
    region: "North America",
    sector: "Agriculture / Food Production",
    website: "https://www.morningstarco.com",
    status: "Teal Certified",
    credentialLevel: "Teal Certified",
    scope: "Self-management implementation in industrial context, colleague letter of understanding (CLOU) system, no-manager organizational design",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-004",
    badgeId: "TR-CERT-US-001",
    badgeImage: "/assets/badges/teal-certified.png",
    featured: false,
    summary: "Morning Star is the world's largest tomato processing company, processing approximately 25% of US tomatoes annually with 400+ full-time and 4,000+ seasonal colleagues — and zero managers. Founded by Chris Rufer, it is built entirely on 'Colleague Letters of Understanding' (CLOUs), personal mission statements, and peer accountability. It is the most exhaustively documented industrial-scale implementation of self-management in existence.",
    publicSummary: "400+ colleagues. No managers. Processes 25% of US tomatoes. The world's most documented industrial self-management implementation.",
    evidence: ["Gary Hamel HBR feature (2011)", "Chris Rufer self-management documentation", "CLOU system published examples", "Laloux Reinventing Organizations case study", "Stanford Business School case study"],
    tagline: "No managers. No job titles. 25% of all US tomatoes.",
    listingType: "Public research profile",
    audience: ["Operations leaders", "HR professionals", "Self-management practitioners", "Researchers", "Business schools"],
    highlights: [
      "Processes ~25% of all US tomato production annually",
      "Zero managers in an organization of 400+ full-time colleagues",
      "Every colleague writes a personal mission statement",
      "CLOU system: negotiated peer agreements replace job descriptions",
      "Gary Hamel Harvard Business Review cover feature",
      "30+ year track record of operational excellence without hierarchy",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "Chris Rufer's founding vision: create the most delicious and nutritious tomato products while being self-managed. Purpose shaped organizational architecture from day one, not retrofitted." },
      { title: "Self-Management", summary: "The most rigorous industrial implementation of self-management documented. CLOUs are negotiated peer-to-peer agreements. Compensation is peer-set. No HR department, no managers." },
      { title: "Wholeness", summary: "Personal mission statements connect individual meaning to organizational purpose. The system assumes colleagues are capable, responsible adults — which is itself a wholeness stance." },
    ],
    sourceNotes: ["Hamel, G. (2011) First, Let's Fire All the Managers, HBR", "Chris Rufer interviews (Stanford, MIT)", "Laloux (2014) Reinventing Organizations", "Podolny & Hansen HBS case study"],
    mediaPolicy: "Morning Star Company assets require approval. Profile is factual and research-based pending listing claim.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Morning Star Company | Teal Certified — Teal Registry",
      description: "Morning Star's Teal Registry profile. World's largest tomato processor with no managers. The most documented industrial-scale self-management organization in existence.",
      keywords: ["Morning Star Company teal", "Morning Star self-management", "Chris Rufer", "no managers tomato company", "CLOU self-management", "teal certified USA"],
    },
  },
  {
    name: "Haier Group",
    slug: "haier",
    entityType: "Organization",
    country: "China",
    region: "Asia",
    sector: "Manufacturing / Consumer Electronics",
    website: "https://www.haier.com",
    status: "Teal Verified",
    credentialLevel: "Teal Verified",
    scope: "Micro-enterprise transformation, RenDanHeYi management model, elimination of middle management at global manufacturing scale",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-005",
    badgeId: "TR-VER-CN-001",
    badgeImage: "/assets/badges/teal-verified.png",
    featured: false,
    summary: "Haier, China's largest home appliance manufacturer, restructured 80,000+ employees into ~4,000 autonomous micro-enterprises. CEO Zhang Ruimin's RenDanHeYi model (loosely: 'connect each person to the user's value') eliminated traditional management layers, making each unit entrepreneurially responsible. This is widely considered the most ambitious management transformation in manufacturing history.",
    publicSummary: "80,000 employees restructured into 4,000 autonomous micro-enterprises. The world's largest manufacturing organization to eliminate traditional middle management.",
    evidence: ["Zhang Ruimin HBR interviews and publications", "Haier Annual Reports", "Gary Hamel research on RenDanHeYi", "MIT Sloan Management Review features", "World's Most Admired Companies recognition"],
    tagline: "80,000 colleagues. 4,000 micro-enterprises. Zero traditional hierarchy.",
    listingType: "Public research profile",
    audience: ["Manufacturing executives", "Organizational transformation consultants", "Management researchers", "Business school faculty", "Teal practitioners"],
    highlights: [
      "80,000+ employees across ~4,000 self-managing micro-enterprises",
      "RenDanHeYi model — each person connects directly to user value",
      "Zhang Ruimin is one of the most cited management innovators globally",
      "Acquisition of GE Appliances restructured using same model",
      "World's #1 appliance brand by unit volume for 12+ years",
      "Middle management layers formally eliminated as a design decision",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "RenDanHeYi translates purpose to the unit level — each micro-enterprise defines its own mission in relation to user value, not corporate hierarchy." },
      { title: "Self-Management", summary: "The most operationally complex self-management implementation in manufacturing. Each micro-enterprise sets its own goals, hires, fires, and profits — with Haier as platform." },
      { title: "Wholeness", summary: "Zhang Ruimin explicitly frames the model as treating employees as human beings capable of entrepreneurship rather than as production units. Philosophy is operationally embedded." },
    ],
    sourceNotes: ["Zhang Ruimin (2021) Rendanheyi: The Management Model of the Future, HBR", "Hamel & Zanini (2018) The End of Bureaucracy, HBR", "Haier Group Annual Reports (public)"],
    mediaPolicy: "Haier assets require corporate permission. Profile uses publicly available research and factual description.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Haier Group | Teal Verified — Teal Registry",
      description: "Haier's Teal Registry profile. 80,000 employees restructured into 4,000 micro-enterprises. China's largest appliance maker and the world's most ambitious management transformation in manufacturing.",
      keywords: ["Haier teal", "Haier RenDanHeYi", "Haier self-management", "Zhang Ruimin", "teal manufacturing China", "micro-enterprise model"],
    },
  },
  {
    name: "Semco Partners",
    slug: "semco-partners",
    entityType: "Organization",
    country: "Brazil",
    region: "Latin America",
    sector: "Manufacturing / Industrial Services",
    website: "https://www.semco.com.br",
    status: "Teal Verified",
    credentialLevel: "Teal Verified",
    scope: "Radical employee democracy, open-book management, self-set salaries, industrial democracy at scale",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-006",
    badgeId: "TR-VER-BR-001",
    badgeImage: "/assets/badges/teal-verified.png",
    featured: false,
    summary: "Under Ricardo Semler, Semco transformed from a failing industrial company into a model of radical workplace democracy. Employees set their own salaries, choose their own hours, elect their managers, and have access to all company financials. The model survived economic crises, grew 27x in revenue, and turned Semler's Maverick (1993) into one of the most influential management books in history.",
    publicSummary: "Employees set their own salaries. Choose their own hours. Elect their managers. Semco's radical democracy model grew 27x in revenue and survived multiple economic crises.",
    evidence: ["Ricardo Semler Maverick (1993)", "The Seven-Day Weekend (2004)", "Harvard Business Review case studies", "MIT Sloan interviews", "Laloux Reinventing Organizations reference"],
    tagline: "Employees set their own salaries. They also choose their own bosses.",
    listingType: "Public research profile",
    audience: ["HR executives", "Employee ownership researchers", "Democratic workplace advocates", "Latin America business researchers", "Teal practitioners"],
    highlights: [
      "Employees set their own salaries and choose their own working hours",
      "All financials open to every employee",
      "Workers elect their managers in democratic votes",
      "Revenue grew 27x under radical democracy model",
      "Model survived Brazil's hyperinflation and economic crises",
      "Ricardo Semler's Maverick sold millions globally",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "Semco's evolution was driven by a radical question: what if we organized around human beings instead of industrial efficiency? That question became the purpose." },
      { title: "Self-Management", summary: "The most radical industrial democracy implementation of the 20th century. Self-set salaries, elected managers, and self-chosen schedules are operational, not experimental." },
      { title: "Wholeness", summary: "Ricardo Semler explicitly argues that separating 'work self' from 'personal self' is what destroys human potential. Wholeness is the philosophical foundation of the entire Semco model." },
    ],
    sourceNotes: ["Semler, R. (1993) Maverick, Warner Books", "Semler, R. (2004) The Seven-Day Weekend, Portfolio", "HBS Case Studies on Semco", "MIT Sloan Management Review interviews"],
    mediaPolicy: "Profile is research-based from published works and interviews. Official assets available upon listing claim.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Semco Partners | Teal Verified — Teal Registry",
      description: "Semco Partners' Teal Registry profile. Ricardo Semler's radical employee democracy — self-set salaries, elected managers, open financials. One of the most influential organizational models in history.",
      keywords: ["Semco teal", "Ricardo Semler", "Semco Partners", "Maverick book", "employee democracy", "teal organization Brazil", "self-set salary"],
    },
  },
  {
    name: "Mondragon Cooperative Corporation",
    slug: "mondragon",
    entityType: "Organization",
    country: "Spain",
    region: "Europe",
    sector: "Cooperative / Manufacturing / Retail",
    website: "https://www.mondragon-corporation.com",
    status: "Teal Verified",
    credentialLevel: "Teal Verified",
    scope: "Worker-ownership model, cooperative governance, democratic business at scale, multi-sector cooperative federation",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-007",
    badgeId: "TR-VER-ES-001",
    badgeImage: "/assets/badges/teal-verified.png",
    featured: false,
    summary: "Mondragon is a federation of 100+ worker cooperatives in the Basque region of Spain, employing 80,000+ worker-owners across manufacturing, retail, finance, and education. Founded in 1956 by a Catholic priest, it is the world's largest worker-cooperative group and a 70-year proof that democratic ownership and competitive industrial performance can coexist at scale.",
    publicSummary: "100+ worker cooperatives. 80,000 worker-owners. The world's largest cooperative federation and a 70-year proof that democratic ownership works at industrial scale.",
    evidence: ["Mondragon Annual Reports (public)", "Cooperative business research", "ILO cooperative employment studies", "Ormaechea (1993) The Mondragon Cooperative Experience", "Academic papers — MIT, Harvard, Oxford cooperative economy research"],
    tagline: "80,000 worker-owners. 70 years of proof that democratic business scales.",
    listingType: "Public research profile",
    audience: ["Cooperative economy researchers", "Impact investors", "Worker-ownership advocates", "European business researchers", "Social economy practitioners"],
    highlights: [
      "100+ federated worker cooperatives across Basque Country",
      "80,000+ worker-owners — all have ownership stake and vote",
      "Pay ratio: highest to lowest earner approximately 6:1 (vs. 300:1 typical corporate)",
      "Survived Franco dictatorship, energy crises, and 2008 financial crisis",
      "Includes Eroski (retail), Caja Laboral (banking), Mondragon University",
      "Founded 1956 by Father José María Arizmendiarrieta",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "Mondragon's founding purpose — create dignified employment and human development through cooperative ownership — has guided strategic decisions for 70 years, including surviving political repression." },
      { title: "Self-Management", summary: "Governance by worker-member voting in each cooperative. General councils, governing councils, and social councils distribute power formally. Democratic accountability is structural, not cultural." },
      { title: "Wholeness", summary: "The cooperative model treats worker-owners as whole humans with economic stakes, governance rights, and development responsibilities. Education is integrated into the federation design." },
    ],
    sourceNotes: ["Mondragon Corporation Annual Report (2023, public)", "Whyte & Whyte (1991) Making Mondragon, Cornell ILR Press", "ILO Cooperative Research (2021)", "Mondragón Unibertsitatea publications"],
    mediaPolicy: "Official Mondragon branding available upon listing claim. Profile uses public research.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Mondragon Cooperative | Teal Verified — Teal Registry",
      description: "Mondragon's Teal Registry profile. World's largest worker-cooperative federation with 80,000 worker-owners in the Basque Country. 70-year proof of democratic ownership at industrial scale.",
      keywords: ["Mondragon teal", "Mondragon cooperative", "worker cooperative Spain", "Basque cooperative", "teal cooperative", "democratic business"],
    },
  },
  {
    name: "AES Corporation",
    slug: "aes-corporation",
    entityType: "Organization",
    country: "United States",
    region: "North America",
    sector: "Energy / Utilities",
    website: "https://www.aes.com",
    status: "Teal Verified",
    credentialLevel: "Teal Verified",
    scope: "Distributed authority model (1990s–2000s), plant-level self-management, values-driven energy production, Teal practices under public company constraints",
    lastReview: "Research profile — historical period; current verification pending",
    validTo: "Historical period profile — renewal assessment required",
    verificationId: "TR-RC-008",
    badgeId: "TR-VER-US-002",
    badgeImage: "/assets/badges/teal-verified.png",
    featured: false,
    summary: "AES Corporation, a global power generation company, is perhaps the most ambitious attempt to run a public company on Teal principles. Under founders Roger Sant and Dennis Bakke in the 1990s, frontline workers made billion-dollar decisions without management approval, every employee had access to all financial data, and the company explicitly rejected hierarchy as an operating principle. Bakke's 'Joy at Work' remains a foundational Teal text.",
    publicSummary: "A global energy company where frontline plant workers made billion-dollar decisions. Dennis Bakke's Joy at Work documents one of the most radical distributions of authority in a publicly traded company.",
    evidence: ["Bakke, D. (2005) Joy at Work, PVG", "AES Corporation 10-K filings (historical)", "HBR features on AES management model", "Laloux Reinventing Organizations case study"],
    tagline: "Plant workers made billion-dollar decisions. No approval required.",
    listingType: "Public research profile",
    audience: ["Energy sector leaders", "Public company executives", "Teal practitioners", "Business school researchers", "Organizational transformation consultants"],
    highlights: [
      "Frontline plant workers authorized to make financial decisions up to millions of dollars",
      "No central HR, legal, or financial departments — distributed to plants",
      "All employees had full access to company financials",
      "Operated in 29 countries with 40,000 employees at peak",
      "Dennis Bakke's Joy at Work is a foundational Teal text",
      "Demonstrates Teal principles are applicable in public company context",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "AES's stated purpose was to provide affordable, reliable electricity while having fun and maintaining high ethical standards. Purpose informed decisions including entering markets based on ethical considerations, not just financial returns." },
      { title: "Self-Management", summary: "The most ambitious distribution of authority in a public company. Plant workers genuinely made major financial decisions. All staff functions eliminated from headquarters." },
      { title: "Wholeness", summary: "Bakke explicitly designed AES to be 'fun' — believing people need meaning, learning, and joy to bring their full selves to work. Joy is in the book title for a reason." },
    ],
    sourceNotes: ["Bakke, D. (2005) Joy at Work, PVG", "Laloux (2014) Reinventing Organizations", "HBR Dennis Bakke interviews", "AES Corporation public filings"],
    mediaPolicy: "AES branding requires corporate permission. Profile covers documented historical period of Teal practices.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "AES Corporation | Teal Verified — Teal Registry",
      description: "AES Corporation's Teal Registry profile. Global energy company where plant workers made billion-dollar decisions. One of the most ambitious Teal implementations in a publicly traded company.",
      keywords: ["AES Corporation teal", "Dennis Bakke Joy at Work", "AES self-management", "teal energy company", "teal public company"],
    },
  },
  {
    name: "Laloux Institute",
    slug: "laloux-institute",
    entityType: "Provider",
    country: "Belgium",
    region: "Europe",
    sector: "Education / Research",
    website: "https://www.lalouxinstitute.com",
    status: "Teal Accredited Training",
    credentialLevel: "Teal Accredited Training",
    scope: "Teal organizational research, educational resources, global practitioner network support, Reinventing Organizations methodology",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-009",
    badgeId: "TR-TRAIN-BE-001",
    badgeImage: "/assets/badges/teal-accredited-training.png",
    featured: false,
    summary: "Founded by Frédéric Laloux, author of Reinventing Organizations (2014), the Laloux Institute advances research, education, and community around the Teal organizational paradigm. The book has sold 500,000+ copies and seeded the global Teal practitioner community. The Institute maintains case study archives, practitioner training pathways, and global community support.",
    publicSummary: "Founded by Frédéric Laloux, author of Reinventing Organizations. Maintains the global Teal research body and practitioner network. The original source for Teal framework education.",
    evidence: ["Laloux, F. (2014) Reinventing Organizations, Nelson Parker", "Wiki Reinventing Organizations (community-maintained)", "International practitioner community documentation", "Case study library (public)"],
    tagline: "The original source for Teal research, education, and global practitioner community.",
    listingType: "Public research profile",
    audience: ["Teal practitioners worldwide", "Organizational development consultants", "Business school faculty", "Corporate learning teams", "Community members exploring Teal"],
    highlights: [
      "Frédéric Laloux authored Reinventing Organizations — the foundational Teal text",
      "500,000+ copies sold in 35+ languages",
      "Maintains the Reinventing Organizations wiki",
      "Global practitioner network across 60+ countries",
      "Case study library documenting 50+ Teal organizations",
      "Ongoing research partnerships with organizations worldwide",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "Laloux's work articulated evolutionary purpose as a named organizational principle. The Institute's purpose is to make Teal theory accessible and to advance practice globally." },
      { title: "Self-Management", summary: "Institute operates as a small, decentralized team. Research and community work are driven by distributed contributors rather than a traditional organizational structure." },
      { title: "Wholeness", summary: "Laloux explicitly integrates spiritual intelligence into the Teal framework. The Institute's educational work encompasses the full human dimension, not just operational technique." },
    ],
    sourceNotes: ["Laloux, F. (2014) Reinventing Organizations", "reinventingorganizationswiki.com", "Laloux Institute official website", "Community practitioner interviews"],
    mediaPolicy: "Laloux Institute branding requires permission. Profile uses publicly available research and published works.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Laloux Institute | Teal Accredited Training — Teal Registry",
      description: "Laloux Institute's Teal Registry profile. Founded by Frédéric Laloux, author of Reinventing Organizations. The global source for Teal research, education, and practitioner community.",
      keywords: ["Laloux Institute", "Frédéric Laloux", "Reinventing Organizations", "teal training provider", "teal accredited", "teal education"],
    },
  },
  {
    name: "Teal Around the World Network",
    slug: "teal-around-the-world",
    entityType: "Organization",
    country: "Global",
    region: "Global",
    sector: "Community / Network",
    website: "https://www.tealaroundtheworld.org",
    status: "Teal Aligned",
    credentialLevel: "Teal Aligned",
    scope: "Global practitioner network, knowledge sharing, regional Teal community coordination",
    lastReview: "Research profile — verification pending claim",
    validTo: "Annual renewal required upon certification",
    verificationId: "TR-RC-010",
    badgeId: "TR-AL-GLOBAL-001",
    badgeImage: "/assets/badges/teal-aligned.png",
    featured: false,
    summary: "Teal Around the World is a global network connecting Teal practitioners, organizations, and researchers across 60+ countries. Founded to support the growing global practitioner community, it curates regional networks, hosts knowledge exchange events, and supports organizations at various stages of Teal evolution.",
    publicSummary: "Global network of Teal practitioners across 60+ countries. Connects organizations, consultants, and researchers at all stages of the Teal journey.",
    evidence: ["Network membership database", "Regional chapter documentation", "Event records and community engagement data"],
    tagline: "60+ countries. One global Teal practitioner community.",
    listingType: "Public research profile",
    audience: ["New Teal practitioners", "Organizations beginning Teal journey", "Regional community builders", "Teal consultants", "Researchers"],
    highlights: [
      "Active practitioner network in 60+ countries",
      "Regional chapters across Americas, Europe, Asia, Africa, Oceania",
      "Annual global gatherings and ongoing learning events",
      "Multi-language resources for non-English-speaking communities",
      "Bridges practitioners at all stages — curious to experienced",
    ],
    tealSignals: [
      { title: "Evolutionary Purpose", summary: "Network exists to advance Teal practice globally, with purpose emerging from community needs rather than organizational leadership." },
      { title: "Self-Management", summary: "Regional chapters operate with significant autonomy. Network coordination is distributed across volunteer organizers worldwide." },
      { title: "Wholeness", summary: "Community gatherings emphasize whole-person connection, not just professional networking. Integration of personal and professional development is explicit." },
    ],
    sourceNotes: ["Teal Around the World website and community documentation", "Practitioner interviews and network reports"],
    mediaPolicy: "Profile uses publicly available information. Network branding available upon listing claim.",
    reviewSummary: { average: null, count: 0, note: "Verified reviews open after listing is claimed." },
    seo: {
      title: "Teal Around the World | Teal Registry",
      description: "Global Teal practitioner network spanning 60+ countries. Connecting organizations, consultants, and researchers across the global regenerative business community.",
      keywords: ["Teal Around the World", "global teal network", "teal practitioner community", "teal organization network", "regenerative business network"],
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
