/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/purity */
"use client";

import { useState, useMemo, KeyboardEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiSearch, FiShoppingCart, FiUser, FiMapPin } from "react-icons/fi";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/hooks/useAuth";
import { useAddress } from "@/app/context/AddressContext";

interface HeaderProps {
  onAuthOpen: () => void;
}

export default function Header({ onAuthOpen }: HeaderProps) {
  const { cartItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const { selectedAddress } = useAddress();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState("");

  /* DYNAMIC DELIVERY TIME */
  const deliveryTime = useMemo(() => {
    return Math.floor(Math.random() * 5) + 6;
  }, []);

  /* SEARCH */
  const handleFocus = () => {
    if (pathname !== "/search") {
      router.push("/search");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = searchValue.trim();

      if (value) {
        router.push(`/search?q=${encodeURIComponent(value)}`);
      } else {
        router.push("/search");
      }
    }
  };

  /* CART COUNT */
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="h-[10vh] w-full bg-white sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 pt-6">
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-extrabold text-[#015f5b]"
        >
          Grocerly
        </Link>

        {/* LOCATION BAR */}
        <div
          onClick={() => {
            if (!user) onAuthOpen();
          }}
          className="hidden md:flex items-start gap-2 cursor-pointer"
        >
          <FiMapPin className="mt-1" />
          <div className="leading-tight">
            <p className="font-semibold text-sm">
              {user
                ? `Delivery in ${deliveryTime} mins`
                : "Delivery in minutes"}
            </p>

            <p className="text-xs text-gray-600 max-w-45 truncate">
              {user && selectedAddress
                ? selectedAddress.address
                : "Select location"}
            </p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1">
          <FiSearch className="text-gray-500" />
          <input
            value={searchValue}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none px-2 py-2 w-full text-sm"
            placeholder="Search for 'amul butter'"
          />
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* AUTH / PROFILE */}
          {!user ? (
            <button
              onClick={onAuthOpen}
              className="flex items-center gap-1 text-gray-700 hover:text-black cursor-pointer"
            >
              <FiUser className="text-xl" />
            </button>
          ) : (
            <button
              onClick={() => router.push("/profile")}
              className="w-9 h-9 rounded-full bg-[#015f5b] text-white flex items-center justify-center font-bold cursor-pointer"
              title="Profile"
            >
              {user.email.charAt(0).toUpperCase()}
            </button>
          )}

          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#015f5b] text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
