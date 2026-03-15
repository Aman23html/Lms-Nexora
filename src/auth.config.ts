import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Redirect unauthenticated users here
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");

      if (isAdminRoute) {
        if (isLoggedIn) return true;
        return false; // Redirects to /login
      }
      return true;
    },
  },
  providers: [], // Empty array for now, populated in auth.ts
} satisfies NextAuthConfig;