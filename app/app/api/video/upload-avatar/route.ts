// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { Buffer } from "buffer";

// export async function POST(req: Request) {
//   console.log("Received POST request to /api/upload-avatar");
//   try {
//     const formData = await req.formData();
//     const name = formData.get("name") as string;
//     const gender = formData.get("gender") as string;
//     const videoFile = formData.get("video") as File;
//     const userIdentifier = formData.get("userIdentifier") as string;

//     if (!name || !gender || !videoFile || !userIdentifier) {
//       console.error("Missing required fields:", { name, gender, videoFile, userIdentifier });
//       return NextResponse.json(
//         { error: "name, gender, video, and userIdentifier are required" },
//         { status: 400 }
//       );
//     }

//     const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

//     const userAvatar = await prisma.userAvatar.create({
//       data: {
//         id: crypto.randomUUID(),
//         name,
//         gender,
//         video: videoBuffer,
//         userIdentifier,
//       },
//     });

//     console.log(`Uploaded user avatar with id: ${userAvatar.id} for user: ${userIdentifier}`);
//     return NextResponse.json({ success: true, avatarId: userAvatar.id }, { status: 200 });
//   } catch (error) {
//     console.error("Error uploading user avatar:", error);
//     return NextResponse.json(
//       { error: "Failed to upload user avatar", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }







import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Buffer } from "buffer";
import { getUserId } from "@/lib/authenticate";

export async function POST(req: NextRequest) {
  console.log("Received POST request to /api/video/upload-avatar");
  try {
    const userIdentifier = await getUserId(req);
    if (!userIdentifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const gender = formData.get("gender") as string;
    const videoFile = formData.get("video") as File;
    const userIdentifierFromForm = formData.get("userIdentifier") as string;

    if (!name || !gender || !videoFile || !userIdentifierFromForm) {
      console.error("Missing required fields:", { name, gender, videoFile, userIdentifier: userIdentifierFromForm });
      return NextResponse.json(
        { error: "name, gender, video, and userIdentifier are required" },
        { status: 400 }
      );
    }

    if (userIdentifierFromForm !== userIdentifier) {
      return NextResponse.json({ error: "Forbidden: User ID does not match" }, { status: 403 });
    }

    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

    const userAvatar = await prisma.userAvatar.create({
      data: {
        id: crypto.randomUUID(),
        name,
        gender,
        video: videoBuffer,
        userIdentifier,
      },
    });

    console.log(`Uploaded user avatar with id: ${userAvatar.id} for user: ${userIdentifier}`);
    return NextResponse.json({ success: true, avatarId: userAvatar.id }, { status: 200 });
  } catch (error) {
    console.error("Error uploading user avatar:", error);
    return NextResponse.json(
      { error: "Failed to upload user avatar", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userIdentifier = await getUserId(req);
    if (!userIdentifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing avatar id" }, { status: 400 });
    }

    const avatar = await prisma.userAvatar.findFirst({
      where: { id, userIdentifier },
    });

    if (!avatar) {
      return NextResponse.json({ error: "Avatar not found or not authorized" }, { status: 404 });
    }

    // Move to TrashItem table
    await prisma.trashItem.create({
      data: {
        id: crypto.randomUUID(),
        itemId: avatar.id,
        itemType: "avatar",
        userIdentifier,
        name: avatar.name || `avatar-${avatar.id}`,
        thumbnail: avatar.video,
        deletedAt: new Date(),
      },
    });

    // Delete from UserAvatar
    await prisma.userAvatar.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Avatar moved to trash" }, { status: 200 });
  } catch (error) {
    console.error("Error moving avatar to trash:", error);
    return NextResponse.json(
      { error: "Failed to move avatar to trash", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}