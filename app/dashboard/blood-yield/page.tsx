/* --- START OF FILE app/dashboard/blood-yield/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | BLOOD-YIELD MASTER HUB (UNLEASHED & DETAILS)
 * =========================================================================
 * Features a deeply detailed blueprint for the RMT and Cosmetic economy.
 * Pulls user data securely using safe optional chaining (?.) on useSession()
 * to prevent SSR pre-render crashes. Globally upscaled typography.
 */
export default function BloodYieldHub() {
  const sessionContext = useSession();
  const session = sessionContext?.data;

  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [mawYield, setMawYield] = useState<string>("5.00%");
  const [marketIndex, setMarketIndex] = useState<string>("1.02");

  // Simulated live economy fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      const fluctuation = (5.00 + (Math.random() * 0.04 - 0.02)).toFixed(2);
      setMawYield(`${fluctuation}%`);
      setMarketIndex((1.00 + (Math.random() * 0.06 - 0.03)).toFixed(2));
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
    <div className="w-full h-full flex flex-col relative z-10 animate-fade-in">
      
      {/* =========================================================
          THE CINEMATIC HERO HEADER
          ========================================================= */}
      <div className="relative w-full h-[250px] md:h-[350px] xl:h-[400px] overflow-hidden border border-[#8B0000]/30 rounded-lg shadow-[0_0_30px_rgba(139,0,0,0.35)] mb-10 group cursor-pointer">
        {/* Pulsing Crimson Overlay */}
        <div className="absolute inset-0 bg-[#8B0000]/15 group-hover:bg-[#8B0000]/25 transition-colors duration-700 z-10 pointer-events-none"></div>
        {/* Cyberpunk Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10"></div>
        <img 
          src="/by_banner.png" 
          alt="Blood-Yield Cinematic" 
          className="w-full h-full object-cover relative z-0 transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute bottom-6 left-6 z-20 font-orbitron text-xs text-[#F9D423] tracking-[0.4em] uppercase bg-black/60 px-4 py-2 border border-[#8B0000]/50 backdrop-blur-md rounded-sm">
          [ HEIMR // ACTIVE SECTOR ]
        </div>
      </div>

      {/* THEMATIC SUB-HEADER (SCALED) */}
      <div className="w-full flex flex-col mb-10 border-b border-[#8B0000]/50 pb-6">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-3xl md:text-4xl text-[#F9D423] font-black uppercase tracking-[0.15em] drop-shadow-[0_0_12px_rgba(249,212,35,0.6)]">
            Blood-Yield Developer Matrix
          </h1>
          <span className="px-4 py-1.5 bg-[#8B0000]/20 border border-[#8B0000] text-[#8B0000] text-xs font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block shadow-[0_0_10px_rgba(139,0,0,0.5)]">
            ECONOMY ARCHITECTURE
          </span>
        </div>
        <p className="font-inter text-sm text-[#C0C0C0] uppercase tracking-widest mt-2">
          GDD SPECIFICATIONS // REAL-MONEY TRANSACTION MATRIX & SPATIAL ECONOMICS
        </p>
      </div>

      {/* UNLEASHED GRID LAYOUT */}
      <div className="w-full flex flex-col xl:flex-row gap-10 mb-10">
        
        {/* =========================================================
            LEFT COLUMN: THE ASSETS & THE SHREDDER (THE MAW)
            ========================================================= */}
        <div className="w-full xl:w-[450px] flex-shrink-0 flex flex-col gap-8">
          
          {/* The Ashen Convergence */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-t-4 border-t-[#8B0000] shadow-[0_0_20px_rgba(139,0,0,0.2)] relative overflow-hidden group bg-[#050505]/95">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/10 to-transparent blur-[30px] opacity-40 group-hover:opacity-60 transition-opacity z-0 pointer-events-none"></div>
            
            <h2 className="font-orbitron text-lg font-bold tracking-[0.2em] uppercase text-[#F9D423] relative z-10 mb-2 border-b border-[#F9D423]/20 pb-2">
              The Ashen Convergence
            </h2>
            <p className="font-mono text-xs text-[#C0C0C0] leading-relaxed mb-4 relative z-10">
              Heimr was not grown; it was rendered. Prior to the crash, this sector was a pristine partition running on the <strong className="text-[#00D2FF]">Handy</strong> kernel.
            </p>
            <p className="font-mono text-xs text-[#C0C0C0] leading-relaxed mb-4 relative z-10">
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
              <span className="font-mono text-[10px] text-[#F9D423] animate-pulse border border-[#F9D423]/50 px-2 py-0.5">RECYCLE_BIN</span>
            </div>

            <p className="font-mono text-xs text-[#C0C0C0] opacity-80 mb-6 leading-relaxed">
              When Bio-Armor or weapons succumb entirely to the 80% Soul-Blight penalty, they must be sacrificed. The Handy shredder executes a violent data-scavenge, extracting uncorrupted base code.
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
              className="clip-angled-button w-full py-4 transition-all font-futura font-black tracking-[0.3em] uppercase text-[12px] relative z-10 shrink-0 border-2 border-[#d32f2f] text-[#d32f2f] hover:bg-[#d32f2f] hover:text-[#fff] hover:shadow-[0_0_20px_rgba(211,47,47,0.6)] disabled:opacity-50 cursor-pointer"
            >
              {isSyncing === "maw" ? "DE-COMPILING..." : "AUTHORIZE SACRIFICE"}
            </button>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: THE RMT & COSMETIC MARKET BLUEPRINT
            ========================================================= */}
        <div className="w-full flex-1 flex flex-col gap-8">
          
          <div className="flex flex-row justify-between items-end border-b border-[#8A3324]/30 pb-2">
            <h2 className="font-orbitron text-[#C0C0C0] text-xl font-bold tracking-[0.2em] uppercase">
              Monetization Blueprint
            </h2>
            <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest hidden sm:block">
              Harrison Interactive Game Design Document (GDD)
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* Hjärta Secure Exchange (Verified RMT) */}
            <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#F9D423] shadow-[0_0_25px_rgba(249,212,35,0.15)] bg-[#050505]/95 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F9D423]/10 to-transparent blur-[30px] opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4 border-b border-[#F9D423]/20 pb-3">
                <h3 className="font-orbitron text-xl text-[#F9D423] font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(249,212,35,0.6)]">
                  Hjärta RMT Exchange
                </h3>
                <span className="font-mono text-[10px] text-[#50C878] tracking-widest uppercase bg-[#50C878]/10 border border-[#50C878]/40 px-2 py-0.5 rounded-sm">Stripe-Backed</span>
              </div>

              <div className="font-sans text-sm text-[#C0C0C0] leading-relaxed flex flex-col gap-4">
                <p>
                  To eliminate illicit, unsafe third-party gold-selling sites, Blood-Yield integrates a <strong className="text-white">Legal, Developer-Sanctioned RMT Marketplace</strong> directly into the Hjärta Hub.
                </p>
                <p>
                  Players can securely list stable <strong className="text-[#F9D423]">Kilo-Vials ($KV$)</strong>, rare <strong className="text-[#00D2FF]">Cold Iron Shards</strong>, or <strong className="text-[#FF00FF]">Hallowed Plot Blueprints</strong> for real-world currency. Harrison Interactive hosts the ledger, guarantees the trades, and takes a seamless **5% transaction fee** on all cashouts, creating a massive, highly profitable recurring revenue stream.
                </p>
              </div>
            </div>

            {/* Sower-Minted Cosmetic Loop (No Corporate Cash Shop!) */}
            <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#00FF88] shadow-[0_0_25px_rgba(0,255,136,0.15)] bg-[#050505]/95 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF88]/10 to-transparent blur-[30px] opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-4 border-b border-[#00FF88]/20 pb-3">
                <h3 className="font-orbitron text-xl text-[#00FF88] font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]">
                  Sower-Minted Cosmetics
                </h3>
                <span className="font-mono text-[10px] text-[#FF00FF] tracking-widest uppercase bg-[#FF00FF]/10 border border-[#FF00FF]/40 px-2 py-0.5 rounded-sm">No Cash-Shop</span>
              </div>

              <div className="font-sans text-sm text-[#C0C0C0] leading-relaxed flex flex-col gap-4">
                <p>
                  We reject lazy corporate cash-shops. In Blood-Yield, **all premium cosmetics are minted by players**.
                </p>
                <p>
                  When a Reaper survives the deepest layers of the Maw and extracts a <strong className="text-[#00D2FF]">Cold Iron Shard</strong>, they can sell it to a Sower. Sowers use their Yggdrasil-Links to forge these shards into highly detailed, glowing PBR weapon skins and Nanite-powered Bio-Armor. Sowers then sell these legendary cosmetics on the Hjärta Exchange for real cash, creating a perfect symbiosis between PvE combat and economic crafting.
                </p>
              </div>
            </div>

          </div>

          {/* --- BIFROST COMMS TERMINAL (With Biometric Username Integration!) --- */}
          <div className="mt-4 relative overflow-hidden bg-[#000] border border-[#4A4E69] p-6 shadow-[0_8px_30px_rgba(0,0,0,1)]">
            {/* CRT Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10"></div>
            
            <div className="flex justify-between items-center mb-4 border-b border-[#00D2FF] pb-2 relative z-20">
              <h3 className="font-orbitron text-[#00D2FF] text-xs font-bold tracking-[0.2em] uppercase">
                BIFROST_COMMS_FEED // LOBBY_01
              </h3>
              <span className="font-mono text-[9px] text-[#F9D423] animate-pulse">LIVE UPLINK</span>
            </div>

            <div className="font-mono text-sm text-[#4A4E69] flex flex-col gap-3 overflow-y-auto max-h-56 relative z-20">
              <div className="border-b border-white/5 pb-2">
                <span className="text-[#F9D423]">[LFG]</span> <span className="text-[#C0C0C0]">Reaper_77: "Need two for Iron Barrens deep dive. High $vb$ yield."</span>
              </div>
              <div className="border-b border-white/5 pb-2">
                <span className="text-[#00FF88]">[TRADE]</span> <span className="text-[#C0C0C0]">Sower_0x: "Selling Tier 3 Compression. 50 $KV$ per stack. Meet at Hjärta Gate."</span>
              </div>
              
              {/* THE BIOMETRIC CHAT INJECTION */}
              <div className="border-b border-white/5 pb-2 bg-[#00D2FF]/5 p-2 border-l-2 border-[#00D2FF]">
                <span className="text-[#00D2FF] font-bold">[SYS]</span> <span className="text-[#E6EDF3] font-bold">Operator_</span><span className="text-[#00FFFF] font-bold">{session?.user?.name?.replace(" ", "_").toUpperCase() || "DIRECTOR"}</span> <span className="text-[#E6EDF3]">has successfully handshaked with the Hjärta Node. welcome.</span>
              </div>

              <div className="border-b border-white/5 pb-2">
                <span className="text-[#8B0000]">[SYS]</span> <span className="text-[#C0C0C0]">SERVER: "Maw yield rates normalizing to 5.0%."</span>
              </div>
              <div className="border-b border-white/5 pb-2">
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