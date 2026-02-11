/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/lib/auth";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params; // 👈 important

    const user = await getAuthUser(req);

    user.addresses = user.addresses.filter(
      (addr: any) => addr._id.toString() !== id
    );

    await user.save();

    return NextResponse.json(user.addresses);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params; // 👈 important

    const user = await getAuthUser(req);
    const { label, address } = await req.json();

    user.addresses = user.addresses.map((addr: any) =>
      addr._id.toString() === id
        ? { ...addr.toObject(), label, address }
        : addr
    );

    await user.save();

    return NextResponse.json(user.addresses);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
