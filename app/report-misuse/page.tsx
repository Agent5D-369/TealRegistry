import { PageShell } from "@/components/page-shell";
import { ReportMisuseForm } from "@/components/report-misuse-form";

export default function ReportMisusePage() {
  return (
    <PageShell
      title="Report badge misuse"
      intro="Use this channel when a badge, profile, or Teal claim appears inaccurate, expired, exaggerated, or used outside its reviewed scope."
      actions={[
        { href: "mailto:standards@tealregistry.com?subject=Badge%20Misuse%20Report", label: "Email a report" },
        { href: "/registry", label: "Check registry first", variant: "ghost" },
      ]}
    >
      <section className="content-section report-layout">
        <article>
          <h2>How reports are handled</h2>
          <p>
            Teal Registry reviews concerns for public trust impact. Some issues are corrected
            privately; others may lead to clarification, suspension, revocation, or a public notice.
          </p>
          <div className="workflow-list">
            {["Received", "Triaged", "Investigated", "Decision made", "Public record updated"].map((step) => (
              <div className="workflow-item" key={step}>
                <span>
                  <strong>{step}</strong>
                  <small>Reports move through a documented review path before action is taken.</small>
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
