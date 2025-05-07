import { NextResponse } from "next/server";
import connectMDB from "@/lib/mongodb";
import User from "@/model/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectMDB();
    const { username, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}