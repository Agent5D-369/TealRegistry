"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, CheckCircle2, ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function ClaimPage() {
  const [query, setQuery] = useState("");
  const [claimed, setClaimed] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner" style={{ maxWidth: "640px" }}>
          <div className="hero-eyebrow">
            <Star size={14} />
            Claim your listing
          </div>
          <h1>Is your organization in the directory?</h1>
          <p>
            We pre-populate listings for notable regenerative organizations based on public research. If yours is here, claim it — update the details, add your story, and start the verification process.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="content-section" style={{ maxWidth: "640px", marginInline: "auto" }}>
        {!claimed ? (
          <>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "1rem" }}>
              Search for your organization
            </h2>
            <div className="search-bar" style={{ marginBottom: "1.5rem" }}>
              <Search size={18} />
              <input
                type="text"
                placeholder="Organization name, website, or keyword…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Link href={`/registry?q=${encodeURIComponent(query)}`} className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                Search
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
              {[
                "Search the directory for your organization name",
                "Click 'Claim Listing' on your profile page",
                "Create an account or log in to verify ownership",
                "Update your details and start the verification process",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--teal)", color: "white", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <p style={{ paddingTop: "2px", color: "var(--ink-mid)", maxWidth: "none" }}>{step}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "0.75rem" }}>
                Not in the directory yet?
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: "1rem", maxWidth: "none" }}>
                You can create a free listing directly. Start with a Teal Aligned self-declaration and upgrade to independent verification when you&apos;re ready.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setClaimed(true)}
                  className="btn btn-primary"
                >
                  Create a new listing
                  <ArrowRight size={15} />
                </button>
                <Link href="/apply" className="btn btn-ghost">
                  Apply for certification instead
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "2.5rem", textAlign: "center" }}>
            <CheckCircle2 size={48} style={{ color: "var(--teal)", margin: "0 auto 1rem", display: "block" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              Let&apos;s get you set up
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem", maxWidth: "none" }}>
              Create an account to start your free listing. You can add your organization details, choose your credential level, and manage everything from your dashboard.
            </p>
            <Link href="/login?mode=register&next=/dashboard/organization" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <ShieldCheck size={16} />
              Create account and start listing
            </Link>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "1rem", maxWidth: "none" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "var(--teal)" }}>Sign in</Link>
            </p>
          </div>
        )}
      </section>

      {/* What you get */}
      <section className="content-section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "2rem", textAlign: "center" }}>
            What you get with a free listing
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[
              { title: "Public directory profile", desc: "Your own listing page in the Teal Registry directory, discoverable by searches for your name, sector, and type." },
              { title: "Teal Aligned status", desc: "Self-declared recognition that you're doing this work. Clearly labeled as self-declared, not independently verified." },
              { title: "SEO-optimized listing", desc: "Your listing is structured to rank alongside or above your own website for searches about your organization." },
              { title: "Claim & customize", desc: "Update your mission, practices, highlights, audience, and contact links. Tell your own story." },
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                <CheckCircle2 size={20} style={{ color: "var(--teal)", marginBottom: "0.75rem" }} />
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.65, maxWidth: "none" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
