"use client";

import Link from "next/link";
import { AlertTriangle, ShieldCheck, CheckCircle2, Search, Mail } from "lucide-react";
import { useState } from "react";

const reportSteps = [
  { step: "Received", desc: "Your report is logged and acknowledged within 2 business days." },
  { step: "Triaged", desc: "We assess severity: misuse, error, or edge-case ambiguity." },
  { step: "Investigated", desc: "We review the badge record, scope, and any supplied evidence." },
  { step: "Decision made", desc: "Action ranges from private correction to public notice or revocation." },
  { step: "Public record updated", desc: "Any enforcement actions are documented in the registry." },
];

const severityLevels = [
  {
    label: "Critical",
    color: "#dc2626",
    desc: "Badge used to deceive in a financial, legal, or safety context. Investigated within 48 hours.",
  },
  {
    label: "High",
    color: "#d97706",
    desc: "Outdated, expired, or revoked badge still being promoted. Investigated within 5 business days.",
  },
  {
    label: "Medium",
    color: "#0891b2",
    desc: "Claims extending beyond the reviewed scope. Investigated within 2 weeks.",
  },
  {
    label: "Low",
    color: "#6b7280",
    desc: "Minor inaccuracies or unclear display. Corrected as part of routine review.",
  },
];

export default function ReportMisusePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    badgeId: "",
    claimUrl: "",
    description: "",
    evidence: "",
    contact: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <AlertTriangle size={14} />
            Badge integrity
          </div>
          <h1>Report badge misuse</h1>
          <p>
            Use this channel when a badge, profile, or Teal claim appears inaccurate, expired,
            exaggerated, or used outside its reviewed scope. Reports are reviewed for public trust
            impact.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:standards@tealregistry.com?subject=Badge%20Misuse%20Report" className="btn btn-gold">
              <Mail size={15} />
              Email a report
            </a>
            <Link href="/registry" className="btn btn-ghost-white">
              <Search size={15} />
              Check registry first
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container" style={{ maxWidth: "960px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>

          {/* Left: form or success */}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "1.5rem" }}>
              Submit a concern
            </h2>

            {submitted ? (
              <div style={{ background: "var(--teal-xlight)", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center" }}>
                <CheckCircle2 size={48} style={{ color: "var(--teal)", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.375rem", marginBottom: "0.625rem" }}>Report received</h3>
                <p style={{ color: "var(--ink-mid)", lineHeight: 1.7, maxWidth: "none" }}>
                  We will acknowledge your report within 2 business days. If you provided contact information, we may follow up for clarification.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ badgeId: "", claimUrl: "", description: "", evidence: "", contact: "" }); }} className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
                  Submit another report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.375rem" }}>
                    Badge ID or profile link <span style={{ color: "var(--teal)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TR-CERT-NL-001 or https://tealregistry.com/registry/..."
                    value={form.badgeId}
                    onChange={e => setForm(f => ({ ...f, badgeId: e.target.value }))}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.9375rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.375rem" }}>
                    Where the claim is being used <span style={{ color: "var(--teal)" }}>*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/team-page"
                    value={form.claimUrl}
                    onChange={e => setForm(f => ({ ...f, claimUrl: e.target.value }))}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.9375rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.375rem" }}>
                    What appears inaccurate or misleading <span style={{ color: "var(--teal)" }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the specific concern clearly and factually."
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.9375rem", fontFamily: "var(--font-body)", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.375rem" }}>
                    Evidence or screenshots (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste URLs, describe screenshots, or share any supporting context."
                    value={form.evidence}
                    onChange={e => setForm(f => ({ ...f, evidence: e.target.value }))}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.9375rem", fontFamily: "var(--font-body)", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.375rem" }}>
                    Your contact information (optional)
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com — only used for follow-up if needed"
                    value={form.contact}
                    onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                    style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.9375rem", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
                  />
                  <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.375rem", maxWidth: "none" }}>
                    Anonymous reports are accepted. Contact information is only used for clarification.
                  </p>
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start", minHeight: "48px", padding: "0.75rem 2rem", fontSize: "1rem" }}>
                  Submit report
                </button>
              </form>
            )}
          </div>

          {/* Right: how reports are handled */}
          <aside>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "1.25rem" }}>
                How reports are handled
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {reportSteps.map((step, i) => (
                  <div key={step.step} style={{ display: "flex", gap: "0.875rem", paddingBottom: i < reportSteps.length - 1 ? "1.25rem" : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flexShrink: 0 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--teal)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>
                        {i + 1}
                      </div>
                      {i < reportSteps.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: "var(--border)", minHeight: "24px" }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < reportSteps.length - 1 ? "0.25rem" : 0 }}>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem", maxWidth: "none" }}>{step.step}</p>
                      <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "1rem" }}>
                Severity levels
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {severityLevels.map((level) => (
                  <div key={level.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.2rem 0.5rem", borderRadius: "4px", background: level.color + "1A", color: level.color, flexShrink: 0, whiteSpace: "nowrap" }}>
                      {level.label}
                    </span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.6, maxWidth: "none", margin: 0 }}>{level.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* What we can act on */}
      <section style={{ background: "var(--teal-xlight)", borderTop: "1px solid var(--teal-light)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "1.25rem" }}>
            What Teal Registry can and cannot act on
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <h4 style={{ fontSize: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--teal-dark)", marginBottom: "0.75rem" }}>We can act on</h4>
              {[
                "Badge displayed after expiry",
                "Claims extending beyond reviewed scope",
                "Badge ID attached to a different organization",
                "Fraudulent use in investment or procurement contexts",
                "Revoked credential still being promoted",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-start" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "0.2rem" }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--ink-mid)" }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", marginBottom: "0.75rem" }}>Outside our jurisdiction</h4>
              {[
                "Whether an organization is 'good' beyond the reviewed scope",
                "Internal employment disputes",
                "General concerns about the organization not related to the badge",
                "Claims made verbally without a badge citation",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-start" }}>
                  <ShieldCheck size={14} style={{ color: "var(--muted)", flexShrink: 0, marginTop: "0.2rem" }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
