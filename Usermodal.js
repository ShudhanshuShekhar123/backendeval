const mongoose = require("mongoose")



const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String
})


const Usermodal = mongoose.model("user",Userschema)


module.exports = Usermodal