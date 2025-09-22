import Expense from "@/models/Expense";
import { dbConnect } from "@/lib/db";

export async function POST(req){
    try{
        await dbConnect();
        const { userId, amount, type, category, description, date } = await req.json();

        if(!userId || !amount || !type)
        {
            return new Response(
                JSON.stringify({error : "Missing fields"}),
                {status : 200}
            )
        }
        const newExpense = await Expense.create({
            user : userId,
            amount,
            type,
            category,
            description,
            date : date || Date.now(),
        })

        return new Response(JSON.stringify(newExpense), {status : 201});
    }catch(err)
    {
        console.error("Expense POST error:", err);
        return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
    }
}

export async function GET(req){
    try{
        await dbConnect();

        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");

        if(!userId)
        {
            return new Response(
                JSON.stringify({ error: "userId query parameter is required" }),
                { status: 400 }
            );
        }
        const expenses = await Expense.find({user : userId}).populate("user", "name email").populate("category").sort({date : -1});

        return new Response(JSON.stringify(expenses), {status : 200});
    }catch(err)
    {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}