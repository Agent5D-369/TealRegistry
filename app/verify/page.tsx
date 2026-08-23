import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { statusLabels } from "@/data/trust-content";

export default function VerifyPage() {
  return (
    <PageShell
      title="Verify a Teal Registry claim"
      intro="The public directory is the source of truth. If a claim is not listed there, treat it as unverified."
      actions={[
        { href: "/registry", label: "Search the directory" },
        { href: "/report-misuse", label: "Report possible misuse", variant: "ghost" },
      ]}
    >
      <section className="content-section trust-verdict-layout">
        <article className="trust-verdict-card primary">
          <span>One sentence to remember</span>
          <h2>If it is not in the directory, it is not verified.</h2>
          <p>
            Teal-inspired, Teal-based, or operating with Teal principles may describe intent. They
            are not Teal Registry verification unless the public directory shows an active record.
          </p>
        </article>
        <article className="trust-verdict-card">
          <span>Check these details</span>
          <ul>
            <li>Entity name</li>
            <li>Current status</li>
            <li>Track and scope</li>
            <li>Effective date</li>
            <li>Expiration or next review window</li>
            <li>Badge ID or verification record</li>
          </ul>
        </article>
      </section>
      <section className="content-section">
        <div className="section-heading compact">
          <h2>Status labels</h2>
          <p>Each label means something specific. Training, alignment, verification, and certification are not interchangeable.</p>
        </div>
        <div className="evidence-table">
          {statusLabels.map((status) => (
            <div key={status.label}>
              <strong>{status.label}</strong>
              <span>{status.meaning}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section cta-band">
        <h2>Something does not match?</h2>
        <p>
          Most issues are simple confusion or outdated language. Reports are reviewed privately and
          neutrally before public action is considered.
        </p>
        <div className="hero-actions">
          <Link className="solid-button large" href="/report-misuse">Report possible misuse</Link>
          <Link className="ghost-button large" href="/standards">Read the standards</Link>
        </div>
      </section>
    </PageShell>
  );
}
