/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "@/app/hooks/useAuth";

interface LoginFormProps {
  onClose: () => void;
  setStep: (step: "login" | "register" | "verify") => void;
}

export default function LoginForm({ onClose, setStep }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      login(res.data.token, res.data.user);
      toast.success("Login successful");
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold">Login</h2>
      <p className="text-gray-500">Welcome back</p>

      <div className="bg-white rounded-full flex items-center px-5 py-4 shadow">
        <FiMail className="text-gray-400 mr-3" />
        <input
          type="email"
          placeholder="Email address"
          className="w-full outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-full flex items-center px-5 py-4 shadow">
        <FiLock className="text-gray-400 mr-3" />
        <input
          type="password"
          placeholder="Password"
          className="w-full outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-4 rounded-full bg-[#015f5b] text-white font-semibold"
      >
        Login
      </button>

      <p
        onClick={() => setStep("register")}
        className="text-center text-sm cursor-pointer"
      >
        Don&apos;t have an account?{" "}
        <span className="text-blue-600">Register</span>
      </p>
    </div>
  );
}
