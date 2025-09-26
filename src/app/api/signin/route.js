import User from "../../../models/User"
import { dbConnect } from "../../../lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req){
    try{
        await dbConnect();
        const {email, password} = await req.json();
        if(!email || !password)
        {
            return new Response(JSON.stringify({error : "Missing Fields"}), {status : 400})
        }
        const user = await User.findOne({email});
        if(!user)
        {
            return new Response(JSON.stringify({error : "No such user exists"}), {status : 400});
        }
        const comparePw = await bcrypt.compare(password, user.password);
        if(!comparePw)
        {
            return new Response(JSON.stringify({error : "Wrong Passwords"}), {status : 400});
        }

        const token = jwt.sign({id : user._id, email : user.email, name : user.name, profilePic : user.profilePic}, process.env.JWT_SECRET, {
            expiresIn : "7d"
        });


        return new Response(JSON.stringify({Message : "Logged In successfully"}), {status : 200,
            headers : {
                "Content-Type" : "application/json",
                "Set-Cookie" : `token=${token}; HttpOnly; Path=/; Max-Age-${7*24*60*60}`
            }
        });

    }catch(err)
    {
        return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        });
    }
}