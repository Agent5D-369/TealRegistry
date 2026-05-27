import Image from "next/image";
import { RegistryConsole } from "@/components/registry-console";
import { ArrowIcon, FileIcon, ShieldIcon } from "@/components/icons";
import { credentialLevels, portalRoles, standards } from "@/data/registry";

const navItems = ["Verify", "Directory", "Credentials", "How It Works", "Apply", "Report"];

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
          {navItems.map((item) => {
            const target = item === "Directory" ? "registry-console" : item.toLowerCase().replaceAll(" ", "-");
            return (
              <a href={`#${target}`} key={item}>
                {item}
              </a>
            );
          })}
        </nav>
        <div className="header-actions">
          <a className="ghost-button" href="#registry-console">Search</a>
          <a className="solid-button" href="#verify">Verify</a>
        </div>
      </header>

      <section className="hero" id="registry">
        <div className="hero-copy">
          <h1>Know whether a Teal claim is real.</h1>
          <p>
            For funders, founders, teams, and communities who want more than beautiful language.
            Teal Registry checks whether a person, project, provider, or organization can back up
            what they say.
          </p>
          <div className="hero-actions">
            <a className="solid-button large" href="#registry-console">
              <ShieldIcon className="button-icon" />
              Check a Claim
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
          <h2>A badge should answer one simple question: can I trust this claim?</h2>
          <p>
            Training can help someone learn. Consulting can help a team improve. Verification is
            different: it checks what is already true and says exactly what was reviewed.
          </p>
        </div>
      </section>

      <div id="registry-console">
        <RegistryConsole />
      </div>

      <section className="operating-system" id="credentials">
        <div className="section-heading">
          <h2>Built for the people trying to make good work trustworthy.</h2>
          <p>
            The site should feel useful to a land steward, founder, funder, practitioner, assessor,
            or team member who wants clarity without having to decode standards-body language.
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
            inflated promises. The ladder is meant to be readable at 2am by someone making a serious
            decision.
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
          <h2>Badges should make trust visible, not vague.</h2>
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
                <p>{level.claim}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-band" id="apply">
        <div>
          <h2>From first interest to public recognition.</h2>
          <p>
            The backend still needs to be rigorous, but the public experience should feel human:
            choose a path, see what evidence is needed, know where the review stands, and understand
            what can be claimed when a decision is made.
          </p>
        </div>
        <div className="workflow-list">
          {[
            "Apply: Choose a path -> Submit evidence -> Get reviewed -> Receive a decision",
            "Badge: Issued -> Linked to a live record -> Renewed, expired, suspended, or revoked",
            "Concern: Report misuse -> Review concern -> Publish updates when public trust is affected",
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
          The next build should turn this into real flows: search the registry, verify a badge,
          apply for review, submit evidence, and report misuse from one calm, credible public system.
        </p>
        <div className="hero-actions centered">
          <a className="solid-button large" href="mailto:standards@tealregistry.com">Apply or inquire</a>
          <a className="ghost-button large" href="mailto:standards@tealregistry.com?subject=Report%20Misuse">Report misuse</a>
        </div>
      </section>
    </main>
  );
}
