/* --- START OF FILE app/api/compute/license-report-usage/route.ts --- */

import { NextResponse } from "next/server";

export const runtime = "edge";

const DEFAULT_METER_EVENT_NAME = "hi_handy_compute_tokens";

function readLicenseKey(req: Request, body: any): string {
  const headerKey = req.headers.get("x-hi-license-key") || req.headers.get("x-handy-license-key") || "";
  return String(body?.license_key || body?.key || headerKey || "").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const licenseKey = readLicenseKey(req, body);
    const units = Math.max(0, Math.floor(Number(body?.units || 0)));
    const reason = String(body?.reason || "helena_compute").slice(0, 120);

    if (!licenseKey) return NextResponse.json({ error: "Missing license key." }, { status: 400 });
    if (!units) return NextResponse.json({ error: "Usage units must be greater than zero." }, { status: 400 });

    const db = (process.env as any).DB;
    if (!db) return NextResponse.json({ error: "Edge Database offline." }, { status: 500 });

    const { results } = await db
      .prepare("SELECT email, license_tier, stripe_customer_id FROM users WHERE neural_key = ? LIMIT 1")
      .bind(licenseKey)
      .all();

    if (!results || !results[0]) {
      return NextResponse.json({ error: "Invalid or expired license key." }, { status: 404 });
    }

    const user = results[0] as any;
    const tier = String(user.license_tier || "LITE").toUpperCase();
    if (tier !== "ULTIMATE") {
      return NextResponse.json({ error: "Compute metering requires ULTIMATE tier." }, { status: 403 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const eventName = process.env.STRIPE_COMPUTE_METER_EVENT_NAME || DEFAULT_METER_EVENT_NAME;
    const stripeCustomerId = String(user.stripe_customer_id || "");

    if (!stripeKey) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY." }, { status: 500 });
    }
    if (!stripeCustomerId) {
      return NextResponse.json({ error: "No Stripe customer linked to this license." }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const formData = new URLSearchParams();
    formData.append("event_name", eventName);
    formData.append("timestamp", String(timestamp));
    formData.append("payload[stripe_customer_id]", stripeCustomerId);
    formData.append("payload[value]", String(units));
    formData.append("payload[reason]", reason);
    formData.append("identifier", `${stripeCustomerId}_${timestamp}_${Math.random().toString(16).slice(2)}`);

    const stripeResponse = await fetch("https://api.stripe.com/v1/billing/meter_events", {
      method: "POST",
      headers: { Authorization: `Bearer ${stripeKey}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    const stripeData = await stripeResponse.json();
    if (!stripeResponse.ok) {
      return NextResponse.json({ error: stripeData?.error?.message || "Stripe meter event failed.", stripe: stripeData }, { status: 500 });
    }

    await db.prepare("UPDATE users SET compute_used = COALESCE(compute_used, 0) + ? WHERE neural_key = ?").bind(units, licenseKey).run();

    return NextResponse.json({ ok: true, units, event_name: eventName, stripe: stripeData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Compute usage report failed: ${error?.message || String(error)}` }, { status: 500 });
  }
}

/* --- END OF FILE app/api/compute/license-report-usage/route.ts --- */
