import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../utils/api";

export default function VerifyOtp({ email, onClose }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      login(data.token, data.user);
      toast.success("Account verified");
      onClose();
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold">OTP Verification</h2>
      <p className="text-gray-500 text-sm">OTP sent to {email}</p>

      <input
        className="w-full border px-4 py-3 rounded-full text-center tracking-widest text-lg"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full py-4 rounded-full bg-[#015f5b] cursor-pointer text-white font-semibold flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin text-lg" />
            Verifying...
          </>
        ) : (
          "Verify OTP"
        )}
      </button>
    </div>
  );
}
