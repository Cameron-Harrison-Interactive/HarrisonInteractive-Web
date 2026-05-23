/* --- START OF FILE app/dashboard/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | COMMAND CENTER (SYSTEM OVERVIEW - SCALED)
 * =========================================================================
 * Uses safe optional chaining (?.) on useSession() to prevent fatal 
 * TypeError crashes during the server-side pre-rendering/hydration phase.
 * Typography has been globally scaled up for high-resolution PC monitors.
 */
export default function DashboardOverview() {
  // SAFE HYDRATION PROTOCOL: Capture the raw context first to prevent SSR crashes
  const sessionContext = useSession();
  const session = sessionContext?.data;

  const [time, setTime] = useState<string>("00:00:00");
  const [latency, setLatency] = useState<number>(12);

  // Simulated live telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
      }));
    }, 1000);

    const ping = setInterval(() => {
      setLatency(Math.floor(Math.random() * (18 - 8 + 1) + 8)); // Random ping between 8ms and 18ms
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(ping);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col relative z-10">
      
      {/* 
        =========================================================
        DYNAMIC HEADER MATRIX (SCALED)
        =========================================================
      */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 border-b border-[#00BFFF]/30 pb-6 gap-6">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-4 mb-3">
            <h1 className="font-orbitron text-3xl md:text-4xl text-[#00BFFF] font-black uppercase tracking-[0.15em] drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]">
              Command Center
            </h1>
            <span className="px-3 py-1 bg-[#50C878]/20 border border-[#50C878]/50 text-[#50C878] text-xs font-orbitron uppercase tracking-widest rounded animate-pulse hidden md:block">
              UPLINK ACTIVE
            </span>
          </div>
          <p className="font-inter text-base text-[#E6EDF3] uppercase tracking-widest">
            Welcome back, <span className="text-[#00FFFF] font-bold">{session?.user?.name?.toUpperCase() || "DIRECTOR"}</span>. All systems nominal.
          </p>
        </div>

        {/* Global Clock & Telemetry */}
        <div className="flex flex-row items-center gap-6 glass-panel px-6 py-4 border-[#00BFFF]/30 rounded clip-angled">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-[#8B949E] tracking-[0.2em] uppercase">Global Matrix Time</span>
            <span className="font-orbitron text-xl text-[#00BFFF] tracking-widest drop-shadow-[0_0_5px_rgba(0,191,255,0.5)]">{time}</span>
          </div>
          <div className="w-px h-10 bg-[#00BFFF]/30"></div>
          <div className="flex flex-col items-start">
            <span className="font-mono text-[10px] text-[#8B949E] tracking-[0.2em] uppercase">Edge Latency</span>
            <span className={`font-orbitron text-xl tracking-widest ${latency < 15 ? 'text-[#50C878] drop-shadow-[0_0_5px_rgba(80,200,120,0.5)]' : 'text-[#FFBF00] drop-shadow-[0_0_5px_rgba(255,191,0,0.5)]'}`}>
              {latency}ms
            </span>
          </div>
        </div>
      </div>

      {/* 
        =========================================================
        TELEMETRY GRID (SCALED & UNCONSTRAINED)
        =========================================================
      */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 mb-10">
        
        {/* Node 1: License Status */}
        <div className="relative glass-panel clip-angled p-6 border-t-2 border-t-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.1)] hover:shadow-[0_0_25px_rgba(0,191,255,0.2)] transition-all group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#00BFFF]/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="font-orbitron text-[#8B949E] text-xs tracking-[0.2em] uppercase mb-1">Active Core License</h3>
          <p className="font-orbitron text-2xl text-[#E6EDF3] font-bold tracking-widest uppercase mb-4 group-hover:text-[#00BFFF] transition-colors">
            HI HANDY <span className="text-[#00BFFF]">LITE</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#50C878] shadow-[0_0_5px_#50C878] animate-pulse"></span>
            <span className="font-mono text-xs text-[#50C878] tracking-widest uppercase">Verified & Active</span>
          </div>
        </div>

        {/* Node 2: Database Connection */}
        <div className="relative glass-panel clip-angled p-6 border-t-2 border-t-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.1)] hover:shadow-[0_0_25px_rgba(80,200,120,0.2)] transition-all group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#50C878]/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="font-orbitron text-[#8B949E] text-xs tracking-[0.2em] uppercase mb-1">D1 SQL Database</h3>
          <p className="font-orbitron text-2xl text-[#E6EDF3] font-bold tracking-widest uppercase mb-4 group-hover:text-[#50C878] transition-colors">
            Edge Node <span className="text-[#50C878]">#04</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#50C878] shadow-[0_0_5px_#50C878]"></span>
            <span className="font-mono text-xs text-[#50C878] tracking-widest uppercase">Connected / Synced</span>
          </div>
        </div>

        {/* Node 3: Current Projects */}
        <div className="relative glass-panel clip-angled p-6 border-t-2 border-t-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.1)] hover:shadow-[0_0_25px_rgba(255,0,255,0.2)] transition-all group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF00FF]/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="font-orbitron text-[#8B949E] text-xs tracking-[0.2em] uppercase mb-1">Tracked Endpoints</h3>
          <p className="font-orbitron text-2xl text-[#E6EDF3] font-bold tracking-widest uppercase mb-4 group-hover:text-[#FF00FF] transition-colors">
            2 <span className="text-[#FF00FF] text-lg">Active</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#E6EDF3] tracking-widest uppercase">Blood-Yield / Hi Handy</span>
          </div>
        </div>

        {/* Node 4: Security Shield */}
        <div className="relative glass-panel clip-angled p-6 border-t-2 border-t-[#FFBF00] shadow-[0_0_15px_rgba(255,191,0,0.1)] hover:shadow-[0_0_25px_rgba(255,191,0,0.2)] transition-all group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFBF00]/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="font-orbitron text-[#8B949E] text-xs tracking-[0.2em] uppercase mb-1">Auth Integrity</h3>
          <p className="font-orbitron text-2xl text-[#E6EDF3] font-bold tracking-widest uppercase mb-4 group-hover:text-[#FFBF00] transition-colors">
            SECURE
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBF00] shadow-[0_0_5px_#FFBF00] animate-pulse"></span>
            <span className="font-mono text-xs text-[#FFBF00] tracking-widest uppercase">256-Bit JWT Locked</span>
          </div>
        </div>

      </div>

      {/* 
        =========================================================
        MAIN ACTIVITY TERMINAL
        =========================================================
      */}
      <div className="w-full flex-1 flex flex-col xl:flex-row gap-10">
        
        {/* Left: Quick Actions Matrix */}
        <div className="w-full xl:w-1/3 flex flex-col gap-6">
          <h2 className="font-orbitron text-[#E6EDF3] text-xl font-bold tracking-widest uppercase border-b border-[#E6EDF3]/10 pb-3">
            Quick Directives
          </h2>
          
          <a href="/dashboard/hi-handy" className="group holographic-card clip-angled p-6 border-l-2 border-l-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all flex justify-between items-center cursor-pointer">
            <div className="flex flex-col">
              <span className="font-orbitron text-[#00BFFF] text-base tracking-widest uppercase font-bold group-hover:translate-x-1 transition-transform">Initialize Hi Handy</span>
              <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest mt-1.5">Access Neural Tools</span>
            </div>
            <span className="text-[#00BFFF] font-mono text-xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">{'>>'}</span>
          </a>

          <a href="/dashboard/billing" className="group holographic-card clip-angled p-6 border-l-2 border-l-[#FFBF00] hover:bg-[#FFBF00]/10 transition-all flex justify-between items-center cursor-pointer">
            <div className="flex flex-col">
              <span className="font-orbitron text-[#FFBF00] text-base tracking-widest uppercase font-bold group-hover:translate-x-1 transition-transform">Upgrade Core Matrix</span>
              <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest mt-1.5">Manage License Tiers</span>
            </div>
            <span className="text-[#FFBF00] font-mono text-xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">{'>>'}</span>
          </a>

          <a href="/dashboard/blood-yield" className="group holographic-card clip-angled p-6 border-l-2 border-l-[#DC143C] hover:bg-[#DC143C]/10 transition-all flex justify-between items-center cursor-pointer">
            <div className="flex flex-col">
              <span className="font-orbitron text-[#DC143C] text-base tracking-widest uppercase font-bold group-hover:translate-x-1 transition-transform">Blood-Yield Dev Hub</span>
              <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest mt-1.5">Access Studio Project</span>
            </div>
            <span className="text-[#DC143C] font-mono text-xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">{'>>'}</span>
          </a>
        </div>

        {/* Right: CRT Server Log Terminal */}
        <div className="w-full flex-1 flex flex-col">
          <h2 className="font-orbitron text-[#E6EDF3] text-xl font-bold tracking-widest uppercase border-b border-[#E6EDF3]/10 pb-3 mb-6">
            System Event Log
          </h2>
          
          <div className="flex-1 min-h-[350px] relative overflow-hidden bg-[#010409] border border-[#00BFFF]/30 rounded-md p-6 shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
            {/* CRT Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-10"></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#00BFFF]/20 pb-3 relative z-20">
              <h3 className="font-orbitron text-[#00BFFF] text-sm font-bold tracking-[0.2em] uppercase">
                /var/log/sys_events.log
              </h3>
              <span className="font-mono text-[10px] text-[#00BFFF] animate-pulse">TAILING...</span>
            </div>

            <div className="font-mono text-xs text-[#8B949E] flex flex-col gap-3 h-[calc(100%-60px)] overflow-y-auto relative z-20 pl-2">
              <div className="flex gap-4">
                <span className="text-[#00BFFF]/50">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-[#50C878]">[SUCCESS]</span>
                <p className="text-[#E6EDF3]">Biometric token validated. Access granted to {session?.user?.name || "User"}.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#00BFFF]/50">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-[#00BFFF]">[INFO]</span>
                <p className="text-[#E6EDF3]">Edge Middleware Shield verified. JWT Signature intact.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#00BFFF]/50">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-[#FFBF00]">[WARN]</span>
                <p className="text-[#FFBF00]">License Key 'LITE' detected. Feature restrictions actively enforced.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#00BFFF]/50">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-[#00BFFF]">[INFO]</span>
                <p className="text-[#E6EDF3]">Establishing localized connection to Cloudflare D1 nodes...</p>
              </div>
              <div className="flex gap-4 mt-2">
                <span className="text-[#00BFFF]/50">{'>'}</span>
                <p className="text-[#00BFFF] animate-pulse bg-[#00BFFF] w-2 h-4 mt-0.5"></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/page.tsx --- */