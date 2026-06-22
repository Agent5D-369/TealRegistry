import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { audiencePages } from "@/data/education";
import { directoryRecords } from "@/data/registry";

type AudiencePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return audiencePages.map((audience) => ({ slug: audience.slug }));
}

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { slug } = await params;
  const audience = audiencePages.find((item) => item.slug === slug);

  if (!audience) {
    notFound();
  }

  const listings = directoryRecords.filter((record) => {
    if (audience.slug === "individuals") return record.entityType === "Individual";
    if (audience.slug === "organizations") return record.entityType === "Organization";
    if (audience.slug === "teams") return record.entityType === "Provider";
    if (audience.slug === "frameworks") return record.entityType === "Framework";
    return true;
  });

  return (
    <PageShell
      title={audience.headline}
      intro={audience.transformation}
      actions={[
        { href: "/credentials", label: "Compare credentials" },
        { href: "/apply", label: "Start this path", variant: "ghost" },
      ]}
    >
      <section className="content-section dream-target-layout">
        <article className="trust-panel">
          <span className="status-pill">Known pain point</span>
          <h2>What usually feels hard</h2>
          <p>{audience.pain}</p>
        </article>
        <article className="trust-panel">
          <span className="status-pill">Desired transformation</span>
          <h2>What changes</h2>
          <p>{audience.transformation}</p>
        </article>
        <article className="trust-panel">
          <span className="status-pill">Why Teal Registry</span>
          <h2>How we help uniquely</h2>
          <p>{audience.uniqueApproach}</p>
        </article>
        <article className="trust-panel">
          <span className="status-pill">Regenerative intention</span>
          <h2>What this is for</h2>
          <p>{audience.regenerativeIntention}</p>
        </article>
      </section>

      <section className="content-section">
        <div className="section-heading compact">
          <h2>{audience.listingFilter}</h2>
          <p>
            These listings will become more useful as organizations claim profiles, add approved
            media, provide evidence, and invite verified reviews.
          </p>
        </div>
        <div className="directory-grid">
          {listings.length > 0 ? (
            listings.map((record) => (
              <Link className="directory-card" href={`/registry/${record.slug}`} key={record.slug}>
                <span>{record.entityType}</span>
                <h3>{record.name}</h3>
                <p>{record.publicSummary}</p>
              </Link>
            ))
          ) : (
            <article className="trust-panel">
              <h3>Listings are being built</h3>
              <p>
                This audience segment is ready for the 100-listing launch pipeline. Admins can add
                researched profiles through the listing builder.
              </p>
              <Link className="solid-button" href="/admin/listing-builder">
                Open listing builder
              </Link>
            </article>
          )}
        </div>
      </section>
    </PageShell>
  );
}
