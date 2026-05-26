/* --- START OF FILE app/api/device/route.ts --- */

import { NextResponse } from "next/server";

// =========================================================================
// CLOUDFLARE EDGE DIRECTIVE
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | DEVICE AUTHORIZATION MATRIX
 * =========================================================================
 * Dual-Action Endpoint:
 * - GET: Unreal Engine polls this to see if the user has approved the login.
 * - POST: The Web Portal calls this to approve the connection and write to KV.
 */

// -------------------------------------------------------------------------
// 1. UNREAL ENGINE POLLING ENDPOINT
// -------------------------------------------------------------------------
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token." }, { status: 400 });
    }

    // Access the Cloudflare KV Store securely
    const kv = (process.env as any).LICENSE_MATRIX;
    
    // Check if the website has approved this specific token yet
    const kvData = await kv.get(`device_${token}`);

    if (kvData) {
      // The user authorized it! Parse the data.
      const parsedData = JSON.parse(kvData);
      
      // Delete the token immediately so it can never be intercepted or reused
      await kv.delete(`device_${token}`);
      
      console.log(`>> [DEVICE AUTH] UE5 Client successfully retrieved payload for token: ${token}`);
      return NextResponse.json({ authorized: true, data: parsedData }, { status: 200 });
    }

    // 202 Accepted: The request is valid, but we are still waiting for the user to click approve in the browser.
    return NextResponse.json({ authorized: false }, { status: 202 });

  } catch (error: any) {
    console.error(`!! [DEVICE AUTH GET FAULT] ${error.message}`);
    return NextResponse.json({ error: "Polling failed natively." }, { status: 500 });
  }
}

// -------------------------------------------------------------------------
// 2. WEB PORTAL APPROVAL ENDPOINT
// -------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, email } = body;

    if (!token || !email) {
      return NextResponse.json({ error: "Missing token or biometric identifier." }, { status: 400 });
    }

    // 1. Query the D1 Database for the user's exact permissions
    const db = (process.env as any).DB;
    const { results } = await db.prepare("SELECT license_tier, neural_key FROM users WHERE email = ?")
                                .bind(email)
                                .all();

    const assignedTier = (results && results.length > 0) ? (results[0].license_tier || "LITE") : "LITE";
    const neuralKey = (results && results.length > 0) ? (results[0].neural_key || "UNALLOCATED") : "UNALLOCATED";

    // 2. Package the payload
    const authPayload = {
      tier: assignedTier,
      key: neuralKey,
      email: email
    };

    // 3. Drop the payload into the KV Store with a strict 5-minute expiration
    const kv = (process.env as any).LICENSE_MATRIX;
    
    // expirationTtl is measured in seconds (300 = 5 minutes)
    await kv.put(`device_${token}`, JSON.stringify(authPayload), { expirationTtl: 300 });

    console.log(`>> [DEVICE AUTH] User ${email} approved device linkage. Payload secured in KV.`);
    
    return NextResponse.json({ success: true, tier: assignedTier }, { status: 200 });

  } catch (error: any) {
    console.error(`!! [DEVICE AUTH POST FAULT] ${error.message}`);
    return NextResponse.json({ error: "Approval failed natively." }, { status: 500 });
  }
}

/* --- END OF FILE app/api/device/route.ts --- */