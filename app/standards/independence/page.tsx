import { PageShell } from "@/components/page-shell";
import { independenceBoundaries } from "@/data/trust-content";

export default function IndependencePage() {
  return (
    <PageShell
      title="Standards, training, and consulting stay separate"
      intro="A trust system fails when the people who sell implementation can also decide who gets certified. Teal Registry keeps those powers visibly separate."
      actions={[
        { href: "/credentials", label: "Credential tracks" },
        { href: "/apply", label: "Apply for review", variant: "ghost" },
      ]}
    >
      <section className="content-section">
        <div className="section-heading compact">
          <h2>Conflict boundaries</h2>
          <p>
            Training can prepare a team. Consulting can help a team implement. Only an independent
            review process can support a verified public status.
          </p>
        </div>
        <div className="evidence-table">
          {independenceBoundaries.map((boundary) => (
            <div key={boundary}>
              <strong>Rule</strong>
              <span>{boundary}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>Training means readiness</h2>
          <p>
            A training credential shows someone completed education. It does not prove that an
            organization operates with Teal practices under real conditions.
          </p>
        </article>
        <article className="trust-panel">
          <h2>Verification means evidence</h2>
          <p>
            Verification reviews artifacts, scope, dates, and boundaries. It should never imply
            claims outside the reviewed record.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
