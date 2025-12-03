import User from "../models/User.model.js";
import { errorHandler } from "../utilis/error.js";
import bcrypt from 'bcryptjs';

export const test = (req,res)=>{
    res.send("User route testing successful");
}

export const updateUser = async (req,res,next)=>{
    console.log(" from update user");
    if(req.params.id !== req.user.id){
        next(errorHandler(403,"You can update only your own account"));
    }
    try{
        if(req.body.password){
            req.body.password  = bcrypt.hashSync(req.body.password,10);
        }
        
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true})
        console.log("inside try after updatation ");


        const {password,...others} = updatedUser._doc;
        res.status(200).json(others); 
    }
    catch(err){
        next(err);
    }

}

export const deleteUser = async (req,res,next)=>{    
    if(req.params.id !== req.user.id){
        return next(errorHandler(403,"You can delete only your own account"));
    }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json({
            success:true,
            message:"User deleted successfully",
        })
        
    }
    catch(err){
        next(err);
    }

}