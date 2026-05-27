import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";

const workflowPages = {
  applications: {
    title: "Applications",
    intro: "Manage applicant intake, pathway fit, readiness screening, missing information, and submission status.",
    columns: ["Applicant", "Requested badge", "Status", "Next action"],
    rows: [
      ["Riverbend Commons", "Teal Aligned", "Screening", "Confirm public scope"],
      ["Northstar Implementation Team", "Accredited Implementation", "Evidence review", "Assign assessor"],
      ["Framework partner", "Recognized Framework", "Submitted", "Check mapping evidence"],
    ],
  },
  cases: {
    title: "Cases",
    intro: "Coordinate assigned reviewers, timelines, conflict checks, interviews, findings, and closure.",
    columns: ["Case", "Assessor", "Stage", "Decision target"],
    rows: [
      ["Implementation accreditation", "M. Alvarez", "In review", "June 15"],
      ["Aligned listing check", "Registry staff", "Screening", "June 2"],
      ["Framework recognition", "A. Chen", "Findings", "June 21"],
    ],
  },
  "evidence-review": {
    title: "Evidence review",
    intro: "Review documents, interviews, examples, and public-safe summaries against the relevant criteria.",
    columns: ["Evidence", "Criterion", "Review status", "Public safe"],
    rows: [
      ["Decision log", "Shared power", "Accepted", "Yes"],
      ["Training curriculum", "Provider boundary", "Clarification", "Partial"],
      ["Interview notes", "Whole-human practice", "Internal", "No"],
    ],
  },
  decisions: {
    title: "Decisions",
    intro: "Prepare decision packets, public rationale, approval status, denial notes, and appeal readiness.",
    columns: ["Decision", "Level", "Body", "Public rationale"],
    rows: [
      ["Approve listing", "Teal Aligned", "Registry operations", "Commitment is public"],
      ["Hold accreditation", "Implementation", "Review panel", "More delivery evidence needed"],
      ["Issue verification", "Teal Verified", "Assessor panel", "Evidence supports stated scope"],
    ],
  },
  "badge-issuance": {
    title: "Badge issuance",
    intro: "Issue active badge IDs, verification URLs, QR targets, renewal dates, and public profile updates.",
    columns: ["Badge ID", "Holder", "Status", "Verify URL"],
    rows: [
      ["TR-AL-0001", "Riverbend Commons", "Active", "/verify/TR-AL-0001"],
      ["Pending", "Northstar Implementation Team", "In review", "Not issued"],
      ["TR-FR-0003", "Practice Framework", "Draft", "Pending decision"],
    ],
  },
  revocation: {
    title: "Revocation",
    intro: "Handle suspensions, revocations, corrective actions, public notes, and historical record preservation.",
    columns: ["Badge", "Reason", "Action", "Public note"],
    rows: [
      ["TR-AL-0001", "Scope concern", "Review", "No change yet"],
      ["TR-TR-0021", "Expired training claim", "Correction", "Updated language required"],
      ["TR-AC-0007", "Misuse report", "Investigate", "Notice pending"],
    ],
  },
  renewal: {
    title: "Renewal",
    intro: "Track review windows, expiring badges, renewal evidence, reminder schedules, and updated decisions.",
    columns: ["Holder", "Badge", "Renewal window", "Next step"],
    rows: [
      ["Riverbend Commons", "Teal Aligned", "Open", "Confirm commitment"],
      ["Provider cohort", "Training accreditation", "60 days", "Submit learner records"],
      ["Advanced holder", "Certified Advanced", "90 days", "Schedule interviews"],
    ],
  },
  "misuse-reports": {
    title: "Misuse reports",
    intro: "Triage concerns, investigate evidence, decide actions, publish notices, and manage appeals.",
    columns: ["Report", "Severity", "Status", "Action"],
    rows: [
      ["Logo used without link", "Medium", "Triage", "Request correction"],
      ["Expired badge claim", "High", "Investigation", "Collect evidence"],
      ["Wrong scope on proposal", "Medium", "Action proposed", "Public clarification"],
    ],
  },
};

type WorkflowSlug = keyof typeof workflowPages;

type AdminWorkflowPageProps = {
  params: Promise<{ workflow: string }>;
};

export function generateStaticParams() {
  return Object.keys(workflowPages).map((workflow) => ({ workflow }));
}

export default async function AdminWorkflowPage({ params }: AdminWorkflowPageProps) {
  const { workflow } = await params;
  const page = workflowPages[workflow as WorkflowSlug];

  if (!page) {
    notFound();
  }

  return (
    <PageShell title={page.title} intro={page.intro} actions={[{ href: "/admin", label: "Back to admin" }]}>
      <section className="content-section">
        <div className="ops-table">
          <div className="ops-row ops-head">
            {page.columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>
          {page.rows.map((row) => (
            <div className="ops-row" key={row.join("-")}>
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
