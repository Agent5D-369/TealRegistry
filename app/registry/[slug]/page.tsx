import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { directoryRecords } from "@/data/registry";
import { getDirectoryRecordBySlug, isOfficialBadgeId } from "@/lib/registry-records";

export const dynamic = "force-dynamic";

type RegistryDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return directoryRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: RegistryDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = await getDirectoryRecordBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";

  if (!record) {
    return {};
  }

  return {
    title: record.seo.title,
    description: record.seo.description,
    keywords: record.seo.keywords,
    alternates: {
      canonical: `${siteUrl}/registry/${record.slug}`,
    },
    openGraph: {
      title: record.seo.title,
      description: record.seo.description,
      type: "profile",
      url: `${siteUrl}/registry/${record.slug}`,
      images: [{ url: record.badgeImage, alt: `${record.name} Teal Registry profile` }],
    },
    twitter: {
      card: "summary_large_image",
      title: record.seo.title,
      description: record.seo.description,
      images: [record.badgeImage],
    },
  };
}

export default async function RegistryDetailPage({ params }: RegistryDetailProps) {
  const { slug } = await params;
  const record = await getDirectoryRecordBySlug(slug);

  if (!record) {
    notFound();
  }

  const hasIssuedBadge = isOfficialBadgeId(record.badgeId);
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.tealregistry.com";
  const pageUrl = `${siteUrl}/registry/${record.slug}`;
  const officialSource = record.sourceLinks.find((source) => source.href.startsWith("http"));
  const claimBoundary =
    record.listingType === "Public research profile"
      ? "This is a public research profile. It is not a certification, accreditation, endorsement, or verified Teal claim."
      : hasIssuedBadge
        ? "This profile includes an issued registry record. Trust the exact scope shown here, not broader claims made elsewhere."
        : "This profile is useful for discovery, but a stronger claim requires review, decision, and a current public record.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: record.seo.title,
        description: record.seo.description,
        isPartOf: {
          "@type": "WebSite",
          name: "Teal Registry",
          url: siteUrl,
        },
        about: { "@id": `${pageUrl}#entity` },
      },
      {
        "@type": record.entityType === "Individual" ? "Person" : "Organization",
        "@id": `${pageUrl}#entity`,
        name: record.name,
        description: record.publicSummary,
        url: record.website,
        areaServed: record.region,
        keywords: record.seo.keywords.join(", "),
        sameAs: record.website ? [record.website] : undefined,
        aggregateRating: record.reviewSummary.average
          ? {
              "@type": "AggregateRating",
              ratingValue: record.reviewSummary.average,
              reviewCount: record.reviewSummary.count,
            }
          : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Registry", item: `${siteUrl}/registry` },
          { "@type": "ListItem", position: 2, name: record.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Is ${record.name} verified by Teal Registry?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${record.status}. ${claimBoundary}`,
            },
          },
          {
            "@type": "Question",
            name: `What does this ${record.name} listing prove?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `It proves only what the public record says: ${record.scope}. The listing also shows source notes, review limits, and how the organization can claim or correct the profile.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      title={record.name}
      intro={record.tagline}
      actions={[
        hasIssuedBadge
          ? { href: `/verify/${record.badgeId}`, label: "Verify record" }
          : { href: `/apply?claim=${record.slug}`, label: "Claim or improve listing" },
        { href: "/report-misuse", label: "Report concern", variant: "ghost" },
      ]}
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="listing-hero-panel">
        <div>
          <span className="status-pill">{record.listingType}</span>
          <h2>The short answer</h2>
          <p>{record.publicSummary}</p>
          <div className="listing-action-row">
            {officialSource ? (
              <Link className="outline-button" href={officialSource.href} rel="noopener noreferrer" target="_blank">
                Visit official website
              </Link>
            ) : null}
            <Link className="outline-button" href={`/apply?claim=${record.slug}`}>
              Correct or claim this page
            </Link>
          </div>
        </div>
        <aside className="trust-boundary">
          <strong>Trust boundary</strong>
          <p>{claimBoundary}</p>
        </aside>
      </section>
      <section className="detail-layout">
        <article className="profile-panel">
          <Image src={record.badgeImage} alt={`${record.status} badge`} width={520} height={360} />
          <h2>{record.listingType}</h2>
          <p>{record.publicSummary}</p>
          <dl className="record-grid">
            <div>
              <dt>Status</dt>
              <dd>{record.status}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{record.scope}</dd>
            </div>
            <div>
              <dt>Country</dt>
              <dd>{record.country}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{record.region}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{record.sector}</dd>
            </div>
            <div>
              <dt>Last checked</dt>
              <dd>{record.lastReview}</dd>
            </div>
            <div>
              <dt>Review window</dt>
              <dd>{record.validTo}</dd>
            </div>
          </dl>
        </article>
        <aside className="trust-panel">
          <h2>Why this profile is useful</h2>
          <p>
            This page turns scattered public signals into a readable profile for funders,
            partners, candidates, members, and search engines. It names the promise without
            pretending more has been reviewed than the record supports.
          </p>
          <div className="evidence-list">
            {record.evidence.map((item: string) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Link
            className="solid-button"
            href={hasIssuedBadge ? `/verify/${record.badgeId}` : `/apply?claim=${record.slug}`}
          >
            {hasIssuedBadge ? `Verify ${record.badgeId}` : "Claim or improve this listing"}
          </Link>
        </aside>
      </section>
      <section className="content-section listing-section">
        <div className="section-heading compact">
          <h2>Who this page helps</h2>
          <p>
            The listing is written for the people who need to understand the organization quickly,
            decide whether it fits their needs, and know what still needs confirmation.
          </p>
        </div>
        <div className="listing-grid">
          <article className="trust-panel">
            <h3>Best-fit audiences</h3>
            <ul>
              {record.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="trust-panel">
            <h3>Highlights</h3>
            <ul>
              {record.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="trust-panel">
            <h3>Review signal</h3>
            <p>{record.reviewSummary.note}</p>
            <strong>
              {record.reviewSummary.average
                ? `${record.reviewSummary.average} from ${record.reviewSummary.count} reviews`
                : "Reviews not open yet"}
            </strong>
          </article>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading compact">
          <h2>Teal signal map</h2>
          <p>
            Strong listings do not just say regenerative. They explain where purpose,
            self-organization, and wholeness appear, and where more evidence is needed.
          </p>
        </div>
        <div className="listing-grid">
          {record.tealSignals.map((signal) => (
            <article className="pathway-card" key={signal.title}>
              <h2>{signal.title}</h2>
              <p>{signal.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section answer-engine-section">
        <div className="section-heading compact">
          <h2>Questions this page answers</h2>
          <p>
            These answers are intentionally direct so humans, search engines, and AI answer tools
            can understand the public record without guessing.
          </p>
        </div>
        <div className="answer-grid">
          <article>
            <h3>Is this a verified Teal organization?</h3>
            <p>{claimBoundary}</p>
          </article>
          <article>
            <h3>What is the current public status?</h3>
            <p>
              {record.name} is listed as <strong>{record.status}</strong> for this scope: {record.scope}
            </p>
          </article>
          <article>
            <h3>What should the owner do next?</h3>
            <p>
              Claim the page, correct facts, add approved source material, and decide whether to
              request independent review or an enhanced public listing.
            </p>
          </article>
        </div>
      </section>
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>Source and media policy</h2>
          {record.sourceLinks.length > 0 ? (
            <>
              <h3>Public sources</h3>
              <div className="source-link-list">
                {record.sourceLinks.map((source) => (
                  <Link
                    href={source.href}
                    key={`${source.href}-${source.label}`}
                    rel={source.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={source.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {source.label}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
          <ul>
            {record.sourceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p>{record.mediaPolicy}</p>
        </article>
        <aside className="trust-panel claim-panel">
          <h2>Own or represent this organization?</h2>
          <p>
            Claiming turns this from a starter research profile into a managed public trust page:
            corrected facts, approved media, source-backed answers, review readiness, verified
            user reviews, and a clearer path to recognition.
          </p>
          <Link className="solid-button" href={`/apply?claim=${record.slug}`}>
            Claim or improve this listing
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
