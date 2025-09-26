"use client"

import React, {useState} from "react"

const Profile = () =>{
    
    const [name, setName] = useState("");
    const handleFetch = async() =>{
        const res = await fetch("/api/me");
        const temp = await res.json();
    }
    return(
        <div>
            This is Profile Page
        </div>
    )
}

export default Profile;

