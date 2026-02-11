/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    return NextResponse.json(user.addresses);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    const { label, address } = await req.json();

    if (!label || !address) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 },
      );
    }

    user.addresses.push({ label, address });
    await user.save();

    return NextResponse.json(user.addresses, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
