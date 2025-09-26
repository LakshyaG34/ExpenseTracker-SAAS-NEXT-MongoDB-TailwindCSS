"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../context/authContext";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [imgUrl, setImgUrl] = useState("");
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    logout();
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  useEffect(() => {
    const handlePic = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) {
          throw new Error("Invalid response");
        }
        const temp = await res.json();
        setImgUrl(temp.user.profilePic);
      } catch (err) {
        console.log(err);
      }
    };
    handlePic();
  }, []);

  return (
    <div className="mt-2">
      <div className="hidden md:flex flex-row justify-between">
        {!isLoggedIn ? (
          <>
            <Link href="/">Navbar</Link>
            <div className="flex flex-row items-center gap-2">
              <Link href="/signup" className="border rounded-full px-1">
                SIGN-UP
              </Link>
              <Link href="/signin" className="border rounded-full px-1">
                SIGN-IN
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link href="/">Navbar</Link>
            <div className = "flex flex-row items-center gap-4 px-2 py-1">
              <button onClick={handleLogout} className="cursor-pointer">
                LogOut
              </button>
              <Link href="/profile">
                <img
                    src={imgUrl || "/default-avatar.png"} // fallback avatar
                    alt="Profile Picture"
                    className="w-8 h-8 rounded-full object-cover" // size + rounded
                />
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="md:hidden flex flex-row justify-between">
        {!isLoggedIn ? (
          <>
            <Link href="/">Navbar</Link>
            <div className="flex flex-row items-center gap-2">
              <button onClick={handleOpen}>
                {!isOpen ? (
                  <FiMenu />
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link href="#" className="border rounded-xl">
                      Signup
                    </Link>
                    <Link href="#" className="border rounded-xl">
                      Signin
                    </Link>
                  </div>
                )}
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
