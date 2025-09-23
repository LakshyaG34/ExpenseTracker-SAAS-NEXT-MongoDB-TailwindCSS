import {dbConnect} from "../../../lib/db"
import User from "../../../models/User"
import bcrypt from "bcryptjs"

export async function POST(req){
    try{
        await dbConnect();
        const {name, email, password, confirmPassword} = await req.json();
        if (!name || !email || !password || !confirmPassword) {
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        if (password !== confirmPassword) {
        return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400 });
        }
        const user = await User.findOne({email});
        if(user)
        {
            return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
        }
        if(password !== confirmPassword)
        {
            throw new Error("Passwords does not match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password : hashedPassword
        })

        const {password : _, ...newUserWithoutPassword} = newUser.toObject();
        return new Response(JSON.stringify(newUserWithoutPassword), {status : 201});

    }catch(err)
    {
        console.log("Internal Server Error", err);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}