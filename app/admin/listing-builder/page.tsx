import type { Metadata } from "next";
import Link from "next/link";
import {
  Wand2,
  Database,
  Search,
  FileText,
  Eye,
  Globe,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react";
import { PortalSidebar } from "@/components/portal-sidebar";
import {
  aiListingBuilderRules,
  enhancedListingOffers,
  listingBuilderFields,
  listingBuilderStages,
  targetSeedCategories,
} from "@/data/listing-builder";

export const metadata: Metadata = {
  title: "AI Listing Builder | Teal Registry Admin",
  description: "Build high-value discovery pages for regenerative organizations at scale.",
};

const stageIcons = [Search, FileText, Wand2, Eye, Globe];

const demoQueue = [
  { name: "Riverbend Commons", type: "Intentional community", country: "USA", stage: "Draft", assignee: "AI draft complete", priority: "High" },
  { name: "Earthaven Ecovillage", type: "Intentional community", country: "USA", stage: "Review", assignee: "Maya H.", priority: "High" },
  { name: "Vientos de Cambio", type: "Regenerative land project", country: "Chile", stage: "Discover", assignee: "Auto", priority: "Medium" },
  { name: "Zebra Cooperativa", type: "Worker cooperative", country: "Spain", stage: "Extract", assignee: "Auto", priority: "Medium" },
  { name: "Teal Transitions Ltd", type: "Implementation provider", country: "UK", stage: "Publish", assignee: "Rick B.", priority: "Low" },
];

const stageChip = (stage: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Discover: { bg: "#dbeafe", color: "#1e40af" },
    Extract: { bg: "#ede9fe", color: "#5b21b6" },
    Draft: { bg: "#fef3c7", color: "#92400e" },
    Review: { bg: "#fed7aa", color: "#9a3412" },
    Publish: { bg: "#d1fae5", color: "#065f46" },
  };
  return map[stage] || { bg: "#f3f4f6", color: "#6b7280" };
};

const priorityColor = (p: string) => ({ High: "#dc2626", Medium: "#d97706", Low: "#6b7280" }[p] || "#6b7280");

export default function ListingBuilderPage() {
  const targetTotal = targetSeedCategories.reduce((sum, item) => sum + item.targetCount, 0);

  return (
    <div className="portal-page">
      <PortalSidebar role="admin" />
      <main className="portal-main">
        <header className="portal-header">
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "0.25rem" }}>
              AI Listing Builder
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>
              Build {targetTotal} high-value discovery pages for regenerative organizations
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/registry" className="btn btn-ghost" style={{ fontSize: "0.875rem" }}>
              View public registry
            </Link>
            <Link href="/admin/listing-builder/new" className="btn btn-primary" style={{ fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Wand2 size={14} />
              New listing
            </Link>
          </div>
        </header>

        {/* Target pipeline stats */}
        <div className="stats-grid" style={{ marginBottom: "2rem" }}>
          {targetSeedCategories.map((cat) => (
            <div key={cat.category} className="stat-card">
              <Layers size={18} style={{ color: "var(--teal)", marginBottom: "0.5rem" }} />
              <div className="stat-value">{cat.targetCount}</div>
              <div className="stat-label">{cat.category}</div>
            </div>
          ))}
        </div>

        {/* Workflow stages */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "1rem" }}>
            Builder workflow
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
            {listingBuilderStages.map((stage, i) => {
              const Icon = stageIcons[i];
              return (
                <div key={stage.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.25rem", position: "relative" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--teal-xlight)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                    <Icon size={16} />
                  </div>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "0.375rem" }}>
                    Step {i + 1}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1rem", marginBottom: "0.5rem" }}>
                    {stage.title}
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.6, maxWidth: "none", margin: 0 }}>
                    {stage.summary}
                  </p>
                  {i < listingBuilderStages.length - 1 && (
                    <ArrowRight size={12} style={{ position: "absolute", right: "-0.375rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)", zIndex: 1 }} />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Active queue */}
        <section style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem" }}>
              Active listing queue
            </h2>
            <Link href="/admin/listing-builder/queue" style={{ fontSize: "0.875rem", color: "var(--teal)" }}>
              View all →
            </Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {["Organization", "Type", "Country", "Stage", "Assignee", "Priority", ""].map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {demoQueue.map((item, i) => {
                  const chip = stageChip(item.stage);
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td style={{ color: "var(--muted)", fontSize: "0.875rem" }}>{item.type}</td>
                      <td style={{ color: "var(--muted)", fontSize: "0.875rem" }}>{item.country}</td>
                      <td>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.2rem 0.625rem", borderRadius: "9999px", background: chip.bg, color: chip.color }}>
                          {item.stage}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{item.assignee}</td>
                      <td>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: priorityColor(item.priority) }}>
                          {item.priority}
                        </span>
                      </td>
                      <td>
                        <Link href={`/admin/listing-builder/${item.name.toLowerCase().replace(/\s+/g, "-")}`} style={{ fontSize: "0.8125rem", color: "var(--teal)", fontWeight: 600 }}>
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom row: field list + rules + enhanced offers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
          {/* Field checklist */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "1rem" }}>
              Required fields
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {listingBuilderFields.map((field) => (
                <div key={field} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "4px", border: "1px solid var(--border)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--ink-mid)" }}>{field}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI generation rules */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              AI generation rules
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "1rem", background: "#fef3c7", borderRadius: "var(--radius)", padding: "0.625rem 0.75rem" }}>
              <AlertCircle size={14} style={{ color: "#d97706", flexShrink: 0, marginTop: "0.1rem" }} />
              <span style={{ fontSize: "0.8125rem", color: "#92400e" }}>Ethical media rule: never copy protected photos without explicit permission.</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {aiListingBuilderRules.map((rule, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "0.15rem" }} />
                  <span style={{ fontSize: "0.8125rem", color: "var(--ink-mid)", lineHeight: 1.6 }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced listing offers */}
          <div style={{ background: "var(--teal-xlight)", border: "1px solid var(--teal-light)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "0.5rem", color: "var(--teal-dark)" }}>
              Enhanced listing upsells
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--teal)", marginBottom: "1rem", maxWidth: "none" }}>
              Available after owner claim, permission, and quality review.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {enhancedListingOffers.map((offer) => (
                <div key={offer} style={{ display: "flex", gap: "0.5rem", alignItems: "center", background: "white", borderRadius: "var(--radius)", padding: "0.625rem 0.875rem" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--teal)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--ink-mid)" }}>{offer}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--teal-light)" }}>
              <Link href="/pricing" style={{ fontSize: "0.875rem", color: "var(--teal)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                View pricing model →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
