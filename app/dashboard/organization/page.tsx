import { PageShell } from "@/components/page-shell";
import { dashboardSnapshots } from "@/data/platform";

export default function OrganizationDashboardPage() {
  return (
    <PageShell
      title="Organization dashboard"
      intro="A credential-holder workspace for directory profile health, active badges, renewal windows, evidence, and public summaries."
      actions={[{ href: "/registry/riverbend-commons", label: "View public profile" }]}
    >
      <section className="content-section dashboard-grid">
        {dashboardSnapshots.organization.map((item) => (
          <article className="dashboard-card" key={item}>
            <span>Organization</span>
            <h2>{item}</h2>
            <p>Built to help teams keep trust records accurate as work changes.</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
