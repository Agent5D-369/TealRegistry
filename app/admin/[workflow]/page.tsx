import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText,
  Users,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowLeft,
  MoreHorizontal,
} from "lucide-react";
import { PortalSidebar } from "@/components/portal-sidebar";

type WorkflowPageProps = {
  params: Promise<{ workflow: string }>;
};

const workflowConfigs: Record<string, {
  title: string;
  description: string;
  stages: string[];
  statCards: Array<{ label: string; value: string | number }>;
  columns: string[];
  rows: Array<Record<string, string>>;
}> = {
  applications: {
    title: "Applications",
    description: "Intake, readiness screening, missing information, pathway fit, and applicant communication.",
    stages: ["Draft", "Submitted", "Screening", "Evidence review", "Decision"],
    statCards: [
      { label: "Total applications", value: 47 },
      { label: "Awaiting screening", value: 9 },
      { label: "Evidence review", value: 14 },
      { label: "Decision pending", value: 5 },
    ],
    columns: ["Applicant", "Org type", "Pathway", "Stage", "Days open", ""],
    rows: [
      { Applicant: "Sunrise Commons", "Org type": "Intentional community", Pathway: "Teal Certified", Stage: "Evidence review", "Days open": "12" },
      { Applicant: "Kinship Works LLC", "Org type": "Worker cooperative", Pathway: "Teal Verified", Stage: "Screening", "Days open": "4" },
      { Applicant: "Bright Path Training", "Org type": "Training provider", Pathway: "Accredited Training", Stage: "Submitted", "Days open": "1" },
      { Applicant: "Mesa Verde Coliving", "Org type": "Intentional community", Pathway: "Teal Verified", Stage: "Decision pending", "Days open": "21" },
      { Applicant: "Regenera Consulting", "Org type": "Implementation provider", Pathway: "Accredited Implementation", Stage: "Evidence review", "Days open": "9" },
    ],
  },
  cases: {
    title: "Active Cases",
    description: "Assessor assignment, COI checks, evidence review, stakeholder interviews, findings, and deadlines.",
    stages: ["Open", "Assigned", "In review", "Findings ready", "Closed"],
    statCards: [
      { label: "Active cases", value: 14 },
      { label: "Awaiting assignment", value: 3 },
      { label: "Due this week", value: 4 },
      { label: "Overdue", value: 1 },
    ],
    columns: ["Organization", "Credential", "Assessor", "Stage", "Due date", ""],
    rows: [
      { Organization: "Sunrise Commons", Credential: "Teal Certified", Assessor: "Maya Hernandez", Stage: "In review", "Due date": "Jun 24" },
      { Organization: "Kinship Works LLC", Credential: "Teal Verified", Assessor: "Dr. James Tao", Stage: "Findings ready", "Due date": "Jun 19" },
      { Organization: "Mesa Verde Coliving", Credential: "Teal Verified", Assessor: "Unassigned", Stage: "Open", "Due date": "Jun 30" },
      { Organization: "Bright Path Training", Credential: "Accredited Training", Assessor: "Sofia Ruiz", Stage: "Assigned", "Due date": "Jul 5" },
    ],
  },
  decisions: {
    title: "Decisions",
    description: "Approval, denial, public rationale, badge issuance, renewal windows, and audit trail.",
    stages: ["Pending", "Approved", "Issued", "Published", "Renewal scheduled"],
    statCards: [
      { label: "Decisions pending", value: 5 },
      { label: "Approved this month", value: 8 },
      { label: "Issued badges", value: 6 },
      { label: "Renewals due 30d", value: 3 },
    ],
    columns: ["Organization", "Credential", "Decision", "Decided", "Badge ID", ""],
    rows: [
      { Organization: "Buurtzorg Nederland", Credential: "Teal Certified", Decision: "Approved", Decided: "2025-06-01", "Badge ID": "TR-CERT-NL-001" },
      { Organization: "Kinship Works LLC", Credential: "Teal Verified", Decision: "Pending", Decided: "—", "Badge ID": "—" },
      { Organization: "Sunrise Commons", Credential: "Teal Certified", Decision: "Pending", Decided: "—", "Badge ID": "—" },
      { Organization: "Earthaven Ecovillage", Credential: "Teal Aligned", Decision: "Approved", Decided: "2025-05-15", "Badge ID": "TR-AL-US-002" },
    ],
  },
  badges: {
    title: "Badges",
    description: "Issued badges, active credentials, renewal tracking, and enforcement history.",
    stages: ["Active", "Expiring soon", "Expired", "Revoked", "Under review"],
    statCards: [
      { label: "Active badges", value: 23 },
      { label: "Expiring in 30d", value: 4 },
      { label: "Expired", value: 2 },
      { label: "Under review", value: 1 },
    ],
    columns: ["Organization", "Badge", "Badge ID", "Valid to", "Status", ""],
    rows: [
      { Organization: "Buurtzorg Nederland", Badge: "Teal Certified", "Badge ID": "TR-CERT-NL-001", "Valid to": "2026-06-01", Status: "Active" },
      { Organization: "Patagonia Inc.", Badge: "Teal Verified", "Badge ID": "TR-VER-US-001", "Valid to": "2025-12-31", Status: "Active" },
      { Organization: "Findhorn Foundation", Badge: "Teal Certified", "Badge ID": "TR-CERT-UK-001", "Valid to": "2025-07-15", Status: "Expiring soon" },
      { Organization: "Teal Around the World", Badge: "Teal Aligned", "Badge ID": "TR-AL-GLOBAL-001", "Valid to": "2025-06-30", Status: "Expiring soon" },
    ],
  },
  reports: {
    title: "Misuse Reports",
    description: "Concern intake, triage, investigation, enforcement action, appeal, and closure.",
    stages: ["Received", "Triage", "Investigation", "Action proposed", "Closed"],
    statCards: [
      { label: "Open reports", value: 4 },
      { label: "In triage", value: 2 },
      { label: "Under investigation", value: 1 },
      { label: "Closed this month", value: 7 },
    ],
    columns: ["Reporter", "Subject", "Severity", "Stage", "Received", ""],
    rows: [
      { Reporter: "Anonymous", Subject: "Sunrise Commons — expired badge still displayed", Severity: "High", Stage: "Investigation", Received: "Jun 12" },
      { Reporter: "Community member", Subject: "Unrecognized org using Teal Certified claim", Severity: "Critical", Stage: "Triage", Received: "Jun 15" },
      { Reporter: "Anonymous", Subject: "Badge ID mismatch on LinkedIn profile", Severity: "Medium", Stage: "Received", Received: "Jun 16" },
    ],
  },
  assessors: {
    title: "Assessors",
    description: "Reviewer roster, qualification levels, COI declarations, active assignments, and capacity.",
    stages: ["Active", "On leave", "Training", "Suspended", "Inactive"],
    statCards: [
      { label: "Active assessors", value: 12 },
      { label: "Available now", value: 7 },
      { label: "Active assignments", value: 14 },
      { label: "Avg days per case", value: 18 },
    ],
    columns: ["Assessor", "Specialty", "Cases active", "Cases completed", "Status", ""],
    rows: [
      { Assessor: "Maya Hernandez", Specialty: "Self-management, cooperatives", "Cases active": "3", "Cases completed": "24", Status: "Active" },
      { Assessor: "Dr. James Tao", Specialty: "Governance, systems design", "Cases active": "2", "Cases completed": "31", Status: "Active" },
      { Assessor: "Sofia Ruiz", Specialty: "Training providers, curriculum", "Cases active": "1", "Cases completed": "17", Status: "Active" },
      { Assessor: "Pema Dorji", Specialty: "Intentional communities", "Cases active": "0", "Cases completed": "8", Status: "On leave" },
    ],
  },
  renewals: {
    title: "Renewals",
    description: "Renewal scheduling, evidence submission tracking, and expiry management.",
    stages: ["Upcoming", "Evidence requested", "Under review", "Renewed", "Lapsed"],
    statCards: [
      { label: "Due in 30 days", value: 4 },
      { label: "Due in 60 days", value: 7 },
      { label: "Evidence submitted", value: 3 },
      { label: "Lapsed this year", value: 1 },
    ],
    columns: ["Organization", "Credential", "Expiry date", "Evidence", "Stage", ""],
    rows: [
      { Organization: "Findhorn Foundation", Credential: "Teal Certified", "Expiry date": "Jul 15, 2025", Evidence: "Submitted", Stage: "Under review" },
      { Organization: "Teal Around the World", Credential: "Teal Aligned", "Expiry date": "Jun 30, 2025", Evidence: "Not submitted", Stage: "Upcoming" },
      { Organization: "Buurtzorg Nederland", Credential: "Teal Certified", "Expiry date": "Jun 01, 2026", Evidence: "N/A", Stage: "Upcoming" },
    ],
  },
  listings: {
    title: "Directory Listings",
    description: "Research profiles, claimed listings, featured placement, and quality review queue.",
    stages: ["Published", "Draft", "In review", "Claimed", "Featured"],
    statCards: [
      { label: "Total listings", value: 87 },
      { label: "Published", value: 64 },
      { label: "Unclaimed", value: 41 },
      { label: "In quality review", value: 8 },
    ],
    columns: ["Organization", "Type", "Country", "Listing type", "Claimed", ""],
    rows: [
      { Organization: "Buurtzorg Nederland", Type: "Organization", Country: "Netherlands", "Listing type": "Public research profile", Claimed: "No" },
      { Organization: "Patagonia Inc.", Type: "Organization", Country: "USA", "Listing type": "Public research profile", Claimed: "No" },
      { Organization: "Findhorn Foundation", Type: "Organization", Country: "UK", "Listing type": "Public research profile", Claimed: "No" },
      { Organization: "Morning Star Company", Type: "Organization", Country: "USA", "Listing type": "Public research profile", Claimed: "No" },
    ],
  },
};

const chipStyles: Record<string, { bg: string; color: string }> = {
  Draft: { bg: "#f3f4f6", color: "#6b7280" },
  Submitted: { bg: "#dbeafe", color: "#1e40af" },
  Screening: { bg: "#ede9fe", color: "#5b21b6" },
  "Evidence review": { bg: "#fef3c7", color: "#92400e" },
  "Decision pending": { bg: "#fed7aa", color: "#9a3412" },
  Open: { bg: "#dbeafe", color: "#1e40af" },
  Assigned: { bg: "#ede9fe", color: "#5b21b6" },
  "In review": { bg: "#fef3c7", color: "#92400e" },
  "Findings ready": { bg: "#fed7aa", color: "#9a3412" },
  Closed: { bg: "#d1fae5", color: "#065f46" },
  Approved: { bg: "#d1fae5", color: "#065f46" },
  Pending: { bg: "#fef3c7", color: "#92400e" },
  Active: { bg: "#d1fae5", color: "#065f46" },
  "Expiring soon": { bg: "#fef3c7", color: "#92400e" },
  Expired: { bg: "#fee2e2", color: "#991b1b" },
  Revoked: { bg: "#fee2e2", color: "#991b1b" },
  "Under review": { bg: "#dbeafe", color: "#1e40af" },
  Received: { bg: "#dbeafe", color: "#1e40af" },
  Triage: { bg: "#ede9fe", color: "#5b21b6" },
  Investigation: { bg: "#fef3c7", color: "#92400e" },
  "Action proposed": { bg: "#fed7aa", color: "#9a3412" },
  "On leave": { bg: "#f3f4f6", color: "#6b7280" },
  Upcoming: { bg: "#dbeafe", color: "#1e40af" },
  "Not submitted": { bg: "#fef3c7", color: "#92400e" },
  "N/A": { bg: "#f3f4f6", color: "#6b7280" },
  High: { bg: "#fef3c7", color: "#92400e" },
  Critical: { bg: "#fee2e2", color: "#991b1b" },
  Medium: { bg: "#dbeafe", color: "#1e40af" },
  Low: { bg: "#f3f4f6", color: "#6b7280" },
};

const STATUS_COLS = new Set(["Stage", "Status", "Decision", "Severity", "Evidence", "Claimed"]);

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { workflow } = await params;
  const config = workflowConfigs[workflow];
  if (!config) return { title: "Not Found | Teal Registry" };
  return { title: `${config.title} | Admin | Teal Registry` };
}

export function generateStaticParams() {
  return Object.keys(workflowConfigs).map((workflow) => ({ workflow }));
}

export default async function AdminWorkflowPage({ params }: WorkflowPageProps) {
  const { workflow } = await params;
  const config = workflowConfigs[workflow];

  if (!config) notFound();

  return (
    <div className="portal-page">
      <PortalSidebar role="admin" />
      <main className="portal-main">
        <header className="portal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/admin" style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", textDecoration: "none" }}>
              <ArrowLeft size={14} />
              Admin
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.75rem", marginBottom: "0.125rem" }}>
                {config.title}
              </h1>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{config.description}</p>
            </div>
          </div>
          <button className="btn btn-primary" style={{ fontSize: "0.875rem" }}>
            New entry
          </button>
        </header>

        {/* Stage filter strip */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {["All", ...config.stages].map((stage, i) => (
            <button key={stage} style={{
              padding: "0.375rem 1rem",
              borderRadius: "9999px",
              border: i === 0 ? "none" : "1px solid var(--border)",
              background: i === 0 ? "var(--teal)" : "var(--surface)",
              color: i === 0 ? "white" : "var(--ink)",
              fontSize: "0.875rem",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}>
              {stage}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: "2rem" }}>
          {config.statCards.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {config.columns.map((col, i) => (
                  <th key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {config.rows.map((row, i) => (
                <tr key={i}>
                  {config.columns.map((col, j) => {
                    if (col === "") {
                      return (
                        <td key={j}>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "0.25rem" }}>
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      );
                    }
                    const value = row[col] ?? "—";
                    const chip = chipStyles[value];
                    if (STATUS_COLS.has(col) && chip) {
                      return (
                        <td key={j}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.2rem 0.625rem", borderRadius: "9999px", background: chip.bg, color: chip.color }}>
                            {value}
                          </span>
                        </td>
                      );
                    }
                    return (
                      <td key={j} style={{ fontWeight: j === 0 ? 600 : 400, color: j > 0 ? "var(--muted)" : "var(--ink)", fontSize: j > 0 ? "0.875rem" : "inherit" }}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
