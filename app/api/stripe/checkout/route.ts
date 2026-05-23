/* --- START OF FILE app/api/stripe/checkout/route.ts --- */

// =========================================================================
// CRITICAL CLOUDFLARE DIRECTIVE:
// Forces the V8 Edge Network compilation.
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | PURE WEB API STRIPE CHECKOUT
 * =========================================================================
 * [ARCHITECT NOTE]: We DO NOT import `NextRequest` or `NextResponse`.
 * By using the standard Web API `Request` and `Response` objects, we 
 * prevent Next.js from importing its bloated server core, mathematically
 * eradicating the `async_hooks` Webpack collision on Cloudflare.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json() as any;
    const tier = body.tier;

    console.log(`[SYS] Processing Pure Edge Checkout for Tier: [${tier ? tier.toUpperCase() : 'UNKNOWN'}]`);

    if (!tier || (tier !== "elite" && tier !== "ultimate")) {
      return new Response(
        JSON.stringify({ error: "Invalid neural tier requested. Access Denied." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.error("[FATAL ERR] STRIPE_SECRET_KEY is missing from the Edge Vault.");
      return new Response(
        JSON.stringify({ error: "Payment Gateway Offline. Missing Secret Key." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const priceId = tier === "ultimate" 
      ? process.env.STRIPE_PRICE_ULTIMATE 
      : process.env.STRIPE_PRICE_ELITE;

    if (!priceId) {
      console.error("[FATAL ERR] Stripe Price ID is missing from the Edge Vault.");
      return new Response(
        JSON.stringify({ error: "Payment Gateway Offline. Missing Price ID Matrix." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const origin = request.headers.get("origin") || "https://harrisoninteractive.dev";

    // =========================================================
    // CONSTRUCT STRIPE URL-ENCODED PAYLOAD
    // =========================================================
    const formData = new URLSearchParams();
    formData.append("payment_method_types[0]", "card");
    formData.append("line_items[0][price]", priceId);
    formData.append("line_items[0][quantity]", "1");
    formData.append("mode", "subscription"); 
    formData.append("success_url", `${origin}/dashboard/billing?status=success&session_id={CHECKOUT_SESSION_ID}&tier=${tier}`);
    formData.append("cancel_url", `${origin}/dashboard/billing?status=cancelled`);
    formData.append("metadata[tier]", tier);

    // =========================================================
    // NATIVE EDGE FETCH (ZERO DEPENDENCIES)
    // =========================================================
    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const stripeData = await stripeResponse.json() as any;

    if (!stripeResponse.ok) {
      console.error("[ERR] Stripe API Rejected Payload:", stripeData);
      return new Response(
        JSON.stringify({ error: stripeData.error?.message || "Stripe API Handshake Failed." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: "Stripe Session Created Successfully",
        checkoutUrl: stripeData.url
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error(`[FATAL ERR] Pure API Route Fractured:`, error.message);
    
    return new Response(
      JSON.stringify({ error: `Matrix Error: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/* --- END OF FILE app/api/stripe/checkout/route.ts --- */