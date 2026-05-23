/* --- START OF FILE app/dashboard/hi-handy/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | HI HANDY SUITE (DOWNLOAD HUB)
 * =========================================================================
 * Dynamically evaluates the user's D1 Database License Tier to unlock
 * access to the Hi Handy Unreal Engine 5 Plugin files.
 * Highlights exact C++ and Python features from the source codebase.
 */
export default function HiHandyDownloadHub() {
  // Safe SSR Context Binding
  const sessionContext = useSession();
  const session = sessionContext?.data;
  
  const [activeTier, setActiveTier] = useState<string>("LITE");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Sync with D1 Database State
  useEffect(() => {
    const dbTier = (session?.user as any)?.tier;
    if (dbTier) {
      setActiveTier(dbTier.toUpperCase());
    }
  }, [session]);

  const handleDownload = () => {
    if (activeTier === "LITE") return; // Security lock
    
    setIsDownloading(true);
    // Simulate secure compilation/download delay
    setTimeout(() => {
      setIsDownloading(false);
      // In production, this would hit an API endpoint that generates a secure AWS/R2 signed URL
      window.open("https://github.com/Cameron-Harrison-Interactive/HarrisonInteractive-Web", "_blank");
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col relative z-10">
      
      {/* PAGE HEADER */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
            Hi Handy Suite
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block">
            Plugin Distribution Vault
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          Download the latest C++ and Python Binaries for Unreal Engine 5
        </p>
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-10">
        
        {/* =========================================================
            LEFT COLUMN: THE DOWNLOAD VAULT & SPECS
            ========================================================= */}
        <div className="w-full xl:w-[450px] flex-shrink-0 flex flex-col gap-8">
          
          {/* THE VAULT DOOR (DYNAMIC ACCESS) */}
          <div className={`holographic-card clip-angled flex flex-col p-8 border-t-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500 bg-[#010409]/95 ${
            activeTier !== 'LITE' ? 'border-t-[#50C878] shadow-[0_0_30px_rgba(80,200,120,0.15)]' : 'border-t-[#DC143C] shadow-[0_0_30px_rgba(220,20,60,0.15)]'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br blur-[30px] opacity-20 pointer-events-none z-0 ${
              activeTier !== 'LITE' ? 'from-[#50C878] to-transparent' : 'from-[#DC143C] to-transparent'
            }`}></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10 border-b border-white/10 pb-3">
              <h2 className="font-orbitron text-lg font-bold tracking-widest uppercase text-[#E6EDF3]">
                Plugin Binaries
              </h2>
              <span className={`px-3 py-1 text-[9px] font-mono font-bold tracking-widest rounded uppercase ${
                activeTier !== 'LITE' ? 'bg-[#50C878]/20 text-[#50C878] border border-[#50C878]/50' : 'bg-[#DC143C]/20 text-[#DC143C] border border-[#DC143C]/50'
              }`}>
                {activeTier !== 'LITE' ? 'ACCESS GRANTED' : 'VAULT LOCKED'}
              </span>
            </div>

            <div className="flex flex-col gap-2 font-mono text-[11px] text-[#8B949E] mb-8 relative z-10">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Version:</span>
                <span className="text-[#00BFFF] font-bold">v2.5.0-ULTIMATE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Engine Compatibility:</span>
                <span className="text-[#E6EDF3] font-bold">UE 5.0 — 5.4+</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Compiled Size:</span>
                <span className="text-[#E6EDF3] font-bold">~ 48.2 MB</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Local AI Weights:</span>
                <span className="text-[#50C878] font-bold">Auto-Download via App</span>
              </div>
            </div>

            {/* DYNAMIC DOWNLOAD BUTTON */}
            {activeTier !== 'LITE' ? (
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="clip-angled-button w-full py-4 bg-[#50C878]/10 border border-[#50C878]/50 hover:bg-[#50C878] hover:text-[#010409] transition-all font-orbitron font-black tracking-[0.2em] uppercase text-xs text-[#50C878] hover:shadow-[0_0_20px_rgba(80,200,120,0.6)] relative z-10 disabled:opacity-50"
              >
                {isDownloading ? "[ SECURING PAYLOAD... ]" : "DOWNLOAD PLUGIN .ZIP"}
              </button>
            ) : (
              <div className="flex flex-col gap-3 relative z-10">
                <button disabled className="clip-angled-button w-full py-4 bg-[#DC143C]/5 border border-[#DC143C]/30 text-[#DC143C]/50 font-orbitron font-black tracking-[0.2em] uppercase text-xs cursor-not-allowed">
                  REQUIRES ACTIVE LICENSE
                </button>
                <a href="/dashboard/billing" className="text-center font-mono text-[10px] text-[#FFBF00] hover:text-white uppercase tracking-widest transition-colors">
                  [ Upgrade Matrix to Unlock ]
                </a>
              </div>
            )}
          </div>

          {/* INSTALLATION INSTRUCTIONS */}
          <div className="glass-panel clip-angled p-6 relative overflow-hidden flex flex-col bg-[#000] border-l-2 border-[#00BFFF]/50">
            <h3 className="font-orbitron text-[#00BFFF] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Installation Protocol
            </h3>
            <ul className="font-mono text-[10px] text-[#8B949E] flex flex-col gap-3 leading-relaxed list-decimal pl-4">
              <li>Extract the downloaded <strong className="text-[#E6EDF3]">HiHandy_v2.5.zip</strong> archive.</li>
              <li>Navigate to your Unreal Engine Project root directory.</li>
              <li>Drop the extracted <strong className="text-[#E6EDF3]">Handy</strong> folder into your <strong className="text-[#E6EDF3]">/Plugins</strong> directory (Create the folder if it does not exist).</li>
              <li>Launch your .uproject. The engine will prompt you to rebuild the <strong className="text-[#00BFFF]">HandyForge</strong> and <strong className="text-[#00BFFF]">HandyMentor</strong> C++ modules. Click Yes.</li>
            </ul>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: THE MODULE ARCHITECTURE
            ========================================================= */}
        <div className="w-full flex-1 flex flex-col gap-6">
          <h2 className="font-orbitron text-[#E6EDF3] text-xl font-bold tracking-[0.2em] uppercase border-b border-[#E6EDF3]/10 pb-3">
            Core Architecture Specs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OMNI-GRAPH ARCHITECT */}
            <div className="holographic-card clip-angled flex flex-col p-6 bg-[#010409]/80 border-t-2 border-[#00BFFF] hover:bg-[#00BFFF]/5 transition-colors group">
              <h3 className="font-orbitron text-sm font-bold text-[#00BFFF] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="text-lg">⚡</span> Omni-Graph Architect
              </h3>
              <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed mb-3">
                Powered by the native C++ <strong className="text-[#E6EDF3]">HandyForgeLibrary</strong>. Instantly translates LLM Python structures into complex, compiled Blueprint nodes via deep AST reflection.
              </p>
              <div className="mt-auto pt-3 border-t border-[#00BFFF]/20">
                <span className="text-[9px] font-mono text-[#00BFFF]/70 uppercase tracking-widest block">Core Module:</span>
                <span className="text-[10px] font-mono text-[#00BFFF] font-bold">action_ast_engine.py</span>
              </div>
            </div>

            {/* THE NEURAL BOUNCER */}
            <div className="holographic-card clip-angled flex flex-col p-6 bg-[#010409]/80 border-t-2 border-[#FF00FF] hover:bg-[#FF00FF]/5 transition-colors group">
              <h3 className="font-orbitron text-sm font-bold text-[#FF00FF] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="text-lg">🛡️</span> The Neural Bouncer
              </h3>
              <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed mb-3">
                Hooks directly into Slate using <strong className="text-[#E6EDF3]">FHandyMentorInputProcessor</strong>. Intercepts Alt+Right-Clicks across the editor to provide instant, contextual explanations for any node or setting.
              </p>
              <div className="mt-auto pt-3 border-t border-[#FF00FF]/20">
                <span className="text-[9px] font-mono text-[#FF00FF]/70 uppercase tracking-widest block">Core Module:</span>
                <span className="text-[10px] font-mono text-[#FF00FF] font-bold">HandyMentorInputProcessor.cpp</span>
              </div>
            </div>

            {/* SPATIAL GENIE */}
            <div className="holographic-card clip-angled flex flex-col p-6 bg-[#010409]/80 border-t-2 border-[#50C878] hover:bg-[#50C878]/5 transition-colors group">
              <h3 className="font-orbitron text-sm font-bold text-[#50C878] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="text-lg">🌍</span> Spatial Genie Engine
              </h3>
              <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed mb-3">
                Scans the project registry natively and executes procedural environment generation. Features automated Z-axis raycast grounding to prevent floating meshes.
              </p>
              <div className="mt-auto pt-3 border-t border-[#50C878]/20">
                <span className="text-[9px] font-mono text-[#50C878]/70 uppercase tracking-widest block">Core Module:</span>
                <span className="text-[10px] font-mono text-[#50C878] font-bold">handy_world_forge.py</span>
              </div>
            </div>

            {/* ECONOMY & NETOPS */}
            <div className="holographic-card clip-angled flex flex-col p-6 bg-[#010409]/80 border-t-2 border-[#FFBF00] hover:bg-[#FFBF00]/5 transition-colors group">
              <h3 className="font-orbitron text-sm font-bold text-[#FFBF00] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="text-lg">💳</span> Economy & NetOps
              </h3>
              <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed mb-3">
                One-click multiplayer pipeline. Automatically modifies <strong className="text-[#E6EDF3]">DefaultEngine.ini</strong> and dynamically wires blueprint wrappers for PlayFab, Xsolla, Stripe, Steam, and EOS.
              </p>
              <div className="mt-auto pt-3 border-t border-[#FFBF00]/20">
                <span className="text-[9px] font-mono text-[#FFBF00]/70 uppercase tracking-widest block">Core Module:</span>
                <span className="text-[10px] font-mono text-[#FFBF00] font-bold">action_economy_forge.py</span>
              </div>
            </div>

            {/* LOCAL SANDBOX */}
            <div className="holographic-card clip-angled flex flex-col p-6 bg-[#010409]/80 border-t-2 border-[#E6EDF3] hover:bg-[#E6EDF3]/5 transition-colors group md:col-span-2">
              <h3 className="font-orbitron text-sm font-bold text-[#E6EDF3] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="text-lg">🧠</span> Multi-Node AI Routing Matrix
              </h3>
              <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed mb-3">
                Hi Handy doesn't just rely on the Cloud. It dynamically queries your GPU (NVIDIA/AMD/Intel/Apple Silicon) at boot and spawns a native <strong className="text-[#E6EDF3]">llama-server</strong> instance in the background. This ensures total Air-Gapped security for your proprietary game code.
              </p>
              <div className="mt-auto pt-3 border-t border-[#E6EDF3]/20 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono text-[#E6EDF3]/50 uppercase tracking-widest block">Core Module:</span>
                  <span className="text-[10px] font-mono text-[#E6EDF3] font-bold">handy_omni_network.py</span>
                </div>
                <span className="text-[9px] font-mono text-[#50C878] border border-[#50C878]/30 px-2 py-1 rounded bg-[#50C878]/10 animate-pulse">
                  PORT 11435 ACTIVE
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/hi-handy/page.tsx --- */