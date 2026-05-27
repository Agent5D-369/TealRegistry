import { PageShell } from "@/components/page-shell";
import { canvaTemplatePlan } from "@/data/platform";

export default function CanvaLayerPage() {
  return (
    <PageShell
      title="Canva template system"
      intro="Official share assets keep public claims accurate: badge announcements, profile cards, certificate PDFs, and plain-language Teal explainers."
      actions={[
        { href: "/credentials", label: "Use badge language" },
        { href: "/standards", label: "Use Teal explainer", variant: "ghost" },
      ]}
    >
      <section className="content-section">
        <div className="pathway-grid">
          {canvaTemplatePlan.map((template) => (
            <article className="pathway-card" key={template.title}>
              <h2>{template.title}</h2>
              <p>{template.value}</p>
              <span className="status-pill">{template.format}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section teal-explainer">
        <div>
          <h2>Template rules</h2>
          <p>
            Every external graphic must link back to the live registry record, name the scope of the
            claim, avoid implying more than was reviewed, and use the Teal Registry brand kit.
          </p>
        </div>
        <div className="trust-panel">
          <h2>Canva status</h2>
          <p>
            Brand kit found: Teal Registry - Standards Body. No fillable brand templates were found
            yet, so this page defines the template set to create next in Canva.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
