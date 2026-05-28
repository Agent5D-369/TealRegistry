import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { glossaryEntries } from "@/data/education";

type GlossaryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return glossaryEntries.map((entry) => ({ slug: entry.slug }));
}

export default async function GlossaryPage({ params }: GlossaryPageProps) {
  const { slug } = await params;
  const entry = glossaryEntries.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <PageShell
      title={entry.term}
      intro={entry.plainMeaning}
      actions={[
        { href: "/credentials", label: "Back to credentials" },
        { href: "/standards", label: "Read standards", variant: "ghost" },
      ]}
    >
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>Why this matters</h2>
          <p>{entry.whyItMatters}</p>
        </article>
        <aside className="trust-panel">
          <h2>Proof examples</h2>
          <ul>
            {entry.proofExamples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
          <Link className="solid-button" href="/apply">
            Start with this evidence
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
