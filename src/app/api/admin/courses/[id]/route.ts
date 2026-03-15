import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Course from "@/models/course.model";

/**
 * 1. GET Single Course
 * Synchronizes the frontend state with the MongoDB Master Registry.
 */
export async function GET(
  req: Request, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();

    // Select all fields to ensure the new "Elite" details are retrieved
    const course = await Course.findById(id).lean();

    if (!course) {
      return NextResponse.json(
        { message: "Node ID not found in global registry" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error: any) {
    console.error("Registry Read Error:", error);
    return NextResponse.json(
      { message: "Protocol failure during retrieval", error: error.message }, 
      { status: 500 }
    );
  }
}

/**
 * 2. PUT Update Course
 * Commits structural revisions to the course manifest.
 */
export async function PUT(
  req: Request, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    
    await dbConnect();

    /**
     * 🔹 Optimization: Using findByIdAndUpdate with $set ensures that we 
     * update the specific fields provided without destroying unrelated top-level keys.
     */
    const updatedCourse = await Course.findByIdAndUpdate(
      id, 
      { $set: body }, 
      { 
        new: true,           // Return the modified document
        runValidators: true, // Ensure Enum check (Beginner/Expert etc.) works
        context: 'query'     // Necessary for some Mongoose update validators
      }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Modification target void or already decommissioned" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error: any) {
    console.error("Registry Write Error:", error);
    return NextResponse.json(
      { message: "Critical failure during manifest revision", error: error.message }, 
      { status: 500 }
    );
  }
}

/**
 * 3. DELETE Course
 * Permanently purges the manifest node from the database.
 */
export async function DELETE(
  req: Request, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json(
        { message: "Target node non-existent or previously purged" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Resource successfully decommissioned from registry" }, 
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Registry Purge Error:", error);
    return NextResponse.json(
      { message: "Purge protocol failed", error: error.message }, 
      { status: 500 }
    );
  }
}