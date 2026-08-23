import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { tealPrinciples, verificationOutcomes, verificationSteps } from "@/data/trust-content";

export default function VerificationStandardsPage() {
  return (
    <PageShell
      title="How Teal verification works"
      intro="Teal Verified means evidence was reviewed against the three Teal principles. It is a point-in-time trust signal, not a guarantee of perfection."
      actions={[
        { href: "/apply", label: "Apply for review" },
        { href: "/verify", label: "Verify a claim", variant: "ghost" },
      ]}
    >
      <section className="content-section">
        <div className="section-heading compact">
          <h2>Evidence must cover all three</h2>
          <p>
            Partial implementation can be named honestly, but a credible Teal claim cannot rest on
            only governance, only culture, or only purpose language.
          </p>
        </div>
        <div className="trust-ledger">
          {tealPrinciples.map((principle) => (
            <article key={principle.name}>
              <span>{principle.plain}</span>
              <h3>{principle.name}</h3>
              <ul>
                {principle.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>Review process</h2>
          <div className="workflow-list">
            {verificationSteps.map((step) => (
              <div className="workflow-item" key={step.title}>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.body}</small>
                </span>
              </div>
            ))}
          </div>
        </article>
        <article className="trust-panel">
          <h2>Possible outcomes</h2>
          <ul>
            {verificationOutcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          <p>
            Written feedback is provided in all cases. Appeals are for process errors, missed
            evidence, factual errors, or material new evidence.
          </p>
        </article>
      </section>
      <section className="content-section cta-band">
        <h2>Verification is responsibility-bearing.</h2>
        <p>A verified status should make the exact claim easier to trust, not broader than the evidence allows.</p>
        <Link className="solid-button large" href="/standards/renewal">Read renewal and revocation rules</Link>
      </section>
    </PageShell>
  );
}
