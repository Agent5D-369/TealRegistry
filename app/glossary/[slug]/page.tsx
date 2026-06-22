import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { glossaryEntries } from "@/data/education";

type GlossaryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return glossaryEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: GlossaryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = glossaryEntries.find((item) => item.slug === slug);
  if (!entry) return { title: "Not Found | Teal Registry" };
  return {
    title: `${entry.term} | Glossary | Teal Registry`,
    description: entry.plainMeaning,
  };
}

export default async function GlossaryPage({ params }: GlossaryPageProps) {
  const { slug } = await params;
  const entry = glossaryEntries.find((item) => item.slug === slug);

  if (!entry) notFound();

  return (
    <>
      <section className="page-hero" style={{ paddingBlock: "3.5rem" }}>
        <div className="page-hero-inner">
          <div className="hero-eyebrow">
            <BookOpen size={14} />
            Glossary
          </div>
          <h1>{entry.term}</h1>
          <p>{entry.plainMeaning}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container" style={{ maxWidth: "820px", display: "grid", gridTemplateColumns: "1fr 320px", gap: "2.5rem", alignItems: "start" }}>

          {/* Main content */}
          <article>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.5rem", marginBottom: "0.75rem" }}>
              Why this matters
            </h2>
            <p style={{ color: "var(--ink-mid)", lineHeight: 1.8, fontSize: "1.0625rem", maxWidth: "none" }}>
              {entry.whyItMatters}
            </p>

            <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--teal-xlight)", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-lg)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "0.75rem", color: "var(--teal-dark)" }}>
                Plain meaning
              </h3>
              <p style={{ color: "var(--teal-dark)", lineHeight: 1.75, fontSize: "1.0625rem", maxWidth: "none", margin: 0 }}>
                {entry.plainMeaning}
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "1rem" }}>
                Proof examples
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {entry.proofExamples.map((example) => (
                  <li key={example} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <CheckCircle2 size={15} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "0.15rem" }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--ink-mid)", lineHeight: 1.6 }}>{example}</span>
                  </li>
                ))}
              </ul>
              <Link href="/apply" className="btn btn-primary" style={{ display: "block", textAlign: "center", marginTop: "1.25rem" }}>
                Start with this evidence
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <Link href="/credentials" style={{ color: "var(--teal)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ArrowRight size={13} />
                Back to credentials
              </Link>
              <Link href="/standards" style={{ color: "var(--teal)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ArrowRight size={13} />
                Read the standards
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
