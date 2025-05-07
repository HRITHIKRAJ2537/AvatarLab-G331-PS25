import { NextResponse } from "next/server";
import mongoose from "mongoose";
import VideoOutput from "@/model/videoOutput";
import * as dotenv from "dotenv";

dotenv.config();

const mongooseConnectionPromise = mongoose.connect(process.env.MONGODB_URI as string).catch((err) => {
  console.error("Mongoose connection error:", err);
  throw err;
});

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  console.log("Received GET request to /api/video/status/[id]");
  const params = await context.params;
  const { id } = params;

  try {
    await mongooseConnectionPromise;
    const videoOutput = await VideoOutput.findById(id);

    if (!videoOutput) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const status = videoOutput.status;
    const videoPath = status === "completed" ? `/api/videos/${id}` : "";

    console.log(`Video status for ${id}: ${status}, videoPath: ${videoPath}`);
    return NextResponse.json({ status, videoPath }, { status: 200 });
  } catch (error) {
    console.error("Error checking video status:", error);
    return NextResponse.json({ error: "Failed to check video status" }, { status: 500 });
  }
}