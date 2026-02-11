/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  FiBox,
  FiHeadphones,
  FiMapPin,
  FiUser,
  FiLogOut,
  FiCheckCircle,
  FiChevronRight,
  FiHome,
  FiDelete,
} from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/hooks/useAuth";
import AddAddressModal from "@/app/components/AddAddressModal";

import api from "@/app/lib/axios";

/* PAGE */

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState<
    "orders" | "support" | "address" | "profile"
  >("orders");
  const [orders, setOrders] = useState<any[]>([]);

  /* FETCH ORDERS */
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/my");
        setOrders(res.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchOrders();
  }, [user]);

  const handleLogout = () => {
    logout(); // clear auth state
    router.push("/"); // redirect to home
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 lg:pt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* SIDEBAR */}
        <aside className="md:w-72 w-full bg-white p-6 md:rounded-l-3xl border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-[#015f5a] flex items-center justify-center">
              <FiUser className="text-white" />
            </div>
            <div>
              <p className="font-bold">{user?.name || "Guest"}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <MenuItem
              icon={<FiBox />}
              label="Orders"
              active={active === "orders"}
              onClick={() => setActive("orders")}
            />
            <MenuItem
              icon={<FiHeadphones />}
              label="Support"
              active={active === "support"}
              onClick={() => setActive("support")}
            />
            <MenuItem
              icon={<FiMapPin />}
              label="Addresses"
              active={active === "address"}
              onClick={() => setActive("address")}
            />
            <MenuItem
              icon={<FiUser />}
              label="Profile"
              active={active === "profile"}
              onClick={() => setActive("profile")}
            />
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-2 border border-[#015f5a] text-[#015f5a] px-4 py-2 rounded-lg w-full"
          >
            <FiLogOut /> Log Out
          </button>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 bg-gray-50 p-8 lg:p-4 md:p-8 md:rounded-r-3xl h-[70vh]">
          {active === "orders" && <Orders orders={orders} />}
          {active === "address" && <Addresses />}
          {active === "profile" && <ProfileSection user={user} />}
          {active === "support" && <Placeholder title="Customer Support" />}
        </main>
      </div>
    </div>
  );
}

/* MENU ITEM */

function MenuItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
        active ? "bg-gray-100 font-semibold" : "text-gray-600"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

/* ORDERS */

function Orders({ orders }: { orders: any[] }) {
  const router = useRouter();
  if (orders.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No orders yet</p>;
  }

  return (
    <div className="h-full overflow-y-auto space-y-4 pr-2">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-12 h-12">
              {order.orderItems.slice(0, 10).map((item: any) => (
                <Image
                  height={15}
                  width={50}
                  key={item._id}
                  src={item.image}
                  alt={item.name}
                  className="rounded-xl object-cover"
                />
              ))}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">Order delivered</p>
                <FiCheckCircle className="text-green-500" />
              </div>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="font-bold text-lg">₹{order.totalAmount}</p>
            <div className="relative group inline-flex">
              <FiChevronRight
                onClick={() => router.push(`/tracking/${order._id}`)}
                className="text-xl text-gray-400 cursor-pointer transition-colors duration-200 group-hover:text-[#015f5a]"
              />

              {/* INVISIBLE POPUP */}
              <span
                className="
      absolute -right-6 -top-5 -translate-y-1/2
      whitespace-nowrap
      bg-gray-900 text-white text-xs px-2 py-1 rounded-md
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      pointer-events-none
    "
              >
                Track Order
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ADDRESSES */

function Addresses() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Fetch all addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/users/addresses");
      setAddresses(res.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  // Delete an address
  const deleteAddress = async (id: string) => {
    try {
      await api.delete(`/api/users/addresses/${id}`);

      toast.success("Address deleted");
      fetchAddresses(); // refresh list
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      <div
        onClick={() => {
          setEditAddress(null);
          setShowAddAddress(true);
        }}
        className="bg-white rounded-2xl p-4 cursor-pointer font-semibold text-[#015f5b]"
      >
        + Add New Address
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {!loading &&
        addresses.map((address) => (
          <div
            key={address._id}
            className="flex justify-between bg-white rounded-2xl px-8 py-4"
          >
            <div className="flex items-center gap-2">
              <FiHome />
              <p className="font-semibold">{address.label}</p>
              <p className="text-sm text-gray-600">{address.address}</p>
            </div>

            <div className="flex gap-4">
              <FaRegEdit
                className="cursor-pointer"
                onClick={() => {
                  setEditAddress(address);
                  setShowAddAddress(true);
                }}
              />
              <FiDelete
                className="cursor-pointer"
                onClick={() => deleteAddress(address._id)}
              />
            </div>
          </div>
        ))}

      {showAddAddress && (
        <AddAddressModal
          editAddress={editAddress}
          onClose={() => {
            setShowAddAddress(false);
            setEditAddress(null);
            fetchAddresses();
          }}
        />
      )}
    </div>
  );
}

/*
   PROFILE */

function ProfileSection({ user }: { user: any }) {
  const { setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Save profile changes
  const saveProfile = async () => {
    try {
      const res = await api.put("/api/users/profile", {
        name,
        phone,
      });
      setUser(res.data);

      toast.success("Profile updated");
      console.log(user);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-6">Profile</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mb-4"
        placeholder="Username"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mb-6"
        placeholder="Mobile number"
      />

      <button
        onClick={saveProfile}
        className="w-full bg-[#015f5a] text-white py-3 rounded-xl font-semibold"
      >
        Update Profile
      </button>
    </div>
  );
}

/*
   PLACEHOLDER */

function Placeholder({ title }: { title: string }) {
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
      {title} coming soon
    </div>
  );
}
