/* --- START OF FILE app/dashboard/hi-handy/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | HI HANDY SUITE (UNLEASHED)
 * =========================================================================
 * The main portal for downloading and exploring the capabilities of the 
 * Hi Handy Neural Engine. Flexes to the ultra-wide layout.
 */
export default function HiHandySuite() {
  const { data: session } = useSession();
  const [downloadState, setDownloadState] = useState<"IDLE" | "PACKAGING" | "READY">("IDLE");
  const [logs, setLogs] = useState<string[]>([
    "[SYS] Hi Handy Repository uplink established.",
    "[SYS] Scanning active Unreal Engine 5 environment constraints..."
  ]);

  const triggerDownload = () => {
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
          
          {/* Download Action Card */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-t-4 border-t-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/10 to-transparent blur-[30px] opacity-30 group-hover:opacity-60 transition-opacity z-0 pointer-events-none"></div>
            
            <h2 className="font-orbitron text-lg font-bold tracking-widest uppercase text-[#E6EDF3] relative z-10 mb-2">
              System Deployment
            </h2>
            <p className="font-mono text-xs text-[#8B949E] leading-relaxed mb-6 relative z-10">
              Download the official Harrison Interactive plugin architecture. Requires manual injection into your project's <span className="text-[#00BFFF]">/Plugins/</span> directory.
            </p>

            <div className="flex flex-col gap-2 relative z-10 mb-6 border-l-2 border-[#00BFFF]/40 pl-3 bg-[#00BFFF]/5 py-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">Target Engine</span>
                <span className="font-orbitron text-xs text-[#E6EDF3] font-bold">UE 5.0+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">Payload Size</span>
                <span className="font-orbitron text-xs text-[#E6EDF3] font-bold">~420 MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase">C++ Core</span>
                <span className="font-orbitron text-xs text-[#50C878] font-bold animate-pulse">HandyForge.dll</span>
              </div>
            </div>

            <button 
              onClick={triggerDownload}
              disabled={downloadState !== "IDLE"}
              className={`clip-angled-button w-full py-4 transition-all font-futura font-black tracking-[0.3em] uppercase text-[13px] relative z-10 shrink-0 shadow-[0_0_15px_rgba(0,191,255,0.3)] hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] ${downloadState === 'READY' ? 'bg-[#50C878] text-[#010409] border-[#50C878]' : 'bg-[#00BFFF]/10 border border-[#00BFFF]/40 hover:bg-[#00BFFF] hover:text-[#010409] text-[#00BFFF]'}`}
            >
              {downloadState === "IDLE" ? "EXTRACT BINARIES" : downloadState === "PACKAGING" ? "[ PACKAGING... ]" : "DOWNLOAD HI_HANDY.ZIP"}
            </button>
          </div>

          {/* Installation Terminal */}
          <div className="glass-panel clip-angled p-6 relative overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,1)] bg-[#000]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-10"></div>
            
            <div className="flex justify-between items-center mb-4 border-b border-[#50C878]/20 pb-2 relative z-20">
              <h3 className="font-orbitron text-[#50C878] text-xs font-bold tracking-[0.2em] uppercase">
                Setup_Protocols.log
              </h3>
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
              <p className="text-[#E6EDF3] mt-2">5. Click the <span className="text-[#50C878] font-bold">Hi Handy</span> icon in the top Play toolbar to initialize the JARVIS terminal.</p>
              
              <div className="mt-4 border-t border-[#50C878]/20 pt-2 flex flex-col gap-1">
                {logs.map((log, index) => (
                  <p key={index} className={log.includes('[SUCCESS]') ? 'text-[#50C878]' : 'text-[#00BFFF]'}>{log}</p>
                ))}
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
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-[#FFBF00] hover:bg-[#FFBF00]/5 transition-colors">
              <h3 className="font-orbitron text-lg text-[#FFBF00] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FFBF00] rounded-sm shadow-[0_0_8px_rgba(255,191,0,1)]"></span>
                AST Diagnostic Engine
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed">
                Bi-directional Abstract Syntax Tree chunking. Isolates logical execution islands to prevent LLM hallucination and automatically wires complex Unreal Blueprint nodes natively via C++.
              </p>
            </div>

            {/* Spatial Genie */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-[#50C878] hover:bg-[#50C878]/5 transition-colors">
              <h3 className="font-orbitron text-lg text-[#50C878] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#50C878] rounded-sm shadow-[0_0_8px_rgba(80,200,120,1)]"></span>
                Spatial Genie
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed">
                Text-to-World generation. Scans project registries to dynamically scatter meshes, spawn Niagara VFX systems, and mathematically ground actors using raycast floor targeting.
              </p>
            </div>

            {/* Local Sandbox */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-[#00BFFF] hover:bg-[#00BFFF]/5 transition-colors">
              <h3 className="font-orbitron text-lg text-[#00BFFF] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00BFFF] rounded-sm shadow-[0_0_8px_rgba(0,191,255,1)]"></span>
                Local Air-Gapped Matrix
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed">
                Ships with a proprietary C++ inference server running <span className="text-[#00BFFF]">handy_mentor_lite</span> natively on GPU VRAM. Supports Ollama, Llama.cpp, and totally offline development.
              </p>
            </div>

            {/* Economy Forge */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-[#FF00FF] hover:bg-[#FF00FF]/5 transition-colors">
              <h3 className="font-orbitron text-lg text-[#FF00FF] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF00FF] rounded-sm shadow-[0_0_8px_rgba(255,0,255,1)]"></span>
                Economy & NetOps Forge
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed">
                Enterprise architecture synthesis. Instantly rewrites DefaultEngine.ini to deploy PlayFab, Xsolla, Stripe, EOS, or Steam API commercial networking loops for massive multiplayer integration.
              </p>
            </div>

            {/* UI Generator */}
            <div className="holographic-card clip-angled flex flex-col p-6 group border-l-4 border-[#E6EDF3] hover:bg-[#E6EDF3]/5 transition-colors xl:col-span-2">
              <h3 className="font-orbitron text-lg text-[#E6EDF3] font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E6EDF3] rounded-sm shadow-[0_0_8px_rgba(255,255,255,1)]"></span>
                Sovereign UI Compiler
              </h3>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed">
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