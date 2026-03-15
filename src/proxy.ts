import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(req: NextRequest) {
  const session = await auth()

  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}