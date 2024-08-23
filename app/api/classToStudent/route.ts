import { prismaInstance } from "@/lib/prismaInit";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();
    const { studentId } = body;
    const classToStudent = await prismaInstance.classToStudent.findMany({
      where: {
        studentId,
      },
      select: {
        id: true,
        class: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(classToStudent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
