"use client";

import { useAuthContext } from "@/app/context/AuthContext";

export default function UsersPage() {
  const { user: currentUser } = useAuthContext();

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">User Details</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* TABLE HEAD */}
          <thead>
            <tr className="border-b text-left text-sm text-gray-600">
              <th className="py-3">Name</th>
              <th>Email</th>

              {/* Desktop only */}
              <th className="hidden md:table-cell">Role</th>
              <th className="hidden md:table-cell">Verified</th>
              <th className="hidden md:table-cell">Joined</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {currentUser ? (
              <tr className="text-sm hover:bg-gray-50">
                {/* NAME */}
                <td className="py-3 font-medium">
                  {currentUser.name || "Guest"}
                </td>

                {/* EMAIL */}
                <td className="break-all">{currentUser.email}</td>

                {/* ROLE (desktop only) */}
                <td className="hidden md:table-cell">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      currentUser.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {currentUser.role || "-"}
                  </span>
                </td>

                {/* VERIFIED (desktop only) */}
                <td className="hidden md:table-cell">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      currentUser.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {currentUser.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </td>

                {/* JOINED (desktop only) */}
                <td className="hidden md:table-cell text-gray-500">
                  {currentUser.createdAt
                    ? new Date(currentUser.createdAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={5} className="text-gray-500 text-center py-6">
                  No user logged in
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
