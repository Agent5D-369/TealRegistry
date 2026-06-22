import Link from "next/link";
import { Clock, CheckCircle2, AlertTriangle, ArrowRight, FileText, Calendar } from "lucide-react";
import { PortalSidebar } from "@/components/portal-sidebar";

const activeCases = [
  {
    id: "CASE-2026-047",
    org: "Verdant Cooperative Ltd",
    type: "Teal Certified",
    stage: "Evidence review",
    daysLeft: 12,
    priority: "normal",
    submitted: "May 10, 2026",
    evidenceCount: 6,
    openQuestions: 1,
  },
  {
    id: "CASE-2026-039",
    org: "Sunrise Learning Institute",
    type: "Accredited Training",
    stage: "Findings ready",
    daysLeft: 3,
    priority: "urgent",
    submitted: "Apr 28, 2026",
    evidenceCount: 9,
    openQuestions: 0,
  },
  {
    id: "CASE-2026-051",
    org: "Regenerative Futures Network",
    type: "Teal Aligned",
    stage: "Interview scheduled",
    daysLeft: 8,
    priority: "normal",
    submitted: "May 18, 2026",
    evidenceCount: 4,
    openQuestions: 2,
  },
];

export default function AssessorDashboardPage() {
  return (
    <div className="portal-page">
      <PortalSidebar role="assessor" />

      <main className="portal-main">
        <div className="portal-header">
          <h1>Assessor workspace</h1>
          <p>Your assigned cases, evidence queues, and decision packets.</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "Active cases", value: "3", delta: "", icon: <FileText size={18} /> },
            { label: "Evidence items pending", value: "11", delta: "3 new today", icon: <FileText size={18} /> },
            { label: "Open questions", value: "3", delta: "2 unread", icon: <AlertTriangle size={18} /> },
            { label: "Decisions due this week", value: "1", delta: "Urgent", icon: <Clock size={18} /> },
            { label: "Completed reviews", value: "18", delta: "This year", icon: <CheckCircle2 size={18} /> },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
              {stat.delta && <p className="stat-delta">{stat.delta}</p>}
            </div>
          ))}
        </div>

        {/* Active cases table */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.25rem" }}>Active cases</h3>
            <Link href="/dashboard/assessor/completed" className="btn btn-ghost btn-sm">
              View completed
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Organization</th>
                  <th>Credential type</th>
                  <th>Stage</th>
                  <th>Evidence</th>
                  <th>Due</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {activeCases.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8125rem", color: "var(--muted)" }}>{c.id}</td>
                    <td>
                      <div style={{ fontWeight: 500, color: "var(--ink)", marginBottom: "0.125rem" }}>{c.org}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Submitted {c.submitted}</div>
                    </td>
                    <td>
                      <span className="chip chip-teal" style={{ fontSize: "0.8rem" }}>{c.type}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        {c.stage === "Findings ready" ? <CheckCircle2 size={14} style={{ color: "var(--teal)" }} /> : <Clock size={14} style={{ color: "var(--gold)" }} />}
                        <span style={{ fontSize: "0.875rem" }}>{c.stage}</span>
                      </div>
                      {c.openQuestions > 0 && (
                        <div style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: "0.125rem" }}>
                          {c.openQuestions} open question{c.openQuestions > 1 ? "s" : ""}
                        </div>
                      )}
                    </td>
                    <td style={{ fontSize: "0.875rem" }}>{c.evidenceCount} items</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem" }}>
                        <Calendar size={13} style={{ color: c.priority === "urgent" ? "var(--danger)" : "var(--muted)" }} />
                        <span style={{ color: c.priority === "urgent" ? "var(--danger)" : "var(--ink-mid)" }}>
                          {c.daysLeft}d left
                        </span>
                      </div>
                    </td>
                    <td>
                      <Link href={`/admin/cases/${c.id}`} className="btn btn-primary btn-sm">
                        Open case
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* COI reminder */}
        <div className="notice notice-warning" style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>Conflict of interest reminder</strong>
            <p style={{ marginBottom: 0, maxWidth: "none", marginTop: "0.25rem" }}>
              Declare any connections to applicant organizations before opening case files.{" "}
              <Link href="/dashboard/assessor/coi" style={{ color: "var(--teal)" }}>Manage COI declarations →</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
