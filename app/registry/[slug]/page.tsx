import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck, Globe, Calendar, ArrowRight, ExternalLink,
  AlertTriangle, CheckCircle2, Users, Leaf, BookOpen,
} from "lucide-react";
import { getDirectoryRecordBySlug } from "@/lib/registry-records";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const record = await getDirectoryRecordBySlug(slug);
  if (!record) return { title: "Not found" };
  return {
    title: record.seo.title,
    description: record.seo.description,
    keywords: record.seo.keywords,
    openGraph: {
      title: record.seo.title,
      description: record.seo.description,
      url: `https://tealregistry.com/registry/${slug}`,
      type: "profile",
    },
    other: {
      "schema:Organization": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: record.name,
        url: record.website,
        description: record.seo.description,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: record.credentialLevel ?? record.status,
          credentialCategory: "Teal Registry Certification",
        },
      }),
    },
  };
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const record = await getDirectoryRecordBySlug(slug);
  if (!record) notFound();

  const credentialLevel = record.credentialLevel ?? record.status;
  const isVerified = credentialLevel.toLowerCase().includes("certified") || credentialLevel.toLowerCase().includes("verified");

  return (
    <>
      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: record.name,
            url: record.website,
            description: record.seo.description,
            addressCountry: record.country,
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              name: credentialLevel,
              recognizedBy: {
                "@type": "Organization",
                name: "Teal Registry",
                url: "https://tealregistry.com",
              },
              dateCreated: record.lastReview,
              validThrough: record.validTo,
            },
          }),
        }}
      />

      {/* Listing Hero */}
      <section className="listing-hero">
        <div className="listing-hero-inner">
          <div className="listing-hero-content">
            <div className="breadcrumb" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link href="/registry" style={{ color: "rgba(255,255,255,0.6)" }}>Directory</Link>
              <span>/</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{record.name}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span className={`chip ${getChipClass(credentialLevel)}`} style={{ fontSize: "0.875rem", padding: "0.375rem 1rem" }}>
                {credentialLevel}
              </span>
              <span className="chip" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {record.entityType}
              </span>
              {record.country && (
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <Globe size={14} />
                  {record.country}
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: "white", lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              {record.name}
            </h1>
            <p style={{ fontSize: "1.1875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: "1.75rem", maxWidth: "56ch" }}>
              {record.tagline}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {record.website && (
                <a
                  href={record.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost-white"
                  style={{ minHeight: "44px", padding: "0.625rem 1.25rem", fontSize: "0.9375rem" }}
                >
                  Visit Website
                  <ExternalLink size={15} />
                </a>
              )}
              {isVerified ? (
                <Link href={`/verify?id=${record.badgeId}`} className="btn btn-gold" style={{ minHeight: "44px", padding: "0.625rem 1.25rem", fontSize: "0.9375rem" }}>
                  <ShieldCheck size={16} />
                  Verify Badge
                </Link>
              ) : (
                <Link href="/claim" className="btn btn-gold" style={{ minHeight: "44px", padding: "0.625rem 1.25rem", fontSize: "0.9375rem" }}>
                  Claim This Listing
                </Link>
              )}
            </div>
          </div>

          <div className="listing-hero-badge-wrap">
            <Image
              src={record.badgeImage}
              alt={`${credentialLevel} badge`}
              width={130}
              height={130}
              priority
            />
            {isVerified && (
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "var(--radius)", padding: "0.625rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)" }}>
                <CheckCircle2 size={14} style={{ color: "var(--gold)" }} />
                Independently verified
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="listing-tabs" style={{ maxWidth: "var(--max)", margin: "0 auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)" }}>
          <a href="#overview" className="listing-tab active">Overview</a>
          <a href="#teal-signals" className="listing-tab">Teal Signals</a>
          <a href="#verification" className="listing-tab">Verification</a>
          {record.reviewSummary.count > 0 && <a href="#reviews" className="listing-tab">Reviews</a>}
        </div>
      </section>

      {/* Body */}
      <div className="listing-body">
        {/* Main content */}
        <div>
          {/* About */}
          <section id="overview" style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1rem" }}>About this organization</h2>
            <p style={{ fontSize: "1.0625rem", color: "var(--ink-mid)", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "none" }}>
              {record.summary ?? record.publicSummary}
            </p>

            {record.highlights.length > 0 && (
              <div className="highlights-grid">
                {record.highlights.map((h, i) => (
                  <div key={i} className="highlight-item">{h}</div>
                ))}
              </div>
            )}
          </section>

          {/* Teal Signals */}
          {record.tealSignals.length > 0 && (
            <section id="teal-signals" style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "0.5rem" }}>Teal Signals</h2>
              <p style={{ color: "var(--muted)", marginBottom: "1.75rem", maxWidth: "none" }}>
                What our assessors looked for — and what they found.
              </p>
              <div className="teal-signals">
                {record.tealSignals.map((signal, i) => (
                  <div key={i} className="teal-signal">
                    <div className="teal-signal-icon">
                      {i === 0 ? <Leaf size={18} /> : i === 1 ? <Users size={18} /> : <BookOpen size={18} />}
                    </div>
                    <div className="teal-signal-text">
                      <h4>{signal.title}</h4>
                      <p>{signal.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Scope note */}
          <section id="verification" style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1rem" }}>Verification scope</h2>
            <div className="notice notice-teal" style={{ marginBottom: "1.25rem" }}>
              <strong>Scope: </strong>{record.scope}
            </div>
            <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "none" }}>
              Teal Registry credentials are bounded. The scope above describes exactly what was assessed. Claims beyond this scope are not implied by this listing.
            </p>

            {record.sourceNotes.length > 0 && (
              <div className="notice notice-info" style={{ marginTop: "1.25rem" }}>
                <strong>Source notes: </strong>{record.sourceNotes[0]}
              </div>
            )}
          </section>

          {/* Evidence */}
          {record.evidence.length > 0 && (
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1rem" }}>Evidence reviewed</h2>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {record.evidence.map((e, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.9375rem", color: "var(--ink-mid)" }}>
                    <CheckCircle2 size={18} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }} />
                    {e}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Audience */}
          {record.audience.length > 0 && (
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1rem" }}>Who benefits from this listing</h2>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {record.audience.map((a) => (
                  <span key={a} className="chip chip-teal" style={{ fontSize: "0.875rem", padding: "0.375rem 1rem" }}>{a}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="listing-sidebar">
          {/* Verification panel */}
          <div className="sidebar-card" style={{ borderTop: "3px solid var(--teal)" }}>
            <h4>Verification Record</h4>
            <dl>
              <div className="verification-item">
                <dt>Badge ID</dt>
                <dd style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>{record.badgeId}</dd>
              </div>
              <div className="verification-item">
                <dt>Status</dt>
                <dd>
                  <span className={`chip ${getChipClass(credentialLevel)}`}>{credentialLevel}</span>
                </dd>
              </div>
              <div className="verification-item">
                <dt>Scope</dt>
                <dd style={{ textAlign: "right", fontSize: "0.8125rem" }}>{record.scope}</dd>
              </div>
              <div className="verification-item">
                <dt>Last review</dt>
                <dd style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <Calendar size={13} />
                  {record.lastReview}
                </dd>
              </div>
              <div className="verification-item">
                <dt>Valid to</dt>
                <dd>{record.validTo}</dd>
              </div>
              {record.country && (
                <div className="verification-item">
                  <dt>Country</dt>
                  <dd style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <Globe size={13} />
                    {record.country}
                  </dd>
                </div>
              )}
            </dl>
            {isVerified && (
              <Link href={`/verify?id=${record.badgeId}`} className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", justifyContent: "center" }}>
                <ShieldCheck size={16} />
                Verify This Badge
              </Link>
            )}
          </div>

          {/* Claim card */}
          {!isVerified && (
            <div className="sidebar-card" style={{ background: "var(--gold-xlight)", border: "1px solid var(--gold-light)" }}>
              <h4 style={{ color: "#7a5a00" }}>Own this organization?</h4>
              <p style={{ fontSize: "0.9rem", color: "#7a5a00", marginBottom: "1rem", maxWidth: "none" }}>
                This listing was pre-populated from public research. Claim it to update details, start verification, or add your badge.
              </p>
              <Link href="/claim" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                Claim Listing
              </Link>
            </div>
          )}

          {/* Misuse report */}
          <div className="sidebar-card" style={{ background: "var(--background)" }}>
            <h4>See something wrong?</h4>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem", maxWidth: "none" }}>
              Badge misuse, inaccurate claims, or concerns about this listing can be reported confidentially.
            </p>
            <Link href={`/report?org=${slug}`} className="btn btn-subtle" style={{ width: "100%", justifyContent: "center", fontSize: "0.875rem" }}>
              <AlertTriangle size={15} />
              Report Concern
            </Link>
          </div>

          {/* Next steps */}
          <div className="sidebar-card" style={{ background: "var(--teal-deep)", color: "white" }}>
            <h4 style={{ color: "rgba(255,255,255,0.7)" }}>Inspired by this?</h4>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem", maxWidth: "none" }}>
              Your organization can earn a Teal Registry credential too.
            </p>
            <Link href="/apply" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "0.875rem" }}>
              Apply for Certification
              <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </div>

      {/* Related listings CTA */}
      <div style={{ background: "var(--teal-xlight)", borderTop: "1px solid var(--border)", padding: "3rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            Explore more verified organizations
          </h3>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem", maxWidth: "none" }}>
            The registry grows as more organizations earn and claim their credentials.
          </p>
          <Link href="/registry" className="btn btn-primary">
            Back to Directory
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}

function getChipClass(status?: string) {
  const s = (status ?? "").toLowerCase();
  if (s.includes("certified")) return "chip-certified";
  if (s.includes("verified")) return "chip-verified";
  if (s.includes("aligned")) return "chip-aligned";
  if (s.includes("trained")) return "chip-trained";
  if (s.includes("accredited")) return "chip-teal";
  if (s.includes("research")) return "chip-research";
  if (s.includes("review")) return "chip-review";
  return "chip-muted";
}
