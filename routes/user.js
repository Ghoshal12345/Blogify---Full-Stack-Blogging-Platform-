import express from 'express';
import User from "../models/user.js";
import { generateToken } from '../services/auth.js';

const UserRouter = express.Router();

UserRouter.get('/signin', (req, res) => {
    return res.render('signin');
})
UserRouter.get('/signup', (req, res) => {
    return res.render('signup');
})

UserRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.matchPassword(email, password);
        const token = generateToken(user);
        return res.cookie('token', token).redirect('/');
    }
    catch(err){
        return res.status(401).render('signin', { errorMessage: err.message });
    }

})

UserRouter.get('/signout', (req, res)=>{
    return res.clearCookie('token').redirect('/user/signin');
})

UserRouter.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName: fullName,
        email: email,
        password: password,
    })
    return res.redirect('/user/signin');
})
export default UserRouter;