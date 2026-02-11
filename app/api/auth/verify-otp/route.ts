/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 },
      );
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error("VERIFY OTP ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
