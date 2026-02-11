"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import ProductCard from "@/app/components/ProductCard";
import ProductCardSkeleton from "@/app/components/ProductCardSkeleton";

import bag from "@/app/assets/Images/bag.webp";

/* TYPES */

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
};

/* PAGE */

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const productRef = useRef<HTMLDivElement | null>(null);

  /* FETCH PRODUCTS ONCE */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* FILTER ON QUERY CHANGE */
  useEffect(() => {
    if (!query) {
      setFiltered(products);
    } else {
      const q = query.toLowerCase();
      setFiltered(products.filter((p) => p.name.toLowerCase().includes(q)));
    }
  }, [query, products]);

  return (
    <>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl bg-teal-800 text-white grid grid-cols-1 md:grid-cols-2 items-center p-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Search products
            </h2>
            <p className="mt-4 text-sm text-teal-100 max-w-md">
              Fresh groceries, daily essentials & more delivered to your
              doorstep with up to 20% off grocery.
            </p>

            <button
              onClick={() =>
                productRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 bg-lime-300 text-black font-semibold px-6 py-3 rounded-xl"
            >
              Shop now
            </button>
          </div>

          <div className="hidden md:flex justify-end">
            <Image
              src={bag}
              alt="Shopping bag"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section ref={productRef} className="scroll-mt-20 max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
