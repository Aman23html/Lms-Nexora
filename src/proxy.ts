import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

// 🔹 The new convention requires a named 'proxy' function export
export async function proxy(req: any) {
  return await auth(req);
}

export const config = {
  // This matcher prevents the proxy from running on static assets and APIs
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};