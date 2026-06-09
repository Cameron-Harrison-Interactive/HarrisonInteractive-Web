/* --- START OF FILE app/api/license/verify/route.ts --- */

// =========================================================================
// CLOUDFLARE EDGE DIRECTIVE
// =========================================================================
export const runtime = "edge";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NATIVE LICENSE VERIFICATION API
 * =========================================================================
 * [ARCHITECT NOTE]: We DO NOT import `NextResponse`.
 * By using the standard Web API `Response` object, we prevent Next.js 
 * from importing its bloated server core, mathematically eradicating the 
 * `async_hooks` Webpack collision on Cloudflare.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json() as any;
    const { license_key } = body;

    // 1. Initial Security Check
    if (!license_key) {
      return new Response(
        JSON.stringify({ valid: false, message: "No cryptographic key provided." }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Map the D1 Database Native Binding
    const db = (process.env as any).DB;

    if (!db) {
      console.error("!! [LICENSE MATRIX] D1 Database 'DB' is missing from the Edge environment.");
      return new Response(
        JSON.stringify({ valid: false, message: "Edge Database offline." }), 
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Query the Master Ledger
    const { results } = await db.prepare("SELECT license_tier FROM users WHERE neural_key = ?")
                                .bind(license_key)
                                .all();

    // 4. Verify and Respond to Unreal Engine
    if (results && results.length > 0) {
      const assignedTier = results[0].license_tier || "LITE";
      console.log(`>> [LICENSE MATRIX] Key Validated successfully. Granting Tier: ${assignedTier}`);
      
      return new Response(
        JSON.stringify({ valid: true, tier: assignedTier }), 
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
      
    } else {
      console.log("!! [LICENSE MATRIX] Intrusion attempt blocked. Invalid Neural Key.");
      return new Response(
        JSON.stringify({ valid: false, message: "Invalid or Expired Cryptographic Key." }), 
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

  } catch (error: any) {
    console.error(`!! [LICENSE MATRIX FATAL] ${error.message}`);
    return new Response(
      JSON.stringify({ valid: false, message: "Secure handshaking failed natively." }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/* --- END OF FILE app/api/license/verify/route.ts --- */