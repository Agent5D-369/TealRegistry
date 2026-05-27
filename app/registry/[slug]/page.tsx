import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { directoryRecords } from "@/data/registry";

type RegistryDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return directoryRecords.map((record) => ({ slug: record.slug }));
}

export default async function RegistryDetailPage({ params }: RegistryDetailProps) {
  const { slug } = await params;
  const record = directoryRecords.find((item) => item.slug === slug);

  if (!record) {
    notFound();
  }

  return (
    <PageShell
      title={record.name}
      intro={record.publicSummary}
      actions={[
        { href: `/verify/${record.badgeId}`, label: "Verify badge" },
        { href: "/report-misuse", label: "Report concern", variant: "ghost" },
      ]}
    >
      <section className="detail-layout">
        <article className="profile-panel">
          <Image src={record.badgeImage} alt={`${record.status} badge`} width={520} height={360} />
          <dl className="record-grid">
            <div>
              <dt>Status</dt>
              <dd>{record.status}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{record.scope}</dd>
            </div>
            <div>
              <dt>Country</dt>
              <dd>{record.country}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{record.sector}</dd>
            </div>
            <div>
              <dt>Last checked</dt>
              <dd>{record.lastReview}</dd>
            </div>
            <div>
              <dt>Review window</dt>
              <dd>{record.validTo}</dd>
            </div>
          </dl>
        </article>
        <aside className="trust-panel">
          <h2>What this record tells you</h2>
          <p>
            Teal Registry separates public claims from reviewed claims. This page is the source of
            truth for the current public status, not a marketing profile or testimonial.
          </p>
          <div className="evidence-list">
            {record.evidence.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Link className="solid-button" href={`/verify/${record.badgeId}`}>
            Verify {record.badgeId}
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
