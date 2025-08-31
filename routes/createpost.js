// const express=require("express");
// const router=express.Router();
// const mongoose = require("mongoose");
// const requirelogin =require("../middlewares/requirelogin")
// const POST= mongoose.model("POST")



// router.get("/allposts",requirelogin,async (req,res)=>{
//    // POST.find()
//    // .populate("postedBy","_id name photo")
//    // .populate("comments.postedBy","_id name")
//    // .sort("-createdAt")
//    // .then(posts=>res.json(posts))
//    // .catch(err=>console.log(err))

//    try {
//     const posts = await POST.find()
//       .populate("postedBy", "_id name photo")
//       .populate("comments.postedBy", "_id name")
//       .sort("-createdAt");

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });   // 🔹 changed
//   }
// })
// router.post("/createpost",requirelogin,async (req,res)=>{
// //  const {body,pic}=req.body;
// //  console.log(pic)
// //  if(!body || !pic){
// //     return res.status(422).json({error:"please add all the feilds"})
// //  }
// //  console.log(req.user)
// // // req.user
// //  const post=new POST({
// //     body,
// //     photo:pic,
// //     postedBy:req.user
// //  })
// //  post.save().then((result)=>{
// //     return res.json({post:result})
// //  }).catch(err=>console.log(err))
// // res.json("ok")

//   try {
//     const { body, pic } = req.body;
//     if (!body || !pic) {
//       return res.status(422).json({ error: "please add all the fields" });
//     }

//     const post = new POST({
//       body,
//       photo: pic,
//       postedBy: req.user
//     });

//     const result = await post.save();   // 🔹 changed
//     res.json({ post: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });   // 🔹 changed
//   }

// })

// router.get("/myposts",requirelogin,async (req,res)=>{
//    // POST.find({postedBy:req.user._id})
//    // .populate("postedBy","_id name")
//    // .populate("comments.postedBy","_id name")
//    // .sort("-createdAt")
//    // .then(myposts=>{
//    //    res.json(myposts)
//    // })

//    try {
//     const myposts = await POST.find({ postedBy: req.user._id })
//       .populate("postedBy", "_id name")
//       .populate("comments.postedBy", "_id name")
//       .sort("-createdAt");

//     res.json(myposts);
//   } catch (err) {
//     res.status(500).json({ error: "Something went wrong" });   // 🔹 changed
//   }
// })

// router.put("/like/:id",requirelogin,async (req,res)=>{
//    console.log("Like request for postId:", req.params.id);   // 🔹 fixed
//   console.log("User liking the post:", req.user._id);
// // POST.findByIdAndUpdate(req.body.postId,{
// //    $push:{likes:req.user._id}
// // },{
// //    new:true
// // }).populate("postedBy","_id name photo")
// //   .exec((err,result)=>{
// //    if(err){
// //       return res.status(422).json({error:err})
// //    }else{
// //       res.json(result)
// //    }
// // })

// console.log("Like request for postId:", req.params.id);
//   console.log("User liking the post:", req.user._id);
//  try {
//     const result = await POST.findByIdAndUpdate(
//       req.params.id,
//       { $push: { likes: req.user._id } },
//       { new: true }
//     ).populate("postedBy", "_id name photo");

//     res.json(result);
//   } catch (err) {
//     res.status(422).json({ error: err });
//   }

// })

// router.put("/unlike/:id",requirelogin,async (req,res)=>{
//  console.log("Unlike request for postId:", req.params.id);   // 🔹 fixed
//   console.log("User unliking the post:", req.user._id);
// // POST.findByIdAndUpdate(req.body.postId,{
// //    $pull:{likes:req.user._id}
// // },{
// //    new:true
// // }).populate("postedBy","_id name photo")
// //   .exec((err,result)=>{
// //    if(err){
// //       return res.status(422).json({error: err})
// //    }else{
// //       res.json(result)
// //    }
// // })


// try {
//     const result = await POST.findByIdAndUpdate(
//       req.params.id,
//       { $pull: { likes: req.user._id } },
//       { new: true }
//     ).populate("postedBy", "_id name photo");

//     res.json(result);
//   } catch (err) {
//     res.status(422).json({ error: err });
//   }

// })
//  router.put("/comment/:id",requirelogin,async (req,res)=>{
// //    const comment={
// //       comment:req.body.text,
// //       postedBy:req.user._id
// //    }
// //    POST.findByIdAndUpdate(req.body.postId,{
// //       $push:{comments:comment}
// //    },{
// //       new:true
// //    })
// //    .populate("postedBy","_id name photo")
// //    .populate("comments.postedBy","_id name")
// //    .exec((err,result)=>{
// //    if(err){
// //       return res.status(422).json({error:err})
// //    }else{
// //       res.json(result)
// //    }
// //   })

//    try {
//     const comment = {
//       comment: req.body.text,
//       postedBy: req.user._id
//     };

//     const result = await POST.findByIdAndUpdate(
//       req.params.id,
//       { $push: { comments: comment } },
//       { new: true }
//     )
//       .populate("postedBy", "_id name photo")
//       .populate("comments.postedBy", "_id name");

//     res.json(result);
//   } catch (err) {
//     res.status(422).json({ error: err });
//   }

//  })
//  router.delete("/deletepost/:postId",requirelogin,async (req,res)=>{
//    console.log("DELETE request URL:", req.originalUrl);   // 👈 add this
//   console.log("Captured postId param:", req.params.postId);
//    // POST.findOne({_id:req.params.postId})
//    // .populate("postedBy","_id")
//    // .exec((err,post)=>{
//    //    if(err || !post){
//    //       return res.status(422).json({error:err})
//    //    }if(post.postedBy._id.toString()==req.user._id.toString()){
//    //       post.remove()
//    //       .then(result=>{
//    //          return res.json({message:"successfully deleted"})
//    //       }).catch((err)=>{
//    //          console.log(err)
//    //       })

//    //    }
//    // })

//     try {
//     const post = await POST.findOne({ _id: req.params.postId })
//       .populate("postedBy", "_id");

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });   // 🔹 changed
//     }

//     if (post.postedBy._id.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ error: "Not authorized to delete this post" });   // 🔹 changed
//     }

//     await post.deleteOne();   // 🔹 changed
//     res.json({ message: "successfully deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });   // 🔹 changed
//   }
//  })

//  //to show following list
//  router.get("/myfollowingpost",requirelogin,async (req,res)=>{
//    // POST.find({postedBy:{$in:req.user.following}})
//    // .populate("postedBy","_id name")
//    // .populate("comments.postedBy","_id name")
//    // .then(posts=>{
//    //    res.json(posts)
//    // })
//    // .catch(err=>{console.log(err)})

//    try {
//     const posts = await POST.find({ postedBy: { $in: req.user.following } })
//       .populate("postedBy", "_id name")
//       .populate("comments.postedBy", "_id name");

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });   // 🔹 changed
//   }
//  })


// module.exports = router;



const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middlewares/requirelogin");
const POST = mongoose.model("POST");

// GET all posts
router.get("/allposts", requirelogin, async (req, res) => {
  try {echo "keys.js" >> .gitignore
git rm --cached keys.js
git commit -m "Remove keys.js from repo"
git push origin main

    const posts = await POST.find()
      .populate("postedBy", "_id name photo")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// CREATE post
router.post("/createpost", requirelogin, async (req, res) => {
  try {
    const { body, pic } = req.body;
    if (!body || !pic) return res.status(422).json({ error: "Please add all fields" });

    const post = new POST({ body, photo: pic, postedBy: req.user });
    const result = await post.save();
    res.json({ post: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET my posts
router.get("/myposts", requirelogin, async (req, res) => {
  try {
    const myposts = await POST.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    res.json(myposts);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// LIKE a post
router.put("/like/:id", requirelogin, async (req, res) => {
  try {
    const result = await POST.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.user._id } },
      { new: true }
    ).populate("postedBy", "_id name photo");
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err });
  }
});

// UNLIKE a post
router.put("/unlike/:id", requirelogin, async (req, res) => {
  try {
    const result = await POST.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).populate("postedBy", "_id name photo");
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err });
  }
});

// COMMENT on a post
router.put("/comment/:id", requirelogin, async (req, res) => {
  try {
    const comment = { comment: req.body.text, postedBy: req.user._id };
    const result = await POST.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("postedBy", "_id name photo")
      .populate("comments.postedBy", "_id name");
    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err });
  }
});

// DELETE a post
router.delete("/deletepost/:id", requirelogin, async (req, res) => {
  try {
    const post = await POST.findOne({ _id: req.params.postId }).populate("postedBy", "_id");
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.postedBy._id.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Not authorized to delete this post" });

    await post.deleteOne();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET posts of users I follow
router.get("/myfollowingpost", requirelogin, async (req, res) => {
  try {
    const posts = await POST.find({ postedBy: { $in: req.user.following } })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
