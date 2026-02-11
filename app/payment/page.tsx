"use client";

import { JSX, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

import OrderSuccessModal from "@/app/components/OrderSuccessModal";
import { useCart } from "@/app/context/CartContext";
import { useAddress } from "@/app/context/AddressContext";

import { FiCreditCard, FiClock, FiSmartphone, FiHome } from "react-icons/fi";
import { BiSolidCheckboxChecked } from "react-icons/bi";

/* PAGE */
export default function PaymentPage() {
  const [method, setMethod] = useState<"cod" | "upi" | "card" | "paylater">(
    "cod",
  );

  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount")) || 0;

  return (
    <div className="min-h-screen bg-gray-100 pt-20 md:pt-28 px-4 sm:px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-4 sm:px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg sm:text-xl font-bold">Payment Methods</h2>
          <p className="font-semibold text-sm sm:text-base">Amount ₹{amount}</p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* LEFT SIDEBAR / TABS */}
          <aside
            className="
              w-full md:w-72
              bg-gray-50
              border-b md:border-b-0 md:border-r border-gray-300
              flex md:flex-col
              overflow-x-auto
            "
          >
            <PaymentOption
              icon={<FiSmartphone />}
              label="UPI"
              active={method === "upi"}
              onClick={() => setMethod("upi")}
            />
            <PaymentOption
              icon={<FiCreditCard />}
              label="Credit / Debit Card"
              active={method === "card"}
              onClick={() => setMethod("card")}
            />
            <PaymentOption
              icon={<FiClock />}
              label="Pay Later"
              active={method === "paylater"}
              onClick={() => setMethod("paylater")}
            />
            <PaymentOption
              icon={<FiHome />}
              label="Pay On Delivery"
              active={method === "cod"}
              onClick={() => setMethod("cod")}
            />
          </aside>

          {/* RIGHT CONTENT */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto min-h-105 md:min-h-120 lg:min-h-125">
            {method === "upi" && <UPISection />}
            {method === "cod" && <CODSection amount={amount} />}
            {method === "card" && <Placeholder title="Card Payments" />}
            {method === "paylater" && <Placeholder title="Pay Later" />}
          </main>
        </div>
      </div>
    </div>
  );
}

/* PAYMENT OPTION */
interface PaymentOptionProps {
  icon: JSX.Element;
  label: string;
  active: boolean;
  onClick: () => void;
}

function PaymentOption({ icon, label, active, onClick }: PaymentOptionProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2 md:gap-3
        px-4 md:px-6 py-3 md:py-4
        cursor-pointer whitespace-nowrap
        border-b-2 md:border-b-0 md:border-l-4
        ${
          active
            ? "border-[#015f5a] bg-teal-50 font-semibold"
            : "border-transparent text-gray-600"
        }
      `}
    >
      {icon}
      <span className="text-sm md:text-base">{label}</span>
    </div>
  );
}

/* UPI SECTION */
function UPISection() {
  return (
    <div className="space-y-6">
      <h3 className="text-base sm:text-lg font-bold">Pay by any UPI app</h3>
      <p className="text-sm text-gray-500">
        Scan the QR using any UPI app like PhonePe, Paytm, GPay, BHIM
      </p>

      <div className="flex flex-wrap gap-3">
        {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
          <div
            key={app}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer"
          >
            {app}
          </div>
        ))}
      </div>

      <button
        onClick={() => toast("Coming soon", { icon: "⏳" })}
        className="w-full sm:w-auto bg-[#015f5a] text-white px-6 py-3 rounded-lg font-semibold"
      >
        Generate QR Code
      </button>

      <hr className="border-gray-300" />

      <button
        onClick={() => toast("Coming soon", { icon: "⏳" })}
        className="flex items-center gap-2 text-sm text-gray-600"
      >
        + &nbsp; Pay using UPI ID
      </button>
    </div>
  );
}

/* COD SECTION */
interface CODSectionProps {
  amount: number;
}

function CODSection({ amount }: CODSectionProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const { cartItems, clearCart } = useCart();
  const { selectedAddress } = useAddress();

  const placeOrderHandler = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems.map((item) => ({
            productId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            qty: item.qty,
          })),
          shippingAddress: selectedAddress,
          totalAmount: amount,
          paymentMethod: "COD",
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json();
      setOrderId(data._id);

      clearCart();
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-base sm:text-lg font-bold">Cash On Delivery</h3>

      <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">Cash On Delivery</p>
          <p className="text-sm text-gray-500">Pay by Cash / UPI on delivery</p>
        </div>
        <BiSolidCheckboxChecked size={20} />
      </div>

      <button
        disabled={loading}
        onClick={placeOrderHandler}
        className="w-full sm:w-auto bg-[#015f5a] text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Placing Order..." : "Proceed Order"}
      </button>

      {showSuccess && (
        <OrderSuccessModal
          orderId={orderId}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}

/* PLACEHOLDER */
interface PlaceholderProps {
  title: string;
}

function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="h-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
      {title} coming soon
    </div>
  );
}
