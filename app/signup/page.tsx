/* --- START OF FILE app/signup/page.tsx --- */

import LoginMatrix from "../login/page";

/**
 * Sign-Up Gateway
 *
 * Auth.js creates accounts through OAuth or magic-link sign-in, so signup shares
 * the same secure gateway while providing a stable /signup route for H.E.L.E.N.A.
 * and Fab account panels.
 */
export default function SignupGateway() {
  return <LoginMatrix />;
}

/* --- END OF FILE app/signup/page.tsx --- */
