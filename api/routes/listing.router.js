import express from 'express';
import { createListing, deleteListing, showall, showEachListing, showListings, showListingsForUser, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utilis/verifyuser.js';

const router = express.Router();

router.post('/create',verifyToken,createListing)

router.get('/show/:id',verifyToken,showListings)

router.delete('/delete/:id',verifyToken,deleteListing)

router.get('/list/:id',verifyToken,showEachListing);

router.post('/update/:id',verifyToken,updateListing);

router.get('/home',showall)

router.get('/show-list/:id',showListingsForUser)


export default router;