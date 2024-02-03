import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
connectDB();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { username, personalEmail, password } = reqBody;
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const newUser = new User({
      username,
      personalEmail,
      password,
    });
    const savedUser = await newUser.save();
    // await sendEmail({
    //   personalEmail,
    //   emailType: "VERIFY",
    //   userId: savedUser._id,
    // });
    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
