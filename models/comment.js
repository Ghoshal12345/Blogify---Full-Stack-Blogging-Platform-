import mongoose from "mongoose";

const commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'blog',//reference to Blog model
        required:true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',//reference to User model
        required:true,
    }
}, {timestamps: true})

const Comment= mongoose.model('comment', commentSchema);

export default Comment; 