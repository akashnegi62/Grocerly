import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm({ onClose, setStep }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    login(data.token, data.user);
    toast.success("Login successful");
    onClose();
  };

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold">Login</h2>
      <p className="text-gray-500">Welcome back</p>

      {/* EMAIL */}
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

      {/* PASSWORD */}
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

      {/* LOGIN BUTTON */}
      <button
        onClick={handleLogin}
        className="w-full py-4 rounded-full bg-[#015f5b] cursor-pointer text-white font-semibold"
      >
        Login
      </button>

      {/* SWITCH TO REGISTER */}
      <p
        onClick={() => setStep("register")}
        className="text-center text-sm  cursor-pointer"
      >
        Already have an account?{" "}
        <span className="text-blue-600">Register </span>
      </p>
    </div>
  );
}
