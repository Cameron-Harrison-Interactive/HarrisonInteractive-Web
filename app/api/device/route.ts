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
    const token = String(searchParams.get("token") || "").trim();

    if (!token) {
      return NextResponse.json({ error: "Missing token." }, { status: 400 });
    }

    const kv = (process.env as any).LICENSE_MATRIX;

    if (!kv) {
      console.error("!! [DEVICE AUTH] LICENSE_MATRIX KV binding missing.");
      return NextResponse.json(
        { error: "Device authorization KV offline." },
        { status: 500 }
      );
    }

    const kvKey = `device_${token}`;
    const kvData = await kv.get(kvKey);

    if (kvData) {
      const parsedData = JSON.parse(kvData);
      await kv.delete(kvKey);

      console.log(
        `>> [DEVICE AUTH] UE client successfully retrieved payload for token: ${token.slice(0, 8)}...`
      );

      return NextResponse.json(
        {
          authorized: true,
          data: parsedData,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ authorized: false }, { status: 202 });
  } catch (error: any) {
    console.error(`!! [DEVICE AUTH GET FAULT] ${error?.message || String(error)}`);
    return NextResponse.json(
      { error: "Polling failed natively." },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------------------
// 2. WEB PORTAL APPROVAL ENDPOINT
// -------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = String(body?.token || "").trim();
    const email = String(body?.email || "").trim();

    if (!token || !email) {
      return NextResponse.json(
        { error: "Missing token or biometric identifier." },
        { status: 400 }
      );
    }

    const db = (process.env as any).DB;
    const kv = (process.env as any).LICENSE_MATRIX;

    if (!db) {
      console.error("!! [DEVICE AUTH] D1 Database 'DB' binding missing.");
      return NextResponse.json({ error: "Edge Database offline." }, { status: 500 });
    }

    if (!kv) {
      console.error("!! [DEVICE AUTH] LICENSE_MATRIX KV binding missing.");
      return NextResponse.json(
        { error: "Device authorization KV offline." },
        { status: 500 }
      );
    }

    const { results } = await db
      .prepare(
        `
        SELECT
          id,
          license_tier,
          neural_key,
          email,
          name
        FROM users
        WHERE email = ?
        LIMIT 1
        `
      )
      .bind(email)
      .all();

    const user =
      results && results.length > 0
        ? (results[0] as {
            id?: string;
            license_tier?: string;
            neural_key?: string;
            email?: string;
            name?: string;
          })
        : null;

    const assignedTier = String(user?.license_tier || "LITE").toUpperCase();
    const neuralKey = String(user?.neural_key || "UNALLOCATED");
    const resolvedEmail = String(user?.email || email).trim();
    const username =
      String(user?.name || "").trim() ||
      (resolvedEmail.includes("@") ? resolvedEmail.split("@")[0] : "DIRECTOR");
    const userId = String(user?.id || "").trim();

    const authPayload = {
      tier: assignedTier,
      key: neuralKey,
      email: resolvedEmail,
      username,
      name: username,
      user_id: userId,
      id: userId,
    };

    const kvKey = `device_${token}`;
    await kv.put(kvKey, JSON.stringify(authPayload), { expirationTtl: 300 });

    console.log(
      `>> [DEVICE AUTH] User ${resolvedEmail} approved device linkage. Tier: ${assignedTier}. Payload secured in KV.`
    );

    return NextResponse.json(
      { success: true, tier: assignedTier, email: resolvedEmail, username, user_id: userId, id: userId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`!! [DEVICE AUTH POST FAULT] ${error?.message || String(error)}`);
    return NextResponse.json({ error: "Approval failed natively." }, { status: 500 });
  }
}

/* --- END OF FILE app/api/device/route.ts --- */
