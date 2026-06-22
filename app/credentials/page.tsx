import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, AlertCircle, Lock, CheckCircle2 } from "lucide-react";
import { credentialLevels } from "@/data/registry";

export const metadata: Metadata = {
  title: "Credential Ladder | Teal Registry",
  description:
    "Every Teal Registry badge has a clear meaning, clear limits, and a public record. Explore all nine credential levels from Teal Aligned to Recognized Framework.",
};

const trackColors: Record<string, string> = {
  entry: "#0d9488",
  learning: "#0891b2",
  practice: "#7c3aed",
  delivery: "#d97706",
  oversight: "#dc2626",
  ecosystem: "#059669",
};

const trackLabels: Record<string, string> = {
  entry: "Entry",
  learning: "Learning",
  practice: "Practice",
  delivery: "Delivery",
  oversight: "Oversight",
  ecosystem: "Ecosystem",
};

export default function CredentialsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <ShieldCheck size={14} />
            Credential ladder
          </div>
          <h1>Every badge has a boundary</h1>
          <p>
            A Teal Registry credential tells an independent story: what was reviewed, by whom, and
            within what scope. No credential implies more than the public record states.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/apply" className="btn btn-gold">
              Choose a pathway
              <ArrowRight size={15} />
            </Link>
            <Link href="/standards" className="btn btn-ghost-white">
              Read the standards
            </Link>
          </div>
        </div>
      </section>

      {/* Trust signals bar */}
      <div style={{ background: "var(--teal-xlight)", borderBottom: "1px solid var(--teal-light)", padding: "1.25rem 0" }}>
        <div className="container" style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          {[
            { icon: <CheckCircle2 size={16} />, text: "Independent of training and consulting" },
            { icon: <AlertCircle size={16} />, text: "Scope-bounded — no overreaching claims" },
            { icon: <Lock size={16} />, text: "COI declarations on every case" },
            { icon: <ShieldCheck size={16} />, text: "Annual renewal — expiry always visible" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--teal-dark)", fontSize: "0.875rem", fontWeight: 500 }}>
              {item.icon}
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Credential cards */}
      <section className="content-section">
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem", marginBottom: "0.75rem", textAlign: "center" }}>
            The full credential ladder
          </h2>
          <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: "3rem", fontSize: "1.0625rem" }}>
            Nine credential types, each purpose-built for a specific audience and claim boundary.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {credentialLevels.map((level) => {
              const color = trackColors[level.track] || "var(--teal)";
              return (
                <article key={level.level} style={{
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.75rem",
                  background: "var(--surface)",
                  display: "grid",
                  gridTemplateColumns: "56px 1fr auto",
                  gap: "1.5rem",
                  alignItems: "start",
                }}>
                  {/* Level badge */}
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {level.level}
                  </div>

                  {/* Content */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.375rem", margin: 0 }}>
                        {level.title}
                      </h3>
                      <span style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        background: color + "1A",
                        color,
                      }}>
                        {trackLabels[level.track]}
                      </span>
                    </div>
                    <p style={{ color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "1rem", maxWidth: "none" }}>
                      {level.targetDescription}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.5rem", marginBottom: "0.875rem" }}>
                      {[
                        { label: "Eligible", value: level.eligible },
                        { label: "Evidence required", value: level.evidenceRequired },
                        { label: "Public label", value: level.publicLabel },
                      ].map((field) => (
                        <div key={field.label} style={{ fontSize: "0.8125rem" }}>
                          <span style={{ color: "var(--muted)", display: "block", marginBottom: "0.2rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.6875rem" }}>{field.label}</span>
                          <span style={{ color: "var(--ink)" }}>{field.value}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--muted)", fontStyle: "italic", borderLeft: "3px solid var(--border)", paddingLeft: "0.875rem", maxWidth: "none", margin: 0 }}>
                      {level.note}
                    </p>
                  </div>

                  {/* CTA */}
                  <div style={{ flexShrink: 0 }}>
                    <Link href="/apply" className="btn btn-primary" style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem", whiteSpace: "nowrap" }}>
                      Apply
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What badges don't claim */}
      <section style={{ background: "var(--ink-dark)", color: "white", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1rem", color: "white" }}>
            What our badges don&apos;t claim
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "2rem" }}>
            Trust is built on accurate limits as much as accurate claims.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              "That an entire organization is perfectly Teal beyond the reviewed scope",
              "That an accredited training provider can certify their own clients",
              "That a Teal Aligned listing has been independently reviewed",
              "That any credential removes the need to examine actual decisions and behavior",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                <AlertCircle size={16} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "0.2rem" }} />
                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>Ready to start your application?</h2>
          <p>Choose the credential level that fits your stage and goals.</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/apply" className="btn btn-gold" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Apply for certification
              <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works" className="btn btn-ghost-white" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              How it works
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
