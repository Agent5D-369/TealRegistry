import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { audiencePages } from "@/data/education";
import { directoryRecords } from "@/data/registry";

type AudiencePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return audiencePages.map((audience) => ({ slug: audience.slug }));
}

export async function generateMetadata({ params }: AudiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const audience = audiencePages.find((item) => item.slug === slug);
  if (!audience) return { title: "Not Found | Teal Registry" };
  return {
    title: `${audience.headline} | Teal Registry`,
    description: audience.transformation,
  };
}

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { slug } = await params;
  const audience = audiencePages.find((item) => item.slug === slug);

  if (!audience) notFound();

  const listings = directoryRecords.filter((record) => {
    if (audience.slug === "individuals") return record.entityType === "Individual";
    if (audience.slug === "organizations") return record.entityType === "Organization";
    if (audience.slug === "teams") return record.entityType === "Provider";
    if (audience.slug === "frameworks") return record.entityType === "Framework";
    return true;
  });

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <ShieldCheck size={14} />
            For {audience.slug}
          </div>
          <h1>{audience.headline}</h1>
          <p>{audience.transformation}</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/credentials" className="btn btn-gold">
              Compare credentials
              <ArrowRight size={15} />
            </Link>
            <Link href="/apply" className="btn btn-ghost-white">
              Start this path
            </Link>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="content-section">
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {[
              { label: "Known pain point", heading: "What usually feels hard", content: audience.pain },
              { label: "Desired transformation", heading: "What changes", content: audience.transformation },
              { label: "Why Teal Registry", heading: "How we help uniquely", content: audience.uniqueApproach },
              { label: "Regenerative intention", heading: "What this is for", content: audience.regenerativeIntention },
            ].map((block) => (
              <article key={block.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--teal)", display: "block", marginBottom: "0.5rem" }}>
                  {block.label}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                  {block.heading}
                </h2>
                <p style={{ color: "var(--ink-mid)", lineHeight: 1.7, maxWidth: "none", margin: 0 }}>{block.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related listings */}
      <section style={{ background: "var(--teal-xlight)", borderTop: "1px solid var(--teal-light)", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "0.5rem" }}>
            {audience.listingFilter}
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
            Research profiles grow stronger when organizations claim and verify them.
          </p>

          {listings.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {listings.slice(0, 9).map((record) => (
                <Link key={record.slug} href={`/registry/${record.slug}`} style={{
                  background: "white",
                  border: "1px solid var(--teal-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--teal)", display: "block", marginBottom: "0.375rem" }}>
                    {record.entityType}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                    {record.name}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>
                    {record.publicSummary.slice(0, 120)}…
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ background: "white", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "0.625rem" }}>
                Listings being built
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>
                This segment is part of the 100-listing launch pipeline.
              </p>
              <Link href="/admin/listing-builder" className="btn btn-primary">
                Open listing builder
              </Link>
            </div>
          )}

          {listings.length > 9 && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href={`/registry?type=${audience.slug}`} className="btn btn-primary">
                View all {listings.length} listings
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>Ready to get started?</h2>
          <p>Choose a credential path built for your context.</p>
          <Link href="/apply" className="btn btn-gold" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
            Apply for certification
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
