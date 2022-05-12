const router =require('express').Router();
const Comment =require('../models/Comment')
const cors = require('./cors');

router.get("/:id",cors.cors,async (req,res)=>{
    const postId =req.params.id
       
    try {
     const comment = await   Comment.find({postId})

     res.status(200).json(comment)

    } catch (error) {
        res.status(500).json(error);
        
    }


});



router.route("/post")
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,async (req,res)=>{
       const newComment = new Comment(req.body);
       try {
        const savedPost =await newComment.save();
        res.status(200).json(savedPost)
    } catch (error) {
      res.status(500).json(error)  
    }
    
});

module.exports = router;