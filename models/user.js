import mongoose from 'mongoose';
import { createHmac ,randomBytes} from 'node:crypto';

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
        select: false,  // Hide from queries by default
    },
    password:{
        type: String,
        required: true,
        select: false,  // Hide from queries by default
    },
    profileImageURL:{
        type: String,
        default:'../public/images/default.png'
    },
    role:{
        type: String,
        enum:['USER', 'ADMIN'],
        default:'USER',
    }
},{timestamps: true});

userSchema.pre('save', async function(){
    const user= this;//here 'this' refers to the user document being saved

    if(!user.isModified('password')) return;

    const salt= randomBytes(16).toString();
    const hashedPassword= createHmac('sha256', salt) //hashedPassword-->irreversible 64-character hexadecimal string
        .update(user.password)
        .digest('hex');

    this.salt= salt;
    this.password= hashedPassword;
    // console.log(salt);
    // console.log(hashedPassword);
})

// mongoose virtual function
userSchema.static('matchPassword', async function(email, password){
    const user= await this.findOne({email: email}).select('+salt +password');// 'this' refers to the User model
    if(!user) throw new Error('User not found');

    const salt= user.salt;
    const hashedPassword= user.password;

    const UserProvidedHash= createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if(UserProvidedHash !== hashedPassword) throw new Error('Incorrect password');
    return user;
})
const User= mongoose.model('user', userSchema);

export default User; 