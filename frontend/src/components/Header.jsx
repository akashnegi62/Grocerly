/* eslint-disable react-hooks/purity */
import { useState, useMemo } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMapPin } from "react-icons/fi";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { useAddress } from "../context/AddressContext";

export default function Header({ onAuthOpen }) {
  const { cartItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const { selectedAddress } = useAddress();

  const navigate = useNavigate();
  const location = useLocation();
  const [setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState("");

  /* DYNAMIC DELIVERY TIME */
  const deliveryTime = useMemo(() => {
    return Math.floor(Math.random() * 5) + 6;
  }, []);

  /* SEARCH */
  const handleFocus = () => {
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = searchValue.trim();

      if (value) {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      } else {
        navigate("/search");
        setSearchParams({});
      }
    }
  };

  /* CART COUNT */
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="h-[10vh] w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 pt-6">
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-extrabold text-[#015f5b]"
        >
          Grocerly
        </Link>

        {/* LOCATION BAR */}
        <div
          onClick={() => {
            if (!user) {
              onAuthOpen(); // REGISTER POPUP
            }
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
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate("/profile");
              }}
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
