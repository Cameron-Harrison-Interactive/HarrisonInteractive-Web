/* --- START OF FILE app/dashboard/about/page.tsx --- */

import React from "react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | STUDIO MANIFESTO (ABOUT US)
 * =========================================================================
 * Formats the Harrison Interactive origin story into a high-res, 
 * unconstrained corporate dossier. Features the custom 'new too' lore 
 * compiled into a central holographic card.
 */
export default function AboutUsManifesto() {
  return (
    <div className="w-full h-full flex flex-col relative z-10">
      
      {/* PAGE HEADER */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
            Studio Manifesto
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block">
            Harrison Interactive // Origins
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          The Story of Hi Handy and Our Mission of Unrivaled Innovation
        </p>
      </div>

      {/* UNLEASHED GRID LAYOUT */}
      <div className="w-full flex flex-col xl:flex-row gap-10">
        
        {/* =========================================================
            LEFT COLUMN: THE ORIGIN STORY TERMINAL
            ========================================================= */}
        <div className="w-full xl:w-3/5 flex flex-col gap-8">
          
          {/* Dynamic Origin Story Card */}
          <div className="holographic-card clip-angled flex flex-col p-10 border-l-4 border-l-[#FFBF00] shadow-[0_0_30px_rgba(255,191,0,0.1)] relative overflow-hidden bg-[#010409]/95">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFBF00]/5 to-transparent blur-[35px] pointer-events-none z-0"></div>
            
            <div className="flex items-center gap-3 border-b border-[#FFBF00]/20 pb-3 mb-6 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBF00] shadow-[0_0_8px_rgba(255,191,0,1)] animate-pulse"></span>
              <h2 className="font-orbitron text-base font-black tracking-widest uppercase text-[#FFBF00]">
                Uplink Origin: Why We Started
              </h2>
            </div>
            
            {/* DIRECTOR'S STRIKING PERSONAL LORE */}
            <div className="font-sans text-base text-[#E6EDF3] leading-[2] relative z-10 flex flex-col gap-6 text-justify">
              <p>
                Harrison Interactive was founded on a very simple, deeply personal premise: <strong className="text-[#FFBF00]">I was once new, too.</strong>
              </p>
              <p>
                When I first stepped inside the world of game development, I knew absolutely nothing. I spent countless sleepless nights staring at empty grids, desperately wondering if there was a way to make my wildest ideas come to life without the constant, crushing headaches of not knowing what a node was, how a variable function worked, or why my code refused to compile. 
              </p>
              <p>
                As I fought through that overwhelming learning curve, a powerful realization hit me: the tools I was building to survive—which eventually evolved into the <strong className="text-[#00BFFF]">Hi Handy Mentor</strong> and the <strong className="text-[#00BFFF]">Hi Handy Suite</strong>—could completely eliminate those hurdles for creators just like me. 
              </p>
              <p>
                We love helping people succeed. Through unrivaled innovation, we believe that providing accessible, high-performance editor tools is how we empower the next generation of developers. Because we know that inside the mind of every beginner is an idea that could change the world.
              </p>
            </div>

            {/* Terminal Footer Decal */}
            <div className="mt-8 pt-4 border-t border-white/5 relative z-10 flex justify-between items-center text-xs font-mono text-[#8B949E]">
              <span>[ SIGNATORY: HI_DIRECTOR ]</span>
              <span className="text-[#FFBF00]">UNRIVALED INNOVATION // EST. 2026</span>
            </div>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: THE CORPORATE DOSSIER
            ========================================================= */}
        <div className="w-full xl:w-2/5 flex flex-col gap-8">
          
          {/* Mission Statement (Emerald Intent) */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#50C878] shadow-[0_0_20px_rgba(80,200,120,0.1)] relative overflow-hidden bg-[#010409]/95">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#50C878]/10 to-transparent blur-[25px] opacity-30 pointer-events-none"></div>
            
            <h3 className="font-orbitron text-base text-[#50C878] font-bold tracking-widest uppercase mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_8px_#50C878]"></span>
              The Core Directive
            </h3>
            
            <div className="flex flex-col gap-4 font-mono text-xs text-[#C0C0C0] leading-relaxed">
              <div className="flex gap-4 items-start bg-[#50C878]/5 p-4 border-l border-[#50C878]/30">
                <span className="text-[#50C878] font-bold">▰</span>
                <span>We prioritize human creativity by building intelligent, non-intrusive tools that serve as natural extensions of your mind.</span>
              </div>
              <div className="flex gap-4 items-start bg-[#50C878]/5 p-4 border-l border-[#50C878]/30">
                <span className="text-[#50C878] font-bold">▰</span>
                <span>We operate with unyielding transparency. All project data, API keys, and local weights are stored on your local disk, completely safe from external observation.</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications (Telemetry Box) */}
          <div className="glass-panel clip-angled p-6 relative overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,1)] bg-[#000]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10"></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#00BFFF]/30 pb-3 relative z-20">
              <h3 className="font-orbitron text-[#00BFFF] text-xs font-bold tracking-[0.2em] uppercase">
                Harrison_Specs.sys
              </h3>
              <span className="font-mono text-[9px] text-[#00BFFF] animate-pulse">NOMINAL_STATE</span>
            </div>

            <div className="font-mono text-xs text-[#8B949E] flex flex-col gap-3 relative z-20 pl-2">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>FOUNDER:</span>
                <span className="text-[#E6EDF3] font-bold">Cameron Harrison</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>ESTABLISHED:</span>
                <span className="text-[#E6EDF3] font-bold">2026 // Sector 4</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>COMMERCIAL PRODUCTS:</span>
                <span className="text-[#00BFFF] font-bold">Hi Handy // Blood-Yield</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>PRIMARY ENGINE:</span>
                <span className="text-[#50C878] font-bold">Unreal Engine 5</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/about/page.tsx --- */