/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";

interface RegisterFormProps {
  setStep: (step: "register" | "login" | "verify") => void;
  setEmail: (email: string) => void;
}

export default function RegisterForm({ setStep, setEmail }: RegisterFormProps) {
  const [email, setEmailLocal] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setEmail(email);
      setStep("verify");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold">Create Account</h2>
      <p className="text-gray-500">Register using your email</p>

      {/* EMAIL */}
      <div className="bg-white rounded-full flex items-center px-5 py-4 shadow">
        <FiMail className="text-gray-400 mr-3" />
        <input
          type="email"
          placeholder="Email address"
          className="w-full outline-none"
          value={email}
          onChange={(e) => setEmailLocal(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* PASSWORD */}
      <div className="bg-white rounded-full flex items-center px-5 py-4 shadow">
        <FiLock className="text-gray-400 mr-3" />
        <input
          type="password"
          placeholder="Password"
          className="w-full outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* REGISTER BUTTON */}
      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full py-4 rounded-full bg-[#015f5b] cursor-pointer text-white font-semibold flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin text-lg" />
            Sending OTP...
          </>
        ) : (
          "Register"
        )}
      </button>

      {/* SWITCH TO LOGIN */}
      <p
        onClick={() => !loading && setStep("login")}
        className="text-center text-sm cursor-pointer"
      >
        Already have an account? <span className="text-blue-600">Login </span>
      </p>
    </div>
  );
}
