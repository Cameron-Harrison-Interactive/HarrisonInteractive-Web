/* --- START OF FILE app/link/page.tsx --- */

"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
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

  const { data: session, status: sessionStatus } = useSession();
  const [authStatus, setAuthStatus] = useState<"IDLE" | "AUTHORIZING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMsg, setErrorMsg] = useState("");
  const linkedUser = (session?.user || {}) as HelenaLinkedUser;
  const autoOAuthStarted = useRef(false);

  const isEmbeddedAuthPanel = () => {
    if (typeof window === "undefined") return false;
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  };

  const startTopLevelOAuth = (provider: "github" | "google", callbackUrl: string) => {
    // Server-side Auth.js launch route avoids MissingCSRF when H.E.L.E.N.A. is
    // embedded in Unreal CEF/iframe and then opens a top-level auth gateway.
    window.location.assign(`/api/oauth/${provider}?redirectTo=${encodeURIComponent(callbackUrl)}`);
  };

  const openOAuthProvider = (provider: "github" | "google") => {
    const callbackUrl = `/link?token=${encodeURIComponent(token || "")}`;
    if (isEmbeddedAuthPanel()) {
      const gatewayUrl = `/link?token=${encodeURIComponent(token || "")}&oauth=${provider}`;
      try {
        // Avoid popup blockers inside Unreal/CEF iframes. Promote the device-link
        // OAuth gateway to the top-level WebUI window using the user's click.
        window.top?.location.assign(gatewayUrl);
      } catch {
        window.location.assign(gatewayUrl);
      }
      return;
    }
    startTopLevelOAuth(provider, callbackUrl);
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
    if (typeof window === "undefined" || autoOAuthStarted.current || !token) return;
    if (sessionStatus !== "unauthenticated") return;
    const params = new URLSearchParams(window.location.search);
    const provider = params.get("oauth") as "github" | "google" | null;
    if (provider !== "github" && provider !== "google") return;
    if (isEmbeddedAuthPanel()) return;
    autoOAuthStarted.current = true;
    const callbackUrl = `/link?token=${encodeURIComponent(token)}`;
    const timer = window.setTimeout(() => {
      startTopLevelOAuth(provider, callbackUrl);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [token, sessionStatus]);

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
          <button type="button" onClick={() => openOAuthProvider("github")} className="w-full flex items-center justify-between p-4 border border-[#E6EDF3]/20 hover:border-[#E6EDF3]/80 bg-[#E6EDF3]/5 hover:bg-[#E6EDF3]/10 transition-all group clip-angled-button cursor-pointer">
            <span className="font-orbitron text-sm text-[#E6EDF3] tracking-widest uppercase font-bold">GitHub Uplink</span>
            <span className="font-mono text-xs text-[#E6EDF3]/50 group-hover:text-[#E6EDF3] transition-colors">[ INIT ]</span>
          </button>
          <button type="button" onClick={() => openOAuthProvider("google")} className="w-full flex items-center justify-between p-4 border border-[#00BFFF]/30 hover:border-[#00BFFF] bg-[#00BFFF]/5 hover:bg-[#00BFFF]/10 transition-all group clip-angled-button cursor-pointer">
            <span className="font-orbitron text-sm text-[#00BFFF] tracking-widest uppercase font-bold">Google Uplink</span>
            <span className="font-mono text-xs text-[#00BFFF]/50 group-hover:text-[#00BFFF] transition-colors">[ INIT ]</span>
          </button>
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
      <div className="w-full bg-[#010409]/80 border border-white/10 p-4 rounded-sm">
        <p className="font-orbitron text-[10px] text-[#8B949E] tracking-widest uppercase animate-pulse">
          You may now close this tab and return to Unreal Engine.
        </p>
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
