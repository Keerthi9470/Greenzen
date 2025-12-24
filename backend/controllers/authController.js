const User=require("../models/User.js")
const bcrypt=require("bcryptjs")

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    // Security: If the UI tries to send 'admin', force it back to 'user'
    // This way, ONLY manual database edits can create an admin.
    const finalRole = (role === 'admin') ? 'user' : role;

    try {
        const user = await User.create({
            username,
            email,
            password, // Remember to hash this using bcrypt before saving!
            role: finalRole 
        });

        res.status(201).json({
            message: "Success",
            user: { id: user._id, role: user.role }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser=async(req,res)=>{
    const {usernameOrEmail,password}=req.body;
    try
    {
        const user=await User.findOne({$or:[{username:usernameOrEmail},{email:usernameOrEmail}]})
        if(!user)
        {
            res.status(404).json({message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            res.status(401).json({message:"Password is incorrect"})
        }

        res.status(200).json({success:true , message:`login successful`});

    }
    catch(error)
    {
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

module.exports={registerUser,loginUser};