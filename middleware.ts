/* --- START OF FILE middleware.ts --- */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | ULTRA-LIGHTWEIGHT SHIELD
 * =========================================================================
 * Notice: We DO NOT explicitly declare `runtime = "edge"` here. 
 * Next.js Middleware is natively Edge-first. Adding the directive causes 
 * Next.js 16 to crash during the build phase.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Lightweight check for the NextAuth cookie (works in dev and production)
  // Production cookies are prefixed with __Secure- so we use .some() and .includes()
  const isAuthenticated = req.cookies.getAll().some(c => c.name.includes("authjs.session-token"));

  // 1. If trying to access the restricted Dashboard without authorization...
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    console.log(`[SEC] Breach attempt detected at ${pathname}. Rerouting to gateway.`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. If already logged in, but trying to access the login page...
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. All other requests pass through safely.
  return NextResponse.next();
}

// =========================================================================
// MATCHER CONFIGURATION
// =========================================================================
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

/* --- END OF FILE middleware.ts --- */