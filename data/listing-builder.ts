export const listingBuilderStages = [
  {
    title: "Discover",
    summary: "Build target lists from ethical public sources: official websites, public directories, interviews, press, maps, and owner-submitted leads.",
  },
  {
    title: "Extract",
    summary: "Capture facts, claims, locations, contact paths, source URLs, and reusable-license signals. Do not copy protected photos.",
  },
  {
    title: "Draft",
    summary: "Generate a useful listing with plain-language summary, Teal signal map, SEO metadata, answer-engine questions, and claim boundary.",
  },
  {
    title: "Review",
    summary: "Human reviewer checks facts, removes overclaims, confirms source attribution, and marks the page as draft, research profile, or verified.",
  },
  {
    title: "Publish",
    summary: "Publish indexable pages with structured data, claim CTA, owner correction path, review controls, and optional enhanced listing offer.",
  },
];

export const listingBuilderFields = [
  "Official name",
  "Website",
  "Primary location",
  "Project type",
  "Known public claims",
  "Source URLs",
  "Potential Teal signals",
  "Media license status",
  "Contact or claim path",
  "SEO search phrases",
];

export const targetSeedCategories = [
  { category: "Intentional communities", targetCount: 35 },
  { category: "Regenerative villages and land projects", targetCount: 25 },
  { category: "Worker cooperatives and self-managed companies", targetCount: 20 },
  { category: "Teal or self-organization consultancies", targetCount: 10 },
  { category: "Training providers and frameworks", targetCount: 10 },
];

export const aiListingBuilderRules = [
  "Use facts from cited public sources or owner-submitted materials.",
  "Never state that a project is verified unless a Teal Registry decision exists.",
  "Do not copy website photos unless the owner gives permission or the license clearly allows reuse.",
  "Generate original visual summaries or ask the owner for media when rights are unclear.",
  "Make the page useful enough that the organization wants to claim it, but accurate enough that the registry remains trusted.",
  "Every listing must include a correction path, source notes, verification boundary, and claim CTA.",
];

export const enhancedListingOffers = [
  "Owner-approved photos and media gallery",
  "Verified user and resident reviews",
  "Founder or steward interview",
  "Teal signal evidence library",
  "Search-optimized FAQ section",
  "Badge and certificate announcement kit",
  "Priority annual profile review",
];
