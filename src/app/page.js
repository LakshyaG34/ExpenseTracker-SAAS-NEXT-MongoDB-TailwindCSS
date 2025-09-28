"use client";
import { useAuth } from "../context/authContext";
import Dashboard from "./components/dashboard";
import Link from "next/link";

export default function Home() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Dashboard />;
  }
  return (
    <div className="bg-white flex flex-col items-center justify-items-center min-h-screen p-8 sm:p-20 gap-8">
      <h1 className="text-green-600 font-extrabold text-2xl sm:text-3xl text-center">
        Welcome to Lakshya&apos;s Expense Tracker!
      </h1>

      <div className="flex flex-row items-center gap-4">
        <p className="text-gray-700 text-lg">
          Let&apos;s start tracking your expenses:
        </p>
        <Link
          href="/signup"
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Sign Up
        </Link>
      </div>

      <div className="flex flex-row items-center gap-4">
        <p className="text-gray-700 text-lg">Already have an account?</p>
        <Link
          href="/signin"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
