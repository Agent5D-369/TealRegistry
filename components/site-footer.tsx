import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

const footerLinks = {
  Directory: [
    { label: "Browse All Listings", href: "/registry" },
    { label: "Businesses", href: "/registry?type=business" },
    { label: "Communities", href: "/registry?type=community" },
    { label: "Training Providers", href: "/registry?type=training" },
    { label: "Frameworks", href: "/registry?type=framework" },
  ],
  Certification: [
    { label: "Credential Levels", href: "/credentials" },
    { label: "Our Standards", href: "/standards" },
    { label: "Apply Now", href: "/apply" },
    { label: "Verify a Badge", href: "/verify" },
    { label: "Claim Your Listing", href: "/claim" },
  ],
  Platform: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Assessors", href: "/portal/assessor" },
    { label: "API Access", href: "/api-docs" },
    { label: "Report Misuse", href: "/report" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="brand" style={{ marginBottom: "0.875rem", display: "inline-flex" }}>
              <Image
                src="/assets/tealregistry-lockup.png"
                alt="Teal Registry"
                width={160}
                height={40}
                style={{ height: "32px", width: "auto", opacity: 0.85 }}
              />
            </Link>
            <p className="footer-tagline">
              The independent certification authority for regenerative organizations.
            </p>
            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>
              <ShieldCheck size={14} style={{ color: "var(--gold)" }} />
              Verification is independent of training &amp; consulting
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer-col">
              <h5>{group}</h5>
              <div className="footer-links">
                {links.map((l) => (
                  <Link key={l.href} href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Teal Registry. All rights reserved.</p>
          <div className="flex-gap">
            <Link href="/privacy" className="footer-link">Privacy</Link>
            <Link href="/terms" className="footer-link">Terms</Link>
            <Link href="/cookie-policy" className="footer-link">Cookies</Link>
            <Link href="/report" className="footer-link">Report Misuse</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
