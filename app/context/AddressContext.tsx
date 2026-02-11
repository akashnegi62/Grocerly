"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuthContext } from "@/app/context/AuthContext";

/* Address Type */
export interface Address {
  _id: string;
  label: string;
  address: string;
}

/* Context Type */
interface AddressContextType {
  addresses: Address[];
  selectedAddress: Address | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}

/* Create Context */
const AddressContext = createContext<AddressContextType | null>(null);

/* Provider */
export function AddressProvider({ children }: { children: ReactNode }) {
  const { token } = useAuthContext();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchAddresses = async () => {
      const res = await axios.get<Address[]>("/api/users/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses(res.data);

      if (res.data.length > 0) {
        setSelectedAddress(res.data[0]);
      }
    };

    fetchAddresses().catch(console.error);
  }, [token]);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

/* Custom Hook */
export const useAddress = () => {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used within AddressProvider");
  }

  return context;
};
