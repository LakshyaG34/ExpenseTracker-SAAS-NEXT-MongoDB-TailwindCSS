import React from "react"
import Link from "next/link"
import { BiPlusCircle } from "react-icons/bi";

const Dashboard = () =>{
    return(
        <div className = "flex justify-center items-center">
            <div>
                <Link href = "/home">HOME</Link>
            </div>
            <div>
                <Link href="/add"><BiPlusCircle/></Link>
            </div>
            <div>
                <Link href="/home">HOME</Link>
            </div>
        </div>
    )
}
export default Dashboard;