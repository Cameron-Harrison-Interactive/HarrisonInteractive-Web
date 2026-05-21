/* --- START OF FILE app/page.tsx --- */

import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full min-h-full flex flex-col items-center justify-center p-6 md:p-12 relative z-10 overflow-hidden">
      
      {/* 
        The primary holographic auth container. 
        Utilizes our custom CSS classes for the sci-fi chamfered corners and glass-blur effect.
      */}
      <div className="glass-panel clip-angled holographic-card flex flex-col items-center justify-center p-10 md:p-16 max-w-3xl w-full text-center relative">
        
        {/* Subtle background tech accents */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent opacity-50"></div>

        <h1 className="font-orbitron text-4xl md:text-6xl font-bold tracking-[0.1em] text-[#00BFFF] uppercase mb-4 drop-shadow-[0_0_12px_rgba(0,191,255,0.8)]">
          Harrison Interactive
        </h1>
        
        <p className="font-orbitron text-[#00FFFF] animate-pulse text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
          Neural Interface v2.5 // Auth Gateway Online
        </p>

        {/* 
          ROUTING FIX APPLIED: 
          Styles are now applied directly to the <Link> element. No nested <button> to swallow the click.
        */}
        <Link 
          href="/dashboard" 
          className="font-orbitron clip-angled px-10 py-4 border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#010409] transition-all duration-300 uppercase tracking-[0.15em] font-bold shadow-[0_0_15px_rgba(0,191,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] w-full sm:w-auto text-center block"
        >
          Initialize Matrix Uplink
        </Link>
        
        {/* Status Readout Footer */}
        <div className="mt-12 flex flex-row gap-4 justify-center items-center opacity-70">
            <span className="h-1 w-12 bg-[#00BFFF] rounded shadow-[0_0_8px_rgba(0,191,255,0.8)]"></span>
            <span className="font-inter text-[10px] tracking-widest uppercase text-[#8B949E]">
              Secure Connection Established
            </span>
            <span className="h-1 w-12 bg-[#00BFFF] rounded shadow-[0_0_8px_rgba(0,191,255,0.8)]"></span>
        </div>

      </div>

    </main>
  );
}

/* --- END OF FILE app/page.tsx --- */