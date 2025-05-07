
// import { NextResponse } from "next/server";
// import { Buffer } from "buffer";
// import mongoose from "mongoose";
// import VideoOutput from "@/model/videoOutput";
// import { v4 as uuid } from "uuid";
// import prisma from "@/lib/prisma";
// import * as dotenv from "dotenv";

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// const mongooseConnectionPromise = mongoose
//   .connect(process.env.MONGODB_URI as string)
//   .catch((err) => {
//     console.error("Mongoose connection error:", err);
//     throw err;
//   });

// export async function POST(req: Request) {
//   console.log("Received POST request to /api/video/generate");
//   try {
//     const { userIdentifier, audioId, templateId, text } = await req.json();
//     console.log(
//       `Request data: userIdentifier=${userIdentifier}, audioId=${audioId}, templateId=${templateId}, text=${text}`
//     );

//     // Validate required fields
//     if (!userIdentifier || !audioId || !templateId || !text) {
//       console.error("Missing required fields");
//       return NextResponse.json(
//         { error: "userIdentifier, audioId, templateId, and text are required" },
//         { status: 400 }
//       );
//     }

//     const linaOutput = await prisma.linaOutput.findUnique({
//       where: { id: audioId },
//       select: { audio: true, hubert: true },
//     });
//     if (!linaOutput || !linaOutput.audio || !linaOutput.hubert) {
//       console.error("LinaOutput data not found for audioId:", audioId);
//       return NextResponse.json({ error: "Audio or Hubert data not found" }, { status: 404 });
//     }
//     console.log(`Found LinaOutput for audioId: ${audioId}`);

//     const audioBuffer = Buffer.from(linaOutput.audio);
//     const audioBlob = new Blob([audioBuffer], { type: "audio/wav" });
//     const hubertBuffer = Buffer.from(linaOutput.hubert);
//     const hubertBlob = new Blob([hubertBuffer], { type: "application/octet-stream" });

//     let videoBuffer;
//     const userAvatar = await prisma.userAvatar.findUnique({
//       where: { id: templateId, userIdentifier },
//       select: { video: true },
//     });
//     if (userAvatar && userAvatar.video) {
//       videoBuffer = Buffer.from(userAvatar.video);
//       console.log(`Found UserAvatar for templateId: ${templateId}`);
//     } else {
//       const avatar = await prisma.avatar.findUnique({
//         where: { id: templateId },
//         select: { video: true },
//       });
//       if (!avatar || !avatar.video) {
//         console.error("Avatar or UserAvatar not found for templateId:", templateId);
//         return NextResponse.json({ error: "Avatar video not found" }, { status: 404 });
//       }
//       videoBuffer = Buffer.from(avatar.video);
//       console.log(`Found Avatar for templateId: ${templateId}`);
//     }

//     const videoBlob = new Blob([videoBuffer], { type: "video/mp4" });

//     // Prepare FormData for DiffDub
//     const formData = new FormData();
//     formData.append("audio", new File([audioBlob], "input_audio.wav", { type: "audio/wav" }));
//     formData.append("hubert", new File([hubertBlob], "temp_features.npy", { type: "application/octet-stream" }));
//     formData.append("video", new File([videoBlob], "template_video.mp4", { type: "video/mp4" }));
//     formData.append("userId", userIdentifier);
//     formData.append("text", text);

//     // Log FormData for debugging
//     console.log("FormData entries:");
//     for (const [key, value] of formData.entries()) {
//       console.log(`  ${key}: ${value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value}`);
//     }

//     // Send to DiffDub
//     const diffDubUrl = process.env.DIFFDUB_URL || "http://localhost:5003/infer";
//     console.log(`Sending request to DiffDub at ${diffDubUrl}`);
//     const response = await fetch(diffDubUrl, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("DiffDub error:", response.status, errorText);
//       return NextResponse.json(
//         { error: `DiffDub server error: ${response.statusText}`, details: errorText },
//         { status: response.status }
//       );
//     }

//     // Process generated video
//     const generatedVideoBlob = await response.blob();
//     const generatedVideoBuffer = Buffer.from(await generatedVideoBlob.arrayBuffer());

//     await mongooseConnectionPromise;
//     const videoId = uuid();
//     const videoOutput = new VideoOutput({
//       _id: videoId,
//       userIdentifier,
//       videoData: generatedVideoBuffer,
//       audioId,
//       templateId,
//       status: "completed",
//       createdAt: new Date(),
//     });
//     await videoOutput.save();
//     console.log(`Stored video in VideoOutput with id: ${videoId}`);

//     const videoBase64 = generatedVideoBuffer.toString("base64");

//     return NextResponse.json({
//       success: true,
//       message: "Video generation completed",
//       videoId,
//       videoData: videoBase64,
//     }, { status: 200 });
//   } catch (error) {
//     console.error("Error in video generation:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to generate video",
//         details: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }







// /api/video/generate/route.ts
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import VideoOutput from "@/model/videoOutput";
import { v4 as uuid } from "uuid";
import prisma from "@/lib/prisma";
import FormData from "form-data";
import fetch from "node-fetch";

// Connect to MongoDB
const mongooseConnectionPromise = mongoose
  .connect(process.env.MONGODB_URI!)
  .catch((err) => {
    console.error("Mongoose connection error:", err);
    throw err;
  });

export async function POST(req: NextRequest) {
  console.log("Received POST request to /api/video/generate");
  try {
    const { userIdentifier, audioId, templateId, text } = await req.json();
    console.log(
      `Request data: userIdentifier=${userIdentifier}, audioId=${audioId}, templateId=${templateId}, text=${text}`
    );

    // Validate required fields
    if (!userIdentifier || !audioId || !templateId || !text) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "userIdentifier, audioId, templateId, and text are required" },
        { status: 400 }
      );
    }

    // Fetch audio and Hubert features from LinaOutput
    const linaOutput = await prisma.linaOutput.findUnique({
      where: { id: audioId },
      select: { audio: true, hubert: true },
    });
    if (!linaOutput || !linaOutput.audio || !linaOutput.hubert) {
      console.error("LinaOutput data not found for audioId:", audioId);
      return NextResponse.json({ error: "Audio or Hubert data not found" }, { status: 404 });
    }
    console.log(`Found LinaOutput for audioId: ${audioId}`);

    const audioBuffer = Buffer.from(linaOutput.audio);
    const hubertBuffer = Buffer.from(linaOutput.hubert);

    // Fetch template video from UserAvatar or Avatar
    let videoBuffer;
    const userAvatar = await prisma.userAvatar.findUnique({
      where: { id: templateId, userIdentifier },
      select: { video: true },
    });
    if (userAvatar && userAvatar.video) {
      videoBuffer = Buffer.from(userAvatar.video);
      console.log(`Found UserAvatar for templateId: ${templateId}`);
    } else {
      const avatar = await prisma.avatar.findUnique({
        where: { id: templateId },
        select: { video: true },
      });
      if (!avatar || !avatar.video) {
        console.error("Avatar or UserAvatar not found for templateId:", templateId);
        return NextResponse.json({ error: "Avatar video not found" }, { status: 404 });
      }
      videoBuffer = Buffer.from(avatar.video);
      console.log(`Found Avatar for templateId: ${templateId}`);
    }

    // Log the data before appending to FormData
    console.log("Preparing FormData with the following data:");
    console.log(`  audio: Buffer(${audioBuffer.length} bytes), filename: input_audio.wav, contentType: audio/wav`);
    console.log(`  hubert: Buffer(${hubertBuffer.length} bytes), filename: temp_features.npy, contentType: application/octet-stream`);
    console.log(`  video: Buffer(${videoBuffer.length} bytes), filename: template_video.mp4, contentType: video/mp4`);
    console.log(`  userId: ${userIdentifier}`);
    console.log(`  text: ${text}`);

    // Prepare FormData for DiffDub using Buffers directly
    const formData = new FormData();
    formData.append("audio", audioBuffer, { filename: "input_audio.wav", contentType: "audio/wav" });
    formData.append("hubert", hubertBuffer, { filename: "temp_features.npy", contentType: "application/octet-stream" });
    formData.append("video", videoBuffer, { filename: "template_video.mp4", contentType: "video/mp4" });
    formData.append("userId", userIdentifier);
    formData.append("text", text);

    // Send to DiffDub
    const diffDubUrl = process.env.DIFFDUB_URL || "http://localhost:5003/infer";
    console.log(`Sending request to DiffDub at ${diffDubUrl}`);
    const response = await fetch(diffDubUrl, {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DiffDub error:", response.status, errorText);
      return NextResponse.json(
        { error: `DiffDub server error: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    // Process generated video
    const generatedVideoBuffer = Buffer.from(await response.arrayBuffer());

    // Save to MongoDB
    await mongooseConnectionPromise;
    const videoId = uuid();
    const videoOutput = new VideoOutput({
      _id: videoId,
      userIdentifier,
      videoData: generatedVideoBuffer,
      audioId,
      templateId,
      status: "completed",
      createdAt: new Date(),
    });
    await videoOutput.save();
    console.log(`Stored video in VideoOutput with id: ${videoId}`);

    const videoBase64 = generatedVideoBuffer.toString("base64");

    return NextResponse.json({
      success: true,
      message: "Video generation completed",
      videoId,
      videoData: videoBase64,
    }, { status: 200 });
  } catch (error) {
    console.error("Error in video generation:", error);
    return NextResponse.json(
      {
        error: "Failed to generate video",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}