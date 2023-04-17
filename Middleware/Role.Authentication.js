let express = require("express")
let JWT = require("jsonwebtoken")
const { blacklistModel } = require("../Model/Blacklist.Model")

let app = express()

let RoleAuthentication = async(req,res,next)=>{

    let token = req.headers.authorization

     let blacklisttoken = await blacklistModel.find({token:token})

   let decoded = JWT.verify(token,"blogs")

   if(decoded && !blacklisttoken){
      console.log(decoded)

      req.body.User_email = decoded.User_email

      req.body.role = decoded.Role

      next()

   }else{

    res.send({"msg":err.msg})

   }

}

module.exports = {RoleAuthentication}