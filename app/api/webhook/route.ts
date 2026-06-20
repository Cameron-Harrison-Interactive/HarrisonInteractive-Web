/* --- START OF FILE app/api/webhook/route.ts --- */

import { NextResponse } from "next/server";

// =========================================================================
// CLOUDFLARE EDGE DIRECTIVE
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | STRIPE WEBHOOK RECEIVER
 * =========================================================================
 * Listens for Stripe billing events and updates the D1 user ledger when possible.
 *
 * NOTE:
 * This acknowledges webhook payloads and performs best-effort D1 sync. For full
 * production hardening, add Stripe signature verification using the raw body and
 * STRIPE_WEBHOOK_SECRET before trusting event data.
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    console.log(`[STRIPE WEBHOOK] Incoming Telemetry: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const sessionData = event.data?.object;
      const email =
        sessionData?.customer_details?.email ||
        sessionData?.customer_email ||
        sessionData?.metadata?.email ||
        "";
      const tier = String(sessionData?.metadata?.tier || "").toUpperCase();
      const stripeCustomerId = String(sessionData?.customer || "");

      console.log(
        `[STRIPE WEBHOOK] Successful transaction logged for: ${email || "unknown_email"} | Tier: ${tier || "UNKNOWN"}`
      );

      const db = (process.env as any).DB;
      if (db && email) {
        try {
          await db
            .prepare(
              `
              UPDATE users
              SET
                license_tier = COALESCE(NULLIF(?, ''), license_tier),
                stripe_customer_id = COALESCE(NULLIF(?, ''), stripe_customer_id),
                billing_email = COALESCE(NULLIF(?, ''), billing_email)
              WHERE email = ?
              `
            )
            .bind(tier, stripeCustomerId, email, email)
            .run();
          console.log(`[STRIPE WEBHOOK] D1 user ledger updated for ${email}.`);
        } catch (dbError: any) {
          console.error(`[STRIPE WEBHOOK] D1 sync failed: ${dbError?.message || String(dbError)}`);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(`!! [STRIPE WEBHOOK FATAL] Failed to parse payload: ${error?.message || String(error)}`);
    return NextResponse.json({ error: "Webhook Parse Failure" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed. Awaiting POST Telemetry." },
    { status: 405 }
  );
}

/* --- END OF FILE app/api/webhook/route.ts --- */
