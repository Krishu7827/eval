let mongoose = require("mongoose")


let blogSchema = mongoose.Schema({

    User_email:String,
    Title:String,
    Blog:String 

},{
    versionKey:false
})

let blogModel = mongoose.model("blog",blogSchema)

module.exports = {blogModel}