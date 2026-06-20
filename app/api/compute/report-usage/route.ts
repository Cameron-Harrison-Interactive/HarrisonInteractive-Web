/* --- START OF FILE app/api/compute/report-usage/route.ts --- */

import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "edge";

const DEFAULT_METER_EVENT_NAME = "hi_handy_compute_tokens";

/**
 * Reports Ultimate Compute Box usage to Stripe Billing Meters and mirrors usage
 * into D1 for fast dashboard display.
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as any;

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const tier = String(user.tier || "LITE").toUpperCase();
    if (tier !== "ULTIMATE") {
      return NextResponse.json({ error: "Compute metering requires ULTIMATE tier." }, { status: 403 });
    }

    const body = await req.json();
    const units = Math.max(0, Math.floor(Number(body?.units || 0)));
    const reason = String(body?.reason || "helena_compute").slice(0, 120);

    if (!units) {
      return NextResponse.json({ error: "Usage units must be greater than zero." }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const eventName = process.env.STRIPE_COMPUTE_METER_EVENT_NAME || DEFAULT_METER_EVENT_NAME;

    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe compute metering is not configured. Missing STRIPE_SECRET_KEY." },
        { status: 500 }
      );
    }

    let stripeCustomerId = String(user.stripe_customer_id || user.stripeCustomerId || "");
    const db = (process.env as any).DB;
    if (db && !stripeCustomerId) {
      const { results } = await db
        .prepare("SELECT stripe_customer_id FROM users WHERE email = ? LIMIT 1")
        .bind(user.email)
        .all();
      if (results && results[0]) {
        stripeCustomerId = String(results[0].stripe_customer_id || "");
      }
    }

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer is linked to this account yet." },
        { status: 400 }
      );
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
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const stripeData = await stripeResponse.json();
    if (!stripeResponse.ok) {
      return NextResponse.json(
        { error: stripeData?.error?.message || "Stripe meter event failed.", stripe: stripeData },
        { status: 500 }
      );
    }

    if (db) {
      try {
        await db
          .prepare(
            `
            UPDATE users
            SET compute_used = COALESCE(compute_used, 0) + ?
            WHERE email = ?
            `
          )
          .bind(units, user.email)
          .run();
      } catch (dbError: any) {
        console.warn(`[COMPUTE USAGE] D1 mirror update failed: ${dbError?.message || String(dbError)}`);
      }
    }

    return NextResponse.json({ ok: true, units, event_name: eventName, stripe: stripeData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Compute usage report failed: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/compute/report-usage/route.ts --- */
