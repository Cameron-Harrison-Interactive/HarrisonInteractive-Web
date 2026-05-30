/* --- START OF FILE app/dashboard/vote/page.tsx --- */

"use client";

import React from "react";

export default function VotePage() {
  return (
    <div className="w-full h-full min-h-[80vh] flex flex-col items-center justify-center relative z-10 py-10">
      
      {/* Main Holographic Container */}
      <div className="glass-panel border-t-4 border-t-[#FF4500] p-10 md:p-14 flex flex-col items-center text-center max-w-3xl w-full relative overflow-hidden bg-[#0a0f1a]/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl border border-white/5">
        
        {/* Background Glow inside the panel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,69,0,0.15)_0%,transparent_70%)] pointer-events-none"></div>

        {/* The Flame Icon */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-6 group">
          <div className="absolute inset-0 bg-[#FF4500]/30 blur-[30px] rounded-full animate-[pulse_2s_ease-in-out_infinite] group-hover:bg-[#FF4500]/50 transition-colors duration-500"></div>
          <img 
            src="/flame.png" 
            alt="Flame Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,69,0,0.8)] group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(255,69,0,1)] transition-transform duration-500"
          />
        </div>

        {/* Title */}
        <h1 className="font-orbitron text-4xl md:text-5xl text-[#E6EDF3] font-black tracking-[0.15em] uppercase mb-2 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
          Ignite The <span className="text-[#00BFFF] drop-shadow-[0_0_15px_rgba(0,191,255,0.8)]">Flame</span>
        </h1>

        {/* Voting Reward Notification */}
        <div className="mt-8 mb-10 border border-[#FFBF00]/40 bg-[#FFBF00]/10 px-6 py-4 rounded-lg inline-flex items-center justify-center gap-4 w-full max-w-lg shadow-[0_0_20px_rgba(255,191,0,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFBF00]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="w-3 h-3 rounded-full bg-[#FFBF00] shadow-[0_0_15px_#FFBF00] animate-pulse"></span>
          <p className="font-orbitron text-sm md:text-base text-[#E6EDF3] uppercase tracking-widest font-bold">
            Vote <span className="text-[#FFBF00] text-lg font-black">10 Times</span> to unlock <span className="text-[#FFBF00] text-lg font-black drop-shadow-[0_0_10px_rgba(255,191,0,0.8)]">+3 Extra Keys</span>!
          </p>
        </div>

        {/* Voting Links Grid */}
        <div className="w-full flex flex-col gap-4 relative z-10 max-w-lg">
          
          <VoteButton href="https://minecraft.buzz/vote/21170" label="Vote on Minecraft Buzz" />
          <VoteButton href="https://minecraft-mp.com/server-s358424" label="Vote on Minecraft-MP" />
          <VoteButton href="https://minecraft-server-list.com/server/520409/" label="Vote on Minecraft-Server-List" />
          <VoteButton href="https://minecraftservers.org/server/687860" label="Vote on MinecraftServers.org" />
          <VoteButton href="https://www.planetminecraft.com/server/twin-flames-cobblemon/" label="Vote on PlanetMinecraft" />

        </div>

        {/* Footer Element */}
        <div className="mt-14 pt-6 border-t border-[#00BFFF]/20 w-full flex flex-col items-center relative z-10">
          <p className="font-mono text-[10px] text-[#8B949E] tracking-[0.3em] uppercase animate-pulse">
            Twin Flames Network // Cobblemon Hub
          </p>
        </div>

      </div>
    </div>
  );
}

// Sub-component for the glowing voting buttons
function VoteButton({ href, label }: { href: string, label: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full overflow-hidden glass-panel border border-white/10 bg-[#050810]/80 hover:bg-[#FF4500]/10 hover:border-[#FF4500]/50 py-4 px-6 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,69,0,0.3)] rounded-lg"
    >
      {/* Button Hover Shine/Glare Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF4500]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
      
      <span className="font-orbitron text-[#E6EDF3] group-hover:text-[#FF4500] text-sm md:text-base font-bold tracking-[0.15em] uppercase relative z-10 transition-colors drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </a>
  );
}

/* --- END OF FILE app/dashboard/vote/page.tsx --- */