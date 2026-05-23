/* --- START OF FILE auth.ts --- */

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { D1Adapter } from "@auth/d1-adapter";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXTAUTH V5 (STATEFUL D1 + RESEND)
 * =========================================================================
 * The central brain of the Auth Matrix. Now permanently bound to the 
 * D1 SQL Ledger and capable of dispatching secure Magic Links via Resend.
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  
  // THE CLOUDFLARE D1 ADAPTER
  adapter: process.env.DB ? D1Adapter(process.env.DB as any) : undefined,

  // OAUTH & MAGIC LINK PROVIDERS
  providers: [
    // --- MAGIC LINK PROVIDER (RESEND) ---
    // NOTE: This 'from' email MUST be from a domain you have verified in your Resend account!
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@harrisoninteractive.dev",
    }),

    // --- OAUTH PROVIDERS ---
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

  // EDGE CALLBACKS
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;
      return session;
    },
  },
  
  // DEBUG MODE
  debug: process.env.NODE_ENV === "development",
});

/* --- END OF FILE auth.ts --- */