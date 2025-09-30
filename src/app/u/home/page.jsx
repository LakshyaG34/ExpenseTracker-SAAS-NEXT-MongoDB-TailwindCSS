"use client";

import React, { useState, useEffect } from "react";
import ExpenseCard from "../../components/expenseCard";
import {useSelector} from "react-redux"

const Home = () => {
  const [user, setUser] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const expenses = useSelector((state) => state.expenses.list);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await fetch("/api/me");
        const userJson = await resUser.json();

        if (!userJson.isLoggedIn) {
          setError("User not logged in");
          setLoading(false);
          return;
        }
        setUser(userJson.user);

        const resCategory = await fetch("/api/category");
        const categoryJson = await resCategory.json();
        if (categoryJson.length > 0) {
          setCategoryId(categoryJson[0]._id);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading your expenses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Total number of expenses:{" "}
          <span className="font-semibold">{expenses.length}</span>
        </p>

        <div className="flex flex-col gap-4">
          {expenses.length > 0 ? (
            expenses.map((exp) => (
              <ExpenseCard
                key={exp._id}
                amount={exp.amount}
                type={exp.type}
                date={new Date(exp.date).toLocaleDateString()}
                category={exp.category?.name || "Uncategorized"}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No expenses recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
