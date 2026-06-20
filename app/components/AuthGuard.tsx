/* --- START OF FILE app/components/AuthGuard.tsx --- */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | CLIENT-SIDE AUTH SHIELD
 * =========================================================================
 * Protects restricted routes while allowing explicitly public dashboard routes.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard/vote") {
      setIsAuthorized(true);
      return;
    }

    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((session) => {
        if (session && Object.keys(session).length > 0) {
          setIsAuthorized(true);
        } else {
          router.push("/login");
        }
      })
      .catch((error) => {
        console.error("[SEC] Auth ping failed. Deflecting to gateway.", error);
        router.push("/login");
      });
  }, [pathname, router]);

  // H.E.L.E.N.A. Loading Matrix
  if (isAuthorized === null) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#010409] relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />
        <div className="w-28 h-28 border-4 border-[#00BFFF]/20 border-t-[#00BFFF] rounded-full animate-spin relative z-10 shadow-[0_0_20px_rgba(0,191,255,0.4)]" />
        <p className="font-orbitron text-[#00BFFF] text-base tracking-[0.3em] uppercase mt-10 animate-pulse relative z-10">
          [ AUTHENTICATING BIOMETRICS ]
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

/* --- END OF FILE app/components/AuthGuard.tsx --- */
