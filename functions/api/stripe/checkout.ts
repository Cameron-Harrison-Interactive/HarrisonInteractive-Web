/* --- START OF FILE functions/api/stripe/checkout.ts --- */

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NATIVE CLOUDFLARE API ROUTE
 * =========================================================================
 * This file completely bypasses Next.js and Webpack. It is compiled natively 
 * by Cloudflare's Edge engine. It has ZERO dependencies and uses standard 
 * Web Request/Response objects, rendering the async_hooks crash impossible.
 */

export async function onRequestPost({ request, env }: { request: Request, env: any }) {
  try {
    // 1. Intercept the JSON payload from the frontend Matrix
    const body = await request.json() as any;
    const tier = body.tier;

    console.log(`[SYS] Processing Native Cloudflare Checkout for Tier: [${tier ? tier.toUpperCase() : 'UNKNOWN'}]`);

    // 2. Validate the Payload Request
    if (!tier || (tier !== "elite" && tier !== "ultimate")) {
      return Response.json(
        { error: "Invalid neural tier requested. Access Denied." },
        { status: 400 }
      );
    }

    // 3. Authenticate with the Cloudflare Secret Vault 
    // (Native Cloudflare functions access secrets directly from the 'env' object!)
    const stripeKey = env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.error("[FATAL ERR] STRIPE_SECRET_KEY is missing from the Edge Vault.");
      return Response.json(
        { error: "Payment Gateway Offline. Missing Secret Key." },
        { status: 500 }
      );
    }

    // 4. Resolve the Stripe Price ID
    const priceId = tier === "ultimate" 
      ? env.STRIPE_PRICE_ULTIMATE 
      : env.STRIPE_PRICE_ELITE;

    if (!priceId) {
      console.error("[FATAL ERR] Stripe Price ID is missing from the Edge Vault.");
      return Response.json(
        { error: "Payment Gateway Offline. Missing Price ID Matrix." },
        { status: 500 }
      );
    }

    // Capture the origin URL so Stripe knows where to send the user back to
    const origin = request.headers.get("origin") || "https://harrisoninteractive.dev";

    // =========================================================
    // 5. CONSTRUCT STRIPE URL-ENCODED PAYLOAD
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
    // 6. NATIVE EDGE FETCH (ZERO DEPENDENCIES)
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
      return Response.json(
        { error: stripeData.error?.message || "Stripe API Handshake Failed." },
        { status: 500 }
      );
    }

    // 7. Return the live Stripe URL to the frontend
    return Response.json(
      { 
        message: "Stripe Session Created Successfully",
        checkoutUrl: stripeData.url
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(`[FATAL ERR] Cloudflare Native Route Fractured:`, error.message);
    
    return Response.json(
      { error: `Matrix Error: ${error.message}` },
      { status: 500 }
    );
  }
}

/* --- END OF FILE functions/api/stripe/checkout.ts --- */