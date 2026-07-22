/* --- START OF FILE app/login/page.tsx --- */

"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | AAA AUTH GATEWAY
 * =========================================================================
 * Native OAuth handshakes plus secure Resend Magic-Link authentication.
 */
export default function LoginMatrix() {
  const initialCommsLog = () => {
    if (typeof window === "undefined") return "Awaiting Biometric Uplink...";
    const error = new URLSearchParams(window.location.search).get("error");
    if (!error) return "Awaiting Biometric Uplink...";
    if (error === "Configuration") return "!! [ERR] OAuth provider configuration missing or invalid. Check AUTH_SECRET and provider secrets.";
    return `!! [ERR] OAuth handshake rejected: ${error}`;
  };

  const [email, setEmail] = useState("");
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [commsLog, setCommsLog] = useState<string>(initialCommsLog);

  const getReturnUrl = () => {
    if (typeof window === "undefined") return "/dashboard";
    const params = new URLSearchParams(window.location.search);
    return params.get("callbackUrl") || params.get("returnTo") || "/dashboard";
  };

  const isEmbeddedAuthPanel = () => {
    if (typeof window === "undefined") return false;
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  };

  const navigateToOAuth = (url: string, provider: string) => {
    if (isEmbeddedAuthPanel()) {
      const popup = window.open(url, "_blank", "noopener,noreferrer,width=980,height=820");
      if (popup) {
        setCommsLog(`[NET] ${provider.toUpperCase()} auth opened in secure top-level popup. Complete it, then return to H.E.L.E.N.A.`);
        return;
      }
      setCommsLog(`[WARN] Popup blocked. Opening ${provider.toUpperCase()} auth in this panel...`);
    }
    window.location.assign(url);
  };

  const handleOAuthLogin = async (provider: string) => {
    if (isConnecting !== null) return;
    setIsConnecting(provider);
    setCommsLog(`[NET] Initiating handshake with ${provider.toUpperCase()} nodes...`);
    const callbackUrl = getReturnUrl();

    try {
      // In embedded Unreal/CEF/iframe panels, Google/GitHub cannot reliably run
      // inside the iframe. Ask Auth.js for the provider URL, then open that URL
      // as a top-level popup/window so OAuth is not trapped by the embedded panel.
      const result = await signIn(provider, { callbackUrl, redirect: false });
      if (result?.error) {
        setCommsLog(`!! [ERR] OAuth handshake rejected: ${result.error}`);
        setIsConnecting(null);
        return;
      }
      const targetUrl = result?.url || `/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
      navigateToOAuth(targetUrl, provider);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setCommsLog(`!! [ERR] OAuth redirect failed: ${message}`);
      setIsConnecting(null);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isConnecting !== null) return;

    setIsConnecting("email");
    setCommsLog("[SYS] Transmitting secure magic-link payload to Resend...");

    try {
      const result = await signIn("resend", {
        email: email.trim(),
        callbackUrl: getReturnUrl(),
        redirect: false,
      });

      if (result?.error) {
        setCommsLog(`!! [ERR] Handshake rejected: ${result.error}`);
        setIsConnecting(null);
      } else {
        setCommsLog("[SUCCESS] Handshake approved. Secure Magic-Link broadcasted. Check your inbox.");
        setIsConnecting("COMPLETE");
        setEmail("");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setCommsLog(`!! [FATAL] Teleport fractured: ${message}`);
      setIsConnecting(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#010409] overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.25)_50%,rgba(0,0,0,0.25))] bg-[size:100%_4px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00BFFF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg glass-panel clip-angled p-12 border-t-4 border-[#00BFFF] shadow-[0_0_40px_rgba(0,191,255,0.2)] flex flex-col items-center mx-4">
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00BFFF]/50" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#00BFFF]/50" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#00BFFF]/50" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00BFFF]/50" />

        <div className="w-24 h-24 border-2 border-[#00BFFF]/50 rounded-full flex items-center justify-center mb-8 relative group overflow-hidden shadow-[0_0_20px_rgba(0,191,255,0.25)]">
          <div className="absolute inset-0 bg-[#00BFFF]/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00BFFF] shadow-[0_0_8px_#00BFFF] animate-[slide-in_2s_linear_infinite]" />
          <span className="font-orbitron text-4xl text-[#00BFFF] font-black drop-shadow-[0_0_8px_rgba(0,191,255,0.8)] relative z-10">HI</span>
        </div>

        <h1 className="font-orbitron text-3xl text-[#E6EDF3] font-bold tracking-[0.2em] uppercase mb-3 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Auth Gateway
        </h1>
        <p className="font-mono text-xs text-[#8B949E] tracking-[0.3em] uppercase mb-10 text-center flex flex-col gap-1.5">
          <span>Encrypted Handshake Required</span>
          <span className="text-[#00BFFF] animate-pulse">{commsLog}</span>
        </p>

        <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-4 relative z-10 mb-8">
          <div className="flex flex-col relative pt-2">
            <label className="absolute top-0 left-4 bg-[#010409] px-2 font-mono text-[10px] text-[#00BFFF] tracking-widest z-10">
              IDENT_SECURE_EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isConnecting !== null}
              required
              placeholder="Email@Network.Node..."
              className="w-full bg-[#00BFFF]/5 border border-[#00BFFF]/30 text-[#E6EDF3] p-4 pt-5 font-mono text-sm outline-none focus:border-[#00BFFF] focus:bg-[#00BFFF]/10 transition-all placeholder:text-[#8B949E]/30 clip-angled disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isConnecting !== null}
            className="clip-angled-button w-full py-4 bg-[#00BFFF]/10 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#010409] transition-all font-futura font-black tracking-[0.25em] uppercase text-xs hover:shadow-[0_0_20px_rgba(0,191,255,0.4)] disabled:opacity-50 cursor-pointer"
          >
            {isConnecting === "email"
              ? "[ TRANSMITTING... ]"
              : isConnecting === "COMPLETE"
                ? "[ INBOX_SECURED ]"
                : "Initiate Magic-Link"}
          </button>
        </form>

        <div className="w-full mb-6 flex flex-col gap-2 text-center font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">
          <p>New user? Enter your email above and use Magic-Link, or select an OAuth node to create/sync an account.</p>
          <a href="/signup" className="text-[#50C878] hover:text-[#00BFFF] transition-colors">Open Sign-Up Gateway</a>
        </div>

        <div className="w-full flex items-center justify-between gap-4 mb-8 text-[#8B949E]/50 text-xs font-mono">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#8B949E]/20" />
          <span className="uppercase tracking-widest shrink-0">OR SELECT OAUTH NODE</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#8B949E]/20" />
        </div>

        <div className="w-full flex flex-col gap-4 relative z-10">
          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            disabled={isConnecting !== null}
            className="w-full flex items-center justify-between p-4 border border-[#E6EDF3]/20 hover:border-[#E6EDF3]/80 bg-[#E6EDF3]/5 hover:bg-[#E6EDF3]/10 transition-all duration-300 group relative overflow-hidden cursor-pointer disabled:opacity-50 clip-angled-button"
          >
            <div className="flex items-center gap-4 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6EDF3] group-hover:shadow-[0_0_8px_#E6EDF3] transition-shadow" />
              <span className="font-orbitron text-sm text-[#E6EDF3] tracking-widest uppercase font-bold">GitHub Uplink</span>
            </div>
            <span className="font-mono text-xs text-[#E6EDF3]/50 group-hover:text-[#E6EDF3] group-hover:translate-x-1 transition-all relative z-10">
              {isConnecting === "github" ? "[ AUTHENTICATING ]" : "[ INIT ]"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            disabled={isConnecting !== null}
            className="w-full flex items-center justify-between p-4 border border-[#00BFFF]/30 hover:border-[#00BFFF] bg-[#00BFFF]/5 hover:bg-[#00BFFF]/10 transition-all duration-300 group relative overflow-hidden shadow-[0_0_10px_rgba(0,191,255,0)] hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] cursor-pointer disabled:opacity-50 clip-angled-button"
          >
            <div className="flex items-center gap-4 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00BFFF] group-hover:shadow-[0_0_8px_#00BFFF] transition-shadow animate-pulse" />
              <span className="font-orbitron text-sm text-[#00BFFF] tracking-widest uppercase font-bold">Google Uplink</span>
            </div>
            <span className="font-mono text-xs text-[#00BFFF]/50 group-hover:text-[#00BFFF] group-hover:translate-x-1 transition-all relative z-10">
              {isConnecting === "google" ? "[ AUTHENTICATING ]" : "[ INIT ]"}
            </span>
          </button>
        </div>

        <div className="mt-10 pt-4 border-t border-[#00BFFF]/20 w-full text-center flex flex-col gap-1.5">
          <p className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">
            Protocol: <span className="text-[#50C878]">OAuth 2.0 // Passwordless Magic-Link</span>
          </p>
          <p className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">
            Connection: <span className="text-[#50C878]">256-Bit AES Secured</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- END OF FILE app/login/page.tsx --- */
