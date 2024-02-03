import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req) {
  console.log("entered the  post request");
  try {
    console.log("entered the try block");
    const reqBody = await req.json();
    const { username, password } = reqBody;
    console.log(username, password);
    const user = await User.findOne({ username });
    if (!user) {
      console.log("user does not exist");
      return NextResponse({ error: "User not found" }, { status: 401 });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      console.log("invalid password");
      return NextResponse({ error: "Invalid Password!" }, { status: 401 });
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      // email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });

    const loggedInUser = (await User.findById(user._id)).isSelected(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    const response = NextResponse.json(
      { message: "User logged in successfully!" },
      { status: 200 },
      loggedInUser
    );
    response.cookies.set("token", token, options);
    return response;
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
