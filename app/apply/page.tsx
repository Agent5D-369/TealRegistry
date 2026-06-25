import { PageShell } from "@/components/page-shell";
import { ApplyIntakeForm } from "@/components/apply-intake-form";
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
          <h2>Start the right review path</h2>
          <p>
            Tell us who you are, what you want reviewed, and whether this is a new application,
            a listing claim, or a correction. TRIOS turns that first signal into a trackable intake
            record so the review path stays clear.
          </p>
        </div>
        <ApplyIntakeForm />
      </section>
    </PageShell>
  );
}
