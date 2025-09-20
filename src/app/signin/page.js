"use client"

import React, {useState} from "react";
import { useAuth } from "@/context/authContext";

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
        <div>
            <form onSubmit = {handleSubmit}>
                <input value={email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input value={password} placeholder="Enter PW" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="cursor-pointer focus:outline-none focus:ring-red-200">Submit</button>
            </form>
        </div>
    )
}

export default Signin;