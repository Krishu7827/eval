let mongoose = require("mongoose")


let blacklistSchema = mongoose.Schema({
    token:String,
})


let blacklistModel = mongoose.model("blacklist",blacklistSchema)

module.exports ={blacklistModel}