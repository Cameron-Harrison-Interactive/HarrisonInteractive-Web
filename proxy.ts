/* --- START OF FILE middleware.ts --- */

import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | SECURE EDGE MIDDLEWARE
 * =========================================================================
 * This acts as the global shield generator for the Matrix.
 * It intercepts every incoming request BEFORE it hits the server.
 * If an unauthenticated entity attempts to breach the /dashboard,
 * they are forcefully redirected to the Auth Gateway (/login).
 */

export default auth((req) => {
  // Extract the authentication token from the request
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // MATRIX ROUTING LOGIC:
  // 1. If trying to access the restricted Dashboard without authorization...
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    console.log(`[SEC] Breach attempt detected at ${pathname}. Rerouting to gateway.`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. If already logged in, but trying to access the login page...
  if (pathname === "/login" && isLoggedIn) {
    console.log(`[SEC] Authenticated user at gateway. Passing to Matrix.`);
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. All other requests (public homepage, API routes) pass through safely.
  return NextResponse.next();
});

// =========================================================================
// MATCHER CONFIGURATION
// Defines exactly which routes trigger this middleware shield.
// =========================================================================
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - handled by NextAuth internally)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

/* --- END OF FILE middleware.ts --- */