const mongoose = require("mongoose")



const Postschema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
})


const Postmodal = mongoose.model("post", Postschema)


module.exports = Postmodal