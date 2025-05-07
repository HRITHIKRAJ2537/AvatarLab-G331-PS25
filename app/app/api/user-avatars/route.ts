import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Buffer } from "buffer";

export async function GET(req: Request) {
  try {
    const userIdentifier = new URL(req.url).searchParams.get("userIdentifier") || "";

    if (!userIdentifier) {
      return NextResponse.json({ error: "userIdentifier is required" }, { status: 400 });
    }

    const userAvatars = await prisma.userAvatar.findMany({
      where: { userIdentifier },
      select: { id: true, name: true, gender: true, video: true },
    });

    const formattedAvatars = userAvatars.map((avatar: { id: any; name: any; gender: any; video: any; }) => ({
      id: avatar.id,
      name: avatar.name,
      gender: avatar.gender,
      video: `data:video/mp4;base64,${Buffer.from(avatar.video).toString("base64")}`,
      type: "uploaded",
    }));

    return NextResponse.json(formattedAvatars, { status: 200 });
  } catch (error) {
    console.error("Error fetching user avatars:", error);
    return NextResponse.json(
      { error: "Failed to fetch user avatars", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}