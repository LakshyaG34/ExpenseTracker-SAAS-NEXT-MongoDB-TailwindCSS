"use client"

import React, {useState} from "react"
import Link from "next/link"
import { useAuth } from "@/context/authContext"


const Navbar = () =>{
    const {isLoggedIn, logout} = useAuth(); 
    const handleLogout = async() =>{
        await fetch("/api/logout", {
            method : "POST"
        })
        logout();
    }
    return(
        <div className="flex flex-row justify-between">
            {!isLoggedIn ? (
                <>
            <Link href="#">Navbar</Link>
            <div>
                <Link href="#">SIGN-UP</Link>
                <Link href="#">SIGN-IN</Link>
            </div></>) : (
                <>
                <button onClick = {handleLogout} className="cursor-pointer">LogOut</button>
                </>
            )}
        </div>
    )
}

export default Navbar;