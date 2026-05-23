/* --- START OF FILE app/api/auth/[...nextauth]/route.ts --- */

import { handlers } from "@/auth";

// =========================================================================
// CRITICAL CLOUDFLARE DIRECTIVE:
// Forces the V8 Edge Network compilation for the Auth Matrix.
// =========================================================================
export const runtime = "edge";

// =========================================================================
// PROPER TS DESTRUCTURING:
// Extracts the specific GET and POST functions from the NextAuth engine
// =========================================================================
export const { GET, POST } = handlers;

/* --- END OF FILE app/api/auth/[...nextauth]/route.ts --- */