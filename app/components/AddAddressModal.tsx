/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { useAuthContext } from "@/app/context/AuthContext";

type Address = {
  _id: string;
  label: string;
  address: string;
};

type Props = {
  onClose: () => void;
  editAddress?: Address | null;
};

export default function AddAddressModal({ onClose, editAddress }: Props) {
  const { token } = useAuthContext();

  const [label, setLabel] = useState("Home");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  /* PREFILL WHEN EDIT */
  useEffect(() => {
    if (editAddress) {
      setLabel(editAddress.label);
      setAddress(editAddress.address);
    }
  }, [editAddress]);

  const handleSave = async () => {
    if (!address.trim()) return;

    try {
      setLoading(true);

      await axios({
        url: editAddress
          ? `/api/users/addresses/${editAddress._id}`
          : `/api/users/addresses`,
        method: editAddress ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { label, address },
      });

      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Failed to save address:", err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white h-[50vh] w-90 lg:w-110 rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <FiX />
        </button>

        <h2 className="text-lg font-bold mb-4">
          {editAddress ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Address label (Home / Work)"
            className="w-full border rounded-xl px-4 py-3"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <textarea
            placeholder="Enter full address"
            rows={3}
            className="w-full border rounded-xl px-4 py-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#015f5a] text-white py-4 rounded-xl font-semibold cursor-pointer"
          >
            {loading
              ? "Saving..."
              : editAddress
                ? "Update Address"
                : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
}
