/* --- START OF FILE app/api/compute/license-balance/route.ts --- */

import { NextResponse } from "next/server";

export const runtime = "edge";

const DEFAULT_INCLUDED_ULTIMATE_COMPUTE_UNITS = 250_000;

function readLicenseKey(req: Request, body: any): string {
  const headerKey = req.headers.get("x-hi-license-key") || req.headers.get("x-handy-license-key") || "";
  return String(body?.license_key || body?.key || headerKey || "").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const licenseKey = readLicenseKey(req, body);

    if (!licenseKey) {
      return NextResponse.json({ error: "Missing license key." }, { status: 400 });
    }

    const db = (process.env as any).DB;
    if (!db) {
      return NextResponse.json({ error: "Edge Database offline." }, { status: 500 });
    }

    const { results } = await db
      .prepare(
        `
        SELECT
          id,
          name,
          email,
          license_tier,
          stripe_customer_id,
          billing_email,
          compute_included,
          compute_used,
          compute_period_start,
          compute_period_end
        FROM users
        WHERE neural_key = ?
        LIMIT 1
        `
      )
      .bind(licenseKey)
      .all();

    if (!results || !results[0]) {
      return NextResponse.json({ error: "Invalid or expired license key." }, { status: 404 });
    }

    const user = results[0] as any;
    const tier = String(user.license_tier || "LITE").toUpperCase();
    const included = Number(user.compute_included ?? (tier === "ULTIMATE" ? DEFAULT_INCLUDED_ULTIMATE_COMPUTE_UNITS : 0));
    const used = Number(user.compute_used ?? 0);
    const remaining = Math.max(0, included - used);

    return NextResponse.json(
      {
        ok: true,
        tier,
        user_id: String(user.id || ""),
        username: String(user.name || ""),
        email: String(user.email || ""),
        included,
        used,
        remaining,
        period_start: String(user.compute_period_start || ""),
        period_end: String(user.compute_period_end || ""),
        unit_name: "Compute Tokens",
        stripe_customer_id: String(user.stripe_customer_id || ""),
        billing_email: String(user.billing_email || user.email || ""),
        meter_event_name: process.env.STRIPE_COMPUTE_METER_EVENT_NAME || "hi_handy_compute_tokens",
        metering_enabled: Boolean(process.env.STRIPE_SECRET_KEY && (process.env.STRIPE_COMPUTE_METER_EVENT_NAME || "hi_handy_compute_tokens")),
        status: "coming_soon",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: `Compute balance failed: ${error?.message || String(error)}` }, { status: 500 });
  }
}

/* --- END OF FILE app/api/compute/license-balance/route.ts --- */
