/* --- START OF FILE schema.sql --- */

-- =========================================================================
-- HARRISON INTERACTIVE | CLOUDFLARE D1 MASTER LEDGER (PATCHED v2.5)
-- =========================================================================
-- Patched to satisfy the hardcoded legacy SQL queries inside the official
-- @auth/d1-adapter library, resolving the oauth_token SQLITE_ERROR.
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. USERS TABLE (The Core Identity Matrix)
-- -------------------------------------------------------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  "emailVerified" DATETIME,
  image TEXT,
  
  -- [CUSTOM HARRISON INTERACTIVE DATA BINDINGS]
  license_tier TEXT DEFAULT 'LITE',
  neural_key TEXT,
  stripe_customer_id TEXT,
  billing_email TEXT
);

-- -------------------------------------------------------------------------
-- 2. ACCOUNTS TABLE (The OAuth Routing Matrix)
-- Patched with oauth_token and oauth_token_secret to bypass adapter bugs!
-- -------------------------------------------------------------------------
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  
  -- [CRITICAL ADAPTER COMPATIBILITY PATCHES]
  oauth_token TEXT,
  oauth_token_secret TEXT,
  
  FOREIGN KEY("userId") REFERENCES users("id") ON DELETE CASCADE
);

-- -------------------------------------------------------------------------
-- 3. SESSIONS TABLE (The Cookie Ledger)
-- -------------------------------------------------------------------------
DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  expires DATETIME NOT NULL,
  FOREIGN KEY("userId") REFERENCES users("id") ON DELETE CASCADE
);

-- -------------------------------------------------------------------------
-- 4. VERIFICATION TOKENS TABLE (The Email Magic-Link Ledger)
-- -------------------------------------------------------------------------
DROP TABLE IF EXISTS verification_tokens;
CREATE TABLE verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires DATETIME NOT NULL,
  PRIMARY KEY (identifier, token)
);

/* --- END OF FILE schema.sql --- */