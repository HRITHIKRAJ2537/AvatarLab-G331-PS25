// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";

// dotenv.config();
// const SECRET_KEY = process.env.JWT_SECRET;

// export async function POST(req: Request) {
//   const { token } = await req.json();
//   if (!token) {
//     return NextResponse.json({ error: "Token is required" }, { status: 400 });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     return NextResponse.json({ success: true, message: "Verified", user: decoded }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
//   }
// }







import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Authorization header is required" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY as string); 
    return NextResponse.json({ success: true, message: "Verified", user: decoded }, { status: 200 });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
