/* --- START OF FILE app/api/stripe/checkout/route.ts --- */

import { NextRequest, NextResponse } from "next/server";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | ZERO-DEPENDENCY STRIPE CHECKOUT
 * =========================================================================
 * Bypasses the bulky Stripe Node.js SDK completely to prevent Cloudflare 
 * Edge crashes. Utilizes native, blazing-fast fetch requests.
 * 
 * [ARCHITECT NOTE]: 'export const runtime = "edge"' has been intentionally 
 * purged to prevent Vercel async_hooks polyfill collisions on Cloudflare.
 */

export async function POST(request: NextRequest) {
  try {
    // 1. Intercept the JSON payload from the frontend Matrix
    const body = await request.json();
    const { tier } = body;

    console.log(`[SYS] Processing Native Edge Checkout for Tier: [${tier ? tier.toUpperCase() : 'UNKNOWN'}]`);

    // 2. Validate the Payload Request
    if (!tier || (tier !== "elite" && tier !== "ultimate")) {
      return NextResponse.json(
        { error: "Invalid neural tier requested. Access Denied." },
        { status: 400 }
      );
    }

    // 3. Authenticate with the Cloudflare Secret Vault
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.error("[FATAL ERR] STRIPE_SECRET_KEY is missing from the Edge Vault.");
      return NextResponse.json(
        { error: "Payment Gateway Offline. Missing Secret Key." },
        { status: 500 }
      );
    }

    // 4. Resolve the Stripe Price ID
    const priceId = tier === "ultimate" 
      ? process.env.STRIPE_PRICE_ULTIMATE 
      : process.env.STRIPE_PRICE_ELITE;

    if (!priceId) {
      console.error("[FATAL ERR] Stripe Price ID is missing from the Edge Vault.");
      return NextResponse.json(
        { error: "Payment Gateway Offline. Missing Price ID Matrix." },
        { status: 500 }
      );
    }

    // Capture the origin URL so Stripe knows where to send the user back to
    const origin = request.headers.get("origin") || "https://harrisoninteractive.dev";

    // =========================================================
    // 5. CONSTRUCT STRIPE URL-ENCODED PAYLOAD
    // Stripe's raw API requires x-www-form-urlencoded data, not JSON.
    // =========================================================
    const formData = new URLSearchParams();
    formData.append("payment_method_types[0]", "card");
    formData.append("line_items[0][price]", priceId);
    formData.append("line_items[0][quantity]", "1");
    formData.append("mode", "subscription"); // Adjust to "payment" if it's a one-time fee
    formData.append("success_url", `${origin}/dashboard/billing?status=success&session_id={CHECKOUT_SESSION_ID}&tier=${tier}`);
    formData.append("cancel_url", `${origin}/dashboard/billing?status=cancelled`);
    formData.append("metadata[tier]", tier);

    console.log(`[SYS] Firing direct secure payload to Stripe API for Price ID: ${priceId}`);

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

    const stripeData = await stripeResponse.json();

    // Catch specific Stripe-side errors (e.g., Invalid API keys, deleted prices)
    if (!stripeResponse.ok) {
      console.error("[ERR] Stripe API Rejected Payload:", stripeData);
      return NextResponse.json(
        { error: stripeData.error?.message || "Stripe API Handshake Failed." },
        { status: 500 }
      );
    }

    console.log(`[SUCCESS] Edge Session Created. Routing user to secure gateway...`);

    // 7. Return the live Stripe URL to the frontend
    return NextResponse.json(
      { 
        message: "Stripe Session Created Successfully",
        checkoutUrl: stripeData.url
      },
      { status: 200 }
    );

  } catch (error: any) {
    // Catch catastrophic network failures
    console.error(`[FATAL ERR] Edge API Route Fractured:`, error.message);
    
    return NextResponse.json(
      { error: `Matrix Error: ${error.message}` },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/stripe/checkout/route.ts --- */