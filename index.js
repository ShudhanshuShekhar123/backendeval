const express = require("express")
const mongoose = require("mongoose")
const server = express()
require("dotenv").config()
const Userroutes = require("./routes/Userroutes")
const Postroutes = require("./routes/Postroutes")

server.use(express.json())
server.use("/users",Userroutes)
server.use("/posts",Postroutes)


server.get("/",(req,res)=>{
    res.send("wwelcome to home page")
})

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to Mongodb Atlas")
    } catch (error) {
        console.log("server error")
    }

}


server.listen(process.env.PORT, () => {
    console.log(`listening at port ${process.env.PORT}`)
    connect()
})














