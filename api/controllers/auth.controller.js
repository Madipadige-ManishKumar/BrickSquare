import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utilis/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try{
    await newUser.save()
    res.status(201).json({message:"User registered successfully"});
    }
    catch(err){
        next(err);
    }


}

export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    /*
    const  hashedPassword = bcrypt.hashSync(password,10);
       find the email fromthe database
        if exists then 
            compare the password with hashed password
            if matches then 
                navigate to home page
        else
            return error user not found

    */   
   try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not Found"));
        }
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid Username or Password"));
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest}= validUser._doc;
        res.cookie("access_token",token).status(200).json(rest);
   }
   catch(err){
    next(err);
   }
}


export const google = async (req,res,next)=>{
    console.log(process.env.JWT_SECRET+"hello world");
    try{
        const {name,email,photoURL} = req.body;
        const user = await User.findOne({email});
        if(user)
        {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            const{password,...rest}= user._doc;
            res.cookie("access_token",token).status(200).json(rest);
        }
        else
        {
            const  password  = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(password,10);

            const newUser  = new User({
                username:name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password:hashedPassword,
                avatar:photoURL,
            })

            await newUser.save();

            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
            const{ password:pass ,...rest} = newUser._doc;
            res.cookie('access_token',token).status(200).json(rest);
        }
    }

    catch(err)
    {
        next(err);
    }

}

export const signout = (req,res)=>{
    try{
        res.clearCookie("access_token");
        res.status(200).json({message:"Signout Successfully"});
    }
    catch(err){
        next(err);
    }

}