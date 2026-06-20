/* --- START OF FILE auth.ts --- */

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { D1Adapter } from "@auth/d1-adapter";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXTAUTH V5 (REAL-TIME D1 HANDSHAKE CORE)
 * =========================================================================
 * The central brain of the Auth Matrix. Permanently bound to the D1 SQL Ledger.
 * Queries the database on every single session check to guarantee real-time
 * synchronization of license_tier, neural_key, and billing parameters.
 */

// Helper to resolve the active D1 instance natively on the Cloudflare Edge
const getD1Database = (): any => {
  try {
    // In next-on-pages, process.env.DB is populated at runtime during requests
    if ((process.env as any)?.DB) {
      return (process.env as any).DB;
    }
  } catch (error) {
    // Fail silently on local dev
  }
  return undefined;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  
  // THE CLOUDFLARE D1 ADAPTER
  adapter: process.env.DB ? D1Adapter(process.env.DB as any) : undefined,

  // OAUTH & MAGIC LINK PROVIDERS
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@harrisoninteractive.dev",
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // SESSION STRATEGY (JWT for Speed + DB for Permanence)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },

  // CUSTOM UI ROUTES
  pages: {
    signIn: "/login",
    error: "/login", 
  },

  // EDGE CALLBACKS (THE LIVE SYNC ENGINE)
  callbacks: {
    async jwt({ token, user }) {
      // Keep stable identity fields in the JWT so client pages can approve
      // Unreal device-link requests without losing name/email between redirects.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // 1. Inject the default baseline session variables
        (session.user as any).id = token.id as string;
        (session.user as any).tier = "LITE";
        (session.user as any).key = "";
        (session.user as any).billingDate = "";
        (session.user as any).stripeCustomerId = "";
        (session.user as any).billingEmail = "";
        (session.user as any).computeIncluded = 250000;
        (session.user as any).computeUsed = 0;
        (session.user as any).computePeriodStart = "";
        (session.user as any).computePeriodEnd = "";
        (session.user as any).newsletterSubscribed = 1;

        // 2. Real-Time D1 Handshake
        // Since the 'session' callback executes on every single page load,
        // we query D1 here to bypass JWT cookie caching. Your UI is now 
        // 100% stateful and reactive!
        const db = getD1Database();
        if (db && token.email) {
          try {
            const { results } = await db
<<<<<<< HEAD
              .prepare("SELECT id, name, email, license_tier, neural_key, billing_date, stripe_customer_id, billing_email, compute_included, compute_used, compute_period_start, compute_period_end, newsletter_subscribed FROM users WHERE email = ? LIMIT 1")
=======
              .prepare("SELECT id, name, email, license_tier, neural_key, billing_date, newsletter_subscribed FROM users WHERE email = ? LIMIT 1")
>>>>>>> 6fa07224bcb11598080722d460b04254e5e3bbe5
              .bind(token.email)
              .all();
            
            if (results && results[0]) {
              (session.user as any).id = results[0].id || token.id || "";
              (session.user as any).name = results[0].name || token.name || session.user.name || "";
              (session.user as any).email = results[0].email || token.email || session.user.email || "";
              (session.user as any).tier = String(results[0].license_tier || "LITE").toUpperCase();
              (session.user as any).key = results[0].neural_key || "";
              (session.user as any).billingDate = results[0].billing_date || "";
              (session.user as any).stripeCustomerId = results[0].stripe_customer_id || "";
              (session.user as any).billingEmail = results[0].billing_email || "";
              (session.user as any).computeIncluded = results[0].compute_included ?? 250000;
              (session.user as any).computeUsed = results[0].compute_used ?? 0;
              (session.user as any).computePeriodStart = results[0].compute_period_start || "";
              (session.user as any).computePeriodEnd = results[0].compute_period_end || "";
              (session.user as any).newsletterSubscribed = results[0].newsletter_subscribed !== undefined ? results[0].newsletter_subscribed : 1;
            }
          } catch (error: any) {
            console.error("[SYS ERR] D1 Session Sync Failed: ", error.message);
          }
        }
      }
      return session;
    },
  },
  
  // DEBUG MODE
  debug: process.env.NODE_ENV === "development",
});

/* --- END OF FILE auth.ts --- */