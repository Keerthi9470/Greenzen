const express=require('express')

const app=express()

app.get('/',(req,res)=>{
    res.send("app is running")
})

const port=8080
app.listen(port,()=>console.log(`app is running on ${port}`))
