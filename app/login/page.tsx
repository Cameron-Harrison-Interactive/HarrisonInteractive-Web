/* --- START OF FILE app/login/page.tsx --- */

import React from "react";
import { signIn } from "@/auth";

// =========================================================================
// CRITICAL CLOUDFLARE DIRECTIVE:
// Forces the V8 Edge Network compilation for the Login Matrix.
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | AAA AUTH GATEWAY
 * =========================================================================
 * This is the public-facing login portal.
 * It uses native Next.js Server Actions to securely handshake with NextAuth
 * without relying on client-side JavaScript hydration.
 */
export default function LoginMatrix() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#010409] overflow-hidden">
      
      {/* 
        =========================================================
        ENVIRONMENTAL EFFECTS
        ========================================================= 
      */}
      {/* 1. Holographic Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* 2. Global Scanline Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[size:100%_4px] pointer-events-none"></div>
      
      {/* 3. Ambient Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00BFFF]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 
        =========================================================
        THE ENCRYPTED GATEWAY PANEL
        ========================================================= 
      */}
      <div className="relative z-10 w-full max-w-md glass-panel clip-angled p-10 border-t-4 border-[#00BFFF] shadow-[0_0_30px_rgba(0,191,255,0.15)] flex flex-col items-center mx-4">
        
        {/* Tech Decals */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00BFFF]/50"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00BFFF]/50"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00BFFF]/50"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00BFFF]/50"></div>

        {/* Biometric Logo */}
        <div className="w-20 h-20 border-2 border-[#00BFFF]/50 rounded-full flex items-center justify-center mb-6 relative group overflow-hidden shadow-[0_0_15px_rgba(0,191,255,0.2)]">
          <div className="absolute inset-0 bg-[#00BFFF]/10 animate-pulse"></div>
          {/* Scanning Laser Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00BFFF] shadow-[0_0_8px_#00BFFF] animate-[slide-in_2s_linear_infinite]"></div>
          <span className="font-orbitron text-3xl text-[#00BFFF] font-black drop-shadow-[0_0_5px_rgba(0,191,255,0.8)] relative z-10">HI</span>
        </div>

        {/* Text Headers */}
        <h1 className="font-orbitron text-2xl text-[#E6EDF3] font-bold tracking-[0.2em] uppercase mb-2 text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          Auth Gateway
        </h1>
        <p className="font-mono text-[10px] text-[#8B949E] tracking-[0.3em] uppercase mb-10 text-center flex flex-col gap-1">
          <span>Encrypted Handshake Required</span>
          <span className="text-[#00BFFF] animate-pulse">Awaiting Biometric Uplink...</span>
        </p>

        {/* 
          =========================================================
          OAUTH UPLINK BUTTONS (SERVER ACTIONS)
          ========================================================= 
        */}
        <div className="w-full flex flex-col gap-4">
          
          {/* GITHUB AUTH NODE (White/Gray Intent) */}
          <form 
            action={async () => {
              "use server";
              // Triggers the NextAuth core and forcefully redirects to the Dashboard on success
              await signIn("github", { redirectTo: "/dashboard" });
            }} 
            className="w-full"
          >
            <button 
              type="submit" 
              className="w-full flex items-center justify-between p-4 border border-[#E6EDF3]/20 hover:border-[#E6EDF3]/80 bg-[#E6EDF3]/5 hover:bg-[#E6EDF3]/10 transition-all duration-300 group relative overflow-hidden cursor-pointer"
            >
              <div className="flex items-center gap-4 relative z-10">
                <span className="w-2 h-2 rounded-full bg-[#E6EDF3] group-hover:shadow-[0_0_8px_#E6EDF3] transition-shadow"></span>
                <span className="font-orbitron text-sm text-[#E6EDF3] tracking-widest uppercase font-bold">GitHub Uplink</span>
              </div>
              <span className="font-mono text-[#E6EDF3]/50 group-hover:text-[#E6EDF3] group-hover:translate-x-1 transition-all relative z-10">
                [ INIT ]
              </span>
            </button>
          </form>

          {/* GOOGLE AUTH NODE (Cyan Intent) */}
          <form 
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }} 
            className="w-full"
          >
            <button 
              type="submit" 
              className="w-full flex items-center justify-between p-4 border border-[#00BFFF]/30 hover:border-[#00BFFF] bg-[#00BFFF]/5 hover:bg-[#00BFFF]/10 transition-all duration-300 group relative overflow-hidden shadow-[0_0_10px_rgba(0,191,255,0)] hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] cursor-pointer"
            >
              <div className="flex items-center gap-4 relative z-10">
                <span className="w-2 h-2 rounded-full bg-[#00BFFF] group-hover:shadow-[0_0_8px_#00BFFF] transition-shadow animate-pulse"></span>
                <span className="font-orbitron text-sm text-[#00BFFF] tracking-widest uppercase font-bold">Google Uplink</span>
              </div>
              <span className="font-mono text-[#00BFFF]/50 group-hover:text-[#00BFFF] group-hover:translate-x-1 transition-all relative z-10">
                [ INIT ]
              </span>
            </button>
          </form>

        </div>

        {/* Footer Terminal Diagnostics */}
        <div className="mt-10 pt-4 border-t border-[#00BFFF]/20 w-full text-center flex flex-col gap-1">
          <p className="font-mono text-[9px] text-[#8B949E] tracking-widest uppercase">
            Protocol: <span className="text-[#50C878]">OAuth 2.0 Edge</span>
          </p>
          <p className="font-mono text-[9px] text-[#8B949E] tracking-widest uppercase">
            Connection: <span className="text-[#50C878]">256-Bit AES Secured</span>
          </p>
        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/login/page.tsx --- */