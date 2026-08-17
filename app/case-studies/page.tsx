import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Building2, Leaf, SearchCheck, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { caseStudies, caseStudyCategories } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Self-Organization Case Studies: Sociocracy, Teal, Ecovillages, and Self-Managing Companies",
  description:
    "Evidence-based Teal Registry case studies of Arterra, IBC Aratikum, Common Ground, Pioneer Valley, Dancing Rabbit, Earthaven, Buurtzorg, Morning Star, Haier, and W. L. Gore.",
  keywords: [
    "self organization case studies",
    "sociocracy ecovillage",
    "teal organization examples",
    "regenerative community governance",
    "self managed companies",
    "intentional community governance",
    "ecovillage sociocracy examples",
  ],
};

const proofCards = [
  {
    icon: Leaf,
    title: "Land and community proof",
    body: "Projects where shared land, housing, conservation, food, and membership had to be governed in real life.",
  },
  {
    icon: Building2,
    title: "Business proof at scale",
    body: "Organizations showing that self-management can work under operational pressure, not only in small circles.",
  },
  {
    icon: SearchCheck,
    title: "Clear evidence boundaries",
    body: "Each page separates explicit sociocracy, broader self-governance, and public research from verified certification.",
  },
];

export default function CaseStudiesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/case-studies`,
        url: `${siteUrl}/case-studies`,
        name: "Self-Organization Case Studies",
        description: "Evidence-based proof library for sociocracy, self-management, regenerative communities, ecovillages, and Teal organizations.",
        isPartOf: { "@type": "WebSite", name: "Teal Registry", url: siteUrl },
      },
      {
        "@type": "ItemList",
        name: "Teal Registry self-organization case study library",
        itemListElement: caseStudies.map((study, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: study.name,
          url: `${siteUrl}/case-studies/${study.slug}`,
          description: study.shortProof,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What are the best examples of self-organization in land projects and ecovillages?",
            acceptedAnswer: { "@type": "Answer", text: "Teal Registry highlights Arterra Bizimodu, Instituto Biorregional do Cerrado / Aldeia Aratikum, Common Ground Ecovillage, Pioneer Valley Cohousing, Dancing Rabbit, and Earthaven as public research examples with clear evidence boundaries." },
          },
          {
            "@type": "Question",
            name: "Is sociocracy the same as Teal?",
            acceptedAnswer: { "@type": "Answer", text: "No. Teal is an interpretive organizational framework. Sociocracy is a concrete governance method. Some case studies show explicit sociocracy, while others show broader self-management or regenerative self-governance." },
          },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <section className="case-hero">
        <div className="case-hero-inner">
          <div className="hero-eyebrow">
            <BookOpenCheck size={15} />
            Proof Library
          </div>
          <h1>Self-organization is not a theory. It has working proof.</h1>
          <p>
            A canon library for founders, land stewards, funders, team members, and skeptical partners who need
            documented examples that purpose, shared power, and whole-person practice can hold real work.
          </p>
          <div className="hero-actions">
            <a className="solid-button large" href="#case-library">Read the case studies</a>
            <Link className="ghost-button large" href="/standards">See the three principles</Link>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="What this library proves">
        {proofCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="proof-card">
              <Icon size={22} />
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </article>
          );
        })}
      </section>

      <section className="content-section case-intro">
        <div>
          <p className="section-kicker">The practical takeaway</p>
          <h2>Linear hierarchy is not the only serious way to run important things.</h2>
        </div>
        <div className="aha-panel case-aha">
          <p>
            The stronger pattern is not "no structure." The stronger pattern is clear shared purpose, explicit
            decision rights, circles or domains close to the work, feedback loops, conflict repair, and legal or
            economic containers that do not force everyone back into founder dependency.
          </p>
          <strong>Self-organization works when power is designed, not denied.</strong>
        </div>
      </section>

      <section id="case-library" className="content-section">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Case study directory</p>
            <h2>Use these as proof pages.</h2>
          </div>
          <Link className="text-link" href="/registry">
            Browse the full directory <ArrowRight size={16} />
          </Link>
        </div>

        {caseStudyCategories.map((category) => {
          const studies = caseStudies.filter((study) => study.category === category);
          return (
            <div className="case-category" key={category}>
              <h3>{category}</h3>
              <div className="case-grid">
                {studies.map((study) => (
                  <article className="case-card" key={study.slug}>
                    <div className="case-card-top">
                      <span>{study.proofLevel}</span>
                      <span>{study.yearStarted}</span>
                    </div>
                    <h4>{study.name}</h4>
                    <p>{study.skepticHook}</p>
                    <dl>
                      <div><dt>Where</dt><dd>{study.location}</dd></div>
                      <div><dt>Scale</dt><dd>{study.scale}</dd></div>
                    </dl>
                    <div className="case-card-actions">
                      <Link className="solid-button" href={`/case-studies/${study.slug}`}>Read case study</Link>
                      <Link className="ghost-button" href={`/registry/${study.directorySlug}`}>Directory page</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="content-section proof-note-section">
        <div className="proof-note">
          <ShieldCheck size={24} />
          <div>
            <h2>How to use this library with skeptical people</h2>
            <p>
              Lead with the strongest evidence for the audience. For land stewards, start with Arterra, IBC
              Aratikum, Common Ground, Pioneer Valley, Earthaven, and Dancing Rabbit. For business skeptics, start
              with Buurtzorg, Morning Star, Haier, and W. L. Gore. Do not blur the categories: explicit sociocracy,
              self-management, and broader regenerative self-governance are related, but not identical.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}