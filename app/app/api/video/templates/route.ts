import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const avatars = await prisma.avatar.findMany({
      select: {
        id: true,
        name: true,
        templates: true, 
      },
    });

    if (!avatars.length) {
      return NextResponse.json({ message: "No avatars found" }, { status: 404 });
    }

    const templates = avatars.map((avatar: { id: any; name: any; templates: any; }) => ({
      id: avatar.id,
      title: avatar.name,
      videoPath: Buffer.from(avatar.templates).toString("base64"), 
      thumbnailPath: "/placeholder.svg?height=720&width=1280", 
    }));

    return NextResponse.json({ templates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { message: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}