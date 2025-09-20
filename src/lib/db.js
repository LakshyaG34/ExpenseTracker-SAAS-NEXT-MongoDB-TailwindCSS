import mongoose from "mongoose";

export const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    }catch(err)
    {
        console.log("Cannot connect to DB", err);
    }
}