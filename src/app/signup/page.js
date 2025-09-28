"use client"

import React, {useState} from "react"
import toast from "react-hot-toast";

const Signup = () =>
{
    const [form, setForm] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("confirmPassword", form.confirmPassword);

        if(file)
        {
            formData.append("profilePic", file);
        }

        const res = await fetch("/api/signup",{
            method : "POST",
            body : formData
        })
        if(res.ok)
        {
            return toast.success("Signed Up successfully")
        }

        const data = await res.json();
        console.log(data);
    }

    return(
        <form onSubmit = {handleSubmit} className="bg-white text-black flex flex-col justify-center items-center min-h-screen gap-4">
            <input
            type="text"
            className="text-gray-400 border border-red-500 rounded-xl p-2"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            />
            <input
                type="email"
                className="text-gray-400 border border-red-500 rounded-xl p-2"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                className="text-gray-400 border border-red-500 rounded-xl p-2"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                className="text-gray-400 border border-red-500 rounded-xl p-2"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
            />

            <input
                type="file"
                className="text-gray-400 border border-red-500 rounded-xl p-2"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button type="submit" className="cursor-pointer border border-green-400 rounded-full p-2 focus:outline-none focus:ring-red-200">Sign Up</button>
        </form>
    )
}

export default Signup;