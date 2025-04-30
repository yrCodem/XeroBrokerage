"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out Successfully", {
      position: "bottom-right",
    });
    router.push("/");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Logged out...", {
        position: "bottom-right",
      });
      router.push("/Auth/login");
    }
  }, []);

  if (!isAuthenticated) return null; // Prevents flicker/render during redirect

  return (
    <div className="p-4 text-3xl">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 px-4 rounded-2xl poppins-bold mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Page;
