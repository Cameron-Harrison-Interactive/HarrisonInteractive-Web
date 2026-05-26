/* --- START OF FILE app/dashboard/hi-handy/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | HI HANDY SUITE (UNLEASHED & SECURED)
 * =========================================================================
 * The main portal for downloading the Hi Handy Neural Engine.
 * Features D1 Database Tier locks and the expanded AAA capability matrix.
 */
export default function HiHandySuite() {
  // Safe SSR Context Binding
  const sessionContext = useSession();
  const session = sessionContext?.data;
  
  const [activeTier, setActiveTier] = useState<string>("LITE");
  const [downloadState, setDownloadState] = useState<"IDLE" | "PACKAGING" | "READY">("IDLE");
  const [logs, setLogs] = useState<string[]>([
    "[SYS] Hi Handy Repository uplink established.",
    "[SYS] Scanning active Unreal Engine 5 environment constraints..."
  ]);

  // Sync with D1 Database State
  useEffect(() => {
    const dbTier = (session?.user as any)?.tier;
    if (dbTier) {
      setActiveTier(dbTier.toUpperCase());
    }
  }, [session]);

  const triggerDownload = () => {
    if (activeTier === "LITE") return; // Security lock

    if (downloadState === "READY") {
      window.open("https://github.com/Cameron-Harrison-Interactive/HarrisonInteractive-Web", "_blank");
      return;
    }

    setDownloadState("PACKAGING");
    setLogs(prev => [...prev, "> Initiating Chrono-Sync for Hi Handy v2.5..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "> Compiling HandyForge.dll native C++ binaries..."]);
    }, 800);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "> Injecting Local Llama.cpp inference models..."]);
    }, 1600);

    setTimeout(() => {
      setLogs(prev => [...prev, "[SUCCESS] Payload compressed. Ready for extraction."]);
      setDownloadState("READY");
    }, 2500);
  };

  return (
    <div className="w-full flex flex-col relative z-10">
      
      {/* PAGE HEADER */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
            Hi Handy Neural Suite
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block">
            V2.5 MASTER KERNEL
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          Unreal Engine 5 AI Architect & Native Integration Matrix
        </p>
      </div>

      {/* UNLEASHED GRID LAYOUT */}
      <div className="w-full flex flex-col xl:flex-row gap-10">
        
        {/* =========================================================
            LEFT COLUMN: DOWNLOAD & INSTALLATION MATRIX
            ========================================================= */}
        <div className="w-full xl:w-[450px] flex-shrink-0 flex flex-col gap-8">
          
          {/* THE VAULT DOOR (DYNAMIC ACCESS) */}
          <div className={`holographic-card clip-angled flex flex-col p-8 border-t-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500 bg-[#010409]/95 group ${
            activeTier !== 'LITE' ? 'border-t-[#50C878] shadow-[0_0_30px_rgba(80,200,120,0.15)]' : 'border-t-[#DC143C] shadow-[0_0_30px_rgba(220,20,60,0.15)]'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br blur-[30px] opacity-20 pointer-events-none z-0 group-hover:opacity-40 transition-opacity ${
              activeTier !== 'LITE' ? 'from-[#50C878] to-transparent' : 'from-[#DC143C] to-transparent'
            }`}></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10 border-b border-white/10 pb-3">
              <h2 className="font-orbitron text-lg font-bold tracking-widest uppercase text-[#E6EDF3]">
                Plugin Binaries
              </h2>
              <span className={`px-3 py-1 text-[9px] font-mono font-bold tracking-widest rounded uppercase ${
                activeTier !== 'LITE' ? 'bg-[#50C878]/20 text-[#50C878] border border-[#50C878]/50' : 'bg-[#DC143C]/20 text-[#DC143C] border border-[#DC143C]/50 animate-pulse'
              }`}>
                {activeTier !== 'LITE' ? 'ACCESS GRANTED' : 'VAULT LOCKED'}
              </span>
            </div>

            <div className="flex flex-col gap-2 font-mono text-[11px] text-[#8B949E] mb-8 relative z-10 border-l-2 border-white/10 pl-3 bg-white/5 py-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Version:</span>
                <span className="text-[#00BFFF] font-bold">v2.5.0-ULTIMATE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Target Engine:</span>
                <span className="text-[#E6EDF3] font-bold">UE 5.0 — 5.4+</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Compiled Size:</span>
                <span className="text-[#E6EDF3] font-bold">~ 420 MB</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>C++ Core:</span>
                <span className="text-[#50C878] font-bold">HandyForge.dll</span>
              </div>
            </div>

            {/* DYNAMIC DOWNLOAD BUTTON */}
            {activeTier !== 'LITE' ? (
              <button 
                onClick={triggerDownload}
                disabled={downloadState === "PACKAGING"}
                className={`clip-angled-button w-full py-4 transition-all font-futura font-black tracking-[0.3em] uppercase text-[13px] relative z-10 shrink-0 shadow-[0_0_15px_rgba(80,200,120,0.3)] hover:shadow-[0_0_25px_rgba(80,200,120,0.6)] ${downloadState === 'READY' ? 'bg-[#50C878] text-[#010409] border-[#50C878]' : 'bg-[#50C878]/10 border border-[#50C878]/40 hover:bg-[#50C878] hover:text-[#010409] text-[#50C878]'}`}
              >
                {downloadState === "IDLE" ? "EXTRACT BINARIES" : downloadState === "PACKAGING" ? "[ PACKAGING... ]" : "DOWNLOAD HI_HANDY.ZIP"}
              </button>
            ) : (
              <div className="flex flex-col gap-3 relative z-10">
                <button disabled className="clip-angled-button w-full py-4 bg-[#DC143C]/5 border border-[#DC143C]/30 text-[#DC143C]/50 font-orbitron font-black tracking-[0.2em] uppercase text-xs cursor-not-allowed">
                  REQUIRES ACTIVE LICENSE
                </button>
                <a href="/dashboard/billing" className="text-center font-mono text-[10px] text-[#FFBF00] hover:text-white uppercase tracking-widest transition-colors mt-2">
                  [ Upgrade Matrix to Unlock ]
                </a>
              </div>
            )}
          </div>

          {/* Installation Terminal */}
          <div className="glass-panel clip-angled p-6 relative overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,1)] bg-[#000]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-10"></div>
            
            <div className="flex justify-between items-center mb-4 border-b border-[#50C878]/20 pb-2 relative z-20">
              <h3 className="font-orbitron text-[#50C878] text-xs font-bold tracking-[0.2em] uppercase">
                Setup_Protocols.log
              </h3>
              {downloadState === "PACKAGING" && <span className="font-mono text-[9px] text-[#00BFFF] animate-pulse">WRITING...</span>}
            </div>

            <div className="font-mono text-[10px] text-[#8B949E] flex flex-col gap-2 overflow-y-auto max-h-[300px] relative z-20 pl-2">
              <p className="text-[#E6EDF3]">1. Extract the downloaded .zip archive.</p>
              <p className="text-[#E6EDF3]">2. Move the <span className="text-[#00BFFF]">HiHandy</span> folder into your Unreal Project's <span className="text-[#00BFFF]">/Plugins/</span> directory.</p>
              <p className="text-[#E6EDF3]">3. Launch Unreal Engine.</p>
              <p className="text-[#E6EDF3]">4. Ensure the following dependencies are active:</p>
              <ul className="pl-4 text-slate-500 list-disc flex flex-col gap-1">
                <li>PythonScriptPlugin</li>
                <li>EditorScriptingUtilities</li>
                <li>WebBrowserWidget</li>
              </ul>
              <p className="text-[#E6EDF3] mt-2 border-b border-white/5 pb-4">5. Click the <span className="text-[#50C878] font-bold">Hi Handy</span> icon in the top Play toolbar to initialize the JARVIS terminal.</p>
              
              <div className="pt-2 flex flex-col gap-2 mt-2">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-[#50C878]/50 select-none">{'>'}</span>
                    <p className={`${log.includes('[SUCCESS]') ? 'text-[#50C878] drop-shadow-[0_0_3px_#50C878]' : 'text-[#00BFFF]'}`}>{log}</p>
                  </div>
                ))}
                {downloadState === "PACKAGING" && (
                  <div className="flex gap-2 mt-1">
                    <span className="text-[#50C878]/50 select-none">{'>'}</span>
                    <p className="text-[#50C878] animate-pulse bg-[#50C878] w-2 h-3 mt-0.5"></p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: MODULE CAPABILITIES MATRIX
            ========================================================= */}
        <div className="w-full flex-1 flex flex-col gap-8">
          
          <div className="flex flex-row justify-between items-end border-b border-[#E6EDF3]/10 pb-2">
            <h2 className="font-orbitron text-[#E6EDF3] text-xl font-bold tracking-[0.2em] uppercase">
              Core Module Capabilities
            </h2>
            <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest hidden sm:block">
              Architectural Engine Specifications
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* AST Engine */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-l-[#FFBF00] bg-[#010409]/80 hover:bg-[#FFBF00]/5 transition-colors">
              <h3 className="font-orbitron text-base text-[#FFBF00] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FFBF00] rounded-sm shadow-[0_0_8px_rgba(255,191,0,1)]"></span>
                AST Diagnostic Engine
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed mt-2">
                Bi-directional Abstract Syntax Tree chunking. Isolates logical execution islands to prevent LLM hallucination and automatically wires complex Unreal Blueprint nodes natively via C++.
              </p>
            </div>

            {/* Spatial Genie */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-l-[#50C878] bg-[#010409]/80 hover:bg-[#50C878]/5 transition-colors">
              <h3 className="font-orbitron text-base text-[#50C878] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#50C878] rounded-sm shadow-[0_0_8px_rgba(80,200,120,1)]"></span>
                Spatial Genie
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed mt-2">
                Text-to-World generation. Scans project registries to dynamically scatter meshes, spawn Niagara VFX systems, and mathematically ground actors using raycast floor targeting.
              </p>
            </div>

            {/* Local Sandbox */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-l-[#00BFFF] bg-[#010409]/80 hover:bg-[#00BFFF]/5 transition-colors">
              <h3 className="font-orbitron text-base text-[#00BFFF] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00BFFF] rounded-sm shadow-[0_0_8px_rgba(0,191,255,1)]"></span>
                Local Air-Gapped Matrix
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed mt-2">
                Ships with a proprietary C++ inference server running <span className="text-[#00BFFF]">handy_mentor_lite</span> natively on GPU VRAM. Supports Ollama, Llama.cpp, and totally offline development.
              </p>
            </div>

            {/* Economy Forge */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-l-[#FF00FF] bg-[#010409]/80 hover:bg-[#FF00FF]/5 transition-colors">
              <h3 className="font-orbitron text-base text-[#FF00FF] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF00FF] rounded-sm shadow-[0_0_8px_rgba(255,0,255,1)]"></span>
                Economy & NetOps
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed mt-2">
                Enterprise architecture synthesis. Instantly rewrites DefaultEngine.ini to deploy PlayFab, Xsolla, Stripe, EOS, or Steam API commercial networking loops for massive multiplayer integration.
              </p>
            </div>

            {/* UI Generator */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-l-[#E6EDF3] bg-[#010409]/80 hover:bg-[#E6EDF3]/5 transition-colors xl:col-span-2">
              <h3 className="font-orbitron text-base text-[#E6EDF3] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E6EDF3] rounded-sm shadow-[0_0_8px_rgba(255,255,255,1)]"></span>
                Sovereign UI Compiler
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed mt-2">
                Bridges the LLM's visual layout logic directly into the native UMG Synthesis engine. Parses raw text into functional Editor Utility Widgets with fully-bound Python action hooks and robust parent/child hierarchy resolution.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/hi-handy/page.tsx --- */