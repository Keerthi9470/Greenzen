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
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return next();
    }

    try {
        // Generate a salt (extra randomness)
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User=mongoose.model("User",userSchema)
module.exports=User