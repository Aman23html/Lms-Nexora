import { notFound } from "next/navigation"
import connectDb from "@/lib/db"
import Course from "@/models/course.model"
import CourseDetailsClient from "./CourseDetailsClient" // We will create this below

async function getCourse(id: string) {
  try {
    await connectDb()
    const course = await Course.findById(id).lean()
    if (!course) return null
    return JSON.parse(JSON.stringify(course))
  } catch (error) {
    return null
  }
}

export const dynamic = "force-dynamic"

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = await getCourse(id)

  if (!course) return notFound()

  return <CourseDetailsClient course={course} />
}