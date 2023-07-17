const express = require("express")
const route = express.Router()
const Usermodal = require("../Usermodal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

route.post("/register", async (req, res) => {

    const { password } = req.body

    //PASSWORD HASHING

    try {

        const hashedpassword = await bcrypt.hash(password, 10)
        let registereduser = await Usermodal.create({ ...req.body, password: hashedpassword })
        res.send({ "msg": "user registered succesfully", registereduser })
    } catch (error) {
        res.send("user not registered")
        console.log(error)
    }
})


route.post("/login", async (req, res) => {
 
    try {

        const { name, password } = req.body

        let finduser = await Usermodal.findOne({ name })
        if (!finduser) {
            res.send("You need to register first")
        } else {

            const verify =  bcrypt.compare(password, finduser.password)
            if (verify) {
                let token = jwt.sign({ name, id:finduser._id }, "front",{expiresIn:"3min"})
                let refreshtoken = jwt.sign({ name,  id:finduser._id  }, "back", { expiresIn: "4d" })

                res.send({ "msg":"User login Succesfull", token, refreshtoken })
            } else {
                res.send("Paassword is Incorrect")
            }


        }
    } catch (error) {
        console.log("server error")
    }

})

module.exports = route