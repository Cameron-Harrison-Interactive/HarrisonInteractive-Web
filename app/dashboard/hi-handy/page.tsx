/* --- START OF FILE app/dashboard/hi-handy/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | HI HANDY SUITE (UPSCALE & ELI5 OVERHAUL)
 * =========================================================================
 * Features globally upscaled typography for large PC monitors.
 * Includes highly detailed ELI5 installation instructions and 
 * heavily expanded capability metrics with exact prompt examples.
 */
export default function HiHandySuite() {
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
    <div className="w-full h-full flex flex-col relative z-10">
      
      {/* PAGE HEADER */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-3xl md:text-4xl text-[#00BFFF] font-black uppercase tracking-[0.15em] drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]">
            Hi Handy Neural Suite
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-xs font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block">
            V2.5 MASTER KERNEL
          </span>
        </div>
        <p className="font-inter text-sm text-[#8B949E] uppercase tracking-widest mt-3">
          Unreal Engine 5 AI Architect & Native Integration Matrix
        </p>
      </div>

      {/* UNLEASHED GRID LAYOUT */}
      <div className="w-full flex flex-col xl:flex-row gap-10">
        
        {/* =========================================================
            LEFT COLUMN: DOWNLOAD & INSTALLATION MATRIX
            ========================================================= */}
        <div className="w-full xl:w-[500px] flex-shrink-0 flex flex-col gap-8">
          
          {/* THE VAULT DOOR (DYNAMIC ACCESS) */}
          <div className={`holographic-card clip-angled flex flex-col p-8 border-t-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500 bg-[#010409]/95 group ${
            activeTier !== 'LITE' ? 'border-t-[#50C878] shadow-[0_0_30px_rgba(80,200,120,0.15)]' : 'border-t-[#DC143C] shadow-[0_0_30px_rgba(220,20,60,0.15)]'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br blur-[30px] opacity-20 pointer-events-none z-0 group-hover:opacity-40 transition-opacity ${
              activeTier !== 'LITE' ? 'from-[#50C878] to-transparent' : 'from-[#DC143C] to-transparent'
            }`}></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10 border-b border-white/10 pb-3">
              <h2 className="font-orbitron text-xl font-bold tracking-widest uppercase text-[#E6EDF3]">
                Plugin Binaries
              </h2>
              <span className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest rounded uppercase ${
                activeTier !== 'LITE' ? 'bg-[#50C878]/20 text-[#50C878] border border-[#50C878]/50' : 'bg-[#DC143C]/20 text-[#DC143C] border border-[#DC143C]/50 animate-pulse'
              }`}>
                {activeTier !== 'LITE' ? 'ACCESS GRANTED' : 'VAULT LOCKED'}
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs text-[#8B949E] mb-8 relative z-10 border-l-2 border-white/10 pl-4 bg-white/5 py-4">
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
                className={`clip-angled-button w-full py-5 transition-all font-futura font-black tracking-[0.3em] uppercase text-sm relative z-10 shrink-0 shadow-[0_0_15px_rgba(80,200,120,0.3)] hover:shadow-[0_0_25px_rgba(80,200,120,0.6)] ${downloadState === 'READY' ? 'bg-[#50C878] text-[#010409] border-[#50C878]' : 'bg-[#50C878]/10 border border-[#50C878]/40 hover:bg-[#50C878] hover:text-[#010409] text-[#50C878]'}`}
              >
                {downloadState === "IDLE" ? "EXTRACT BINARIES" : downloadState === "PACKAGING" ? "[ PACKAGING... ]" : "DOWNLOAD HI_HANDY.ZIP"}
              </button>
            ) : (
              <div className="flex flex-col gap-3 relative z-10">
                <button disabled className="clip-angled-button w-full py-5 bg-[#DC143C]/5 border border-[#DC143C]/30 text-[#DC143C]/50 font-orbitron font-black tracking-[0.2em] uppercase text-sm cursor-not-allowed">
                  REQUIRES ACTIVE LICENSE
                </button>
                <a href="/dashboard/billing" className="text-center font-mono text-xs text-[#FFBF00] hover:text-white uppercase tracking-widest transition-colors mt-2">
                  [ Upgrade Matrix to Unlock ]
                </a>
              </div>
            )}
          </div>

          {/* ELI5 INSTALLATION TERMINAL */}
          <div className="glass-panel clip-angled p-8 relative overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,1)] bg-[#000]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-10"></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#50C878]/20 pb-3 relative z-20">
              <h3 className="font-orbitron text-[#50C878] text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <span className="text-lg">📚</span> ELI5 Setup Protocol
              </h3>
              {downloadState === "PACKAGING" && <span className="font-mono text-[10px] text-[#00BFFF] animate-pulse">WRITING...</span>}
            </div>

            <div className="font-sans text-sm text-[#8B949E] flex flex-col gap-5 overflow-y-auto max-h-[500px] relative z-20 pr-2 custom-scrollbar">
              
              <div className="flex flex-col gap-1">
                <strong className="text-[#E6EDF3] font-orbitron tracking-wider text-xs">STEP 1: Download & Extract</strong>
                <p>Click the big download button above to get your <span className="text-[#00BFFF]">HiHandy_v2.5.zip</span> file. Once downloaded, right-click the file and select <strong className="text-white">"Extract All"</strong> to unzip it.</p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="text-[#E6EDF3] font-orbitron tracking-wider text-xs">STEP 2: Find Your Game Folder</strong>
                <p>Open your computer's file explorer and find where you saved your Unreal Engine 5 project (you are looking for the folder that contains your <span className="text-[#FFBF00]">.uproject</span> file).</p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="text-[#E6EDF3] font-orbitron tracking-wider text-xs">STEP 3: The Plugins Folder</strong>
                <p>Inside your game project folder, look for a folder named <strong className="text-[#50C878]">Plugins</strong>. If you don't see one, just right-click, create a new folder, and name it exactly <strong className="text-[#50C878]">Plugins</strong>.</p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="text-[#E6EDF3] font-orbitron tracking-wider text-xs">STEP 4: Drop It In</strong>
                <p>Drag and drop the unzipped <strong className="text-[#00BFFF]">Handy</strong> folder directly into that Plugins folder.</p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="text-[#E6EDF3] font-orbitron tracking-wider text-xs">STEP 5: Turn It On</strong>
                <p>Double-click your <span className="text-[#FFBF00]">.uproject</span> file to open your game. Unreal Engine will ask if you want to rebuild the Handy modules. Click <strong className="text-white">Yes</strong>.</p>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="text-[#E6EDF3] font-orbitron tracking-wider text-xs">STEP 6: Launch JARVIS</strong>
                <p>Once your editor is open, make sure <span className="text-[#00BFFF] italic">Python Editor Script Plugin</span> and <span className="text-[#00BFFF] italic">Web Browser</span> are enabled in your Plugins menu. Then, simply click the glowing <strong className="text-[#50C878]">Hi Handy</strong> icon at the very top of your screen to open the Neural Terminal and start building!</p>
              </div>
              
              {/* Active Terminal Logs */}
              <div className="mt-4 border-t border-[#50C878]/20 pt-4 flex flex-col gap-2 font-mono text-xs bg-[#010409]/50 p-4 rounded border border-white/5">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-[#50C878]/50 select-none">{'>'}</span>
                    <p className={`${log.includes('[SUCCESS]') ? 'text-[#50C878] drop-shadow-[0_0_3px_#50C878]' : 'text-[#00BFFF]'}`}>{log}</p>
                  </div>
                ))}
                {downloadState === "PACKAGING" && (
                  <div className="flex gap-2 mt-1">
                    <span className="text-[#50C878]/50 select-none">{'>'}</span>
                    <p className="text-[#50C878] animate-pulse bg-[#50C878] w-2 h-4 mt-0.5"></p>
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
          
          <div className="flex flex-row justify-between items-end border-b border-[#E6EDF3]/10 pb-4">
            <h2 className="font-orbitron text-[#E6EDF3] text-2xl font-bold tracking-[0.2em] uppercase">
              Core Module Capabilities
            </h2>
            <span className="font-mono text-xs text-[#8B949E] uppercase tracking-widest hidden sm:block">
              Architectural Engine Specifications
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* AST Engine */}
            <div className="holographic-card clip-angled flex flex-col p-8 group border-t-4 border-t-[#FFBF00] bg-[#010409]/80 hover:bg-[#FFBF00]/5 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <h3 className="font-orbitron text-xl text-[#FFBF00] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,191,0,0.8)]">🔧</span>
                AST Diagnostic Engine
              </h3>
              <p className="font-sans text-sm text-[#E6EDF3] leading-relaxed mb-4">
                Reads your Blueprint wires like a human programmer. Instead of just guessing or giving you generic advice, JARVIS isolates exactly where your logic is broken and uses native C++ reflection to automatically wire the correct nodes together.
              </p>
              <div className="mt-auto bg-black/40 border border-[#FFBF00]/20 p-3 rounded font-mono text-xs text-[#8B949E]">
                <span className="text-[#FFBF00] font-bold uppercase tracking-widest block mb-1">Example Command:</span>
                "Analyze the jumping logic in BP_PlayerCharacter and fix the velocity variable."
              </div>
            </div>

            {/* Spatial Genie */}
            <div className="holographic-card clip-angled flex flex-col p-8 group border-t-4 border-t-[#50C878] bg-[#010409]/80 hover:bg-[#50C878]/5 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <h3 className="font-orbitron text-xl text-[#50C878] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(80,200,120,0.8)]">🌍</span>
                Spatial Genie Engine
              </h3>
              <p className="font-sans text-sm text-[#E6EDF3] leading-relaxed mb-4">
                A massive Text-to-World generator that understands spatial physics. It scans your content browser for 3D models and scatters them perfectly across your map, firing mathematical raycasts so nothing floats awkwardly in the air.
              </p>
              <div className="mt-auto bg-black/40 border border-[#50C878]/20 p-3 rounded font-mono text-xs text-[#8B949E]">
                <span className="text-[#50C878] font-bold uppercase tracking-widest block mb-1">Example Command:</span>
                "Build a dense pine forest with scattered rocks in a 5000cm radius around me."
              </div>
            </div>

            {/* Local Sandbox */}
            <div className="holographic-card clip-angled flex flex-col p-8 group border-t-4 border-t-[#00BFFF] bg-[#010409]/80 hover:bg-[#00BFFF]/5 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <h3 className="font-orbitron text-xl text-[#00BFFF] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]">🧠</span>
                Local Air-Gapped Matrix
              </h3>
              <p className="font-sans text-sm text-[#E6EDF3] leading-relaxed mb-4">
                We built a customized AI brain (<span className="text-[#00BFFF] font-mono">handy_mentor_lite</span>) that runs entirely on your graphics card's VRAM. You don't need internet, and your secret proprietary game code never leaves your computer.
              </p>
              <div className="mt-auto bg-black/40 border border-[#00BFFF]/20 p-3 rounded font-mono text-xs text-[#8B949E]">
                <span className="text-[#00BFFF] font-bold uppercase tracking-widest block mb-1">Example Use-Case:</span>
                Turn off your Wi-Fi, hold Alt+Right Click on any node, and get a completely offline explanation.
              </div>
            </div>

            {/* Economy Forge */}
            <div className="holographic-card clip-angled flex flex-col p-8 group border-t-4 border-t-[#FF00FF] bg-[#010409]/80 hover:bg-[#FF00FF]/5 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <h3 className="font-orbitron text-xl text-[#FF00FF] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">💳</span>
                Economy & NetOps Forge
              </h3>
              <p className="font-sans text-sm text-[#E6EDF3] leading-relaxed mb-4">
                Writing C++ network code is a nightmare. This module instantly writes your <span className="text-[#FF00FF] font-mono">DefaultEngine.ini</span> and builds fully functional multiplayer lobbies and cosmetic storefronts in seconds.
              </p>
              <div className="mt-auto bg-black/40 border border-[#FF00FF]/20 p-3 rounded font-mono text-xs text-[#8B949E]">
                <span className="text-[#FF00FF] font-bold uppercase tracking-widest block mb-1">Example Command:</span>
                "Setup Epic Online Services and build a Stripe checkout store for cosmetic skins."
              </div>
            </div>

            {/* UI Generator */}
            <div className="holographic-card clip-angled flex flex-col p-8 group border-t-4 border-t-[#E6EDF3] bg-[#010409]/80 hover:bg-[#E6EDF3]/5 transition-colors xl:col-span-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <h3 className="font-orbitron text-xl text-[#E6EDF3] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">🖥️</span>
                Sovereign UI Compiler
              </h3>
              <p className="font-sans text-sm text-[#E6EDF3] leading-relaxed mb-4">
                Tell the AI what kind of menu you want, and it will physically build the UMG UI Widget inside Unreal Engine. It hooks up all the buttons, text boxes, and scroll panels for you, saving hours of tedious drag-and-drop layout work.
              </p>
              <div className="mt-auto bg-black/40 border border-[#E6EDF3]/20 p-3 rounded font-mono text-xs text-[#8B949E]">
                <span className="text-[#E6EDF3] font-bold uppercase tracking-widest block mb-1">Example Command:</span>
                "Create a Main Menu widget with a huge Play button, a Settings button, and a Quit button."
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/hi-handy/page.tsx --- */