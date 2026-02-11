"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiPlusCircle,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";

const MenuItem = ({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  active: boolean;
}) => (
  <Link
    href={href}
    className={`
      flex items-center gap-3
      px-4 py-3 rounded-lg
      transition
      ${active ? "bg-[#015f5a] text-white" : "text-gray-700 hover:bg-gray-100"}
    `}
  >
    {icon}
    <span className="text-sm sm:text-base">{label}</span>
  </Link>
);

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-full md:w-64 lg:w-72
        bg-white
        border-b md:border-b-0 md:border-r border-gray-200
        p-4 sm:p-6
      "
    >
      {/* ADMIN INFO */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#015f5a] flex items-center justify-center">
          <FiGrid className="text-white" />
        </div>
        <p className="font-bold text-sm sm:text-base">Admin Panel</p>
      </div>

      {/* MENU */}
      <nav className="space-y-1 sm:space-y-2">
        <MenuItem
          href="/admin"
          icon={<FiGrid />}
          label="Dashboard"
          active={pathname === "/admin"}
        />

        <MenuItem
          href="/admin/orders"
          icon={<FiShoppingCart />}
          label="Orders"
          active={pathname === "/admin/orders"}
        />

        <MenuItem
          href="/admin/users"
          icon={<FiUsers />}
          label="Users"
          active={pathname === "/admin/users"}
        />

        <MenuItem
          href="/admin/products/add"
          icon={<FiPlusCircle />}
          label="Add Product"
          active={pathname === "/admin/products/add"}
        />

        <MenuItem
          href="/admin/list"
          icon={<FiBox />}
          label="Products"
          active={pathname === "/admin/list"}
        />
      </nav>

      {/* LOGOUT */}
      <button
        className="
          mt-6
          flex items-center justify-center gap-2
          border border-[#015f5a]
          text-[#015f5a]
          px-4 py-2 rounded-lg
          w-full
          hover:bg-[#015f5a] hover:text-white
          transition
        "
      >
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}
