import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import VideoOutput from "@/model/videoOutput";

// Connect to MongoDB
const mongooseConnectionPromise = mongoose
  .connect(process.env.MONGODB_URI!)
  .catch((err) => {
    console.error("Mongoose connection error:", err);
    throw err;
  });

export async function GET(req: NextRequest) {
  console.log("Received GET request to /api/video/get");
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
      console.error("Missing videoId parameter");
      return NextResponse.json({ error: "videoId is required" }, { status: 400 });
    }

    await mongooseConnectionPromise;
    const videoOutput = await VideoOutput.findById(videoId);

    if (!videoOutput || !videoOutput.videoData) {
      console.error("Video not found for videoId:", videoId);
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    console.log(`Found video for videoId: ${videoId}`);
    const videoDataBase64 = videoOutput.videoData.toString("base64");
    return NextResponse.json(
      {
        success: true,
        videoData: videoDataBase64,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch video",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}