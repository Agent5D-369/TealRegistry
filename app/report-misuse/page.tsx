import { PageShell } from "@/components/page-shell";
import { ReportMisuseForm } from "@/components/report-misuse-form";
import { misusePublicFlow } from "@/data/trust-content";

export default function ReportMisusePage() {
  return (
    <PageShell
      title="Report misuse of Teal Registry status"
      intro="Use this neutral channel when a badge, status, listing, or Teal Registry claim appears inaccurate, expired, exaggerated, or outside its reviewed scope."
      actions={[
        { href: "/verify", label: "Verify claim first" },
        { href: "/registry", label: "Search registry", variant: "ghost" },
      ]}
    >
      <section className="content-section trust-verdict-layout">
        <article className="trust-verdict-card primary">
          <span>Trust rule</span>
          <h2>Not listed? Not verified.</h2>
          <p>
            Only organizations and practitioners listed in the Teal Registry directory are verified
            or certified. Claims made outside the directory should be treated as unverified.
          </p>
        </article>
        <article className="trust-verdict-card">
          <span>Tone standard</span>
          <p>
            Reporting is not punitive. Most cases are resolved through clarification or correction.
            Teal Registry reviews evidence; it does not act on hearsay, social pressure, or personal disputes.
          </p>
        </article>
      </section>

      <section className="content-section report-layout">
        <article>
          <h2>What happens after a report</h2>
          <p>
            The process is designed to protect public trust without creating public drama. A report
            may lead to no action, private correction, status clarification, suspension, revocation,
            or a public notice when public trust is affected.
          </p>
          <div className="workflow-list">
            {misusePublicFlow.map((step) => (
              <div className="workflow-item" key={step.title}>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.body}</small>
                </span>
              </div>
            ))}
          </div>
        </article>
        <aside>
          <h2>Send a trust concern</h2>
          <p>
            The clearest reports include the claim, where it appears, and what a reasonable person
            might misunderstand. Anonymous reports are accepted, but contact information helps if a
            reviewer needs clarification.
          </p>
          <ReportMisuseForm />
        </aside>
      </section>
    </PageShell>
  );
}