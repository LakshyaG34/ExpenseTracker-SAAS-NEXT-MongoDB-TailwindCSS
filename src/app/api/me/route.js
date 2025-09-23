import jwt from "jsonwebtoken"
import {cookies} from "next/headers"

export async function GET(){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if(!token)
        {
            return new Response(JSON.stringify({isLoggedIn : false}), {status:200})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await User.findById(decoded.id).select("name email");
        return new Response(JSON.stringify({isLoggedIn : true, user : decoded}), {status : 200});
    }catch(err)
    {
        return new Response(JSON.stringify({ isLoggedIn: false }), { status: 200 });
    }
}