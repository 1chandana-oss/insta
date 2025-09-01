const express=require("express");
const router=express.Router();
const mongoose = require("mongoose");
const requirelogin =require("../middlewares/requirelogin")
const POST= mongoose.model("POST")



router.get("/allposts",requirelogin, (req,res)=>{
   POST.find()
   .populate("postedBy","_id name photo")
   .populate("comments.postedBy","_id name")
   .sort("-createdAt")
   .then(posts=>res.json(posts))
    .catch (err=> {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });   // 🔹 changed
  })
})
router.post("/createpost",requirelogin, (req,res)=>{
 const {body,pic}=req.body;
// if (typeof body !== "string" || body.trim() === "" || typeof pic !== "string" || pic.trim() === "") {
//     return res.status(422).json({ error: "Please add all the fields" });
//   }
if(!pic || !body){
  return res.status(422).json({error:"please add all the fields"})
}
 const post=new POST({
    body,
    photo:pic,
    postedBy:req.user
 })
 post.save()
    .then(result => res.json({ post: result }))  
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });   
    });
})

router.get("/myposts",requirelogin, (req,res)=>{
   POST.find({postedBy:req.user._id})
   .populate("postedBy","_id name")
   .populate("comments.postedBy","_id name")
   .sort("-createdAt")
   .then(myposts=>res.json(myposts))
  .catch (err=> {
    res.status(500).json({ error: "Something went wrong" });  
  })

})

router.put("/like/:id",requirelogin, (req,res)=>{
POST.findByIdAndUpdate(req.body.postId,{
   $push:{likes:req.user._id}
},{
   new:true
}).populate("postedBy","_id name photo")
.then(result=>res.json(result))
  .catch (err=> {
    res.status(422).json({ error: err });
  })

})

router.put("/unlike/:id",requirelogin, (req,res)=>{
POST.findByIdAndUpdate(req.body.postId,{
   $pull:{likes:req.user._id}
},{
   new:true
}).populate("postedBy","_id name photo")
.then(result=>res.json(result))
  .catch (err=> {
    res.status(422).json({ error: err });
  })

})
 router.put("/comment/:id",requirelogin, (req,res)=>{
   const comment={
      comment:req.body.text,
      postedBy:req.user._id
   }
   POST.findByIdAndUpdate(req.body.postId,{
      $push:{comments:comment}
   },{
      new:true
   })
   .populate("postedBy","_id name photo")
   .populate("comments.postedBy","_id name")
   .then(result=>res.json(result))
  . catch (err=> {
    res.status(422).json({ error: err });
  })

 })
  router.delete("/deletepost/:postId",requirelogin, (req,res)=>{
   POST.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
   .then(post=>{
      if( !post){
         return res.status(404).json({error:"post not found"})
      }if(post.postedBy._id.toString()!=req.user._id.toString()){
         return res.status(403).json({error:"not authorized"})
      }
         return post.deleteOne()
         .then(()=>res.json({message:"successfully deleted"}))
         .catch(err=>{
          console.error(err);
          res.status(500).json({error:"something went wrong"})
         });
    })
    .catch(err=>{
       console.error(err);
      res.status(500).json({ error: "Something went wrong" }); 
    })

  
  //  
 })

 //to show following list
 router.get("/myfollowingpost",requirelogin, (req,res)=>{
   POST.find({postedBy:{$in:req.user.following}})
   .populate("postedBy","_id name")
   .populate("comments.postedBy","_id name")
   .then(posts=>res.json(posts))
   .catch (err=> {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });   
  })
 })


module.exports = router;