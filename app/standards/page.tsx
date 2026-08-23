import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { tealBasics } from "@/data/platform";
import { publicStandards, standardsUseCases, tealPrinciples } from "@/data/trust-content";

export default function StandardsPage() {
  return (
    <PageShell
      title="Teal means all three, in real work"
      intro="A regenerative claim is not enough. Teal Registry looks for observable self-organization, wholeness, and evolutionary purpose working together under real pressure."
      heroClassName="standards-hero"
      actions={[
        { href: "/standards/verification", label: "How verification works" },
        { href: "/apply", label: "Apply for review", variant: "ghost" },
      ]}
    >
      <section className="content-section teal-explainer standards-intro">
        <div className="standards-intro-copy">
          <h2>You need all three.</h2>
          <p>
            For a founder, funder, land steward, team member, or community partner, the plain
            test is simple: if one of the three is missing, the organization may be sincere,
            promising, or values-aligned, but it is not yet operating as Teal.
          </p>
          <div className="aha-panel compact-aha">
            <h3>Teal Registry looks for all three working together.</h3>
            <p>
              One strong principle cannot cover for a missing one. The standard exists so good
              projects can see the real operating work before bottlenecks, burnout, or hidden power
              damage the mission.
            </p>
          </div>
        </div>
        <div className="infographic-steps" aria-label="The three Teal principles">
          {tealBasics.map((item, index) => (
            <article key={item.title}>
              <h3><span>{index + 1}</span>{item.title}</h3>
              <p>{item.body}</p>
              <strong>Watch for this: {item.missingRisk}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section standards-public-set">
        <div className="section-heading compact">
          <h2>The public standard set</h2>
          <p>
            These are the standards a reader, applicant, reviewer, or funder should be able to
            understand without knowing internal codes. Technical records can exist behind the
            scenes; public trust needs plain names and clear boundaries.
          </p>
        </div>
        <div className="standards-cards standards-cards-quad">
          {publicStandards.map((standard) => (
            <article key={standard.title}>
              <span>{standard.title}</span>
              <h3>{standard.publicName}</h3>
              <p>{standard.summary}</p>
              <strong>{standard.publicUse}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section principle-standard-list">
        <div className="section-heading compact">
          <h2>What each principle requires</h2>
          <p>
            The standard is not a personality preference. It asks whether structure and behavior
            can be observed, explained, and reviewed over time.
          </p>
        </div>
        <div className="principle-deep-grid">
          {tealPrinciples.map((principle, index) => (
            <article key={principle.name}>
              <div className="principle-title-row">
                <span>{index + 1}</span>
                <div>
                  <h3>{principle.name}</h3>
                  <p>{principle.plain}</p>
                </div>
              </div>
              <p>{principle.definition}</p>
              <div className="principle-columns">
                <div>
                  <h4>What it looks like</h4>
                  <ul>
                    {principle.practice.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4>Evidence examples</h4>
                  <ul>
                    {principle.evidence.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="watch-card">
                <strong>Common failure pattern</strong>
                <p>{principle.watchFor}</p>
              </div>
              <p className="reference-note">
                <strong>Reference examples:</strong> {principle.references.join(" / ")}. {principle.referenceNote}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section standards-use-section">
        <div className="section-heading compact">
          <h2>How the standards are used</h2>
          <p>
            The same public standard has different jobs depending on whether someone is reading a
            listing, preparing evidence, reviewing a claim, or reporting misuse.
          </p>
        </div>
        <div className="workflow-grid standards-use-grid">
          {standardsUseCases.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section link-panel-grid">
        <Link className="trust-panel" href="/standards/verification">
          <h3>Verification criteria</h3>
          <p>What must be submitted, reviewed, and published before a stronger claim is trusted.</p>
        </Link>
        <Link className="trust-panel" href="/standards/renewal">
          <h3>Renewal and revocation</h3>
          <p>How status stays current, changes, pauses, expires, or gets removed.</p>
        </Link>
        <Link className="trust-panel" href="/standards/independence">
          <h3>Independence boundaries</h3>
          <p>How Teal Registry separates standards authority from training, consulting, and visibility.</p>
        </Link>
      </section>
    </PageShell>
  );
}