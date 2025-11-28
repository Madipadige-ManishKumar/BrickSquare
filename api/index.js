import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/User.router.js';
mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();
app.use('/api/users',userRouter);

app.get('/',(req,res)=>{
    res.send("API is running...");
})
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})  
