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
 * Listens for Stripe billing events (e.g., checkout.session.completed).
 * This endpoint immediately returns a 200 OK status to silence Stripe 404
 * error logs and successfully maps the financial telemetry.
 */
export async function POST(req: Request) {
  try {
    // Read the raw text body from the incoming Stripe webhook
    const rawBody = await req.text();
    
    // Parse the JSON event data safely
    const event = JSON.parse(rawBody);
    console.log(`[STRIPE WEBHOOK] Incoming Telemetry: ${event.type}`);

    // --- FUTURE ARCHITECTURE (D1 DATABASE SYNC) ---
    // If you want to automatically upgrade users in D1 when they buy a tier,
    // you would extract `event.data.object.customer_email` here and run a SQL UPDATE!
    if (event.type === "checkout.session.completed") {
      const sessionData = event.data.object;
      console.log(`[STRIPE WEBHOOK] Successful transaction logged for: ${sessionData.customer_details?.email}`);
    }

    // Immediately return 200 OK so Stripe knows the endpoint is alive
    return NextResponse.json({ received: true }, { status: 200 });
    
  } catch (error: any) {
    console.error(`!! [STRIPE WEBHOOK FATAL] Failed to parse payload: ${error.message}`);
    return NextResponse.json({ error: "Webhook Parse Failure" }, { status: 400 });
  }
}

// Block unauthorized GET requests to the webhook URL
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed. Awaiting POST Telemetry." }, { status: 405 });
}

/* --- END OF FILE app/api/webhook/route.ts --- */