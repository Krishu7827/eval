let express = require("express")
let blogRouter = express.Router()
let {RoleAuthentication} = require("../Middleware/Role.Authentication")
let {blogModel} = require("../Model/Blogs.Model")
blogRouter.use(express.json())


blogRouter.use(RoleAuthentication)

blogRouter.post("/post",async(req,res)=>{
        //console.log(req.body)
    if(req.body.role == "User"){

    await blogModel.insertMany(req.body)

    res.send({"msg":"posted!!"})

    }else{

        res.send({"msg":"You are not user"})
    }
    
})

blogRouter.patch("/update/:id",async(req,res)=>{

    if(req.body.role == "User"){

        let id =req.params.id

        await blogModel.updateOne({_id:id},payload)

        res.send({"msg":"Updated"})
    }else{
        
        res.send({"msg":"you are not user"})

    }


})


blogRouter.delete("/delete/:id",async(req,res)=>{

  

        let id =req.params.id

        await blogModel.deleteOne({_id:id})

        res.send({"msg":"deleted"})
    


})


blogRouter.get("/", async(req,res)=>{

    let blogs = await blogModel.find({User_email: req.body.User_email})

    if(blogs.length!==0 && req.body.role == "User"){
        
        res.send(blogs)
    }else{

        res.send({"msg":"You have not posted any post yet."})

    }
})

module.exports = {blogRouter}