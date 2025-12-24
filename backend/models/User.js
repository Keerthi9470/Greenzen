const mongoose=require("mongoose")
const bcrypt = require("bcryptjs");

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


//pre-save hook to bcrypt password
// Remove "next" from the arguments
userSchema.pre("save", async function () { 
    // "this" still refers to the user document
    if (!this.isModified("password")) {
        return; // Just return, no next() needed
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // No next() call here
    } catch (err) {
        throw new Error(err); // Throwing an error stops the save process
    }
});

const User=mongoose.model("User",userSchema)
module.exports=User