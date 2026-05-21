/* --- START OF FILE app/dashboard/blood-yield/page.tsx --- */

import React from "react";

export default function BloodYieldMatrix() {
  return (
    <div className="w-full h-full flex flex-col relative z-10 max-w-6xl mx-auto">
      
      {/* Page Header - Crimson Intent for Heavy/Game Dev */}
      <div className="w-full flex flex-col mb-10 border-b border-[#DC143C]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#DC143C] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(220,20,60,0.6)]">
            Blood-Yield
          </h1>
          <span className="px-3 py-1 bg-[#DC143C]/20 border border-[#DC143C]/50 text-[#DC143C] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse">
            Internal Dev Hub
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          Build Distribution, Server Status, and Commit Logs
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        
        {/* =========================================================
            LEFT COLUMN: BUILD STATUS & SERVERS
            ========================================================= */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Active Build Card */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-t-2 border-t-[#DC143C] shadow-[0_0_15px_rgba(220,20,60,0.15)]">
            <h2 className="font-orbitron text-[#DC143C] text-sm font-bold tracking-widest uppercase mb-6 flex items-center justify-between">
              Current Playtest Build
              <span className="w-2 h-2 rounded-full bg-[#DC143C] shadow-[0_0_8px_#DC143C] animate-pulse"></span>
            </h2>
            
            <p className="font-orbitron text-4xl text-[#E6EDF3] font-light tracking-wider mb-1">
              v0.4<span className="text-[#DC143C] font-bold">a</span>
            </p>
            <p className="font-inter text-xs text-[#DC143C]/80 uppercase tracking-widest mb-6">
              Branch: Mainline / Nightly
            </p>

            <button className="w-full font-orbitron text-xs py-4 border border-[#DC143C] bg-[#DC143C]/10 text-[#DC143C] hover:bg-[#DC143C] hover:text-[#010409] transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_10px_rgba(220,20,60,0.2)] mb-4">
              Download Client (.PAK)
            </button>

            <div className="flex flex-col gap-2 mt-2 border-t border-[#DC143C]/20 pt-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8B949E]">
                <span>Engine Version:</span>
                <span className="text-[#E6EDF3]">UE 5.4.2</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#8B949E]">
                <span>Compiled:</span>
                <span className="text-[#E6EDF3]">04:00 AM (Automated)</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Server Status */}
          <div className="glass-panel clip-angled flex flex-col p-6 border-l-2 border-l-[#8B949E] opacity-90">
            <h3 className="font-orbitron text-[#E6EDF3] text-xs font-bold tracking-widest uppercase mb-4">
              Infrastructure Status
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-center">
                <span className="font-inter text-[10px] text-[#8B949E] uppercase tracking-widest">Master Auth Server</span>
                <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_5px_#50C878]"></span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="font-inter text-[10px] text-[#8B949E] uppercase tracking-widest">Matchmaking API</span>
                <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_5px_#50C878]"></span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="font-inter text-[10px] text-[#8B949E] uppercase tracking-widest">Dedicated Instance #01</span>
                <span className="w-2 h-2 rounded-full bg-[#FFBF00] shadow-[0_0_5px_#FFBF00] animate-pulse"></span>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: DEV LOGS & PIPELINE
            ========================================================= */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          <h2 className="font-orbitron text-[#E6EDF3] text-lg font-bold tracking-widest uppercase border-b border-[#E6EDF3]/10 pb-2">
            Latest Commits & Pipeline
          </h2>

          {/* Commit Log Matrix */}
          <div className="glass-panel rounded-lg overflow-hidden border border-[#DC143C]/20 flex flex-col">
            
            {/* Header */}
            <div className="grid grid-cols-12 bg-[#010409]/80 border-b border-[#DC143C]/20 p-4">
              <div className="col-span-2 font-orbitron text-[10px] text-[#DC143C] uppercase tracking-widest">Hash</div>
              <div className="col-span-8 font-orbitron text-[10px] text-[#8B949E] uppercase tracking-widest">Commit Message</div>
              <div className="col-span-2 font-orbitron text-[10px] text-[#E6EDF3] text-right uppercase tracking-widest">Author</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              
              <div className="grid grid-cols-12 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#DC143C]/5 transition-colors items-center">
                <div className="col-span-2 font-mono text-[10px] text-[#DC143C]">f8a91b2</div>
                <div className="col-span-8 font-inter text-xs text-[#E6EDF3]">Fixed Hi Handy UI overlapping with inventory screen widgets.</div>
                <div className="col-span-2 font-mono text-[10px] text-[#8B949E] text-right">Harrison</div>
              </div>

              <div className="grid grid-cols-12 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#DC143C]/5 transition-colors items-center">
                <div className="col-span-2 font-mono text-[10px] text-[#DC143C]">c3d4e5f</div>
                <div className="col-span-8 font-inter text-xs text-[#E6EDF3]">Re-baked Lumen lighting on Sector 4 map geometry.</div>
                <div className="col-span-2 font-mono text-[10px] text-[#8B949E] text-right">Harrison</div>
              </div>

              <div className="grid grid-cols-12 p-4 border-b border-[#E6EDF3]/5 hover:bg-[#DC143C]/5 transition-colors items-center">
                <div className="col-span-2 font-mono text-[10px] text-[#DC143C]">a1b2c3d</div>
                <div className="col-span-8 font-inter text-xs text-[#E6EDF3]">Weapon recoil curve adjustments for assault rifle.</div>
                <div className="col-span-2 font-mono text-[10px] text-[#8B949E] text-right">Harrison</div>
              </div>

              <div className="grid grid-cols-12 p-4 hover:bg-[#DC143C]/5 transition-colors items-center">
                <div className="col-span-2 font-mono text-[10px] text-[#DC143C] opacity-50">9z8y7x6</div>
                <div className="col-span-8 font-inter text-xs text-[#8B949E]">Implemented basic multiplayer session finding.</div>
                <div className="col-span-2 font-mono text-[10px] text-[#8B949E] text-right">Harrison</div>
              </div>

            </div>
          </div>

          {/* Render Queue Stub */}
          <div className="holographic-card clip-angled flex flex-col p-6 border-l-4 border-l-[#FFBF00] mt-2">
             <div className="flex flex-row justify-between items-center mb-2">
                <h3 className="font-orbitron text-[#FFBF00] text-xs font-bold tracking-widest uppercase">
                  Asset Render Queue
                </h3>
                <span className="font-mono text-[10px] text-[#FFBF00] animate-pulse">PROCESSING (1)</span>
             </div>
             
             <div className="w-full bg-[#010409] h-2 mt-2 rounded overflow-hidden">
                <div className="bg-[#FFBF00] h-full w-[65%] shadow-[0_0_8px_#FFBF00]"></div>
             </div>
             <p className="font-mono text-[10px] text-[#8B949E] mt-2">Compiling Shaders (4,032 / 6,200)...</p>
          </div>

        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/blood-yield/page.tsx --- */