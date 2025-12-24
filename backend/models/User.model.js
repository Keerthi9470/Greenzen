const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "seller", "admin"], // Only these 3 values are allowed
        default: "user" // If nothing is sent, they become a regular user
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)
module.exports=User