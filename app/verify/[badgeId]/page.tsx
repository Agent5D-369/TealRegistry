import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, Clock, FileText } from "lucide-react";
import { directoryRecords } from "@/data/registry";
import { getDirectoryRecordByBadgeId, isOfficialBadgeId } from "@/lib/registry-records";

type VerifyPageProps = {
  params: Promise<{ badgeId: string }>;
};

export function generateStaticParams() {
  return directoryRecords
    .filter((record) => isOfficialBadgeId(record.badgeId))
    .map((record) => ({ badgeId: record.badgeId }));
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const { badgeId } = await params;
  const record = await getDirectoryRecordByBadgeId(badgeId);
  if (!record) return { title: "Badge Not Found | Teal Registry" };
  return {
    title: `Verify ${badgeId} — ${record.name} | Teal Registry`,
    description: `Independent verification record for ${record.name}. Badge ID: ${badgeId}. ${record.publicSummary}`,
  };
}

export default async function VerifyBadgePage({ params }: VerifyPageProps) {
  const { badgeId } = await params;
  const record = await getDirectoryRecordByBadgeId(badgeId);

  if (!record) notFound();

  const isActive = record.status === "Active" || record.status === "Teal Certified" || record.status === "Teal Verified";
  const statusColor = isActive ? "#065f46" : "#92400e";
  const statusBg = isActive ? "#d1fae5" : "#fef3c7";

  return (
    <>
      {/* Verification banner */}
      <div style={{ background: isActive ? "var(--teal-xlight)" : "#fef3c7", borderBottom: `1px solid ${isActive ? "var(--teal-light)" : "#f59e0b"}`, padding: "1rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}>
          {isActive
            ? <CheckCircle2 size={18} style={{ color: "var(--teal)" }} />
            : <AlertTriangle size={18} style={{ color: "#d97706" }} />
          }
          <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: isActive ? "var(--teal-dark)" : "#92400e" }}>
            {isActive
              ? `This is an active Teal Registry record. Badge ID ${badgeId} is valid.`
              : `This badge has a non-active status. Verify details below before relying on it.`
            }
          </span>
        </div>
      </div>

      <section className="content-section">
        <div className="container" style={{ maxWidth: "960px", display: "grid", gridTemplateColumns: "1fr 400px", gap: "3rem", alignItems: "start" }}>

          {/* Left: verification card */}
          <article>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <ShieldCheck size={32} style={{ color: isActive ? "var(--teal)" : "#d97706" }} />
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem", lineHeight: 1.15, margin: 0 }}>
                  {record.name}
                </h1>
                <p style={{ color: "var(--muted)", margin: "0.25rem 0 0", fontSize: "0.9375rem" }}>
                  Independent verification record
                </p>
              </div>
            </div>

            {/* Status */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, padding: "0.375rem 0.875rem", borderRadius: "9999px", background: statusBg, color: statusColor }}>
                {record.status}
              </span>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, padding: "0.375rem 0.875rem", borderRadius: "9999px", background: "var(--teal-xlight)", color: "var(--teal-dark)" }}>
                {record.listingType}
              </span>
            </div>

            <p style={{ color: "var(--ink-mid)", lineHeight: 1.75, fontSize: "1.0625rem", marginBottom: "2rem", maxWidth: "none" }}>
              {record.publicSummary}
            </p>

            {/* Verification grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "2rem" }}>
              {[
                { label: "Badge ID", value: record.badgeId, mono: true },
                { label: "Verification record", value: record.verificationId, mono: true },
                { label: "Reviewed scope", value: record.scope, mono: false },
                { label: "Entity type", value: record.entityType, mono: false },
                { label: "Country", value: record.country, mono: false },
                { label: "Last reviewed", value: record.lastReview, mono: false },
                { label: "Valid to", value: record.validTo, mono: false },
                { label: "Credential level", value: record.credentialLevel ?? "Teal Aligned", mono: false },
              ].map((field) => (
                <div key={field.label} style={{ padding: "1rem 1.25rem", background: "var(--surface)" }}>
                  <dt style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "0.375rem" }}>
                    {field.label}
                  </dt>
                  <dd style={{ fontSize: "0.9375rem", color: "var(--ink)", fontFamily: field.mono ? "monospace" : "inherit", margin: 0 }}>
                    {field.value}
                  </dd>
                </div>
              ))}
            </div>

            {/* Evidence signals */}
            {record.evidence.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FileText size={18} style={{ color: "var(--teal)" }} />
                  Evidence reviewed
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {record.evidence.map((e, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <CheckCircle2 size={15} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "0.15rem" }} />
                      <span style={{ fontSize: "0.9rem", color: "var(--ink-mid)" }}>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Source notes */}
            {record.sourceNotes.length > 0 && (
              <div style={{ background: "#f8faf9", borderRadius: "var(--radius)", padding: "1rem 1.25rem", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginBottom: "0.625rem" }}>
                  Source notes
                </h3>
                {record.sourceNotes.map((note, i) => (
                  <p key={i} style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "none", margin: i < record.sourceNotes.length - 1 ? "0 0 0.5rem" : 0 }}>
                    {note}
                  </p>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href={`/registry/${record.slug}`} className="btn btn-primary">
                Full registry profile
                <ExternalLink size={14} />
              </Link>
              <Link href="/report-misuse" className="btn btn-ghost">
                Report a concern
              </Link>
            </div>
          </article>

          {/* Right: sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Scope boundary */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={16} style={{ color: "var(--teal)" }} />
                Scope boundary
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "0.875rem", maxWidth: "none" }}>
                This badge covers only: <strong>{record.scope}</strong>
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--muted)", fontStyle: "italic", maxWidth: "none", margin: 0 }}>
                No Teal Registry badge implies broader organizational excellence beyond the scope stated here.
              </p>
            </div>

            {/* Validity */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={16} style={{ color: "var(--teal)" }} />
                Validity
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--muted)" }}>Last reviewed</span>
                  <span style={{ fontWeight: 500 }}>{record.lastReview}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--muted)" }}>Valid to</span>
                  <span style={{ fontWeight: 500 }}>{record.validTo}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--muted)" }}>Renewal type</span>
                  <span style={{ fontWeight: 500 }}>Annual</span>
                </div>
              </div>
            </div>

            {/* Teal signals */}
            {record.tealSignals.length > 0 && (
              <div style={{ background: "var(--teal-xlight)", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "1rem", color: "var(--teal-dark)" }}>
                  Teal signals observed
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {record.tealSignals.map((signal, i) => (
                    <div key={i}>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem", maxWidth: "none" }}>{signal.title}</p>
                      <p style={{ fontSize: "0.8125rem", color: "var(--teal-dark)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>{signal.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            {record.listingType === "Public research profile" && (
              <div style={{ background: "var(--ink-dark)", color: "white", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "0.625rem", color: "white" }}>
                  Is this your organization?
                </h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: "1rem", maxWidth: "none" }}>
                  Claim this listing to add approved media, correct details, respond to the profile, and choose a verified credential path.
                </p>
                <Link href="/claim" className="btn btn-gold" style={{ display: "block", textAlign: "center" }}>
                  Claim this listing
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
