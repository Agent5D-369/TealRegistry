import Link from "next/link";
import { ShieldCheck, FileText, Upload, MessageSquare, Settings, LogOut, Users, ClipboardList, BarChart2, AlertTriangle, Layers, Star } from "lucide-react";

type Role = "candidate" | "assessor" | "organization" | "admin";

const navItems: Record<Role, Array<{ label: string; href: string; icon: React.ReactNode; group?: string }>> = {
  candidate: [
    { group: "My Certification", label: "Application status", href: "/dashboard/candidate", icon: <FileText size={16} /> },
    { label: "Evidence package", href: "/dashboard/candidate/evidence", icon: <Upload size={16} /> },
    { label: "Messages", href: "/dashboard/candidate/messages", icon: <MessageSquare size={16} /> },
    { label: "My badges", href: "/dashboard/candidate/badges", icon: <ShieldCheck size={16} /> },
    { group: "Account", label: "Settings", href: "/dashboard/candidate/settings", icon: <Settings size={16} /> },
  ],
  assessor: [
    { group: "My Cases", label: "Active cases", href: "/dashboard/assessor", icon: <ClipboardList size={16} /> },
    { label: "Completed reviews", href: "/dashboard/assessor/completed", icon: <FileText size={16} /> },
    { label: "COI declarations", href: "/dashboard/assessor/coi", icon: <AlertTriangle size={16} /> },
    { group: "Tools", label: "Assessment templates", href: "/dashboard/assessor/templates", icon: <Layers size={16} /> },
    { label: "Messages", href: "/dashboard/assessor/messages", icon: <MessageSquare size={16} /> },
    { group: "Account", label: "Settings", href: "/dashboard/assessor/settings", icon: <Settings size={16} /> },
  ],
  organization: [
    { group: "My Organization", label: "Listing", href: "/dashboard/organization", icon: <Star size={16} /> },
    { label: "Team members", href: "/dashboard/organization/team", icon: <Users size={16} /> },
    { label: "Applications", href: "/dashboard/organization/applications", icon: <FileText size={16} /> },
    { label: "Badges", href: "/dashboard/organization/badges", icon: <ShieldCheck size={16} /> },
    { group: "Account", label: "Settings", href: "/dashboard/organization/settings", icon: <Settings size={16} /> },
  ],
  admin: [
    { group: "Operations", label: "Dashboard", href: "/admin", icon: <BarChart2 size={16} /> },
    { label: "Applications queue", href: "/admin/applications", icon: <ClipboardList size={16} /> },
    { label: "Active cases", href: "/admin/cases", icon: <FileText size={16} /> },
    { label: "Decisions", href: "/admin/decisions", icon: <ShieldCheck size={16} /> },
    { label: "Misuse reports", href: "/admin/reports", icon: <AlertTriangle size={16} /> },
    { group: "Directory", label: "Listings", href: "/admin/listings", icon: <Layers size={16} /> },
    { label: "AI listing builder", href: "/admin/listing-builder", icon: <Star size={16} /> },
    { group: "People", label: "Users", href: "/admin/users", icon: <Users size={16} /> },
    { label: "Assessors", href: "/admin/assessors", icon: <ClipboardList size={16} /> },
    { group: "Account", label: "Settings", href: "/admin/settings", icon: <Settings size={16} /> },
  ],
};

const roleTitles: Record<Role, string> = {
  candidate: "Candidate portal",
  assessor: "Assessor portal",
  organization: "Organization portal",
  admin: "Admin portal",
};

export function PortalSidebar({ role }: { role: Role }) {
  const items = navItems[role];

  return (
    <nav className="portal-sidebar">
      {/* Brand */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.75rem 1rem", textDecoration: "none", marginBottom: "0.25rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <ShieldCheck size={20} style={{ color: "var(--gold)" }} />
        <span style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 500 }}>
          Teal Registry
        </span>
      </Link>
      <p style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.4)", paddingInline: "0.75rem", paddingBottom: "0.75rem", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {roleTitles[role]}
      </p>

      {/* Nav items */}
      {items.map((item, i) => (
        item.group ? (
          <div key={i}>
            {i > 0 && <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0.5rem 0.75rem" }} />}
            <p className="portal-sidebar-label">{item.group}</p>
            <Link href={item.href} className="portal-nav-link">
              {item.icon}
              {item.label}
            </Link>
          </div>
        ) : (
          <Link key={i} href={item.href} className="portal-nav-link">
            {item.icon}
            {item.label}
          </Link>
        )
      ))}

      {/* Sign out */}
      <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/api/auth/signout" className="portal-nav-link" style={{ color: "rgba(255,255,255,0.5)" }}>
          <LogOut size={16} />
          Sign out
        </Link>
      </div>
    </nav>
  );
}
