import { PageShell } from "@/components/page-shell";
import { dashboardSnapshots } from "@/data/platform";

export default function CandidateDashboardPage() {
  return (
    <PageShell
      title="Candidate dashboard"
      intro="A focused workspace for applicants to manage review scope, evidence, reviewer questions, and claim language."
      actions={[{ href: "/apply", label: "Start or update application" }]}
    >
      <section className="content-section dashboard-grid">
        {dashboardSnapshots.candidate.map((item) => (
          <article className="dashboard-card" key={item}>
            <span>Candidate</span>
            <h2>{item}</h2>
            <p>Designed to keep applicants clear on next actions and safe public claims.</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
