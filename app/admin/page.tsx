import Link from "next/link";
import {
  ClipboardList, FileText, ShieldCheck, AlertTriangle, Users,
  TrendingUp, Clock, CheckCircle2, XCircle, Star, ArrowRight,
} from "lucide-react";
import { PortalSidebar } from "@/components/portal-sidebar";

// Demo data — replaced by DB queries in production
const stats = [
  { label: "Applications (30d)", value: "24", delta: "+8 vs prior", up: true },
  { label: "Active cases", value: "11", delta: "3 urgent", up: false },
  { label: "Decisions this month", value: "9", delta: "7 approved", up: true },
  { label: "Active badges", value: "47", delta: "+3 this month", up: true },
  { label: "Open misuse reports", value: "2", delta: "1 in investigation", up: false },
  { label: "Listings in directory", value: "13", delta: "10 pre-populated", up: true },
];

const recentApplications = [
  { id: "APP-2026-081", org: "Blue Mountain Regenerative Farm", type: "Teal Certified", stage: "Screening", date: "Jun 15, 2026" },
  { id: "APP-2026-080", org: "Nexus Impact Consulting", type: "Accredited Implementation", stage: "Evidence review", date: "Jun 12, 2026" },
  { id: "APP-2026-079", org: "River Valley Co-op", type: "Teal Aligned", stage: "Decision pending", date: "Jun 10, 2026" },
  { id: "APP-2026-077", org: "Integrated Leadership Academy", type: "Accredited Training", stage: "Interview", date: "Jun 8, 2026" },
  { id: "APP-2026-075", org: "New Earth Systems", type: "Teal Verified", stage: "Submitted", date: "Jun 5, 2026" },
];

const recentReports = [
  { id: "RPT-2026-012", org: "Verdant Co-op", claim: "Using badge without renewal", status: "Investigation", risk: "Medium" },
  { id: "RPT-2026-011", org: "GreenPath Training", claim: "Scope expansion beyond certificate", status: "Triage", risk: "Low" },
];

const stageChip: Record<string, string> = {
  "Screening": "chip-muted",
  "Evidence review": "chip-teal",
  "Interview": "chip-verified",
  "Decision pending": "chip-certified",
  "Submitted": "chip-muted",
};

export default function AdminDashboardPage() {
  return (
    <div className="portal-page">
      <PortalSidebar role="admin" />

      <main className="portal-main">
        <div className="portal-header">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <h1>Registry operations</h1>
              <p>Certification workflow, badge management, directory, and misuse response.</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/admin/listing-builder" className="btn btn-ghost btn-sm">
                <Star size={14} />
                AI listing builder
              </Link>
              <Link href="/admin/applications" className="btn btn-primary btn-sm">
                <ClipboardList size={14} />
                New application
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <p className={`stat-delta ${s.up ? "up" : "down"}`}>{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Workflow modules */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
          {[
            { href: "/admin/applications", icon: <ClipboardList size={20} />, label: "Applications", sub: "24 total, 5 in screening" },
            { href: "/admin/cases", icon: <FileText size={20} />, label: "Active cases", sub: "11 cases, 3 urgent" },
            { href: "/admin/decisions", icon: <CheckCircle2 size={20} />, label: "Decisions", sub: "9 this month" },
            { href: "/admin/badges", icon: <ShieldCheck size={20} />, label: "Badges", sub: "47 active" },
            { href: "/admin/reports", icon: <AlertTriangle size={20} />, label: "Misuse reports", sub: "2 open" },
            { href: "/admin/users", icon: <Users size={20} />, label: "Users", sub: "148 registered" },
            { href: "/admin/listings", icon: <Star size={20} />, label: "Directory", sub: "13 listings" },
            { href: "/admin/listing-builder", icon: <TrendingUp size={20} />, label: "AI builder", sub: "Generate listings at scale" },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
              <div className="work-card" style={{ flexDirection: "column", gap: "0.75rem", alignItems: "flex-start" }}>
                <div className="work-card-icon">{item.icon}</div>
                <div>
                  <p className="work-card-title">{item.label}</p>
                  <p className="work-card-meta">{item.sub}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent applications */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem" }}>Recent applications</h3>
            <Link href="/admin/applications" className="btn btn-ghost btn-sm">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Organization</th>
                  <th>Credential type</th>
                  <th>Stage</th>
                  <th>Submitted</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8125rem", color: "var(--muted)" }}>{app.id}</td>
                    <td style={{ fontWeight: 500 }}>{app.org}</td>
                    <td><span className="chip chip-teal" style={{ fontSize: "0.8rem" }}>{app.type}</span></td>
                    <td><span className={`chip ${stageChip[app.stage] ?? "chip-muted"}`} style={{ fontSize: "0.8rem" }}>{app.stage}</span></td>
                    <td style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{app.date}</td>
                    <td>
                      <Link href={`/admin/applications/${app.id}`} className="btn btn-ghost btn-sm">Review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Misuse reports */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem" }}>
              Open misuse reports
              <span style={{ marginLeft: "0.625rem", background: "var(--danger, #d73a49)", color: "white", fontSize: "0.6875rem", padding: "0.125rem 0.5rem", borderRadius: "999px", verticalAlign: "middle" }}>
                {recentReports.length} open
              </span>
            </h3>
            <Link href="/admin/reports" className="btn btn-ghost btn-sm">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Organization</th>
                  <th>Concern</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8125rem", color: "var(--muted)" }}>{r.id}</td>
                    <td style={{ fontWeight: 500 }}>{r.org}</td>
                    <td style={{ fontSize: "0.875rem", color: "var(--ink-mid)" }}>{r.claim}</td>
                    <td><span className="chip chip-review" style={{ fontSize: "0.8rem" }}>{r.status}</span></td>
                    <td>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: r.risk === "Medium" ? "var(--gold)" : "var(--muted)" }}>
                        {r.risk}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/reports/${r.id}`} className="btn btn-ghost btn-sm">
                        <AlertTriangle size={13} />
                        Investigate
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions for urgent items */}
        <div className="notice notice-teal" style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <Clock size={18} />
            <span><strong>1 case decision</strong> is due within 3 days — CASE-2026-039 (Sunrise Learning Institute)</span>
          </div>
          <Link href="/admin/cases/CASE-2026-039" className="btn btn-primary btn-sm">Open case</Link>
        </div>
      </main>
    </div>
  );
}
