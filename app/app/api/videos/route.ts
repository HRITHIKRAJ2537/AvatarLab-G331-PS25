

// import { NextResponse, NextRequest } from "next/server";
// import mongoose from "mongoose";
// import VideoOutput from "@/model/videoOutput";
// import { getUserId } from "@/lib/authenticate";

// async function connectToDatabase() {
//   if (mongoose.connection.readyState >= 1) return;
//   return mongoose.connect(process.env.MONGODB_URI!);
// }

// export async function GET(request: NextRequest) {
//   try {
//     const userIdentifier = await getUserId(request);
//     if (!userIdentifier) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(request.url);
//     const metadata = searchParams.get("metadata") === "true";
//     const userId = searchParams.get("userId");

//     if (userId !== userIdentifier) {
//       return NextResponse.json({ error: "Forbidden: User ID does not match" }, { status: 403 });
//     }

//     await connectToDatabase();

//     const videos = await VideoOutput.find({ userIdentifier, status: "completed" }).select(
//       "_id videoData audioId createdAt"
//     );

//     if (metadata) {
//       const videoData = videos.map((video) => ({
//         _id: video._id,
//         name: `video-${video._id}`,
//         videoData: video.videoData.toString("base64"),
//         createdAt: video.createdAt.toISOString(),
//         userIdentifier: userIdentifier,
//         audioId: video.audioId,
//       }));

//       return NextResponse.json({ videos: videoData }, { status: 200 });
//     }

//     return NextResponse.json({ error: "Metadata parameter required" }, { status: 400 });
//   } catch (error) {
//     console.error("Error fetching videos:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch videos", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const userIdentifier = await getUserId(request);
//     if (!userIdentifier) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { id } = await request.json();
//     if (!id) {
//       return NextResponse.json({ error: "Missing video id" }, { status: 400 });
//     }

//     await connectToDatabase();

//     const video = await VideoOutput.findOne({ _id: id, userIdentifier });
//     if (!video) {
//       return NextResponse.json({ error: "Video not found or not authorized" }, { status: 404 });
//     }

//     // Move to trash instead of deleting
//     await VideoOutput.updateOne(
//       { _id: id },
//       { status: "trashed", deletedAt: new Date() }
//     );

//     return NextResponse.json({ success: true, message: "Video moved to trash" }, { status: 200 });
//   } catch (error) {
//     console.error("Error moving video to trash:", error);
//     return NextResponse.json(
//       { error: "Failed to move video to trash", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }










import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import VideoOutput from "@/model/videoOutput";
import { getUserId } from "@/lib/authenticate";
import prisma from "@/lib/prisma";

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI!);
}

export async function GET(request: NextRequest) {
  try {
    const userIdentifier = await getUserId(request);
    if (!userIdentifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const metadata = searchParams.get("metadata") === "true";
    const userId = searchParams.get("userId");

    if (userIdentifier !== userIdentifier) {
      return NextResponse.json({ error: "Forbidden: User ID does not match" }, { status: 403 });
    }

    await connectToDatabase();

    const videos = await VideoOutput.find({ userIdentifier, status: "completed" }).select(
      "_id videoData audioId createdAt"
    );

    if (metadata) {
      const videoData = videos.map((video) => ({
        _id: video._id,
        name: `video-${video._id}`,
        videoData: video.videoData.toString("base64"),
        createdAt: video.createdAt.toISOString(),
        userIdentifier: userIdentifier,
        audioId: video.audioId,
      }));

      return NextResponse.json({ videos: videoData }, { status: 200 });
    }

    return NextResponse.json({ error: "Metadata parameter required" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userIdentifier = await getUserId(request);
    if (!userIdentifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing video id" }, { status: 400 });
    }

    await connectToDatabase();

    const video = await VideoOutput.findOne({ _id: id, userIdentifier });
    if (!video) {
      return NextResponse.json({ error: "Video not found or not authorized" }, { status: 404 });
    }

    // Add to TrashItem table
    await prisma.trashItem.create({
      data: {
        id: crypto.randomUUID(),
        itemId: id,
        itemType: "video",
        userIdentifier,
        name: `video-${id}`,
        thumbnail: video.videoData,
        deletedAt: new Date(),
      },
    });

    // Move to trash in MongoDB
    await VideoOutput.updateOne(
      { _id: id },
      { status: "trashed", deletedAt: new Date() }
    );

    return NextResponse.json({ success: true, message: "Video moved to trash" }, { status: 200 });
  } catch (error) {
    console.error("Error moving video to trash:", error);
    return NextResponse.json(
      { error: "Failed to move video to trash", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}