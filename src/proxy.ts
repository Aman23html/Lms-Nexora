import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(req: NextRequest) {
  const session = await auth()

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (session.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}