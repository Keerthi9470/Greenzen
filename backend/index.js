const express=require('express')
const mongoose=require("mongoose")
require("dotenv").config()

const app=express()

//middleware
app.use(express.json())

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

connectDB()

app.get('/',(req,res)=>{
    res.send("app is running")
})

const PORT=process.env.PORT || 8000
app.listen(PORT,()=>console.log(`app is running on ${PORT}`))
