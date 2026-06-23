"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { directoryRecords, type DirectoryRecord } from "@/data/registry";
import { SearchIcon, ShieldIcon } from "@/components/icons";

type RegistryConsoleProps = {
  records?: DirectoryRecord[];
};

export function RegistryConsole({ records = directoryRecords }: RegistryConsoleProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return records.filter((record) => {
      const matchesFilter = filter === "All" || record.entityType === filter;
      const searchText = [
        record.name,
        record.status,
        record.country,
        record.sector,
        record.badgeId,
        record.verificationId,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!normalized || searchText.includes(normalized));
    });
  }, [filter, query, records]);

  const primaryRecord = filteredRecords[0] ?? records[0] ?? directoryRecords[0];

  return (
    <section className="console" aria-label="Registry verification console">
      <div className="search-panel">
        <div className="panel-title">
          <SearchIcon className="icon" />
          <span>Check a Teal claim</span>
        </div>
        <label className="search-field">
          <span>Organization, project, person, badge link, or badge ID</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try a project name, organization name, or badge ID"
          />
        </label>
        <div className="segmented" aria-label="Entity type filter">
          {["All", "Organization", "Individual", "Provider", "Framework"].map((item) => (
            <button
              className={filter === item ? "active" : ""}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="results-list" aria-live="polite">
          {filteredRecords.map((record) => (
            <Link className="result-row" href={`/registry/${record.slug}`} key={record.slug}>
              <span>
                <strong>{record.name}</strong>
                <small>{record.entityType} / {record.country}</small>
              </span>
              <em>{record.status}</em>
            </Link>
          ))}
          {filteredRecords.length === 0 ? (
            <div className="empty-state">
              No public record matched this search. That does not prove something is wrong. It means Teal Registry has no current public record for this claim.
            </div>
          ) : null}
        </div>
      </div>

      <div className="record-card">
        <div className="record-head">
          <ShieldIcon className="shield" />
          <div>
            <p>What the registry currently knows</p>
            <h2>{primaryRecord.name}</h2>
          </div>
        </div>
        <div className="record-badge">
          <Image
            src={primaryRecord.badgeImage}
            alt={`${primaryRecord.status} badge`}
            width={420}
            height={300}
          />
        </div>
        <dl className="record-grid">
          <div>
            <dt>Status</dt>
            <dd>{primaryRecord.status}</dd>
          </div>
          <div>
            <dt>What this covers</dt>
            <dd>{primaryRecord.scope}</dd>
          </div>
          <div>
            <dt>Badge ID</dt>
            <dd>{primaryRecord.badgeId}</dd>
          </div>
          <div>
            <dt>Record ID</dt>
            <dd>{primaryRecord.verificationId}</dd>
          </div>
          <div>
            <dt>Last checked</dt>
            <dd>{primaryRecord.lastReview}</dd>
          </div>
          <div>
            <dt>Review window</dt>
            <dd>{primaryRecord.validTo}</dd>
          </div>
        </dl>
        <p className="record-summary">{primaryRecord.publicSummary}</p>
        <div className="evidence-list">
          {primaryRecord.evidence.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="record-actions">
          <Link href={`/registry/${primaryRecord.slug}`}>Open full listing</Link>
          <Link href="/report-misuse">Report concern</Link>
        </div>
      </div>
    </section>
  );
}
