import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, FileText, ShieldCheck, Upload, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply for Certification | Teal Registry",
  description: "Apply for a Teal Registry credential. Independent assessment for organizations, training providers, and implementation teams.",
};

const pathways = [
  {
    slug: "teal-verified",
    name: "Teal Verified",
    audience: "Organizations with documented practices ready for independent light-touch review.",
    price: "$1,200/year",
    timeline: "4–6 weeks",
    chip: "chip-verified",
    evidence: [
      "Governance and decision-making documentation",
      "Purpose statement and organizational narrative",
      "2+ examples of distributed authority in practice",
      "Willingness to publish a scoped public summary",
    ],
    steps: ["Submit application form", "Complete evidence package", "Assessor assigned", "Document review (2–4 weeks)", "Decision issued", "Badge + listing live"],
  },
  {
    slug: "teal-certified",
    name: "Teal Certified",
    audience: "Organizations committed to full independent assessment across all Teal pillars.",
    price: "$3,800/year",
    timeline: "6–10 weeks",
    chip: "chip-certified",
    evidence: [
      "Comprehensive governance and decision-making documentation",
      "Evidence across all three pillars: Purpose, Self-Management, Wholeness",
      "2–4 stakeholder interviews (employees, members, or partners)",
      "Financial transparency or access to relevant reports",
      "Scope statement defining what is and isn't being assessed",
      "Permission to publish full assessment record",
    ],
    steps: ["Submit application + pay assessment fee", "Readiness screening", "Evidence package submission", "Multi-assessor review", "Stakeholder interviews", "Panel decision", "Certified badge + full listing live"],
  },
  {
    slug: "accredited-training",
    name: "Accredited Training",
    audience: "Training providers delivering Teal curriculum to organizations and practitioners.",
    price: "$2,400/year",
    timeline: "5–7 weeks",
    chip: "chip-teal",
    evidence: [
      "Curriculum overview and learning objectives",
      "Facilitator qualifications and training",
      "Sample session materials (can be redacted)",
      "At least one cohort completed",
      "Participant feedback or outcomes data",
    ],
    steps: ["Submit provider profile", "Curriculum package review", "Panel review", "Accreditation issued", "Annual renewal via cohort evidence"],
  },
  {
    slug: "accredited-implementation",
    name: "Accredited Implementation",
    audience: "Consultants and teams guiding organizations through Teal transformation.",
    price: "$2,400/year",
    timeline: "4–6 weeks",
    chip: "chip-teal",
    evidence: [
      "3+ organizational case studies (anonymized is fine)",
      "Methodology overview",
      "Team qualifications and Teal practitioner experience",
      "References from client organizations",
    ],
    steps: ["Submit practitioner profile", "Case study review", "Reference checks", "Accreditation issued", "Annual renewal via updated case portfolio"],
  },
];

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <ShieldCheck size={14} />
            Certification pathway
          </div>
          <h1>Apply for Teal recognition</h1>
          <p>
            Choose the path that matches your work. Each credential is scoped precisely — you decide what gets reviewed, and we verify exactly that.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <Link href="/pricing" className="btn btn-ghost-white">
              Compare pricing
              <ArrowRight size={15} />
            </Link>
            <Link href="/credentials" className="btn btn-gold">
              See all credentials
            </Link>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="content-section">
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem", marginBottom: "0.5rem" }}>
          Choose your pathway
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem", maxWidth: "60ch" }}>
          Each pathway has a defined evidence standard and assessment process. You can start at any level and upgrade later.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {pathways.map((path) => (
            <div key={path.slug} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <span className={`chip ${path.chip}`}>{path.name}</span>
                  <span style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{path.price}</span>
                  <span style={{ fontSize: "0.8125rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Clock size={12} />
                    {path.timeline}
                  </span>
                </div>
                <p style={{ color: "var(--ink-mid)", marginBottom: "1.25rem", maxWidth: "none", lineHeight: 1.65 }}>{path.audience}</p>

                <h4 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FileText size={15} style={{ color: "var(--teal)" }} />
                  Evidence you&apos;ll need
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {path.evidence.map((e, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem", color: "var(--ink-mid)" }}>
                      <CheckCircle2 size={15} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }} />
                      {e}
                    </li>
                  ))}
                </ul>

                <Link href={`/apply/${path.slug}`} className="btn btn-primary">
                  Start {path.name} application
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.875rem", color: "var(--ink)" }}>Assessment steps</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {path.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", paddingBlock: "0.5rem", position: "relative" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--teal-xlight)", border: "2px solid var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.6875rem", fontWeight: 700, color: "var(--teal)" }}>
                        {i + 1}
                      </div>
                      <p style={{ fontSize: "0.9rem", color: "var(--ink-mid)", paddingTop: "2px", maxWidth: "none" }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to expect callout */}
      <section className="content-section" style={{ paddingTop: 0 }}>
        <div style={{ background: "var(--teal-deep)", borderRadius: "var(--radius-xl)", padding: "2.5rem", color: "white", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", color: "white", marginBottom: "1rem" }}>
              What we protect
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "none" }}>
              Every credential is bounded. Our assessors confirm what was reviewed and what wasn&apos;t. We protect applicants from overclaiming and protect the public from misleading badges.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { icon: <ShieldCheck size={16} />, text: "Assessors are conflict-checked before every assignment" },
              { icon: <FileText size={16} />, text: "Scope is published: you know exactly what the badge covers" },
              { icon: <Upload size={16} />, text: "Your evidence stays confidential — only scoped summaries are published" },
              { icon: <AlertCircle size={16} />, text: "Misuse of credentials is actively monitored and enforced" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                <div style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.8)", maxWidth: "none" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
