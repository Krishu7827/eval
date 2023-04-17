let express = require("express")
let {connection} = require("./db")
let {roleRouter} = require("./Router/Role.Router")
let {blogRouter} = require("./Router/Blogs.Router")
let app = express()

app.get("/",(req,res)=>{
    res.send("hii")
})

app.use("/role",roleRouter)
app.use("/blog",blogRouter)

app.listen(process.env.Port, async () => {
    try {

        connection

        console.log("Mongodb is running")

    } catch (err) {

        console.log(err.message)

    }

    console.log(`server is running on ${process.env.Port}`)

})