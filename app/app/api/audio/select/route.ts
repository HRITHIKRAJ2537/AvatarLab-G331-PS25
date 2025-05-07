

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { promises as fs } from "fs";
// import path from "path";
// import { getUserId } from "@/lib/authenticate";


// export async function GET() {
//   try {
//     const userIdentifier = await getUserId();
//     if (!userIdentifier) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const voices = await prisma.voice.findMany({
//       select: {
//         id: true,
//         name: true,
//         text_normalized: true,
//         gender: true,
//         audio: true,
//         language: true,
//       },
//     });

//     const userVoices = await prisma.userVoice.findMany({
//       where: {
//         userIdentifier: userIdentifier, 
//       },      select: {
//         id: true,
//         name: true,
//         text_normalized: true,
//         gender: true,
//         audio: true,
//         language: true,
//       },
//     });

//     const allVoices = [
//       ...voices.map((voice: any) => ({ ...voice, source: "Voice" })),
//       ...userVoices.map((userVoice: any) => ({ ...userVoice, source: "UserVoice" })),
//     ];

//     const importedDir = path.join(process.cwd(), "public", "imported");
//     await fs.mkdir(importedDir, { recursive: true });

//     await Promise.all(
//       allVoices.map(async (voice: { audio: any; id: any; source: string }) => {
//         if (voice.audio) {
//           const audioPath = path.join(importedDir, `${voice.id}.wav`);
//           await fs.writeFile(audioPath, Buffer.from(voice.audio));
//         }
//       })
//     );

//     const audioFiles = allVoices.map((voice: { id: any; text_normalized: any; gender: any; language: any; name: any; source: string }) => ({
//       id: voice.id,
//       path: `/imported/${voice.id}.wav`,
//       audioIndex: allVoices.findIndex((v: { id: any }) => v.id === voice.id) + 1,
//       name: voice.name,
//       normalizedText: voice.text_normalized || "No normalized text",
//       gender: voice.gender || "Unknown",
//       language: voice.language || "Unknown",
//       source: voice.source, 
//     }));

//     return NextResponse.json({ audioFiles });
//   } catch (error) {
//     console.error("Error fetching imported audio:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch imported audio", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }





// /api/audio/select/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import { getUserId } from "@/lib/authenticate";

export async function GET(request: NextRequest) {
  try {
    const userIdentifier = await getUserId(request);
    if (!userIdentifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch voices from the Voice model (not user-specific)
    const voices = await prisma.voice.findMany({
      select: {
        id: true,
        name: true,
        text_normalized: true,
        gender: true,
        audio: true,
        language: true,
      },
    });

    // Fetch voices from the UserVoice model, filtered by userIdentifier
    const userVoices = await prisma.userVoice.findMany({
      where: {
        userIdentifier: userIdentifier, // Filter by the authenticated user
      },
      select: {
        id: true,
        name: true,
        text_normalized: true,
        gender: true,
        audio: true,
        language: true,
      },
    });

    const allVoices = [
      ...voices.map((voice: any) => ({ ...voice, source: "Voice" })),
      ...userVoices.map((userVoice: any) => ({ ...userVoice, source: "UserVoice" })),
    ];

    const importedDir = path.join(process.cwd(), "public", "imported");
    await fs.mkdir(importedDir, { recursive: true });

    // Write audio files asynchronously for both Voice and UserVoice
    await Promise.all(
      allVoices.map(async (voice: { audio: any; id: any; source: string }) => {
        if (voice.audio) {
          const audioPath = path.join(importedDir, `${voice.id}.wav`);
          await fs.writeFile(audioPath, Buffer.from(voice.audio));
        }
      })
    );

    // Map the combined voices to the response format
    const audioFiles = allVoices.map((voice: { id: any; text_normalized: any; gender: any; language: any; name: any; source: string }) => ({
      id: voice.id,
      path: `/imported/${voice.id}.wav`,
      audioIndex: allVoices.findIndex((v: { id: any }) => v.id === voice.id) + 1,
      name: voice.name,
      normalizedText: voice.text_normalized || "No normalized text",
      gender: voice.gender || "Unknown",
      language: voice.language || "Unknown",
      source: voice.source, 
    }));

    return NextResponse.json({ audioFiles });
  } catch (error) {
    console.error("Error fetching imported audio:", error);
    return NextResponse.json(
      { error: "Failed to fetch imported audio", details: error instanceof Error ? error.message : String(error) },
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
      return NextResponse.json({ error: "Missing voice id" }, { status: 400 });
    }

    const voice = await prisma.userVoice.findFirst({
      where: { id, userIdentifier },
    });

    if (!voice) {
      return NextResponse.json({ error: "Voice not found or not authorized" }, { status: 404 });
    }

    // Move to TrashItem table
    await prisma.trashItem.create({
      data: {
        id: crypto.randomUUID(),
        itemId: voice.id,
        itemType: "voice",
        userIdentifier,
        name: voice.name || `voice-${voice.id}`,
        thumbnail: null, // Voices don't have thumbnails
        deletedAt: new Date(),
      },
    });

    // Delete from UserVoice
    await prisma.userVoice.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Voice moved to trash" }, { status: 200 });
  } catch (error) {
    console.error("Error moving voice to trash:", error);
    return NextResponse.json(
      { error: "Failed to move voice to trash", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}