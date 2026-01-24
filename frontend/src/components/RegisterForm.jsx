import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
import { API_URL } from "../utils/api";

export default function RegisterForm({ setStep, setEmail }) {
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
      const res = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("OTP sent to email");
      setEmail(email);
      setStep("verify");
    } catch {
      toast.error("Something went wrong");
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

      <p
        onClick={() => !loading && setStep("login")}
        className="text-center text-sm cursor-pointer"
      >
        Already have an account? <span className="text-blue-600">Login </span>
      </p>
    </div>
  );
}
