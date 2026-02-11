"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCart } from "@/app/context/CartContext";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  weight?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { cartItems, addToCart, updateQty, decreaseQty } = useCart();

  // find product in cart
  const cartItem = cartItems.find((item) => item._id === product._id);
  const qty = cartItem?.qty || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm px-4 pt-6 pb-4 flex flex-col items-center">
      {/* IMAGE */}
      <div
        className="h-28 w-full bg-gray-100 rounded-xl mb-4 overflow-hidden cursor-pointer relative"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          router.push(`/product/${product._id}`);
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 200px"
        />
      </div>

      {/* NAME */}
      <p className="text-sm font-semibold text-center">{product.name}</p>

      {/* WEIGHT */}
      {product.weight && (
        <p className="font-semibold text-gray-400 mt-2">{product.weight}</p>
      )}

      {/* PRICE */}
      <p className="text-3xl font-bold text-teal-900 mt-4">₹{product.price}</p>

      {/* CART BUTTON */}
      {qty === 0 ? (
        /* ADD BUTTON */
        <button
          onClick={() => addToCart({ ...product, qty: 1 })}
          className="mt-5 w-full bg-teal-50 text-teal-900 py-3 rounded-xl text-xl font-bold cursor-pointer"
        >
          +
        </button>
      ) : (
        /* COUNTER BUTTON */
        <div className="mt-5 w-full bg-teal-50 text-teal-900 px-4 py-3 rounded-xl text-lg font-bold flex items-center justify-between">
          <button
            className="cursor-pointer px-2"
            onClick={() => decreaseQty(product._id)}
          >
            −
          </button>

          <span>{qty}</span>

          <button
            onClick={() => updateQty(product._id, qty + 1)}
            className="cursor-pointer px-2"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
