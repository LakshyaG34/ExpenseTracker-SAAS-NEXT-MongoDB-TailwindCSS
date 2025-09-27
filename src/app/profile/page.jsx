"use client"

import React, { useEffect, useState } from "react"

const Profile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await fetch("/api/me")
        if (!res.ok) {
          throw new Error("Error in profile route")
        }
        const temp = await res.json()
        setName(temp.user.name)
        setEmail(temp.user.email)
        setImageUrl(temp.user.profilePic)
      } catch (err) {
        console.log(err)
      }
    }
    handleFetch()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        <img
          src={imageUrl || "/default-avatar.png"}
          alt="Profile Pic"
          className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
        />
        <h1 className="mt-4 text-xl font-semibold text-gray-800">{name}</h1>
        <p className="text-gray-500">{email}</p>

        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            Edit Profile
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
