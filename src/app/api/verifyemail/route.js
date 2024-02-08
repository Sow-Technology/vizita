import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
connectDB();
export async function POST(req) {
  try {
    // Get the OTP from the request body
    const { otp } = req.body;

    // Find the user by the verification token (OTP)
    const user = await User.findOne({ verifyToken: otp });

    // If the user is not found or the token has expired, handle accordingly
    if (!user || user.verifyTokenExpiry <= Date.now()) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token (OTP)" });
    }

    // Update the user's verification status and clear the verification token
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
