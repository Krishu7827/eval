let mongoose = require("mongoose")

let RoleSchema = mongoose.Schema({
   name:String,
   email:String,
   password:String,
   role:String
},{
    versionKey:false
})

let RoleModel = mongoose.model("Role",RoleSchema)


module.exports = {RoleModel}