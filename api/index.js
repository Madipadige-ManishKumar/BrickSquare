import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/User.router.js';
import authRouter from './routes/auth.router.js';
mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();

// middleware 
app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);

    // error handling middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        status:statusCode,
        message:message,
    })
})


// routes
app.get('/',(req,res)=>{
    res.send("API is running...");
})
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})  
