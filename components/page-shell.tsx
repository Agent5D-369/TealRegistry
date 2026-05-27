import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  title: string;
  intro: string;
  children: ReactNode;
  actions?: Array<{ href: string; label: string; variant?: "solid" | "ghost" }>;
};

export function PageShell({ title, intro, actions = [], children }: PageShellProps) {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <div>
          <h1>{title}</h1>
          <p>{intro}</p>
          {actions.length > 0 ? (
            <div className="hero-actions">
              {actions.map((action) => (
                <Link
                  className={action.variant === "ghost" ? "ghost-button large" : "solid-button large"}
                  href={action.href}
                  key={action.href}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      {children}
    </main>
  );
}
