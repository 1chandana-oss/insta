const express=require("express");
const router=express.Router();
const mongoose = require("mongoose");
const USER=mongoose.model("USER");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {jwt_secret}=require('../keys')
const requirelogin =require("../middlewares/requirelogin");
// router.get('/',(req,res)=>{
//     res.send("hello")
// })
// router.get("/createpost",requirelogin,async (req,res)=>{
// //     console.log("hello auth")
// //     res.json({message:"auth ruth working"})
// // })
// // router.post("/signup",async (req,res)=>{
// //     const{name,username,email,password}=req.body;
// //     if(!name || !email ||!username ||!password){
// //         return res.status(422).json({error:"please add all the fields"})
// //     }
// //     USER.findOne({ $or:[{email: email},{username:username}] }).then((savedUser)=>{
// //         if(savedUser){
// //             return res.status(422).json({error:"user already exist with that email or username "})
// //         }
// //         bcrypt.hash(password,12).then((hashedPassword)=>{
// //             const user=new USER({
// //         name,
// //         email,
// //         username,
// //         password:hashedPassword
// //         })
// //         user.save()
// //         .then(user=>{res.json({message:"registered succesfully"})})
// //         .catch(err=> {console.log(err)})
// //         })
        
// // })  


// try {
//     const { name, username, email, password } = req.body;   // 🔹 changed
//     if (!name || !email || !username || !password) {
//       return res.status(422).json({ error: "please add all the fields" });
//     }

//     const savedUser = await USER.findOne({   // 🔹 changed
//       $or: [{ email }, { username }]
//     });

//     if (savedUser) {
//       return res.status(422).json({ error: "user already exists with that email or username" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);   // 🔹 changed

//     const user = new USER({
//       name,
//       email,
//       username,
//       password: hashedPassword
//     });

//     await user.save();   // 🔹 changed
//     res.json({ message: "registered successfully" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "something went wrong" });   // 🔹 changed
//   }
// })

router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    }

    const savedUser = await USER.findOne({
      $or: [{ email }, { username }]
    });

    if (savedUser) {
      return res.status(422).json({ error: "user already exists with that email or username" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new USER({
      name,
      email,
      username,
      password: hashedPassword
    });

    await user.save();
    res.json({ message: "registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
});
router.post("/signin",async (req,res)=>{
    // const {email,password}=req.body;
    // if(!email || !password){
    //     return res.status(422).json({error:"please add email and password"})
        
    // }
    // USER.findOne({email:email}).then((savedUser)=>{
    //     if(!savedUser){
    //         return res.status(422).json({error:"invalid email"})
    
    //     }
    //     bcrypt.compare(password,savedUser.password).then((match)=>{
    //        if(match){
    //         // return res.status(200).json({message:"signed in succesfully"})
    //         const token=jwt.sign({_id:savedUser.id},jwt_secret)
    //         const {_id,name,email,username}=savedUser
    //         res.json({token,user:{_id,name,email,username}});
    //         console.log({token,user:{_id,name,email,username}})
    //        }
    //        else{
    //         return res.status(422).json({error:"invalid password "})
    //        }
        //    })
        //    .catch(err=>console.log(err))
        //   // console.log(savedUser);
        // })
        // // console.log(savedUser);

        try {
    const { email, password } = req.body;   // 🔹 changed
    if (!email || !password) {
      return res.status(422).json({ error: "please add email and password" });
    }

    const savedUser = await USER.findOne({ email });   // 🔹 changed
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email" });
    }

    const match = await bcrypt.compare(password, savedUser.password);   // 🔹 changed
    if (!match) {
      return res.status(422).json({ error: "invalid password" });
    }

    const token = jwt.sign({ _id: savedUser.id }, jwt_secret);   // 🔹 changed
    const { _id, name, username } = savedUser;
    res.json({ token, user: { _id, name, email, username } });   // 🔹 changed
    console.log({ token, user: { _id, name, email, username } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });   // 🔹 changed
  }
})
module.exports=router;