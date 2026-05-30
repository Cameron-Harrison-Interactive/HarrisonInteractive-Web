/* --- START OF FILE app/dashboard/layout.tsx --- */

"use client";

import React, { useEffect } from "react";
import AuthGuard from "../components/AuthGuard";
import { SessionProvider, useSession, signOut } from "next-auth/react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | OMNI-LINK SIDEBAR COMPONENT (AUTO-WIRED)
 * =========================================================================
 * Detects if rendering inside the Unreal Engine 5 CEF WebBrowser widget,
 * and automatically pings the C++ plugin with the active license key.
 */
function OmniLinkSidebar() {
  const sessionContext = useSession();
  const session = sessionContext?.data;

  // =========================================================================
  // THE AUTOMATED UNREAL ENGINE 5 HANDSHAKE (AUTO-WIRE)
  // =========================================================================
  useEffect(() => {
    // Safely extract the decrypted key and tier from the session
    const userKey = (session?.user as any)?.key;
    const userTier = (session?.user as any)?.tier;

    if (userKey && typeof window !== "undefined" && (window as any).ue?.handy) {
      console.log(`[SYS] Native UE5 environment detected. Transmitting License: [${userKey}]`);
      
      // Physically pings your C++ bouncer to activate Elite/Ultimate features instantly!
      (window as any).ue.handy.sendToUnreal(JSON.stringify({
        intent: "VALIDATE_LICENSE",
        key: userKey
      }));
    }
  }, [session]);

  return (
    <aside className="w-80 glass-panel border-r border-[#00BFFF]/20 flex flex-col justify-between hidden md:flex shadow-[5px_0_20px_rgba(0,0,0,0.8)] z-20 overflow-y-auto bg-[#010409]/70 backdrop-blur-md">
      <div className="flex flex-col">
        
        {/* BRANDING HEADER WITH LOGO INJECTION */}
        <div className="p-8 border-b border-[#00BFFF]/20 bg-[#010409]/80 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 to-transparent opacity-50 pointer-events-none"></div>
          
          {/* The Glowing Hand Logo */}
          <div className="relative w-28 h-28 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-[#00BFFF]/20 rounded-full blur-[25px] animate-pulse group-hover:bg-[#00BFFF]/40 transition-colors duration-500"></div>
            <img 
              src="/handy_logo.png" 
              alt="Hi Handy Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,191,255,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(0,191,255,1)] transition-all duration-500"
            />
          </div>

          <div>
            <h2 className="font-orbitron text-[#00BFFF] text-2xl font-black tracking-[0.1em] uppercase drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">
              Harrison Interactive
            </h2>
            <p className="text-xs text-[#8B949E] mt-2 tracking-[0.3em] uppercase font-mono animate-pulse">
              Client & Dev Portal
            </p>
          </div>
        </div>

        {/* THE BIOMETRIC ID BADGE */}
        <div className="px-6 py-4 border-b border-[#00BFFF]/20 bg-[#010409]/40 flex flex-col gap-4">
          <div className="flex items-center gap-4 p-3 bg-[#010409] border border-[#00BFFF]/30 rounded-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(0,191,255,0.05),transparent)] group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Avatar Engine */}
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-[#00BFFF]/50 shadow-[0_0_10px_rgba(0,191,255,0.3)] relative z-10" 
              />
            ) : (
              <div className="w-10 h-10 rounded-full border border-[#00BFFF]/50 bg-[#00BFFF]/10 flex items-center justify-center shadow-[0_0_10px_rgba(0,191,255,0.3)] relative z-10">
                <span className="font-orbitron text-[#00BFFF] font-bold">?</span>
              </div>
            )}

            {/* Neural Credentials */}
            <div className="flex flex-col relative z-10 overflow-hidden w-full">
              <span className="font-orbitron text-xs text-[#E6EDF3] font-bold truncate tracking-wider">
                {session?.user?.name || "GUEST ENTITY"}
              </span>
              <span className="font-mono text-[9px] text-[#8B949E] truncate tracking-widest mt-0.5">
                {session?.user?.email || "NO COM-LINK"}
              </span>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] shadow-[0_0_5px_#50C878] animate-pulse"></span>
                <span className="font-mono text-[8px] text-[#50C878] tracking-[0.2em] uppercase">
                  TIER: {(session?.user as any)?.tier || "LITE"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION MATRIX */}
        <nav className="p-6 flex flex-col gap-3 mt-2">
          <a href="/dashboard" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00BFFF] shadow-[0_0_8px_#00BFFF] group-hover:scale-125 transition-transform"></span>
            System Overview
          </a>

          <div className="mt-5 mb-2 px-3 border-b border-[#00BFFF]/20 pb-2">
            <p className="text-xs text-[#00FFFF]/70 uppercase tracking-[0.2em] font-orbitron font-bold">Hi Handy Suite</p>
          </div>

          <a href="/dashboard/hi-handy" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#50C878] hover:bg-[#50C878]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#50C878]/30 flex flex-row items-center gap-4 group">
            <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_8px_#50C878] group-hover:scale-125 transition-transform"></span>
            Downloads & Tiers
          </a>

          <a href="/dashboard/billing" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#FFBF00] hover:bg-[#FFBF00]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#FFBF00]/30 flex flex-row items-center gap-4 group">
            <span className="w-2 h-2 rounded-full bg-[#FFBF00] shadow-[0_0_10px_#FFBF00] group-hover:scale-125 transition-transform"></span>
            License & Billing
          </a>

          <div className="mt-5 mb-2 px-3 border-b border-[#DC143C]/40 pb-2">
            <p className="text-xs text-[#DC143C]/80 uppercase tracking-[0.2em] font-orbitron font-bold">Internal Studios</p>
          </div>

          <a href="/dashboard/blood-yield" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#DC143C] hover:bg-[#DC143C]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#DC143C]/40 hover:shadow-[0_0_15px_rgba(220,20,60,0.2)] flex flex-row items-center gap-4 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC143C] group-hover:shadow-[0_0_10px_#DC143C] group-hover:scale-125 transition-all"></span>
            Blood-Yield Game
          </a>

          <div className="mt-5 mb-2 px-3 border-b border-[#00BFFF]/20 pb-2">
            <p className="text-xs text-[#00FFFF]/70 uppercase tracking-[0.2em] font-orbitron font-bold">Info & Support</p>
          </div>

          <a href="/dashboard/about" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
            <span className="w-2 h-2 rounded-full bg-[#8B949E] group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_#00FFFF] transition-all"></span>
            About Us
          </a>

          <a href="/dashboard/faq" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
            <span className="w-2 h-2 rounded-full bg-[#8B949E] group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_#00FFFF] transition-all"></span>
            Support / FAQ
          </a>

          <a href="/dashboard/legal" className="font-orbitron text-base text-[#E6EDF3] hover:text-[#00FFFF] hover:bg-[#00BFFF]/10 p-4 rounded transition-all uppercase tracking-widest border border-transparent hover:border-[#00BFFF]/30 flex flex-row items-center gap-4 group">
            <span className="w-2 h-2 rounded-full bg-[#8B949E] group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_#00FFFF] transition-all"></span>
            Legal & EULA
          </a>
        </nav>
      </div>
      
      {/* SECURE SIGNOUT ACTION */}
      <div className="p-6 border-t border-[#00BFFF]/20 bg-[#010409]/60 flex flex-col mt-auto">
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full font-orbitron text-sm text-[#8B949E] hover:text-[#00BFFF] flex flex-row items-center justify-center p-4 transition-all uppercase tracking-[0.2em] border border-transparent hover:border-[#00BFFF]/50 hover:shadow-[0_0_15px_rgba(0,191,255,0.2)] rounded font-bold cursor-pointer"
        >
          [ Disconnect Matrix ]
        </button>
      </div>
    </aside>
  );
}

/**
 * =========================================================================
 * HARRISON INTERACTIVE | MAIN LAYOUT SHELL
 * =========================================================================
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthGuard>
        
        {/* NATIVE INLINE CSS FOR BACKGROUND ANIMATIONS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Panning Blueprint Node Pattern */
            @keyframes panNodes {
              0% { background-position: 0 0; }
              100% { background-position: -200px 200px; }
            }

            /* Chaotic Rainbow "Jumping" Animations */
            @keyframes jumpOrb1 {
              0%   { transform: translate(0, 0) scale(1); }
              20%  { transform: translate(40vw, -20vh) scale(1.5); }
              40%  { transform: translate(10vw, 40vh) scale(0.8); }
              60%  { transform: translate(-30vw, -10vh) scale(1.2); }
              80%  { transform: translate(20vw, 30vh) scale(0.9); }
              100% { transform: translate(0, 0) scale(1); }
            }
            
            @keyframes jumpOrb2 {
              0%   { transform: translate(0, 0) scale(1.2); }
              25%  { transform: translate(-30vw, 30vh) scale(0.7); }
              50%  { transform: translate(20vw, -40vh) scale(1.4); }
              75%  { transform: translate(40vw, 20vh) scale(0.9); }
              100% { transform: translate(0, 0) scale(1.2); }
            }

            @keyframes jumpOrb3 {
              0%   { transform: translate(0, 0) scale(0.9); }
              30%  { transform: translate(20vw, 40vh) scale(1.3); }
              60%  { transform: translate(-40vw, 10vh) scale(1.1); }
              90%  { transform: translate(30vw, -30vh) scale(0.8); }
              100% { transform: translate(0, 0) scale(0.9); }
            }

            @keyframes jumpOrb4 {
              0%   { transform: translate(0, 0) scale(1.1); }
              15%  { transform: translate(-20vw, -30vh) scale(1.5); }
              45%  { transform: translate(30vw, 20vh) scale(0.7); }
              75%  { transform: translate(-10vw, 40vh) scale(1.2); }
              100% { transform: translate(0, 0) scale(1.1); }
            }

            @keyframes jumpOrb5 {
              0%   { transform: translate(0, 0) scale(1); }
              20%  { transform: translate(30vw, 20vh) scale(0.8); }
              50%  { transform: translate(-40vw, -20vh) scale(1.4); }
              80%  { transform: translate(10vw, -40vh) scale(1.1); }
              100% { transform: translate(0, 0) scale(1); }
            }

            /* Custom Blueprint Node / Neural Network SVG Pattern */
            .neural-network-pattern {
              background-image: url("data:image/svg+xml,%3Csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='3' fill='rgba(255,255,255,0.3)'/%3E%3Ccircle cx='100' cy='80' r='4' fill='rgba(0,191,255,0.4)'/%3E%3Ccircle cx='50' cy='120' r='2' fill='rgba(217,70,239,0.4)'/%3E%3Cpath d='M30 30 L100 80' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M100 80 L180 30' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M100 80 L50 120' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M50 120 L-20 80' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3C/svg%3E");
              background-size: 150px 150px;
              animation: panNodes 30s linear infinite;
            }
          `
        }} />

        <div className="w-full h-full min-h-screen flex flex-row relative z-10 overflow-hidden bg-[#050A15]">
          
          {/* ========================================================= */}
          {/* DYNAMIC NEURAL BACKGROUND MATRIX (RAINBOW JUMP)           */}
          {/* ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            
            {/* Erratic, Jumping Rainbow Light Orbs */}
            <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-[#D946EF]/30 rounded-full blur-[100px] mix-blend-screen" style={{ animation: 'jumpOrb1 18s infinite ease-in-out' }}></div>
            <div className="absolute bottom-[20%] right-[30%] w-[600px] h-[600px] bg-[#00BFFF]/30 rounded-full blur-[120px] mix-blend-screen" style={{ animation: 'jumpOrb2 22s infinite ease-in-out' }}></div>
            <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] bg-[#F59E0B]/30 rounded-full blur-[110px] mix-blend-screen" style={{ animation: 'jumpOrb3 15s infinite ease-in-out' }}></div>
            <div className="absolute bottom-[10%] left-[10%] w-[550px] h-[550px] bg-[#10B981]/20 rounded-full blur-[130px] mix-blend-screen" style={{ animation: 'jumpOrb4 25s infinite ease-in-out' }}></div>
            <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-[#F43F5E]/30 rounded-full blur-[90px] mix-blend-screen" style={{ animation: 'jumpOrb5 19s infinite ease-in-out' }}></div>
            
            {/* The Blueprint Node / Neural Network Moving Background */}
            <div className="absolute inset-0 neural-network-pattern opacity-80"></div>
            
            {/* Heavy Vignette to keep text highly readable against the bright jumping lights */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050A15_90%)] opacity-90"></div>
          </div>

          {/* THE AUTO-WIRED SIDEBAR */}
          <OmniLinkSidebar />

          {/* MAIN CONTENT VIEWPORT */}
          <main className="flex-1 w-full h-full min-h-screen flex flex-col overflow-y-auto relative z-10">
            
            <div className="flex-1 p-8 lg:p-14">
              {children}
            </div>

            {/* GLOBAL LEGAL FOOTER */}
            <footer className="w-full border-t border-[#00BFFF]/20 bg-[#010409]/90 backdrop-blur-md p-6 mt-auto relative z-20">
              <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="font-mono text-xs text-[#8B949E] tracking-widest uppercase text-center md:text-left">
                  &copy; {new Date().getFullYear()} Harrison Interactive. All Systems Nominal.
                </p>
                <p className="font-orbitron text-[11px] text-[#00BFFF]/70 tracking-[0.25em] uppercase drop-shadow-[0_0_5px_rgba(0,191,255,0.3)] font-bold">
                  Encrypted Neural Matrix v2.5
                </p>
              </div>
            </footer>

          </main>

        </div>
      </AuthGuard>
    </SessionProvider>
  );
}

/* --- END OF FILE app/dashboard/layout.tsx --- */