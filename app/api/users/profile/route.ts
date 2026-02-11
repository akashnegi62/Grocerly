/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";
import User from "@/app/models/User";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 401 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authUser = await getAuthUser(req);
    const { name, phone } = await req.json();

    const user = await User.findById(authUser._id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    return NextResponse.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
