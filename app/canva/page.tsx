import type { Metadata } from "next";
import Link from "next/link";
import { Palette, CheckCircle2, AlertCircle } from "lucide-react";
import { canvaTemplatePlan } from "@/data/platform";

export const metadata: Metadata = {
  title: "Canva Template System | Teal Registry",
  description: "Official share assets for badge announcements, profile cards, certificate PDFs, and plain-language Teal explainers.",
};

export default function CanvaLayerPage() {
  return (
    <>
      <section className="page-hero" style={{ paddingBlock: "3.5rem" }}>
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <Palette size={14} />
            Brand assets
          </div>
          <h1>Canva template system</h1>
          <p>
            Official share assets keep public claims accurate: badge announcements, profile cards,
            certificate PDFs, and plain-language Teal explainers.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/credentials" className="btn btn-gold">
              Use badge language
            </Link>
            <Link href="/standards" className="btn btn-ghost-white">
              Teal explainer
            </Link>
          </div>
        </div>
      </section>

      {/* Template grid */}
      <section className="content-section">
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "2rem" }}>
            Template library
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {canvaTemplatePlan.map((template) => (
              <article key={template.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "var(--radius)", background: "var(--teal-xlight)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.875rem" }}>
                  <Palette size={18} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                  {template.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "none", marginBottom: "1rem" }}>
                  {template.value}
                </p>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "var(--teal-xlight)", color: "var(--teal)" }}>
                  {template.format}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Template rules */}
      <section style={{ background: "var(--teal-xlight)", borderTop: "1px solid var(--teal-light)", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "820px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "1rem" }}>
              Template rules
            </h2>
            <p style={{ color: "var(--ink-mid)", lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: "none" }}>
              Every external graphic must meet these requirements to protect public trust and legal accuracy.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                "Link back to the live registry record",
                "Name the exact scope of the claim",
                "Never imply more than what was reviewed",
                "Use Teal Registry brand kit colors and fonts",
                "Include the badge ID and valid-to date",
              ].map((rule) => (
                <div key={rule} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "0.2rem" }} />
                  <span style={{ fontSize: "0.9rem", color: "var(--ink-mid)" }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "white", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "0.75rem" }}>
              Canva brand kit status
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "1rem" }}>
              <AlertCircle size={15} style={{ color: "#d97706", flexShrink: 0, marginTop: "0.1rem" }} />
              <p style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>
                Brand kit found: <strong>Teal Registry — Standards Body</strong>. Fillable templates are not yet created in Canva. This page defines the template set to build next.
              </p>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>
              Once templates are created in Canva, share links will appear here for certified organizations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
