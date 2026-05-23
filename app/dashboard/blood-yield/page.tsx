/* --- START OF FILE app/dashboard/blood-yield/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | BLOOD-YIELD DEV HUB (UNLEASHED)
 * =========================================================================
 * Thematic override. Shifts the JARVIS Blue/Cyan matrix into the 
 * Viking Gothic Crimson/Gold aesthetic of the Blood-Yield project.
 */
export default function BloodYieldHub() {
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [mawYield, setMawYield] = useState<string>("5.00%");

  // Simulated live economy fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      const fluctuation = (5.00 + (Math.random() * 0.04 - 0.02)).toFixed(2);
      setMawYield(`${fluctuation}%`);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const triggerPhaseShift = (node: string) => {
    setIsSyncing(node);
    setTimeout(() => {
      setIsSyncing(null);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col relative z-10">
      
      {/* 
        =========================================================
        THEMATIC HEADER (CRIMSON & GOLD)
        =========================================================
      */}
      <div className="w-full flex flex-col mb-10 border-b border-[#8B0000]/50 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-3xl md:text-4xl text-[#F9D423] font-black uppercase tracking-[0.15em] drop-shadow-[0_0_15px_rgba(249,212,35,0.6)]">
            Blood-Yield
          </h1>
          <span className="px-3 py-1 bg-[#8B0000]/20 border border-[#8B0000] text-[#8B0000] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block shadow-[0_0_10px_rgba(139,0,0,0.5)]">
            VIKING GOTHIC MATRIX
          </span>
        </div>
        <p className="font-inter text-xs text-[#C0C0C0] uppercase tracking-widest mt-2">
          Project Designation: Dark Fantasy RPG / RMT Economy Simulator
        </p>
      </div>

      {/* UNLEASHED GRID LAYOUT */}
      <div className="w-full flex flex-col xl:flex-row gap-10">
        
        {/* =========================================================
            LEFT COLUMN: THE LORE & ECONOMY (THE MAW)
            ========================================================= */}
        <div className="w-full xl:w-[450px] flex-shrink-0 flex flex-col gap-8">
          
          {/* The Ashen Convergence (Context) */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-t-4 border-t-[#8B0000] shadow-[0_0_20px_rgba(139,0,0,0.2)] relative overflow-hidden group bg-[#050505]/95">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/10 to-transparent blur-[30px] opacity-40 group-hover:opacity-60 transition-opacity z-0 pointer-events-none"></div>
            
            <h2 className="font-orbitron text-lg font-bold tracking-[0.2em] uppercase text-[#F9D423] relative z-10 mb-2 border-b border-[#F9D423]/20 pb-2">
              The Ashen Convergence
            </h2>
            <p className="font-mono text-[11px] text-[#C0C0C0] leading-relaxed mb-4 relative z-10">
              Heimr was not grown; it was rendered. Prior to the crash, this sector was a pristine partition running on the <strong className="text-[#00D2FF]">Handy</strong> kernel.
            </p>
            <p className="font-mono text-[11px] text-[#C0C0C0] leading-relaxed mb-4 relative z-10">
              An aggressive industrial overclocking fractured the world's source code. The vibrant UI colors were sucked into the void, leaving behind a reality desaturated to <strong className="text-[#C0C0C0]">Brushed Silver</strong>.
            </p>

            <div className="flex flex-col gap-2 relative z-10 border-l-2 border-[#8A3324] pl-3 bg-[#8A3324]/10 py-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">Soul-Blight Limit</span>
                <span className="font-orbitron text-xs text-[#8B0000] font-bold">80% PENALTY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">Data Conversion</span>
                <span className="font-orbitron text-xs text-[#F9D423] font-bold">1,024 $vb$ : 1 $KV$</span>
              </div>
            </div>
          </div>

          {/* The Maw (De-Compilation Pit) */}
          <div className="glass-panel clip-angled p-8 relative overflow-hidden flex flex-col shadow-[inset_0_0_40px_rgba(138,51,36,0.15)] bg-[#050505] border-2 border-dashed border-[#8A3324]">
            <div className="flex justify-between items-center mb-6 border-b border-[#8A3324] pb-3 relative z-20">
              <h3 className="font-orbitron text-[#d32f2f] text-lg font-black tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(211,47,47,0.6)]">
                The Maw
              </h3>
              <span className="font-mono text-[9px] text-[#F9D423] animate-pulse border border-[#F9D423]/50 px-2 py-0.5">RECYCLE_BIN</span>
            </div>

            <p className="font-mono text-[10px] text-[#C0C0C0] opacity-80 mb-6 leading-relaxed">
              When Bio-Armor succumbs to the Soul-Blight penalty, it must be sacrificed. The Handy kernel executes a violent data-scavenge, extracting uncorrupted base code.
            </p>

            <div className="flex flex-col items-center justify-center p-6 border border-[#F9D423]/50 bg-[#F9D423]/5 mb-6">
              <span className="font-orbitron text-5xl font-black text-[#F9D423] drop-shadow-[0_0_15px_rgba(249,212,35,0.4)] mb-2">
                {mawYield}
              </span>
              <span className="font-mono text-[10px] text-[#C0C0C0] tracking-[0.2em] uppercase">Guaranteed Kilo-Vial Yield</span>
              <span className="font-mono text-[9px] text-[#00D2FF] tracking-[0.2em] uppercase mt-3">+ 0.01% CHANCE: COLD_IRON</span>
            </div>

            <button 
              onClick={() => triggerPhaseShift("maw")}
              disabled={isSyncing !== null}
              className="clip-angled-button w-full py-4 transition-all font-futura font-black tracking-[0.3em] uppercase text-[12px] relative z-10 shrink-0 border-2 border-[#d32f2f] text-[#d32f2f] hover:bg-[#d32f2f] hover:text-[#fff] hover:shadow-[0_0_20px_rgba(211,47,47,0.6)] disabled:opacity-50"
            >
              {isSyncing === "maw" ? "DE-COMPILING..." : "AUTHORIZE SACRIFICE"}
            </button>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: SECTOR NODES & BIFROST COMMS
            ========================================================= */}
        <div className="w-full flex-1 flex flex-col gap-8">
          
          <div className="flex flex-row justify-between items-end border-b border-[#8A3324]/30 pb-2">
            <h2 className="font-orbitron text-[#C0C0C0] text-xl font-bold tracking-[0.2em] uppercase">
              Heimr Geography
            </h2>
            <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest hidden sm:block">
              Select Sector to Initiate Phase-Shift
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Hjärta Hub */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-t-4 border-l-0 border-[#00D2FF] hover:bg-[#00D2FF]/5 transition-colors bg-[#0A0A0A]">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-orbitron text-lg text-[#fff] font-bold tracking-widest uppercase">
                  HJÄRTA HUB
                </h3>
                <span className="font-mono text-[8px] text-[#C0C0C0] opacity-60 text-right">NODE: 0x001<br/>BIOS_CORE</span>
              </div>
              <p className="font-mono text-[11px] text-[#C0C0C0] leading-relaxed opacity-80 mb-4 flex-1">
                The central BIOS. Neutral ground for exchanging Kilo-Vials ($KV$). The <strong className="text-[#00D2FF]">Handy</strong> kernel stabilizes the Black Oily Waygates here.
              </p>
              <button 
                onClick={() => triggerPhaseShift("hjarta")}
                className="w-full py-2 border border-[#00D2FF]/30 text-[9px] font-orbitron tracking-[0.2em] uppercase text-[#00D2FF] hover:bg-[#00D2FF] hover:text-[#000] transition-colors"
              >
                {isSyncing === "hjarta" ? "PHASE-SHIFTING..." : "WAYGATE UPLINK"}
              </button>
            </div>

            {/* Iron Barrens */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-t-4 border-l-0 border-[#8B0000] hover:bg-[#8B0000]/5 transition-colors bg-[#0A0A0A]">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-orbitron text-lg text-[#fff] font-bold tracking-widest uppercase">
                  IRON BARRENS
                </h3>
                <span className="font-mono text-[8px] text-[#C0C0C0] opacity-60 text-right">NODE: 0x002<br/>UNALLOCATED</span>
              </div>
              <p className="font-mono text-[11px] text-[#C0C0C0] leading-relaxed opacity-80 mb-4 flex-1">
                The unallocated PvE sector. Terrain is raw Technical Drafting Paper. Reapers deploy here to scavenge loose Vial-Bits ($vb$) from Husks.
              </p>
              <button 
                onClick={() => triggerPhaseShift("iron")}
                className="w-full py-2 border border-[#8B0000]/30 text-[9px] font-orbitron tracking-[0.2em] uppercase text-[#8B0000] hover:bg-[#8B0000] hover:text-[#fff] transition-colors"
              >
                {isSyncing === "iron" ? "PHASE-SHIFTING..." : "WAYGATE UPLINK"}
              </button>
            </div>

            {/* Hallowed Plots */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-t-4 border-l-0 border-[#00FF88] hover:bg-[#00FF88]/5 transition-colors bg-[#0A0A0A] xl:col-span-2">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-orbitron text-lg text-[#fff] font-bold tracking-widest uppercase">
                  HALLOWED PLOTS
                </h3>
                <span className="font-mono text-[8px] text-[#C0C0C0] opacity-60 text-right">NODE: 0x004<br/>PARTITION</span>
              </div>
              <p className="font-mono text-[11px] text-[#C0C0C0] leading-relaxed opacity-80 mb-4">
                Sovereign user-partitions. Sowers use Handy editor tools to graft Yggdrasil-Link fiber-optics into the soil, creating refining stations. Protected strictly by the Guest Protocol firewall.
              </p>
              <button 
                onClick={() => triggerPhaseShift("plots")}
                className="w-full py-2 border border-[#00FF88]/30 text-[9px] font-orbitron tracking-[0.2em] uppercase text-[#00FF88] hover:bg-[#00FF88] hover:text-[#000] transition-colors"
              >
                {isSyncing === "plots" ? "PHASE-SHIFTING..." : "WAYGATE UPLINK"}
              </button>
            </div>

          </div>

          {/* --- BIFROST COMMS TERMINAL --- */}
          <div className="mt-4 relative overflow-hidden bg-[#000] border border-[#4A4E69] p-6 shadow-[0_8px_30px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-4 border-b border-[#00D2FF] pb-2 relative z-20">
              <h3 className="font-orbitron text-[#00D2FF] text-xs font-bold tracking-[0.2em] uppercase">
                BIFROST_COMMS_FEED
              </h3>
              <span className="font-mono text-[9px] text-[#F9D423] animate-pulse">LIVE UPLINK</span>
            </div>

            <div className="font-mono text-[11px] text-[#4A4E69] flex flex-col gap-3 overflow-y-auto max-h-48 relative z-20">
              <div className="border-b border-white/5 pb-1">
                <span className="text-[#F9D423]">[LFG]</span> <span className="text-[#C0C0C0]">Reaper_77: "Need two for Iron Barrens deep dive. High $vb$ yield."</span>
              </div>
              <div className="border-b border-white/5 pb-1">
                <span className="text-[#00FF88]">[TRADE]</span> <span className="text-[#C0C0C0]">Sower_0x: "Selling Tier 3 Compression. 50 $KV$ per stack. Meet at Hjärta Gate."</span>
              </div>
              <div className="border-b border-white/5 pb-1">
                <span className="text-[#8B0000]">[SYS]</span> <span className="text-[#C0C0C0]">SERVER: "Maw yield rates normalizing to 5.0%."</span>
              </div>
              <div className="border-b border-white/5 pb-1">
                <span className="text-[#F9D423]">[LFG]</span> <span className="text-[#C0C0C0]">Architect_X: "Looking for verified Sower guild. Have Plot in Node_004."</span>
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-[#00D2FF]/50 select-none">{'>'}</span>
                <p className="text-[#00D2FF] animate-pulse bg-[#00D2FF] w-2 h-3 mt-1"></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/blood-yield/page.tsx --- */