"use client"

import React, {useState} from "react"

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

        const data = await res.json();
        console.log(data);
    }

    return(
        <form onSubmit = {handleSubmit}>
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
            />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button type="submit">Sign Up</button>
        </form>
    )
}

export default Signup;