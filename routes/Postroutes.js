const express = require("express")
const route = express.Router()
const Postmodal = require("../Postmodal")
const jwt = require("jsonwebtoken")


const tokenchecker = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]

    jwt.verify(token, "front", (err, data) => {

        if (data) {
            req.name = data.name;
            req.id = data.id
            next()
            // res.send(data)
        } else {
            res.send("token expired")
        }

    })

}


route.post("/addpost", tokenchecker, async (req, res) => {

    console.log(req.id, "id")
    console.log(req.name)
    //   console.log(req.body)

    const postadded = await Postmodal.create({ ...req.body, creator: req.id })
    await postadded.populate("creator")
    res.send({ "msg": "post added succesfully", postadded })

})



route.get("/", async (req, res) => {

    if(!req.query.device){
        const allpost = await Postmodal.find()
        res.send({ "msg": "all post of  user", allpost })
    }else{
        const querypost = await Postmodal.find(req.query)
        res.send({ "msg": "query post  of user", querypost })
    }
  

})








route.patch("/update/:id", tokenchecker, async (req, res) => {

    let post = await Postmodal.findById({ _id: req.params.id })
    console.log(post)
    if (post.creator.toString() === req.id) {
        let postupdate = await Postmodal.findByIdAndUpdate({ _id: req.params.id }, req.body,{new:true})
        res.send(postupdate)
    }


})


route.delete("/delete/:id", tokenchecker, async (req, res) => {

    let post = await Postmodal.findById({ _id: req.params.id })
    console.log(post)
    if (post.creator.toString() === req.id) {
        let deletedata = await Postmodal.findByIdAndDelete({ _id: req.params.id })
        res.send(deletedata)
    }


})



module.exports = route