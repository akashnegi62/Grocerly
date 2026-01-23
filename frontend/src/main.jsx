import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { AddressProvider } from "./context/AddressContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <AuthProvider>
        <AddressProvider>
          <App />
        </AddressProvider>
      </AuthProvider>
      <Toaster position="top-center" />
    </CartProvider>
  </BrowserRouter>,
);
