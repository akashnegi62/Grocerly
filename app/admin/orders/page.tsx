/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import { FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa";

interface Order {
  _id: string;
  user: {
    email: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">Orders</h1>
      <p className="text-gray-500 mb-6">All placed orders appear here</p>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* TABLE HEAD */}
            <thead>
              <tr className="border-b text-left text-sm text-gray-600">
                <th className="py-3">Order ID</th>
                <th>User</th>
                <th>Total</th>

                {/* Desktop only */}
                <th className="hidden md:table-cell">Status</th>
                <th className="hidden md:table-cell">Date</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b text-sm hover:bg-gray-50"
                >
                  {/* ORDER ID */}
                  <td className="py-3 font-medium">#{order._id.slice(-6)}</td>

                  {/* USER */}
                  <td className="break-all">{order.user?.email || "Guest"}</td>

                  {/* TOTAL */}
                  <td className="font-semibold text-[#015f5a]">
                    ₹{order.totalAmount}
                  </td>

                  {/* STATUS (desktop only) */}
                  <td className="hidden md:table-cell">
                    <span className="inline-flex items-center text-lg">
                      {order.status === "delivered" && (
                        <FaCheckCircle
                          className="text-green-600"
                          title="Delivered"
                        />
                      )}

                      {order.status === "pending" && (
                        <FaClock className="text-blue-600" title="Pending" />
                      )}

                      {order.status !== "delivered" &&
                        order.status !== "pending" && (
                          <FaExclamationCircle
                            className="text-yellow-600"
                            title={order.status}
                          />
                        )}
                    </span>
                  </td>

                  {/* DATE (desktop only) */}
                  <td className="hidden md:table-cell text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
