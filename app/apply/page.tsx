import { PageShell } from "@/components/page-shell";
import { applicationPathways } from "@/data/platform";

export default function ApplyPage() {
  return (
    <PageShell
      title="Apply for Teal recognition"
      intro="Choose the path that matches your work, understand the evidence needed, and begin with a clear boundary around what you want reviewed."
      actions={[
        { href: "mailto:standards@tealregistry.com?subject=Teal%20Registry%20Application", label: "Start application" },
        { href: "/credentials", label: "Compare credentials", variant: "ghost" },
      ]}
    >
      <section className="content-section">
        <div className="pathway-grid">
          {applicationPathways.map((pathway) => (
            <article className="pathway-card" key={pathway.title}>
              <h2>{pathway.title}</h2>
              <p>{pathway.audience}</p>
              <ol>
                {pathway.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section intake-panel">
        <div>
          <h2>What applicants prepare</h2>
          <p>
            Bring clear evidence, a defined scope, permission to publish a safe summary, and a
            contact who can respond to reviewer questions. The registry protects both ambition and
            accountability by naming exactly what is being reviewed.
          </p>
        </div>
        <div className="form-preview" aria-label="Application intake preview">
          <label>Organization or person</label>
          <label>Requested badge</label>
          <label>Review scope</label>
          <label>Evidence links</label>
          <label>Public summary</label>
        </div>
      </section>
    </PageShell>
  );
}
