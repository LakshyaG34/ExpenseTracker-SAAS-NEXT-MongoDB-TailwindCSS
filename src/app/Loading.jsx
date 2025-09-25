"use client"
import React,{useEffect} from "react"
import { useRouter } from "next/navigation"

const Loading = () =>{
    const router = useRouter();

    useEffect(()=>{
        const timer = setTimeout(() => {
            router.push("/home")
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);
    return(
        <div>
            Loading...
        </div>
    )
}

export default Loading;