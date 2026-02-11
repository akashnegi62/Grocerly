"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AuthModal from "@/app/components/AuthModal";
import CartDrawer from "@/app/components/CartDrawer";
import { Toaster } from "react-hot-toast";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <Header onAuthOpen={() => setAuthOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer onAuthOpen={() => setAuthOpen(true)} />

      {/* Page Content */}
      <main className="min-h-screen bg-gray-50">{children}</main>

      {/* Toast Notifications */}
      <Toaster position="top-center" />

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
