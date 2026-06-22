import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { credentialLevels } from "@/data/registry";
import { glossaryEntries, slugify } from "@/data/education";

export default function CredentialsPage() {
  return (
    <PageShell
      title="Credential ladder"
      intro="Every badge has a clear meaning, a clear boundary, and a public record that explains the claim."
      actions={[
        { href: "/apply", label: "Choose a pathway" },
        { href: "/standards", label: "Read standards", variant: "ghost" },
      ]}
    >
      <section className="content-section">
        <div className="credential-directory">
          {credentialLevels.map((level) => (
            <article className="credential-detail" key={level.title}>
              <Image src={level.badgeImage} alt={`${level.title} badge`} width={360} height={260} />
              <div>
                <span>Step {level.level}</span>
                <h2>{level.title}</h2>
                <p>{level.targetDescription}</p>
                <dl>
                  <div>
                    <dt>Best for</dt>
                    <dd className="link-list">
                      {level.eligible.split(",").map((audience) => {
                        const label = audience.trim();
                        return (
                          <Link href={`/audiences/${slugify(label)}`} key={label}>
                            {label}
                          </Link>
                        );
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt>Evidence signal</dt>
                    <dd>
                      <Link
                        className="inline-value-link"
                        href={`/glossary/${glossaryEntries.find((entry) => entry.term === level.evidenceRequired)?.slug ?? slugify(level.evidenceRequired)}`}
                      >
                        {level.evidenceRequired}
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt>Public meaning</dt>
                    <dd>{level.claim}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
