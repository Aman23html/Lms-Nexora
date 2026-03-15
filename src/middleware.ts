import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // We will create this below

// Use the official Auth.js middleware wrapper
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Matches all routes except api, _next/static, _next/image, and favicon
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};