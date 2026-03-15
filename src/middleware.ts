import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// We initialize NextAuth with the config
const { auth } = NextAuth(authConfig);

// Then we export the 'auth' function as the default export, 
// which satisfies the Next.js middleware requirement.
export default auth;

export const config = {
  // This matcher ensures the middleware doesn't run on static files or APIs
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};