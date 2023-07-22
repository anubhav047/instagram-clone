const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"USER"}],
    comments:[{
        comment:{type:String,required:true},
        postedBy:{type:ObjectId,ref:"USER"}
    }],
    postedBy:{
        type: ObjectId,
        ref:"USER"
    }
},{timestamps:true})

module.exports=mongoose.model("POST",postSchema)