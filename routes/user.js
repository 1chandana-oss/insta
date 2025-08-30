// const express=require("express")
// const router=express.Router();
// const mongoose=require("mongoose");
// const POST= mongoose.model("POST")
// const USER=mongoose.model("USER");
// const requirelogin =require("../middlewares/requirelogin");

// console.log("user.js loaded ✅");
// //TO GET USER PROFILE
// router.get(":id",async (req,res)=>{
//     // USER.findOne({_id:req.params.id})
//     // .select("-password")
//     // .then(user=>{
//     //    // res.json(user)
//     //     POST.find({postedBy:req.params.id})
//     //     .populate('postedBy',"_id")
//     //     .exec((err,posts)=>{
//     //         if(err){
//     //             return res.status(422).json({error:err})
//     //         }
//     //         res.status(200).json({user,posts})
//     //     })
//     // }).catch(err=>{
//     //     return res.status(400).json({error:"user not found"})
//     // })
   

//     try {   // 🔹 changed
//     const user = await USER.findById(req.params.id).select("-password");   // 🔹 changed
//     if (!user) {
//       return res.status(404).json({ error: "user not found" });   // 🔹 changed
//     }

//     const posts = await POST.find({ postedBy: req.params.id })   // 🔹 changed
//       .populate("postedBy", "_id");

//     res.status(200).json({ user, posts });
//   } catch (err) {
//     res.status(500).json({ error: "something went wrong" });   // 🔹 changed
//   }




//     })

// //TO FOLLOW USER
// router.put("follow/:id",requirelogin,async (req,res)=>{
//     // USER.findByIdAndUpdate(req.params.id,{
//     //     $push:{followers:req.user._id}
//     // },{
//     //     new:true
//     // },(err,result)=>{
//     //     if(err){
//     //         return res.status(422).json({error:err})
//     //     }
//     //     USER.findByIdAndUpdate(req.user._id,{
//     //          $push:{following:req.params.id}
//     //     },{
//     //         new:true
//     //     }).then(result=>res.json(result))
//     //     .catch(err=>{return res.status(422).json({error:err})})
//     // })

//    try {
//     await USER.findByIdAndUpdate(req.params.id, {
//       $push: { followers: req.user._id }
//     });

//     const updatedUser = await USER.findByIdAndUpdate(
//       req.user._id,
//       { $push: { following: req.params.id } },
//       { new: true }
//     ).select("-password");   // 🔹 changed (removed password)

//     res.json(updatedUser);   // 🔹 changed
//   } catch (err) {
//     res.status(500).json({ error: "something went wrong" });   // 🔹 changed
//   }


// })

// //to unfollow user
// router.put("unfollow/:id",requirelogin,async (req,res)=>{
//     // USER.findByIdAndUpdate(req.params.id, {
//     //     $pull:{followers:req.user._id}
//     // },{
//     //     new:true
//     // },(err,result)=>{
//     //     if(err){
//     //         return res.status(422).json({error:err})
//     //     }
//     //     USER.findByIdAndUpdate(req.user._id,{
//     //         $pull:{following:req.params.id}
//     //     },{
//     //         new:true
//     //     }).then(result=>res.json(result))
//     //     .catch(err=>{return res.status(422).json({error:err})})
//     // })


//      try {
//     await USER.findByIdAndUpdate(req.params.id, {
//       $pull: { followers: req.user._id }
//     });

//     const updatedUser = await USER.findByIdAndUpdate(
//       req.user._id,
//       { $pull: { following: req.params.id } },
//       { new: true }
//     ).select("-password");   // 🔹 changed

//     res.json(updatedUser);   // 🔹 changed
//   } catch (err) {
//     res.status(500).json({ error: "something went wrong" });   // 🔹 changed
//   }


// })


// router.put("uploadprofilepic",requirelogin,async (req,res)=>{
//     // USER.findByIdAndUpdate(req.user._id,{
//     //     $set:{Photo:req.body.pic}
//     // },{
//     //     new:true
//     // }).exec((err,result)=>{
//     //     if(err){
//     //         res.status(422).json({error:err})
//     //     }else{
//     //         res.json(result)
//     //     }
//     // })

//     try {
//     const result = await USER.findByIdAndUpdate(
//       req.user._id,
//       { $set: { Photo: req.body.pic } },
//       { new: true }
//     );
//     res.json(result);
//   } catch (err) {
//     res.status(422).json({ error: err });
//   }
// })
// module.exports=router;



const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const requirelogin = require("../middlewares/requirelogin");

console.log("user.js loaded ✅");

// GET user profile and their posts
router.get("/user/:id", async (req, res) => {
  try {
    const user = await USER.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await mongoose.model("POST").find({ postedBy: req.params.id }).populate("postedBy", "_id");
    res.status(200).json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// FOLLOW a user
router.put("/user/follow", requirelogin, async (req, res) => {
  try {
    await USER.findByIdAndUpdate(req.params.id, { $push: { followers: req.user._id } });
    const updatedUser = await USER.findByIdAndUpdate(
      req.user._id,
      { $push: { following: req.params.id } },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// UNFOLLOW a user
router.put("/user/unfollow", requirelogin, async (req, res) => {
  try {
    await USER.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } });
    const updatedUser = await USER.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: req.params.id } },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// UPLOAD profile picture
router.put("/user/uploadprofilepic", requirelogin, async (req, res) => {
  try {
    const result = await USER.findByIdAndUpdate(
      req.user._id,
      { $set: { Photo: req.body.pic } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err });
  }
});

module.exports = router;
