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

  if (!record) {
    return {};
  }

  return {
    title: record.seo.title,
    description: record.seo.description,
    keywords: record.seo.keywords,
    alternates: {
      canonical: `/registry/${record.slug}`,
    },
    openGraph: {
      title: record.seo.title,
      description: record.seo.description,
      type: "profile",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": record.entityType === "Individual" ? "Person" : "Organization",
    name: record.name,
    description: record.seo.description,
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
          <h2>Why this page exists</h2>
          <p>
            Teal Registry pages are built to be useful before a listing is claimed and even better
            after it is claimed. The goal is a trustworthy public profile that names the promise,
            the evidence boundary, and the next step.
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
          <h2>What people usually want to know</h2>
          <p>
            This page is structured for human readers, search engines, and answer engines: clear
            facts, visible limits, source notes, and a claim path for the organization.
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
            <h3>Verified reviews</h3>
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
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>Source and media policy</h2>
          <ul>
            {record.sourceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p>{record.mediaPolicy}</p>
        </article>
        <aside className="trust-panel claim-panel">
          <h2>Own this listing?</h2>
          <p>
            Claiming lets an organization correct facts, add approved media, publish richer proof,
            invite verified reviews, and upgrade to an enhanced listing without blurring the
            verification boundary.
          </p>
          <Link className="solid-button" href={`/apply?claim=${record.slug}`}>
            Claim or improve this listing
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
