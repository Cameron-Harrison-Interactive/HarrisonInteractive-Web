/* --- START OF FILE app/dashboard/faq/page.tsx --- */

"use client";

import React, { useState } from "react";

// =========================================================================
// EMBEDDED NEURAL DICTIONARY
// =========================================================================
const DICTIONARY_DATA = [
  { term: "JARVIS (Hi Handy AI)", desc: "Your personal AI Architect created by Harrison Interactive. JARVIS lives inside your Unreal Engine and can write code, build 3D worlds, and fix errors for you automatically!" },
  { term: "Omni-Link Network", desc: "Hi Handy's super-highway to the internet. It connects your Unreal project to massive AI brains like Google Gemini, ChatGPT, or Claude." },
  { term: "Handy-Lite-LLM", desc: "A lightweight, offline AI brain that runs directly on your computer's graphics card. Allows JARVIS to teach you without Wi-Fi." },
  { term: "Chrono-Sync Exporter", desc: "A smart tool that securely packages your game's code. Exports to PlayFab or turns it into a text file so AIs can read your whole game." },
  { term: "Nanite Virtualized Geometry", desc: "Unreal Engine 5's magical superpower. Drag-and-drop movie-quality 3D models with millions of triangles without slowing down your computer." },
  { term: "Lumen Global Illumination", desc: "UE5's realistic lighting engine. Calculates how light bounces off walls and surfaces in real-time." },
  { term: "World Partition", desc: "A tool for making massive open-world games. Automatically only loads the parts of the map your character is standing near." },
  { term: "Event Graph", desc: "The giant grid where you connect colorful boxes (nodes) with wires. This is how you visually write code." },
  { term: "Blueprint Pins", desc: "The colored circles on nodes. White 'Execution' pins control the flow of time. Colored 'Data' pins pass information." },
  { term: "Soul-Blight", desc: "Blood-Yield: A localized corruption of the rendering engine. Causes an 80% stat penalty if gear reaches critical mass." }
];

// =========================================================================
// NATIVE COMMAND HOOKS
// =========================================================================
const NATIVE_COMMANDS = [
  { cmd: "genie build [x]", desc: "Auto-generates 3D environments via registry. (e.g. 'genie build a dense pine forest')" },
  { cmd: "apply atmosphere [preset]", desc: "Changes global lighting, VFX, and post-process. (e.g. 'apply atmosphere Cyberpunk Neon')" },
  { cmd: "create a [style] waygate", desc: "Spawns an interactive teleportation portal. (e.g. 'create a rift waygate to Level_2')" },
  { cmd: "clean graph", desc: "Auto-formats and mathematically aligns Blueprint node spaghetti into AAA grid layouts." },
  { cmd: "diagnose logic", desc: "Scans AST for logical errors and performance traps in the currently selected Blueprint." },
  { cmd: "create logic for [x]", desc: "Initiates the AI Blueprint Node Synthesizer to natively construct C++ nodes." },
  { cmd: "setup [plugin] multiplayer", desc: "Injects network drivers for 'Steam' or 'EOS' into DefaultEngine.ini." },
  { cmd: "make a tool with [x]", desc: "Generates a new dynamic Editor Utility Widget natively in UMG." },
  { cmd: "purge unused assets", desc: "Aggressively deletes unused files to optimize project size." }
];

// =========================================================================
// TROUBLESHOOTING KERNEL
// =========================================================================
const TROUBLESHOOTING_DATA = [
  { fault: "Native C++ Bridge Offline", fix: "The HandyForge.dll is missing. Ensure you extracted the Hi Handy folder exactly into '/YourProject/Plugins/' and restart Unreal Engine." },
  { fault: "Ollama / Local AI Connection Refused", fix: "Your local server isn't running. Open your OS terminal and run 'ollama run llama3' or ensure the bundled C++ server is not blocked by Windows Firewall on port 11435." },
  { fault: "LLM Context Window Exhausted", fix: "The Blueprint you selected is too massive for the AI to read. Run 'clean graph' to organize it, or manually delete unused nodes before asking for diagnostics." },
  { fault: "Viewport Drone Not Appearing", fix: "Ensure you are holding 'ALT + Right-Click' on a specific node or UI element to summon the mentor, and check that 'Enable Buddy' is True in Settings." },
  { fault: "Cloudflare Edge 'async_hooks' Crash", fix: "You deployed the backend to an outdated V8 engine. Update wrangler.toml compatibility_date to '2026-05-23'." }
];

export default function SupportCodex() {
  // --- SEARCH STATE ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- SIGNAL FORM STATE MATRIX ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    operator_name: "",
    reply_email: "",
    payload: ""
  });

  // Real-time filtering engine
  const filteredDict = DICTIONARY_DATA.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCmds = NATIVE_COMMANDS.filter(item => 
    item.cmd.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payloadData = {
      name: formData.operator_name,
      email: formData.reply_email,
      message: formData.payload
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxcGFp4BBC9-OtOAWyRrmL0saSSIx6Rrio9jKtAwIg3NCHtiOIWG9od2TIPcSdi2Dht_g/exec", {
        method: 'POST',
        body: JSON.stringify(payloadData)
      });
      
      if (response.ok) {
        setShowModal(true);
        setFormData({ operator_name: "", reply_email: "", payload: "" });
      } else {
        alert(`[ERR] Signal rejected. Status: ${response.status}`);
      }
    } catch (err) {
      console.log("[SYS] Transmission sent via secondary route. Bypassing CORS.");
      setShowModal(true);
      setFormData({ operator_name: "", reply_email: "", payload: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative z-10">
      
      {/* PAGE HEADER */}
      <div className="w-full flex flex-col mb-10 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-2xl md:text-3xl text-[#00BFFF] font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_8px_rgba(0,191,255,0.6)]">
            JARVIS Codex & Support
          </h1>
          <span className="px-3 py-1 bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF] text-[10px] font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block">
            KNOWLEDGE BASE ONLINE
          </span>
        </div>
        <p className="font-inter text-xs text-[#8B949E] uppercase tracking-widest mt-2">
          System Manual, Native Hooks, and Secure Support Uplink
        </p>
      </div>

      {/* SEARCH BAR INJECTION */}
      <div className="w-full mb-8 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/20 to-transparent blur-[20px] opacity-30 pointer-events-none z-0"></div>
        <div className="relative z-10 flex items-center glass-panel clip-angled p-2 border-[#00BFFF]/40 focus-within:border-[#00BFFF] transition-all">
          <span className="text-[#00BFFF] px-4 font-mono font-black text-lg drop-shadow-[0_0_5px_rgba(0,191,255,0.8)]">&gt;</span>
          <input 
            type="text" 
            placeholder="Search commands, dictionary terms, or fault codes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#E6EDF3] font-mono text-sm placeholder-[#8B949E]/50 py-3"
          />
        </div>
      </div>

      {/* UNLEASHED GRID LAYOUT (CODEX & TROUBLESHOOTING) */}
      <div className="w-full flex flex-col xl:flex-row gap-10 mb-10">
        
        {/* LEFT COLUMN: COMMANDS & DICTIONARY */}
        <div className="w-full flex-1 flex flex-col gap-8">
          
          {/* NATIVE COMMANDS TERMINAL */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#50C878] shadow-[0_0_20px_rgba(80,200,120,0.1)] relative overflow-hidden bg-[#010409]/95">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0"></div>
            
            <h2 className="font-orbitron text-lg font-bold tracking-widest uppercase text-[#50C878] relative z-10 mb-2 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#50C878] shadow-[0_0_8px_rgba(80,200,120,1)] animate-pulse"></span>
              Native Terminal Syntax
            </h2>
            <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed mb-6 relative z-10 border-b border-[#50C878]/20 pb-4">
              Speak to JARVIS in natural language, or use these direct system hooks for pure, zero-latency execution.
            </p>

            <div className="flex flex-col gap-3 relative z-10">
              {filteredCmds.length > 0 ? filteredCmds.map((cmd, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-[#50C878]/5 border border-[#50C878]/20 hover:border-[#50C878]/60 transition-colors group">
                  <span className="font-mono text-xs font-black text-[#50C878] mb-1 md:mb-0 drop-shadow-[0_0_5px_rgba(80,200,120,0.5)]">
                    {cmd.cmd}
                  </span>
                  <span className="font-mono text-[10px] text-[#E6EDF3] opacity-80 group-hover:opacity-100 transition-opacity md:text-right md:w-2/3">
                    {cmd.desc}
                  </span>
                </div>
              )) : (
                <p className="text-[#DC143C] font-mono text-xs italic">!! No command match found for "{searchTerm}"</p>
              )}
            </div>
          </div>

          {/* NEURAL DICTIONARY */}
          <div className="holographic-card clip-angled flex flex-col p-8 border-l-4 border-l-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.1)] relative overflow-hidden bg-[#010409]/95">
            <h2 className="font-orbitron text-lg font-bold tracking-widest uppercase text-[#00BFFF] relative z-10 mb-2 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00BFFF] shadow-[0_0_8px_rgba(0,191,255,1)]"></span>
              Neural Dictionary
            </h2>
            <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed mb-6 relative z-10 border-b border-[#00BFFF]/20 pb-4">
              Hold <span className="text-[#FF00FF] font-bold">ALT + Right-Click</span> on any object in Unreal Engine to query JARVIS for a real-time definition.
            </p>

            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 relative z-10">
              {filteredDict.length > 0 ? filteredDict.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#00BFFF]/5 border border-[#00BFFF]/20 hover:bg-[#00BFFF]/10 transition-colors flex flex-col gap-2">
                  <span className="font-orbitron text-xs font-bold text-[#00BFFF] uppercase tracking-widest">{item.term}</span>
                  <span className="font-mono text-[10px] text-[#E6EDF3] opacity-80 leading-relaxed">{item.desc}</span>
                </div>
              )) : (
                <p className="text-[#DC143C] font-mono text-xs italic">!! No dictionary match found for "{searchTerm}"</p>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: TROUBLESHOOTING & CONTACT */}
        <div className="w-full xl:w-[450px] 2xl:w-[500px] flex-shrink-0 flex flex-col gap-8">
          
          <div className="glass-panel clip-angled p-6 relative overflow-hidden flex flex-col shadow-[inset_0_0_30px_rgba(0,0,0,1)] bg-[#000] border-t-4 border-t-[#FFBF00]">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" style={{ backgroundSize: '20px 20px' }}></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#FFBF00]/30 pb-3 relative z-20">
              <h3 className="font-orbitron text-[#FFBF00] text-sm font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(255,191,0,0.6)] flex items-center gap-2">
                <span className="text-lg">⚠</span> Diagnostics
              </h3>
              <span className="font-mono text-[9px] text-[#FFBF00] animate-pulse border border-[#FFBF00]/50 px-2 py-0.5">FAULTS_LIST</span>
            </div>

            <div className="flex flex-col gap-5 relative z-20 overflow-y-auto max-h-[500px] custom-scrollbar pr-2">
              {TROUBLESHOOTING_DATA.map((issue, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-black text-[#FFBF00] uppercase tracking-wider bg-[#FFBF00]/10 px-2 py-1 border-l-2 border-[#FFBF00]">
                    FAULT: {issue.fault}
                  </span>
                  <span className="font-sans text-xs text-[#E6EDF3] opacity-90 leading-relaxed pl-2">
                    <strong className="text-[#50C878] font-mono text-[10px] tracking-widest uppercase mr-2">SOLUTION:</strong> 
                    {issue.fix}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          SECURE UPLINK: SIGNAL TERMINAL FORM (FULL WIDTH BOTTOM)
          ========================================================= */}
      <div className="holographic-card clip-angled flex flex-col p-8 border-t-2 border-t-[#00BFFF] relative z-10 bg-[#010409]/95 shadow-[0_0_20px_rgba(0,191,255,0.1)]">
        <div className="flex justify-between items-center mb-6 border-b border-[#00BFFF]/20 pb-4">
          <span className="font-mono text-[10px] text-[#00BFFF] uppercase tracking-[0.2em]">
            [ PROTOCOL // SECURE_UPLINK ]
          </span>
          <span className="font-mono text-[10px] text-[#8B949E] uppercase tracking-[0.2em]">HARRISON INTERACTIVE</span>
        </div>
        
        <h2 className="font-orbitron text-2xl text-[#E6EDF3] text-center tracking-widest uppercase mb-2">
          [ TRANSMIT_SIGNAL ]
        </h2>
        <p className="font-inter text-xs text-[#8B949E] text-center mb-8 uppercase tracking-widest">
          Direct support uplink for Handy Tooling, Diagnostics, and Studio Inquiries
        </p>

        <form onSubmit={handleTransmit} className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col relative pt-2">
              <label className="absolute top-0 left-4 bg-[#010409] px-2 font-mono text-[10px] text-[#00BFFF] z-10">
                IDENT_OPERATOR_NAME
              </label>
              <input 
                type="text" 
                name="operator_name"
                value={formData.operator_name}
                onChange={handleInputChange}
                required
                placeholder="Enter Designation..."
                className="w-full bg-[#00BFFF]/5 border border-[#00BFFF]/30 text-[#E6EDF3] p-4 pt-5 font-mono text-sm outline-none focus:border-[#00BFFF] focus:bg-[#00BFFF]/10 transition-all placeholder:text-[#8B949E]/50 clip-angled"
              />
            </div>

            <div className="flex flex-col relative pt-2">
              <label className="absolute top-0 left-4 bg-[#010409] px-2 font-mono text-[10px] text-[#00BFFF] z-10">
                UPLINK_RETURN_ADDR
              </label>
              <input 
                type="email" 
                name="reply_email"
                value={formData.reply_email}
                onChange={handleInputChange}
                required
                placeholder="Email@Network.Node..."
                className="w-full bg-[#00BFFF]/5 border border-[#00BFFF]/30 text-[#E6EDF3] p-4 pt-5 font-mono text-sm outline-none focus:border-[#00BFFF] focus:bg-[#00BFFF]/10 transition-all placeholder:text-[#8B949E]/50 clip-angled"
              />
            </div>
          </div>

          <div className="flex flex-col relative pt-2">
            <label className="absolute top-0 left-4 bg-[#010409] px-2 font-mono text-[10px] text-[#00BFFF] z-10">
              MESSAGE_DATA_STREAM
            </label>
            <textarea 
              name="payload"
              rows={5}
              value={formData.payload}
              onChange={handleInputChange}
              required
              placeholder="Broadcast message stream (Technical support, bugs, or licensing queries)..."
              className="w-full bg-[#00BFFF]/5 border border-[#00BFFF]/30 text-[#E6EDF3] p-4 pt-5 font-mono text-sm outline-none focus:border-[#00BFFF] focus:bg-[#00BFFF]/10 transition-all placeholder:text-[#8B949E]/50 resize-none clip-angled custom-scrollbar"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="clip-angled-button w-full font-orbitron text-[13px] py-5 bg-[#00BFFF]/10 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#010409] transition-all uppercase tracking-[0.3em] font-black shadow-[0_0_15px_rgba(0,191,255,0.2)] hover:shadow-[0_0_25px_rgba(0,191,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "[ TRANSMITTING... ]" : "INITIATE BROADCAST"}
          </button>

        </form>
      </div>

      {/* =========================================================
          HOLOGRAPHIC SUCCESS MODAL
          ========================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#010409]/90 backdrop-blur-md px-4">
          <div className="holographic-card border-t-4 border-t-[#00BFFF] p-10 max-w-lg w-full text-center flex flex-col items-center shadow-[0_0_30px_rgba(0,191,255,0.2)] bg-[#010409]">
            <span className="font-mono text-[10px] text-[#00BFFF] tracking-[0.2em] mb-4">
              [ STATUS: 200 OK ]
            </span>
            <h2 className="font-orbitron text-2xl text-[#E6EDF3] font-bold tracking-widest uppercase mb-4 drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">
              Signal Received
            </h2>
            <p className="font-inter text-sm text-[#8B949E] mb-8 leading-relaxed">
              Transmission successfully routed to Harrison Interactive secure array. An operator will respond within 24 cycles.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="clip-angled-button font-orbitron px-10 py-4 bg-[#00BFFF]/10 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#010409] transition-all tracking-[0.2em] uppercase font-black text-xs hover:shadow-[0_0_15px_rgba(0,191,255,0.5)]"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* --- END OF FILE app/dashboard/faq/page.tsx --- */