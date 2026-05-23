/* --- START OF FILE next.config.ts --- */

import type { NextConfig } from "next";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXT.JS COMPILER OVERRIDE
 * =========================================================================
 */
const nextConfig: NextConfig = {
  // SILENCE NEXT.JS 16 TURBOPACK STRICT ENFORCEMENT:
  // Tells the compiler to allow our custom Webpack fallback below.
  turbopack: {},

  // CRITICAL CLOUDFLARE EDGE FIX:
  // Intercepts the Webpack compiler during the build phase to prevent
  // the "Module not found: async_hooks" crash when deploying to Pages.
  webpack: (config, { nextRuntime }) => {
    if (nextRuntime === "edge") {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false, 
      };
    }
    return config;
  },
};

export default nextConfig;

/* --- END OF FILE next.config.ts --- */