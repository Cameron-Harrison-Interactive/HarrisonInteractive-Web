/* --- START OF FILE app/account/page.tsx --- */

"use client";

import React, { Suspense, useEffect, useState } from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

function AccountMatrixContent() {
  const sessionContext = useSession();
  const session = sessionContext?.data;
  const status = sessionContext?.status || "loading";

  const [time, setTime] = useState("00:00:00");
  const [checkoutLoading, setCheckoutLoading] = useState<"elite" | "ultimate" | null>(null);
  const [accountLog, setAccountLog] = useState<string[]>([
    "[SYS] Account Matrix initialized.",
    "[SYS] Awaiting biometric/session state...",
  ]);
  const [computeBalance, setComputeBalance] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/compute/balance")
      .then((res) => res.json())
      .then((data) => {
        if (data?.ok) {
          setComputeBalance(data);
          appendLog("[COMPUTE] Compute Box balance synced.");
        } else if (data?.error) {
          appendLog(`!! [COMPUTE] ${data.error}`);
        }
      })
      .catch((error) => appendLog(`!! [COMPUTE] ${error?.message || String(error)}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  const user: any = session?.user || {};
  const tier = String(user.tier || "LITE").toUpperCase();
  const neuralKey = String(user.key || user.neural_key || "NO_KEY");
  const email = String(user.email || "");
  const name = String(user.name || (email.includes("@") ? email.split("@")[0] : "DIRECTOR"));
  const userId = String(user.id || user.user_id || "");
  const billingDate = String(user.billingDate || user.billing_date || "");
  const billingPortal = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL || "https://billing.stripe.com/p/login/14A3cv0EsfIycr875m6g800";

  const computeIncluded = Number(computeBalance?.included ?? (tier === "ULTIMATE" ? 250000 : 0));
  const computeUsed = Number(computeBalance?.used ?? user.computeUsed ?? user.compute_used ?? 0);
  const computeRemaining = Number(computeBalance?.remaining ?? Math.max(0, computeIncluded - computeUsed));
  const computeMeteringEnabled = Boolean(computeBalance?.metering_enabled);

  const appendLog = (line: string) => {
    setAccountLog((prev) => [...prev.slice(-10), line]);
  };

  const startCheckout = async (targetTier: "elite" | "ultimate") => {
    setCheckoutLoading(targetTier);
    appendLog(`[BILLING] Requesting ${targetTier.toUpperCase()} checkout session...`);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: targetTier, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        appendLog(`!! [BILLING] ${data.error || "Checkout session failed."}`);
        return;
      }
      appendLog("[BILLING] Stripe checkout session created. Opening secure portal...");
      window.open(data.checkoutUrl, "_blank", "noopener,noreferrer");
    } catch (error: any) {
      appendLog(`!! [BILLING] ${error?.message || String(error)}`);
    } finally {
      setCheckoutLoading(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#010409] text-[#00BFFF] flex items-center justify-center font-mono tracking-widest uppercase">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-[#00BFFF]/20 border-t-[#00BFFF] rounded-full animate-spin shadow-[0_0_18px_rgba(0,191,255,0.45)]" />
          <span>Loading Account Matrix...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#010409] text-[#E6EDF3] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="max-w-lg w-full glass-panel clip-angled border border-[#00BFFF]/40 p-10 text-center relative z-10">
          <h1 className="font-orbitron text-3xl text-[#00BFFF] font-black uppercase tracking-[0.2em] mb-4">Account Required</h1>
          <p className="font-mono text-sm text-[#8B949E] mb-8">Login to view your Harrison Interactive account, license tier, billing controls, and H.E.L.E.N.A. device authorization state.</p>
          <button onClick={() => signIn(undefined, { callbackUrl: "/account" })} className="w-full py-4 border border-[#00BFFF]/50 text-[#00BFFF] hover:bg-[#00BFFF] hover:text-[#010409] uppercase tracking-widest font-bold clip-angled-button">
            Login / Verify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010409] text-[#E6EDF3] p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00BFFF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-[#00BFFF]/25 pb-6 mb-8 gap-6">
          <div>
            <h1 className="font-orbitron text-4xl text-[#00BFFF] font-black uppercase tracking-[0.18em] drop-shadow-[0_0_10px_rgba(0,191,255,0.6)]">Account Matrix</h1>
            <p className="font-mono text-sm text-[#8B949E] uppercase tracking-widest mt-2">Welcome back, <span className="text-[#00FFFF]">{name}</span>. Account systems nominal.</p>
          </div>
          <div className="glass-panel px-6 py-4 border-[#00BFFF]/30 rounded clip-angled flex gap-6 items-center">
            <div className="text-right">
              <div className="font-mono text-[10px] text-[#8B949E] uppercase tracking-[0.2em]">Matrix Time</div>
              <div className="font-orbitron text-xl text-[#00BFFF] tracking-widest">{time}</div>
            </div>
            <div className="w-px h-10 bg-[#00BFFF]/30" />
            <div>
              <div className="font-mono text-[10px] text-[#8B949E] uppercase tracking-[0.2em]">Auth State</div>
              <div className="font-orbitron text-xl text-[#50C878] tracking-widest">ACTIVE</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel clip-angled border-t-2 border-t-[#00BFFF] p-6">
            <div className="text-[#8B949E] text-xs uppercase tracking-widest mb-2">Email</div>
            <div className="text-[#E6EDF3] font-mono break-all">{email || "No email linked"}</div>
            <div className="text-[#8B949E] text-[10px] mt-3">Email changes should be handled through your OAuth provider or support to avoid account takeover risk.</div>
          </div>
          <div className="glass-panel clip-angled border-t-2 border-t-[#50C878] p-6">
            <div className="text-[#8B949E] text-xs uppercase tracking-widest mb-2">Current Tier</div>
            <div className="text-[#50C878] font-orbitron text-3xl font-bold">{tier}</div>
            <div className="text-[#8B949E] text-[10px] mt-3">Billing renewal: {billingDate || "Managed by Stripe"}</div>
          </div>
          <div className="glass-panel clip-angled border-t-2 border-t-[#FFBF00] p-6">
            <div className="text-[#8B949E] text-xs uppercase tracking-widest mb-2">Neural Key</div>
            <div className="text-[#FFBF00] font-mono truncate" title={neuralKey}>{neuralKey}</div>
            <button onClick={() => navigator.clipboard?.writeText(neuralKey)} className="mt-4 text-[10px] border border-[#FFBF00]/40 text-[#FFBF00] px-3 py-2 uppercase tracking-widest hover:bg-[#FFBF00] hover:text-[#010409]">Copy Key</button>
          </div>
          <div className="glass-panel clip-angled border-t-2 border-t-[#FF00FF] p-6">
            <div className="text-[#8B949E] text-xs uppercase tracking-widest mb-2">User ID</div>
            <div className="text-[#FF00FF] font-mono truncate" title={userId}>{userId || "Not exposed"}</div>
            <div className="text-[#8B949E] text-[10px] mt-3">Used by H.E.L.E.N.A. device linking and support.</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 mb-8">
          <div className="flex flex-col gap-6">
            <div className="glass-panel clip-angled p-6 border border-[#00BFFF]/25">
              <h2 className="font-orbitron text-[#00BFFF] text-xl uppercase tracking-[0.18em] font-bold mb-5">Tier Select</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TierCard title="Lite" price="Free" active={tier === "LITE"} desc="Local mentor starter tier." action="Current / Free" disabled />
                <TierCard title="Elite" price="$99.99" active={tier === "ELITE"} desc="Studio standard offline tooling." action={checkoutLoading === "elite" ? "Opening..." : "Upgrade Elite"} onClick={() => startCheckout("elite")} />
                <TierCard title="Ultimate" price="$49.99/mo + Compute" active={tier === "ULTIMATE"} desc="Cloud routing, advanced systems, and Compute Box." action={checkoutLoading === "ultimate" ? "Opening..." : "Upgrade Ultimate"} onClick={() => startCheckout("ultimate")} />
              </div>
            </div>

            <div className="glass-panel clip-angled p-6 border border-[#FF00FF]/25">
              <h2 className="font-orbitron text-[#FF00FF] text-xl uppercase tracking-[0.18em] font-bold mb-5">Ultimate Compute Box</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Metric label="Included Tokens" value={computeIncluded.toLocaleString()} tone="fuchsia" />
                <Metric label="Used This Cycle" value={computeUsed.toLocaleString()} tone="amber" />
                <Metric label="Remaining" value={computeRemaining.toLocaleString()} tone="emerald" />
              </div>
              <p className="font-mono text-xs text-[#8B949E] mt-5 leading-relaxed">Compute Box is the metered usage layer for Ultimate. Stripe tracks the base subscription plus reported compute-token usage. H.E.L.E.N.A. should show estimates before expensive cloud actions.</p>
              <div className={`mt-4 font-mono text-[10px] uppercase tracking-widest ${computeMeteringEnabled ? "text-[#50C878]" : "text-[#FFBF00]"}`}>
                Metering: {computeMeteringEnabled ? "Configured" : "Waiting on Stripe meter env vars"}
              </div>
            </div>
          </div>

          <div className="glass-panel clip-angled p-6 border border-[#50C878]/25">
            <h2 className="font-orbitron text-[#50C878] text-xl uppercase tracking-[0.18em] font-bold mb-5">Account Actions</h2>
            <div className="flex flex-col gap-3">
              <a href="/dashboard" className="p-4 border border-[#00BFFF]/30 hover:bg-[#00BFFF]/10 text-[#00BFFF] uppercase tracking-widest font-orbitron text-sm">Open Dashboard</a>
              <a href="/dashboard/billing" className="p-4 border border-[#FFBF00]/30 hover:bg-[#FFBF00]/10 text-[#FFBF00] uppercase tracking-widest font-orbitron text-sm">License & Billing Page</a>
              <a href={billingPortal} target="_blank" rel="noopener noreferrer" className="p-4 border border-[#FFBF00]/30 hover:bg-[#FFBF00]/10 text-[#FFBF00] uppercase tracking-widest font-orbitron text-sm">Stripe Billing Portal</a>
              <a href="mailto:Cameron@HarrisonInteractive.dev?subject=Harrison%20Interactive%20Account%20Support" className="p-4 border border-[#50C878]/30 hover:bg-[#50C878]/10 text-[#50C878] uppercase tracking-widest font-orbitron text-sm">Request Email / Account Change</a>
              <button onClick={() => signOut({ callbackUrl: "/login" })} className="p-4 border border-[#DC143C]/30 hover:bg-[#DC143C]/10 text-[#DC143C] uppercase tracking-widest font-orbitron text-sm text-left">Logout</button>
            </div>
          </div>
        </div>

        <div className="bg-[#010409] border border-[#00BFFF]/25 rounded-md p-6 shadow-[inset_0_0_25px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center border-b border-[#00BFFF]/20 pb-3 mb-4">
            <h3 className="font-orbitron text-[#00BFFF] text-sm uppercase tracking-[0.2em]">/var/log/account_matrix.log</h3>
            <span className="text-[#00BFFF] font-mono text-[10px] animate-pulse">LIVE</span>
          </div>
          <div className="font-mono text-xs text-[#8B949E] flex flex-col gap-2">
            {accountLog.map((line, index) => (
              <div key={index} className="flex gap-3"><span className="text-[#00BFFF]/50">{'>'}</span><span>{line}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TierCard({ title, price, desc, action, active, disabled, onClick }: { title: string; price: string; desc: string; action: string; active?: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <div className={`p-5 clip-angled border ${active ? "border-[#50C878] bg-[#50C878]/10" : "border-[#00BFFF]/25 bg-[#010409]/60"}`}>
      <div className="font-orbitron text-lg uppercase tracking-widest text-[#E6EDF3]">{title}</div>
      <div className="font-orbitron text-2xl text-[#00BFFF] mt-2">{price}</div>
      <p className="font-mono text-xs text-[#8B949E] mt-3 min-h-[48px]">{desc}</p>
      <button disabled={disabled || active} onClick={onClick} className="mt-5 w-full py-3 border border-[#00BFFF]/40 text-[#00BFFF] disabled:opacity-40 hover:bg-[#00BFFF] hover:text-[#010409] uppercase tracking-widest font-bold text-xs">
        {active ? "Current Tier" : action}
      </button>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "fuchsia" | "amber" | "emerald" }) {
  const colors = {
    fuchsia: "text-[#FF00FF] border-[#FF00FF]/35",
    amber: "text-[#FFBF00] border-[#FFBF00]/35",
    emerald: "text-[#50C878] border-[#50C878]/35",
  };
  return (
    <div className={`p-4 border ${colors[tone]} bg-[#010409]/70 clip-angled`}>
      <div className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest">{label}</div>
      <div className={`font-orbitron text-2xl mt-2 ${colors[tone].split(" ")[0]}`}>{value}</div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#010409] text-[#00BFFF] flex items-center justify-center font-mono tracking-widest uppercase">Loading Account Matrix...</div>}>
        <AccountMatrixContent />
      </Suspense>
    </SessionProvider>
  );
}

/* --- END OF FILE app/account/page.tsx --- */