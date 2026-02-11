/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Order from "@/app/models/Order";
import { getAuthUser } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser(req);

    if (!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderItems, shippingAddress, totalAmount, paymentMethod } = body;

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json({ message: "No order items" }, { status: 400 });
    }

    await connectDB();

    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
