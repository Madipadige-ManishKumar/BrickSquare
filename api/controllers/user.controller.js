import { errorHandler } from "../utilis/error.js";

export const test = (req,res)=>{
    res.send("User route testing successful");
}

export const updateUser = async (req,res,next)=>{
    console.log(" from update user");
    if(req.params.id !== req.user.id){
        next(errorHandler(403,"You can update only your own account"));
    }
    console.log("check the user id matched");
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


        const {password,...others} = updatedUser._doc;
        res.status(200).json(others); 
    }
    catch(err){
        next(err);
    }

}