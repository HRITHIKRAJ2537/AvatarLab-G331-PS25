



// // app/api/auth/login/route.ts
// import connectMDB from "@/lib/mongodb";
// import User from "@/model/user";
// import { type NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";
// import { compare } from "bcryptjs";

// dotenv.config();

// const secret = process.env.JWT_SECRET;

// export async function POST(req: NextRequest) {
//   await connectMDB();

//   const { email, password } = await req.json();
//   console.log("Login attempt for:", email);

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.warn("Invalid credentials for:", email);
//       return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
//     }

//     const isValid = await compare(password, user.password);
//     if (!isValid) {
//       console.warn("Invalid credentials for:", email);
//       return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
//     }

//     const token = jwt.sign({ email: user.email, userId: user._id }, secret as string, { expiresIn: "1h" });
//     console.log("Login successful, token generated for:", email);

//     return NextResponse.json({
//       message: "Login Successful",
//       token,
//       userId: user._id.toString(), // Add userId to response
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     return NextResponse.json(
//       { message: "Server Error", details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }




import connectMDB from "@/lib/mongodb";
import User from "@/model/user";
import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { compare } from "bcryptjs";
import { serialize } from "cookie";

dotenv.config();

const secret = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  await connectMDB();

  const { email, password } = await req.json();
  console.log("Login attempt for:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.warn("Invalid credentials for:", email);
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      console.warn("Invalid credentials for:", email);
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    const token = jwt.sign({ email: user.email, userId: user._id, username : user.username }, secret as string, { expiresIn: "1h" });
    console.log("Login successful, token generated for:", email);

    const serializedCookie = serialize("token", token, {
      httpOnly: false, // Must be false for getEmail to read cookie client-side
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    const response = NextResponse.json({
      message: "Login Successful",
      token,
      userId: user._id.toString(),
    });
    response.headers.set("Set-Cookie", serializedCookie);

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}