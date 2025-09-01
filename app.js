const express=require("express");
const app=express()
const port=process.env.PORT || 5000;
const mongoose=require("mongoose");
const {mongoUrl} =require("./keys")
const cors=require("cors")
const path=require("path")
//const data=require('./data.js')
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static("uploads"));
require('./models/model');
require('./models/post');

// console.log("Loading auth routes...");
// app.use("/auth",require("./routes/auth"));

// console.log("Loading posts routes...");
// app.use("/posts",require("./routes/createpost"));

// console.log("Loading user routes...");
// app.use("/user",require("./routes/user"))
// mongoose.connect(mongoUrl);
// mongoose.connection.on("connected",()=>{
//     console.log("succesfully connected to mongoose")
// })
// mongoose.connection.on("error",(err)=>{
//     console.log("not connected  to mongoose",err)
// })
 
// //seving the frontend
// app.use(express.static(path.join(__dirname,"./frontend/build")))
// app.get("*",(req,res)=>{
//     res.sendFile(
//         path.join(__dirname,"./frontend/build/index.html"),
//         function (err){
//             res.status(500).send(err)
//         }
//     )
// })
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`)
// })


try {
  console.log("Loading auth routes...");
  app.use("/auth", require("./routes/auth"));

  console.log("Loading posts routes...");
  app.use("/posts", require("./routes/createpost"));

  console.log("Loading user routes...");
  app.use("/user", require("./routes/user"));
} catch (err) {
  console.error("Error loading routes:", err);
}

// Connect to MongoDB
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(mongoUrl)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// mongoose.connection.on("connected", () => {
//   console.log("Successfully connected to MongoDB");
// });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// Serve frontend
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"), (err) => {
    if (err) res.status(500).send(err);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
