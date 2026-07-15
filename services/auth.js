import jsonwebtoken from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET= process.env.JWT_SECRET_KEY;

function generateToken(user){
    const payload= {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImageURL: user.profileImageURL,
    };
    const token= jsonwebtoken.sign(payload, JWT_SECRET);
    return token;
}
function verifyToken(token){
    const user= jsonwebtoken.verify(token, JWT_SECRET);
    // console.log(payload);
    return user;
}

export{
    generateToken,
    verifyToken,
}