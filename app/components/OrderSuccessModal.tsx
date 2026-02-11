/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface OrderSuccessModalProps {
  onClose: () => void;
  orderId: string | null;
}

export default function OrderSuccessModal({
  onClose,
  orderId,
}: OrderSuccessModalProps) {
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 w-[90%] max-w-md text-center animate-scaleIn">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <FiCheckCircle className="text-green-500 text-6xl" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">
            Order Placed Successfully!
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm mb-6">
            Thank you for your order. <br />
            Your items will be delivered shortly.
          </p>

          {/* Info box */}
          <div className="bg-green-50 text-green-700 text-sm rounded-xl p-3 mb-6">
            Payment Mode: Cash / UPI on Delivery
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">
            {/* Continue Shopping */}
            <button
              onClick={() => router.push("/")}
              className="w-full bg-[#015f5b] text-white py-3 rounded-xl font-semibold"
            >
              Continue Shopping
            </button>

            {/* Track Order */}
            <button
              onClick={() => router.push(`/tracking/${orderId}`)}
              className="w-full border border-[#015f5b] text-[#015f5b] py-3 rounded-xl font-semibold"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
