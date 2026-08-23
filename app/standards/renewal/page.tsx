import { PageShell } from "@/components/page-shell";

const reviewTriggers = [
  "Structural regression, such as power recentralizing around one person or group",
  "Cultural breakdown, such as retaliation, unmanaged conflict, or unsafe silence",
  "Misrepresentation, such as claims that exceed the public record",
  "Major change events, such as ownership, leadership, governance, merger, or mission changes",
];

const graduatedResponses = [
  "Clarification request",
  "Conditional verified status with a support window",
  "Paused verification while review or repair occurs",
  "Revoked verification when evidence no longer supports the claim",
];

export default function RenewalStandardsPage() {
  return (
    <PageShell
      title="Renewal, status changes, and revocation"
      intro="Verification is a time-bound trust signal based on evidence of practice. It is not a permanent badge of virtue."
      actions={[
        { href: "/report-misuse", label: "Report a concern" },
        { href: "/standards/verification", label: "How verification works", variant: "ghost" },
      ]}
    >
      <section className="content-section trust-verdict-layout">
        <article className="trust-verdict-card primary">
          <span>Term</span>
          <h2>Teal Verified is valid for 12 months.</h2>
          <p>
            Renewal requires a short annual update, refreshed evidence, and confirmation that no
            disqualifying conditions are active.
          </p>
        </article>
        <article className="trust-verdict-card">
          <span>Public meaning</span>
          <p>
            Status reflects reviewed evidence at a point in time and does not guarantee outcomes,
            future conditions, or unreviewed parts of an organization.
          </p>
        </article>
      </section>
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>What can trigger review</h2>
          <ul>
            {reviewTriggers.map((trigger) => (
              <li key={trigger}>{trigger}</li>
            ))}
          </ul>
        </article>
        <article className="trust-panel">
          <h2>Graduated responses</h2>
          <ul>
            {graduatedResponses.map((response) => (
              <li key={response}>{response}</li>
            ))}
          </ul>
        </article>
      </section>
      <section className="content-section cta-band">
        <h2>The tone standard is firm, neutral, and humane.</h2>
        <p>
          Teal Registry corrects public claims to protect trust, not to punish, shame, or perform
          authority.
        </p>
      </section>
    </PageShell>
  );
}
