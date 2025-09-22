"use client"
import React, {useState, useEffect} from "react"
import ExpenseCard from "../components/expenseCard";

const Home = () =>{

    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [expense, setExpense] = useState([]);
    useEffect(()=>{
        const handleFetch = async() =>{
            try{
                const resUser = await fetch("/api/me");
                const userJson = await resUser.json();
                if(userJson.isLoggedIn)
                {
                    setUser(userJson.user);
                    setUserId(userJson.user.id);
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
    const sendExp = async(e) =>{
                e.preventDefault();
                try{
                    const res = await fetch("/api/expenses",{
                        method : "POST",
                        headers : {
                            "Content-type" : "application/json"
                        },
                        credentials : true,
                        body : JSON.stringify(userId, amount, type)
                    });
                    if(!res.ok)
                    {
                        throw new Error("Error in response");
                    }
                    const data = await res.json();
                    console.log(data);
                }catch(err)
                {
                    console.log(err);
                }
            }
    return(
        <div>
            <span>Welcome, {user?.name}!!!</span>
            <div>
                {
                    expense.length > 0 ? (
                        expense.map((exp)=>(
                            <ExpenseCard key = {exp.id} amount = {exp.amount} type = {exp.type} date={exp.date}/>
                        ))
                    ) : 
                    <p>No Expenses</p>
                }
            </div>
            <div>
                <span>Add Expense</span>
                <form onSubmit={sendExp}>
                    <input value = {amount} placeholder="Add amount" onChange={(e) => setAmount(e.target.value)}/>
                    <input value = {type} placeholder="Add Type" onChange={(e) => setType(e.target.value)}/>
                    <button type="submit" className="cursor-pointer focus:outline-none focus:ring-pink-400">Add</button>
                </form>
            </div>
        </div>
    )
}
export default Home;