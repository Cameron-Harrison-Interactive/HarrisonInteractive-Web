/* --- START OF FILE app/dashboard/hi-handy/page.tsx --- */

import React from "react";

export default function HiHandyMatrix() {
  return (
    <div className="w-full h-full flex flex-col relative z-10 max-w-6xl mx-auto">
      
      {/* Page Header - Cyan Intent for System/Info */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
            Hi Handy Suite
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse">
            v2.5 Stable
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          Plugin Downloads, Documentation, and Feature Matrix
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        
        {/* =========================================================
            LEFT COLUMN: DOWNLOADS & DOCUMENTATION
            ========================================================= */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Active Download Card */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-t-2 border-t-[#00BFFF]">
            <h2 className="font-orbitron text-[#00BFFF] text-sm font-bold tracking-widest uppercase mb-6 flex items-center justify-between">
              Engine Plugin
              <span className="w-2 h-2 rounded-full bg-[#00BFFF] shadow-[0_0_8px_#00BFFF] animate-pulse"></span>
            </h2>
            
            <p className="font-orbitron text-3xl text-[#E6EDF3] font-light tracking-wider mb-1">
              UE 5.4+
            </p>
            <p className="font-inter text-xs text-[#50C878] uppercase tracking-widest mb-6">
              Status: Ready for Deployment
            </p>

            <button className="w-full font-orbitron text-xs py-4 border border-[#00BFFF] bg-[#00BFFF]/10 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#010409] transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_10px_rgba(0,191,255,0.2)] mb-4">
              Download Matrix (.ZIP)
            </button>

            <div className="flex flex-col gap-2 mt-2 border-t border-[#00BFFF]/20 pt-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8B949E]">
                <span>SHA-256 Checksum:</span>
                <span className="text-[#00BFFF]">a8f9...b2c1</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8B949E]">
                <span>Last Updated:</span>
                <span className="text-[#E6EDF3]">May 21, 2026</span>
              </div>
            </div>
          </div>

          {/* Documentation Stub */}
          <div className="glass-panel clip-angled flex flex-col p-6 border-l-2 border-l-[#8B949E] opacity-90 hover:opacity-100 hover:border-l-[#00BFFF] transition-all cursor-pointer group">
            <h3 className="font-orbitron text-[#E6EDF3] group-hover:text-[#00BFFF] text-xs font-bold tracking-widest uppercase mb-2 transition-colors">
              Neural Documentation
            </h3>
            <p className="font-inter text-xs text-[#8B949E] mb-4">
              Integration guides for C++ Omni-Link, Viewport Buddy, and Python Router bypass.
            </p>
            <span className="font-orbitron text-[10px] text-[#00BFFF] uppercase tracking-widest">
              [ Access Archives ]
            </span>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: FEATURE MATRIX COMPARISON
            ========================================================= */}
        <div className="w-full lg:w-2/3 flex flex-col">
          
          <h2 className="font-orbitron text-[#E6EDF3] text-lg font-bold tracking-widest uppercase border-b border-[#E6EDF3]/10 pb-2 mb-6">
            Neural Tier Capabilities
          </h2>

          <div className="glass-panel rounded-lg overflow-hidden border border-[#00BFFF]/20 flex flex-col">
            
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-[#010409]/80 border-b border-[#00BFFF]/20 p-4">
              <div className="col-span-1 font-orbitron text-[10px] text-[#8B949E] uppercase tracking-widest">Feature Protocol</div>
              <div className="col-span-1 font-orbitron text-[10px] text-[#E6EDF3] text-center uppercase tracking-widest">Lite</div>
              <div className="col-span-1 font-orbitron text-[10px] text-[#50C878] text-center uppercase tracking-widest drop-shadow-[0_0_5px_rgba(80,200,120,0.8)]">Elite</div>
              <div className="col-span-1 font-orbitron text-[10px] text-[#FF00FF] text-center uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">Ultimate</div>
            </div>

            {/* Matrix Rows */}
            <div className="flex flex-col">
              
              {/* Row 1 */}
              <div className="grid grid-cols-4 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#00BFFF]/5 transition-colors">
                <div className="col-span-1 font-inter text-xs text-[#E6EDF3]">Viewport Buddy 3D UI</div>
                <div className="col-span-1 text-center text-[#00BFFF] text-sm">●</div>
                <div className="col-span-1 text-center text-[#50C878] text-sm">●</div>
                <div className="col-span-1 text-center text-[#FF00FF] text-sm">●</div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-4 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#00BFFF]/5 transition-colors">
                <div className="col-span-1 font-inter text-xs text-[#E6EDF3]">Python Macro Generation</div>
                <div className="col-span-1 text-center text-[#00BFFF] text-sm">●</div>
                <div className="col-span-1 text-center text-[#50C878] text-sm">●</div>
                <div className="col-span-1 text-center text-[#FF00FF] text-sm">●</div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-4 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#00BFFF]/5 transition-colors">
                <div className="col-span-1 font-inter text-xs text-[#E6EDF3]">Multi-Agent Backbone</div>
                <div className="col-span-1 text-center text-[#8B949E] text-sm opacity-30">-</div>
                <div className="col-span-1 text-center text-[#50C878] text-sm">●</div>
                <div className="col-span-1 text-center text-[#FF00FF] text-sm">●</div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-4 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#00BFFF]/5 transition-colors">
                <div className="col-span-1 font-inter text-xs text-[#E6EDF3]">Omni-Link Self-Healing</div>
                <div className="col-span-1 text-center text-[#8B949E] text-sm opacity-30">-</div>
                <div className="col-span-1 text-center text-[#50C878] text-sm">●</div>
                <div className="col-span-1 text-center text-[#FF00FF] text-sm">●</div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-4 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#00BFFF]/5 transition-colors">
                <div className="col-span-1 font-inter text-xs text-[#E6EDF3]">Local Llama.cpp CUDA Server</div>
                <div className="col-span-1 text-center text-[#8B949E] text-sm opacity-30">-</div>
                <div className="col-span-1 text-center text-[#8B949E] text-sm opacity-30">-</div>
                <div className="col-span-1 text-center text-[#FF00FF] text-sm shadow-[0_0_10px_#FF00FF]">●</div>
              </div>
              
              {/* Row 6 */}
              <div className="grid grid-cols-4 p-4 hover:bg-[#00BFFF]/5 transition-colors">
                <div className="col-span-1 font-inter text-xs text-[#E6EDF3]">Direct C++ API Access</div>
                <div className="col-span-1 text-center text-[#8B949E] text-sm opacity-30">-</div>
                <div className="col-span-1 text-center text-[#8B949E] text-sm opacity-30">-</div>
                <div className="col-span-1 text-center text-[#FF00FF] text-sm shadow-[0_0_10px_#FF00FF]">●</div>
              </div>

            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/hi-handy/page.tsx --- */