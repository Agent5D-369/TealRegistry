import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Gauge,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";

  return {
    title: `${study.name}: Self-Organization, Sociocracy, and Teal Case Study`,
    description: `${study.shortProof} Read the Teal Registry case study, evidence boundaries, source links, and directory profile for ${study.name}.`,
    keywords: [
      study.name,
      `${study.name} case study`,
      `${study.name} self organization`,
      `${study.name} sociocracy`,
      `${study.name} Teal organization`,
      `${study.name} regenerative governance`,
      "teal case study",
      "self organization examples",
      "sociocracy case study",
      "regenerative community governance",
      study.category,
    ],
    alternates: { canonical: `${siteUrl}/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.name}: Self-Organization Case Study`,
      description: study.shortProof,
      url: `${siteUrl}/case-studies/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";
  const pageUrl = `${siteUrl}/case-studies/${study.slug}`;
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `${study.name}: Self-Organization, Sociocracy, and Teal Case Study`,
        description: study.shortProof,
        about: ["self-organization", "sociocracy", "Teal organizations", "regenerative governance", study.category],
        mentions: [study.name, study.category, study.proofLevel, ...study.tealPrinciples.map((item) => item.principle)],
        mainEntityOfPage: pageUrl,
        publisher: { "@type": "Organization", name: "Teal Registry", url: siteUrl },
        citation: study.sources.map((source) => source.href),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Case Studies", item: `${siteUrl}/case-studies` },
          { "@type": "ListItem", position: 2, name: study.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What does ${study.name} prove about self-organization?`,
            acceptedAnswer: { "@type": "Answer", text: study.shortProof },
          },
          {
            "@type": "Question",
            name: `Is ${study.name} certified by Teal Registry?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This is a public research case study with source links and evidence boundaries, not a Teal Registry certification or endorsement.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <section className="case-detail-hero">
        <div className="case-detail-inner">
          <Link className="back-link" href="/case-studies">
            <ArrowLeft size={16} />
            Case studies
          </Link>
          <div className="case-detail-kicker">
            <span>{study.category}</span>
            <span>{study.proofLevel}</span>
            <span>{study.yearStarted}</span>
          </div>
          <h1>{study.name}</h1>
          <p>{study.skepticHook}</p>
          <div className="case-detail-actions">
            <Link className="solid-button large" href={`/registry/${study.directorySlug}`}>
              View directory page
            </Link>
            {study.website ? (
              <a className="ghost-button large" href={study.website} target="_blank" rel="noopener noreferrer">
                Source website <ExternalLink size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="case-detail-layout">
        <aside className="case-fact-panel" aria-label="Case study facts">
          <div><span>Location</span><strong>{study.location}</strong></div>
          <div><span>Scale</span><strong>{study.scale}</strong></div>
          <div><span>Evidence level</span><strong>{study.proofLevel}</strong></div>
          <div><span>Registry status</span><strong>Public research profile</strong></div>
        </aside>

        <article className="case-article">
          <section>
            <p className="section-kicker">The case in one sentence</p>
            <h2>{study.thesis}</h2>
            <p>{study.transformation}</p>
          </section>

          <section className="case-proof-band">
            <Gauge size={26} />
            <div>
              <h2>Why this convinces skeptical people</h2>
              <p>{study.whyItMatters}</p>
            </div>
          </section>

          <section>
            <p className="section-kicker">What changed away from linear hierarchy</p>
            <h2>From permission-seeking to designed shared power.</h2>
            <p>{study.antiPattern}</p>
          </section>

          <section>
            <p className="section-kicker">The three Teal principles</p>
            <div className="principle-proof-grid">
              {study.tealPrinciples.map((principle, index) => (
                <article key={principle.principle}>
                  <div className="principle-proof-title">
                    <span>{index + 1}</span>
                    <h3>{principle.principle}</h3>
                  </div>
                  <p>{principle.plainMeaning}</p>
                  <div>
                    <strong>Evidence signal</strong>
                    <p>{principle.evidence}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="section-kicker">Documented outcomes</p>
            <div className="outcome-list">
              {study.outcomes.map((outcome) => (
                <div key={outcome}>
                  <CheckCircle2 size={18} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="case-caveat">
            <ShieldAlert size={24} />
            <div>
              <h2>Read this honestly</h2>
              <p>{study.caveat}</p>
            </div>
          </section>

          <section>
            <p className="section-kicker">Sources used</p>
            <div className="source-list">
              {study.sources.map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">
                  <FileText size={16} />
                  {source.label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </section>

          <section className="case-next-actions">
            <div>
              <Scale size={24} />
              <h2>Use this as part of the evidence map.</h2>
              <p>
                One case study should not carry the whole argument. The proof gets strong when multiple examples
                show the same pattern across land, community, care, manufacturing, and technical business.
              </p>
            </div>
            <div>
              <Link className="solid-button" href="/case-studies">
                More case studies <ArrowRight size={16} />
              </Link>
              <Link className="ghost-button" href="/apply">
                Apply for review
              </Link>
            </div>
          </section>
        </article>
      </section>
    </>
  );
}