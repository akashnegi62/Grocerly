import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import VerifyOtp from "../components/OtpForm";
import LoginForm from "../components/LoginForm";

export default function AuthModal({ onClose }) {
  const [step, setStep] = useState("register");
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-95 rounded-xl p-6 relative">
        
        {/* REGISTER */}
        
        {step === "register" && (
          <RegisterForm setStep={setStep} setEmail={setEmail} />
        )}

        {/* VERIFY OTP */}
        
        {step === "verify" && <VerifyOtp email={email} onClose={onClose} />}

        {/* LOGIN */}
        
        {step === "login" && <LoginForm onClose={onClose} setStep={setStep} />}

        {/* CLOSE BUTTON */}
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
