/* --- START OF FILE app/account/page.tsx --- */

"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const user: any = session?.user || {};
  const tier = String(user.tier || "LITE").toUpperCase();
  const neuralKey = String(user.key || user.neural_key || "NO_KEY");
  const email = String(user.email || "");
  const name = String(user.name || (email.includes("@") ? email.split("@")[0] : "DIRECTOR"));
  const billingPortal = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL || "https://billing.stripe.com/p/login/14A3cv0EsfIycr875m6g800";

  if (status === "loading") {
    return <div className="min-h-screen bg-[#010409] text-[#00BFFF] flex items-center justify-center font-mono tracking-widest uppercase">Loading account matrix...</div>;
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#010409] text-[#E6EDF3] flex items-center justify-center p-8">
        <div className="max-w-lg w-full glass-panel clip-angled border border-[#00BFFF]/40 p-10 text-center">
          <h1 className="font-orbitron text-3xl text-[#00BFFF] font-black uppercase tracking-[0.2em] mb-4">Account Required</h1>
          <p className="font-mono text-sm text-[#8B949E] mb-8">Login to view your Harrison Interactive account, license tier, and billing controls.</p>
          <button onClick={() => signIn(undefined, { callbackUrl: "/account" })} className="w-full py-4 border border-[#00BFFF]/50 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#010409] uppercase tracking-widest font-bold">
            Login / Verify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010409] text-[#E6EDF3] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end border-b border-[#00BFFF]/25 pb-6 mb-8">
          <div>
            <h1 className="font-orbitron text-4xl text-[#00BFFF] font-black uppercase tracking-[0.18em]">Account Matrix</h1>
            <p className="font-mono text-sm text-[#8B949E] uppercase tracking-widest mt-2">Welcome back, <span className="text-[#00FFFF]">{name}</span></p>
          </div>
          <div className="font-mono text-[#50C878] tracking-widest">{time}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel clip-angled border-t-2 border-t-[#00BFFF] p-6">
            <div className="text-[#8B949E] text-xs uppercase tracking-widest mb-2">Email</div>
            <div className="text-[#E6EDF3] font-mono break-all">{email}</div>
          </div>
          <div className="glass-panel clip-angled border-t-2 border-t-[#50C878] p-6">
            <div className="text-[#8B949E] text-xs uppercase tracking-widest mb-2">Tier</div>
            <div className="text-[#50C878] font-orbitron text-2xl font-bold">{tier}</div>
          </div>
          <div className="glass-panel clip-angled border-t-2 border-t-[#FFBF00] p-6">
            <div className="text-[#8B949E] text-xs uppercase tracking-widest mb-2">Neural Key</div>
            <div className="text-[#FFBF00] font-mono truncate" title={neuralKey}>{neuralKey}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/dashboard" className="glass-panel clip-angled p-6 border border-[#00BFFF]/30 hover:bg-[#00BFFF]/10 transition-all block">
            <div className="font-orbitron text-[#00BFFF] uppercase tracking-widest font-bold">Open Dashboard</div>
            <div className="font-mono text-xs text-[#8B949E] mt-2">Return to the Harrison Interactive Command Center.</div>
          </a>
          <a href={billingPortal} target="_blank" rel="noopener noreferrer" className="glass-panel clip-angled p-6 border border-[#FFBF00]/30 hover:bg-[#FFBF00]/10 transition-all block">
            <div className="font-orbitron text-[#FFBF00] uppercase tracking-widest font-bold">Billing Portal</div>
            <div className="font-mono text-xs text-[#8B949E] mt-2">Manage subscription, payment method, and invoices.</div>
          </a>
          <button onClick={() => navigator.clipboard?.writeText(neuralKey)} className="glass-panel clip-angled p-6 border border-[#50C878]/30 hover:bg-[#50C878]/10 transition-all text-left">
            <div className="font-orbitron text-[#50C878] uppercase tracking-widest font-bold">Copy Neural Key</div>
            <div className="font-mono text-xs text-[#8B949E] mt-2">Copy your current license key for support or manual validation.</div>
          </button>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="glass-panel clip-angled p-6 border border-[#DC143C]/30 hover:bg-[#DC143C]/10 transition-all text-left">
            <div className="font-orbitron text-[#DC143C] uppercase tracking-widest font-bold">Logout</div>
            <div className="font-mono text-xs text-[#8B949E] mt-2">End this browser session.</div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- END OF FILE app/account/page.tsx --- */
