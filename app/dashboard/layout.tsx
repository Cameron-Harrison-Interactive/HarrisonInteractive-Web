/* --- START OF FILE app/dashboard/layout.tsx --- */

"use client";

import React from "react";
import AuthGuard from "../components/AuthGuard";
import { SessionProvider, useSession, signOut } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | OMNI-LINK SIDEBAR COMPONENT
 * =========================================================================
 * Extracted into its own function so it can consume the useSession hook 
 * securely from the SessionProvider wrapper.
 */
function OmniLinkSidebar() {
  const { data: session } = useSession();

  return (
    <aside className="w-72 glass-panel border-r border-[#00BFFF]/20 flex flex-col justify-between hidden md:flex shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-20 overflow-y-auto">
      <div className="flex flex-col">
        
        {/* BRANDING & BIOMETRIC USER CARD */}
        <div className="p-6 border-b border-[#00BFFF]/20 bg-[#010409]/60 flex flex-col gap-5">
          <div>
            <h2 className="font-orbitron text-[#00BFFF] text-xl font-bold tracking-[0.1em] uppercase drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]">
              Harrison Interactive
            </h2>
            <p className="text-[10px] text-[#8B949E] mt-1 tracking-[0.3em] uppercase animate-pulse">
              Client & Dev Portal
            </p>
          </div>

          {/* THE BIOMETRIC ID BADGE */}
          <div className="flex items-center gap-3 p-3 bg-[#010409] border border-[#00BFFF]/30 rounded-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(0,191,255,0.05),transparent)] group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Avatar Engine */}
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-[#00BFFF]/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] relative z-10" 
              />
            ) : (
              <div className="w-10 h-10 rounded-full border border-[#00BFFF]/50 bg-[#00BFFF]/10 flex items-center justify-center shadow-[0_0_10px_rgba(0,191,255,0.3)] relative z-10">
                <span className="font-orbitron text-[#00BFFF] font-bold">?</span>
              </div>
            )}

            {/* Neural Credentials */}
            <div className="flex flex-col relative z-10 overflow-hidden w-full">
              <span className="font-orbitron text-xs text-[#E6EDF3] font-bold truncate tracking-wider">
                {session?.user?.name || "GUEST ENTITY"}
              </span>
              <span className="font-mono text-[9px] text-[#8B949E] truncate tracking-widest mt-0.5">
                {session?.user?.email || "NO COM-LINK"}
              </span>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] shadow-[0_0_5px_#50C878] animate-pulse"></span>
                <span className="font-mono text-[8px] text-[#50C878] tracking-[0.2em] uppercase">
                  TIER: LITE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION MATRIX */}
        <nav className="p-4 flex flex-col gap-2 mt-2">
          <a href="/dashboard" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00BFFF] shadow-[0_0_5px_#00BFFF]"></span>
            System Overview
          </a>

          <div className="mt-4 mb-1 px-3 border-b border-[#00BFFF]/20 pb-2">
            <p className="text-[10px] text-[#00FFFF]/70 uppercase tracking-[0.2em] font-orbitron">Hi Handy Suite</p>
          </div>

          <a href="/dashboard/hi-handy" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#50C878] hover:bg-[#50C878]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#50C878]/30 flex flex-row items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] shadow-[0_0_5px_#50C878]"></span>
            Downloads & Tiers
          </a>

          <a href="/dashboard/billing" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#FFBF00] hover:bg-[#FFBF00]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#FFBF00]/30 flex flex-row items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFBF00] shadow-[0_0_8px_#FFBF00]"></span>
            License & Billing
          </a>

          <div className="mt-4 mb-1 px-3 border-b border-[#DC143C]/40 pb-2">
            <p className="text-[10px] text-[#DC143C]/80 uppercase tracking-[0.2em] font-orbitron">Internal Studios</p>
          </div>

          <a href="/dashboard/blood-yield" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#DC143C] hover:bg-[#DC143C]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#DC143C]/40 hover:shadow-[0_0_10px_rgba(220,20,60,0.2)] flex flex-row items-center gap-3 group">
            <span className="w-2 h-2 rounded-full bg-[#DC143C] group-hover:shadow-[0_0_8px_#DC143C] transition-all"></span>
            Blood-Yield Game
          </a>

          <div className="mt-4 mb-1 px-3 border-b border-[#00BFFF]/20 pb-2">
            <p className="text-[10px] text-[#00FFFF]/70 uppercase tracking-[0.2em] font-orbitron">Info & Support</p>
          </div>

          <a href="/dashboard/about" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B949E]"></span>
            About Us
          </a>

          <a href="/dashboard/faq" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B949E]"></span>
            Support / FAQ
          </a>

          <a href="/dashboard/legal" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B949E]"></span>
            Legal & EULA
          </a>
        </nav>
      </div>
      
      {/* SECURE SIGNOUT ACTION */}
      <div className="p-4 border-t border-[#00BFFF]/20 bg-[#010409]/60 flex flex-col mt-auto">
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full font-orbitron text-xs text-[#8B949E] hover:text-[#00BFFF] flex flex-row items-center justify-center p-3 transition-all uppercase tracking-[0.2em] border border-transparent hover:border-[#00BFFF]/50 hover:shadow-[0_0_10px_rgba(0,191,255,0.2)] rounded cursor-pointer"
        >
          [ Disconnect ]
        </button>
      </div>
    </aside>
  );
}

/**
 * =========================================================================
 * HARRISON INTERACTIVE | MAIN LAYOUT SHELL
 * =========================================================================
 * Wraps the Dashboard Matrix in the SessionProvider to unlock the Biometric UI.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>
        <div className="w-full h-full min-h-full flex flex-row relative z-10 overflow-hidden bg-transparent">
          
          {/* THE NEW BIOMETRIC SIDEBAR */}
          <OmniLinkSidebar />

          {/* MAIN CONTENT VIEWPORT */}
          <main className="flex-1 w-full h-full min-h-full flex flex-col overflow-y-auto relative z-10">
            
            <div className="flex-1 p-6 lg:p-12">
              {children}
            </div>

            {/* GLOBAL LEGAL FOOTER */}
            <footer className="w-full border-t border-[#00BFFF]/20 bg-[#010409]/90 backdrop-blur-md p-6 mt-auto relative z-20">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase text-center md:text-left">
                  &copy; {new Date().getFullYear()} Harrison Interactive. All Systems Nominal.
                </p>
                <p className="font-orbitron text-[9px] text-[#00BFFF]/60 tracking-[0.2em] uppercase drop-shadow-[0_0_5px_rgba(0,191,255,0.3)]">
                  Encrypted Neural Matrix v2.5
                </p>
              </div>
            </footer>

          </main>

        </div>
      </AuthGuard>
    </SessionProvider>
  );
}

/* --- END OF FILE app/dashboard/layout.tsx --- */