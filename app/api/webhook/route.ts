/* --- START OF FILE app/api/webhook/route.ts --- */

// =========================================================================
// CLOUDFLARE EDGE DIRECTIVE
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | STRIPE WEBHOOK RECEIVER
 * =========================================================================
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);
    
    console.log(`[STRIPE WEBHOOK] Incoming Telemetry: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const sessionData = event.data.object;
      console.log(`[STRIPE WEBHOOK] Successful transaction logged for: ${sessionData.customer_details?.email}`);
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error: any) {
    console.error(`!! [STRIPE WEBHOOK FATAL] Failed to parse payload: ${error.message}`);
    return new Response(
      JSON.stringify({ error: "Webhook Parse Failure" }), 
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Block unauthorized GET requests to the webhook URL
export async function GET() {
  return new Response(
    JSON.stringify({ error: "Method Not Allowed. Awaiting POST Telemetry." }), 
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}

/* --- END OF FILE app/api/webhook/route.ts --- */