export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { RegistryConsole } from "@/components/registry-console";
import { ArrowIcon, FileIcon, ShieldIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { credentialLevels, directoryRecords, portalRoles, standards, type DirectoryRecord } from "@/data/registry";
import { tealBasics } from "@/data/platform";

const workflowSteps = [
  {
    title: "Apply with confidence",
    description:
      "Choose the path that fits your work, see the evidence reviewers need, and know what happens after submission.",
  },
  {
    title: "Receive a live public record",
    description:
      "Approved badges link to a record that explains the claim, review scope, dates, status, and renewal window.",
  },
  {
    title: "Protect trust over time",
    description:
      "Concerns, renewals, suspensions, and revocations are handled through a visible process that keeps the registry credible.",
  },
];

const featuredCategories = [
  {
    title: "Regenerative businesses",
    description: "Purpose-led companies and operating systems worth comparing before anyone claims certification.",
    filter: (record: DirectoryRecord) =>
      record.entityType === "Organization" &&
      /business|self-managing|purpose-led|regenerative/i.test(`${record.sector} ${record.seo.keywords.join(" ")}`),
  },
  {
    title: "Intentional communities",
    description: "Communities, ecovillages, and land-based projects where governance, culture, and purpose matter.",
    filter: (record: DirectoryRecord) =>
      record.entityType === "Organization" &&
      /community|ecovillage|land|permaculture/i.test(`${record.sector} ${record.seo.keywords.join(" ")}`),
  },
  {
    title: "Providers and practice networks",
    description: "Training, implementation, governance, and transformation support that buyers may want to review.",
    filter: (record: DirectoryRecord) => record.entityType === "Provider",
  },
  {
    title: "Frameworks and methods",
    description: "Methods people use when they talk about Teal, self-organization, wholeness, or regeneration.",
    filter: (record: DirectoryRecord) => record.entityType === "Framework",
  },
];

function rotateRecords(records: DirectoryRecord[], count = 10) {
  return [...records].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function Home() {
  const featuredGroups = featuredCategories.map((category) => ({
    ...category,
    records: rotateRecords(directoryRecords.filter(category.filter), 10),
  }));

  return (
    <main>
      <SiteHeader />

      <section className="hero" id="registry">
        <div className="hero-copy">
          <h1>Teal means work built on purpose, trust, and shared power.</h1>
          <p>
            New to Teal? Start here. A Teal organization has a clear purpose, shares power in the
            open, and makes it safe for people to tell the truth. Teal Registry checks claims so
            funders, founders, teams, and communities know what is real.
          </p>
          <div className="hero-actions">
            <Link className="solid-button large" href="/registry">
              <ShieldIcon className="button-icon" />
              Check a Claim
            </Link>
            <Link className="ghost-button large" href="/standards">
              Learn What Teal Means
              <ArrowIcon className="button-icon" />
            </Link>
          </div>
        </div>
        <div className="integrity-panel" id="verify">
          <div className="hero-badge-stack" aria-hidden="true">
            <Image src="/assets/badges/teal-certified.png" alt="" width={180} height={180} />
            <Image src="/assets/badges/teal-verified.png" alt="" width={150} height={150} />
          </div>
          <h2>A badge answers one simple question: can I trust this claim?</h2>
          <p>
            A class can teach. A consultant can help. A registry checks the claim. Each badge tells
            you what was reviewed, what was not reviewed, and where to find the live record.
          </p>
          <div className="plain-teal-list">
            {tealBasics.map((item) => (
              <div key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="registry-console">
        <RegistryConsole />
      </div>

      <section className="featured-registry" aria-label="Featured registry listings">
        <div className="section-heading compact">
          <h2>Featured from the registry.</h2>
          <p>
            These rotate from public registry profiles so visitors can quickly discover credible
            organizations, communities, providers, and frameworks. Each card opens the Teal Registry
            profile first, with official sources shown on the profile page.
          </p>
        </div>
        <div className="featured-category-grid">
          {featuredGroups.map((group) => (
            <section className="featured-category" key={group.title}>
              <div className="featured-category-head">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <div className="featured-listing-grid">
                {group.records.map((record) => (
                  <Link className="featured-listing-card" href={`/registry/${record.slug}`} key={record.slug}>
                    <span>{record.status}</span>
                    <strong>{record.name}</strong>
                    <small>{record.country} / {record.sector}</small>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="operating-system" id="credentials">
        <div className="section-heading">
          <h2>Built for the people trying to make good work trustworthy.</h2>
          <p>
            Land stewards, founders, funders, practitioners, assessors, and team members all need
            the same thing: a clear way to understand what has been claimed, what has been checked,
            and what is still only a promise.
          </p>
        </div>
        <div className="role-grid">
          {portalRoles.map((role) => (
            <article className="role-card" key={role.role}>
              <h3>{role.role}</h3>
              <p>{role.summary}</p>
              <ul>
                {role.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="standards-band" id="how-it-works">
        <div className="section-heading compact">
          <h2>Each badge says what was checked, and what was not.</h2>
          <p>
            This protects sincere projects from vague suspicion, and protects communities from
            inflated promises. Each level is written so a serious decision-maker can understand the
            claim without needing to decode certification language.
          </p>
        </div>
        <div className="status-table" role="table" aria-label="Credential ladder">
          <div className="table-row table-head" role="row">
            <span>Step</span>
            <span>Badge</span>
            <span>What we looked for</span>
            <span>Plain meaning</span>
          </div>
          {credentialLevels.map((level) => (
            <div className="table-row" role="row" key={level.title}>
              <span className="step-cell">{level.level}</span>
              <span className="badge-cell">
                <Image
                  src={level.badgeImage}
                  alt={`${level.title} badge`}
                  width={120}
                  height={86}
                />
                <span>
                  <strong>{level.title}</strong>
                  <small>{level.publicLabel}</small>
                </span>
              </span>
              <span>{level.evidenceRequired}</span>
              <span>{level.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="badge-system" id="badges">
        <div className="section-heading">
          <h2>Badges make trust visible, not vague.</h2>
          <p>
            A Teal Registry badge is not a trophy. It is a public link to a live record: what was
            claimed, what was checked, when it was checked, and how to report a concern.
          </p>
        </div>
        <div className="badge-rail">
          {credentialLevels.map((level) => (
            <article className="badge-card" key={level.title}>
              <Image
                src={level.badgeImage}
                alt={`${level.title} badge`}
                width={360}
                height={260}
              />
              <div>
                <span>Step {level.level}</span>
                <h3>{level.title}</h3>
                <p>{level.targetDescription}</p>
                <small>Public meaning: {level.claim}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-band" id="apply">
        <div>
          <h2>A clear path from interest to recognition.</h2>
          <p>
            Applicants always know what to submit, where their review stands, and what they can
            safely claim when a decision is made. The process lowers confusion without lowering the
            bar.
          </p>
        </div>
        <div className="workflow-list">
          {workflowSteps.map((item) => (
            <div className="workflow-item" key={item.title}>
              <FileIcon className="icon" />
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="standards-cards" id="resources">
        {standards.map((standard) => (
          <article key={standard.code}>
            <span>{standard.status}</span>
            <h3>{standard.title}</h3>
            <p>{standard.summary}</p>
            <div>
              {standard.criteria.map((criterion) => (
                <em key={criterion}>{criterion}</em>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="cta-section" id="report">
        <h2>Start with clarity. Earn the badge. Keep the trust.</h2>
        <p>
          Use the registry to check a claim, understand a badge, start a review, or report misuse.
          The goal is simple: make trustworthy Teal work easier to recognize and harder to fake.
        </p>
        <div className="hero-actions centered">
          <a className="solid-button large" href="mailto:standards@tealregistry.com">Apply or inquire</a>
          <a className="ghost-button large" href="mailto:standards@tealregistry.com?subject=Report%20Misuse">Report misuse</a>
          <a className="ghost-button large" href="/canva">View Canva template system</a>
        </div>
      </section>
    </main>
  );
}
