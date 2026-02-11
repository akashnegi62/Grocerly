/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useAuth } from "@/app/hooks/useAuth";

interface VerifyOtpProps {
  email: string;
  onClose: () => void;
}

export default function VerifyOtp({ email, onClose }: VerifyOtpProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleVerify = async () => {
    if (!otp.trim()) {
      toast.error("Enter OTP");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/auth/verify-otp",
        {
          email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      login(data.token, data.user);
      toast.success("Account verified");
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed");
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
