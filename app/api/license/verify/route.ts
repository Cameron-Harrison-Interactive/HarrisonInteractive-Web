/* --- START OF FILE app/api/license/verify/route.ts --- */

import { NextResponse } from "next/server";

// =========================================================================
// CLOUDFLARE EDGE DIRECTIVE
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NATIVE LICENSE VERIFICATION API
 * =========================================================================
 * This endpoint is pinged directly by the Python C++ Neural Engine inside 
 * Unreal Engine 5. It securely checks the D1 Database Master Ledger to 
 * validate the user's Neural Key and returns their exact authorization tier.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { license_key } = body;

    // 1. Initial Security Check
    if (!license_key) {
      return NextResponse.json(
        { valid: false, message: "No cryptographic key provided." }, 
        { status: 400 }
      );
    }

    // 2. Map the D1 Database Native Binding
    const db = (process.env as any).DB;

    if (!db) {
      console.error("!! [LICENSE MATRIX] D1 Database 'DB' is missing from the Edge environment.");
      return NextResponse.json(
        { valid: false, message: "Edge Database offline." }, 
        { status: 500 }
      );
    }

    // 3. Query the Master Ledger
    // We search the 'users' table for the exact matching neural_key
    const { results } = await db.prepare("SELECT license_tier FROM users WHERE neural_key = ?")
                                .bind(license_key)
                                .all();

    // 4. Verify and Respond to Unreal Engine
    if (results && results.length > 0) {
      const assignedTier = results[0].license_tier || "LITE";
      console.log(`>> [LICENSE MATRIX] Key Validated successfully. Granting Tier: ${assignedTier}`);
      
      return NextResponse.json({ 
        valid: true, 
        tier: assignedTier 
      }, { status: 200 });
      
    } else {
      console.log("!! [LICENSE MATRIX] Intrusion attempt blocked. Invalid Neural Key.");
      return NextResponse.json({ 
        valid: false, 
        message: "Invalid or Expired Cryptographic Key." 
      }, { status: 404 });
    }

  } catch (error: any) {
    console.error(`!! [LICENSE MATRIX FATAL] ${error.message}`);
    return NextResponse.json(
      { valid: false, message: "Secure handshaking failed natively." }, 
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/license/verify/route.ts --- */