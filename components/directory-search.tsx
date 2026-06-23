"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Search, SlidersHorizontal, X } from "lucide-react";
import type { DirectoryRecord } from "@/data/registry";

const credentialTypes = [
  "Teal Certified", "Teal Verified", "Teal Aligned", "Teal Trained",
  "Teal Accredited - Training", "Teal Accredited - Implementation", "Teal Recognized Framework",
  "Public research profile", "In Review",
];
const entityTypes = ["Organization", "Individual", "Provider", "Framework"];

function getChipClass(status?: string) {
  const s = (status ?? "").toLowerCase();
  if (s.includes("certified")) return "chip-certified";
  if (s.includes("verified")) return "chip-verified";
  if (s.includes("aligned")) return "chip-aligned";
  if (s.includes("trained")) return "chip-trained";
  if (s.includes("accredited")) return "chip-teal";
  if (s.includes("research")) return "chip-research";
  if (s.includes("review")) return "chip-review";
  return "chip-muted";
}

interface Props {
  records: DirectoryRecord[];
  initialQ?: string;
  initialType?: string;
  initialCredential?: string;
  initialSector?: string;
  initialCountry?: string;
}

export function DirectorySearch({
  records,
  initialQ = "",
  initialType = "",
  initialCredential = "",
  initialSector = "",
  initialCountry = "",
}: Props) {
  const [q, setQ] = useState(initialQ);
  const [type, setType] = useState(initialType);
  const [credential, setCredential] = useState(initialCredential);
  const [sector, setSector] = useState(initialSector);
  const [country, setCountry] = useState(initialCountry);

  // Derive unique sector/country options from actual records
  const sectors = useMemo(() => {
    const s = Array.from(new Set(records.map((r) => r.sector).filter(Boolean))).sort();
    return s;
  }, [records]);

  const countries = useMemo(() => {
    const c = Array.from(new Set(records.map((r) => r.country).filter(Boolean))).sort();
    return c;
  }, [records]);

  const filtered = useMemo(() => {
    const lq = q.toLowerCase();
    return records.filter((r) => {
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(lq) ||
        r.sector?.toLowerCase().includes(lq) ||
        r.country?.toLowerCase().includes(lq) ||
        (r.publicSummary ?? "").toLowerCase().includes(lq);
      const matchType = !type || r.entityType === type;
      const matchCredential = !credential || (r.credentialLevel ?? r.status) === credential;
      const matchSector = !sector || r.sector === sector;
      const matchCountry = !country || r.country === country;
      return matchQ && matchType && matchCredential && matchSector && matchCountry;
    });
  }, [records, q, type, credential, sector, country]);

  const hasFilters = q || type || credential || sector || country;

  function clearAll() {
    setQ("");
    setType("");
    setCredential("");
    setSector("");
    setCountry("");
  }

  return (
    <>
      {/* Sticky search + filters */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: "70px",
          zIndex: 50,
        }}
      >
        <div className="container" style={{ paddingBlock: "1.25rem" }}>
          {/* Search bar */}
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search organizations, communities, providers…"
              autoComplete="off"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0.25rem", color: "var(--muted)" }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Dropdowns row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginTop: "0.875rem", flexWrap: "wrap" }}>
            <SlidersHorizontal size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />

            {/* Sector */}
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="filter-select"
              aria-label="Filter by sector"
            >
              <option value="">All sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Country */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="filter-select"
              aria-label="Filter by country"
            >
              <option value="">All countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <span style={{ width: "1px", height: "16px", background: "var(--border)", flexShrink: 0 }} />

            {/* Credential chips */}
            {credentialTypes.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCredential(credential === c ? "" : c)}
                className={`filter-chip${credential === c ? " active" : ""}`}
              >
                {c}
              </button>
            ))}

            <span style={{ width: "1px", height: "16px", background: "var(--border)", flexShrink: 0 }} />

            {/* Entity type chips */}
            {entityTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(type === t ? "" : t)}
                className={`filter-chip${type === t ? " active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <section className="content-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ color: "var(--muted)", fontSize: "0.9375rem", maxWidth: "none" }}>
            <strong style={{ color: "var(--ink)" }}>{filtered.length}</strong> listing
            {filtered.length !== 1 ? "s" : ""}
            {q && (
              <>
                {" "}matching &ldquo;{q}&rdquo;
              </>
            )}
          </p>
          {hasFilters && (
            <button type="button" onClick={clearAll} className="btn btn-subtle btn-sm">
              <X size={13} />
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <Search size={48} />
            <h3>No listings found</h3>
            <p>Try adjusting your search or filters. More listings are added regularly.</p>
            <button type="button" onClick={clearAll} className="btn btn-primary" style={{ marginTop: "1.25rem" }}>
              View all listings
            </button>
          </div>
        ) : (
          <div className="directory-grid">
            {filtered.map((org) => (
              <Link key={org.slug} href={`/registry/${org.slug}`} className="listing-card">
                <div className={`listing-card-accent${org.featured ? " gold" : ""}`} />
                {org.featured && <div className="featured-badge">Featured</div>}
                <div className="listing-card-body">
                  <div className="listing-card-top">
                    <div className="listing-card-meta">
                      <div className="listing-card-name">{org.name}</div>
                      <div className="listing-card-tagline">{org.tagline}</div>
                    </div>
                    {org.badgeImage && (
                      <Image
                        src={org.badgeImage}
                        alt={`${org.credentialLevel ?? org.status} badge`}
                        width={56}
                        height={56}
                        className="listing-card-badge"
                      />
                    )}
                  </div>
                  <p className="listing-card-summary">
                    {(org.summary ?? org.publicSummary)?.slice(0, 160)}
                    {((org.summary ?? org.publicSummary)?.length ?? 0) > 160 ? "…" : ""}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span className={`chip ${getChipClass(org.credentialLevel ?? org.status)}`}>
                      {org.credentialLevel ?? org.status}
                    </span>
                    {org.country && (
                      <span
                        className="chip chip-muted"
                        style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                      >
                        <Globe size={11} />
                        {org.country}
                      </span>
                    )}
                    {org.sector && (
                      <span className="chip chip-muted">{org.sector}</span>
                    )}
                  </div>
                </div>
                <div className="listing-card-foot">
                  <span className="listing-card-detail">As of {org.lastReview}</span>
                  <ArrowRight size={16} className="listing-card-arrow" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Claim CTA */}
        <div
          style={{
            marginTop: "3rem",
            background: "var(--teal-xlight)",
            border: "1px solid var(--teal-light)",
            borderRadius: "var(--radius-xl)",
            textAlign: "center",
            padding: "2.5rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Is your organization doing this work?
          </h3>
          <p
            style={{
              color: "var(--muted)",
              marginBottom: "1.5rem",
              maxWidth: "52ch",
              marginInline: "auto",
            }}
          >
            Listings may be pre-populated from public research. Claim yours, update the details, and start your
            certification journey.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/apply?claim=listing" className="btn btn-primary">
              Claim Your Listing
            </Link>
            <Link href="/apply" className="btn btn-ghost">
              Apply for Certification
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
