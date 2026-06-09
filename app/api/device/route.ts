/* --- START OF FILE app/api/device/route.ts --- */

// =========================================================================
// CLOUDFLARE EDGE DIRECTIVE
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | DEVICE AUTHORIZATION MATRIX
 * =========================================================================
 * Dual-Action Endpoint utilizing Pure Web APIs (No Next.js Imports).
 */

// -------------------------------------------------------------------------
// 1. UNREAL ENGINE POLLING ENDPOINT
// -------------------------------------------------------------------------
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing token." }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const kv = (process.env as any).LICENSE_MATRIX;
    const kvData = await kv.get(`device_${token}`);

    if (kvData) {
      const parsedData = JSON.parse(kvData);
      await kv.delete(`device_${token}`);
      
      console.log(`>> [DEVICE AUTH] UE5 Client successfully retrieved payload for token: ${token}`);
      return new Response(
        JSON.stringify({ authorized: true, data: parsedData }), 
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 202 Accepted: Waiting for user to click approve in the browser.
    return new Response(
      JSON.stringify({ authorized: false }), 
      { status: 202, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error(`!! [DEVICE AUTH GET FAULT] ${error.message}`);
    return new Response(
      JSON.stringify({ error: "Polling failed natively." }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// -------------------------------------------------------------------------
// 2. WEB PORTAL APPROVAL ENDPOINT
// -------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json() as any;
    const { token, email } = body;

    if (!token || !email) {
      return new Response(
        JSON.stringify({ error: "Missing token or biometric identifier." }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const db = (process.env as any).DB;
    const { results } = await db.prepare("SELECT license_tier, neural_key FROM users WHERE email = ?")
                                .bind(email)
                                .all();

    const assignedTier = (results && results.length > 0) ? (results[0].license_tier || "LITE") : "LITE";
    const neuralKey = (results && results.length > 0) ? (results[0].neural_key || "UNALLOCATED") : "UNALLOCATED";

    const authPayload = {
      tier: assignedTier,
      key: neuralKey,
      email: email
    };

    const kv = (process.env as any).LICENSE_MATRIX;
    
    // 300 seconds = 5 minutes expiration
    await kv.put(`device_${token}`, JSON.stringify(authPayload), { expirationTtl: 300 });

    console.log(`>> [DEVICE AUTH] User ${email} approved device linkage. Payload secured in KV.`);
    
    return new Response(
      JSON.stringify({ success: true, tier: assignedTier }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error(`!! [DEVICE AUTH POST FAULT] ${error.message}`);
    return new Response(
      JSON.stringify({ error: "Approval failed natively." }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/* --- END OF FILE app/api/device/route.ts --- */