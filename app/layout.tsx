/* --- START OF FILE app/layout.tsx --- */

import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

// Initialize Data-Readout Font
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

// Initialize Sci-Fi HUD Font
const orbitron = Orbitron({ 
  subsets: ["latin"], 
  variable: "--font-orbitron",
  display: "swap",
});

// Global Next.js SEO & Tab Metadata
export const metadata: Metadata = {
  title: "Harrison Interactive | Neural Matrix",
  description: "Centralized Client & Dev Portal for Hi Handy and Blood-Yield.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      {/* 
        CEF-SAFE ARCHITECTURE: 
        w-full, h-full, min-h-full, flex, and flex-col are absolute requirements 
        to prevent Chromium flex-collapse inside Unreal Engine widgets. 
      */}
      <body className={`${inter.variable} ${orbitron.variable} antialiased w-full h-full min-h-full flex flex-col bg-background-dark text-white`}>
        
        {/* Global Hardware-Accelerated Scanline Overlay */}
        <div className="scanlines"></div>
        
        {/* Main Application Matrix */}
        {children}

      </body>
    </html>
  );
}

/* --- END OF FILE app/layout.tsx --- */