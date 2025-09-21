import mongoose from "mongoose"

const expenseSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    amount :{
        type : Number,
        required : true
    },
    type:{
        type : String,
        enum : ["income", "expense"],
        required : true
    },
    category:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    description : {
        type : String
    },
    date:{
        type : Date,
        default : Date.now
    },
},{timestamps : true})

export default mongoose.models.Expense || mongoose.model("Expense", expenseSchema);