/* --- START OF FILE app/dashboard/about/page.tsx --- */

import React from "react";

export default function AboutMatrix() {
  return (
    <div className="w-full h-full flex flex-col relative z-10 max-w-6xl mx-auto gap-8">
      
      {/* Page Header - Cyan Intent for Info */}
      <div className="w-full flex flex-col border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
            Studio Manifesto
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse">
            Architecting // The_Future_Of_UE5
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          Harrison Interactive Core Philosophies
        </p>
      </div>

      {/* STATS GRID - 4 Column Readout */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel clip-angled p-6 flex flex-col items-center justify-center text-center border-t border-[#00BFFF]/30 hover:border-[#00BFFF] transition-all">
          <span className="font-mono text-2xl text-[#E6EDF3] mb-1">2026</span>
          <span className="font-orbitron text-[10px] text-[#00BFFF] tracking-[0.2em] uppercase">Established</span>
        </div>

        <div className="glass-panel clip-angled p-6 flex flex-col items-center justify-center text-center border-t border-[#00BFFF]/30 hover:border-[#00BFFF] transition-all">
          <span className="font-mono text-2xl text-[#E6EDF3] mb-1">STABLE</span>
          <span className="font-orbitron text-[10px] text-[#00BFFF] tracking-[0.2em] uppercase">Pipeline Sync</span>
        </div>

        <div className="glass-panel clip-angled p-6 flex flex-col items-center justify-center text-center border-t border-[#00BFFF]/30 hover:border-[#00BFFF] transition-all">
          <span className="font-mono text-2xl text-[#E6EDF3] mb-1">3-TIER</span>
          <span className="font-orbitron text-[10px] text-[#00BFFF] tracking-[0.2em] uppercase">Handy Architecture</span>
        </div>

        <div className="glass-panel clip-angled p-6 flex flex-col items-center justify-center text-center border-t border-[#DC143C]/50 hover:border-[#DC143C] transition-all">
          <span className="font-mono text-2xl text-[#E6EDF3] mb-1">ACTIVE</span>
          <span className="font-orbitron text-[10px] text-[#DC143C] tracking-[0.2em] uppercase">Blood-Yield Dev</span>
        </div>

      </div>

      {/* MANIFESTO CONTENT GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Module: System Plumbing */}
        <div className="glass-panel flex flex-col p-8 border-l-4 border-l-[#00BFFF]">
          <span className="font-mono text-[10px] text-[#00BFFF] uppercase tracking-[0.2em] mb-6 border-b border-[#00BFFF]/20 pb-2">
            [ SECTOR // SYSTEM_PLUMBING ]
          </span>
          <h3 className="font-orbitron text-xl text-[#E6EDF3] tracking-widest uppercase mb-4">
            Data-Driven Design
          </h3>
          <p className="font-inter text-sm text-[#8B949E] leading-relaxed mb-4">
            At Harrison Interactive, we believe that <strong className="text-[#E6EDF3]">Plumbing comes First</strong>. Visuals draw players in, but logic keeps them there. Our development philosophy is rooted in industrial-grade performance.
          </p>
          <p className="font-inter text-sm text-[#8B949E] leading-relaxed">
            We don't just build games; we engineer ecosystems. Every module we deploy is optimized for the <strong className="text-[#00BFFF]">Unreal Engine 5</strong> stable environment, ensuring that from solo indie project to AAA studio deployment, the data flow remains flawless.
          </p>
        </div>

        {/* Module: Hybrid Automation */}
        <div className="glass-panel flex flex-col p-8 border-l-4 border-l-[#00BFFF]">
          <span className="font-mono text-[10px] text-[#00BFFF] uppercase tracking-[0.2em] mb-6 border-b border-[#00BFFF]/20 pb-2">
            [ SECTOR // HYBRID_AUTOMATION ]
          </span>
          <h3 className="font-orbitron text-xl text-[#E6EDF3] tracking-widest uppercase mb-4">
            Unrivaled Innovation
          </h3>
          <p className="font-inter text-sm text-[#8B949E] leading-relaxed mb-4">
            The gap between <strong className="text-[#E6EDF3]">UMG Blueprints</strong> and <strong className="text-[#E6EDF3]">Python logic</strong> is where our studio thrives. By bridging these two powerful domains, we create tools like <strong className="text-[#00BFFF]">Handy</strong>—designed to handle the heavy lifting of project management.
          </p>
          <p className="font-inter text-sm text-[#8B949E] leading-relaxed">
            Our "Bring Your Own Brain" (BYOB) architecture in the Elite and Ultimate tiers allows for real-time AI logic routing, effectively allowing studios to automate the most tedious parts of the game development lifecycle.
          </p>
        </div>

        {/* Module: The Industrial Pipeline */}
        <div className="holographic-card clip-angled flex flex-col p-8 md:col-span-2 border border-[#00BFFF]/30">
          <h3 className="font-orbitron text-2xl text-[#E6EDF3] tracking-widest uppercase mb-4">
            The Industrial Pipeline
          </h3>
          <p className="font-inter text-sm text-[#E6EDF3] leading-relaxed mb-6">
            We are currently utilizing our own <strong className="text-[#00BFFF]">Handy Ultimate</strong> toolset to construct the dark fantasy world of <strong className="text-[#DC143C]">Blood-Yield</strong>. This closed-loop development cycle ensures that our tools are battle-tested in a production environment before they ever hit the Fab Marketplace.
          </p>
          <div className="bg-[#010409]/80 p-4 rounded border border-[#00BFFF]/20 flex flex-col gap-2 font-mono text-xs text-[#00BFFF]">
            <span className="opacity-80">&gt; Content/Handy/Logic/Router.py [ACTIVE]</span>
            <span className="text-[#DC143C] animate-pulse">&gt; Content/BloodYield/World/Bastion [LOADING...]</span>
          </div>
        </div>

        {/* Module: Mission Objective (Crimson Intent) */}
        <div className="glass-panel flex flex-col p-8 border-l-4 border-l-[#DC143C] md:col-span-2 text-center items-center">
          <span className="font-mono text-[10px] text-[#DC143C] uppercase tracking-[0.2em] mb-4">
            [ SECTOR // MISSION_OBJECTIVE ]
          </span>
          <h3 className="font-orbitron text-2xl text-[#E6EDF3] tracking-widest uppercase mb-4">
            Beyond Development
          </h3>
          <p className="font-inter text-sm text-[#8B949E] leading-relaxed max-w-3xl">
            Our goal is to redefine the symbiosis between player and developer. Through the <strong className="text-[#DC143C]">Blood-Yield RMT Economy</strong>, we are establishing a marketplace where player time is valued and verified. We are Harrison Interactive. We build the logic that yields consequences.
          </p>
        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/about/page.tsx --- */