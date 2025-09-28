"use client"

import React, {useState} from "react";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";

const Signin = () =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await fetch("/api/signin",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({email, password}),
                credentials : "include"
            })
            if(!res.ok)
            {
                throw new Error("Cannot fetch");
            }
            toast.success("Signed In successfully")
            login();
            const data = await res.json();
            console.log(data);
            return data;
        }catch(err)
        {
            console.log(err);
        }
    }
    return(
        <form onSubmit = {handleSubmit} className="bg-white text-black flex flex-col justify-center items-center min-h-screen gap-4">
            <input value={email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} className="text-gray-400 border border-red-500 rounded-xl p-2"/>
            <input value={password} placeholder="Enter PW" onChange={(e)=>setPassword(e.target.value)} className="text-gray-400 border border-red-500 rounded-xl p-2"/>
            <button className="cursor-pointer border border-green-400 rounded-full p-2 focus:outline-none focus:ring-red-200">Submit</button>
        </form>
    )
}

export default Signin;