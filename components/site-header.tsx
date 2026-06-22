"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const navLinks = [
  { label: "Directory", href: "/registry" },
  { label: "Credentials", href: "/credentials" },
  { label: "Standards", href: "/standards" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Brand */}
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image
            src="/assets/tealregistry-lockup.png"
            alt="Teal Registry"
            width={180}
            height={44}
            className="brand-img"
            priority
            style={{ height: "38px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Primary Nav */}
        <nav
          className={`nav-primary${open ? " open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`nav-link${pathname?.startsWith(r.href) ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {r.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link href="/verify" className="ghost-button btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <ShieldCheck size={15} />
            Verify
          </Link>
          <Link href="/portal" className="ghost-button btn-sm">
            Login
          </Link>
          <Link href="/apply" className="solid-button btn-sm">
            Apply Now
          </Link>
          <button
            className="nav-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
