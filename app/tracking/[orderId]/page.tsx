/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiTruck,
  FiHome,
} from "react-icons/fi";
import toast from "react-hot-toast";
import api from "@/app/lib/axios";

export default function TrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* FETCH SINGLE ORDER */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("/api/orders/my");
        const foundOrder = res.data.find((o: any) => o._id === orderId);

        if (!foundOrder) {
          toast.error("Order not found");
          return;
        }

        setOrder(foundOrder);
      } catch (err) {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading tracking details...
      </div>
    );
  }

  if (!order) return null;

  /* PRICE CALCULATIONS */
  const subtotal = order.orderItems.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0,
  );

  const discount = order.discount || 0;
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const finalTotal = subtotal - discount + deliveryFee;

  /* TRACKING STEPS */
  const steps = [
    {
      title: "Order Confirmed",
      done: true,
      icon: <FiCheckCircle />,
      time: order.createdAt,
    },
    {
      title: "Packed",
      done: ["packed", "shipped", "delivered"].includes(order.status),
      icon: <FiPackage />,
    },
    {
      title: "Out for Delivery",
      done: ["shipped", "delivered"].includes(order.status),
      icon: <FiTruck />,
    },
    {
      title: "Delivered",
      done: order.isDelivered,
      icon: <FiHome />,
      time: order.deliveredAt,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* ITEMS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                Order #{order._id.slice(-6)}
              </h2>

              <span className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <FiTruck />
                {order.status}
              </span>
            </div>

            <div className="space-y-4">
              {order.orderItems.map((item: any) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-20 bg-amber-50 relative rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>

                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TRACKING */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-6">Order Tracking</h2>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const isActive = step.done && !steps[index + 1]?.done;

                return (
                  <div key={index} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-lg transition-all
                          ${
                            step.done
                              ? "bg-green-500 text-white shadow-lg shadow-green-200"
                              : "bg-gray-200 text-gray-500"
                          }
                          ${isActive ? "ring-4 ring-green-200" : ""}
                        `}
                      >
                        {step.icon}
                      </div>

                      {index !== steps.length - 1 && (
                        <div
                          className={`w-px flex-1 mt-2 ${
                            step.done ? "bg-green-300" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pb-6">
                      <p className="font-semibold text-gray-800">
                        {step.title}
                      </p>

                      {step.time && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <FiClock />
                          {new Date(step.time).toLocaleString("en-IN")}
                        </div>
                      )}

                      {isActive && (
                        <span className="text-xs text-green-600 font-medium">
                          Current status
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-2xl p-6 h-fit shadow-sm">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          {/* EST DELIVERY */}
          <div className="mt-5 bg-gray-50 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-700">Estimated Delivery</p>
            <p className="text-gray-500">
              {new Date(
                new Date(order.createdAt).getTime() + 4 * 24 * 60 * 60 * 1000,
              ).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
