import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function requireAdmin() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 })
  }

  if (session.user?.role !== "admin") {
    return NextResponse.json({ message: "Administrator access required." }, { status: 403 })
  }

  return null
}