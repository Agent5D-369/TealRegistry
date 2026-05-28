export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const audiencePages = [
  {
    slug: "individuals",
    label: "Individuals",
    headline: "For people who want their Teal learning and practice to be understood clearly.",
    pain: "You may have real experience, but buyers, teams, and partners cannot easily tell what is training, what is practice, and what has been independently reviewed.",
    transformation:
      "Teal Registry helps turn scattered claims into a clear public pathway: what you learned, what you can safely claim, and what evidence would support a stronger credential.",
    uniqueApproach:
      "We separate education, lived practice, review scope, and public badge language so your credibility grows without overstating the claim.",
    regenerativeIntention:
      "Help capable people become visible without creating another personality-driven expert marketplace.",
    listingFilter: "Individual profiles and learner pathways",
  },
  {
    slug: "organizations",
    label: "Organizations",
    headline: "For organizations that want partners, funders, and communities to trust the claim.",
    pain: "A beautiful values page does not prove that purpose, self-organization, and wholeness show up when decisions get hard.",
    transformation:
      "A registry profile makes the claim specific: what is public, what has been reviewed, what is still pending, and what people can verify.",
    uniqueApproach:
      "We turn broad regenerative language into scoped evidence, badge status, review dates, and public-safe summaries.",
    regenerativeIntention:
      "Reward organizations that make trust visible, not just organizations with the best story.",
    listingFilter: "Organization and project listings",
  },
  {
    slug: "teams",
    label: "Teams",
    headline: "For delivery teams that help others learn, implement, or improve Teal practice.",
    pain: "Clients need help, but they also need to know the difference between training, implementation support, and independent certification.",
    transformation:
      "Accreditation pages clarify what your team is allowed to provide and what remains independent from your delivery work.",
    uniqueApproach:
      "We protect your credibility by making role boundaries visible before a buyer signs a contract.",
    regenerativeIntention:
      "Grow the ecosystem without letting the same people sell, review, and certify the same claim.",
    listingFilter: "Provider and implementation listings",
  },
  {
    slug: "frameworks",
    label: "Frameworks",
    headline: "For frameworks and methods that want to be understood in relation to Teal.",
    pain: "A framework may be useful, but buyers still need to know whether it maps to Teal principles and what it does not verify.",
    transformation:
      "Recognition explains how a framework connects to purpose, self-organization, and wholeness without certifying every user of the method.",
    uniqueApproach:
      "We recognize the map without confusing the map with evidence that an organization is practicing it well.",
    regenerativeIntention:
      "Help good methods travel while keeping public trust anchored in evidence.",
    listingFilter: "Framework and method listings",
  },
];

export const glossaryEntries = [
  {
    slug: "personal-or-public-commitment",
    term: "Personal or public commitment",
    plainMeaning: "A person or organization has publicly said they are moving toward Teal practice.",
    whyItMatters:
      "This creates visibility and accountability, but it is not the same as independent review.",
    proofExamples: ["Published commitment", "Profile statement", "Declared scope", "Named contact"],
  },
  {
    slug: "completed-approved-training",
    term: "Completed approved training",
    plainMeaning: "A learner completed a recognized training experience.",
    whyItMatters:
      "Training shows exposure and effort. It does not prove how someone behaves in real work.",
    proofExamples: ["Completion record", "Provider confirmation", "Course scope", "Date completed"],
  },
  {
    slug: "evidence-checked",
    term: "Evidence checked",
    plainMeaning: "Reviewers looked at documents, examples, interviews, or other proof for a specific claim.",
    whyItMatters:
      "This moves a claim beyond self-description and into reviewable evidence.",
    proofExamples: ["Decision records", "Interview notes", "Practice examples", "Public-safe summary"],
  },
  {
    slug: "evidence-and-interviews",
    term: "Evidence and interviews",
    plainMeaning: "A deeper review combined submitted proof with conversations or interviews.",
    whyItMatters:
      "This helps reviewers see whether the written evidence matches lived experience.",
    proofExamples: ["Evidence packet", "Stakeholder interviews", "Assessor findings", "Decision rationale"],
  },
  {
    slug: "practice-over-time",
    term: "Practice over time",
    plainMeaning: "The claim has held up beyond a single moment, workshop, or launch announcement.",
    whyItMatters:
      "Durable Teal practice must survive pressure, growth, conflict, and real consequences.",
    proofExamples: ["Longitudinal evidence", "Renewal review", "Change history", "Multiple decision cycles"],
  },
  {
    slug: "provider-reviewed",
    term: "Provider reviewed",
    plainMeaning: "A training provider has been reviewed for the work it teaches.",
    whyItMatters:
      "This helps learners choose credible education without confusing training with certification.",
    proofExamples: ["Curriculum review", "Facilitator criteria", "Learner records", "Accreditation decision"],
  },
  {
    slug: "delivery-reviewed",
    term: "Delivery reviewed",
    plainMeaning: "An implementation team has been reviewed for how it supports clients.",
    whyItMatters:
      "Buyers can see that delivery capability was reviewed while client verification remains independent.",
    proofExamples: ["Delivery method", "Client boundaries", "Conflict policy", "Renewal review"],
  },
  {
    slug: "reviewer-authorized",
    term: "Reviewer authorized",
    plainMeaning: "A person has been approved to review evidence for Teal Registry.",
    whyItMatters:
      "Certification only works if reviewers are trained, consistent, and free from conflicts.",
    proofExamples: ["Assessor authorization", "Conflict declaration", "Calibration record", "Review assignment"],
  },
  {
    slug: "framework-mapped",
    term: "Framework mapped",
    plainMeaning: "A method or framework has been compared against Teal principles.",
    whyItMatters:
      "A framework can be aligned without proving every organization using it is aligned.",
    proofExamples: ["Principle map", "Method notes", "Use boundaries", "Public explanation"],
  },
];
