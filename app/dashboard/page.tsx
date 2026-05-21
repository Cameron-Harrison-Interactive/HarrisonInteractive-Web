/* --- START OF FILE app/dashboard/page.tsx --- */

import React from "react";

export default function DashboardOverview() {
  return (
    <div className="w-full h-full flex flex-col relative z-10 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/20 pb-4">
        <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
          System Overview
        </h1>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          Harrison Interactive Unified Neural Matrix
        </p>
      </div>

      {/* 
        Holographic Data Grid 
        Uses grid on desktop, flex-col on mobile. All children are flex-col to remain CEF-Safe.
      */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* =========================================================
            MODULE 1: HI HANDY TIER STATUS (Emerald Intent)
            ========================================================= */}
        <div className="glass-panel clip-angled flex flex-col justify-between p-8 border-t-2 border-t-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.1)] hover:shadow-[0_0_20px_rgba(80,200,120,0.3)] transition-all duration-300">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-start mb-4">
              <h2 className="font-orbitron text-[#50C878] text-sm font-bold tracking-widest uppercase">Hi Handy Access</h2>
              <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_8px_#50C878] animate-pulse"></span>
            </div>
            
            <p className="font-orbitron text-4xl text-[#E6EDF3] font-light tracking-wider mb-2">
              LITE
            </p>
            <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest">
              Base Features Unlocked
            </p>
          </div>
          
          <div className="mt-8 flex flex-col w-full">
            <button className="w-full font-orbitron text-xs py-3 border border-[#50C878] text-[#50C878] hover:bg-[#50C878] hover:text-[#010409] transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_10px_rgba(80,200,120,0.2)]">
              Upgrade to Elite
            </button>
          </div>
        </div>

        {/* =========================================================
            MODULE 2: STRIPE LICENSE KEY (Amber Intent)
            ========================================================= */}
        <div className="glass-panel clip-angled flex flex-col justify-between p-8 border-t-2 border-t-[#FFBF00] shadow-[0_0_15px_rgba(255,191,0,0.1)] hover:shadow-[0_0_20px_rgba(255,191,0,0.3)] transition-all duration-300">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-start mb-4">
              <h2 className="font-orbitron text-[#FFBF00] text-sm font-bold tracking-widest uppercase">License Key</h2>
              <span className="w-2 h-2 rounded-full bg-[#FFBF00] shadow-[0_0_8px_#FFBF00]"></span>
            </div>
            
            <p className="font-mono text-xl text-[#8B949E] tracking-[0.2em] mb-2 opacity-50">
              XXXX-XXXX-XXXX
            </p>
            <p className="font-inter text-xs text-[#FFBF00] uppercase tracking-widest">
              Status: Awaiting Purchase
            </p>
          </div>
          
          <div className="mt-8 flex flex-col w-full">
            <button className="w-full font-orbitron text-xs py-3 border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-[#010409] transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_10px_rgba(255,191,0,0.2)]">
              Manage Billing
            </button>
          </div>
        </div>

        {/* =========================================================
            MODULE 3: BLOOD-YIELD PROJECT (Crimson Intent)
            ========================================================= */}
        <div className="glass-panel clip-angled flex flex-col justify-between p-8 border-t-2 border-t-[#DC143C] shadow-[0_0_15px_rgba(220,20,60,0.1)] hover:shadow-[0_0_20px_rgba(220,20,60,0.3)] transition-all duration-300">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-start mb-4">
              <h2 className="font-orbitron text-[#DC143C] text-sm font-bold tracking-widest uppercase">Blood-Yield</h2>
              <span className="w-2 h-2 rounded-full bg-[#DC143C] shadow-[0_0_8px_#DC143C] animate-pulse"></span>
            </div>
            
            <p className="font-orbitron text-3xl text-[#E6EDF3] font-light tracking-wide mb-2">
              Build <span className="text-[#DC143C] font-bold">0.4a</span>
            </p>
            <p className="font-inter text-xs text-[#DC143C]/80 uppercase tracking-widest">
              Dev Branch: Mainline
            </p>
          </div>
          
          <div className="mt-8 flex flex-col w-full">
            <button className="w-full font-orbitron text-xs py-3 border border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_10px_rgba(220,20,60,0.2)]">
              Access Dev Hub
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/page.tsx --- */