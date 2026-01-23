import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const { token } = useAuthContext();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  /* FETCH ADDRESSES ON LOGIN / REFRESH */
  useEffect(() => {
    if (!token) return;

    fetch("/api/users/addresses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data);
        if (data.length > 0) setSelectedAddress(data[0]);
      })
      .catch(console.error);
  }, [token]);

  /* ADD ADDRESS */
  const addAddress = async (newAddress) => {
    const res = await fetch("/api/users/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAddress),
    });

    const data = await res.json();
    setAddresses(data);
    setSelectedAddress(data[data.length - 1]);
  };

  return (
    <AddressContext.Provider
      value={{ addresses, selectedAddress, setSelectedAddress, addAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAddress = () => useContext(AddressContext);
