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
 * This endpoint is pinged directly by the Python/C++ Neural Engine inside
 * Unreal Engine 5. It securely checks the D1 Database Master Ledger to
 * validate the user's Neural Key and returns their authorization tier plus
 * safe account display fields for the in-engine H.E.L.E.N.A. UI.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const licenseKey = String(body?.license_key || "").trim();

    if (!licenseKey) {
      return NextResponse.json(
        { valid: false, message: "No cryptographic key provided." },
        { status: 400 }
      );
    }

    const db = (process.env as any).DB;

    if (!db) {
      console.error("!! [LICENSE MATRIX] D1 Database 'DB' is missing from the Edge environment.");
      return NextResponse.json(
        { valid: false, message: "Edge Database offline." },
        { status: 500 }
      );
    }

    const { results } = await db
      .prepare(
        `
        SELECT
          license_tier,
          email,
          name
        FROM users
        WHERE neural_key = ?
        LIMIT 1
        `
      )
      .bind(licenseKey)
      .all();

    if (results && results.length > 0) {
      const user = results[0] as {
        license_tier?: string;
        email?: string;
        name?: string;
      };

      const assignedTier = String(user.license_tier || "LITE").toUpperCase();
      const email = String(user.email || "").trim();
      const username =
        String(user.name || "").trim() ||
        (email.includes("@") ? email.split("@")[0] : "");

      console.log(
        `>> [LICENSE MATRIX] Key validated successfully. Granting Tier: ${assignedTier} | Email: ${
          email || "not_provided"
        }`
      );

      return NextResponse.json(
        { valid: true, tier: assignedTier, email, username, name: username },
        { status: 200 }
      );
    }

    console.log("!! [LICENSE MATRIX] Intrusion attempt blocked. Invalid Neural Key.");
    return NextResponse.json(
      { valid: false, message: "Invalid or Expired Cryptographic Key." },
      { status: 404 }
    );
  } catch (error: any) {
    console.error(`!! [LICENSE MATRIX FATAL] ${error?.message || String(error)}`);
    return NextResponse.json(
      { valid: false, message: "Secure handshaking failed natively." },
      { status: 500 }
    );
  }
}

/* --- END OF FILE app/api/license/verify/route.ts --- */
