/* --- START OF FILE app/dashboard/vote/page.tsx --- */

"use client";

import React from "react";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | TWIN FLAMES VOTING MATRIX (SCALED & CLOUDFLARE-SAFE)
 * =========================================================================
 * Pure, native <img> tags are used to bypass Vercel's proprietary image 
 * optimization engine, guaranteeing 100% image loading success on Cloudflare Pages.
 * Typography has been globally upscaled for large PC monitors.
 */
export default function VotePage() {
  const voteSites = [
    { name: 'Minecraft Buzz', url: 'https://minecraft.buzz/server/21170' },
    { name: 'Minecraft-MP', url: 'https://minecraft-mp.com/server-s358424' },
    { name: 'Minecraft-Server-List', url: 'https://minecraft-server-list.com/server/520409/' },
    { name: 'MinecraftServers.org', url: 'https://minecraftservers.org/server/687860' },
    { name: 'PlanetMinecraft', url: 'https://www.planetminecraft.com/server/twin-flames-cobblemon/' },
  ];

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-8 text-white overflow-hidden bg-[#0A192F]">
      
      {/* 
        =========================================================
        CLOUDFLARE-SAFE BACKGROUND (NATIVE <img> TAG)
        ========================================================= 
      */}
      <img
        src="/bgpicture1.png"
        alt="Twin Flames Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none -z-10"
      />

      {/* Main Container */}
      <div className="max-w-2xl w-full flex flex-col items-center z-10">
        
        {/* Header/Logo Section (UPSCALED BY 35% FOR PC READABILITY) */}
        <div className="relative w-64 h-64 mb-10 flex items-center justify-center group cursor-default">
           <div className="absolute inset-0 bg-[#00D2FF]/20 rounded-full blur-[50px] animate-pulse"></div>
           <img 
             src="/flame.png" 
             alt="Twin Flames Logo" 
             className="relative z-10 w-52 h-52 drop-shadow-[0_0_25px_rgba(0,210,255,0.8)] object-contain transition-transform duration-700 group-hover:scale-105"
           />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-wider uppercase drop-shadow-md text-center">
          Ignite the <span className="text-[#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]">Flame</span>
        </h1>

        {/* Voting Buttons (UPSCALED CARD SIZE) */}
        <div className="w-full space-y-5">
          {voteSites.map((site) => (
            <a 
              key={site.name} 
              href={site.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center p-5 bg-[#0A192F]/60 border border-[#00D2FF]/40 rounded-lg backdrop-blur-md hover:bg-[#00D2FF]/15 transition-all duration-300 hover:border-[#00D2FF] shadow-xl text-center block"
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-[#00D2FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="text-xl font-bold text-white group-hover:text-[#00D2FF] transition-colors duration-300 tracking-wide">
                Vote on {site.name}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-10 text-xs text-gray-500 font-mono tracking-widest uppercase">
          Twin Flames Network // Secured Node.
        </p>
      </div>
    </main>
  );
}

/* --- END OF FILE app/dashboard/vote/page.tsx --- */