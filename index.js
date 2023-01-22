const express = require('express');
const app= express();
const dotenv= require('dotenv');
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const userRoute = require('./routes/users')
const commentRoute = require('./routes/comment')
const categoryRoute = require('./routes/categories')
// const multer = require('multer')
const cors = require('./routes/cors');
const path = require("path");

dotenv.config()
app.use(express.json())
//app.use("/images", express.static(path.join(__dirname, "/images")));



//mongodb+srv://ashu:sonal@cluster0.xy77g.mongodb.net/blog?retryWrites=true&w=majority
mongoose.connect( 'mongodb://ashu:sonal@cluster0-shard-00-00.xy77g.mongodb.net:27017,cluster0-shard-00-01.xy77g.mongodb.net:27017,cluster0-shard-00-02.xy77g.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-46443f-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(console.log('data connected'))
.catch(err=> console.log(err));

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"images")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,req.body.name)
//     },
// })


// const upload = multer({storage:storage})
// app.route("/upload")
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .post(cors.corsWithOptions,upload.single("file"),(req,res)=>{
//     res.status(200).json("file has been uploaded")
// })

app.use("/auth",authRoute);
app.use("/users",userRoute);
app.use("/posts",postRoute);
app.use("/comment",commentRoute);
app.use("/categories",categoryRoute);


app.listen(process.env.PORT || '5000',()=>{
    console.log("connected to the server")

})

 app.use(express.static(path.join(__dirname, "/public")));

 app.get('*', (req, res) => {
   res.render("index");
 });

