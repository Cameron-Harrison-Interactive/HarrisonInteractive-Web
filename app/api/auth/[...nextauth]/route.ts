/* --- START OF FILE app/api/auth/[...nextauth]/route.ts --- */

import { handlers } from "@/auth";

// =========================================================================
// CLOUDFLARE EDGE DIRECTIVE
// =========================================================================
export const runtime = "edge";

// =========================================================================
// NEXTAUTH HANDLERS
// =========================================================================
export const { GET, POST } = handlers;

/* --- END OF FILE app/api/auth/[...nextauth]/route.ts --- */
