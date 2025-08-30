const jwt = require("jsonwebtoken")
const {jwt_secret}=require("../keys")
const mongoose=require("mongoose")
const USER=mongoose.model("USER")

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"you must be logged in,token not found"})
    }
    const token=authorization.replace("Bearer " ," ")
    jwt.verify(token,jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in ,invaild token "})
        }
        const {_id}=payload
        USER.findById(_id)
            .then(userData =>{
                if(!userData){
                    return res.status(401).json({error:"user not found"})
                }
                req.user=userData
            //console.log(userData)
                next()
        })
        .catch(err=>{
            return res.status(500).json({error:"user looked up failed"})
        })
    })
    //res.json("ok")
    //console.log("hello middleware")
    //next()
}