import { PageShell } from "@/components/page-shell";
import { standards } from "@/data/registry";
import { tealBasics } from "@/data/platform";

export default function StandardsPage() {
  return (
    <PageShell
      title="What Teal means in plain language"
      intro="Teal is not a vibe, color palette, or inspirational claim. It is a way of working that can be described, observed, and reviewed."
      actions={[
        { href: "/credentials", label: "See credential ladder" },
        { href: "/apply", label: "Apply for review", variant: "ghost" },
      ]}
    >
      <section className="content-section teal-explainer">
        <div>
          <h2>The simple version</h2>
          <p>
            Teal organizations try to make work more human and more trustworthy at the same time.
            The registry looks for signals that purpose, power, and people practices are real in
            daily decisions, not only written in a values statement.
          </p>
        </div>
        <div className="infographic-steps" aria-label="Teal plain-language infographic">
          {tealBasics.map((item) => (
            <article key={item.title}>
              <span>{item.principle}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section">
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
    </PageShell>
  );
}
