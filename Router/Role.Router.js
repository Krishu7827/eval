let express = require("express")
require("dotenv").config()
let roleRouter = express.Router()
let { RoleModel } = require("../Model/Role.Model")
let {blacklistModel} = require("../Model/Blacklist.Model")
let bcrypt = require("bcrypt")
let JWT = require("jsonwebtoken")

roleRouter.use(express.json())

roleRouter.post("/register",async(req,res)=>{
//console.log(req.body)
    let {email, password} = req.body


    let user = await RoleModel.find({email})

    if(user.length == 0){

        if(req.body.role){
           
            bcrypt.hash(password, 8, async(err,hash)=>{
               
                req.body.password = hash 

                await RoleModel.insertMany(req.body)

                res.send({"msg":"register success"})

            })

        }else{

            bcrypt.hash(password, 8, async(err,hash)=>{
               
                req.body.password = hash 

                req.body.role = "User"

                await RoleModel.insertMany(req.body)

                res.send({"msg":"register success"})

            })

            

        }

    }else{

        res.send({"msg":"Your are exist user"})
    }
})


roleRouter.post("/login", async(req,res)=>{

    let {email,password} = req.body

    let user = await RoleModel.findOne({email})

   // console.log(user,password)

    bcrypt.compare(password, user.password, (err,result)=>{

        if(result){

            let accesstoken = JWT.sign({User_email: email, Role:user.role}, "blogs", {expiresIn:"1d"})

            let refreshtoken = JWT.sign({User_email: email, Role:user.role}, "refreshtoken", {expiresIn:"180"})

            res.send({"accesstoken":accesstoken, "refreshtoken":refreshtoken})

        }else{

            res.send({"msg":"wrong password"})
        }
    })
})

roleRouter.get("/logout",async(req,res)=>{
    let token = req.headers.authorization

    if(token){

        await blacklistModel.insertMany({token:token})

        res.send("logout success")

    }else{

        res.send("invalid token")
        
    }
})



module.exports = { roleRouter }