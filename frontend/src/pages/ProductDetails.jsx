/* eslint-disable react-hooks/set-state-in-effect */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH PRODUCT */
  useEffect(() => {
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* FETCH SIMILAR PRODUCTS */
  useEffect(() => {
    if (!product) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/products?type=${product.type}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item._id !== product._id);
        setSimilarProducts(filtered);
      });
  }, [product]);

  /* 🔹 SKELETON LOADING UI */
  if (loading) {
    return (
      <div className="min-h-[90vh] max-w-7xl mx-auto px-4 py-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="bg-white rounded-2xl shadow p-4">
            <Skeleton height={420} borderRadius={16} />
            <Skeleton height={50} className="mt-6" borderRadius={12} />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <Skeleton width="40%" height={14} />
              <Skeleton width="70%" height={24} />
              <Skeleton width="30%" height={14} />
              <Skeleton width="50%" height={40} />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 space-y-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} height={16} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* PRODUCT DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT IMAGE */}
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex gap-2 mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    className="h-full w-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              ))}
          </div>

          <div className="h-105 bg-gray-100 rounded-xl mb-6 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={product.image}
              alt={product.name}
            />
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-[#015f5b] text-white py-4 rounded-xl font-semibold text-lg"
          >
            Add To Cart
          </button>
        </div>

        {/* RIGHT INFO */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h1 className="text-2xl font-bold mt-1">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-green-600 font-semibold">
                ★ {product.rating}
              </span>
              <span className="text-gray-500">({product.reviews})</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-xl font-bold">
                ₹{product.price}
              </span>
              <span className="line-through text-gray-400">₹{product.mrp}</span>
              <span className="text-green-600 font-semibold">
                ₹{product.mrp - product.price} OFF
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-2">MRP incl. of all taxes</p>
          </div>

          {/* HIGHLIGHTS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-bold mb-4">Highlights</h2>

            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <p className="text-gray-500">Brand</p>
              <p>{product.brand}</p>

              <p className="text-gray-500">Product Type</p>
              <p>{product.type}</p>

              <p className="text-gray-500">Diet</p>
              <p>{product.diet}</p>

              <p className="text-gray-500">Weight</p>
              <p>{product.weight}</p>
            </div>

            <div className="mt-4 text-sm">
              <p className="text-gray-500 mb-1">Key Features</p>
              <p>{product.features}</p>
            </div>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE */}
      {similarProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-6">You May Also Like</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {similarProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
