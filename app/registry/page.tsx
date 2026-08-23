import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { RegistryConsole } from "@/components/registry-console";
import { getDirectoryRecords } from "@/lib/registry-records";

export const metadata: Metadata = {
  title: "Teal Registry Directory | Search Teal Organizations, Communities, Providers, and Frameworks",
  description:
    "Search public Teal Registry profiles for intentional communities, regenerative businesses, self-managing organizations, sociocracy examples, training providers, frameworks, verification status, source notes, and claim boundaries.",
  keywords: [
    "Teal Registry directory",
    "teal organizations directory",
    "intentional community directory",
    "regenerative business directory",
    "self organizing organizations",
    "self managing organizations",
    "sociocracy examples",
    "ecovillage directory",
    "teal verification",
    "public research profiles",
  ],
};
export const dynamic = "force-dynamic";

export default async function RegistryPage() {
  const records = await getDirectoryRecords();

  return (
    <PageShell
      title="Public Teal Registry"
      intro="Search public records, check badge status, and understand exactly what has and has not been reviewed."
      actions={[
        { href: "/apply", label: "Apply for review" },
        { href: "/report-misuse", label: "Report misuse", variant: "ghost" },
      ]}
    >
      <RegistryConsole records={records} />
      <section className="content-section">
        <div className="section-heading compact">
          <h2>Current public records</h2>
          <p>
            Each listing explains the claim, scope, review status, public evidence summary, and
            badge record so decision-makers can move quickly without guessing.
          </p>
        </div>
        <div className="directory-grid">
          {records.map((record) => (
            <Link className="directory-card" href={`/registry/${record.slug}`} key={record.slug}>
              <span>{record.entityType}</span>
              <h3>{record.name}</h3>
              <p>{record.publicSummary}</p>
              <dl>
                <div>
                  <dt>Status</dt>
                  <dd>{record.status}</dd>
                </div>
                <div>
                  <dt>Scope</dt>
                  <dd>{record.scope}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>{record.sourceLinks.some((source) => source.href.startsWith("http")) ? "Official link" : "Needed"}</dd>
                </div>
                <div>
                  <dt>Badge</dt>
                  <dd>{record.badgeId === "No badge issued" ? "Not issued" : record.badgeId}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
