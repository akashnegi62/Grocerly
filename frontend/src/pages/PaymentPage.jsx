import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import OrderSuccessModal from "../components/OrderSuccessModal";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";

import { FiCreditCard, FiClock, FiSmartphone, FiHome } from "react-icons/fi";
import { BiSolidCheckboxChecked } from "react-icons/bi";

export default function PaymentPage() {
  const [method, setMethod] = useState("cod");

  const location = useLocation();
  const amount = location.state?.amount || 0;

  return (
    <div className="min-h-screen bg-gray-100 pt-30">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-b-gray-300">
          <h2 className="text-xl font-bold">Payment Methods</h2>
          <p className="font-semibold">Amount ₹{amount}</p>
        </div>

        <div className="flex">
          {/* LEFT SIDEBAR */}
          <aside className="w-72 border-r border-r-gray-300 bg-gray-50">
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
              label="Paylater"
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
          <main className="flex-1 p-8 h-130 overflow-y-auto">
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

function PaymentOption({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-4 cursor-pointer border-l-4
        ${
          active
            ? "border-[#015f5a] bg-teal-50 font-semibold"
            : "border-transparent text-gray-600"
        }
      `}
    >
      {icon}
      {label}
    </div>
  );
}

/* UPI SECTION */

function UPISection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Pay by any UPI app</h3>

      <p className="text-sm text-gray-500">
        Scan the QR using any UPI app like PhonePe, Paytm, GPay, BHIM
      </p>

      <div className="flex gap-3">
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
        className="bg-[#015f5a] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
      >
        Generate QR Code
      </button>

      <hr className="border-gray-300" />

      <button
        onClick={() => toast("Coming soon", { icon: "⏳" })}
        className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
      >
        + &nbsp; Pay using UPI ID
      </button>
    </div>
  );
}

/* COD SECTION */

function CODSection({ amount }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

      const res = await fetch(`http://localhost:3000/api/orders`, {
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

      await res.json();

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
      <h3 className="text-lg font-bold">Cash On Delivery</h3>

      <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between cursor-pointer">
        <div>
          <p className="font-semibold">Cash On Delivery</p>
          <p className="text-sm text-gray-500">Pay by Cash / UPI on delivery</p>
        </div>
        <BiSolidCheckboxChecked size={20} />
      </div>

      <button
        disabled={loading}
        onClick={placeOrderHandler}
        className="bg-[#015f5a] text-white px-6 py-3 rounded-lg cursor-pointer"
      >
        {loading ? "Placing Order..." : "Proceed Orders"}
      </button>

      {showSuccess && (
        <OrderSuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}

/* PLACEHOLDER */

function Placeholder({ title }) {
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
      {title} coming soon
    </div>
  );
}
