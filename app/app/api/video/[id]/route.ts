import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VIDEO_DIR = path.join(process.cwd(), "tmp", "videos");

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id;
    const videoPath = path.join(VIDEO_DIR, `${videoId}.mp4`);

    const videoExists = await fs
      .access(videoPath)
      .then(() => true)
      .catch(() => false);

    if (!videoExists) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const videoBuffer = await fs.readFile(videoPath);
    return new NextResponse(videoBuffer, {
      status: 200,
      headers: { "Content-Type": "video/mp4" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch video", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}