import Image from "next/image";
import Link from "next/link";
import { portalRoutes, publicRoutes } from "@/data/platform";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Teal Registry home">
        <Image
          src="/assets/tealregistry-lockup.png"
          alt="Teal Registry"
          width={961}
          height={381}
          priority
        />
      </Link>
      <nav aria-label="Primary navigation">
        {publicRoutes.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="ghost-button" href={portalRoutes[0].href}>
          Login
        </Link>
        <Link className="solid-button" href="/registry">
          Verify
        </Link>
      </div>
    </header>
  );
}
