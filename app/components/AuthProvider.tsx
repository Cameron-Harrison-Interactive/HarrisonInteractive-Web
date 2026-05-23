/* --- START OF FILE app/components/AuthProvider.tsx --- */

"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | CLIENT BIOMETRIC PROVIDER
 * =========================================================================
 * Wraps the Dashboard Matrix in the NextAuth Session Provider.
 * This allows any client-side component (like our Sidebar and Overview) to 
 * securely access the user's decrypted credentials (Name, Email, Avatar) 
 * instantly without taxing the Edge server.
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

/* --- END OF FILE app/components/AuthProvider.tsx --- */