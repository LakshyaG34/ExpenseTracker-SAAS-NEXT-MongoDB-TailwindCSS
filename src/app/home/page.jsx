"use client"
import React, {useState, useEffect} from "react"
import ExpenseCard from "../components/expenseCard";

const Home = () =>{

    const [user, setUser] = useState(null);
    const [expense, setExpense] = useState([]);
    useEffect(()=>{
        const handleFetch = async() =>{
            try{
                const resUser = await fetch("/api/me");
                const userJson = await resUser.json();
                if(userJson.isLoggedIn)
                {
                    setUser(userJson.user);
                    const resExp = await fetch(`/api/expenses?userId=${userJson.user.id}`);
                    const expJson = await resExp.json();
                    setExpense(expJson);
                }
            }catch(err)
            {
                console.log(err);
            }
        }
        handleFetch();
    },[]);
    return(
        <div>
            <span>Welcome, {user?.name}!!!</span>
            <div>
                {
                    expense.length > 0 ? (
                        expense.map((exp)=>(
                            <ExpenseCard key = {exp.id} amount = {exp.amount}/>
                        ))
                    ) : 
                    <p>No Expenses</p>
                }
            </div>
        </div>
    )
}
export default Home;