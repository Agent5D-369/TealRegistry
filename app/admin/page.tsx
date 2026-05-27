import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { adminWorkflows, dashboardSnapshots } from "@/data/platform";

const adminLinks = [
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/cases", label: "Cases" },
  { href: "/admin/evidence-review", label: "Evidence review" },
  { href: "/admin/decisions", label: "Decisions" },
  { href: "/admin/badge-issuance", label: "Badge issuance" },
  { href: "/admin/revocation", label: "Revocation" },
  { href: "/admin/renewal", label: "Renewal" },
  { href: "/admin/misuse-reports", label: "Misuse reports" },
];

export default function AdminPage() {
  return (
    <PageShell
      title="Registry operations"
      intro="The admin console protects the public trust layer: applications, cases, evidence, decisions, badge status, renewals, and misuse reports."
    >
      <section className="content-section admin-layout">
        <div className="portal-link-grid">
          {adminLinks.map((link) => (
            <Link className="directory-card" href={link.href} key={link.href}>
              <span>Workflow</span>
              <h3>{link.label}</h3>
              <p>Open the operating view for this registry function.</p>
            </Link>
          ))}
        </div>
        <aside className="trust-panel">
          <h2>Admin command center</h2>
          {dashboardSnapshots.admin.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </aside>
      </section>
      <section className="content-section">
        <div className="workflow-grid">
          {adminWorkflows.map((workflow) => (
            <article className="pathway-card" key={workflow.title}>
              <h2>{workflow.title}</h2>
              <p>{workflow.summary}</p>
              <ol>
                {workflow.states.map((state) => (
                  <li key={state}>{state}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
