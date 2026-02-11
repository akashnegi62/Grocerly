import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const keyword = q
    ? { name: { $regex: q, $options: "i" } }
    : {};

  const products = await Product.find(keyword);
  return NextResponse.json(products);
}
