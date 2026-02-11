/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  stock: number;
  categories: string[];
  image: string;
  createdAt: string;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">Products</h1>
      <p className="text-gray-500 mb-6">Manage all products from here</p>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* TABLE HEAD */}
            <thead>
              <tr className="border-b text-left text-sm text-gray-600">
                <th className="py-3">Product</th>

                <th className="hidden md:table-cell">Price</th>
                <th className="hidden md:table-cell">MRP</th>
                <th className="hidden md:table-cell">Categories</th>

                <th className="py-3">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b text-sm hover:bg-gray-50"
                >
                  {/* PRODUCT */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {/* IMAGE (desktop only) */}
                      <div className="hidden md:block h-12 w-12 relative overflow-hidden">
                        <Image
                          fill
                          src={product.image}
                          alt={product.name}
                          className="rounded-lg object-cover border"
                        />
                      </div>

                      <div>
                        <p className="font-semibold">{product.name}</p>
                        {/* BRAND (desktop only) */}
                        <p className="hidden md:block text-xs text-gray-500">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="hidden md:table-cell font-semibold text-[#015f5a]">
                    ₹{product.price}
                  </td>

                  {/* MRP */}
                  <td className="hidden md:table-cell line-through text-gray-400">
                    ₹{product.mrp}
                  </td>

                  {/* CATEGORIES */}
                  <td className="hidden md:table-cell text-xs text-gray-600">
                    {product.categories.slice(1).join(", ")}
                  </td>

                  {/* ACTION */}
                  <td className="py-4">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-500 text-sm font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
