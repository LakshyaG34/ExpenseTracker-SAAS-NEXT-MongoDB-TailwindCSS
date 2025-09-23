"use client";
import React, { useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";

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
      const data = await res.json();
      console.log(data);
      setAmount("");
      setType("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="">
        <form
          onSubmit={sendExp}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="flex flex-row gap-5">
            <button
              type="button"
              onClick={() => setType("expense")}
              className="cursor-pointer border border-white rounded-full px-1 focus:bg-amber-300 active:bg-amber-400"
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className="cursor-pointer border border-white rounded-full px-1 focus:bg-amber-300 active:bg-amber-400"
            >
              Income
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleOpen}
              className="border border-white rounded-full px-1 flex flex-row items-center"
            >
              {categories.find((c) => c._id === categoryId)?.name ||
                "Select Category"}
              <AiFillCaretDown
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <ul>
                {categories.map((category) => (
                  <li
                    key={category._id}
                    onClick={() => {
                      setCategoryId(category._id);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
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
              className="text-center"
            />
          </div>
          <div>
            <input
              placeholder="Total Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-center"
            />
          </div>
          <button type="submit" className="cursor-pointer">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default addExpense;
