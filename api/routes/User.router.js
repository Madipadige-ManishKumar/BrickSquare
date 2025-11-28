import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',test)

router.get('/api',(req,res)=>{
    res.send("API is working fine");
})

export default router;