import express from 'express';
import multer from 'multer';
import path from 'path';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js'
import { requireAuth } from '../middlewares/authention.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })

router.get('/add-new',requireAuth,  (req, res) => {
    res.render('addBlog')
})
router.post('/',requireAuth,  upload.single('coverImage'), async (req, res) => {//adding new post

    try {
        const blog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            createdBy: req.user._id,
            coverImageURL: req.file ? `/uploads/${req.file.filename}` : null
        })
        // console.log(req.user);
        res.redirect(`/blog/${blog._id}`);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
})
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('createdBy');
        const comments= await Comment.find({blogId: req.params.id}).populate('createdBy').sort({createdAt: -1});
        blog.comments= comments;
        res.render('blog', { blog: blog })
    } catch (error) {
        res.status(500).end("Internal Server Error");
    }
})

router.post('/comment/:blogId',requireAuth, async (req, res)=>{
    console.log(req.body.content);
    console.log(req.params.blogId);
    console.log(req.user._id);
    try{
        const comment= await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        })
        // console.log(comment);
        res.redirect(`/blog/${req.params.blogId}`)
    }catch(err){
        res.status(500).send("Could not add comment");
    }
})
export default router;