/* --- START OF FILE app/dashboard/billing/page.tsx --- */

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// =========================================================================
// INNER MATRIX: The Live Billing Engine (Stateful & Scaled)
// =========================================================================
function BillingContent() {
  const searchParams = useSearchParams();
  
  // Connect to the NextAuth Session Provider
  const sessionContext = useSession();
  const session = sessionContext?.data;
  
  // --- STATE MATRIX ---
  const [activeTier, setActiveTier] = useState<string>("LITE");
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<"elite" | "ultimate" | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYS] Payment Gateway Matrix Online.",
    "[SYS] Encrypted tunnel to Merchant of Record established.",
    "[SYS] Awaiting user initialization..."
  ]);

  // --- D1 DATABASE REAL-TIME SYNC ---
  useEffect(() => {
    const dbTier = (session?.user as any)?.tier;
    const dbKey = (session?.user as any)?.key;

    // The second your D1 database updates, the UI will dynamically sync!
    if (dbTier) {
      setActiveTier(dbTier.toUpperCase());
    }
    if (dbKey) {
      setLicenseKey(dbKey);
    }
  }, [session]);

  // --- RETURN FROM GATEWAY DETECTOR ---
  useEffect(() => {
    const status = searchParams.get("status");
    const tier = searchParams.get("tier");
    const key = searchParams.get("key");

    if (status === "success") {
      setTerminalLogs(prev => [
        ...prev,
        `[SUCCESS] 200 OK - Payment Clearance Confirmed.`,
        `[SYS] Cloudflare Edge successfully minted your Neural Key.`,
        `[SYS] An email containing your permanent License Key has been dispatched.`
      ]);
      if (tier) setActiveTier(tier.toUpperCase());
      if (key) setLicenseKey(key);
    } else if (status === "cancelled") {
      setTerminalLogs(prev => [
        ...prev,
        `[WARN] Transaction aborted by user. Gateway closed.`
      ]);
    }
  }, [searchParams]);

  // --- NATIVE TELEPORT INJECTOR (LIVE GATEWAY) ---
  const handleCheckout = (targetTier: "elite" | "ultimate") => {
    setIsLoading(targetTier);
    
    setTerminalLogs(prev => [
      ...prev, 
      `[SYS] Initializing secure teleport for ${targetTier.toUpperCase()} tier...`,
      `[NET] Bypassing Edge Router. Handing off to Stripe Servers...`,
      `[WARN] Secure Gateway opening in external viewport (New Tab).`
    ]);

    // PRODUCTION LIVE STRIPE LINKS
    const stripeLinkElite = "https://buy.stripe.com/aFa4gzcnaaoe0Iqahy6g801";
    const stripeLinkUltimate = "https://buy.stripe.com/28E14n0Es8g6bn475m6g802";

    const targetUrl = targetTier === "elite" ? stripeLinkElite : stripeLinkUltimate;

    // PHYSICAL BROWSER REDIRECT (NEW TAB OVERRIDE)
    setTimeout(() => {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      
      setIsLoading(null);
      setTerminalLogs(prev => [
        ...prev,
        `[SYS] External Gateway established. Awaiting return signal...`
      ]);
    }, 1200); 
  };

  // --- STRIPE CUSTOMER PORTAL LAUNCH ---
  const handleLaunchBillingPortal = () => {
    // FIXED: Hardcoded fallback to your exact live production portal link!
    const stripePortalUrl = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL || "https://billing.stripe.com/p/login/14A3cv0EsfIycr875m6g800";
    window.open(stripePortalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    // UNLEASHED: Flexes to row on huge screens, fully upscaled text sizes
    <div className="w-full flex flex-col xl:flex-row gap-10">
      
      {/* =========================================================
          LEFT COLUMN: ACTIVE CREDENTIALS (HOLOGRAPHIC ID CARD)
          ========================================================= */}
      <div className="w-full xl:w-[450px] flex-shrink-0 flex flex-col gap-8">
        
        {/* AAA Active License Card */}
        <div className={`relative glass-panel clip-angled flex flex-col p-8 border-t-4 transition-all duration-500 overflow-hidden ${activeTier === 'ULTIMATE' ? 'border-t-[#FF00FF] shadow-[0_0_30px_rgba(255,0,255,0.15)]' : activeTier === 'ELITE' ? 'border-t-[#50C878] shadow-[0_0_30px_rgba(80,200,120,0.15)]' : 'border-t-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.1)]'}`}>
          
          <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${activeTier === 'ULTIMATE' ? 'border-[#FF00FF]' : activeTier === 'ELITE' ? 'border-[#50C878]' : 'border-[#00BFFF]'}`}></div>
          <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${activeTier === 'ULTIMATE' ? 'border-[#FF00FF]' : activeTier === 'ELITE' ? 'border-[#50C878]' : 'border-[#00BFFF]'}`}></div>
          <div className="absolute bottom-4 right-4 opacity-20 transform rotate-90 origin-bottom-right">
            <p className="font-mono text-[8px] tracking-[0.4em]">||||||| | ||| | || ||</p>
          </div>

          <div className="flex flex-row justify-between items-start mb-8 relative z-10">
            <h2 className={`font-orbitron text-base font-bold tracking-widest uppercase ${activeTier === 'ULTIMATE' ? 'text-[#FF00FF]' : activeTier === 'ELITE' ? 'text-[#50C878]' : 'text-[#00BFFF]'}`}>
              Current Access Tier
            </h2>
            <span className={`w-3.5 h-3.5 rounded-full animate-ping ${activeTier === 'ULTIMATE' ? 'bg-[#FF00FF] shadow-[0_0_10px_#FF00FF]' : activeTier === 'ELITE' ? 'bg-[#50C878] shadow-[0_0_10px_#50C878]' : 'bg-[#00BFFF] shadow-[0_0_10px_#00BFFF]'}`}></span>
          </div>
          
          <div className="flex flex-col items-center justify-center my-6 relative z-10">
            <p className="font-orbitron text-6xl text-[#E6EDF3] font-black tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {activeTier}
            </p>
            <p className={`font-inter text-xs uppercase tracking-[0.3em] mt-3 ${activeTier === 'ULTIMATE' ? 'text-[#FF00FF]' : activeTier === 'ELITE' ? 'text-[#50C878]' : 'text-[#00BFFF]'}`}>
              Status: Biometrically Verified
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
            <h3 className="font-orbitron text-[#8B949E] text-xs tracking-[0.2em] uppercase mb-3">
              Assigned Neural Key
            </h3>
            <div className={`bg-[#010409]/80 backdrop-blur-md border p-4 rounded flex flex-row justify-between items-center relative overflow-hidden group cursor-pointer transition-all ${licenseKey ? 'border-[#50C878]/50 hover:border-[#50C878]' : 'border-[#00BFFF]/30 hover:border-[#00BFFF]'}`}>
              
              <div className={`absolute top-0 left-0 w-full h-[2px] opacity-50 animate-[slide-in_2s_linear_infinite] ${activeTier === 'ULTIMATE' ? 'bg-[#FF00FF] shadow-[0_0_8px_#FF00FF]' : activeTier === 'ELITE' ? 'bg-[#50C878] shadow-[0_0_8px_#50C878]' : 'bg-[#00BFFF] shadow-[0_0_8px_#00BFFF]'}`}></div>
              
              <span className={`font-mono text-base tracking-[0.3em] relative z-10 ${licenseKey ? 'text-[#50C878] drop-shadow-[0_0_5px_rgba(80,200,120,0.8)]' : 'text-[#E6EDF3]'}`}>
                {licenseKey ? licenseKey : "XXXX-XXXX-XXXX-XXXX"}
              </span>
              <span className="font-orbitron text-xs text-[#00BFFF] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity relative z-10 bg-[#00BFFF]/20 px-3 py-1.5 rounded">
                Copy
              </span>
            </div>
          </div>
        </div>

        {/* AAA Payment Method Stub */}
        <div className="glass-panel relative flex flex-col p-6 border-l-4 border-l-[#FFBF00] opacity-90 overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,191,0,0.03)_10px,rgba(255,191,0,0.03)_20px)] pointer-events-none"></div>
          
          <h3 className="font-orbitron text-[#FFBF00] text-sm font-bold tracking-widest uppercase mb-2 relative z-10 flex items-center gap-2">
            <span className="text-lg">⚠</span> Financial Node
          </h3>
          <p className="font-mono text-xs text-[#8B949E] tracking-widest uppercase relative z-10 leading-relaxed">
            No active payment profiles linked to this core. Teleport required for upgrades.
          </p>
        </div>

      </div>

      {/* =========================================================
          RIGHT COLUMN: OVERCLOCKED UPGRADE MATRIX
          ========================================================= */}
      <div className="w-full flex-1 flex flex-col gap-8">
        
        {/* ENHANCED HEADER WITH INTEGRATED PRODUCTION STRIPE CUSTOMER PORTAL */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#E6EDF3]/10 pb-4 gap-4">
          <h2 className="font-orbitron text-[#E6EDF3] text-xl font-bold tracking-[0.2em] uppercase">
            Expansion Modules
          </h2>
          <button 
            onClick={handleLaunchBillingPortal}
            className="clip-angled-button px-5 py-2 border border-[#FFBF00] hover:bg-[#FFBF00] hover:text-[#010409] font-orbitron text-xs font-black tracking-widest uppercase transition-all hover:shadow-[0_0_10px_rgba(255,191,0,0.4)] cursor-pointer"
          >
            MANAGE ACTIVE SUBSCRIPTION
          </button>
        </div>

        {/* --- ELITE TIER UPGRADE (PRODUCTION LIVE LINK) --- */}
        <div className="group holographic-card clip-angled flex flex-col relative p-8 border-l-4 border-l-[#50C878] hover:bg-[#50C878]/5 transition-colors duration-300">
          
          <div className="absolute top-0 right-8 bg-[#50C878] text-[#010409] font-orbitron text-[10px] font-bold tracking-[0.2em] px-3 py-1.5 uppercase rounded-b-md shadow-[0_0_10px_rgba(80,200,120,0.5)]">
            Studio Standard
          </div>

          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <div className="flex flex-col flex-1">
              <h3 className="font-orbitron text-3xl text-[#50C878] font-bold tracking-widest uppercase mb-1 drop-shadow-[0_0_8px_rgba(80,200,120,0.6)] group-hover:scale-[1.02] transition-transform origin-left">
                Hi Handy Elite
              </h3>
              <p className="font-inter text-xs text-[#8B949E] mb-4 uppercase tracking-widest">
                The Architect's Baseline Framework
              </p>
              
              <ul className="font-mono text-xs text-[#E6EDF3] flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <span className="text-[#50C878] drop-shadow-[0_0_5px_#50C878]">▰</span> 
                  Local 'Bring Your Own Brain' (BYOB) LLM Routing
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#50C878] drop-shadow-[0_0_5px_#50C878]">▰</span> 
                  Advanced Blueprint Graph Cleaning Scripts
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#50C878] drop-shadow-[0_0_5px_#50C878]">▰</span> 
                  Priority Render Thread Allocation
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start xl:items-end w-full xl:w-56 border-t xl:border-t-0 xl:border-l border-white/10 pt-6 xl:pt-0 xl:pl-6">
              <span className="font-orbitron text-4xl text-[#E6EDF3] font-light mb-1">$49<span className="text-sm text-[#8B949E]">/mo</span></span>
              
              <button 
                onClick={() => handleCheckout("elite")}
                disabled={isLoading !== null}
                className="w-full font-orbitron text-xs py-4 mt-4 bg-[#50C878]/10 border border-[#50C878] text-[#50C878] hover:bg-[#50C878] hover:text-[#010409] transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_15px_rgba(80,200,120,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative z-20 group-hover:shadow-[0_0_25px_rgba(80,200,120,0.6)]"
              >
                {isLoading === "elite" ? "[ TELEPORTING ]" : "Initialize Gateway"}
              </button>
            </div>
          </div>
        </div>

        {/* --- ULTIMATE TIER UPGRADE (COMING SOON) --- */}
        <div className="group holographic-card clip-angled flex flex-col relative p-8 border-l-4 border-l-[#FF00FF] bg-[#FF00FF]/5 transition-colors duration-300">
          
          <div className="absolute top-0 right-8 bg-[#FF00FF] text-[#010409] font-orbitron text-[10px] font-bold tracking-[0.2em] px-3 py-1.5 uppercase rounded-b-md shadow-[0_0_10px_rgba(255,0,255,0.5)]">
            Coming Soon
          </div>

          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <div className="flex flex-col flex-1">
              <h3 className="font-orbitron text-3xl text-[#FF00FF] font-black tracking-widest uppercase mb-1 drop-shadow-[0_0_8px_rgba(255,0,255,0.6)] group-hover:scale-[1.02] transition-transform origin-left">
                Hi Handy Ultimate
              </h3>
              <p className="font-inter text-xs text-[#FF00FF] mb-4 uppercase tracking-[0.25em] font-bold">
                MODULE LOCKED // COMING SOON
              </p>
              
              <ul className="font-mono text-xs text-[#E6EDF3] flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <span className="text-[#FF00FF] drop-shadow-[0_0_5px_#FF00FF]">▰</span> 
                  Harrison Interactive Cloudflare Backend Integration
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF00FF] drop-shadow-[0_0_5px_#FF00FF]">▰</span> 
                  Verified Studio Badge (RMT Marketplace Authority)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF00FF] drop-shadow-[0_0_5px_#FF00FF]">▰</span> 
                  Direct C++ Omni-Link API Access
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start xl:items-end w-full xl:w-56 border-t xl:border-t-0 xl:border-l border-white/10 pt-6 xl:pt-0 xl:pl-6 opacity-60">
              <span className="font-orbitron text-4xl text-[#E6EDF3] font-light mb-1">$99<span className="text-sm text-[#8B949E]">/mo</span></span>
              
              <button 
                disabled={true}
                className="w-full font-orbitron text-xs py-4 mt-4 bg-[#FF00FF]/10 border border-[#FF00FF]/40 text-[#FF00FF]/50 uppercase tracking-[0.2em] font-bold cursor-not-allowed relative z-20"
              >
                COMING SOON
              </button>
            </div>
          </div>
        </div>

        {/* --- AAA CRT TRANSACTION TERMINAL --- */}
        <div className="mt-4 relative overflow-hidden bg-[#000] border border-[#FFBF00]/30 rounded-md p-6 shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-10"></div>
          
          <div className="flex justify-between items-center mb-4 border-b border-[#FFBF00]/20 pb-2 relative z-20">
            <h3 className="font-orbitron text-[#FFBF00] text-sm font-bold tracking-[0.2em] uppercase">
              Terminal.exe // Stripe_Logs
            </h3>
            <span className="font-mono text-[10px] text-[#FFBF00] animate-pulse">LIVE UPLINK</span>
          </div>

          <div className="font-mono text-xs text-[#8B949E] flex flex-col gap-2 overflow-y-auto max-h-48 relative z-20 pl-2 border-l border-[#FFBF00]/20">
            {terminalLogs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-[#FFBF00]/50 select-none">{'>'}</span>
                <p className={`${log.includes('[SUCCESS]') ? 'text-[#50C878] drop-shadow-[0_0_3px_#50C878]' : log.includes('[FATAL]') || log.includes('[ERR]') || log.includes('[WARN]') ? 'text-[#DC143C] drop-shadow-[0_0_3px_#DC143C]' : 'text-[#E6EDF3]'}`}>
                  {log}
                </p>
              </div>
            ))}
            <div className="flex gap-2 mt-1">
              <span className="text-[#FFBF00]/50 select-none">{'>'}</span>
              <p className="text-[#FFBF00] animate-pulse bg-[#FFBF00] w-2 h-3.5 mt-1"></p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

// =========================================================================
// OUTER SHELL: The required Suspense Boundary
// =========================================================================
export default function BillingPage() {
  return (
    <div className="w-full h-full flex flex-col relative z-10">
      <div className="w-full flex flex-col mb-10 border-b border-[#FFBF00]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#FFBF00] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(255,191,0,0.6)]">
            Billing & License Management
          </h1>
          <span className="px-3 py-1 bg-[#FFBF00]/20 border border-[#FFBF00]/50 text-[#FFBF00] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse">
            256-bit Encrypted Gateway
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          Manage Hi Handy Tiers and Auth Credentials
        </p>
      </div>

      <Suspense fallback={
        <div className="w-full h-64 flex flex-col justify-center items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FFBF00]/20 border-t-[#FFBF00] rounded-full animate-spin"></div>
          <span className="font-orbitron text-[#FFBF00] text-xs tracking-widest uppercase animate-pulse">Decrypting Secure Matrix...</span>
        </div>
      }>
        <BillingContent />
      </Suspense>
    </div>
  );
}

/* --- END OF FILE app/dashboard/billing/page.tsx --- */