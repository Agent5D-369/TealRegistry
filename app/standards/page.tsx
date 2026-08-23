import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { standards } from "@/data/registry";
import { tealBasics } from "@/data/platform";
import { publicStandards, tealPrinciples } from "@/data/trust-content";

export default function StandardsPage() {
  return (
    <PageShell
      title="The three unwavering principles of Teal"
      intro="Teal is not a vibe, a color palette, or a beautiful claim. It is a practical way of working that must show up in real decisions."
      actions={[
        { href: "/standards/verification", label: "How verification works" },
        { href: "/apply", label: "Apply for review", variant: "ghost" },
      ]}
    >
      <section className="content-section teal-explainer">
        <div>
          <h2>You need all three.</h2>
          <p>
            For a founder, funder, land steward, team member, or community partner, the plain test
            is simple. A regenerative organization must show all three.
          </p>
        </div>
        <div className="infographic-steps" aria-label="Teal plain-language infographic">
          {tealBasics.map((item, index) => (
            <article key={item.title}>
              <h3><span>{index + 1}</span>{item.title}</h3>
              <p>{item.body}</p>
              <strong>Watch for this: {item.missingRisk}</strong>
            </article>
          ))}
        </div>
        <div className="aha-panel standards-aha">
          <h3 className="aha-takeaway">Teal Registry looks for all three working together.</h3>
          <p>
            One strong principle cannot cover for a missing one. Teal is the pattern created when
            purpose, self-organization, and wholeness reinforce each other in real work.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading compact">
          <h2>Public standard set</h2>
          <p>
            Standards codes are kept for traceability. Public pages use plain names first so founders,
            funders, members, and partners can understand what is being checked.
          </p>
        </div>
        <div className="standards-cards">
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

      <section className="content-section">
        <div className="section-heading compact">
          <h2>What evidence looks like</h2>
          <p>
            Reviewers look for structures and behaviors. A beautiful story helps people care, but
            evidence is what makes a public claim safer to trust.
          </p>
        </div>
        <div className="evidence-table">
          {tealPrinciples.map((principle) => (
            <div key={principle.name}>
              <strong>{principle.name}</strong>
              <span>{principle.evidence.join(" / ")}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading compact">
          <h2>Traceable standard records</h2>
          <p>These are the technical records behind the public language.</p>
        </div>
        <div className="standards-cards">
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