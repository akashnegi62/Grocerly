import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import type { Metadata } from "next";

import { CartProvider } from "@/app/context/CartContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { AddressProvider } from "@/app/context/AddressContext";

import LayoutClient from "./LayoutClient";

export const metadata: Metadata = {
  title: "Grocerly - Your Online Grocery Store",
  description: "Buy fresh groceries online with fast delivery.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AddressProvider>
            <CartProvider>
              <LayoutClient>{children}</LayoutClient>
            </CartProvider>
          </AddressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
