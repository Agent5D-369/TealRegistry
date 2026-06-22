import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Search, ArrowRight, CheckCircle2, Globe, Users, BookOpen, Building2, Leaf, Star } from "lucide-react";
import { credentialLevels } from "@/data/registry";
import { getFeaturedListings } from "@/lib/registry-records";

export default async function Home() {
  const featured = await getFeaturedListings(6);

  const tealPillars = [
    {
      num: "01",
      title: "Evolutionary Purpose",
      body: "The organization is guided by a living sense of purpose beyond profit. Decisions emerge from asking 'what does this work want to become?'"
    },
    {
      num: "02",
      title: "Wholeness",
      body: "People bring their full selves to work. Structures invite authenticity, vulnerability, and emotional intelligence — not just performance."
    },
    {
      num: "03",
      title: "Self-Management",
      body: "Power is distributed. Roles evolve. Decisions are made by those closest to the work, in transparent systems that don't require hierarchy to function."
    },
  ];

  const howItWorks = [
    { step: "1", title: "Choose Your Path", body: "Select the credential level that matches where your organization is. Each level has clear evidence requirements." },
    { step: "2", title: "Submit Evidence", body: "Upload documentation, case studies, and supporting material. An independent assessor reviews your submission." },
    { step: "3", title: "Receive Your Listing", body: "Approved applications generate a live public listing with your badge, scope, and verification date." },
    { step: "4", title: "Maintain Your Standing", body: "Annual renewals and a public misuse-reporting channel keep the registry credible over time." },
  ];

  const trustedBy = [
    "Regenerative Businesses", "Intentional Communities", "Training Providers",
    "Implementation Consultants", "Frameworks & Methodologies", "Co-creators & Practitioners"
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-dark">
        <div className="hero-dark-inner">
          {/* Left: Copy */}
          <div className="animate-fade-up">
            <div className="hero-eyebrow">
              <ShieldCheck size={14} />
              Independent Certification Authority
            </div>
            <h1 className="hero-title">
              The trust layer for<br />
              <em>regenerative organizations</em>
            </h1>
            <p className="hero-sub">
              Teal Registry independently certifies businesses, communities, training providers, and frameworks operating beyond traditional management — so the world can trust the claims, not just the stories.
            </p>
            <div className="hero-actions">
              <Link href="/registry" className="btn btn-gold btn-lg">
                <Search size={18} />
                Explore Directory
              </Link>
              <Link href="/apply" className="btn btn-ghost-white btn-lg">
                Begin Certification
                <ArrowRight size={18} />
              </Link>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", marginTop: "1rem", maxWidth: "none" }}>
              Independent of training providers · Scope-bounded · Renewal-required
            </p>
          </div>

          {/* Right: Badge panel + verify strip */}
          <div className="hero-badge-panel animate-fade-up delay-2">
            <div className="badge-grid-display">
              {[
                { src: "/assets/badges/teal-aligned.png", label: "Aligned" },
                { src: "/assets/badges/teal-verified.png", label: "Verified" },
                { src: "/assets/badges/teal-certified.png", label: "Certified" },
                { src: "/assets/badges/teal-accredited-training.png", label: "Accredited Training" },
                { src: "/assets/badges/teal-accredited-implementation.png", label: "Accredited Impl." },
                { src: "/assets/badges/teal-recognized-framework.png", label: "Framework" },
              ].map((b) => (
                <div key={b.label} className="badge-item">
                  <Image src={b.src} alt={b.label} width={72} height={72} />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
            <div className="verify-strip">
              <ShieldCheck size={18} style={{ color: "var(--gold)", flexShrink: 0 }} />
              <input
                  type="text"
                  placeholder="Enter badge ID or org name to verify…"
                  readOnly
                  style={{ cursor: "text" }}
              />
              <Link href="/verify" style={{ textDecoration: "none" }}>
                <button type="button">Verify</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────── */}
      <div className="trust-bar">
        <div className="trust-bar-inner">
          <div className="trust-item">
            <CheckCircle2 size={16} />
            Verified independent of training
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} />
            Scope-bounded credentials
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} />
            Public misuse reporting
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} />
            Annual renewal required
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} />
            &quot;As of&quot; dates on all listings
          </div>
        </div>
      </div>

      {/* ── Who we certify ────────────────────────────────── */}
      <section className="section-sm" style={{ background: "var(--surface)" }}>
        <div className="container">
          <p className="text-center" style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem", maxWidth: "none" }}>
            Certification pathways for
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.625rem", flexWrap: "wrap" }}>
            {trustedBy.map((t) => (
              <span key={t} className="chip chip-teal">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teal pillars ──────────────────────────────────── */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="section-head centered">
            <div className="section-label">What is Teal?</div>
            <h2>Three principles that distinguish teal-aligned organizations</h2>
            <p>
              Teal Registry doesn&apos;t certify intent. It certifies evidence. These three pillars define what assessors look for.
            </p>
          </div>
          <div className="teal-pillars" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            {tealPillars.map((p) => (
              <div key={p.num} className="teal-pillar">
                <div className="teal-pillar-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured directory listings ────────────────────── */}
      <section className="section" style={{ background: "var(--teal-deep)", color: "white" }}>
        <div className="container">
          <div className="section-head centered">
            <div className="section-label" style={{ color: "var(--gold)" }}>Featured in the Registry</div>
            <h2 style={{ color: "white" }}>Organizations already doing the work</h2>
            <p style={{ color: "rgba(255,255,255,0.65)" }}>
              Pre-populated with marquee regenerative organizations. Each listing is a full landing page — searchable, citable, verifiable.
            </p>
          </div>

          {featured.length > 0 ? (
            <div className="directory-grid" style={{ marginBottom: "2.5rem" }}>
              {featured.map((org) => (
                <Link
                  key={org.slug}
                  href={`/registry/${org.slug}`}
                  className="listing-card"
                  style={{ color: "inherit" }}
                >
                  <div className="listing-card-accent" />
                  {org.featured && <div className="featured-badge">Featured</div>}
                  <div className="listing-card-body">
                    <div className="listing-card-top">
                      <div className="listing-card-meta">
                        <div className="listing-card-name">{org.name}</div>
                        <div className="listing-card-tagline">{org.tagline ?? org.entityType}</div>
                      </div>
                      {org.badgeImage && (
                        <Image
                          src={org.badgeImage}
                          alt={`${org.credentialLevel} badge`}
                          width={56}
                          height={56}
                          className="listing-card-badge"
                        />
                      )}
                    </div>
                    <p className="listing-card-summary">
                      {org.summary?.slice(0, 160)}
                      {(org.summary?.length ?? 0) > 160 ? "…" : ""}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span className={`chip chip-${org.credentialLevel?.toLowerCase().replace(/\s+/g, "-") || "teal"}`}>
                        {org.credentialLevel}
                      </span>
                      {org.country && (
                        <span className="chip chip-muted">
                          <Globe size={11} />
                          {org.country}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="listing-card-foot">
                    <span className="listing-card-detail">
                      {org.sector && <><strong>{org.sector}</strong> · </>}
                      {org.entityType}
                    </span>
                    <ArrowRight size={16} className="listing-card-arrow" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Static placeholder cards when DB not connected */
            <div className="directory-grid" style={{ marginBottom: "2.5rem" }}>
              {staticFeatured.map((org) => (
                <Link key={org.slug} href={`/registry/${org.slug}`} className="listing-card">
                  <div className="listing-card-accent" />
                  {org.featured && <div className="featured-badge">Featured</div>}
                  <div className="listing-card-body">
                    <div className="listing-card-top">
                      <div className="listing-card-meta">
                        <div className="listing-card-name">{org.name}</div>
                        <div className="listing-card-tagline">{org.tagline}</div>
                      </div>
                      <Image src={org.badgeImage} alt="" width={56} height={56} className="listing-card-badge" />
                    </div>
                    <p className="listing-card-summary">{org.summary}</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span className="chip chip-certified">{org.credentialLevel}</span>
                      <span className="chip chip-muted"><Globe size={11} />{org.country}</span>
                    </div>
                  </div>
                  <div className="listing-card-foot">
                    <span className="listing-card-detail"><strong>{org.sector}</strong> · {org.entityType}</span>
                    <ArrowRight size={16} className="listing-card-arrow" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/registry" className="btn btn-gold btn-lg">
              Browse All Listings
              <ArrowRight size={18} />
            </Link>
            <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", maxWidth: "none" }}>
              Is your organization doing this work? <Link href="/claim" style={{ color: "var(--gold)" }}>Claim your listing →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Credential ladder ─────────────────────────────── */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="section-head">
            <div className="section-label">Credential Ladder</div>
            <h2>Six distinct badges. Each one means something specific.</h2>
            <p>
              Unlike trophy systems, Teal Registry badges are scoped. Each tells you what was reviewed, what was not, and when.
            </p>
          </div>

          <div className="credential-table">
            <div className="credential-row header">
              <span>Step</span>
              <span>Badge</span>
              <span>What was assessed</span>
              <span>Plain meaning</span>
            </div>
            {credentialLevels.map((level) => (
              <div className="credential-row" key={level.title}>
                <div className="credential-step">{String(level.level).padStart(2, "0")}</div>
                <div className="credential-badge-cell">
                  <Image
                    src={level.badgeImage}
                    alt={`${level.title} badge`}
                    width={56}
                    height={56}
                  />
                  <div>
                    <strong>{level.title}</strong>
                    <small>{level.publicLabel}</small>
                  </div>
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--ink-mid)" }}>{level.evidenceRequired}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>{level.note}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href="/credentials" className="btn btn-ghost">
              Full Credential Details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-head centered">
            <div className="section-label">The Process</div>
            <h2>Clear from application to public badge</h2>
            <p>
              No black boxes. Applicants always know where they stand, what&apos;s next, and what they can claim.
            </p>
          </div>
          <div className="steps-grid">
            {howItWorks.map((s) => (
              <div key={s.step} className="step-item">
                <div className="step-num">{s.step}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who is this for? ──────────────────────────────── */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="section-head centered">
            <div className="section-label">Who Uses the Registry</div>
            <h2>Built for everyone in the regenerative ecosystem</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: <Building2 size={24} />, title: "Organizations & Businesses", body: "Earn a credential that tells the real story of your work — scoped, dated, and independently verified." },
              { icon: <Users size={24} />, title: "Communities & Funders", body: "Verify claims before partnerships, grants, or investments. Know what was actually assessed." },
              { icon: <BookOpen size={24} />, title: "Training & Implementation", body: "Distinguish your accreditation from the organizations you train. Independent verification protects both." },
              { icon: <Star size={24} />, title: "Assessors & Evaluators", body: "Join a credentialed network. Run structured reviews with clear frameworks and documented decisions." },
              { icon: <Globe size={24} />, title: "Frameworks & Methodologies", body: "Get your methodology recognized and cross-referenced in the directory." },
              { icon: <Leaf size={24} />, title: "Co-creators & Practitioners", body: "Establish your standing in the field. Public listings support speaking, consulting, and collaboration." },
            ].map((item) => (
              <div key={item.title} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div style={{ width: 44, height: 44, background: "var(--teal-light)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal)" }}>
                  {item.icon}
                </div>
                <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1.0625rem" }}>{item.title}</h4>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted)", maxWidth: "none" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Start with clarity. Earn the badge. Keep the trust.</h2>
          <p>
            Whether you&apos;re ready to apply, want to verify an existing claim, or need to claim your listing — the path is clear.
          </p>
          <div className="flex-gap" style={{ justifyContent: "center" }}>
            <Link href="/apply" className="btn btn-gold btn-lg">
              Begin Certification
            </Link>
            <Link href="/registry" className="btn btn-ghost-white btn-lg">
              <Search size={18} />
              Browse Directory
            </Link>
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", maxWidth: "none" }}>
            See misuse? <Link href="/report" style={{ color: "rgba(255,255,255,0.65)" }}>Report it here →</Link>
          </p>
        </div>
      </section>
    </>
  );
}

/* Static fallback data for when DB is not yet connected */
const staticFeatured = [
  {
    slug: "buurtzorg",
    name: "Buurtzorg",
    tagline: "Self-managing community nursing at scale",
    summary: "10,000+ nurses in self-managed teams across the Netherlands. Pioneer of decentralized care delivery, cited globally as proof that self-management works at massive scale.",
    credentialLevel: "Teal Certified",
    badgeImage: "/assets/badges/teal-certified.png",
    sector: "Healthcare",
    entityType: "Business",
    country: "Netherlands",
    featured: true,
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    tagline: "We're in business to save our home planet",
    summary: "Certified B Corp and radical purpose-driven business. Environmental activism embedded in governance: 'Earth is now our only shareholder.'",
    credentialLevel: "Teal Verified",
    badgeImage: "/assets/badges/teal-verified.png",
    sector: "Retail / Manufacturing",
    entityType: "Business",
    country: "United States",
    featured: false,
  },
  {
    slug: "findhorn-foundation",
    name: "Findhorn Foundation",
    tagline: "One of the world's most resilient intentional communities",
    summary: "A 60+ year old eco-village and learning center in Scotland. UN-recognized for sustainability. Living proof that community governance and purposeful living can last across generations.",
    credentialLevel: "Teal Certified",
    badgeImage: "/assets/badges/teal-certified.png",
    sector: "Community / Education",
    entityType: "Intentional Community",
    country: "United Kingdom",
    featured: true,
  },
  {
    slug: "morning-star",
    name: "Morning Star Company",
    tagline: "World's largest self-managed tomato processor",
    summary: "400+ colleagues with no managers. The world's most documented implementation of self-management in an industrial context. Every role is defined by personal mission statements.",
    credentialLevel: "Teal Certified",
    badgeImage: "/assets/badges/teal-certified.png",
    sector: "Agriculture / Food",
    entityType: "Business",
    country: "United States",
    featured: false,
  },
  {
    slug: "haier",
    name: "Haier Group",
    tagline: "Micro-enterprise model at global scale",
    summary: "80,000+ employees organized into ~4,000 micro-enterprises. Haier eliminated middle management and restructured entirely around autonomous entrepreneurial units.",
    credentialLevel: "Teal Verified",
    badgeImage: "/assets/badges/teal-verified.png",
    sector: "Manufacturing / Technology",
    entityType: "Business",
    country: "China",
    featured: false,
  },
  {
    slug: "laloux-institute",
    name: "Laloux Institute",
    tagline: "Advancing Teal research and practice globally",
    summary: "Founded by Frédéric Laloux, author of Reinventing Organizations. Curates case studies, develops training curricula, and supports practitioners worldwide.",
    credentialLevel: "Teal Accredited Training",
    badgeImage: "/assets/badges/teal-accredited-training.png",
    sector: "Education / Research",
    entityType: "Training Provider",
    country: "Belgium",
    featured: false,
  },
];
