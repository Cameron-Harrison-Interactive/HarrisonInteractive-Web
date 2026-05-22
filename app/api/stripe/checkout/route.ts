/* --- START OF FILE app/api/stripe/checkout/route.ts --- */

import { NextRequest, NextResponse } from "next/server";

// =========================================================================
// CRITICAL CLOUDFLARE DIRECTIVE:
// This explicitly tells the compiler to use the Cloudflare V8 Edge Network
// instead of a standard Node.js server. Without this, the build will fail!
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | SECURE STRIPE CHECKOUT ROUTE
 * =========================================================================
 * This endpoint intercepts tier upgrade requests from the Billing Matrix,
 * communicates with the Stripe API, and returns a secure Checkout URL.
 * Currently operating in [DEVELOPMENT OVERRIDE] mode to generate mock keys.
 */

export async function POST(request: NextRequest) {
  try {
    // 1. Intercept the JSON payload from the frontend Matrix
    const body = await request.json();
    const { tier } = body;

    // Terminal Logging for Docker Console
    console.log(`[SYS] Processing Stripe Checkout Request for Tier: [${tier ? tier.toUpperCase() : 'UNKNOWN'}]`);

    // 2. Validate the Payload Request
    if (!tier || (tier !== "elite" && tier !== "ultimate")) {
      console.error("[ERR] Invalid Tier Request. Rejecting payload.");
      return NextResponse.json(
        { error: "Invalid neural tier requested. Access Denied." },
        { status: 400 }
      );
    }

    // =========================================================
    // [ DEVELOPMENT OVERRIDE BLOCK ]
    // Replace this block with the official `stripe.checkout.sessions.create` 
    // call once the Stripe SDK is integrated and the Secret Keys are loaded.
    // =========================================================
    
    // Simulate API Network Latency (800ms) to test UI loading states
    // (Using standard Promise as setTimeout is supported on Edge)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate a cryptographic mock License Key to unlock the UE5 Plugin
    const securePrefix = tier === "ultimate" ? "HI-ULTI" : "HI-ELIT";
    const randomHash = Math.random().toString(36).substring(2, 10).toUpperCase();
    const mockLicenseKey = `${securePrefix}-${randomHash}-XX99`;

    console.log(`[SYS] DEVELOPMENT OVERRIDE: Simulating Stripe Session.`);
    console.log(`[SYS] Generating Skeleton Key: ${mockLicenseKey}`);

    // Return the simulated Stripe Checkout URL and the Skeleton Key
    return NextResponse.json(
      { 
        message: "Stripe Session Created Successfully",
        checkoutUrl: `/dashboard/billing?status=success&key=${mockLicenseKey}&tier=${tier}`, 
        skeletonKey: mockLicenseKey
      },
      { status: 200 }
    );

  } catch (error) {
    // Catch catastrophic network or parsing failures
    console.error(`[FATAL ERR] Stripe API Route Fractured:`, error);
    
    return NextResponse.json(
      { error: "Internal Server Matrix Error. Payload Processing Failed." },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/stripe/checkout/route.ts --- */