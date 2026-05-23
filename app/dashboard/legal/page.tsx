/* --- START OF FILE app/dashboard/legal/page.tsx --- */

import React from "react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | LEGAL & EULA PORTAL (UNLEASHED)
 * =========================================================================
 * Formats the Harrison Interactive licensing framework into an unconstrained,
 * highly readable dual-column layout. 
 * Compiles to 100% static HTML for optimal 0-byte Edge performance.
 */
export default function LegalEulaPortal() {
  return (
    <div className="w-full h-full flex flex-col relative z-10">
      
      {/* PAGE HEADER */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
            Legal & EULA
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block">
            Harrison Interactive // EULA v2.5
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          End-User License Agreement and Data Sovereignty Safeguards
        </p>
      </div>

      {/* UNLEASHED GRID LAYOUT */}
      <div className="w-full flex flex-col xl:flex-row gap-10">
        
        {/* =========================================================
            LEFT COLUMN: THE HUMAN-READABLE "FRIENDLY" EULA
            ========================================================= */}
        <div className="w-full flex-1 flex flex-col gap-8">
          
          <div className="flex flex-row justify-between items-end border-b border-[#E6EDF3]/10 pb-2">
            <h2 className="font-orbitron text-[#E6EDF3] text-xl font-bold tracking-[0.2em] uppercase">
              The Friendly EULA
            </h2>
            <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest hidden sm:block">
              Simplified Licensing Guidelines
            </span>
          </div>

          {/* Rule 1: Absolute Game Ownership (Emerald) */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#50C878] shadow-[0_0_20px_rgba(80,200,120,0.1)] relative overflow-hidden bg-[#010409]/95">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#50C878]/10 to-transparent blur-[30px] opacity-30 pointer-events-none z-0"></div>
            
            <h3 className="font-orbitron text-xl text-[#50C878] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_8px_#50C878]"></span>
              1. Absolute Game Ownership (0% Royalties)
            </h3>
            <p className="font-sans text-base text-[#C0C0C0] leading-relaxed relative z-10 text-justify">
              Anything you build, code, design, or manifest using the Hi Handy Mentor and the Hi Handy Suite belongs <strong className="text-white">100% to you</strong>. Harrison Interactive takes absolutely zero royalties from your commercial game sales, marketplace assets, or intellectual property. Forever.
            </p>
          </div>

          {/* Rule 2: Complete Data Sovereignty (Cyan) */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.1)] relative overflow-hidden bg-[#010409]/95">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00BFFF]/10 to-transparent blur-[30px] opacity-30 pointer-events-none z-0"></div>
            
            <h3 className="font-orbitron text-xl text-[#00BFFF] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00BFFF] shadow-[0_0_8px_#00BFFF]"></span>
              2. Data Sovereignty (Air-Gapped Keys)
            </h3>
            <p className="font-sans text-base text-[#C0C0C0] leading-relaxed relative z-10 text-justify">
              All of your external Neural API keys (OpenAI, Anthropic, Gemini, etc.) are stored <strong className="text-white">locally on your physical machine</strong> inside your project's secure config folders. Harrison Interactive never transmits, collects, or observes your private credentials. You have total data sovereignty.
            </p>
          </div>

          {/* Rule 3: Non-Resale Clause (Amber) */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#FFBF00] shadow-[0_0_20px_rgba(255,191,0,0.1)] relative overflow-hidden bg-[#010409]/95">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFBF00]/10 to-transparent blur-[30px] opacity-30 pointer-events-none z-0"></div>
            
            <h3 className="font-orbitron text-xl text-[#FFBF00] font-bold tracking-widest uppercase mb-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FFBF00] shadow-[0_0_8px_#FFBF00]"></span>
              3. Non-Resale Limitation
            </h3>
            <p className="font-sans text-base text-[#C0C0C0] leading-relaxed relative z-10 text-justify">
              You are not allowed to repackage, clone, resell, or distribute the <strong className="text-white">Hi Handy plugin itself</strong> (its compiled DLLs, source code, or UI matrices) as a standalone commercial product. Protect our craftsmanship just as we protect your creativity.
            </p>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: THE FORMAL CONTRACT LEDGER
            ========================================================= */}
        <div className="w-full xl:w-[450px] 2xl:w-[500px] flex-shrink-0 flex flex-col gap-8">
          
          <div className="flex flex-row justify-between items-end border-b border-[#00BFFF]/30 pb-2">
            <h2 className="font-orbitron text-[#E6EDF3] text-xl font-bold tracking-[0.2em] uppercase">
              Formal Contract
            </h2>
          </div>

          <div className="glass-panel clip-angled p-6 relative overflow-hidden flex flex-col shadow-[inset_0_0_30px_rgba(0,0,0,1)] bg-[#000] border-t-2 border-t-[#00BFFF] h-[550px]">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" style={{ backgroundSize: '20px 20px' }}></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#00BFFF]/20 pb-3 relative z-20">
              <h3 className="font-orbitron text-[#00BFFF] text-xs font-bold tracking-[0.2em] uppercase">
                Harrison_Interactive_EULA.txt
              </h3>
              <span className="font-mono text-[9px] text-[#00BFFF] animate-pulse">READ ONLY</span>
            </div>

            <div className="font-mono text-xs text-[#8B949E] flex flex-col gap-4 overflow-y-auto h-full relative z-20 pl-2 custom-scrollbar pr-2 leading-relaxed text-justify">
              <p>
                <strong>SECTION 1.0: GRANTED LICENSE</strong><br />
                Harrison Interactive hereby grants the Licensee a non-exclusive, non-transferable, revocable license to utilize the Hi Handy toolset within Epic Games' Unreal Engine, subject to the terms stated herein.
              </p>
              <p>
                <strong>SECTION 2.0: INTELLECTUAL PROPERTY</strong><br />
                All intellectual property, proprietary math nodes, and compiled C++ logic inside the HandyForge library remain the exclusive property of Harrison Interactive. Any assets generated (including Blueprints, spatial levels, and materials) remain the sole intellectual property of the Licensee.
              </p>
              <p>
                <strong>SECTION 3.0: LIABILITY & WARRANTY</strong><br />
                Hi Handy is provided "as-is" without warranty of any kind, express or implied. Harrison Interactive shall not be liable for any compilation crashes, lost work, or editor instability resulting from improper installation or out-of-spec local model execution.
              </p>
              <p>
                <strong>SECTION 4.0: COMPLIANCE</strong><br />
                The Licensee agrees to operate the Hi Handy software in absolute compliance with the Epic Games Unreal Engine End-User License Agreement.
              </p>
              <p className="text-center text-[#50C878] uppercase tracking-widest mt-6">
                *** END OF CONTRACT LEDGER ***
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/legal/page.tsx --- */