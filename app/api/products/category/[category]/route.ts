/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";

function slugToRegex(slug: string) {
  const parts = slug.split("-");
  const regexStr = parts.join("[ &_-]*");
  return new RegExp(regexStr, "i");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    await connectDB();

    const { category: rawSlug } = await params;
    const slug = rawSlug.toLowerCase();

    const categoryRegex = slugToRegex(slug);

    const products = await Product.find({
      categories: { $elemMatch: { $regex: categoryRegex } },
    });

    return NextResponse.json(products);
  } catch (err: any) {
    console.error("CATEGORY API ERROR:", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
