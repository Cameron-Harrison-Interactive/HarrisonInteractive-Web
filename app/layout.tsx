/* --- START OF FILE app/dashboard/layout.tsx --- */

import React from "react";
import AuthGuard from "../components/AuthGuard";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | STATIC DASHBOARD LAYOUT (SCALED)
 * =========================================================================
 * ALL dynamic edge directives and server-side checks have been purged.
 * Typography has been globally scaled up for high-resolution PC monitors.
 * Native <img> tags are used for CEF-Safe edge rendering of brand assets.
 */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="w-full h-full min-h-screen flex flex-row relative z-10 overflow-hidden bg-transparent">
        
        {/* =========================================================
            THE OMNI-LINK SIDEBAR (Expanded Width & Typography)
            ========================================================= */}
        <aside className="w-80 glass-panel border-r border-[#00BFFF]/20 flex flex-col justify-between hidden md:flex shadow-[5px_0_20px_rgba(0,0,0,0.8)] z-20 overflow-y-auto">
          <div className="flex flex-col">
            
            {/* BRANDING HEADER WITH LOGO INJECTION */}
            <div className="p-8 border-b border-[#00BFFF]/20 bg-[#010409]/80 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 to-transparent opacity-50 pointer-events-none"></div>
              
              {/* The Glowing Hand Logo */}
              <div className="relative w-28 h-28 flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-[#00BFFF]/20 rounded-full blur-[25px] animate-pulse group-hover:bg-[#00BFFF]/40 transition-colors duration-500"></div>
                <img 
                  src="/handy_logo.png" 
                  alt="Hi Handy Logo" 
                  className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,191,255,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(0,191,255,1)] transition-all duration-500"
                />
              </div>

              <div>
                <h2 className="font-orbitron text-[#00BFFF] text-2xl font-black tracking-[0.1em] uppercase drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">
                  Harrison Interactive
                </h2>
                <p className="text-xs text-[#8B949E] mt-2 tracking-[0.3em] uppercase font-mono animate-pulse">
                  Client & Dev Portal
                </p>
              </div>
            </div>

            {/* NAVIGATION MATRIX (Scaled Typography) */}
            <nav className="p-6 flex flex-col gap-3 mt-2">
              <a href="/dashboard" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00BFFF] shadow-[0_0_8px_#00BFFF] group-hover:scale-125 transition-transform"></span>
                System Overview
              </a>

              <div className="mt-5 mb-2 px-3 border-b border-[#00BFFF]/20 pb-2">
                <p className="text-xs text-[#00FFFF]/70 uppercase tracking-[0.2em] font-orbitron font-bold">Hi Handy Suite</p>
              </div>

              <a href="/dashboard/hi-handy" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#50C878] hover:bg-[#50C878]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#50C878]/30 flex flex-row items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_8px_#50C878] group-hover:scale-125 transition-transform"></span>
                Downloads & Tiers
              </a>

              <a href="/dashboard/billing" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#FFBF00] hover:bg-[#FFBF00]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#FFBF00]/30 flex flex-row items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-[#FFBF00] shadow-[0_0_10px_#FFBF00] group-hover:scale-125 transition-transform"></span>
                License & Billing
              </a>

              <div className="mt-5 mb-2 px-3 border-b border-[#DC143C]/40 pb-2">
                <p className="text-xs text-[#DC143C]/80 uppercase tracking-[0.2em] font-orbitron font-bold">Internal Studios</p>
              </div>

              <a href="/dashboard/blood-yield" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#DC143C] hover:bg-[#DC143C]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#DC143C]/40 hover:shadow-[0_0_15px_rgba(220,20,60,0.2)] flex flex-row items-center gap-4 group">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC143C] group-hover:shadow-[0_0_10px_#DC143C] group-hover:scale-125 transition-all"></span>
                Blood-Yield Game
              </a>

              <div className="mt-5 mb-2 px-3 border-b border-[#00BFFF]/20 pb-2">
                <p className="text-xs text-[#00FFFF]/70 uppercase tracking-[0.2em] font-orbitron font-bold">Info & Support</p>
              </div>

              <a href="/dashboard/about" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-[#8B949E] group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_#00FFFF] transition-all"></span>
                About Us
              </a>

              <a href="/dashboard/faq" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-[#8B949E] group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_#00FFFF] transition-all"></span>
                Support / FAQ
              </a>

              <a href="/dashboard/legal" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
                <span className="w-2 h-2 rounded-full bg-[#8B949E] group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_#00FFFF] transition-all"></span>
                Legal & EULA
              </a>
            </nav>
          </div>
          
          <div className="p-6 border-t border-[#00BFFF]/20 bg-[#010409]/80 flex flex-col mt-auto">
            <a href="/api/auth/signout" className="font-orbitron text-sm text-[#8B949E] hover:text-[#00BFFF] flex flex-row items-center justify-center p-4 transition-all uppercase tracking-[0.2em] border border-transparent hover:border-[#00BFFF]/50 hover:shadow-[0_0_15px_rgba(0,191,255,0.2)] rounded font-bold">
              [ Disconnect Matrix ]
            </a>
          </div>
        </aside>

        {/* MAIN CONTENT VIEWPORT */}
        <main className="flex-1 w-full h-full min-h-screen flex flex-col overflow-y-auto relative z-10">
          
          <div className="flex-1 p-8 lg:p-14">
            {children}
          </div>

          {/* GLOBAL LEGAL FOOTER (Scaled) */}
          <footer className="w-full border-t border-[#00BFFF]/20 bg-[#010409]/95 backdrop-blur-md p-8 mt-auto relative z-20">
            <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="font-mono text-xs text-[#8B949E] tracking-widest uppercase text-center md:text-left">
                &copy; {new Date().getFullYear()} Harrison Interactive. All Systems Nominal.
              </p>
              <p className="font-orbitron text-[11px] text-[#00BFFF]/70 tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(0,191,255,0.4)] font-bold">
                Encrypted Neural Matrix v2.5
              </p>
            </div>
          </footer>

        </main>

      </div>
    </AuthGuard>
  );
}

/* --- END OF FILE app/dashboard/layout.tsx --- */