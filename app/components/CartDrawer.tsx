/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

// context
import { useCart } from "@/app/context/CartContext";
import { useAddress } from "@/app/context/AddressContext";
import { useAuthContext } from "@/app/context/AuthContext";

// icons
import { FiArrowLeft } from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";
import { IoHome, IoBagAdd } from "react-icons/io5";

// components
import SelectAddressModal from "@/app/components/SelectAddressModal";
import AddAddressModal from "@/app/components/AddAddressModal";

type Address = {
  _id: string;
  label: string;
  address: string;
};

interface CartProps {
  onAuthOpen: () => void;
}

export default function CartDrawer({ onAuthOpen }: CartProps) {
  const { cartItems, updateQty, isCartOpen, setIsCartOpen } = useCart();
  const { selectedAddress, setSelectedAddress } = useAddress();
  const { user, token } = useAuthContext();

  const router = useRouter();

  // states
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  /* FETCH ADDRESSES */
  useEffect(() => {
    if (isCartOpen && user) {
      setAddressLoading(true);

      axios
        .get<Address[]>("/api/users/addresses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setAddressLoading(false);

          // auto-select first address if none selected
          if (data.length > 0 && !selectedAddress) {
            setSelectedAddress(data[0]);
          }
        })
        .catch(() => setAddressLoading(false));
    }
  }, [isCartOpen, user, token, selectedAddress, setSelectedAddress]);

  /* TOTALS */
  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const toPay = itemTotal;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-95 bg-white z-50 transform transition-transform duration-300 overflow-x-auto
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-300">
          <FiArrowLeft
            className="text-xl cursor-pointer"
            onClick={() => setIsCartOpen(false)}
          />
          <h2 className="text-lg font-bold">Cart</h2>
        </div>

        {/* NOT LOGGED IN */}
        {!user && (
          <div className="h-[90vh] flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Please Login</h2>
            <p className="text-gray-600 mb-6">
              Please login to access the cart.
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                onAuthOpen();
              }}
              className="w-full bg-[#015f5b] text-white py-4 rounded-xl font-semibold text-lg"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* EMPTY CART */}
        {user && cartItems.length === 0 && (
          <div className="h-[90vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="bg-gray-100 p-8 rounded-2xl mb-4">
              <div className="text-6xl text-gray-400">
                <IoBagAdd />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>

            <button
              onClick={() => {
                setIsCartOpen(false);
                router.push("/");
              }}
              className="w-full bg-[#015f5b] text-white py-4 rounded-xl font-semibold text-lg"
            >
              Browse Products
            </button>
          </div>
        )}

        {/* CART WITH ITEMS */}
        {user && cartItems.length > 0 && (
          <>
            {/* Saved banner */}
            <div className="bg-green-100 text-[#015f5b] text-sm font-medium py-2 text-center">
              Yay! You saved ₹56 on this order
            </div>

            <div className="px-4 py-4 space-y-4">
              {/* No Fees */}
              <div className="border border-gray-300 rounded-xl p-4 flex gap-4 items-center">
                <div className="text-4xl font-extrabold text-[#015f5b]">₹0</div>
                <div>
                  <p className="font-bold text-[#015f5b]">NO FEES</p>
                  <p className="text-sm text-gray-600">
                    ₹0 Handling Fee · ₹0 Delivery Fee
                  </p>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-3 border border-gray-300 rounded-xl p-4">
                <BsLightningCharge className="text-xl text-gray-700" />
                <p className="font-semibold">Delivery in 6 mins</p>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-3">
                      <div className="h-14 w-14 bg-gray-100 rounded-lg overflow-hidden relative">
                        <Image
                          fill
                          src={item.image || ""}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">1 pc</p>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-4">
                      <p className="font-bold text-sm">
                        ₹{item.price * item.qty}
                      </p>

                      <div className="flex items-center gap-3 mt-1 text-sm border border-[#015f5b] rounded-lg px-2 py-1 text-[#015f5b]">
                        <button
                          onClick={() =>
                            updateQty(item._id, Math.max(item.qty - 1, 0))
                          }
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Summary */}
              <div className="border border-gray-300 rounded-xl p-4 space-y-3">
                <p className="font-bold">Bill summary</p>
                <div className="flex justify-between text-sm">
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>To Pay</span>
                  <span>₹{toPay}</span>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-4 space-y-3">
              {!selectedAddress ? (
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="w-full bg-[#015f5b] text-white py-4 rounded-xl font-semibold"
                >
                  Add Address to proceed
                </button>
              ) : (
                <>
                  <div
                    onClick={() => setShowSelectAddress(true)}
                    className="flex items-center gap-3 border border-gray-300 rounded-xl p-3 cursor-pointer"
                  >
                    <div className="bg-gray-200 p-2 rounded-full">
                      <IoHome />
                    </div>
                    <div>
                      <p className="font-semibold">
                        Delivering to {selectedAddress.label.toLowerCase()}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {selectedAddress.address}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push(`/payment?amount=${toPay}`);
                    }}
                    className="w-full bg-[#015f5b] text-white py-4 rounded-xl font-semibold text-lg"
                  >
                    Click to Pay ₹{toPay}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showSelectAddress && (
        <SelectAddressModal
          onAddNew={() => {
            setShowSelectAddress(false);
            setShowAddAddress(true);
          }}
          onClose={() => setShowSelectAddress(false)}
        />
      )}

      {showAddAddress && (
        <AddAddressModal onClose={() => setShowAddAddress(false)} />
      )}
    </>
  );
}
