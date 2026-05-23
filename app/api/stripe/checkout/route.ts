/* --- START OF FILE app/api/stripe/checkout/route.ts --- */

import { NextRequest, NextResponse } from "next/server";

// =========================================================================
// CRITICAL CLOUDFLARE DIRECTIVE:
// The Next-on-Pages compiler STRICTLY requires this line to build the API.
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | ZERO-DEPENDENCY STRIPE CHECKOUT
 * =========================================================================
 * We DO NOT import the 'stripe' NPM package here. It causes async_hooks 
 * collisions on the Edge. We use a pure native fetch to Stripe's REST API.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier } = body;

    console.log(`[SYS] Processing Native Edge Checkout for Tier: [${tier ? tier.toUpperCase() : 'UNKNOWN'}]`);

    if (!tier || (tier !== "elite" && tier !== "ultimate")) {
      return NextResponse.json(
        { error: "Invalid neural tier requested. Access Denied." },
        { status: 400 }
      );
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.error("[FATAL ERR] STRIPE_SECRET_KEY is missing from the Edge Vault.");
      return NextResponse.json(
        { error: "Payment Gateway Offline. Missing Secret Key." },
        { status: 500 }
      );
    }

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

    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      console.error("[ERR] Stripe API Rejected Payload:", stripeData);
      return NextResponse.json(
        { error: stripeData.error?.message || "Stripe API Handshake Failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: "Stripe Session Created Successfully",
        checkoutUrl: stripeData.url
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(`[FATAL ERR] Edge API Route Fractured:`, error.message);
    
    return NextResponse.json(
      { error: `Matrix Error: ${error.message}` },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/stripe/checkout/route.ts --- */