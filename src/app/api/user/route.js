import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
connectDB();
export async function POST(req) {
  try {
    const { username } = await req.json();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    console.error("Error searching for user:", err.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
