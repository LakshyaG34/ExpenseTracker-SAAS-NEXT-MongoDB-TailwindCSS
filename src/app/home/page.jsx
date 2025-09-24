"use client";
import React, { useState, useEffect } from "react";
import ExpenseCard from "../components/expenseCard";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [expense, setExpense] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const resUser = await fetch("/api/me");
        const resCategory = await fetch("/api/category");
        const userJson = await resUser.json();
        const categoryJson = await resCategory.json();
        if (userJson.isLoggedIn) {
          setUser(userJson.user);
          setUserId(userJson.user.id);
          setCategoryId(categoryJson[0]._id);
          const resExp = await fetch(
            `/api/expenses?userId=${userJson.user.id}`
          );
          const expJson = await resExp.json();
          setExpense(expJson);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleFetch();
  }, []);
  return (
    <div>
      <span>Welcome, {user?.name}!!!</span>
      <div>Total number of expenses :- {expense.length}</div>
      <div className="flex flex-col justify-center items-center gap-2">
        {expense.length > 0 ? (
          expense.map((exp) => (
            <ExpenseCard
              key={exp.id}
              amount={exp.amount}
              type={exp.type}
              date={exp.date}
              category={exp.category.name}
            />
          ))
        ) : (
          <p>No Expenses</p>
        )}
      </div>
    </div>
  );
};
export default Home;
