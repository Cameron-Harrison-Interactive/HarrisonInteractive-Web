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
 * Listens for Stripe billing events.
 *
 * NOTE:
 * This currently acknowledges webhook payloads. For production billing/tier
 * automation, verify Stripe signatures before trusting event data.
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    console.log(`[STRIPE WEBHOOK] Incoming Telemetry: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const sessionData = event.data?.object;
      const email = sessionData?.customer_details?.email || sessionData?.customer_email || "";

      console.log(`[STRIPE WEBHOOK] Successful transaction logged for: ${email || "unknown_email"}`);

      // Future:
      // - Extract tier from sessionData.metadata?.tier
      // - Update D1 users table
      // - Set license_tier
      // - Generate/store neural_key if missing
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
