import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Buffer } from "buffer";

export async function POST(req: Request) {
  console.log("Received POST request to /api/audio/generate");
  try {
    const { text, userIdentifier, voiceId } = await req.json();

    // Validate required fields
    if (!text || !userIdentifier || !voiceId) {
      return NextResponse.json({ error: "text, userIdentifier, and voiceId are required" }, { status: 400 });
    }

    // Fetch voice data from Prisma
    const voice = await prisma.voice.findUnique({
      where: { id: voiceId },
      select: { name: true, text_normalized: true, audio: true },
    });

    if (!voice || !voice.audio) {
      return NextResponse.json({ error: "Voice not found or audio data missing" }, { status: 404 });
    }

    // Ensure text_normalized is present
    const normalizedText = voice.text_normalized;
    if (!normalizedText) {
      return NextResponse.json({ error: "text_normalized is required in voice data" }, { status: 400 });
    }

    // Convert audio Buffer to File
    const audioBuffer = Buffer.from(voice.audio);
    const audioBlob = new Blob([audioBuffer], { type: "audio/wav" });
    const audioFile = new File([audioBlob], "input_audio.wav", { type: "audio/wav" });
    if (!audioFile.size) {
      throw new Error("Audio file creation failed: empty file");
    }

    // Create FormData
    const formData = new FormData();
    formData.append("text", text);
    formData.append("text_normalized", normalizedText);
    formData.append("audio", audioFile);
    formData.append("userId", userIdentifier);
    formData.append("voiceName", voice.name || "GeneratedVoice");

    // Debug FormData
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value}`);
    }

    // Send to Lina Server
    console.log("Sending request to Lina Server at http://localhost:8000/synthesize_voice");
    const response = await fetch("http://localhost:8000/synthesize_voice", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lina Server error:", errorText);
      throw new Error(`Lina Server error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.success || !data.audioId) {
      throw new Error("Invalid response from Lina Server: missing audioId");
    }
    const audioId = data.audioId;
    console.log(`Extracted audioId from Lina Server: ${audioId}`);

    // Fetch generated audio and HuBERT
    const audioResponse = await fetch(`http://localhost:8000/get_audio?id=${audioId}`);
    if (!audioResponse.ok) {
      throw new Error("Failed to fetch audio from Lina Server");
    }
    const generatedAudioBlob = await audioResponse.blob();
    const audioBufferResponse = Buffer.from(await generatedAudioBlob.arrayBuffer());

    const hubertResponse = await fetch(`http://localhost:8000/get_hubert?id=${audioId}`);
    if (!hubertResponse.ok) {
      throw new Error("Failed to fetch hubert from Lina Server");
    }
    const generatedHubertBlob = await hubertResponse.blob();
    const hubertBuffer = Buffer.from(await generatedHubertBlob.arrayBuffer());

    // Store in LinaOutput
    await prisma.linaOutput.create({
      data: {
        id: audioId,
        audio: audioBufferResponse,
        hubert: hubertBuffer,
        usertext: text,
        name: voice.name || "GeneratedVoice",
        createdAt: new Date(),
      },
    });

    const audioDataResponse = {
      id: audioId,
      path: `/api/audio/generate?audioId=${audioId}`, // Updated path to use this route with query param
      usertext: text,
      name: voice.name || "GeneratedVoice",
    };

    return NextResponse.json({
      success: true,
      message: "Voice generated and stored",
      audio: audioDataResponse,
    });
  } catch (error) {
    console.error("Error generating voice:", error);
    return NextResponse.json(
      { error: "Failed to generate voice", details: error.message || String(error) },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  console.log("Received GET request to /api/audio/generate");
  try {
    const { searchParams } = new URL(req.url);
    const audioId = searchParams.get("audioId");

    if (!audioId) {
      console.error("No audioId provided in query");
      return NextResponse.json({ error: "audioId is required" }, { status: 400 });
    }

    const linaOutput = await prisma.linaOutput.findUnique({
      where: { id: audioId },
      select: { audio: true },
    });

    if (!linaOutput || !linaOutput.audio) {
      console.error(`Audio not found for id: ${audioId}`);
      return NextResponse.json({ error: "Audio not found" }, { status: 404 });
    }

    const audioBuffer = Buffer.from(linaOutput.audio);
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching audio:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio", details: error.message || String(error) },
      { status: 500 }
    );
  }
}









// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { Buffer } from "buffer";

// export async function POST(req: Request) {
//   console.log("Received POST request to /api/audio/generate");
//   try {
//     const { text, userIdentifier, voiceId } = await req.json();

//     // Validate required fields
//     if (!text || !userIdentifier || !voiceId) {
//       return NextResponse.json({ error: "text, userIdentifier, and voiceId are required" }, { status: 400 });
//     }

//     // Fetch voice data from Prisma
//     const voice = await prisma.voice.findUnique({
//       where: { id: voiceId },
//       select: { name: true, text_normalized: true, audio: true },
//     });

//     if (!voice || !voice.audio) {
//       return NextResponse.json({ error: "Voice not found or audio data missing" }, { status: 404 });
//     }

//     // Ensure text_normalized is present and compulsory
//     const normalizedText = voice.text_normalized;
//     if (!normalizedText) {
//       return NextResponse.json({ error: "text_normalized is required in voice data" }, { status: 400 });
//     }

//     // Convert audio Buffer to File object with validation
//     const audioBuffer = Buffer.from(voice.audio);
//     const audioBase64 = audioBuffer.toString("base64");
//     const byteCharacters = atob(audioBase64);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const initialAudioBlob = new Blob([byteArray], { type: "audio/wav" }); // Renamed to avoid conflict
//     const audioFile = new File([initialAudioBlob], "input_audio.wav", { type: "audio/wav" });
//     if (!audioFile.size) {
//       throw new Error("Audio file creation failed: empty file");
//     }

//     // Create FormData
//     const formData = new FormData();
//     formData.append("text", text); 
//     formData.append("text_normalized", normalizedText); 
//     formData.append("audio", audioFile);
//     formData.append("userId", userIdentifier); 
//     formData.append("voiceName", voice.name || "GeneratedVoice");

//     // Debug the form-data contents
//     for (let [key, value] of formData.entries()) {
//       console.log(`FormData entry - Key: ${key}, Value: ${value instanceof File ? "File" : value}`);
//     }

//     // Send to Flask /synthesize_voice
//     console.log("Sending request to Lina Server at http://localhost:8000/synthesize_voice");
//     const response = await fetch("http://localhost:8000/synthesize_voice", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Flask response error:", errorText);
//       throw new Error(`Flask server error: ${response.statusText} - ${errorText}`);
//     }

//     const data = await response.json();
//     if (!data.success || !data.audioId) {
//       throw new Error("Invalid response from Lina Server: missing audioId");
//     }
//     const audioId = data.audioId;
//     console.log(`Extracted audioId from Lina Server: ${audioId}`);

//     const audioResponse = await fetch(`http://localhost:8000/get_audio?id=${audioId}`);
//     if (!audioResponse.ok) throw new Error("Failed to fetch audio from Lina Server");
//     const generatedAudioBlob = await audioResponse.blob(); 
//     const audioBufferResponse = Buffer.from(await generatedAudioBlob.arrayBuffer());

//     const hubertResponse = await fetch(`http://localhost:8000/get_hubert?id=${audioId}`);
//     if (!hubertResponse.ok) throw new Error("Failed to fetch hubert from Lina Server");
//     const generatedHubertBlob = await hubertResponse.blob();
//     const hubertBuffer = Buffer.from(await generatedHubertBlob.arrayBuffer());

//     await prisma.linaOutput.create({
//       data: {
//         id: audioId,
//         audio: audioBufferResponse,
//         hubert: hubertBuffer,
//         usertext: text,
//         name: voice.name || "GeneratedVoice",
//         createdAt: new Date(),
//       },
//     });

//     const audioDataResponse = {
//       id: audioId,
//       path: `/api/audio/${audioId}`,
//       usertext: text,
//       name: voice.name || "GeneratedVoice",
//     };

//     return NextResponse.json({
//       success: true,
//       message: "Voice generated and stored",
//       audio: audioDataResponse,
//     });
//   } catch (error) {
//     console.error("Error generating voice:", error);
//     return NextResponse.json(
//       { error: "Failed to generate voice", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }