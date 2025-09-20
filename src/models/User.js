import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }
    
}, {Timestamp : true})

export default mongoose.models.User || mongoose.model("User", userSchema);