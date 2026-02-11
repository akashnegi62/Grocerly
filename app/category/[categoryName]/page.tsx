/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import CategoryBar from "@/app/components/CategoryBar";
import ProductCard from "@/app/components/ProductCard";

export default function CategoryPage() {
  const params = useParams();

  // IMPORTANT: param name must match folder name [categoryName]
  const categoryName = params.categoryName as string;

  const category = decodeURIComponent(categoryName);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);

    axios
      .get(`/api/products/category/${encodeURIComponent(category)}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <>
      <CategoryBar />

      <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">{category}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-3 space-y-3"
                >
                  <Skeleton height={160} borderRadius={12} />
                  <Skeleton height={14} />
                  <Skeleton width="60%" height={14} />
                  <Skeleton height={36} borderRadius={8} />
                </div>
              ))
            : products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>

        {!loading && products.length === 0 && (
          <p className="text-gray-500 mt-6">No products found</p>
        )}
      </section>
    </>
  );
}
