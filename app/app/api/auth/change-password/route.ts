import { NextResponse } from "next/server";
import connectMDB from "@/lib/mongodb";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import { parse } from "cookie";
import { jwtDecode } from "jwt-decode";

export async function POST(req: Request) {
  try {
    await connectMDB();

    // Extract token from cookies in the request headers
    const cookies = req.headers.get("cookie") || "";
    const parsedCookies = parse(cookies);
    const token = parsedCookies.token;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    // Decode the token to get userId
    let decoded;
    try {
      decoded = jwtDecode(token) as { email: string; userId: string };
    } catch (error) {
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: User ID not found in token" }, { status: 401 });
    }

    // Find the user by _id (assuming userId in JWT matches MongoDB _id)
    const user = await User.findById(userId); // Changed from findOne({ userId }) to findById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { currentPassword, newPassword } = await req.json();

    // Validate newPassword
    // if (!currentPassword || !newPassword) {
    //   return NextResponse.json({ message: "Current and new passwords are required" }, { status: 400 });
    // }
    // if (newPassword.length < 8) {
    //   return NextResponse.json({ message: "New password must be at least 8 characters long" }, { status: 400 });
    // }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
    }
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Change Password Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
