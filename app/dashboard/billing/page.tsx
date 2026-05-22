/* --- START OF FILE app/dashboard/billing/page.tsx --- */

"use client";

import React, { useState, useEffect } from "react";

export default function BillingMatrix() {
  // --- STATE MATRIX ---
  const [activeTier, setActiveTier] = useState<string>("LITE");
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<"elite" | "ultimate" | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYS] Awaiting secure handshake with Payment Gateway...",
    "[SYS] No recent transactions detected in local cache."
  ]);

  // --- RETURN FROM GATEWAY DETECTOR ---
  useEffect(() => {
    // Detects if the user just returned from a successful purchase
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const tier = urlParams.get("tier");

    if (status === "success") {
      setTerminalLogs(prev => [
        ...prev,
        `[SUCCESS] 200 OK - Payment Clearance Confirmed.`,
        `[SYS] Cloudflare Edge is currently minting your new Neural Key.`,
        `[SYS] An email containing your permanent License Key has been dispatched.`
      ]);
      if (tier) setActiveTier(tier.toUpperCase());
    } else if (status === "cancelled") {
      setTerminalLogs(prev => [
        ...prev,
        `[WARN] Transaction aborted by user. Gateway closed.`
      ]);
    }
  }, []);

  // --- API PAYLOAD INJECTOR ---
  const handleCheckout = async (targetTier: "elite" | "ultimate") => {
    setIsLoading(targetTier);
    
    // Append starting log
    setTerminalLogs(prev => [
      ...prev, 
      `[SYS] Initializing secure payload for ${targetTier.toUpperCase()} tier...`,
      `[NET] Dispatching encrypted POST request to billing router...`
    ]);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier: targetTier }),
      });

      const data = await response.json();

      if (response.ok && data.checkoutUrl) {
        setTerminalLogs(prev => [
          ...prev, 
          `[SUCCESS] Gateway resolved. Teleporting to secure payment portal...`
        ]);
        
        // PHYSICAL BROWSER REDIRECT TO STRIPE HOSTED CHECKOUT
        window.location.href = data.checkoutUrl;
      } else {
        // Handle API Error Response
        setTerminalLogs(prev => [
          ...prev, 
          `[ERR] ${response.status} - ${data.error || "Matrix Collision"}`
        ]);
        setIsLoading(null);
      }
    } catch (error) {
      // Handle Catastrophic Network Failure
      setTerminalLogs(prev => [
        ...prev, 
        `[FATAL] Network payload failed to dispatch. Check Edge internal routing.`
      ]);
      setIsLoading(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative z-10 max-w-6xl mx-auto">
      
      {/* Page Header - Amber Intent for Security/Billing */}
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

      {/* Main Content Grid */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        
        {/* =========================================================
            LEFT COLUMN: ACTIVE CREDENTIALS
            ========================================================= */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          
          {/* Active License Card (Changes Color based on Tier!) */}
          <div className={`glass-panel clip-angled flex flex-col p-8 border-t-2 transition-all duration-500 ${activeTier === 'ULTIMATE' ? 'border-t-[#FF00FF] shadow-[0_0_20px_rgba(255,0,255,0.2)]' : activeTier === 'ELITE' ? 'border-t-[#50C878] shadow-[0_0_20px_rgba(80,200,120,0.2)]' : 'border-t-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.1)]'}`}>
            <h2 className={`font-orbitron text-sm font-bold tracking-widest uppercase mb-6 ${activeTier === 'ULTIMATE' ? 'text-[#FF00FF]' : activeTier === 'ELITE' ? 'text-[#50C878]' : 'text-[#00BFFF]'}`}>
              Current Access Tier
            </h2>
            
            <p className="font-orbitron text-4xl text-[#E6EDF3] font-light tracking-wider mb-1">
              {activeTier}
            </p>
            <p className="font-inter text-xs text-[#50C878] uppercase tracking-widest mb-8">
              Status: Active & Verified
            </p>

            <h3 className="font-orbitron text-[#8B949E] text-[10px] tracking-widest uppercase mb-2">
              Assigned Neural Key
            </h3>
            <div className={`bg-[#010409] border p-3 rounded flex flex-row justify-between items-center relative overflow-hidden group cursor-pointer ${licenseKey ? 'border-[#50C878]/50' : 'border-[#00BFFF]/30'}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00BFFF]/5 to-transparent w-full h-[200%] animate-[slide-in_2s_linear_infinite] pointer-events-none"></div>
              
              <span className={`font-mono text-sm tracking-[0.2em] relative z-10 ${licenseKey ? 'text-[#50C878] drop-shadow-[0_0_5px_rgba(80,200,120,0.8)]' : 'text-[#E6EDF3]'}`}>
                {licenseKey ? licenseKey : "XXXX-XXXX-XXXX"}
              </span>
              <span className="font-inter text-[10px] text-[#00BFFF] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                [ Copy ]
              </span>
            </div>
          </div>

          {/* Payment Method Stub */}
          <div className="glass-panel flex flex-col p-6 border-l-2 border-l-[#FFBF00] opacity-80">
            <h3 className="font-orbitron text-[#FFBF00] text-xs font-bold tracking-widest uppercase mb-4">
              Payment Method
            </h3>
            <p className="font-inter text-sm text-[#8B949E]">
              No active payment profiles linked to this core.
            </p>
          </div>

        </div>

        {/* =========================================================
            RIGHT COLUMN: UPGRADE MATRIX
            ========================================================= */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          <h2 className="font-orbitron text-[#E6EDF3] text-lg font-bold tracking-widest uppercase border-b border-[#E6EDF3]/10 pb-2">
            Available Upgrades
          </h2>

          {/* ELITE TIER UPGRADE (Emerald Intent) */}
          <div className="holographic-card clip-angled flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-l-4 border-l-[#50C878]">
            <div className="flex flex-col mb-6 md:mb-0">
              <h3 className="font-orbitron text-2xl text-[#50C878] font-bold tracking-widest uppercase mb-2 drop-shadow-[0_0_5px_rgba(80,200,120,0.8)]">
                Hi Handy Elite
              </h3>
              <ul className="font-inter text-xs text-[#8B949E] flex flex-col gap-2">
                <li className="flex items-center gap-2"><span className="text-[#50C878] text-[10px]">■</span> Advanced Neural Pathing</li>
                <li className="flex items-center gap-2"><span className="text-[#50C878] text-[10px]">■</span> Multi-Agent Network Access</li>
                <li className="flex items-center gap-2"><span className="text-[#50C878] text-[10px]">■</span> Priority Server Rendering</li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start md:items-end w-full md:w-auto">
              <span className="font-orbitron text-3xl text-[#E6EDF3] font-light mb-1">$49<span className="text-sm text-[#8B949E]">/mo</span></span>
              
              <button 
                onClick={() => handleCheckout("elite")}
                disabled={isLoading !== null}
                className="w-full md:w-48 font-orbitron text-[10px] py-3 mt-4 border border-[#50C878] text-[#50C878] hover:bg-[#50C878] hover:text-[#010409] transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_10px_rgba(80,200,120,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === "elite" ? "NEGOTIATING..." : "Initialize Purchase"}
              </button>
            </div>
          </div>

          {/* ULTIMATE TIER UPGRADE (Fuchsia Intent for heavy processing) */}
          <div className="holographic-card clip-angled flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-l-4 border-l-[#FF00FF]">
            <div className="flex flex-col mb-6 md:mb-0">
              <h3 className="font-orbitron text-2xl text-[#FF00FF] font-bold tracking-widest uppercase mb-2 drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">
                Hi Handy Ultimate
              </h3>
              <ul className="font-inter text-xs text-[#8B949E] flex flex-col gap-2">
                <li className="flex items-center gap-2"><span className="text-[#FF00FF] text-[10px]">■</span> Unrestricted API Limits</li>
                <li className="flex items-center gap-2"><span className="text-[#FF00FF] text-[10px]">■</span> Dedicated Hardware Instance</li>
                <li className="flex items-center gap-2"><span className="text-[#FF00FF] text-[10px]">■</span> Direct C++ Omni-Link Integration</li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start md:items-end w-full md:w-auto">
              <span className="font-orbitron text-3xl text-[#E6EDF3] font-light mb-1">$99<span className="text-sm text-[#8B949E]">/mo</span></span>
              
              <button 
                onClick={() => handleCheckout("ultimate")}
                disabled={isLoading !== null}
                className="w-full md:w-48 font-orbitron text-[10px] py-3 mt-4 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-[#010409] transition-all uppercase tracking-[0.2em] font-bold shadow-[0_0_10px_rgba(255,0,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading === "ultimate" ? "NEGOTIATING..." : "Initialize Purchase"}
              </button>
            </div>
          </div>

          {/* Transaction Terminal */}
          <div className="glass-panel flex flex-col p-6 mt-4 relative overflow-hidden min-h-[150px]">
            <h3 className="font-orbitron text-[#E6EDF3] text-xs font-bold tracking-widest uppercase mb-4">
              Terminal Logs: Transaction Events
            </h3>
            <div className="font-mono text-[10px] text-[#8B949E] flex flex-col gap-1 overflow-y-auto max-h-48">
              {terminalLogs.map((log, index) => (
                <p key={index} className={`${log.includes('[SUCCESS]') ? 'text-[#50C878]' : log.includes('[FATAL]') ? 'text-[#DC143C]' : ''}`}>
                  {log}
                </p>
              ))}
              <p className="text-[#FFBF00] animate-pulse mt-2">_</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

/* --- END OF FILE app/dashboard/billing/page.tsx --- */