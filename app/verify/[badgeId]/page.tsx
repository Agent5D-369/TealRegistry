import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { directoryRecords } from "@/data/registry";
import { getDirectoryRecordByBadgeId } from "@/lib/registry-records";

type VerifyPageProps = {
  params: Promise<{ badgeId: string }>;
};

export function generateStaticParams() {
  return directoryRecords.map((record) => ({ badgeId: record.badgeId }));
}

export default async function VerifyBadgePage({ params }: VerifyPageProps) {
  const { badgeId } = await params;
  const record = await getDirectoryRecordByBadgeId(badgeId);

  if (!record) {
    notFound();
  }

  return (
    <PageShell
      title={`Verify ${record.badgeId}`}
      intro="Use this page to confirm whether a badge is active, what claim it supports, and what limits apply."
      actions={[
        { href: `/registry/${record.slug}`, label: "View registry profile" },
        { href: "/report-misuse", label: "Report misuse", variant: "ghost" },
      ]}
    >
      <section className="verify-layout">
        <div className="record-badge large-badge">
          <Image src={record.badgeImage} alt={`${record.status} badge`} width={680} height={460} />
        </div>
        <article className="verify-card">
          <span className="status-pill">{record.status}</span>
          <h2>{record.name}</h2>
          <p>{record.publicSummary}</p>
          <dl className="record-grid">
            <div>
              <dt>Badge ID</dt>
              <dd>{record.badgeId}</dd>
            </div>
            <div>
              <dt>Record ID</dt>
              <dd>{record.verificationId}</dd>
            </div>
            <div>
              <dt>What this covers</dt>
              <dd>{record.scope}</dd>
            </div>
            <div>
              <dt>Last checked</dt>
              <dd>{record.lastReview}</dd>
            </div>
          </dl>
          <Link className="ghost-button" href="/standards">
            Understand the standards
          </Link>
        </article>
      </section>
    </PageShell>
  );
}
