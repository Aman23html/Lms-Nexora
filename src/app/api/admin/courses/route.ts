import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; 
import Course from "@/models/course.model";

/**
 * 🔹 GET: Retrieve Global Manifest
 * Fetches all courses for the Admin Inventory and public Explorer.
 */
export async function GET() {
  try {
    await dbConnect();
    
    // Using .lean() for faster performance on read-only operations
    const courses = await Course.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`[Registry] Synchronization successful. ${courses.length} nodes retrieved.`);
    
    return NextResponse.json(courses, { status: 200 });
  } catch (error: any) {
    console.error("Critical Registry Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to synchronize course inventory", error: error.message }, 
      { status: 500 }
    );
  }
}

/**
 * 🔹 POST: Deploy New Intelligence Node
 * Commits a full manifest (Core Identity + Deep Details) to the database.
 */
export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const body = await req.json();

    // 1. Structural Integrity Check
    if (!body.title || !body.category || !body.instructor || !body.price) {
      return NextResponse.json(
        { message: "Incomplete Manifest: Title, Domain, Accreditor, and Tuition are mandatory." }, 
        { status: 400 }
      );
    }

    // 2. Commit to Mainframe
    // The nested 'details' object (Overview, Description, Outcomes) is automatically 
    // handled by Mongoose as long as your frontend formData matches the schema keys.
    const newCourse = await Course.create(body);

    console.log(`[Registry] Deployment successful: ID ${newCourse._id} ("${newCourse.title}")`);

    return NextResponse.json(
      { message: "Course successfully deployed to Nexora Mainnet", data: newCourse }, 
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Critical Deployment Error:", error);
    
    // Mongoose Schema Validation Handlers
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { message: "Manifest Schema Violation", details: error.errors }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Mainframe Internal Error", error: error.message }, 
      { status: 500 }
    );
  }
}