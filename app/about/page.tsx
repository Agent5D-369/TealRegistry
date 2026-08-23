import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { independenceBoundaries, tealPrinciples } from "@/data/trust-content";

export default function AboutPage() {
  return (
    <PageShell
      title="A public trust layer for Teal claims"
      intro="Teal Registry helps people tell the difference between inspiring language and operational practice that can be observed, reviewed, and renewed."
      actions={[
        { href: "/standards", label: "Read the standards" },
        { href: "/registry", label: "Search the registry", variant: "ghost" },
      ]}
    >
      <section className="content-section editorial-section">
        <div className="section-heading compact">
          <h2>Why this exists</h2>
          <p>
            Many regenerative and mission-driven projects fail because the internal system cannot
            hold power, conflict, accountability, money, or change. Teal Registry exists to make
            those conditions visible before people place trust in a claim.
          </p>
        </div>
        <div className="trust-ledger">
          {tealPrinciples.map((principle) => (
            <article key={principle.name}>
              <span>{principle.plain}</span>
              <h3>{principle.name}</h3>
              <p>{principle.definition}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>What Teal Registry does</h2>
          <ul>
            <li>Publishes plain-language standards for Teal practice.</li>
            <li>Reviews evidence for verification, certification, accreditation, and recognition.</li>
            <li>Maintains a public directory with status, scope, dates, sources, and boundaries.</li>
            <li>Provides a neutral path to report misuse or correct inaccurate public claims.</li>
          </ul>
        </article>
        <article className="trust-panel">
          <h2>What Teal Registry does not do</h2>
          <ul>
            <li>It does not certify good intentions.</li>
            <li>It does not guarantee outcomes or future conditions.</li>
            <li>It does not treat training as proof of verified implementation.</li>
            <li>It does not let sponsorship or paid visibility influence credential decisions.</li>
          </ul>
        </article>
      </section>
      <section className="content-section">
        <div className="section-heading compact">
          <h2>Independence matters</h2>
          <p>
            A standards body only works when people can see what is being reviewed, who holds
            authority, and where conflicts of interest are kept out of credential decisions.
          </p>
        </div>
        <div className="evidence-table">
          {independenceBoundaries.map((boundary) => (
            <div key={boundary}>
              <strong>Boundary</strong>
              <span>{boundary}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section cta-band">
        <h2>If it is not in the directory, it is not verified.</h2>
        <p>
          Use the registry before relying on a badge, proposal, website claim, or social media
          statement.
        </p>
        <div className="hero-actions">
          <Link className="solid-button large" href="/verify">Verify a claim</Link>
          <Link className="ghost-button large" href="/report-misuse">Report misuse</Link>
        </div>
      </section>
    </PageShell>
  );
}
