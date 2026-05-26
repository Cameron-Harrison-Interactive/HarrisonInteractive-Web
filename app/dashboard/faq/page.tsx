/* --- START OF FILE app/dashboard/faq/page.tsx --- */

"use client";

import React, { useState, useMemo } from "react";

// =========================================================================
// HARRISON INTERACTIVE | THE NEURAL CODEX (SUPER-EXPANDED FAQ & GLOSSARY)
// =========================================================================
// A massive, zero-latency interactive dictionary serving as the ultimate
// Mentor guide for Unreal Engine 5 and the Hi Handy suite.
// =========================================================================

type CodexCategory = 
  | "All"
  | "Hi Handy Matrix"
  | "Unreal Engine Core"
  | "Editor Interface"
  | "Viewport Controls"
  | "Blueprint Logic"
  | "Material Pipeline";

interface CodexEntry {
  id: string;
  title: string;
  category: CodexCategory;
  keywords: string[];
  description: string;
  proTip: string;
  color: string;
}

// THE SUPER-EXPANDED MASTER DATABASE
const CODEX_DATABASE: CodexEntry[] = [
  // --- HI HANDY MATRIX ---
  {
    id: "hi_handy_jarvis",
    title: "JARVIS (Neural AI)",
    category: "Hi Handy Matrix",
    keywords: ["jarvis", "ai", "hi handy", "handy", "harrison interactive"],
    description: "Your personal AI Architect created by Harrison Interactive. JARVIS lives inside your Unreal Engine and can write code, build 3D worlds, and fix errors for you automatically!",
    proTip: "Hold Alt + Right-Click on any node, button, or setting in the Unreal Editor to summon JARVIS for an instant, contextual explanation.",
    color: "#00BFFF" // Cyan
  },
  {
    id: "hi_handy_omnilink",
    title: "Omni-Link Network",
    category: "Hi Handy Matrix",
    keywords: ["omni-link", "omnilink", "neural network", "cloud ai", "api"],
    description: "Hi Handy's super-highway to the internet. It connects your Unreal project to massive AI brains like Google Gemini, ChatGPT, or Claude to generate hyper-advanced game logic.",
    proTip: "Use the 'System Configuration' tab in the Neural Terminal to hot-swap between AI models depending on the complexity of your task.",
    color: "#00BFFF"
  },
  {
    id: "hi_handy_chrono_sync",
    title: "Chrono-Sync Exporter",
    category: "Hi Handy Matrix",
    keywords: ["chrono-sync", "chronosync", "export", "playfab", "notebooklm", "package"],
    description: "A smart tool that securely packages your game's code. It can export your work directly to PlayFab for multiplayer, or turn it into a text file so AIs can read and understand your whole game.",
    proTip: "Use the NotebookLM (.TXT) export format to feed your entire project's architecture into Google's NotebookLM for a searchable AI podcast of your code!",
    color: "#00BFFF"
  },
  {
    id: "hi_handy_lite_llm",
    title: "Handy-Lite-LLM (Local AI)",
    category: "Hi Handy Matrix",
    keywords: ["lite-llm", "handy-lite", "local ai", "offline ai", "ollama", "gpu"],
    description: "A lightweight, offline AI brain that runs directly on your computer's graphics card. It allows the Hi Handy Mentor to teach you Unreal Engine even when your Wi-Fi is disconnected!",
    proTip: "Because this runs locally, your proprietary game code never leaves your computer, ensuring 100% Air-Gapped security.",
    color: "#00BFFF"
  },
  {
    id: "hi_handy_spatial_genie",
    title: "Spatial Genie Engine",
    category: "Hi Handy Matrix",
    keywords: ["genie", "world building", "scatter", "procedural", "spawn"],
    description: "A text-to-world generator that understands physics. It scans your content browser for 3D models and scatters them perfectly across your map, firing mathematical raycasts so nothing floats awkwardly.",
    proTip: "Try typing: 'Build a dense pine forest with scattered rocks in a 5000cm radius'.",
    color: "#00BFFF"
  },
  {
    id: "hi_handy_ast_diagnostic",
    title: "AST Diagnostic Engine",
    category: "Hi Handy Matrix",
    keywords: ["ast", "diagnostic", "error", "fix", "compile error", "auto-heal"],
    description: "Reads your Blueprint wires like a human programmer. Instead of guessing, JARVIS isolates exactly where your logic is broken and automatically wires the correct nodes together to heal the graph.",
    proTip: "When a compile fails, click the 'Auto-Heal' button on the holographic popup to let JARVIS fix the wire routing instantly.",
    color: "#00BFFF"
  },

  // --- UNREAL ENGINE CORE ---
  {
    id: "ue5_nanite",
    title: "Nanite Virtualized Geometry",
    category: "Unreal Engine Core",
    keywords: ["nanite", "millions of polygons", "high poly", "virtualized geometry", "performance"],
    description: "Unreal Engine 5's magical 3D superpower. Nanite lets you drag-and-drop movie-quality 3D models with millions of triangles into your game without slowing down your computer!",
    proTip: "Enable Nanite on all your static meshes (like rocks and buildings), but keep it disabled for translucent objects like glass or water.",
    color: "#FF00FF" // Fuchsia
  },
  {
    id: "ue5_lumen",
    title: "Lumen Global Illumination",
    category: "Unreal Engine Core",
    keywords: ["lumen", "lighting", "global illumination", "reflections", "gi", "bounce light"],
    description: "Unreal Engine 5's realistic lighting engine. It calculates how light bounces off walls and colored surfaces in real-time, just like the actual sun shining through your bedroom window.",
    proTip: "If your interior rooms are completely pitch black, ensure you have a 'Post Process Volume' in your level with Infinite Extent enabled, and Lumen turned on.",
    color: "#FF00FF"
  },
  {
    id: "ue5_world_partition",
    title: "World Partition",
    category: "Unreal Engine Core",
    keywords: ["world partition", "open world", "large maps", "grid", "streaming"],
    description: "A tool for making massive open-world games. Instead of loading the entire universe at once and melting your computer, it automatically only loads the parts of the map your character is standing near.",
    proTip: "You must build your level specifically as a World Partition map from the start. You cannot easily convert a standard level into a partitioned one later.",
    color: "#FF00FF"
  },
  {
    id: "ue5_metahuman",
    title: "MetaHuman Creator",
    category: "Unreal Engine Core",
    keywords: ["metahuman", "humans", "realistic characters", "faces", "rigging"],
    description: "Epic Games' tool for generating ultra-realistic digital humans. You can customize their face, hair, and clothes, and instantly use them as players or NPCs in your game.",
    proTip: "MetaHumans come fully rigged! You can instantly apply standard Unreal Engine 5 Mannequin animations to them using the IK Retargeter.",
    color: "#FF00FF"
  },
  {
    id: "ue5_chaos_physics",
    title: "Chaos Physics System",
    category: "Unreal Engine Core",
    keywords: ["chaos", "physics", "destruction", "ragdoll", "gravity", "fracture"],
    description: "The high-performance physics engine that drives gravity, collisions, vehicles, and incredible building destruction in Unreal Engine 5.",
    proTip: "Use the 'Fracture Mode' in the editor to slice a solid wall into hundreds of pieces, allowing players to smash through it realistically.",
    color: "#FF00FF"
  },
  {
    id: "ue5_niagara",
    title: "Niagara VFX System",
    category: "Unreal Engine Core",
    keywords: ["niagara", "vfx", "particles", "fire", "smoke", "magic", "explosions"],
    description: "The visual effects engine used to create fire, smoke, rain, magic spells, and explosions. It uses a node-based interface similar to Blueprints.",
    proTip: "Use 'handy_world_forge' to spawn Niagara weather systems globally without having to manually place emitters.",
    color: "#FF00FF"
  },

  // --- EDITOR INTERFACE ---
  {
    id: "compile",
    title: "Compile Button",
    category: "Editor Interface",
    keywords: ["compile", "compiling", "build button", "save and compile", "sblueprinteditor"],
    description: "Translates your visual Blueprint nodes into computer math that Unreal Engine can understand. A green checkmark means your code is clean; a red X means JARVIS needs to fix an error for you!",
    proTip: "Always hit Compile before hitting Play. If you don't compile, your newest code changes won't exist in the game.",
    color: "#50C878" // Emerald
  },
  {
    id: "play",
    title: "Play Button (PIE)",
    category: "Editor Interface",
    keywords: ["play", "start game", "play button", "simulate", "play in editor", "pie"],
    description: "Instantly starts your game right inside the editor window! Pressing 'Escape' (Esc) will stop the game and return you to editing mode.",
    proTip: "Click the three little dots next to the Play button to change how the game launches (e.g., in a New Window or as a Standalone Game for performance testing).",
    color: "#50C878"
  },
  {
    id: "simulate",
    title: "Simulate Button",
    category: "Editor Interface",
    keywords: ["simulate", "test physics", "run logic", "no player"],
    description: "Runs the game's logic and physics without actually spawning your player character. Great for watching how AI enemies behave or seeing how a building collapses.",
    proTip: "While simulating, you can grab objects in the viewport and throw them around to test their physics properties live!",
    color: "#50C878"
  },
  {
    id: "save_all",
    title: "Save All",
    category: "Editor Interface",
    keywords: ["save all", "save current", "save modified", "disk"],
    description: "Saves your current progress across all open files. Unreal Engine does not auto-save everything instantly. Always remember to hit 'Ctrl + Shift + S' to save your hard work!",
    proTip: "If an asset in your Content Drawer has a tiny little asterisk (*) on its icon, it means it has unsaved changes.",
    color: "#50C878"
  },
  {
    id: "content_drawer",
    title: "Content Drawer",
    category: "Editor Interface",
    keywords: ["content drawer", "content browser", "files", "folders", "assets", "models", "sounds"],
    description: "The master toy box for your game. It holds all your 3D models, sounds, textures, and Blueprints. You can quickly pop this open anywhere by pressing 'Ctrl + Spacebar'.",
    proTip: "Click 'Dock in Layout' on the right side of the Content Drawer to pin it permanently to the bottom of your screen.",
    color: "#50C878"
  },
  {
    id: "outliner",
    title: "World Outliner",
    category: "Editor Interface",
    keywords: ["outliner", "world outliner", "scene list", "hierarchy", "find actor"],
    description: "A text list of every single item currently placed in your 3D level. If you ever lose a tiny coffee cup model in a massive city map, you can find it and select it from this list.",
    proTip: "Use Folders inside the Outliner to group things! (e.g., put all your streetlights into a 'Lighting' folder).",
    color: "#50C878"
  },
  {
    id: "details_panel",
    title: "Details Panel",
    category: "Editor Interface",
    keywords: ["details", "details panel", "properties", "settings", "scale", "color"],
    description: "When you click on any object, this panel shows you its secret settings. You use this to change an object's size, swap its color, or tell it to use a specific Blueprint logic.",
    proTip: "If you want to reset a changed setting back to its default value, click the tiny yellow 'Reset to Default' arrow next to it.",
    color: "#50C878"
  },
  {
    id: "project_settings",
    title: "Project Settings",
    category: "Editor Interface",
    keywords: ["project settings", "game settings", "inputs", "collisions", "maps and modes"],
    description: "The master brain for your entire video game. You go here to set up player controls (like making Spacebar = Jump) and define which level loads when the game launches.",
    proTip: "Navigate to 'Maps & Modes' here to tell the engine which Player Character to spawn by default.",
    color: "#50C878"
  },

  // --- VIEWPORT CONTROLS ---
  {
    id: "viewport",
    title: "3D Viewport",
    category: "Viewport Controls",
    keywords: ["viewport", "3d window", "scene", "camera", "perspective"],
    description: "Your magic window into the 3D world. Hold the Right Mouse Button and use the W, A, S, D keys on your keyboard to fly around just like you are playing a video game.",
    proTip: "Press 'F' while an object is selected to instantly fly the camera directly to it.",
    color: "#FFBF00" // Amber
  },
  {
    id: "transform_tools",
    title: "Transform Tools (W, E, R)",
    category: "Viewport Controls",
    keywords: ["translate", "move", "rotate", "scale", "transform", "gizmo", "arrows"],
    description: "These tools let you grab and manipulate items in the world. Press 'W' to Move, 'E' to Rotate, and 'R' to Scale (make bigger or smaller). Grab the colorful arrows to pull the object!",
    proTip: "Tap 'Spacebar' to quickly cycle through Move, Rotate, and Scale modes without reaching across your keyboard.",
    color: "#FFBF00"
  },
  {
    id: "snapping_tools",
    title: "Grid Snapping",
    category: "Viewport Controls",
    keywords: ["snap", "snapping", "grid snap", "angle snap", "surface snap", "alignment"],
    description: "The grid icons at the top right of the screen. Turning these on acts like LEGO blocks, forcing your walls and floors to click perfectly into 10cm intervals instead of being messy.",
    proTip: "Turn on Surface Snapping (the icon that looks like a box with an arrow pointing down) to stick props perfectly flush against walls and tables.",
    color: "#FFBF00"
  },
  {
    id: "camera_speed",
    title: "Camera Speed",
    category: "Viewport Controls",
    keywords: ["camera speed", "fly speed", "fast camera", "zoom"],
    description: "The camera icon in the top right. Turn it up to 8 to fly across massive mountains like Superman, or turn it down to 1 to carefully place a tiny apple on a desk.",
    proTip: "Scroll your mouse wheel up or down while flying (holding Right Mouse Button) to change your speed dynamically on the fly!",
    color: "#FFBF00"
  },
  {
    id: "view_modes",
    title: "Viewport Modes (Lit/Unlit)",
    category: "Viewport Controls",
    keywords: ["lit", "unlit", "wireframe", "lighting only", "optimization"],
    description: "Changes how the 3D world is rendered. 'Lit' is the normal game view. 'Unlit' removes shadows to see base colors. 'Wireframe' shows the underlying 3D math geometry.",
    proTip: "Use 'Optimization Viewmodes > Shader Complexity' to see which materials are causing performance lag (Red/White = Too Heavy, Green = Good).",
    color: "#FFBF00"
  },

  // --- BLUEPRINT LOGIC ---
  {
    id: "blueprint_event_graph",
    title: "Event Graph",
    category: "Blueprint Logic",
    keywords: ["event graph", "node graph", "wiring", "visual scripting", "code"],
    description: "The giant grid where you connect colorful boxes (nodes) with wires. This is how you visually write C++ code to tell your game exactly how to behave without typing complex text!",
    proTip: "Use JARVIS's 'Format Graph' action to instantly organize a messy, tangled Event Graph into a clean AAA-standard layout.",
    color: "#DC143C" // Crimson
  },
  {
    id: "blueprint_variables",
    title: "Variables",
    category: "Blueprint Logic",
    keywords: ["variables", "variable", "add variable", "boolean", "integer", "float", "string", "vector"],
    description: "Variables are digital backpacks that hold information. A 'Boolean' holds True/False. An 'Integer' holds whole numbers (like 5 apples). A 'String' holds text (like a player's name).",
    proTip: "Click the little 'eye' icon next to a variable to make it 'Public'. This lets you change its value from the main Details Panel without opening the Blueprint!",
    color: "#DC143C"
  },
  {
    id: "blueprint_pins",
    title: "Blueprint Pins",
    category: "Blueprint Logic",
    keywords: ["pin", "execution pin", "data pin", "input", "output", "wires"],
    description: "The colored circles on the sides of a node. White 'Execution' pins control the flow of time (what happens next). Colored 'Data' pins pass information (like math numbers) to the next box.",
    proTip: "Hold the 'Alt' key and click on a pin to instantly disconnect any wires attached to it.",
    color: "#DC143C"
  },
  {
    id: "node_begin_play",
    title: "Event BeginPlay",
    category: "Blueprint Logic",
    keywords: ["begin play", "event beginplay", "start", "spawn", "init"],
    description: "The starting pistol for your code! Any wire connected to this node will fire its logic exactly once, the very first millisecond the game or actor is loaded.",
    proTip: "Use this to setup initial stats, like giving the player 100 Health or hiding an object when the level loads.",
    color: "#DC143C"
  },
  {
    id: "node_tick",
    title: "Event Tick",
    category: "Blueprint Logic",
    keywords: ["event tick", "tick", "every frame", "update", "loop"],
    description: "A node that fires its code every single frame of the game (60 times a second!). Be careful: putting heavy math or complex loops here can make your game laggy.",
    proTip: "Only use Tick for things that MUST be updated constantly (like a smoothly draining stamina bar or moving a bullet).",
    color: "#DC143C"
  },
  {
    id: "node_branch",
    title: "Branch Node",
    category: "Blueprint Logic",
    keywords: ["branch", "if statement", "if else", "condition", "true false"],
    description: "The traffic cop of coding. It checks if a condition (like 'IsPlayerDead') is True or False. If True, the code goes out the top wire. If False, it goes out the bottom.",
    proTip: "Hold the 'B' key and left-click anywhere on the Event Graph to instantly spawn a Branch node!",
    color: "#DC143C"
  },
  {
    id: "node_cast",
    title: "Cast Node",
    category: "Blueprint Logic",
    keywords: ["cast to", "casting", "communicate", "identify", "talk to"],
    description: "How two different objects talk to each other. If your Player touches a box, you 'Cast to Treasure Chest' to verify it is actually a chest before telling it to open.",
    proTip: "Casting is heavy on performance. Avoid putting Cast nodes inside an Event Tick if possible.",
    color: "#DC143C"
  },
  {
    id: "node_print_string",
    title: "Print String",
    category: "Blueprint Logic",
    keywords: ["print string", "debug", "log", "text on screen", "testing"],
    description: "The ultimate debugging tool. It prints temporary colored text to the top-left of your screen. Use it to check if your code is actually firing or what a variable's value is.",
    proTip: "Click the dropdown arrow at the bottom of the node to change the color of the text so you can track multiple prints at once.",
    color: "#DC143C"
  },
  {
    id: "node_sequence",
    title: "Sequence Node",
    category: "Blueprint Logic",
    keywords: ["sequence", "then 0", "then 1", "order of operations", "organize"],
    description: "Takes one execution wire and splits it into multiple ordered wires. It fires 'Then 0', waits for that entire chain to finish, and then fires 'Then 1'.",
    proTip: "Hold the 'S' key and left-click on the graph to instantly spawn a Sequence node. Great for keeping long chains of code neat and tidy.",
    color: "#DC143C"
  },
  {
    id: "node_do_once",
    title: "DoOnce Node",
    category: "Blueprint Logic",
    keywords: ["do once", "doonce", "limit", "fire once", "reset"],
    description: "Acts like a locked gate. It allows an execution wire to pass through exactly ONE time, and then ignores all future triggers until you send a signal into its 'Reset' pin.",
    proTip: "Hold the 'O' key and left-click to spawn. Perfect for playing a sound effect when a door opens so it doesn't stutter and play 50 times at once.",
    color: "#DC143C"
  },

  // --- MATERIAL PIPELINE ---
  {
    id: "mat_base_color",
    title: "Base Color (Albedo)",
    category: "Material Pipeline",
    keywords: ["base color", "albedo", "color", "texture", "diffuse"],
    description: "The main paint bucket for your 3D objects. It decides if your object looks like red plastic, green grass, or a picture of a brick wall.",
    proTip: "For hyper-realism, never use absolute pure black (0,0,0) or absolute pure white (1,1,1) in your base colors.",
    color: "#E6EDF3" // White/Silver
  },
  {
    id: "mat_metallic",
    title: "Metallic",
    category: "Material Pipeline",
    keywords: ["metallic", "metal", "steel", "conductive", "chrome"],
    description: "A simple setting from 0 to 1. Set it to 1, and the object looks like shiny steel or gold. Set it to 0, and it acts like dull plastic, wood, or stone.",
    proTip: "Metallic should almost always be exactly 0 (Not Metal) or 1 (Metal). Rarely should it be a decimal like 0.5 unless making dirty/rusted metal.",
    color: "#E6EDF3"
  },
  {
    id: "mat_roughness",
    title: "Roughness",
    category: "Material Pipeline",
    keywords: ["roughness", "shiny", "specular", "matte", "glossy"],
    description: "Decides how blurry or sharp reflections are. A Roughness of 0 makes a perfectly clear, shiny mirror or wet floor. A Roughness of 1 makes a flat, dusty, dry surface.",
    proTip: "Hold the '1' key and left-click in the material editor to create a Constant node, then type 0.2 into it and plug it into Roughness for a nice glossy plastic.",
    color: "#E6EDF3"
  },
  {
    id: "mat_emissive",
    title: "Emissive Color",
    category: "Material Pipeline",
    keywords: ["emissive", "glowing", "emissive color", "neon", "light source"],
    description: "The glow-in-the-dark setting! Plugging a bright color into this makes the object act like a neon sign, a lightsaber, or a TV screen.",
    proTip: "Multiply your color node by a large number (like 50 or 100) using a Multiply node before plugging it into Emissive to make it glow incredibly bright with Lumen.",
    color: "#E6EDF3"
  },
  {
    id: "mat_normal",
    title: "Normal Map",
    category: "Material Pipeline",
    keywords: ["normal", "normal map", "bump", "fake 3d", "details"],
    description: "A special purple texture that tricks the lighting engine. It makes completely flat surfaces look like they have deep 3D bumps, cracks, and scratches.",
    proTip: "If your normal map looks 'inverted' (bumps look like dents), open the texture file and check the 'Flip Green Channel' box.",
    color: "#E6EDF3"
  },
  {
    id: "mat_instances",
    title: "Material Instances",
    category: "Material Pipeline",
    keywords: ["material instance", "instance", "master material", "performance", "cheap"],
    description: "A lightweight copy of a Master Material. Instead of compiling a brand new heavy shader every time you change a color, an Instance lets you adjust colors and sliders instantly with zero loading times.",
    proTip: "Right-click any Material and select 'Create Material Instance'. Apply the Instance to your meshes, not the Master Material!",
    color: "#E6EDF3"
  }
];

export default function NeuralCodexFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CodexCategory>("All");

  // Zero-Latency Client-Side Filtering
  const filteredCodex = useMemo(() => {
    return CODEX_DATABASE.filter((entry) => {
      // 1. Filter by Category
      if (activeCategory !== "All" && entry.category !== activeCategory) {
        return false;
      }
      
      // 2. Filter by Search Query (Match Title, Description, or hidden Keywords)
      if (searchQuery.trim() !== "") {
        const lowerQuery = searchQuery.toLowerCase();
        const matchTitle = entry.title.toLowerCase().includes(lowerQuery);
        const matchDesc = entry.description.toLowerCase().includes(lowerQuery);
        const matchKeyword = entry.keywords.some(k => k.toLowerCase().includes(lowerQuery));
        
        if (!matchTitle && !matchDesc && !matchKeyword) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  const categories: CodexCategory[] = [
    "All", "Hi Handy Matrix", "Unreal Engine Core", "Editor Interface", 
    "Viewport Controls", "Blueprint Logic", "Material Pipeline"
  ];

  return (
    <div className="w-full h-full flex flex-col relative z-10">
      
      {/* PAGE HEADER */}
      <div className="w-full flex flex-col mb-8 border-b border-[#00BFFF]/30 pb-4">
        <div className="flex flex-row items-center gap-4">
          <h1 className="font-orbitron text-3xl md:text-4xl text-[#00BFFF] font-black uppercase tracking-[0.15em] drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]">
            Neural Codex
          </h1>
          <span className="px-3 py-1 bg-[#50C878]/20 border border-[#50C878]/50 text-[#50C878] text-xs font-orbitron uppercase tracking-widest rounded animate-pulse hidden sm:block">
            {filteredCodex.length} DATABANKS ACTIVE
          </span>
        </div>
        <p className="font-inter text-sm text-[#8B949E] uppercase tracking-widest mt-3">
          The Harrison Interactive Master Glossary & Senior Mentor Help Guide
        </p>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="w-full flex flex-col gap-6 mb-10">
        
        {/* Search Bar */}
        <div className="relative w-full max-w-3xl glass-panel clip-angled p-2 flex items-center gap-4 border-t-2 border-t-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.1)] focus-within:shadow-[0_0_30px_rgba(0,191,255,0.3)] transition-all bg-[#010409]/80">
          <span className="text-xl pl-4 drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]">🔎</span>
          <input 
            type="text" 
            placeholder="Query the Codex (e.g. 'Lighting', 'Blueprint', 'JARVIS')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#E6EDF3] font-mono text-base placeholder:text-[#8B949E]/50 p-2"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="pr-4 text-[#DC143C] font-black hover:text-white transition-colors">
              [ X ]
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="w-full flex flex-row flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`clip-angled-button px-5 py-2.5 font-orbitron text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-[#00BFFF] text-[#010409] border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.6)]" 
                  : "bg-[#010409]/60 text-[#8B949E] border-[#8B949E]/30 hover:border-[#00BFFF] hover:text-[#00BFFF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* NO RESULTS FALLBACK */}
      {filteredCodex.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center glass-panel clip-angled border-t-4 border-[#DC143C] bg-[#010409]/60">
          <span className="text-5xl mb-4 drop-shadow-[0_0_15px_rgba(220,20,60,0.8)]">⚠️</span>
          <h2 className="font-orbitron text-2xl text-[#DC143C] font-black uppercase tracking-widest">Zero Matches Found</h2>
          <p className="font-mono text-sm text-[#8B949E] mt-2">Adjust your query parameters or broaden your search filters.</p>
        </div>
      )}

      {/* =========================================================
          THE MASSIVE MASONRY GRID (RESPONSIVE PC LAYOUT)
          ========================================================= */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20">
        
        {filteredCodex.map((entry) => (
          <div 
            key={entry.id} 
            className="holographic-card clip-angled flex flex-col p-6 bg-[#010409]/90 relative overflow-hidden transition-all group hover:-translate-y-1"
            style={{ 
              borderTopWidth: '3px', 
              borderTopColor: entry.color,
              boxShadow: `0 0 20px ${entry.color}15`
            }}
          >
            {/* Dynamic Background Glow based on Entry Color */}
            <div 
              className="absolute inset-0 bg-gradient-to-br blur-[30px] opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none z-0"
              style={{ backgroundImage: `linear-gradient(to bottom right, ${entry.color}40, transparent)` }}
            ></div>

            {/* Header */}
            <div className="flex flex-col mb-4 relative z-10 border-b border-white/10 pb-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1 opacity-70" style={{ color: entry.color }}>
                {entry.category}
              </span>
              <h3 className="font-orbitron text-lg font-bold tracking-widest uppercase text-[#E6EDF3] leading-snug">
                {entry.title}
              </h3>
            </div>

            {/* Core Description */}
            <p className="font-sans text-sm text-[#C0C0C0] leading-relaxed mb-6 relative z-10 flex-1">
              {entry.description}
            </p>

            {/* 💡 THE SENIOR MENTOR PRO-TIP */}
            <div className="mt-auto relative z-10 bg-[#010409] border p-4 rounded-sm" style={{ borderColor: `${entry.color}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="animate-pulse" style={{ color: entry.color, textShadow: `0 0 8px ${entry.color}` }}>💡</span>
                <span className="font-orbitron text-[10px] font-bold uppercase tracking-[0.2em] text-[#E6EDF3]">Mentor Tip</span>
              </div>
              <p className="font-mono text-[11px] text-[#8B949E] leading-relaxed">
                {entry.proTip}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

/* --- END OF FILE app/dashboard/faq/page.tsx --- */