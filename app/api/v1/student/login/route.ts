import { prismaInstance } from "@/lib/prismaInit";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Fetch the user with matching email and password
    const user = await prismaInstance.student.findFirst({
      where: {
        email,
        password,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      // User found, return user data without password
      return NextResponse.json(user);
    } else {
      // Invalid credentials
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    // Return a generic error message in case of server issues
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
