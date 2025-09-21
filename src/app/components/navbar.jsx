"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    logout();
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <div className="mt-2">
        <div className="hidden md:flex flex-row justify-between">
        {!isLoggedIn ? (
            <>
            <Link href="/">Navbar</Link>
            <div className="flex flex-row items-center gap-2">
                <Link href="/signup" className="border rounded-full px-1">SIGN-UP</Link>
                <Link href="/signin" className="border rounded-full px-1">SIGN-IN</Link>
            </div>
            </>
        ) : (
            <>
            <button onClick={handleLogout} className="cursor-pointer">
                LogOut
            </button>
            </>
        )}
        </div>
        <div className="md:hidden flex flex-row justify-between">
            {!isLoggedIn ? (
            <>
                <Link href="/">Navbar</Link>
                <div className="flex flex-row items-center gap-2">
                    <button onClick = {handleOpen}>
                    {
                        !isOpen ? <FiMenu/> : 
                        <div className="flex flex-col gap-4">
                            <Link href="#" className="border rounded-xl">Signup</Link>
                            <Link href="#" className="border rounded-xl">Signin</Link>
                        </div>
                    }
                    </button>
                </div>
            </>
            ) : (
            <>
                <button onClick={handleLogout} className="cursor-pointer">
                    LogOut
                </button>
            </>
            )}
        </div>
    </div>
  );
};

export default Navbar;
