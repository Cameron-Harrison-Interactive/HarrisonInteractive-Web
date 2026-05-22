/* --- START OF FILE app/api/stripe/checkout/route.ts --- */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// =========================================================================
// CRITICAL CLOUDFLARE DIRECTIVE:
// Forces the V8 Edge Network compilation.
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | LIVE STRIPE CHECKOUT ROUTE
 * =========================================================================
 * This endpoint initiates a secure session with Stripe's backend.
 * It dynamically creates a checkout link based on the requested tier
 * and passes the tier metadata through to the webhook for final key minting.
 */

export async function POST(request: NextRequest) {
  try {
    // 1. Intercept the JSON payload from the frontend Matrix
    const body = await request.json();
    const { tier } = body;

    console.log(`[SYS] Processing Live Stripe Checkout for Tier: [${tier ? tier.toUpperCase() : 'UNKNOWN'}]`);

    // 2. Validate the Payload Request
    if (!tier || (tier !== "elite" && tier !== "ultimate")) {
      console.error("[ERR] Invalid Tier Request. Rejecting payload.");
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
        { error: "Payment Gateway Offline. Missing Authentication Matrix." },
        { status: 500 }
      );
    }

    // 4. Initialize Stripe with Edge-Compatible Fetch Client
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2026-04-22.dahlia", // UPDATED: Matched to the bleeding-edge Stripe SDK
      httpClient: Stripe.createFetchHttpClient(), // CRITICAL for Cloudflare Edge compatibility
    });

    // 5. Resolve the Stripe Price ID
    const priceId = tier === "ultimate" 
      ? (process.env.STRIPE_PRICE_ULTIMATE || "price_dummy_ultimate_replace_me")
      : (process.env.STRIPE_PRICE_ELITE || "price_dummy_elite_replace_me");

    // Capture the origin URL so Stripe knows where to send the user back to
    const origin = request.headers.get("origin") || "https://harrisoninteractive.dev";

    console.log(`[SYS] Initiating Stripe Session generation for Price ID: ${priceId}`);

    // 6. Generate the Secure Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription", 
      success_url: `${origin}/dashboard/billing?status=success&session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${origin}/dashboard/billing?status=cancelled`,
      metadata: {
        tier: tier, 
      },
    });

    if (!session.url) {
      throw new Error("Stripe failed to generate a secure checkout URL.");
    }

    console.log(`[SUCCESS] Stripe Session Created. Routing user to gateway...`);

    // 7. Return the live Stripe URL to the frontend
    return NextResponse.json(
      { 
        message: "Stripe Session Created Successfully",
        checkoutUrl: session.url
      },
      { status: 200 }
    );

  } catch (error: any) {
    // Catch catastrophic network or parsing failures
    console.error(`[FATAL ERR] Stripe API Route Fractured:`, error.message);
    
    return NextResponse.json(
      { error: "Internal Server Matrix Error. Payment Gateway Offline." },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/stripe/checkout/route.ts --- */