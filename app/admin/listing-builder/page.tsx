import { PageShell } from "@/components/page-shell";
import { ListingBuilderWorkbench } from "@/components/listing-builder-workbench";
import {
  aiListingBuilderRules,
  enhancedListingOffers,
  listingBuilderFields,
  listingBuilderStages,
  targetSeedCategories,
} from "@/data/listing-builder";

export default function ListingBuilderPage() {
  const targetTotal = targetSeedCategories.reduce((sum, item) => sum + item.targetCount, 0);

  return (
    <PageShell
      title="AI-assisted listing builder"
      intro="Build high-value discovery pages for intentional communities, regenerative projects, Teal-aligned companies, and ecosystem providers without crossing ethical source or media boundaries."
      actions={[
        { href: "/registry", label: "View public registry" },
        { href: "/admin", label: "Back to admin", variant: "ghost" },
      ]}
    >
      <section className="content-section detail-layout">
        <article className="trust-panel">
          <h2>100-listing launch pipeline</h2>
          <p>
            The first directory growth loop targets {targetTotal} high-interest listings. Each page
            starts as a researched public profile, then becomes stronger when the organization
            claims it, corrects it, adds approved media, and chooses enhanced listing options.
          </p>
          <div className="listing-builder-totals">
            {targetSeedCategories.map((item) => (
              <div key={item.category}>
                <strong>{item.targetCount}</strong>
                <span>{item.category}</span>
              </div>
            ))}
          </div>
        </article>
        <aside className="trust-panel">
          <h2>Ethical media rule</h2>
          <p>
            Facts can be researched and cited. Photos, videos, and illustrations are different:
            use owner-provided assets, clearly licensed media, or original Teal Registry graphics.
            Do not copy protected source-site images just because they are easy to find.
          </p>
        </aside>
      </section>

      <ListingBuilderWorkbench />

      <section className="content-section">
        <div className="section-heading compact">
          <h2>Builder workflow</h2>
          <p>
            This gives admins a repeatable process for creating pages that are valuable to readers,
            attractive to owners, and defensible for search engines and answer engines.
          </p>
        </div>
        <div className="workflow-grid">
          {listingBuilderStages.map((stage) => (
            <article className="pathway-card" key={stage.title}>
              <h2>{stage.title}</h2>
              <p>{stage.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section detail-layout">
        <article className="form-preview">
          {listingBuilderFields.map((field) => (
            <label key={field}>{field}</label>
          ))}
        </article>
        <aside className="trust-panel">
          <h2>Generation rules</h2>
          <ul>
            {aiListingBuilderRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="content-section">
        <div className="section-heading compact">
          <h2>Enhanced listing motivators</h2>
          <p>
            The free research listing should already be impressive. Claiming the listing unlocks
            proof, media, reviews, and conversion paths that make it more useful than a static
            website page.
          </p>
        </div>
        <div className="listing-grid">
          {enhancedListingOffers.map((offer) => (
            <article className="trust-panel" key={offer}>
              <h3>{offer}</h3>
              <p>Available after owner claim, permission, and registry quality review.</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
