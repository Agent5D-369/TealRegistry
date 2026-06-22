import { PageShell } from "@/components/page-shell";
import { dashboardSnapshots } from "@/data/platform";

export default function AssessorDashboardPage() {
  return (
    <PageShell
      title="Assessor dashboard"
      intro="A reviewer workspace for evidence queues, assigned cases, conflict checks, findings, and decision packets."
      actions={[{ href: "/admin/cases", label: "Review cases" }]}
    >
      <section className="content-section dashboard-grid">
        {dashboardSnapshots.assessor.map((item) => (
          <article className="dashboard-card" key={item}>
            <span>Assessor</span>
            <h2>{item}</h2>
            <p>Designed for consistent reviews, clean boundaries, and defensible decisions.</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
