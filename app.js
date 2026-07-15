import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import UserRouter from './routes/user.js';
import BlogRouter from './routes/blog.js';
import Blog from './models/blog.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { cookieAuthentication, requireAuth } from './middlewares/authention.js';

const app= express();
dotenv.config();
const PORT= process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cookieAuthentication); // Global authentication check
app.use(express.static(path.resolve('./public')));

app.use((req, res, next) => {
    res.locals.user = req.user; // Make user available in all views
    next();
});
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

// DB connection
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
})
.then(() => {
    console.log("✅ Database connected");

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
});

app.get('/', async (req, res)=>{
    try {
        const allBlogs = await Blog.find({}).sort({createdAt: -1}).populate('createdBy');
        res.render('home', { 
            blogs: allBlogs,
        });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.render('home', {blogs: []});
    }
})
app.use('/user', UserRouter);
app.use('/blog',  BlogRouter);

