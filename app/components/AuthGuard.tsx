/* --- START OF FILE app/components/AuthGuard.tsx --- */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | CLIENT-SIDE AUTH SHIELD
 * =========================================================================
 * By moving the Auth check to the client, we completely eradicate `async_hooks`
 * and server-side bloat. The Dashboard compiles to static HTML, and the browser
 * handles the security gatekeeping natively.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ping the NextAuth session endpoint natively
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((session) => {
        // If the session object has keys, the user possesses a valid 256-bit token
        if (session && Object.keys(session).length > 0) {
          setIsAuthorized(true);
        } else {
          // Unauthenticated breach detected, deflect to gateway
          router.push("/login");
        }
      })
      .catch((error) => {
        console.error("[SEC] Auth ping failed. Deflecting to gateway.", error);
        router.push("/login");
      });
  }, [router]);

  // JARVIS Loading Matrix while verifying the encrypted token
  if (isAuthorized === null) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#010409] relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <div className="w-24 h-24 border-4 border-[#00BFFF]/20 border-t-[#00BFFF] rounded-full animate-spin relative z-10 shadow-[0_0_15px_rgba(0,191,255,0.5)]"></div>
        <p className="font-orbitron text-[#00BFFF] text-sm tracking-[0.3em] uppercase mt-8 animate-pulse relative z-10">
          [ AUTHENTICATING BIOMETRICS ]
        </p>
      </div>
    );
  }

  // If authorized, render the Dashboard
  return <>{children}</>;
}

/* --- END OF FILE app/components/AuthGuard.tsx --- */