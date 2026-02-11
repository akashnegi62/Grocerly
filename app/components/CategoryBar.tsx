"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import bag from "@/app//assets/Images/bag.webp";
import All from "@/app/assets/Images/all.webp";
import Fruits from "@/app/assets/Images/fruits.png";
import Dairy from "@/app/assets/Images/dairy.png";
import Packaged from "@/app/assets/Images/package.png";
import IceCream from "@/app/assets/Images/ice.png";
import Rice from "@/app/assets/Images/rice.png";

const categories = [
  { name: "All Products", img: All },
  { name: "Fruits & Vegetables", img: Fruits },
  { name: "Dairy, Bread & Eggs", img: Dairy },
  { name: "Atta, Rice, Oil & Dals", img: Rice },
  { name: "Packaged Food", img: Packaged },
  { name: "Ice Creams & More", img: IceCream },
];

export default function CategoryBar() {
  const productRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="bg-gray-50">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl bg-teal-800 text-white grid grid-cols-1 md:grid-cols-2 items-center p-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              We bring the store
              <br />
              to your door
            </h2>

            <p className="mt-4 text-sm text-teal-100 max-w-md">
              Get organic produce and sustainably sourced groceries delivery at
              up to 20% off grocery.
            </p>

            <button
              onClick={() =>
                productRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 bg-lime-300 text-black font-semibold px-6 py-3 rounded-xl cursor-pointer"
            >
              Shop now
            </button>
          </div>

          <div className="w-full h-70 hidden md:flex justify-end relative">
            <Image
              fill
              sizes="100%"
              src={bag}
              alt="Groceries"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <div
        ref={productRef}
        className="scroll-mt-25 max-w-7xl mx-auto flex gap-8 overflow-x-auto px-4 py-4 text-sm font-medium"
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${cat.name}`}
            scroll={false}
            className="flex flex-col items-center min-w-24"
          >
            <div className="w-30 h-30 rounded-2xl bg-gray-100 mb-2 relative overflow-hidden">
              <Image src={cat.img} alt={cat.name} sizes="100%" />
            </div>
            <span className="text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
