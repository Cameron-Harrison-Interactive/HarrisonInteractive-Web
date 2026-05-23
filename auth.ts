/* --- START OF FILE auth.ts --- */

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { D1Adapter } from "@auth/d1-adapter";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXTAUTH V5 (STATEFUL D1 EDGE MATRIX)
 * =========================================================================
 * The central brain of the Auth Matrix. Now permanently bound to the 
 * Cloudflare D1 SQL Ledger for persistent user account tracking.
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  
  // 1. THE CLOUDFLARE D1 ADAPTER
  // We conditionally load it so your local Docker (which doesn't have the live DB) 
  // doesn't crash during development, but the Edge Network binds it seamlessly!
  adapter: process.env.DB ? D1Adapter(process.env.DB as any) : undefined,

  // 2. OAUTH PROVIDERS
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // 3. SESSION STRATEGY
  // We explicitly override the database default to keep using JWTs.
  // This gives us the speed of Stateless tokens, with the permanence of a Stateful Database!
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },

  // 4. CUSTOM UI ROUTES
  pages: {
    signIn: "/login",
    error: "/login", 
  },

  // 5. EDGE CALLBACKS
  callbacks: {
    async jwt({ token, user }) {
      // Upon successful login/registration, bind the new Database ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the Database ID from the encrypted token into the active frontend session
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  
  // 6. DEBUG MODE
  debug: process.env.NODE_ENV === "development",
});

/* --- END OF FILE auth.ts --- */