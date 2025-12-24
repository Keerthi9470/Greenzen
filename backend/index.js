const express=require('express')
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const authRoutes=require("./routes/authRoutes.js")

dotenv.config()

const app=express()

//middleware
app.use(express.json())

app.use("/api/auth",authRoutes)

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Greenzen database connected ${conn.connection.host}`)
    }
    catch(error){
        console.error(`Error ${error.message}`)
        process.exit(1)
    }
}

const PORT=process.env.PORT || 8000

connectDB().then(() => {
    app.listen(PORT, () => console.log(`GreenZen app is running on ${PORT}`));
});
