"use client";
import React, { useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import toast from "react-hot-toast";

const addExpense = () => {
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const resUser = await fetch("/api/me");
        const resCategory = await fetch("/api/category");
        const userJson = await resUser.json();
        const categoryJson = await resCategory.json();
        if (userJson.isLoggedIn) {
          setUserId(userJson.user.id);
          setCategories(categoryJson);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleFetch();
  }, []);
  const sendExp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          amount: Number(amount),
          type,
          description,
          categoryId,
        }),
      });
      if (!res.ok) {
        throw new Error("Error in response");
      }
      toast.success("Expense Added Successfully!!!!")
      const data = await res.json();
      console.log(data);
      setAmount("");
      setType("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <form
          onSubmit={sendExp}
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`px-4 py-2 rounded-full border transition ${
              type === "expense"
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={`px-4 py-2 rounded-full border transition ${
              type === "income"
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            >
              Income
            </button>
          </div>
          <div className = "relative">
            <button
              type="button"
              onClick={handleOpen}
              className="w-full flex justify-between items-center px-4 py-2 border boder-gray-300 rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100"
            >
              {categories.find((c) => c._id === categoryId)?.name ||
                "Select Category"}
              <AiFillCaretDown
                className={`ml-2 transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                } cursor-pointer`}
              />
            </button>

            {open && (
              <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    onClick={() => {
                      setCategoryId(category._id);
                      setOpen(false);
                    }}
                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-purple-100 transition"
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <input
              value={description}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-700"
            />
          </div>
          <div>
            <input
              placeholder="Total Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-700"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium shadow-md cursor-pointer">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default addExpense;
