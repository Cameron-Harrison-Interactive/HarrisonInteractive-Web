/* --- START OF FILE app/dashboard/layout.tsx --- */

import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full min-h-full flex flex-row relative z-10 overflow-hidden bg-transparent">
      
      {/* 
        THE OMNI-LINK SIDEBAR 
        Hidden on very small mobile screens (hidden md:flex), fully locked on desktop.
        Utilizes the glass-panel class for the deep blur effect.
      */}
      <aside className="w-72 glass-panel border-r border-[#00BFFF]/20 flex flex-col justify-between hidden md:flex shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-20 overflow-y-auto">
        
        {/* Sidebar Header */}
        <div className="flex flex-col">
          <div className="p-6 border-b border-[#00BFFF]/20 bg-[#010409]/60">
            <h2 className="font-orbitron text-[#00BFFF] text-xl font-bold tracking-[0.1em] uppercase drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]">
              Harrison Interactive
            </h2>
            <p className="text-[10px] text-[#8B949E] mt-2 tracking-[0.3em] uppercase animate-pulse">
              Client & Dev Portal
            </p>
          </div>

          {/* Global Navigation Matrix (HARD NAVIGATION OVERRIDE APPLIED) */}
          <nav className="p-4 flex flex-col gap-2 mt-2">
            
            <a href="/dashboard" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00BFFF] shadow-[0_0_5px_#00BFFF]"></span>
              System Overview
            </a>

            {/* HI HANDY PRODUCT SUITE */}
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

            {/* HARRISON INTERACTIVE GAMES */}
            <div className="mt-4 mb-1 px-3 border-b border-[#DC143C]/40 pb-2">
              <p className="text-[10px] text-[#DC143C]/80 uppercase tracking-[0.2em] font-orbitron">Internal Studios</p>
            </div>

            <a href="/dashboard/blood-yield" className="font-orbitron text-sm text-[#E6EDF3] hover:text-[#DC143C] hover:bg-[#DC143C]/10 p-3 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#DC143C]/40 hover:shadow-[0_0_10px_rgba(220,20,60,0.2)] flex flex-row items-center gap-3 group">
              <span className="w-2 h-2 rounded-full bg-[#DC143C] group-hover:shadow-[0_0_8px_#DC143C] transition-all"></span>
              Blood-Yield Game
            </a>

            {/* INFORMATION & SUPPORT */}
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
        
        {/* Footer / Emergency Disconnect */}
        <div className="p-4 border-t border-[#00BFFF]/20 bg-[#010409]/60 flex flex-col mt-auto">
          <a href="/" className="font-orbitron text-xs text-[#8B949E] hover:text-[#00BFFF] flex flex-row items-center justify-center p-3 transition-all uppercase tracking-[0.2em] border border-transparent hover:border-[#00BFFF]/50 hover:shadow-[0_0_10px_rgba(0,191,255,0.2)] rounded">
            [ Disconnect ]
          </a>
        </div>
      </aside>

      {/* 
        MAIN CONTENT VIEWPORT
        CEF-Safe flexbox structure to prevent collapse.
      */}
      <main className="flex-1 w-full h-full min-h-full flex flex-col overflow-y-auto p-6 lg:p-12 relative z-10">
        
        {/* Page Content Injection */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* GLOBAL LEGAL FOOTER */}
        <footer className="w-full mt-12 pt-6 border-t border-[#00BFFF]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[#8B949E] font-mono text-[10px] uppercase tracking-[0.2em]">
          <p>© 2026 Harrison Interactive LLC. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="/dashboard/legal" className="hover:text-[#00BFFF] transition-colors drop-shadow-[0_0_5px_rgba(0,191,255,0)] hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">Privacy Policy</a>
            <a href="/dashboard/legal" className="hover:text-[#00BFFF] transition-colors drop-shadow-[0_0_5px_rgba(0,191,255,0)] hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">EULA</a>
          </div>
        </footer>

      </main>

    </div>
  );
}

/* --- END OF FILE app/dashboard/layout.tsx --- */