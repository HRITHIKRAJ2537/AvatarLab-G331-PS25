

// import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
// import { getUserId } from "@/lib/authenticate";

// export async function POST(request: NextRequest) {
//   try {
//     console.log("POST /api/audio/upload-voice called, request object:", request ? "present" : "missing");
//     const userIdentifier = await getUserId(request);
//     console.log("UserIdentifier from getUserId:", userIdentifier);
//     if (!userIdentifier) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await request.formData();
//     const name = formData.get("name") as string;
//     const text_normalized = formData.get("text_normalized") as string;
//     const gender = formData.get("gender") as string;
//     const audio = formData.get("audio") as File;
//     const language = formData.get("language") as string;

//     if (!name || !text_normalized || !gender || !audio || !language) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const audioBuffer = Buffer.from(await audio.arrayBuffer());

//     const voice = await prisma.userVoice.create({
//       data: {
//         name,
//         text_normalized,
//         gender,
//         audio: audioBuffer,
//         language,
//         userIdentifier,
//       },
//     });

//     return NextResponse.json({ success: true, voice });
//   } catch (error) {
//     console.error("Error uploading voice:", error);
//     return NextResponse.json(
//       { error: "Failed to upload voice", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }







import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/authenticate";

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/audio/upload-voice called, request object:", request ? "present" : "missing");
    const userIdentifier = await getUserId(request);
    console.log("UserIdentifier from getUserId:", userIdentifier);
    if (!userIdentifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const text_normalized = formData.get("text_normalized") as string;
    const gender = formData.get("gender") as string;
    const audio = formData.get("audio") as File;
    const language = formData.get("language") as string;

    if (!name || !text_normalized || !gender || !audio || !language) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const audioBuffer = Buffer.from(await audio.arrayBuffer());

    const voice = await prisma.userVoice.create({
      data: {
        name,
        text_normalized,
        gender,
        audio: audioBuffer,
        language,
        userIdentifier,
      },
    });

    return NextResponse.json({ success: true, voice });
  } catch (error) {
    console.error("Error uploading voice:", error);
    return NextResponse.json(
      { error: "Failed to upload voice", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

