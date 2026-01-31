/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  FiBox,
  FiHeadphones,
  FiMapPin,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import AddAddressModal from "../components/AddAddressModal";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState("orders");
  const [orders, setOrders] = useState([]);

  /* FETCH ORDERS */
  useEffect(() => {
    if (!user) return;

    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/orders/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-gray-100 pt-20">
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
            onClick={logout}
            className="mt-6 flex items-center gap-2 border border-[#015f5a] text-[#015f5a] px-4 py-2 rounded-lg w-full cursor-pointer"
          >
            <FiLogOut /> Log Out
          </button>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 bg-gray-50 p-4 md:p-8 md:rounded-r-3xl h-[70vh]">
          {active === "orders" && <Orders orders={orders} />}
          {active === "address" && <Addresses />}
          {active === "profile" && <ProfileSection user={user} />}
          {active === "support" && <Placeholder title="Customer Support" />}
        </main>
      </div>
    </div>
  );
}

/* COMPONENTS */

function MenuItem({ icon, label, active, onClick }) {
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

function Orders({ orders }) {
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
          {/* LEFT SIDE */}
          <div className="flex flex-col items-start gap-4">
            {/* PRODUCT IMAGES */}
            <div className="flex -space-x-2">
              {order.orderItems.slice(0, 10).map((item) => (
                <img
                  key={item._id}
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-white cursor-pointer"
                />
              ))}
            </div>

            {/* ORDER INFO */}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-base">Order delivered</p>
                <FiCheckCircle className="text-green-500" />
              </div>

              <p className="text-sm text-gray-500">
                Placed at{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 cursor-pointer">
            <p className="font-bold text-lg">₹{order.totalAmount}</p>
            <FiChevronRight className="text-xl text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ADDRESSES */

function Addresses() {
  const { token } = useAuthContext();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  /* FETCH ADDRESSES */
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/users/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAddresses(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  /* DELETE ADDRESS */
  const deleteAddress = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/users/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      {/* ADD NEW ADDRESS */}
      <div
        onClick={() => {
          setEditAddress(null);
          setShowAddAddress(true);
        }}
        className="bg-white rounded-2xl p-4 flex justify-between cursor-pointer"
      >
        <span className="text-[#015f5b] font-semibold">
          + &nbsp; Add New Address
        </span>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading addresses...</p>
      )}

      {/* ADDRESS LIST */}
      {!loading &&
        addresses.map((address) => (
          <div
            key={address._id}
            className="flex justify-between items-baseline bg-white rounded-2xl px-8 py-4 space-y-2"
          >
            {/* ADDRESS */}
            <div className="flex items-center gap-2">
              <FiHome className="text-gray-600" />
              <p className="font-semibold">{address.label}</p>
              <p className="text-sm text-gray-600">{address.address}</p>
            </div>

            {/* Button */}

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => {
                  setEditAddress(address);
                  setShowAddAddress(true);
                }}
                className="flex items-center gap-1 text-lg text-gray-600 cursor-pointer"
              >
                <FaRegEdit />
              </button>

              <button
                onClick={() => deleteAddress(address._id)}
                className="flex items-center gap-1 text-lg text-gray-600 cursor-pointer"
              >
                <FiDelete />
              </button>
            </div>
          </div>
        ))}

      {/* ADD / EDIT MODAL */}
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

/* PROFILE */

function ProfileSection({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
      });

      const updatedUser = await res.json();

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");
      // reload the page
      window.location.reload();
    } catch (err) {
      console.error(err);
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

/* PLACEHOLDER */

function Placeholder({ title }) {
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
      {title} coming soon
    </div>
  );
}
