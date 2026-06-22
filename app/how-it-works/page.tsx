import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Search, FileText, Users, CheckCircle2, ArrowRight, Star, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | Teal Registry",
  description: "How Teal Registry certification works — from application to badge issuance, evidence review, assessor assignment, and renewal.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <ShieldCheck size={14} />
            Process overview
          </div>
          <h1>How certification works</h1>
          <p>
            Rigorous, bounded, and transparent. Teal Registry credentials are earned through independent evidence review — not self-assessment or committee consensus.
          </p>
        </div>
      </section>

      {/* Main process flow */}
      <section className="content-section">
        <div style={{ maxWidth: "820px", marginInline: "auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem", marginBottom: "2.5rem", textAlign: "center" }}>
            The certification process
          </h2>

          {[
            {
              step: 1,
              icon: <Star size={24} />,
              title: "Choose your path",
              body: "Select the credential level that matches your organization's stage and goals. We offer free Teal Aligned listings, Teal Verified (light-touch independent review), Teal Certified (full independent assessment), and specialist credentials for training providers, implementation teams, and frameworks.",
              link: { label: "See all credentials →", href: "/credentials" },
            },
            {
              step: 2,
              icon: <FileText size={24} />,
              title: "Submit your application",
              body: "Complete the intake form with your organization's details, the scope of what you want reviewed, and your contact information. We'll send a readiness checklist tailored to your chosen credential within 3 business days.",
              link: null,
            },
            {
              step: 3,
              icon: <Search size={24} />,
              title: "Assemble your evidence",
              body: "Your secure evidence portal opens immediately after your application fee is received. Upload documents, links, and supporting materials. You control what's in scope — we assess exactly that, nothing more.",
              link: null,
            },
            {
              step: 4,
              icon: <Users size={24} />,
              title: "Assessor assignment",
              body: "We assign a qualified Teal Registry assessor with no conflicts of interest. For Teal Certified, a second assessor reviews independently. Assessors are Teal practitioners with sector expertise matched to your organization.",
              link: null,
            },
            {
              step: 5,
              icon: <ShieldCheck size={24} />,
              title: "Review and decision",
              body: "Assessors review your evidence, may request clarification, and for Teal Certified may conduct stakeholder interviews. A decision is issued with a public scope statement describing exactly what was assessed and the finding.",
              link: null,
            },
            {
              step: 6,
              icon: <CheckCircle2 size={24} />,
              title: "Badge issuance and listing",
              body: "Upon approval, your digital badge is issued and your registry listing goes live with the full verification record. You can display your badge on your website, in proposals, and in communications — within the scope stated in your record.",
              link: { label: "Explore the directory →", href: "/registry" },
            },
          ].map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "1.25rem", marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--teal)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: "0.6875rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Step {item.step}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.375rem", marginBottom: "0.625rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--ink-mid)", lineHeight: 1.75, maxWidth: "none" }}>{item.body}</p>
                {item.link && (
                  <Link href={item.link.href} style={{ color: "var(--teal)", fontSize: "0.9375rem", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.75rem" }}>
                    {item.link.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Renewal */}
      <section style={{ background: "var(--teal-xlight)", borderTop: "1px solid var(--teal-light)", borderBottom: "1px solid var(--teal-light)", padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1rem" }}>
            Renewal and ongoing accountability
          </h2>
          <p style={{ color: "var(--ink-mid)", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "none" }}>
            Teal Registry credentials are annual. We email renewal reminders 90, 60, and 30 days before expiry. Expired credentials are clearly marked in the directory. Renewal requirements depend on your credential level: some require only a self-attestation update, others require a lightweight re-assessment.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { level: "Teal Aligned", renewal: "Annual self-attestation" },
              { level: "Teal Verified", renewal: "Lightweight re-review + attestation" },
              { level: "Teal Certified", renewal: "Mid-year check-in + annual re-assessment" },
              { level: "Accredited Training", renewal: "Cohort evidence + program update" },
            ].map((item, i) => (
              <div key={i} style={{ background: "white", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-lg)", padding: "1.25rem" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--teal-dark)", marginBottom: "0.375rem", maxWidth: "none" }}>{item.level}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", maxWidth: "none" }}>{item.renewal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrity */}
      <section className="content-section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1.5rem" }}>
            Integrity protections
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {[
              { icon: <ShieldCheck size={20} />, title: "Conflict of interest checks", desc: "Every assessor declares any connection to the applicant before assignment. COI declarations are on record for every case." },
              { icon: <Search size={20} />, title: "Scope-bounded claims", desc: "Badges cover exactly what was assessed. The public record states the scope — no overreaching claims are implied." },
              { icon: <AlertTriangle size={20} />, title: "Misuse monitoring", desc: "We actively monitor for misuse of Teal Registry badges. Reports are investigated and enforcement actions are published." },
              { icon: <CheckCircle2 size={20} />, title: "Independent of training & consulting", desc: "Teal Registry credentialing is structurally separate from any training provider or consulting firm. Our assessors have no commercial relationship with applicants." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "var(--radius)", background: "var(--teal-xlight)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.375rem" }}>{item.title}</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "none" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>Ready to start?</h2>
          <p>Begin with a free listing or go straight to independent verification.</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/apply" className="btn btn-gold" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Apply for certification
              <ArrowRight size={16} />
            </Link>
            <Link href="/claim" className="btn btn-ghost-white" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Claim a free listing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
