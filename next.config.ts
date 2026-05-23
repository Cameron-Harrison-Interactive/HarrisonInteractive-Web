/* --- START OF FILE next.config.ts --- */

import type { NextConfig } from "next";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXT.JS COMPILER CONFIGURATION
 * =========================================================================
 * [ARCHITECT NOTE]: The Cloudflare V8 Engine has been upgraded to natively 
 * support 'async_hooks'. The legacy Webpack override has been purged to 
 * prevent Edge Engine compiler collisions.
 */
const nextConfig: NextConfig = {
  // SILENCE NEXT.JS 16 TURBOPACK STRICT ENFORCEMENT:
  // Tells the compiler that we are safely managing our own build pipeline.
  turbopack: {},
};

export default nextConfig;

/* --- END OF FILE next.config.ts --- */