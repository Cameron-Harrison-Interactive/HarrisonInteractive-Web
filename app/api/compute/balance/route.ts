/* --- START OF FILE app/api/compute/balance/route.ts --- */

import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "edge";

const DEFAULT_INCLUDED_ULTIMATE_COMPUTE_UNITS = 250_000;

export async function GET() {
  try {
    const session = await auth();
    const user = session?.user as any;

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const tier = String(user.tier || "LITE").toUpperCase();
    let included = tier === "ULTIMATE" ? DEFAULT_INCLUDED_ULTIMATE_COMPUTE_UNITS : 0;
    let used = 0;
    let periodStart = "";
    let periodEnd = "";
    let stripeCustomerId = String(user.stripe_customer_id || user.stripeCustomerId || "");
    let billingEmail = String(user.billing_email || user.billingEmail || user.email || "");

    const db = (process.env as any).DB;
    if (db) {
      try {
        const { results } = await db
          .prepare(
            `
            SELECT
              stripe_customer_id,
              billing_email,
              compute_included,
              compute_used,
              compute_period_start,
              compute_period_end
            FROM users
            WHERE email = ?
            LIMIT 1
            `
          )
          .bind(user.email)
          .all();
        if (results && results[0]) {
          stripeCustomerId = String(results[0].stripe_customer_id || stripeCustomerId || "");
          billingEmail = String(results[0].billing_email || billingEmail || user.email || "");
          included = Number(results[0].compute_included ?? included);
          used = Number(results[0].compute_used ?? 0);
          periodStart = String(results[0].compute_period_start || "");
          periodEnd = String(results[0].compute_period_end || "");
        }
      } catch (dbError: any) {
        console.warn(`[COMPUTE BALANCE] D1 lookup skipped: ${dbError?.message || String(dbError)}`);
      }
    } else {
      included = Number(user.computeIncluded ?? included);
      used = Number(user.computeUsed ?? user.compute_used ?? 0);
      periodStart = String(user.computePeriodStart || user.compute_period_start || "");
      periodEnd = String(user.computePeriodEnd || user.compute_period_end || "");
    }

    const remaining = Math.max(0, included - used);

    return NextResponse.json(
      {
        ok: true,
        tier,
        included,
        used,
        remaining,
        period_start: periodStart,
        period_end: periodEnd,
        unit_name: "Compute Tokens",
        stripe_customer_id: stripeCustomerId,
        billing_email: billingEmail,
        meter_event_name: process.env.STRIPE_COMPUTE_METER_EVENT_NAME || "hi_handy_compute_tokens",
        metering_enabled: Boolean(process.env.STRIPE_SECRET_KEY && (process.env.STRIPE_COMPUTE_METER_EVENT_NAME || "hi_handy_compute_tokens")),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Compute balance failed: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/compute/balance/route.ts --- */
