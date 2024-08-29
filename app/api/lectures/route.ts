import { prismaInstance } from "@/lib/prismaInit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { classId } = await req.json();
    
    if (!classId) {
      return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
    }

    const lectures = await prismaInstance.lecture.findMany({
      where: { classId },
    });

    return NextResponse.json(lectures, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
