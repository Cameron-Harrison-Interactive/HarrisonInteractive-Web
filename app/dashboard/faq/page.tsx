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
  | "Viewport & Lighting"
  | "Blueprint Logic"
  | "Material & UI Pipeline"
  | "Multiplayer & Network"
  | "AI & Animation"
  | "Physics, Audio & Inputs"
  | "Optimization & Profiling";

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
  // =========================================================================
  // HI HANDY MATRIX
  // =========================================================================
  {
    id: "hi_handy_jarvis",
    title: "JARVIS (Neural AI)",
    category: "Hi Handy Matrix",
    keywords: ["jarvis", "ai", "hi handy", "handy", "harrison interactive"],
    description: "Your personal AI Architect created by Harrison Interactive. JARVIS lives inside your Unreal Engine and can write code, build 3D worlds, and fix errors for you automatically!",
    proTip: "Hold Alt + Right-Click on any node, button, or setting in the Unreal Editor to summon JARVIS for an instant, contextual explanation.",
    color: "#00BFFF" 
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
    keywords: ["lite-llm", "handy-lite", "local ai", "offline ai", "ollama", "gpu", "vram"],
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

  // =========================================================================
  // UNREAL ENGINE CORE
  // =========================================================================
  {
    id: "ue5_nanite",
    title: "Nanite Virtualized Geometry",
    category: "Unreal Engine Core",
    keywords: ["nanite", "millions of polygons", "high poly", "virtualized geometry", "performance"],
    description: "Unreal Engine 5's magical 3D superpower. Nanite lets you drag-and-drop movie-quality 3D models with millions of triangles into your game without slowing down your computer!",
    proTip: "Enable Nanite on all your static meshes (like rocks and buildings), but keep it disabled for translucent objects like glass or water.",
    color: "#FF00FF" 
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
    proTip: "You must build your level specifically as a World Partition map from the start. You cannot easily convert a standard legacy level into a partitioned one later.",
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
    id: "ue5_pcg",
    title: "Procedural Content Generation (PCG)",
    category: "Unreal Engine Core",
    keywords: ["pcg", "procedural generation", "procedural content generation", "forest", "scatter"],
    description: "A node-based system that allows you to instantly generate massive forests, cities, or asteroid fields based on math rules, rather than placing everything by hand.",
    proTip: "Combine PCG with Splines (paths) so you can literally draw a road and have the PCG graph automatically generate trees and rocks along the edges.",
    color: "#FF00FF"
  },

  // =========================================================================
  // EDITOR INTERFACE
  // =========================================================================
  {
    id: "compile",
    title: "Compile Button",
    category: "Editor Interface",
    keywords: ["compile", "compiling", "build button", "save and compile", "sblueprinteditor"],
    description: "Translates your visual Blueprint nodes into computer math that Unreal Engine can understand. A green checkmark means your code is clean; a red X means JARVIS needs to fix an error for you!",
    proTip: "Always hit Compile before hitting Play. If you don't compile, your newest code changes won't exist in the game.",
    color: "#50C878" 
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
    description: "The master brain for your entire video game. You go here to set up player controls and define which level loads when the game launches.",
    proTip: "Navigate to 'Maps & Modes' here to tell the engine which Player Character to spawn by default.",
    color: "#50C878"
  },

  // =========================================================================
  // VIEWPORT & LIGHTING
  // =========================================================================
  {
    id: "viewport",
    title: "3D Viewport",
    category: "Viewport & Lighting",
    keywords: ["viewport", "3d window", "scene", "camera", "perspective"],
    description: "Your magic window into the 3D world. Hold the Right Mouse Button and use the W, A, S, D keys on your keyboard to fly around just like you are playing a video game.",
    proTip: "Press 'F' while an object is selected to instantly fly the camera directly to it.",
    color: "#FFBF00" 
  },
  {
    id: "transform_tools",
    title: "Transform Tools (W, E, R)",
    category: "Viewport & Lighting",
    keywords: ["translate", "move", "rotate", "scale", "transform", "gizmo", "arrows"],
    description: "These tools let you grab and manipulate items in the world. Press 'W' to Move, 'E' to Rotate, and 'R' to Scale (make bigger or smaller).",
    proTip: "Tap 'Spacebar' to quickly cycle through Move, Rotate, and Scale modes without reaching across your keyboard.",
    color: "#FFBF00"
  },
  {
    id: "snapping_tools",
    title: "Grid Snapping",
    category: "Viewport & Lighting",
    keywords: ["snap", "snapping", "grid snap", "angle snap", "surface snap", "alignment"],
    description: "The grid icons at the top right of the screen. Turning these on acts like LEGO blocks, forcing your walls and floors to click perfectly into intervals instead of being messy.",
    proTip: "Turn on Surface Snapping (the icon that looks like a box with an arrow pointing down) to stick props perfectly flush against walls and tables.",
    color: "#FFBF00"
  },
  {
    id: "camera_speed",
    title: "Camera Speed",
    category: "Viewport & Lighting",
    keywords: ["camera speed", "fly speed", "fast camera", "zoom"],
    description: "The camera icon in the top right. Turn it up to 8 to fly across massive mountains like Superman, or turn it down to 1 to carefully place a tiny apple on a desk.",
    proTip: "Scroll your mouse wheel up or down while flying (holding Right Mouse Button) to change your speed dynamically on the fly!",
    color: "#FFBF00"
  },
  {
    id: "view_modes",
    title: "Viewport Modes (Lit/Unlit)",
    category: "Viewport & Lighting",
    keywords: ["lit", "unlit", "wireframe", "lighting only", "optimization", "view mode"],
    description: "Changes how the 3D world is rendered. 'Lit' is the normal game view. 'Unlit' removes shadows to see base colors. 'Wireframe' shows the underlying 3D math geometry.",
    proTip: "Use 'Optimization Viewmodes > Shader Complexity' to see which materials are causing performance lag (Red/White = Too Heavy, Green = Good).",
    color: "#FFBF00"
  },
  {
    id: "light_directional",
    title: "Directional Light",
    category: "Viewport & Lighting",
    keywords: ["directional light", "sun", "sunlight", "outdoor light"],
    description: "Simulates light coming from infinitely far away. All shadows cast by this light are perfectly parallel. It is literally the Sun.",
    proTip: "You only ever need ONE Directional Light in your level. Adding more will drastically hurt performance.",
    color: "#FFBF00"
  },
  {
    id: "light_sky",
    title: "Sky Light",
    category: "Viewport & Lighting",
    keywords: ["sky light", "skylight", "ambient light", "shadow color"],
    description: "Captures the colors of the sky and clouds, and gently bounces that color into the shadows of your world to prevent them from being pitch black.",
    proTip: "Always enable 'Real Time Capture' on your Sky Light so it updates automatically when the sun goes down or the weather changes.",
    color: "#FFBF00"
  },
  {
    id: "post_process_volume",
    title: "Post Process Volume",
    category: "Viewport & Lighting",
    keywords: ["post process volume", "color grading", "bloom", "exposure", "lens flare", "vignette", "ppv"],
    description: "An invisible box that applies Instagram-style camera filters to the player's screen (like Bloom, Color Grading, Lens Flares, and Exposure).",
    proTip: "Check the 'Infinite Extent (Unbound)' box at the very bottom of its settings to apply the camera filters to the entire world, regardless of where the box is.",
    color: "#FFBF00"
  },

  // =========================================================================
  // BLUEPRINT LOGIC
  // =========================================================================
  {
    id: "actor",
    title: "Actor (Base Class)",
    category: "Blueprint Logic",
    keywords: ["actor", "object", "thing in world", "spawn actor"],
    description: "An Actor is the most basic 'thing' you can place in a level. A rock, a light, a weapon, and a player are all Actors.",
    proTip: "Actors can contain multiple 'Components'. For example, a Car Actor might contain a Mesh Component (the car body) and a Light Component (the headlights).",
    color: "#DC143C" 
  },
  {
    id: "character",
    title: "Character",
    category: "Blueprint Logic",
    keywords: ["character", "player", "npc", "character movement"],
    description: "A highly advanced version of a Pawn that comes pre-built with walking, running, jumping, and swimming logic via the CharacterMovementComponent.",
    proTip: "Unless you are making a flying spaceship game or a puzzle game, you should almost always use the Character class for your players and enemies.",
    color: "#DC143C"
  },
  {
    id: "game_mode",
    title: "GameMode",
    category: "Blueprint Logic",
    keywords: ["game mode", "gamemode", "rules", "win state"],
    description: "The referee of your game. It defines the rules: how many players are allowed, how long the match lasts, and what happens when someone scores a point.",
    proTip: "In a multiplayer game, the GameMode ONLY exists on the Server. Clients (players) cannot access or read the GameMode.",
    color: "#DC143C"
  },
  {
    id: "game_instance",
    title: "Game Instance",
    category: "Blueprint Logic",
    keywords: ["game instance", "gameinstance", "save data", "between levels", "persist"],
    description: "The absolute highest level of your game's memory. Unlike the Player or GameMode, the Game Instance is never destroyed when you load a new map. It survives from the moment the game launches until the player quits to desktop.",
    proTip: "Store player total score, overarching inventory, or selected difficulty settings here so they don't get wiped when moving from Level 1 to Level 2.",
    color: "#DC143C"
  },
  {
    id: "bpi_interface",
    title: "Blueprint Interface (BPI)",
    category: "Blueprint Logic",
    keywords: ["interface", "bpi", "blueprint interface", "message", "communicate"],
    description: "A universal contract between different Blueprints. It allows you to send a message (like 'TakeDamage' or 'Interact') to an object without needing to know exactly what that object is.",
    proTip: "Use Interfaces instead of Casting when making an interaction system. You can send 'Interact' to a Door, a Chest, and an NPC using the exact same node, saving massive amounts of performance!",
    color: "#DC143C"
  },
  {
    id: "event_dispatcher",
    title: "Event Dispatcher",
    category: "Blueprint Logic",
    keywords: ["event dispatcher", "dispatcher", "bind", "call", "delegate", "listen"],
    description: "A megaphone for your Blueprint. When a Blueprint 'Calls' an Event Dispatcher, it shouts a message to the whole game. Any other Blueprint that has 'Bound' itself to that dispatcher will instantly hear it and run its own code.",
    proTip: "This is the best way to update UI. When the Player takes damage, have them shout 'HealthChanged'. The UI listens and updates the health bar automatically without needing an Event Tick!",
    color: "#DC143C"
  },
  {
    id: "struct",
    title: "Structure (Struct)",
    category: "Blueprint Logic",
    keywords: ["struct", "structure", "data", "group variables", "inventory item"],
    description: "A custom variable you create that holds a group of other variables bundled together. Instead of having separate variables for 'WeaponName', 'WeaponDamage', and 'WeaponIcon', you pack them all into a single 'WeaponStats' Struct.",
    proTip: "Structs are the absolute backbone of inventory systems and Data Tables. Always use them to organize complex data!",
    color: "#DC143C"
  },
  {
    id: "enum",
    title: "Enumeration (Enum)",
    category: "Blueprint Logic",
    keywords: ["enum", "enumeration", "list", "dropdown", "state", "switch on enum"],
    description: "A custom dropdown list of names you create (e.g., 'Walking', 'Running', 'Crouching'). It replaces using confusing numbers to track what state a player is in.",
    proTip: "Create an Enum for 'WeaponType' (Pistol, Rifle, Shotgun) and use a 'Switch on Enum' node. It automatically creates a separate output wire for every single weapon type!",
    color: "#DC143C"
  },
  {
    id: "blueprint_event_graph",
    title: "Event Graph",
    category: "Blueprint Logic",
    keywords: ["event graph", "node graph", "wiring", "visual scripting", "code"],
    description: "The giant grid where you connect colorful boxes (nodes) with wires. This is how you visually write C++ code to tell your game exactly how to behave without typing complex text!",
    proTip: "Use JARVIS's 'Format Graph' action to instantly organize a messy, tangled Event Graph into a clean AAA-standard layout.",
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
    title: "Branch Node (If Statement)",
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
  {
    id: "node_timeline",
    title: "Timeline Node",
    category: "Blueprint Logic",
    keywords: ["timeline", "animate", "smooth", "curve", "lerp", "over time"],
    description: "The ultimate node for smooth animations. Double-click it to draw a curve over time, which you can use to smoothly move elevators, fade out lights, or change colors.",
    proTip: "Always plug your logic into the 'Update' pin to make things move. The 'Finished' pin only fires once the timeline ends.",
    color: "#DC143C"
  },

  // =========================================================================
  // MATERIAL & UI PIPELINE
  // =========================================================================
  {
    id: "mat_base_color",
    title: "Base Color (Albedo)",
    category: "Material & UI Pipeline",
    keywords: ["base color", "albedo", "color", "texture", "diffuse"],
    description: "The main paint bucket for your 3D objects. It decides if your object looks like red plastic, green grass, or a picture of a brick wall.",
    proTip: "For hyper-realism, never use absolute pure black (0,0,0) or absolute pure white (1,1,1) in your base colors. In the real world, materials absorb some light.",
    color: "#E6EDF3" 
  },
  {
    id: "mat_metallic",
    title: "Metallic",
    category: "Material & UI Pipeline",
    keywords: ["metallic", "metal", "steel", "conductive", "chrome"],
    description: "A simple setting from 0 to 1. Set it to 1, and the object looks like shiny steel or gold. Set it to 0, and it acts like dull plastic, wood, or stone.",
    proTip: "Metallic should almost always be exactly 0 (Not Metal) or 1 (Metal). Rarely should it be a decimal like 0.5 unless making dirty, painted, or rusted metal.",
    color: "#E6EDF3"
  },
  {
    id: "mat_roughness",
    title: "Roughness",
    category: "Material & UI Pipeline",
    keywords: ["roughness", "shiny", "specular", "matte", "glossy"],
    description: "Decides how blurry or sharp reflections are. A Roughness of 0 makes a perfectly clear, shiny mirror or wet floor. A Roughness of 1 makes a flat, dusty, dry surface.",
    proTip: "Hold the '1' key and left-click in the material editor to create a Constant node, then type 0.2 into it and plug it into Roughness for a nice glossy plastic.",
    color: "#E6EDF3"
  },
  {
    id: "mat_emissive",
    title: "Emissive Color",
    category: "Material & UI Pipeline",
    keywords: ["emissive", "glowing", "emissive color", "neon", "light source"],
    description: "The glow-in-the-dark setting! Plugging a bright color into this makes the object act like a neon sign, a lightsaber, or a TV screen.",
    proTip: "Multiply your color node by a large number (like 50 or 100) using a Multiply node before plugging it into Emissive to make it glow incredibly bright with Lumen.",
    color: "#E6EDF3"
  },
  {
    id: "mat_instances",
    title: "Material Instances",
    category: "Material & UI Pipeline",
    keywords: ["material instance", "instance", "master material", "performance", "cheap"],
    description: "A lightweight copy of a Master Material. Instead of compiling a brand new heavy shader every time you change a color, an Instance lets you adjust colors and sliders instantly with zero loading times.",
    proTip: "Right-click any Material and select 'Create Material Instance'. Always apply the Instance to your meshes in the world, not the Master Material!",
    color: "#E6EDF3"
  },
  {
    id: "umg_canvas_panel",
    title: "UMG: Canvas Panel",
    category: "Material & UI Pipeline",
    keywords: ["canvas panel", "canvas", "ui", "umg", "root"],
    description: "The absolute easiest way to build UI. It acts like a blank artist's canvas where you can drag and drop buttons and text anywhere you want.",
    proTip: "While great for prototyping, relying entirely on Canvas Panels can cause your UI to break on different screen sizes. Use Horizontal/Vertical boxes for professional scaling.",
    color: "#E6EDF3"
  },
  {
    id: "umg_anchors",
    title: "UMG: Anchors",
    category: "Material & UI Pipeline",
    keywords: ["anchors", "anchor", "ui scaling", "flower", "screen size"],
    description: "The little flower-shaped icon that appears when you place a UI element. Anchors tell the UI element which side of the screen it should stick to if the screen stretches or shrinks.",
    proTip: "If you put a minimap in the top-right corner, set its Anchor to Top-Right. Otherwise, it might float to the middle of the screen on ultra-wide monitors!",
    color: "#E6EDF3"
  },
  {
    id: "umg_vertical_box",
    title: "UMG: Vertical Box",
    category: "Material & UI Pipeline",
    keywords: ["vertical box", "layout", "vbox", "stack", "list"],
    description: "An invisible container that automatically stacks anything you put inside it neatly on top of each other, from top to bottom.",
    proTip: "Perfect for creating Main Menus! Put 3 Buttons inside a Vertical Box, and they will automatically align themselves into a perfect list.",
    color: "#E6EDF3"
  },

  // =========================================================================
  // MULTIPLAYER & NETWORK
  // =========================================================================
  {
    id: "replication",
    title: "Variable Replication",
    category: "Multiplayer & Network",
    keywords: ["replication", "replicate", "network", "multiplayer", "server to client"],
    description: "The core of multiplayer. Setting a variable to 'Replicated' means whenever the Server changes that variable, the exact new value is automatically beamed through the internet to all connected Clients.",
    proTip: "Clients CANNOT replicate variables to the Server. If a Client tries to change a replicated Health variable, it will only change on their screen (and likely snap back immediately). Only the Server has authority!",
    color: "#9370DB" // Purple
  },
  {
    id: "rep_notify",
    title: "RepNotify (Replication)",
    category: "Multiplayer & Network",
    keywords: ["repnotify", "rep notify", "replicated", "onrep", "multiplayer visual"],
    description: "A magical multiplayer setting for variables. When the Server changes a RepNotify variable, it doesn't just sync the value—it automatically fires a specific Function on every connected player's machine the moment the value arrives.",
    proTip: "Use RepNotify for visual effects! If the Server changes the 'EquippedWeapon' variable, the RepNotify function can automatically attach the correct 3D weapon mesh to the character's hands for everyone to see.",
    color: "#9370DB"
  },
  {
    id: "rpc_server",
    title: "Run on Server (RPC)",
    category: "Multiplayer & Network",
    keywords: ["run on server", "rpc", "server", "multiplayer event", "client to server"],
    description: "A Remote Procedure Call. This is how a player (Client) begs the Server to do something. If a player wants to shoot a gun, they fire a 'Run On Server' event, and the Server actually spawns the bullet.",
    proTip: "Never trust the Client! Always do security checks inside your 'Run On Server' events to make sure hackers aren't giving themselves infinite ammo.",
    color: "#9370DB"
  },
  {
    id: "rpc_multicast",
    title: "Multicast (RPC)",
    category: "Multiplayer & Network",
    keywords: ["multicast", "rpc", "everyone", "multiplayer event", "broadcast"],
    description: "An explosion of data. When the Server calls a Multicast event, it executes that exact code on the Server AND every single connected Client's machine simultaneously.",
    proTip: "Use Multicasts for transient, instant events that don't need to be saved, like playing a loud explosion sound or spawning a particle effect when a grenade goes off.",
    color: "#9370DB"
  },
  {
    id: "network_authority",
    title: "Switch Has Authority",
    category: "Multiplayer & Network",
    keywords: ["switch has authority", "authority", "server only", "remote"],
    description: "A node that checks who is currently running the code. The 'Authority' pin only fires if the Server is executing it. The 'Remote' pin fires if a Client is executing it.",
    proTip: "Put this right after your BeginPlay node. Use the Authority wire to spawn enemies or loot, ensuring they are only spawned by the Server and not duplicated by every connected player!",
    color: "#9370DB"
  },

  // =========================================================================
  // AI & ANIMATION
  // =========================================================================
  {
    id: "ai_controller",
    title: "AI Controller",
    category: "AI & Animation",
    keywords: ["ai controller", "aicontroller", "enemy brain", "bot"],
    description: "The artificial brain for non-player characters (NPCs). While a PlayerController reads your keyboard, an AI Controller reads Behavior Trees and sight sensors to tell enemy Pawns where to walk and who to shoot.",
    proTip: "Check the 'Auto Possess AI' setting in your enemy Character's Details panel and set it to 'Placed in World or Spawned' so the brain activates automatically.",
    color: "#FF1493" // Deep Pink
  },
  {
    id: "nav_mesh",
    title: "NavMesh Bounds Volume",
    category: "AI & Animation",
    keywords: ["navmesh", "nav mesh", "navmeshboundsvolume", "pathfinding", "walking area"],
    description: "An invisible box you drag over your level to generate pathfinding data. It calculates exactly where the floor is and where obstacles are so AI enemies know how to walk without getting stuck.",
    proTip: "Press the 'P' key on your keyboard while in the viewport to toggle the NavMesh visualizer. A bright green floor means the AI can walk there!",
    color: "#FF1493"
  },
  {
    id: "behavior_tree",
    title: "Behavior Tree",
    category: "AI & Animation",
    keywords: ["behavior tree", "bt", "ai logic", "enemy logic", "decision tree"],
    description: "A visual flow-chart used to build complex AI. It reads from top to bottom, left to right, deciding whether the enemy should patrol, investigate a noise, or attack the player.",
    proTip: "Do not put heavy math inside Behavior Tree nodes. Do the math in a Blueprint Service, save the answer to the Blackboard, and let the Behavior Tree just read the answer.",
    color: "#FF1493"
  },
  {
    id: "anim_blueprint",
    title: "Animation Blueprint (ABP)",
    category: "AI & Animation",
    keywords: ["anim blueprint", "animation blueprint", "abp", "anim_bp"],
    description: "A specialized Blueprint that strictly controls a character's skeleton. It reads variables from your player (like their speed or if they are in the air) and decides which 3D animation to play on the mesh.",
    proTip: "Keep logic out of the AnimGraph! Do all your math (like calculating speed) inside the EventGraph's 'Blueprint Update Animation' node to keep performance high.",
    color: "#FF1493"
  },
  {
    id: "blend_space",
    title: "Blend Space",
    category: "AI & Animation",
    keywords: ["blend space", "blendspace", "1d", "2d", "smooth animation", "walk to run"],
    description: "A graph that smoothly mixes animations based on numbers. Instead of snapping instantly from walking to running, a Blend Space mixes the two animations together dynamically based on your exact movement speed.",
    proTip: "A 1D Blend Space uses one number (Speed). A 2D Blend Space uses two numbers (Speed and Direction), which is perfect for strafing left and right in shooter games.",
    color: "#FF1493"
  },
  {
    id: "anim_montage",
    title: "Animation Montage",
    category: "AI & Animation",
    keywords: ["montage", "anim montage", "attack animation", "play slot"],
    description: "A way to force an animation to play immediately, hijacking the State Machine. Perfect for pressing a button to swing a sword, reload a gun, or take damage.",
    proTip: "You must add a 'Slot' node (usually 'DefaultSlot') in your AnimGraph before your Output Pose, or your Montages will literally never play!",
    color: "#FF1493"
  },

  // =========================================================================
  // PHYSICS, AUDIO & INPUTS
  // =========================================================================
  {
    id: "collision_presets",
    title: "Collision Presets",
    category: "Physics, Audio & Inputs",
    keywords: ["collision", "block", "overlap", "ignore", "hitbox"],
    description: "The rules that define how an object interacts with the world. 'Block' acts like a solid wall. 'Overlap' acts like a ghost, letting things pass through but triggering an event. 'Ignore' pretends the object doesn't exist at all.",
    proTip: "If your player is getting stuck on invisible things, check the collision presets of the lights and particle effects in your level! Make sure they are set to 'NoCollision'.",
    color: "#00FA9A" // Spring Green
  },
  {
    id: "line_trace",
    title: "Line Trace (Raycast)",
    category: "Physics, Audio & Inputs",
    keywords: ["line trace", "raycast", "hitscan", "laser", "line trace by channel"],
    description: "Fires an invisible laser beam from a start point to an end point. If it hits anything, it returns a massive 'Hit Result' bundle containing the exact object it hit, the location, and the surface normal.",
    proTip: "Change the 'Draw Debug Type' pin to 'For Duration' to actually see the laser beam while testing your sniper rifles or interaction logic.",
    color: "#00FA9A"
  },
  {
    id: "physics_material",
    title: "Physical Material",
    category: "Physics, Audio & Inputs",
    keywords: ["physics material", "physmat", "bouncy", "friction", "ice", "rubber"],
    description: "An invisible coating you apply to 3D models to give them real-world physical properties. It controls how bouncy an object is, or how much friction it has (like sliding on ice).",
    proTip: "Physical Materials are also used for footstep logic! You can assign 'Wood' or 'Dirt' to a PhysMat, and use a Line Trace to check what the player is standing on to play the correct sound.",
    color: "#00FA9A"
  },
  {
    id: "enhanced_input_action",
    title: "Input Action (Enhanced Input)",
    category: "Physics, Audio & Inputs",
    keywords: ["input action", "enhanced input", "keybind", "button press", "ia_"],
    description: "A digital representation of a command, like 'Jump' or 'Shoot'. You put these directly in your player Blueprint, entirely separated from the actual keys pressed on the keyboard.",
    proTip: "Enhanced Input Actions can return different types of data! A 'Jump' action returns a Boolean (True/False). A 'Movement' action returns a Vector2D (X and Y axis for a joystick).",
    color: "#00FA9A"
  },
  {
    id: "metasound",
    title: "MetaSounds",
    category: "Physics, Audio & Inputs",
    keywords: ["metasound", "meta sound", "audio", "music", "synthesizer"],
    description: "Unreal Engine 5's next-generation audio engine. It works exactly like a material or blueprint graph, allowing you to synthesize sounds, randomize pitches, and build interactive music natively.",
    proTip: "Use a MetaSound to completely randomize the pitch and volume of a gunshot sound effect so it never sounds repetitive to the player's ears.",
    color: "#00FA9A"
  },

  // =========================================================================
  // OPTIMIZATION & PROFILING
  // =========================================================================
  {
    id: "unreal_insights",
    title: "Unreal Insights",
    category: "Optimization & Profiling",
    keywords: ["unreal insights", "profiler", "lag", "fps drop", "performance"],
    description: "A standalone software program included with Unreal Engine. It records a microscopic telemetry timeline of your entire game, exposing the exact C++ function or Blueprint node causing your game to lag.",
    proTip: "If you have a mysterious stutter every 5 seconds, Unreal Insights is the only tool that can surgically prove if it is a Garbage Collection spike or a heavy Tick node.",
    color: "#FFD700" // Gold
  },
  {
    id: "stat_fps",
    title: "Stat Unit (Console Command)",
    category: "Optimization & Profiling",
    keywords: ["stat fps", "stat unit", "fps", "frames per second", "bottleneck"],
    description: "A terminal command you type into the editor. While 'stat fps' just shows your framerate, 'stat unit' proves exactly WHICH part of your computer is struggling: the Game (CPU), the Draw (GPU preparation), or the GPU (Graphics).",
    proTip: "Press the Tilde (~) key in the editor to open the console and type 'stat unit'. If your 'Game' time is much higher than your 'GPU' time, your Blueprint logic is too heavy!",
    color: "#FFD700"
  },
  {
    id: "hlod",
    title: "Hierarchical LOD (HLOD)",
    category: "Optimization & Profiling",
    keywords: ["hlod", "hierarchical level of detail", "lod", "optimization", "distant meshes"],
    description: "A massive optimization tool for open worlds. It takes an entire detailed city block and bakes it down into a single, low-quality mesh when the player is very far away, saving immense GPU power.",
    proTip: "HLODs are essentially mandatory for World Partition games to ensure distant mountains and skylines are visible without crashing the engine.",
    color: "#FFD700"
  },
  
  // =========================================================================
  // EDITOR INTERFACE & DETAILS PANEL (UI EXPANSION)
  // =========================================================================
  {
    id: "mode_select",
    title: "Select Mode (Shift+1)",
    category: "Editor Interface",
    keywords: ["select mode", "selection", "shift 1", "default mode"],
    description: "The default Unreal Engine mode used for clicking, moving, rotating, and scaling objects in the world.",
    proTip: "If you ever get stuck painting grass or sculpting mountains and can't click on your actors anymore, press 'Shift+1' to instantly snap back to Select Mode.",
    color: "#50C878"
  },
  {
    id: "mode_landscape",
    title: "Landscape Mode (Shift+2)",
    category: "Editor Interface",
    keywords: ["landscape mode", "terrain", "mountains", "sculpt", "shift 2"],
    description: "The toolset used to sculpt massive terrains, mountains, and valleys, and paint them with dirt, rock, and grass textures.",
    proTip: "Always use a 'Landscape Material' with 'Layer Blends'. It allows you to paint 5 or 6 different textures smoothly over the same mountain.",
    color: "#50C878"
  },
  {
    id: "mode_foliage",
    title: "Foliage Mode (Shift+3)",
    category: "Editor Interface",
    keywords: ["foliage mode", "paint trees", "grass", "scatter", "shift 3"],
    description: "A brush tool that lets you paint thousands of trees, grass blades, and rocks across your level in massive batches instantly.",
    proTip: "Hold the 'Shift' key while clicking to erase foliage you accidentally painted on the road!",
    color: "#50C878"
  },
  {
    id: "mode_modeling",
    title: "Modeling Mode (Shift+5)",
    category: "Editor Interface",
    keywords: ["modeling mode", "model", "edit mesh", "extrude", "shift 5"],
    description: "A complete 3D modeling software built directly inside Unreal Engine 5. It allows you to edit vertices, extrude walls, and fix broken 3D models without opening Blender.",
    proTip: "Use the 'PolyGroup Edit' tool to quickly select the flat face of a wall and extrude it outward to make a hallway.",
    color: "#50C878"
  },
  {
    id: "add_quixel",
    title: "Add Quixel / Megascans",
    category: "Editor Interface",
    keywords: ["quixel", "megascans", "add content", "bridge", "assets"],
    description: "The Quick Add button (a cube with a plus sign) opens the Quixel Bridge, giving you access to thousands of photorealistic 3D scans of the real world.",
    proTip: "Quixel Megascans are 100% free for anyone using Unreal Engine. You can drag and drop AAA-quality cliffs and brick walls directly into your map.",
    color: "#50C878"
  },
  {
    id: "world_settings",
    title: "World Settings",
    category: "Editor Interface",
    keywords: ["world settings", "level settings", "override gamemode"],
    description: "A secret panel that defines the specific rules for the map you are currently looking at.",
    proTip: "Use World Settings to override your GameMode! You can set it so Level 1 uses the 'Shooter' GameMode, but the Main Menu map uses the 'Menu' GameMode.",
    color: "#50C878"
  },
  {
    id: "output_log",
    title: "Output Log",
    category: "Editor Interface",
    keywords: ["output log", "console", "errors", "red text", "warnings"],
    description: "The scrolling text matrix at the bottom of the screen where the engine reports errors, print strings, and warnings.",
    proTip: "If your game crashes or freezes, the Output Log will almost always tell you exactly which Blueprint and which Node caused the error in bright red text.",
    color: "#50C878"
  },
  {
    id: "content_filters",
    title: "Content Drawer Filters",
    category: "Editor Interface",
    keywords: ["filter", "content filter", "funnel icon", "search assets"],
    description: "The little funnel icon in the Content Drawer. It allows you to instantly hide thousands of files and only show specific types of assets.",
    proTip: "Click the filter icon and select 'Blueprint Class'. This instantly hides all the messy textures, 3D models, and sounds, showing ONLY your programmable code files!",
    color: "#50C878"
  },
  
  // =========================================================================
  // VIEWPORT & LIGHTING (EXPANSION)
  // =========================================================================
  {
    id: "viewport_orthographic",
    title: "Orthographic Views",
    category: "Viewport & Lighting",
    keywords: ["orthographic", "perspective", "top view", "side view", "front view", "2d"],
    description: "Changes the camera from a 3D perspective to perfectly flat 2D blueprints. This removes depth, making it incredibly easy to line up walls and floors precisely.",
    proTip: "Press 'Alt+G' for 3D Perspective, 'Alt+J' for Top View, and 'Alt+H' for Front View. Use Middle-Mouse click + drag in 2D views to measure exact distances in centimeters!",
    color: "#FFBF00"
  },

  // =========================================================================
  // PHYSICS, AUDIO & INPUTS (DETAILS PANEL EXPANSION)
  // =========================================================================
  {
    id: "mobility_static",
    title: "Mobility: Static",
    category: "Physics, Audio & Inputs",
    keywords: ["static", "mobility static", "immovable", "baked lighting"],
    description: "Tells the engine this object will NEVER move, rotate, or scale during the game.",
    proTip: "Set your walls, floors, and heavy buildings to Static. The engine will pre-calculate (bake) lighting for them, saving massive amounts of GPU performance.",
    color: "#00FA9A"
  },
  {
    id: "mobility_stationary",
    title: "Mobility: Stationary",
    category: "Physics, Audio & Inputs",
    keywords: ["stationary", "mobility stationary", "light mobility"],
    description: "Usually used for Lights. It means the object cannot move its location, but it CAN change its color or brightness during the game.",
    proTip: "You can only have 4 overlapping Stationary lights casting shadows at the same time. If a light turns into a Red X, you have too many overlapping!",
    color: "#00FA9A"
  },
  {
    id: "mobility_movable",
    title: "Mobility: Movable",
    category: "Physics, Audio & Inputs",
    keywords: ["movable", "mobility movable", "dynamic"],
    description: "Tells the engine this object can move, fall, be destroyed, or be picked up by the player.",
    proTip: "Movable objects cast dynamic, real-time shadows, which are very heavy on performance. Do not make a coffee cup 'Movable' unless the player actually needs to kick it.",
    color: "#00FA9A"
  },
  {
    id: "simulate_physics",
    title: "Simulate Physics",
    category: "Physics, Audio & Inputs",
    keywords: ["simulate physics", "gravity", "ragdoll", "falling", "physics"],
    description: "Checking this box enables real-world gravity and collision for the object, allowing it to fall, roll, and bounce off walls.",
    proTip: "If you check this box and your object falls straight through the floor, open its Static Mesh window and ensure it actually has a green Collision Box generated around it!",
    color: "#00FA9A"
  },
  {
    id: "generate_overlap_events",
    title: "Generate Overlap Events",
    category: "Physics, Audio & Inputs",
    keywords: ["generate overlap events", "overlap", "trigger", "sensor"],
    description: "Allows the object to act like a sensor, triggering an event when the player or a bullet passes completely through it.",
    proTip: "Turn this OFF in the Details Panel for background props like rocks, mountains, and trees. Disabling unnecessary overlaps massively boosts your CPU performance.",
    color: "#00FA9A"
  },
  {
    id: "hidden_in_game",
    title: "Hidden In Game",
    category: "Physics, Audio & Inputs",
    keywords: ["hidden in game", "invisible", "hide"],
    description: "Checking this box keeps the object visible while you are working in the editor, but makes it completely invisible the moment you hit Play.",
    proTip: "Perfect for hiding ugly red trigger boxes, invisible walls, or spawn markers from the player.",
    color: "#00FA9A"
  },
  {
    id: "cast_shadow",
    title: "Cast Shadow",
    category: "Physics, Audio & Inputs",
    keywords: ["cast shadow", "shadows", "lighting optimization"],
    description: "Determines if this 3D model blocks light and creates a shadow on the ground.",
    proTip: "Turn this OFF for invisible trigger boxes, the sky sphere, and tiny ground debris. Calculating shadows for tiny pebbles wastes tons of frames per second!",
    color: "#00FA9A"
  },
  {
    id: "actor_tags",
    title: "Actor Tags",
    category: "Physics, Audio & Inputs",
    keywords: ["actor tags", "tags", "component tags", "labels"],
    description: "Hidden text labels you can attach to an object in the Details Panel (e.g., typing 'Enemy' or 'Fire').",
    proTip: "Instead of Casting to see if a laser hit an enemy, just check if the Hit Actor 'Actor Has Tag: Enemy'. It is incredibly fast and works on anything!",
    color: "#00FA9A"
  },

  // =========================================================================
  // BLUEPRINT LOGIC (EXPANSION)
  // =========================================================================
  {
    id: "bp_components_panel",
    title: "Components Panel",
    category: "Blueprint Logic",
    keywords: ["components panel", "components", "add component", "hierarchy"],
    description: "The top-left box when you open a Blueprint. This is where you physically assemble your actor by adding 3D meshes, lights, audio speakers, and collision boxes.",
    proTip: "The hierarchy matters! If you drag a Light Component *onto* a Mesh Component, the light will become a child, meaning if the mesh rotates, the light rotates with it!",
    color: "#DC143C"
  },
  {
    id: "bp_construction_script",
    title: "Construction Script",
    category: "Blueprint Logic",
    keywords: ["construction script", "constructor", "before play", "editor script"],
    description: "A special Blueprint graph that runs its code instantly in the editor window *before* you even hit Play.",
    proTip: "Use this to change the color of a car mesh based on a variable. As you change the variable in the Details Panel, the car will change color live in the viewport!",
    color: "#DC143C"
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
    "All", 
    "Hi Handy Matrix", 
    "Unreal Engine Core", 
    "Editor Interface", 
    "Viewport & Lighting", 
    "Blueprint Logic", 
    "Material & UI Pipeline",
    "Multiplayer & Network",
    "AI & Animation",
    "Physics, Audio & Inputs",
    "Optimization & Profiling"
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
            placeholder="Query the Codex (e.g. 'Lighting', 'RPC', 'Network')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#E6EDF3] font-mono text-base placeholder:text-[#8B949E]/50 p-2"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="pr-4 text-[#DC143C] font-black hover:text-white transition-colors cursor-pointer">
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
              className={`clip-angled-button px-5 py-2.5 font-orbitron text-[11px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
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