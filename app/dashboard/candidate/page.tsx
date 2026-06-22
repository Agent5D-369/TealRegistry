import Link from "next/link";
import {
  FileText, Upload, MessageSquare, ShieldCheck, Bell,
  Clock, CheckCircle2, AlertCircle, ArrowRight, Plus,
} from "lucide-react";
import { PortalSidebar } from "@/components/portal-sidebar";

export default function CandidateDashboardPage() {
  // Static demo data — replaced by real DB queries once auth + DB are connected
  const applicationStatus = "Evidence review";
  const steps = [
    { label: "Application submitted", done: true, date: "Apr 12, 2026" },
    { label: "Readiness screening", done: true, date: "Apr 18, 2026" },
    { label: "Evidence package received", done: true, date: "May 2, 2026" },
    { label: "Assessor assigned", done: true, date: "May 10, 2026" },
    { label: "Evidence review in progress", done: false, active: true },
    { label: "Interview (if required)", done: false },
    { label: "Decision issued", done: false },
    { label: "Badge issued", done: false },
  ];

  const evidenceItems = [
    { name: "Organizational governance charter", status: "Accepted", date: "May 2, 2026" },
    { name: "Decision-making process documentation", status: "Accepted", date: "May 2, 2026" },
    { name: "Stakeholder wellbeing survey (2025)", status: "Needs clarification", date: "May 14, 2026" },
    { name: "Purpose statement + annual report", status: "Under review", date: "May 2, 2026" },
  ];

  const messages = [
    { from: "Assessment Team", date: "May 14, 2026", preview: "Regarding your stakeholder survey — could you clarify the sample size and methodology used?" },
    { from: "Assessment Team", date: "May 10, 2026", preview: "Your assessor has been assigned. Expect contact within 5 business days to confirm scope." },
  ];

  return (
    <div className="portal-page">
      <PortalSidebar role="candidate" />

      <main className="portal-main">
        <div className="portal-header">
          <h1>My certification</h1>
          <p>Track your application, respond to reviewer questions, and manage your evidence package.</p>
        </div>

        {/* Status tracker */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <p style={{ font: "0.75rem/1 var(--font-body)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "0.375rem" }}>Current status</p>
              <span className="chip chip-teal" style={{ fontSize: "0.9rem" }}>{applicationStatus}</span>
            </div>
            <Link href="/apply" className="btn btn-primary btn-sm">
              <Plus size={14} />
              New application
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            {/* Progress line */}
            <div style={{ position: "absolute", left: "9px", top: "8px", bottom: "8px", width: "2px", background: "var(--border)", zIndex: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", paddingBlock: "0.625rem", position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                    background: step.done ? "var(--teal)" : step.active ? "var(--gold)" : "var(--border)",
                    border: step.active ? "3px solid var(--gold-light)" : "2px solid transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {step.done && <CheckCircle2 size={12} color="white" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: step.active ? 600 : step.done ? 400 : 400, color: step.active ? "var(--ink)" : step.done ? "var(--ink-mid)" : "var(--muted)", marginBottom: 0, maxWidth: "none" }}>
                      {step.label}
                    </p>
                    {step.date && <p style={{ fontSize: "0.8125rem", color: "var(--muted)", maxWidth: "none" }}>{step.date}</p>}
                  </div>
                  {step.active && <Clock size={15} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          {/* Evidence panel */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem" }}>Evidence package</h3>
              <button className="btn btn-ghost btn-sm">
                <Upload size={14} />
                Upload
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {evidenceItems.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", paddingBottom: "0.75rem", borderBottom: i < evidenceItems.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", flex: 1 }}>
                    <FileText size={15} style={{ color: "var(--muted)", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "var(--ink-mid)", marginBottom: "0.125rem", maxWidth: "none" }}>{item.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--muted)", maxWidth: "none" }}>{item.date}</p>
                    </div>
                  </div>
                  <span className={`chip ${
                    item.status === "Accepted" ? "chip-certified" :
                    item.status === "Needs clarification" ? "chip-review" :
                    "chip-muted"
                  }`} style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Messages panel */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem" }}>
                Messages
                <span style={{ marginLeft: "0.5rem", background: "var(--teal)", color: "white", fontSize: "0.6875rem", padding: "0.125rem 0.5rem", borderRadius: "999px", verticalAlign: "middle" }}>1 new</span>
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ paddingBottom: i < messages.length - 1 ? "0.75rem" : 0, borderBottom: i < messages.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ink)", maxWidth: "none" }}>{msg.from}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", maxWidth: "none" }}>{msg.date}</p>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.5, maxWidth: "none" }}>{msg.preview}</p>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: "0.5rem" }}>
                    <MessageSquare size={13} />
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action cards */}
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.125rem", marginBottom: "1rem" }}>Quick actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {[
            { icon: <Upload size={20} />, title: "Add evidence", desc: "Upload new documents or links to your review package.", href: "#" },
            { icon: <MessageSquare size={20} />, title: "Reply to assessor", desc: "Respond to open questions from the review team.", href: "#", alert: true },
            { icon: <ShieldCheck size={20} />, title: "Review scope", desc: "Confirm or adjust what is being assessed in this application.", href: "#" },
            { icon: <Bell size={20} />, title: "Notification settings", desc: "Control how and when you receive updates about your application.", href: "#" },
          ].map((card, i) => (
            <Link key={i} href={card.href} style={{ textDecoration: "none" }}>
              <div className="work-card" style={{ height: "100%" }}>
                <div className="work-card-icon" style={card.alert ? { background: "var(--gold-xlight)", color: "var(--gold)" } : {}}>
                  {card.icon}
                  {card.alert && <AlertCircle size={10} style={{ position: "absolute", top: -2, right: -2, color: "var(--gold)", background: "white", borderRadius: "50%" }} />}
                </div>
                <div className="work-card-body">
                  <p className="work-card-title">{card.title}</p>
                  <p className="work-card-meta">{card.desc}</p>
                </div>
                <ArrowRight size={16} style={{ color: "var(--muted)", flexShrink: 0, marginTop: "2px" }} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
