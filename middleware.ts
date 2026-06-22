/**
 * Route protection middleware
 * - /dashboard/* and /admin/* require authentication
 * - /admin/* additionally requires ADMIN or SUPER_ADMIN role
 * - All other routes are public
 */

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Portal routes require login
  const isPortal = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  if (isPortal && !req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Admin routes require ADMIN or SUPER_ADMIN role
  const isAdmin = pathname.startsWith("/admin");
  const role = (req.auth?.user as { role?: string } | undefined)?.role ?? "PUBLIC";
  if (isAdmin && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/candidate", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
