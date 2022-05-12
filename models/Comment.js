const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new mongoose.Schema({
  
    comment:{
        type:String,
        required:true, 
        
    },   
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model('Comment',CommentSchema)