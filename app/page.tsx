import Image from "next/image";
import { RegistryConsole } from "@/components/registry-console";
import { ArrowIcon, FileIcon, ShieldIcon } from "@/components/icons";
import { credentialLevels, portalRoles, standards } from "@/data/registry";

const navItems = ["Registry", "Credentials", "Standards", "Governance", "Resources", "About"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Teal Registry home">
          <Image
            src="/assets/tealregistry-lockup.png"
            alt="Teal Registry"
            width={280}
            height={48}
            priority
          />
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="ghost-button" href="#registry">Search</a>
          <a className="solid-button" href="#verify">Verify</a>
        </div>
      </header>

      <section className="hero" id="registry">
        <div className="hero-copy">
          <h1>Independent verification for how organizations actually work.</h1>
          <p>
            Teal Registry maintains standards and public records for claims about self-management,
            wholeness, adaptive leadership, training, certification, accreditation, and badge use.
          </p>
          <div className="hero-actions">
            <a className="solid-button large" href="#registry-console">
              <ShieldIcon className="button-icon" />
              Search the Registry
            </a>
            <a className="ghost-button large" href="#verify">
              Verify a Badge
              <ArrowIcon className="button-icon" />
            </a>
          </div>
        </div>
        <div className="integrity-panel" id="verify">
          <div className="hero-badge-stack" aria-hidden="true">
            <Image src="/assets/badges/teal-certified.png" alt="" width={180} height={180} />
            <Image src="/assets/badges/teal-verified.png" alt="" width={150} height={150} />
          </div>
          <h2>Certification cannot be bought, bundled, guaranteed, or influenced.</h2>
          <p>
            Training providers can teach. Implementation teams can help. Teal Registry verifies
            evidence and publishes current, scoped public status.
          </p>
        </div>
      </section>

      <div id="registry-console">
        <RegistryConsole />
      </div>

      <section className="operating-system" id="credentials">
        <div className="section-heading">
          <h2>A complete certification operating system.</h2>
          <p>
            The platform is designed around the full lifecycle: learning records, candidate intake,
            evidence review, assessment, decision, badge issuance, renewal, complaints, and enforcement.
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

      <section className="standards-band" id="standards">
        <div className="section-heading compact">
          <h2>Credential ladder with explicit boundaries.</h2>
          <p>
            Every public status must say what it means, what it does not mean, who is eligible, and
            whether evidence was independently reviewed.
          </p>
        </div>
        <div className="status-table" role="table" aria-label="Credential ladder">
          <div className="table-row table-head" role="row">
            <span>Level</span>
            <span>Status</span>
            <span>Evidence</span>
            <span>Boundary</span>
          </div>
          {credentialLevels.map((level) => (
            <div className="table-row" role="row" key={level.title}>
              <span>{level.level}</span>
              <span>
                <strong>{level.title}</strong>
                <small>{level.publicLabel}</small>
              </span>
              <span>{level.evidenceRequired}</span>
              <span>{level.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="badge-system" id="badges">
        <div className="section-heading">
          <h2>The badge is the public trust object.</h2>
          <p>
            Every badge must resolve to a live verification record with scope, status, issue date,
            expiration or review window, and misuse reporting. The artwork creates recognition; the
            verification URL creates trust.
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
                <span>Level {level.level}</span>
                <h3>{level.title}</h3>
                <p>{level.claim}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-band" id="governance">
        <div>
          <h2>Governance-grade backend from day one.</h2>
          <p>
            The backend model follows the TRIOS operating system already present in the project
            folder: applications, cases, assessments, findings, evidence, interviews, decisions,
            badge licenses, complaints, appeals, enforcement, conflicts, calibration, tasks, comms,
            and public directory publishing.
          </p>
        </div>
        <div className="workflow-list">
          {[
            "Application: Draft -> Submitted -> Screening -> Evidence Review -> Interview -> Decision",
            "Badge: Issued -> Active -> Expiring Soon -> Expired -> Suspended -> Revoked",
            "Complaint: Received -> Triage -> Investigation -> Action -> Public Notice -> Appeal",
          ].map((item) => (
            <div className="workflow-item" key={item}>
              <FileIcon className="icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="standards-cards" id="resources">
        {standards.map((standard) => (
          <article key={standard.code}>
            <span>{standard.code}</span>
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
        <h2>Start with the trust spine. Expand into the portal.</h2>
        <p>
          The first release should make verification real: search, verify, understand status, apply,
          report misuse, and let admins publish authoritative public records.
        </p>
        <div className="hero-actions centered">
          <a className="solid-button large" href="mailto:standards@tealregistry.com">Apply or inquire</a>
          <a className="ghost-button large" href="mailto:standards@tealregistry.com?subject=Report%20Misuse">Report misuse</a>
        </div>
      </section>
    </main>
  );
}
