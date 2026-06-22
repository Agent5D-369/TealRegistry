import { PageShell } from "@/components/page-shell";
import { standards } from "@/data/registry";
import { tealBasics } from "@/data/platform";

export default function StandardsPage() {
  return (
    <PageShell
      title="The three unwavering principles of Teal"
      intro="Teal is not a vibe, a color palette, or a beautiful claim. It is a practical way of working that must show up in real decisions."
      actions={[
        { href: "/credentials", label: "See credential ladder" },
        { href: "/apply", label: "Apply for review", variant: "ghost" },
      ]}
    >
      <section className="content-section teal-explainer">
        <div>
          <h2>You need all three.</h2>
          <p>
            For a founder, funder, land steward, team member, or community partner, the plain test
            is simple. A regenerative organization must show all three:
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
            This is the aha moment: one strong principle cannot cover for a missing one. Teal is the
            pattern created when purpose, self-organization, and wholeness reinforce each other in
            real work.
          </p>
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
