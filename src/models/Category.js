import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    color : {
        type : String,
    },
    // user : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "User",
    // }
}, {Timestamp : true});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);