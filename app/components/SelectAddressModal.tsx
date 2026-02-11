"use client";

import { FiX, FiHome, FiPlus } from "react-icons/fi";
import { useAddress } from "../context/AddressContext";

interface SelectAddressModalProps {
  onAddNew: () => void;
  onClose: () => void;
}

export default function SelectAddressModal({
  onAddNew,
  onClose,
}: SelectAddressModalProps) {
  const { addresses, setSelectedAddress } = useAddress();

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white h-[45vh] w-90 lg:w-110 rounded-2xl p-6 relative overflow-y-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <FiX />
        </button>

        <h2 className="text-lg font-bold mb-4">Select an Address</h2>

        {/* ADD NEW ADDRESS */}
        <button
          onClick={onAddNew}
          className="w-full border border-[#015f5a] rounded-xl px-4 py-4 flex items-center gap-3 font-semibold cursor-pointer hover:bg-[#f0fdf4]"
        >
          <FiPlus /> Add New Address
        </button>

        {/* SAVED ADDRESSES */}
        <p className="mt-6 mb-2 font-semibold text-sm text-gray-600">
          SAVED ADDRESSES
        </p>

        <div className="space-y-3">
          {addresses.length === 0 && (
            <p className="text-gray-400 text-sm">No saved addresses</p>
          )}

          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => {
                setSelectedAddress(addr);
                onClose();
              }}
              className="border rounded-xl p-4 flex gap-3 cursor-pointer hover:border-[#015f5a] transition"
            >
              <FiHome className="text-xl mt-1" />

              <div>
                <p className="font-semibold">{addr.label}</p>
                <p className="text-sm text-gray-600 truncate">{addr.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
