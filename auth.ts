/* --- START OF FILE auth.ts --- */

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

/**
 * =========================================================================
 * HARRISON INTERACTIVE | NEXTAUTH V5 EDGE CONFIGURATION
 * =========================================================================
 * This is the central brain of the Auth Matrix. 
 * NextAuth v5 is fully compatible with Cloudflare Workers/Pages.
 */

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 1. OAUTH PROVIDERS
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

  // 2. SESSION STRATEGY
  // We use JWT (JSON Web Tokens) because they are stateless and 
  // incredibly fast on the Edge Network.
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },

  // 3. CUSTOM UI ROUTES
  // Instead of NextAuth's default white login page, we tell it to use 
  // our custom AAA JARVIS gateway when a user is unauthenticated.
  pages: {
    signIn: "/login",
    error: "/login", // Redirect matrix collisions back to the portal
  },

  // 4. EDGE CALLBACKS
  // Intercepts the handshake to inject custom data into the user session
  callbacks: {
    async jwt({ token, user }) {
      // If the user just logged in, bind their ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the ID from the token into the active frontend session
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  
  // 5. DEBUG MODE (Enable for terminal logging during Edge deployment)
  debug: process.env.NODE_ENV === "development",
});

/* --- END OF FILE auth.ts --- */