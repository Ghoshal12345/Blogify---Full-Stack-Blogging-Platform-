import { verifyToken } from "../services/auth.js";

function cookieAuthentication(req, res, next){
    // console.log(req.cookies);
    const { token } = req.cookies;
    // console.log(token);
    if(!token){
        return next();
    }

    try{
        const user= verifyToken(token)
        req.user=user;
        // console.log('User payload added to req:', userPayload);
    }
    catch(err){
        // Token is invalid or expired
    }
    return next();
}

// Middleware to require authentication for protected routes
function requireAuth(req, res, next){
    if(!req.user){
        return res.redirect('/user/signin');
    }
    next();
}

export{
    cookieAuthentication,
    requireAuth,
}