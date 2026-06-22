import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { portalRoutes } from "@/data/platform";

export default function LoginPage() {
  return (
    <PageShell
      title="Portal login"
      intro="Credential work needs a protected workspace for applicants, organizations, assessors, and registry administrators."
    >
      <section className="content-section login-layout">
        <form className="login-card">
          <label>
            Email
            <input placeholder="name@example.com" type="email" />
          </label>
          <label>
            Password
            <input placeholder="Protected portal access" type="password" />
          </label>
          <button className="solid-button" type="button">
            Continue
          </button>
          <p>
            Authentication will connect to the production identity provider before private evidence
            or decisions are stored.
          </p>
        </form>
        <div className="portal-link-grid">
          {portalRoutes.slice(1).map((route) => (
            <Link className="directory-card" href={route.href} key={route.href}>
              <span>Preview</span>
              <h3>{route.label} dashboard</h3>
              <p>See the protected workspace structure for this role.</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
