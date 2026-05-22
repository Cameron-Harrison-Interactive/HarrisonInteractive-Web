/* --- START OF FILE app/api/validate/route.ts --- */

import { NextRequest, NextResponse } from "next/server";

// =========================================================================
// CRITICAL CLOUDFLARE DIRECTIVE:
// Forces the V8 Edge Network compilation.
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | UE5 LICENSE VALIDATION ENDPOINT
 * =========================================================================
 * This endpoint is pinged silently by handy_omni_network.py upon UE5 boot.
 * It queries the Cloudflare KV Database to verify if the provided License Key
 * is authentic, active, and determines which tier to unlock (Elite/Ultimate).
 */

export async function POST(request: NextRequest) {
  try {
    // 1. Intercept the JSON payload from the UE5 Python Script
    const body = await request.json();
    const { licenseKey } = body;

    console.log(`[SYS] Received License Validation Request for Key: [${licenseKey || 'NONE'}]`);

    // 2. Initial Payload Sanitization
    if (!licenseKey || typeof licenseKey !== "string") {
      console.error("[ERR] Payload missing valid Neural Key.");
      return NextResponse.json(
        { valid: false, error: "No License Key provided. Access Denied." },
        { status: 400 }
      );
    }

    // =========================================================
    // [ DATABASE QUERY MATRIX ]
    // =========================================================
    
    // Check if we are running in the local Docker environment without a real KV binding
    // In standard Next.js Edge, process.env.NODE_ENV is available.
    const isDevelopment = process.env.NODE_ENV === "development";

    let isValid = false;
    let unlockedTier = "lite"; // Default fallback

    if (isDevelopment) {
      console.log(`[SYS] LOCAL DOCKER DETECTED: Bypassing Cloudflare KV. Utilizing Mock Verification.`);
      
      // MOCK VERIFICATION LOGIC (Matches the keys generated in our checkout route)
      if (licenseKey.startsWith("HI-ULTI-")) {
        isValid = true;
        unlockedTier = "ultimate";
      } else if (licenseKey.startsWith("HI-ELIT-")) {
        isValid = true;
        unlockedTier = "elite";
      } else {
        isValid = false;
      }

    } else {
      console.log(`[SYS] PRODUCTION EDGE DETECTED: Querying Cloudflare KV...`);
      
      // PRODUCTION KV DATABASE LOGIC
      // @cloudflare/next-on-pages injects KV bindings into process.env on the Edge
      const kvDatabase = process.env.LICENSE_MATRIX as any;

      if (!kvDatabase) {
        throw new Error("LICENSE_MATRIX KV binding not found in Edge environment.");
      }

      // Query the database for the provided key
      // Expected KV structure: Key="HI-ULTI-XYZ", Value="{ tier: 'ultimate', active: true }"
      const dbRecordStr = await kvDatabase.get(licenseKey);

      if (dbRecordStr) {
        const dbRecord = JSON.parse(dbRecordStr);
        if (dbRecord.active === true) {
          isValid = true;
          unlockedTier = dbRecord.tier;
        }
      }
    }

    // =========================================================
    // [ RESPONSE TRANSMISSION ]
    // =========================================================

    if (isValid) {
      console.log(`[SUCCESS] Key Verified. Unlocking [${unlockedTier.toUpperCase()}] tier.`);
      return NextResponse.json(
        { 
          valid: true, 
          tier: unlockedTier,
          message: "Harrison Interactive Neural Link Established."
        },
        { status: 200 }
      );
    } else {
      console.error(`[ERR] Key Verification Failed. Invalid or expired key.`);
      return NextResponse.json(
        { 
          valid: false, 
          tier: "lite", // Force fallback to Lite tier
          error: "Invalid or Expired License Key."
        },
        { status: 401 }
      );
    }

  } catch (error) {
    // Catch catastrophic network or parsing failures
    console.error(`[FATAL ERR] Validation Route Fractured:`, error);
    
    return NextResponse.json(
      { valid: false, error: "Internal Server Matrix Error. Validation Failed." },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/validate/route.ts --- */