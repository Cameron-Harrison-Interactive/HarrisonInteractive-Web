/* --- START OF FILE app/link/page.tsx --- */

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";

type HelenaLinkedUser = { tier?: string; email?: string; name?: string };

/**
 * =========================================================================
 * HARRISON INTERACTIVE | DEVICE UPLINK MATRIX
 * =========================================================================
 */
function DeviceLinkContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const returnTo = searchParams.get("returnTo") || "";

  const { data: session, status: sessionStatus } = useSession();
  const [authStatus, setAuthStatus] = useState<"IDLE" | "AUTHORIZING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMsg, setErrorMsg] = useState("");
  const linkedUser = (session?.user || {}) as HelenaLinkedUser;

  const safeReturnTo = () => {
    if (!returnTo) return "";
    try {
      const url = new URL(returnTo);
      // Only return to local H.E.L.E.N.A. companion origins or file URLs.
      if (["127.0.0.1", "localhost"].includes(url.hostname) || url.protocol === "file:") return returnTo;
    } catch (_err) {
      if (returnTo.startsWith("file://")) return returnTo;
    }
    return "";
  };

  const notifyHelenaHost = () => {
    const payload = { type: "HELENA_DEVICE_AUTH_SUCCESS", token, tier: linkedUser.tier || "LITE", email: linkedUser.email || "" };
    try { window.parent?.postMessage(payload, "*"); } catch (_err) {}
    try { window.opener?.postMessage(payload, "*"); } catch (_err) {}
  };

  const oauthUrl = (provider: "github" | "google") => {
    const callbackUrl = `/link?token=${encodeURIComponent(token || "")}${returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : ""}`;
    return `/api/oauth/${provider}?redirectTo=${encodeURIComponent(callbackUrl)}`;
  };

  const approveDevice = async (authToken: string, email: string) => {
    setAuthStatus("AUTHORIZING");
    try {
      const res = await fetch("/api/device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: authToken, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setAuthStatus("SUCCESS");
      } else {
        setAuthStatus("ERROR");
        setErrorMsg(data.error || "Handshake rejected by Edge Node.");
      }
    } catch {
      setAuthStatus("ERROR");
      setErrorMsg("Network disruption during secure uplink.");
    }
  };

  useEffect(() => {
    if (token && sessionStatus === "authenticated" && authStatus === "IDLE") {
      const timer = window.setTimeout(() => {
        void approveDevice(token, linkedUser.email || "");
      }, 0);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [token, sessionStatus, authStatus, linkedUser.email]);

  useEffect(() => {
    if (authStatus !== "SUCCESS") return undefined;
    notifyHelenaHost();
    const target = safeReturnTo();
    const timer = window.setTimeout(() => {
      if (target) {
        window.location.assign(target);
        return;
      }
      try { window.close(); } catch (_err) {}
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [authStatus]);

  if (!token) {
    return (
      <div className="relative z-10 w-full max-w-md glass-panel clip-angled p-10 border-t-4 border-[#DC143C] shadow-[0_0_30px_rgba(220,20,60,0.15)] flex flex-col items-center mx-4 text-center">
        <span className="text-5xl drop-shadow-[0_0_15px_rgba(220,20,60,0.8)] mb-4">⚠️</span>
        <h1 className="font-orbitron text-xl text-[#DC143C] font-bold tracking-[0.2em] uppercase mb-2">Invalid Uplink</h1>
        <p className="font-mono text-xs text-[#8B949E] leading-relaxed">No secure device token provided. Please initiate the link request from inside Unreal Engine.</p>
      </div>
    );
  }

  if (sessionStatus === "loading" || authStatus === "AUTHORIZING") {
    return (
      <div className="relative z-10 w-full max-w-md glass-panel clip-angled p-10 border-t-4 border-[#00BFFF] shadow-[0_0_30px_rgba(0,191,255,0.15)] flex flex-col items-center mx-4 text-center">
        <div className="w-16 h-16 border-4 border-[#00BFFF]/20 border-t-[#00BFFF] rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(0,191,255,0.3)]" />
        <h1 className="font-orbitron text-xl text-[#00BFFF] font-bold tracking-[0.2em] uppercase mb-2 animate-pulse">Securing Handshake</h1>
        <p className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">Validating Cryptographic Token...</p>
      </div>
    );
  }

  if (sessionStatus === "unauthenticated") {
    return (
      <div className="relative z-10 w-full max-w-md glass-panel clip-angled p-10 border-t-4 border-[#FFBF00] shadow-[0_0_30px_rgba(255,191,0,0.15)] flex flex-col items-center mx-4">
        <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,191,0,0.8)] mb-4">🔐</span>
        <h1 className="font-orbitron text-xl text-[#FFBF00] font-bold tracking-[0.2em] uppercase mb-2 text-center">Device Authorization</h1>
        <p className="font-mono text-xs text-[#8B949E] tracking-widest uppercase mb-8 text-center leading-relaxed">
          Unreal Engine is requesting an uplink. Please authenticate to approve the connection.
        </p>
        <div className="w-full flex flex-col gap-4">
          <a href={oauthUrl("github")} target="_top" className="w-full flex items-center justify-between p-4 border border-[#E6EDF3]/20 hover:border-[#E6EDF3]/80 bg-[#E6EDF3]/5 hover:bg-[#E6EDF3]/10 transition-all group clip-angled-button cursor-pointer">
            <span className="font-orbitron text-sm text-[#E6EDF3] tracking-widest uppercase font-bold">GitHub Uplink</span>
            <span className="font-mono text-xs text-[#E6EDF3]/50 group-hover:text-[#E6EDF3] transition-colors">[ INIT ]</span>
          </a>
          <a href={oauthUrl("google")} target="_top" className="w-full flex items-center justify-between p-4 border border-[#00BFFF]/30 hover:border-[#00BFFF] bg-[#00BFFF]/5 hover:bg-[#00BFFF]/10 transition-all group clip-angled-button cursor-pointer">
            <span className="font-orbitron text-sm text-[#00BFFF] tracking-widest uppercase font-bold">Google Uplink</span>
            <span className="font-mono text-xs text-[#00BFFF]/50 group-hover:text-[#00BFFF] transition-colors">[ INIT ]</span>
          </a>
        </div>
      </div>
    );
  }

  if (authStatus === "ERROR") {
    return (
      <div className="relative z-10 w-full max-w-md glass-panel clip-angled p-10 border-t-4 border-[#DC143C] shadow-[0_0_30px_rgba(220,20,60,0.15)] flex flex-col items-center mx-4 text-center">
        <span className="text-5xl drop-shadow-[0_0_15px_rgba(220,20,60,0.8)] mb-4">❌</span>
        <h1 className="font-orbitron text-xl text-[#DC143C] font-bold tracking-[0.2em] uppercase mb-2">Uplink Failed</h1>
        <p className="font-mono text-xs text-[#8B949E] leading-relaxed mb-6">{errorMsg}</p>
        <button onClick={() => window.location.reload()} className="clip-angled-button px-6 py-3 border border-[#DC143C]/50 text-[#DC143C] hover:bg-[#DC143C] hover:text-[#010409] font-orbitron text-xs font-black tracking-widest uppercase transition-all">
          Retry Handshake
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-md glass-panel clip-angled p-12 border-t-4 border-[#50C878] shadow-[0_0_40px_rgba(80,200,120,0.2)] flex flex-col items-center mx-4 text-center">
      <div className="w-24 h-24 border-2 border-[#50C878] rounded-full flex items-center justify-center mb-6 relative group overflow-hidden shadow-[0_0_20px_rgba(80,200,120,0.3)] bg-[#50C878]/5">
        <div className="absolute inset-0 bg-[#50C878]/20 blur-[10px] animate-pulse" />
        <span className="text-4xl text-[#50C878] drop-shadow-[0_0_10px_rgba(80,200,120,0.8)] relative z-10">✓</span>
      </div>
      <h1 className="font-orbitron text-2xl text-[#50C878] font-black tracking-[0.2em] uppercase mb-3 drop-shadow-[0_0_8px_rgba(80,200,120,0.5)]">
        Matrix Unlocked
      </h1>
      <p className="font-mono text-xs text-[#E6EDF3] leading-relaxed mb-6">
        Device authorization successful. Hi Handy has securely mapped your <strong className="text-[#50C878]">{linkedUser.tier || "LITE"}</strong> tier.
      </p>
      <div className="w-full bg-[#010409]/80 border border-white/10 p-4 rounded-sm flex flex-col gap-3">
        <p className="font-orbitron text-[10px] text-[#8B949E] tracking-widest uppercase animate-pulse">
          H.E.L.E.N.A. has been notified. Returning to the local panel automatically...
        </p>
        <div className="grid grid-cols-1 gap-2">
          {safeReturnTo() ? (
            <a href={safeReturnTo()} className="clip-angled-button px-4 py-2 border border-[#50C878]/50 text-[#50C878] hover:bg-[#50C878] hover:text-[#010409] font-orbitron text-[10px] font-black tracking-widest uppercase transition-all">
              Return to H.E.L.E.N.A.
            </a>
          ) : (
            <button type="button" onClick={() => window.close()} className="clip-angled-button px-4 py-2 border border-[#50C878]/50 text-[#50C878] hover:bg-[#50C878] hover:text-[#010409] font-orbitron text-[10px] font-black tracking-widest uppercase transition-all">
              Close Auth Window
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DeviceLinkPage() {
  return (
    <SessionProvider>
      <div className="min-h-screen w-full flex items-center justify-center relative bg-[#010409] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[size:100%_4px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00BFFF]/5 rounded-full blur-[120px] pointer-events-none" />
        <Suspense fallback={<div className="relative z-10 flex flex-col items-center"><div className="w-12 h-12 border-4 border-[#00BFFF]/20 border-t-[#00BFFF] rounded-full animate-spin shadow-[0_0_15px_rgba(0,191,255,0.3)]" /></div>}>
          <DeviceLinkContent />
        </Suspense>
      </div>
    </SessionProvider>
  );
}

/* --- END OF FILE app/link/page.tsx --- */
