import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Teal Registry",
  description: "Simple, transparent pricing for regenerative businesses, intentional communities, training providers, and implementation teams seeking Teal Registry credentials.",
};

const plans = [
  {
    track: "Free",
    name: "Public listing",
    price: "0",
    period: "/year",
    desc: "For organizations already doing this work who want to be discoverable and transparent.",
    badge: null,
    featured: false,
    cta: { label: "Claim your free listing", href: "/claim" },
    features: [
      "Listed in the public Teal Registry directory",
      "Teal Aligned status (self-declared, not independently verified)",
      "Public profile page with your mission, practices, and links",
      "Claim your pre-populated listing or start fresh",
      "Standard SEO-optimized listing page",
      "Annual renewal by self-attestation",
    ],
    note: "No verification. No badge. Transparent about what this is and isn't.",
  },
  {
    track: "Verified",
    name: "Teal Verified",
    price: "1,200",
    period: "/year",
    desc: "For organizations ready for an independent light-touch verification of their practices.",
    badge: null,
    featured: false,
    cta: { label: "Apply for verification", href: "/apply" },
    features: [
      "Independent document review by a Teal Registry assessor",
      "Teal Verified badge (logo + digital credential)",
      "Verified listing in directory with evidence summary",
      "Scope-bounded claim: exactly what was reviewed, clearly stated",
      "Annual renewal with lightweight re-attestation",
      "Priority listing placement in search results",
      "Verification report (private) with assessor findings",
    ],
    note: "Best for organizations that want external credibility without a full audit.",
  },
  {
    track: "Certified",
    name: "Teal Certified",
    price: "3,800",
    period: "/year",
    desc: "For organizations committed to a rigorous independent assessment with full public accountability.",
    badge: "Most rigorous",
    featured: true,
    cta: { label: "Apply for certification", href: "/apply" },
    features: [
      "Full independent assessment across all three Teal pillars",
      "Teal Certified badge — the registry's highest organizational credential",
      "Multi-assessor review + interview process",
      "Detailed public-facing verification record",
      "Enhanced listing with Teal Signals breakdown",
      "Annual renewal with mid-year check-in",
      "Eligible for featured placement + case study collaboration",
      "Misuse protection: active monitoring and enforcement",
    ],
    note: "Our most trusted credential. Recognized by funders, partners, and practitioners.",
  },
  {
    track: "Training",
    name: "Accredited Training",
    price: "2,400",
    period: "/year",
    desc: "For training providers delivering Teal curriculum to organizations and individuals.",
    badge: null,
    featured: false,
    cta: { label: "Apply for accreditation", href: "/apply" },
    features: [
      "Program content review by standards panel",
      "Accredited Training Provider badge",
      "Provider profile in the training directory",
      "Ability to issue Teal Trained credentials to graduates",
      "Annual curriculum re-attestation",
      "Listed in assessor qualification pathways",
    ],
    note: "For providers building the next generation of Teal practitioners.",
  },
  {
    track: "Implementation",
    name: "Accredited Implementation",
    price: "2,400",
    period: "/year",
    desc: "For implementation consultants and teams guiding organizations through Teal transitions.",
    badge: null,
    featured: false,
    cta: { label: "Apply for accreditation", href: "/apply" },
    features: [
      "Practitioner track record review",
      "Accredited Implementation Partner badge",
      "Provider profile in the implementation directory",
      "Ability to refer clients for discounted certification assessments",
      "Annual renewal with case evidence",
      "Listed in assessor qualification pathways",
    ],
    note: "For consultants who guide organizational transformation as their primary work.",
  },
  {
    track: "Framework",
    name: "Recognized Framework",
    price: "Contact",
    period: "",
    desc: "For frameworks, methodologies, and standards bodies that align with or underpin Teal practices.",
    badge: null,
    featured: false,
    cta: { label: "Start a conversation", href: "mailto:frameworks@tealregistry.com" },
    features: [
      "Framework alignment review",
      "Recognized Framework listing in the registry",
      "Cross-referencing in relevant organization profiles",
      "Co-authored standards comparison documentation",
      "Partner-level collaboration pathway",
    ],
    note: "Pricing varies by framework scale and collaboration scope. Let's talk.",
  },
];

const faqs = [
  {
    q: "What happens after I apply?",
    a: "You'll receive a readiness checklist within 3 business days. Once your evidence package is complete, we assign a qualified assessor with no conflicts of interest. Most assessments complete within 4–8 weeks depending on evidence quality and response time.",
  },
  {
    q: "Can organizations in the Global South apply at reduced cost?",
    a: "Yes. We offer a sliding scale for organizations in lower-income countries. Contact us before applying and we'll work out a fair fee structure.",
  },
  {
    q: "What if the assessment finds we're not ready?",
    a: "You'll receive an honest gap analysis. You can address the findings and reapply at a 50% discount within 12 months. We'd rather tell you now than grant a credential you can't stand behind.",
  },
  {
    q: "Is the Free listing really free forever?",
    a: "Yes. Self-declared Teal Aligned listings are free permanently. The only cost is honesty: you agree to clearly communicate that this is self-declared, not independently verified.",
  },
  {
    q: "Do credentials renew automatically?",
    a: "No. Renewal requires active re-attestation or re-assessment (depending on level). Expired credentials are clearly marked in the directory. We email reminders 90, 60, and 30 days before expiry.",
  },
  {
    q: "Can I upgrade from one credential level to another?",
    a: "Yes. Upgrades are prorated and prior evidence carries forward where applicable. Many organizations start with Verified and move to Certified as they mature.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <ShieldCheck size={14} />
            Transparent pricing
          </div>
          <h1>Simple, honest pricing</h1>
          <p>
            From a free public listing to our most rigorous certification. Every tier is clearly scoped so you know exactly what the credential represents.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="content-section pricing-section">
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`pricing-card${plan.featured ? " featured" : ""}`}>
              {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
              <p className="pricing-track">{plan.track}</p>
              <h2 className="pricing-name">{plan.name}</h2>
              <div className="pricing-price">
                {plan.price === "Contact" ? (
                  <span className="amount" style={{ fontSize: "1.5rem" }}>Let&apos;s talk</span>
                ) : (
                  <>
                    {plan.price !== "0" && <span style={{ fontSize: "1.25rem", color: "var(--muted)", alignSelf: "flex-start", paddingTop: "0.375rem" }}>$</span>}
                    <span className="amount">{plan.price === "0" ? "Free" : plan.price}</span>
                    {plan.period && <span className="period">{plan.period}</span>}
                  </>
                )}
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <ul className="pricing-features">
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.note && (
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", fontStyle: "italic", marginBottom: "1.5rem", maxWidth: "none", lineHeight: 1.5 }}>
                  {plan.note}
                </p>
              )}
              <Link
                href={plan.cta.href}
                className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
              >
                {plan.cta.label}
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>

        {/* Community note */}
        <div style={{ textAlign: "center", marginTop: "3rem", padding: "2.5rem", background: "var(--teal-xlight)", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-xl)" }}>
          <ShieldCheck size={32} style={{ color: "var(--teal)", margin: "0 auto 1rem", display: "block" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "0.75rem" }}>
            Verification is independent of training and consulting
          </h3>
          <p style={{ color: "var(--muted)", maxWidth: "56ch", marginInline: "auto", marginBottom: 0 }}>
            Teal Registry credentialing is always independent. We are not affiliated with any training provider, consulting firm, or methodology. Our assessors are conflict-checked before every engagement.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="content-section" style={{ maxWidth: "720px", marginInline: "auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>
          Common questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.625rem" }}>
                <HelpCircle size={18} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }} />
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>{faq.q}</h3>
              </div>
              <p style={{ color: "var(--ink-mid)", lineHeight: 1.7, paddingLeft: "1.625rem", maxWidth: "none" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>Ready to begin?</h2>
          <p>Start with a free listing — no commitment, no credit card. Upgrade when you&apos;re ready for independent verification.</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/claim" className="btn btn-gold" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Claim free listing
              <ArrowRight size={16} />
            </Link>
            <Link href="/apply" className="btn btn-ghost-white" style={{ minHeight: "48px", padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Apply for certification
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
