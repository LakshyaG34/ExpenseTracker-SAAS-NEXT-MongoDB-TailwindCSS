import Category from "../../../models/Category";
import { dbConnect } from "../../../lib/db";

export async function POST(req){
    try{
        await dbConnect();
        const {name, color} = await req.json();
        if(!name || !color)
        {
            return new Response(JSON.stringify({error : "Missing Fields in Category"}), {status : 400});
        }
        const newCategory = await Category.create({
            name,
            color
        });
        return new Response(JSON.stringify(newCategory), {status : 200});
    }catch(err)
    {
        return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        });
    }
}

export async function GET(){
    try{
        await dbConnect();
        const categories = await Category.find().sort({name : 1});
        return new Response(JSON.stringify(categories), { status: 200 });
    }catch(err)
    {
        return new Response(JSON.stringify({err : err.message}), {status : 500});
    }
}