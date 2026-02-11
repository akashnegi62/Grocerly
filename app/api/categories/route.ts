import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Category from "@/app/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}
