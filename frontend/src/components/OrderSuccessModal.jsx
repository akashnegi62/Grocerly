import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function OrderSuccessModal() {
  const navigate = useNavigate();

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
            Thank you for your orders. <br /> Your items will be delivered
            shortly.
          </p>

          {/* Info box */}
          <div className="bg-green-50 text-green-700 text-sm rounded-xl p-3 mb-6">
            Payment Mode: Cash / UPI on Delivery
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-full bg-[#015f5b] text-white py-3 rounded-xl font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
