/* --- START OF FILE app/components/AuthProvider.tsx --- */

"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | CLIENT BIOMETRIC PROVIDER
 * =========================================================================
 * Wraps the Dashboard Matrix in the NextAuth Session Provider.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

/* --- END OF FILE app/components/AuthProvider.tsx --- */
