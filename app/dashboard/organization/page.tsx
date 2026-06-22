import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  ExternalLink,
  Upload,
  Edit,
  Bell,
} from "lucide-react";
import { PortalSidebar } from "@/components/portal-sidebar";

export const metadata: Metadata = {
  title: "Organization Dashboard | Teal Registry",
  description: "Manage your Teal Registry listing, badges, evidence, and renewal schedule.",
};

const demoBadges = [
  {
    name: "Teal Certified",
    id: "TR-CERT-US-001",
    scope: "Engineering and product teams (≈ 85 people)",
    validTo: "2025-06-30",
    daysLeft: 13,
    status: "Active",
    renewalDue: true,
  },
  {
    name: "Teal Aligned",
    id: "TR-AL-US-001",
    scope: "Full organization",
    validTo: "2025-12-31",
    daysLeft: 197,
    status: "Active",
    renewalDue: false,
  },
];

const demoEvidenceItems = [
  { name: "Governance structure document", status: "Accepted", added: "2024-11-12" },
  { name: "Compensation transparency report", status: "Accepted", added: "2024-11-20" },
  { name: "Team self-assessment survey (Q3 2024)", status: "Under review", added: "2025-04-01" },
  { name: "Conflict resolution case log", status: "Needs clarification", added: "2025-03-15" },
  { name: "Annual purpose alignment report", status: "Pending upload", added: null },
];

const statusChipStyle = (status: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Accepted: { bg: "#d1fae5", color: "#065f46" },
    "Under review": { bg: "#dbeafe", color: "#1e40af" },
    "Needs clarification": { bg: "#fef3c7", color: "#92400e" },
    "Pending upload": { bg: "#f3f4f6", color: "#6b7280" },
  };
  return map[status] || { bg: "#f3f4f6", color: "#6b7280" };
};

const demoAnnouncements = [
  {
    type: "Renewal",
    text: "Your Teal Certified badge expires in 13 days. Upload renewal evidence to keep your status active.",
    urgent: true,
  },
  {
    type: "Message",
    text: "Assessor Maya Hernandez left a comment on your governance document. Review and respond.",
    urgent: false,
  },
  {
    type: "Info",
    text: "Renewal review window for Teal Certified opens 60 days before expiry. Submit early for priority scheduling.",
    urgent: false,
  },
];

export default function OrganizationDashboardPage() {
  return (
    <div className="portal-page">
      <PortalSidebar role="organization" />
      <main className="portal-main">
        <header className="portal-header">
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "0.25rem" }}>
              Morning Star Company
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>Organization dashboard</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/registry/morning-star-company" className="btn btn-ghost" style={{ fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <ExternalLink size={14} />
              Public listing
            </Link>
            <Link href="/apply" className="btn btn-primary" style={{ fontSize: "0.875rem" }}>
              Upgrade credential
            </Link>
          </div>
        </header>

        {/* Alerts */}
        {demoAnnouncements.filter(a => a.urgent).map((a, i) => (
          <div key={i} style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: "var(--radius)", padding: "1rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <AlertCircle size={18} style={{ color: "#d97706", flexShrink: 0, marginTop: "0.1rem" }} />
            <div>
              <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#92400e" }}>{a.type}: </span>
              <span style={{ fontSize: "0.9rem", color: "#78350f" }}>{a.text}</span>
            </div>
            <Link href="/dashboard/organization/renewal" className="btn btn-primary" style={{ fontSize: "0.8125rem", padding: "0.375rem 0.875rem", marginLeft: "auto", whiteSpace: "nowrap", flexShrink: 0 }}>
              Start renewal
            </Link>
          </div>
        ))}

        {/* Active badges */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "1rem" }}>
            Active badges
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
            {demoBadges.map((badge) => (
              <div key={badge.id} style={{ background: "var(--surface)", border: `1px solid ${badge.renewalDue ? "#f59e0b" : "var(--border)"}`, borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                      <ShieldCheck size={18} style={{ color: "var(--teal)" }} />
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem" }}>
                        {badge.name}
                      </h3>
                    </div>
                    <code style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "monospace" }}>{badge.id}</code>
                  </div>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.2rem 0.5rem", borderRadius: "4px", background: badge.renewalDue ? "#fef3c7" : "#d1fae5", color: badge.renewalDue ? "#92400e" : "#065f46" }}>
                    {badge.renewalDue ? "Renewal due" : "Active"}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem", maxWidth: "none" }}>
                  Scope: {badge.scope}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <Clock size={14} style={{ color: badge.daysLeft < 30 ? "#d97706" : "var(--muted)" }} />
                    <span style={{ fontSize: "0.8125rem", color: badge.daysLeft < 30 ? "#d97706" : "var(--muted)", fontWeight: badge.daysLeft < 30 ? 600 : 400 }}>
                      {badge.daysLeft} days remaining
                    </span>
                  </div>
                  <Link href={`/verify/${badge.id}`} style={{ fontSize: "0.8125rem", color: "var(--teal)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    Verify <ExternalLink size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence portal */}
        <section style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem" }}>
              Evidence portal
            </h2>
            <Link href="/dashboard/organization/evidence/upload" className="btn btn-primary" style={{ fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Upload size={14} />
              Upload evidence
            </Link>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "#f8faf9" }}>
                  {["Document", "Status", "Added", ""].map((h, i) => (
                    <th key={i} style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {demoEvidenceItems.map((item, i) => {
                  const chip = statusChipStyle(item.status);
                  return (
                    <tr key={i} style={{ borderBottom: i < demoEvidenceItems.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <FileText size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.9rem" }}>{item.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.2rem 0.625rem", borderRadius: "9999px", background: chip.bg, color: chip.color }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: "1rem 1.25rem", fontSize: "0.875rem", color: "var(--muted)" }}>
                        {item.added ?? "—"}
                      </td>
                      <td style={{ padding: "1rem 1.25rem" }}>
                        {item.status === "Pending upload" ? (
                          <Link href="/dashboard/organization/evidence/upload" style={{ fontSize: "0.8125rem", color: "var(--teal)", fontWeight: 600 }}>Upload</Link>
                        ) : item.status === "Needs clarification" ? (
                          <Link href="/dashboard/organization/messages" style={{ fontSize: "0.8125rem", color: "#d97706", fontWeight: 600 }}>Reply</Link>
                        ) : (
                          <Link href="#" style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>View</Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick actions + messages */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "1rem" }}>
              Quick actions
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { icon: <RefreshCw size={18} />, label: "Start renewal", href: "/dashboard/organization/renewal", highlight: true },
                { icon: <Upload size={18} />, label: "Upload evidence", href: "/dashboard/organization/evidence/upload" },
                { icon: <Edit size={18} />, label: "Edit public listing", href: "/dashboard/organization/listing" },
                { icon: <Bell size={18} />, label: "Notification settings", href: "/dashboard/organization/settings" },
                { icon: <CheckCircle2 size={18} />, label: "View decisions", href: "/dashboard/organization/decisions" },
                { icon: <ShieldCheck size={18} />, label: "Badge display kit", href: "/dashboard/organization/badge-kit" },
              ].map((action, i) => (
                <Link key={i} href={action.href} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1.25rem",
                  background: action.highlight ? "var(--teal)" : "var(--surface)",
                  color: action.highlight ? "white" : "var(--ink)",
                  border: `1px solid ${action.highlight ? "var(--teal)" : "var(--border)"}`,
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "box-shadow 0.15s",
                }}>
                  {action.icon}
                  {action.label}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem", marginBottom: "1rem" }}>
              Messages
            </h2>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              {demoAnnouncements.map((a, i) => (
                <div key={i} style={{ padding: "1rem 1.25rem", borderBottom: i < demoAnnouncements.length - 1 ? "1px solid var(--border)" : "none", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.urgent ? "#d97706" : "var(--border)", marginTop: "0.4rem", flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: a.urgent ? "#d97706" : "var(--muted)", display: "block", marginBottom: "0.25rem" }}>
                      {a.type}
                    </span>
                    <p style={{ fontSize: "0.875rem", color: "var(--ink-mid)", lineHeight: 1.65, maxWidth: "none", margin: 0 }}>{a.text}</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: "0.875rem 1.25rem", borderTop: "1px solid var(--border)" }}>
                <Link href="/dashboard/organization/messages" style={{ fontSize: "0.875rem", color: "var(--teal)", fontWeight: 600 }}>
                  View all messages →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
