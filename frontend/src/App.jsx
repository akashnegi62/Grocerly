import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import ProfilePage from "./pages/ProfilePage";
import PaymentPage from "./pages/PaymentPage";

import AuthModal from "./components/AuthModal";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="main bg-gray-50 min-h-screen">
        {/* Header */}
        <Header onAuthOpen={() => setAuthOpen(true)} />

        {/* Cart */}
        <CartDrawer />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>

        {/* Footer */}
        <Footer />

        {/* Auth Popup */}
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      </div>
    </AuthProvider>
  );
}
