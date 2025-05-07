import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import VideoOutput from "@/model/videoOutput";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/authenticate";

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

    // Fetch trashed items from TrashItem table
    const trashedItems = await prisma.trashItem.findMany({
      where: { userIdentifier },
    });

    // Format the response
    const formattedItems = trashedItems.map((item) => ({
      id: item.id,
      type: item.itemType,
      name: item.name,
      thumbnail: item.thumbnail ? Buffer.from(item.thumbnail).toString("base64") : null,
      duration: item.itemType === "video" ? "00:00" : null, // Placeholder for videos
      deletedAt: item.deletedAt.toISOString(),
      expiryDate: new Date(new Date(item.deletedAt).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    // Filter out expired items and delete them permanently
    const now = new Date();
    const itemsToDelete = formattedItems.filter(
      (item) => new Date(item.expiryDate) < now
    );
    const itemsToShow = formattedItems.filter(
      (item) => new Date(item.expiryDate) >= now
    );

    // Permanently delete expired items
    if (itemsToDelete.length > 0) {
      await connectToDatabase();
      const idsToDelete = itemsToDelete.map((item) => item.id);
      const videoItemIds = itemsToDelete
        .filter((item) => item.type === "video")
        .map((item) => item.id);

      await Promise.all([
        prisma.trashItem.deleteMany({ where: { id: { in: idsToDelete } } }),
        VideoOutput.deleteMany({ _id: { $in: videoItemIds }, userIdentifier, status: "trashed" }),
      ]);
    }

    return NextResponse.json({ items: itemsToShow }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trashed items:", error);
    return NextResponse.json(
      { error: "Failed to fetch trashed items", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userIdentifier = await getUserId(request);
    if (!userIdentifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ids } = await request.json();
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Missing or invalid item IDs" }, { status: 400 });
    }

    // Fetch the trashed items to determine their types and original IDs
    const trashedItems = await prisma.trashItem.findMany({
      where: { id: { in: ids }, userIdentifier },
    });

    // Restore items based on their type
    const videosToRestore = trashedItems
      .filter((item: { itemType: string; }) => item.itemType === "video")
      .map((item) => item.itemId);
    const avatarsToRestore = trashedItems
      .filter((item) => item.itemType === "avatar")
      .map((item) => ({
        id: item.itemId,
        name: item.name,
        userIdentifier,
        video: item.thumbnail,
        gender: "unknown", // Placeholder; you might need to store this elsewhere
      }));
    const voicesToRestore = trashedItems
      .filter((item) => item.itemType === "voice")
      .map((item) => ({
        id: item.itemId,
        name: item.name,
        userIdentifier,
        audio: Buffer.alloc(0), // Placeholder; we don't store audio in TrashItem
        text_normalized: "unknown", // Placeholder
        gender: "unknown", // Placeholder
        language: "unknown", // Placeholder
      }));

    await connectToDatabase();

    // Restore videos in MongoDB
    if (videosToRestore.length > 0) {
      await VideoOutput.updateMany(
        { _id: { $in: videosToRestore }, userIdentifier, status: "trashed" },
        { status: "completed", $unset: { deletedAt: "" } }
      );
    }

    // Restore avatars and voices in Prisma
    if (avatarsToRestore.length > 0) {
      await prisma.userAvatar.createMany({ data: avatarsToRestore });
    }
    if (voicesToRestore.length > 0) {
      await prisma.userVoice.createMany({ data: voicesToRestore });
    }

    // Remove from TrashItem
    await prisma.trashItem.deleteMany({ where: { id: { in: ids } } });

    return NextResponse.json({ success: true, message: "Items restored" }, { status: 200 });
  } catch (error) {
    console.error("Error restoring items:", error);
    return NextResponse.json(
      { error: "Failed to restore items", details: error instanceof Error ? error.message : String(error) },
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

    const { ids } = await request.json();
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Missing or invalid item IDs" }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch trashed items to find videos
    const trashedItems = await prisma.trashItem.findMany({
      where: { id: { in: ids }, userIdentifier },
    });

    const videoItemIds = trashedItems
      .filter((item: { itemType: string; }) => item.itemType === "video")
      .map((item: { itemId: any; }) => item.itemId);

    // Delete videos from MongoDB
    if (videoItemIds.length > 0) {
      await VideoOutput.deleteMany({ _id: { $in: videoItemIds }, userIdentifier, status: "trashed" });
    }

    // Delete from TrashItem
    await prisma.trashItem.deleteMany({ where: { id: { in: ids } } });

    return NextResponse.json({ success: true, message: "Items permanently deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error permanently deleting items:", error);
    return NextResponse.json(
      { error: "Failed to permanently delete items", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}