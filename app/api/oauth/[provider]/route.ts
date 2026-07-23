/* --- START OF FILE app/api/oauth/[provider]/route.ts --- */

import { NextResponse } from "next/server";
import { signIn } from "@/auth";

export const runtime = "edge";

const ALLOWED_PROVIDERS = new Set(["google", "github"]);

/**
 * Server-side OAuth launch route for embedded H.E.L.E.N.A. panels.
 *
 * Client-side signIn() inside Unreal CEF/iframes can lose Auth.js CSRF/state
 * cookies. This route performs the Auth.js v5 signIn redirect on the server and
 * sends the browser directly to the provider's top-level auth page.
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider } = await context.params;
  const normalizedProvider = String(provider || "").toLowerCase();

  if (!ALLOWED_PROVIDERS.has(normalizedProvider)) {
    return NextResponse.json({ ok: false, error: "Unsupported OAuth provider." }, { status: 400 });
  }

  const url = new URL(req.url);
  const redirectTo =
    url.searchParams.get("redirectTo") ||
    url.searchParams.get("callbackUrl") ||
    "/dashboard";

  return signIn(normalizedProvider, { redirectTo });
}

/* --- END OF FILE app/api/oauth/[provider]/route.ts --- */
