import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Course from "@/models/course.model"

export async function GET() {
  try {
    await dbConnect()
    const courses = await Course.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json(courses, { status: 200 })
  } catch (error) {
    console.error("Public course catalog fetch failed:", error)
    return NextResponse.json({ message: "Unable to load the course catalog." }, { status: 500 })
  }
}