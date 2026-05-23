/* --- START OF FILE auth.ts --- */

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { D1Adapter } from "@auth/d1-adapter";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXTAUTH V5 (STATEFUL D1 + HANDSHAKE CORE)
 * =========================================================================
 * The central brain of the Auth Matrix. Permanently bound to the D1 SQL Ledger.
 * Uses native process.env.DB mapping to bypass build-time dependency crashes.
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  
  // THE CLOUDFLARE D1 ADAPTER
  // Automatically resolves the database natively at runtime via process.env
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

  // EDGE CALLBACKS (THE HANDSHAKE BINDINGS)
  callbacks: {
    async jwt({ token, user }) {
      // 1. Initial Login/Registration Pass
      if (user) {
        token.id = user.id;
        token.tier = (user as any).license_tier || "LITE";
        token.key = (user as any).neural_key || "";
      } 
      // 2. Real-Time Database Sync (Subsequent Session Checks)
      // We read your database natively using process.env.DB to grab
      // any newly granted ranks or keys!
      else if (token.email && process.env.DB) {
        try {
          const db = process.env.DB as any;
          const { results } = await db
            .prepare("SELECT license_tier, neural_key FROM users WHERE email = ?")
            .bind(token.email)
            .all();
          
          if (results && results[0]) {
            token.tier = results[0].license_tier;
            token.key = results[0].neural_key;
          }
        } catch (error: any) {
          console.error("[SYS ERR] D1 Session Sync Failed: ", error.message);
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Inject the database parameters safely into the frontend session
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).tier = (token.tier as string) || "LITE";
        (session.user as any).key = (token.key as string) || "";
      }
      return session;
    },
  },
  
  // DEBUG MODE
  debug: process.env.NODE_ENV === "development",
});

/* --- END OF FILE auth.ts --- */