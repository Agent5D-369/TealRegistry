import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { tealBasics } from "@/data/platform";

export const metadata: Metadata = {
  title: "Teal Standards | Teal Registry",
  description:
    "The three unwavering principles of Teal: Evolutionary Purpose, Self-Organization, and Wholeness. Teal is not a vibe — it shows up in real decisions.",
};

const standards = [
  {
    code: "TR-S-001",
    title: "Purpose drives decisions",
    status: "Active",
    summary:
      "The organization has a living purpose that people use when making real choices about direction, trade-offs, and resource allocation — not just one that appears in marketing.",
    criteria: [
      "Purpose is stated explicitly and regularly tested against actual decisions",
      "People can describe how the purpose shaped a recent choice",
      "Purpose is not primarily used as a branding or recruitment tool",
      "Tension between purpose and commercial pressure is acknowledged, not suppressed",
    ],
  },
  {
    code: "TR-S-002",
    title: "Power is distributed through clear agreements",
    status: "Active",
    summary:
      "Decisions are made by those with the most relevant knowledge and accountability, through documented structures that everyone understands. Power concentration is actively monitored.",
    criteria: [
      "Decision rights are documented and accessible to all members",
      "People can challenge decisions through a known process without retaliation",
      "Compensation and resource decisions are made transparently",
      "Leadership does not override distributed authority without a documented, accountable process",
    ],
  },
  {
    code: "TR-S-003",
    title: "People can bring truth into the work",
    status: "Active",
    summary:
      "The culture enables honest disagreement, visible conflict, learning from failure, and human presence. A culture requiring masks, silence, or burnout cannot credibly call itself Teal.",
    criteria: [
      "Conflict and disagreement can be raised without informal punishment",
      "Failure is treated as learning, not as evidence of individual inadequacy",
      "People report feeling safe to raise concerns to senior roles",
      "Burnout and overwork patterns are tracked and addressed structurally",
    ],
  },
  {
    code: "TR-S-004",
    title: "Evidence matches the scope of the claim",
    status: "Active",
    summary:
      "The evidence reviewed covers exactly what the public record claims — no more, no less. Teal Registry does not accept global claims based on partial evidence.",
    criteria: [
      "Evidence is drawn from the stated scope of operations",
      "Claims do not extend beyond what was actually reviewed",
      "Scope limitations are stated in the public record",
      "Evidence sources are documented and can be independently referenced",
    ],
  },
  {
    code: "TR-S-005",
    title: "Independence is structurally protected",
    status: "Active",
    summary:
      "Assessors have no financial or relational ties to applicants. Training providers cannot certify their own clients. Registry governance is separate from any consulting, training, or investment interest.",
    criteria: [
      "All assessors complete a conflict-of-interest declaration before each assignment",
      "Accredited training providers are structurally prohibited from certifying their own clients",
      "Registry leadership has no commercial relationship with applicants",
      "Independence violations trigger automatic case suspension and review",
    ],
  },
];

export default function StandardsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <ShieldCheck size={14} />
            Standards
          </div>
          <h1>The three unwavering principles of Teal</h1>
          <p>
            Teal is not a vibe, a color palette, or a beautiful claim. It is a practical way of
            working that must show up in real decisions, under pressure, with real consequences.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/credentials" className="btn btn-gold">
              See credential ladder
              <ArrowRight size={15} />
            </Link>
            <Link href="/apply" className="btn btn-ghost-white">
              Apply for review
            </Link>
          </div>
        </div>
      </section>

      {/* The three principles */}
      <section className="content-section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem", marginBottom: "0.75rem", textAlign: "center" }}>
            You need all three.
          </h2>
          <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: "3rem", fontSize: "1.0625rem" }}>
            For a founder, funder, land steward, team member, or community partner, the plain test is simple. A regenerative organization must show all three — consistently.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {tealBasics.map((item, index) => (
              <article key={item.title} style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: "1.5rem",
                padding: "2rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "var(--teal)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.375rem",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {index + 1}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--teal-dark)" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--ink-mid)", lineHeight: 1.75, marginBottom: "1rem", maxWidth: "none" }}>
                    {item.body}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", background: "var(--gold)" + "1A", border: "1px solid " + "var(--gold)" + "4D", borderRadius: "var(--radius)", padding: "0.75rem 1rem" }}>
                    <AlertCircle size={15} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "0.1rem" }} />
                    <p style={{ fontSize: "0.875rem", color: "var(--ink)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>
                      <strong>Watch for this:</strong> {item.missingRisk}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", background: "var(--teal-dark)", color: "white", borderRadius: "var(--radius-lg)", padding: "2rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.375rem", marginBottom: "0.75rem", color: "white" }}>
              Teal Registry looks for all three working together.
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.75, maxWidth: "none", margin: 0 }}>
              This is the key point: one strong principle cannot cover for a missing one. Teal is the
              pattern created when purpose, self-organization, and wholeness reinforce each other in
              real work — not in documents or aspirational language.
            </p>
          </div>
        </div>
      </section>

      {/* Registry standards */}
      <section style={{ background: "var(--bg-subtle, #f8faf9)", borderTop: "1px solid var(--border)", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "0.75rem" }}>
            Registry assessment standards
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "2.5rem", fontSize: "1.0625rem" }}>
            These standards govern what Teal Registry assessors look for and how decisions are made.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {standards.map((standard) => (
              <article key={standard.code} style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.75rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                  <code style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "monospace", background: "var(--bg-subtle, #f8faf9)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                    {standard.code}
                  </code>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--teal)", background: "var(--teal-xlight)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                    {standard.status}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "0.625rem" }}>
                  {standard.title}
                </h3>
                <p style={{ color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "1rem", maxWidth: "none" }}>
                  {standard.summary}
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {standard.criteria.map((criterion) => (
                    <li key={criterion} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <CheckCircle2 size={15} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "0.2rem" }} />
                      <span style={{ fontSize: "0.9rem", color: "var(--ink-mid)", lineHeight: 1.65 }}>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>Ready to see where you stand?</h2>
          <p>Browse the credential ladder or start an application.</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/credentials" className="btn btn-gold" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Credential ladder
              <ArrowRight size={16} />
            </Link>
            <Link href="/apply" className="btn btn-ghost-white" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Apply now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
