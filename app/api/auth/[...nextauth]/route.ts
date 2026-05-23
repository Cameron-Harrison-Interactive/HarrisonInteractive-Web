/* --- START OF FILE app/api/auth/[...nextauth]/route.ts --- */

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXTAUTH V5 API HANDLER
 * =========================================================================
 * This file creates the live API endpoints for NextAuth.
 * It catches all traffic directed to /api/auth/* (e.g., sign-in, sign-out,
 * OAuth callbacks) and funnels it into our central auth.ts configuration.
 */

// We simply re-export the handlers from our master configuration file.
export { handlers as GET, handlers as POST } from "@/auth";

/* --- END OF FILE app/api/auth/[...nextauth]/route.ts --- */