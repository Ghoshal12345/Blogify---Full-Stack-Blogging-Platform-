import mongoose from "mongoose";

const blogSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',//reference to User model
        required: true,
    },
    coverImageURL:{
        type: String,
        required: false,
    }
}, {timestamps: true})

const Blog= mongoose.model('blog', blogSchema);

export default Blog; 