import Image from "next/image";
import Link from "next/link";
import { publicRoutes } from "@/data/platform";

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-statement">
        <h2>Trust is easier to protect when the claim is clear.</h2>
        <p>
          Teal Registry publishes plain-language standards, public records, and sourced proof pages
          for people deciding whether a Teal, regenerative, or self-organizing claim can be trusted.
        </p>
      </div>
      <div className="footer-base">
        <Link className="footer-brand" href="/" aria-label="Teal Registry home">
          <Image src="/assets/tealregistry-lockup.png" alt="Teal Registry" width={961} height={381} />
        </Link>
        <nav className="footer-links" aria-label="Footer navigation">
          {publicRoutes.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p>2026 Teal Registry. Public directory and credential verification.</p>
      </div>
    </footer>
  );
}
