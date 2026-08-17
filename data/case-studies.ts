export type CaseStudy = {
  slug: string;
  name: string;
  category: "Land project" | "Cohousing" | "Ecovillage" | "Business" | "Cooperative";
  location: string;
  yearStarted: string;
  scale: string;
  proofLevel: "Explicit sociocracy" | "Documented self-management" | "Regenerative self-governance";
  directorySlug: string;
  website?: string;
  shortProof: string;
  skepticHook: string;
  thesis: string;
  transformation: string;
  whyItMatters: string;
  outcomes: string[];
  tealPrinciples: Array<{
    principle: "Evolutionary Purpose" | "Self-Organization" | "Wholeness";
    plainMeaning: string;
    evidence: string;
  }>;
  antiPattern: string;
  caveat: string;
  sources: Array<{ label: string; href: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "arterra-bizimodu",
    name: "Arterra Bizimodu",
    category: "Ecovillage",
    location: "Artieda, Navarra, Spain",
    yearStarted: "2014",
    scale: "Intentional community, former rural hotel, shared spaces, land, livelihood projects",
    proofLevel: "Explicit sociocracy",
    directorySlug: "arterra-bizimodu",
    website: "https://arterrabizimodu.org",
    shortProof:
      "A long-running ecovillage that publicly describes itself as an experiment in sociocracy and has also been the subject of a 2025 academic case study on sociocratic governance.",
    skepticHook:
      "This is the clearest contemporary land-based proof case: not a theory retreat, but a lived community with scholarship, shared property, circles, livelihood activity, and years of practice.",
    thesis:
      "Arterra shows that self-organization can hold real land, real buildings, real relationships, and real livelihood tension when people use a clear governance method instead of informal founder authority.",
    transformation:
      "The project frames itself as a response to the dominant crisis of work, housing, economy, and belonging. Instead of concentrating decisions in a founder or board, Arterra organizes common areas and collective work through circles and whole-group rhythm.",
    whyItMatters:
      "For a founder like Jess, Arterra is useful because it combines the exact ingredients that usually scare people away from self-organization: land, housing, shared economics, conflict, education, and growth.",
    outcomes: [
      "Operating since 2014 as an intentional community and ecovillage.",
      "Uses circles to manage common areas and a monthly whole-group rhythm for shared awareness.",
      "Described in academic research as a real-world lab for cooperative, sustainable living and shared governance.",
      "Connected to the wider ecovillage movement through GEN Europe activity.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "The project exists to build a different way of living, not just to own land together.",
        evidence:
          "Arterra describes its aim as exploring new economies, self-sufficiency, creativity, community, and transition culture.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Work is organized through circles, not a single command chain.",
        evidence:
          "Its own project page states that the community is experimenting with sociocracy and organizing common areas through circles.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "People are not treated only as labor or residents; the project includes personal, group, and Earth ecology.",
        evidence:
          "Arterra describes itself as a place to experiment with ecology of the Earth, groups, and people, and its model references nonviolent communication.",
      },
    ],
    antiPattern:
      "A linear hierarchy might move faster at first, but on shared land it often hides dependency: everyone waits for the founder, resentment builds, and informal power becomes harder to name. Arterra's circle model makes power visible enough to work with.",
    caveat:
      "Arterra is evidence of sociocratic practice and durability, not proof that every decision is easy or that sociocracy removes conflict.",
    sources: [
      { label: "Arterra project page", href: "https://arterrabizimodu.org/nosotras/el-proyecto/" },
      { label: "Academic case record, University of Granada", href: "https://digibug.ugr.es/handle/10481/110465" },
      { label: "REAS Navarra profile", href: "https://reasna.org/arterra-bizimodu/" },
    ],
  },
  {
    slug: "instituto-biorregional-do-cerrado-aratikum",
    name: "Instituto Biorregional do Cerrado / Aldeia Aratikum",
    category: "Land project",
    location: "Alto Paraiso de Goias, Brazil",
    yearStarted: "2012",
    scale: "120 hectares near Chapada dos Veadeiros National Park",
    proofLevel: "Explicit sociocracy",
    directorySlug: "instituto-biorregional-do-cerrado",
    website: "https://ibccerrado.wixsite.com/ibcerrado",
    shortProof:
      "A land-based institute and ecovillage project whose own materials describe sociocracy as the structure for decision-making.",
    skepticHook:
      "This is not an office experiment. It is a bioregional land project using sociocratic governance to steward conservation, community, education, and shared infrastructure.",
    thesis:
      "IBC and Aldeia Aratikum show why land stewardship needs distributed governance: the work is too relational, ecological, and long-term to be held by one central authority.",
    transformation:
      "The project combines private living areas, common spaces, preservation areas, permaculture design, and institutional programs under a governance model oriented around equivalence, transparency, and effectiveness.",
    whyItMatters:
      "For regenerative founders, this case makes the key point simple: self-organization is not a soft ideal. It is a practical operating system for land, programs, membership, and ecological responsibility.",
    outcomes: [
      "Founded as a sustainable human settlement on 120 hectares.",
      "Uses sociocratic governance principles and circles in public documentation.",
      "Connects land preservation, permaculture, education, and community life.",
      "Separates private areas from common and preservation areas, creating clearer stewardship boundaries.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "The project serves the Cerrado bioregion, not only its members.",
        evidence:
          "IBC's public material frames Aldeia Aratikum as a sustainable settlement and bioregional project next to a national park.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Decision-making is designed around circles, representatives, and consent-oriented governance.",
        evidence:
          "The governance page names sociocracy and describes circle-based structure with elected representatives.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "The project integrates human settlement, ecological care, and learning.",
        evidence:
          "Its materials connect permaculture, preservation, community living, education, and shared spaces rather than treating them as separate programs.",
      },
    ],
    antiPattern:
      "Linear hierarchy struggles in bioregional work because land decisions have long feedback loops. A top-down decision can look efficient now and become expensive later. Sociocratic circles let the people closest to each domain steward that domain with clear links to the whole.",
    caveat:
      "Public research confirms explicit sociocratic intent and structure. Teal Registry has not independently audited present-day practice.",
    sources: [
      { label: "IBC ecoaldeia page", href: "https://ibccerrado.wixsite.com/ibcerrado/ecoaldeia" },
      { label: "IBC sociocracy page", href: "https://ibccerrado.wixsite.com/ibcerrado/sociocracia" },
    ],
  },
  {
    slug: "common-ground-ecovillage",
    name: "Common Ground Ecovillage",
    category: "Land project",
    location: "Central North Carolina, United States",
    yearStarted: "2008, sociocracy adopted in 2013",
    scale: "Justice-oriented agrarian community on 112 acres",
    proofLevel: "Explicit sociocracy",
    directorySlug: "common-ground-ecovillage",
    website: "https://www.commonground.eco",
    shortProof:
      "Common Ground explicitly says it adopted sociocracy in March 2013 and explains circle governance, consent, feedback loops, equivalence, effectiveness, and transparency.",
    skepticHook:
      "This is a current-generation example of a land community naming the hard thing directly: shared power, not power over.",
    thesis:
      "Common Ground shows that self-organization is not the absence of structure. It is governance by peers, with circles, consent, feedback, and clear purpose.",
    transformation:
      "The project began as a farm-based intentional community and evolved into a justice-oriented agrarian community with governance built around peers rather than top-down control.",
    whyItMatters:
      "For land founders, Common Ground is valuable because it translates sociocracy into everyday language: shared power, alignment with purpose, communication, efficiency, and scalability.",
    outcomes: [
      "Adopted sociocracy as its governance model in March 2013.",
      "Uses circles, consent decision-making, and feedback loops.",
      "Own materials define sociocracy as governance by peers.",
      "Explicitly connects the model to shared power and alignment with purpose.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "Circles are meant to serve the community's vision and mission.",
        evidence:
          "Common Ground states that circles are focused on aims aligned with the community's vision and mission.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "People closest to the work govern by peer circles and consent.",
        evidence:
          "The governance page describes circle groups, consent decision-making, double-linked circles, and shared leadership.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "The structure is meant to include every voice and support communication and connection.",
        evidence:
          "Common Ground says every voice matters and names communication, connection, and interpersonal connection as reasons sociocracy fits.",
      },
    ],
    antiPattern:
      "The alternative to explicit shared power is usually not neutrality. It is hidden hierarchy: the loudest person, the founder, the funder, or the landowner becomes the default decision system.",
    caveat:
      "Common Ground is a strong governance architecture case. Its long-term durability should be read as still emerging compared with older communities.",
    sources: [
      { label: "Common Ground governance page", href: "https://www.commonground.eco/governance-by-peers/" },
      { label: "Common Ground story", href: "https://www.commonground.eco/our-story/" },
      { label: "Common Ground principles", href: "https://www.commonground.eco/about/principles-and-intentions/" },
    ],
  },
  {
    slug: "pioneer-valley-cohousing",
    name: "Pioneer Valley Cohousing",
    category: "Cohousing",
    location: "Amherst, Massachusetts, United States",
    yearStarted: "Formed 1989, established 1994, sociocracy adopted in 2012",
    scale: "32 homes and common house on 23 acres",
    proofLevel: "Explicit sociocracy",
    directorySlug: "pioneer-valley-cohousing",
    website: "https://www.cohousing.com",
    shortProof:
      "A mature cohousing community that moved from consensus bottlenecks into sociocracy after years of lived experience.",
    skepticHook:
      "This is the best answer to 'what if we did not design it perfectly at the start?' They evolved the governance system after the old one got stuck.",
    thesis:
      "Pioneer Valley shows that self-organization can be adopted after founding, especially when consensus starts protecting blocks instead of supporting movement.",
    transformation:
      "The community used consensus for years, then spent about a year studying and practicing sociocracy before adopting a more distributed circle and consent structure.",
    whyItMatters:
      "This case is especially useful for skeptical adults because it does not pretend community governance is automatically healthy. It shows a mature group noticing a bottleneck and changing the operating system.",
    outcomes: [
      "Operating as cohousing since the 1990s.",
      "Adopted sociocracy in 2012 after consensus had become hard to use at scale.",
      "Shows governance can evolve without starting over.",
      "Often cited in sociocracy education for intentional communities.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "The governance method changed when the community needed a better way to serve its shared life.",
        evidence:
          "The adoption process came after members experienced consensus backlogs and studied sociocracy as a practical response.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Circles and consent distribute decisions so the whole group does not become the bottleneck.",
        evidence:
          "Sociocracy for All documents the community's transition into circle governance and consent decision-making.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "Objections are treated as information, not as personal attacks or political wins.",
        evidence:
          "The transition from consensus to consent is designed to preserve voice while enabling movement.",
      },
    ],
    antiPattern:
      "Flat consensus can still become a kind of hierarchy when one or two blocks hold the whole system still. Sociocracy keeps voice while adding clearer domains and time-bound decisions.",
    caveat:
      "This is cohousing rather than a broad regenerative land enterprise, but it is strong evidence for governance evolution in a real residential community.",
    sources: [
      { label: "Sociocracy for All case study", href: "https://www.sociocracyforall.org/cohousing-using-sociocracy-pioneer-valley/" },
    ],
  },
  {
    slug: "dancing-rabbit-ecovillage",
    name: "Dancing Rabbit Ecovillage",
    category: "Ecovillage",
    location: "Rutledge, Missouri, United States",
    yearStarted: "1997",
    scale: "280-acre community land trust with ecological covenants",
    proofLevel: "Regenerative self-governance",
    directorySlug: "dancing-rabbit-ecovillage",
    website: "https://www.dancingrabbit.org",
    shortProof:
      "A long-running ecological village that uses membership governance, committees, land trust structures, and ecological covenants instead of a single owner-leader model.",
    skepticHook:
      "Dancing Rabbit is useful because it proves durability: shared land, shared ecological limits, and community governance can last for decades.",
    thesis:
      "Dancing Rabbit is not a sociocracy case, but it is a powerful proof point that land-based cooperative governance can survive pressure when legal structure, ecological commitments, and membership responsibility are explicit.",
    transformation:
      "The project created a community land trust and nonprofit structure that keeps land out of speculation while members govern village life through consensus and committees.",
    whyItMatters:
      "For regenerative founders, this case shows that the ownership container matters as much as the meeting method. Land held for common purpose creates different behavior than land held for extraction.",
    outcomes: [
      "Purchased 280 acres through the Dancing Rabbit Land Trust.",
      "Maintains ecological covenants around buildings, energy, vehicles, and land use.",
      "Uses membership governance, committees, and an oversight team for village operations.",
      "Demonstrates multi-decade durability in ecological intentional community life.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "The land is organized around ecological living, not speculative ownership.",
        evidence:
          "The land trust removes land from speculation and ecological covenants define shared environmental commitments.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Village governance is handled by membership, committees, and clear agreements.",
        evidence:
          "Dancing Rabbit describes consensus, committees, an oversight team, and day-to-day operations by membership.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "Conflict and communication practices are part of the community infrastructure.",
        evidence:
          "The community references nonviolent communication and relationship practices as part of how it operates.",
      },
    ],
    antiPattern:
      "A founder-owned land project can unintentionally keep everyone in permission-seeking mode. Dancing Rabbit's land trust points to a better pattern: legal ownership supports the purpose instead of overriding it.",
    caveat:
      "This is not documented as a sociocracy implementation. It belongs in the broader proof category: regenerative self-governance at land scale.",
    sources: [
      { label: "Dancing Rabbit Land Trust", href: "https://www.dancingrabbit.org/ecovillage-life/our-land/dancing-rabbit-land-trust/" },
      { label: "How Dancing Rabbit operates", href: "https://www.dancingrabbit.org/social-change/function/" },
      { label: "Dancing Rabbit overview", href: "https://www.dancingrabbit.org/about-dancing-rabbit-ecovillage/about-us-overview/" },
    ],
  },
  {
    slug: "earthaven-ecovillage",
    name: "Earthaven Ecovillage",
    category: "Ecovillage",
    location: "Black Mountain, North Carolina, United States",
    yearStarted: "1994",
    scale: "329 forested acres with neighborhoods, farms, commons, and legal restructuring",
    proofLevel: "Regenerative self-governance",
    directorySlug: "earthaven-ecovillage",
    website: "https://www.earthaven.org",
    shortProof:
      "A 30-plus-year land community with modified consensus, councils, guilds, common land, legal restructuring, and durable ecological infrastructure.",
    skepticHook:
      "Earthaven is the mature proof case: regenerative land communities do not have to stay imaginary, fragile, or dependent on one charismatic founder.",
    thesis:
      "Earthaven shows that long-term regenerative community requires governance, legal clarity, land agreements, and the willingness to redesign structure when the original setup stops working.",
    transformation:
      "After years of community life, Earthaven completed a major legal restructuring that separated neighborhood parcels, common land, HOA responsibilities, and community-life governance.",
    whyItMatters:
      "This is the honest proof skeptics need: even mature communities have to update their structure. Regeneration is not a permanent vibe. It is repeated stewardship of land, people, rules, and consequences.",
    outcomes: [
      "Founded in 1994 on 329 forested mountain acres.",
      "Uses modified consensus, council, guilds, and HOA/legal structures.",
      "Completed legal restructuring in 2019 after years of work.",
      "Demonstrates the need for governance evolution, not just founding ideals.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "The community's structure changed to better hold the long-term purpose.",
        evidence:
          "Earthaven's legal restructuring was explicitly framed as making the community safer and more workable.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Governance is distributed through councils, guilds, neighborhoods, and member processes.",
        evidence:
          "Earthaven describes modified consensus plus council and guild structures, with common land managed separately from neighborhoods.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "The community has to hold practical, ecological, social, and legal realities together.",
        evidence:
          "The restructuring story shows that emotional ideals are not enough; the governance container had to become more honest and durable.",
      },
    ],
    antiPattern:
      "Linear hierarchy can avoid legal and relational complexity by pushing it onto the founder. Earthaven's lesson is different: make the complexity visible, name the domains, and update the container.",
    caveat:
      "Earthaven is not presented here as a sociocracy case. It is evidence of long-term regenerative self-governance and structural evolution.",
    sources: [
      { label: "Earthaven FAQs", href: "https://www.earthaven.org/faqs/" },
      { label: "Earthaven legal restructuring", href: "https://www.earthaven.org/governance-and-legal/legal-at-last/" },
      { label: "GEN-US legal structure article", href: "https://www.gen-us.net/your-community-and-the-law/" },
    ],
  },
  {
    slug: "buurtzorg",
    name: "Buurtzorg",
    category: "Business",
    location: "Netherlands, international influence",
    yearStarted: "2006",
    scale: "14,000-plus employees, 900-plus self-managing teams",
    proofLevel: "Documented self-management",
    directorySlug: "buurtzorg",
    website: "https://www.buurtzorg.com",
    shortProof:
      "Peer-reviewed 2025 research describes Buurtzorg as a highly successful organization with over 14,000 employees, no supervisors or middle managers, and more than 900 independent teams.",
    skepticHook:
      "This is the scale argument. Self-management is not only for small communities; Buurtzorg scaled it in healthcare where mistakes matter.",
    thesis:
      "Buurtzorg proves that removing middle management does not mean removing support. It replaces supervision with small autonomous teams, clear purpose, simple tools, coaches, and direct professional responsibility.",
    transformation:
      "Nursing work moved from fragmented, manager-driven service delivery toward neighborhood teams that organize schedules, relationships, caseloads, local networks, hiring, and improvement.",
    whyItMatters:
      "For regenerative land projects, Buurtzorg is a bridge case: if self-management can work in healthcare, with vulnerable clients and public accountability, it can be taken seriously outside the office too.",
    outcomes: [
      "More than 14,000 employees operating without supervisors or middle management in the cited 2025 article.",
      "More than 900 independent teams supported by IT, a small back office, and coaches.",
      "Reported lower overhead and better client outcomes compared with industry averages in cited research.",
      "International adaptations and sustained attention from organizational design researchers.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "Care starts from what the client needs to regain independence and quality of life.",
        evidence:
          "Buurtzorg's model starts from the client perspective and builds outward through neighborhood networks.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Teams decide how to organize the work instead of waiting for managers.",
        evidence:
          "Buurtzorg describes teams of 12 with professional freedom and responsibility; the 2025 study documents autonomous teams without middle managers.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "Care is relational and human, not only a task list.",
        evidence:
          "The model emphasizes trusting relationships, warm relationships, continuity, and holistic care.",
      },
    ],
    antiPattern:
      "The traditional fix for complexity is more managers. Buurtzorg shows another path: smaller teams, better information, peer responsibility, and coaches who support without becoming bosses.",
    caveat:
      "Buurtzorg is healthcare, not land stewardship. Its strongest lesson is about scalable self-management architecture.",
    sources: [
      { label: "Buurtzorg model of care", href: "https://www.buurtzorg.com/about-us/buurtzorgmodel/" },
      { label: "2025 Journal of Organization Design article", href: "https://link.springer.com/article/10.1007/s41469-024-00184-y" },
    ],
  },
  {
    slug: "morning-star-company",
    name: "Morning Star Company",
    category: "Business",
    location: "California, United States",
    yearStarted: "1970s origin, self-management model developed over decades",
    scale: "Large tomato processor with full-time and seasonal colleagues",
    proofLevel: "Documented self-management",
    directorySlug: "morning-star",
    website: "https://www.morningstarco.com",
    shortProof:
      "Morning Star is one of the most cited industrial examples of self-management: no bosses, no traditional management hierarchy, and peer accountability through personal missions and CLOUs.",
    skepticHook:
      "This case matters because it is not a soft-services example. It is industrial food processing, capital equipment, logistics, quality, safety, and seasonal scale.",
    thesis:
      "Morning Star shows that self-management can work in operationally demanding business when commitments, peer agreements, and mission clarity replace boss permission.",
    transformation:
      "Instead of managers assigning work, colleagues negotiate commitments with each other through Colleague Letters of Understanding and are accountable to the people affected by their work.",
    whyItMatters:
      "For skeptics, Morning Star makes the strongest business case that hierarchy is not the only way to coordinate serious operations.",
    outcomes: [
      "Widely documented as operating without conventional managers.",
      "Uses personal commercial missions and Colleague Letters of Understanding.",
      "Processes a major share of California's tomato crop according to public reporting.",
      "Frequently cited by management researchers as a durable self-management case.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "People hold personal missions connected to the company's commercial mission.",
        evidence:
          "Morning Star's own materials describe Mission Focused Self-Management.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Colleagues coordinate by direct commitments instead of managerial assignment.",
        evidence:
          "Public profiles describe no bosses, no titles in the traditional management sense, and peer-negotiated CLOUs.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "Responsibility is treated as adult-to-adult, not parent-to-child supervision.",
        evidence:
          "The model is based on human respect, voluntary commitments, and direct accountability.",
      },
    ],
    antiPattern:
      "In a hierarchy, accountability often means pleasing the boss. Morning Star makes accountability lateral: the people affected by your promises are the people you answer to.",
    caveat:
      "Morning Star is a business operations case, not a regenerative land case. It belongs in the library as proof of self-management under commercial pressure.",
    sources: [
      { label: "Morning Star self-management article", href: "https://www.morningstarco.com/exploring-morning-stars-mission-focused-self-management-model/" },
      { label: "Forbes profile", href: "https://www.forbes.com/sites/jacobmorgan/2015/06/04/how-morningstar-farms-operates-without-any-managers/" },
      { label: "Inc profile", href: "https://www.inc.com/audacious-companies/leigh-buchanan/morning-star.html" },
    ],
  },
  {
    slug: "haier-rendanheyi",
    name: "Haier Group and RenDanHeYi",
    category: "Business",
    location: "Qingdao, China, global operations",
    yearStarted: "RenDanHeYi introduced in 2005",
    scale: "Global appliance and IoT ecosystem organized around micro-enterprises",
    proofLevel: "Documented self-management",
    directorySlug: "haier",
    website: "https://www.haier.com",
    shortProof:
      "Haier's RenDanHeYi model transformed a large manufacturer into an ecosystem of micro-enterprises designed to connect employees directly to user value.",
    skepticHook:
      "This is the manufacturing-scale proof: decentralization is not only for idealistic communities or small teams.",
    thesis:
      "Haier shows that large organizations can break the assumption that strategy must flow down a chain of command. Its micro-enterprise model puts market feedback and user value closer to the people doing the work.",
    transformation:
      "The company moved from conventional appliance manufacturing toward entrepreneurial micro-enterprises, platform coordination, and user-facing accountability.",
    whyItMatters:
      "For Teal Registry, Haier is a reminder that self-organization has multiple forms. Sociocracy is one method; RenDanHeYi is another management architecture for distributing authority at scale.",
    outcomes: [
      "Rendanheyi is widely studied in business schools and management research.",
      "The model is built around micro-enterprises and user value.",
      "Public case studies describe a long, multi-phase transformation from conventional hierarchy.",
      "Often cited as one of the most ambitious large-company management innovations.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "The user, not the internal hierarchy, becomes the organizing reference point.",
        evidence:
          "RenDanHeYi is commonly translated around the integration of people and user goals.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Micro-enterprises hold more direct accountability for customers, work, and outcomes.",
        evidence:
          "Case literature describes Haier shifting into many micro-enterprises with entrepreneurial responsibility.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "People are treated more like entrepreneurs inside the enterprise than replaceable job slots.",
        evidence:
          "The model emphasizes autonomy, accountability, co-creation, and employees as entrepreneurs within the enterprise.",
      },
    ],
    antiPattern:
      "Traditional hierarchy keeps customer truth filtered through layers. Haier's model is evidence for cutting distance between user need and decision authority.",
    caveat:
      "Haier is not sociocracy and not a land project. It is included as a large-scale proof of post-bureaucratic organizational design.",
    sources: [
      { label: "ICMR Haier RenDanHeYi case", href: "https://www.icmrindia.org/case-study-details?casecode=LDEN189" },
      { label: "London Business School Haier case", href: "https://publishing.london.edu/cases/the-haier-cases-c/" },
    ],
  },
  {
    slug: "wl-gore-lattice",
    name: "W. L. Gore and the Lattice Organization",
    category: "Business",
    location: "United States, global operations",
    yearStarted: "1958",
    scale: "Global materials company built around associates, commitments, and a lattice structure",
    proofLevel: "Documented self-management",
    directorySlug: "wl-gore",
    website: "https://www.gore.com",
    shortProof:
      "Gore publicly describes its culture as a lattice communications structure without the constraints of traditional chains of command.",
    skepticHook:
      "Gore matters because it is old, technical, and commercially serious. Self-organization did not prevent innovation; it helped shape the innovation culture.",
    thesis:
      "Gore shows that distributed authority can support technical excellence when people make commitments, communicate directly, and earn leadership through contribution.",
    transformation:
      "Instead of a conventional pyramid, Gore emphasizes associates, shared ownership, direct communication, natural leadership, and commitments.",
    whyItMatters:
      "This case helps translate self-organization for business audiences who need proof beyond ecovillages and theory.",
    outcomes: [
      "Long-running global company with a public commitment to lattice culture.",
      "Associates are empowered to make decisions that drive collective success.",
      "Known for innovation across technical materials, medical, industrial, and consumer uses.",
      "Culture has been documented for decades as an alternative to command-and-control hierarchy.",
    ],
    tealPrinciples: [
      {
        principle: "Evolutionary Purpose",
        plainMeaning: "The shared promise is to improve life through useful technical work.",
        evidence:
          "Gore names its shared promise as improving life and links culture to solving customer challenges.",
      },
      {
        principle: "Self-Organization",
        plainMeaning: "Communication and leadership work through a lattice rather than a chain of command.",
        evidence:
          "Gore's own culture page says associates work in a lattice communications structure without traditional chains of command.",
      },
      {
        principle: "Wholeness",
        plainMeaning: "Associates are treated as trusted adults and shared owners.",
        evidence:
          "Gore frames associates as shared owners empowered to make decisions and commit to the enterprise.",
      },
    ],
    antiPattern:
      "Command chains can slow technical learning because information has to travel up and down. A lattice lets people connect directly where the knowledge is.",
    caveat:
      "Gore is not a Teal Registry-reviewed organization. It is a public research example of a durable nontraditional structure.",
    sources: [
      { label: "Gore culture page", href: "https://www.gore.com/about/our-story/culture" },
      { label: "Washington Post archive on lattice structure", href: "https://www.washingtonpost.com/archive/business/1984/04/30/gores-secret-is-lattice-structure/930b340c-ab46-4a74-ab24-cf7bfcf452b1/" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export const caseStudyCategories = Array.from(new Set(caseStudies.map((study) => study.category)));