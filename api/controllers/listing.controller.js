import Listing from "../models/listing.model.js";
import { errorHandler } from "../utilis/error.js";
import User from "../models/User.model.js";


export const createListing = async (req, res, next) => {
    try{
        console.log("Creating listing with data:");
        console.log(req.body);
        const listing  = await Listing.create(req.body);
        res.status(201).json(listing);
    }
    catch(err){
        next(err);
    }
}

export const showListings = async (req,res,next)=>{
    
    try{
        const listings = await Listing.find({userRef:req.params.id});
        res.status(200).json(listings);
    }
    catch(err){
        next(err);
    }
}


export const deleteListing = async (req,res,next)=>{
    console.log("Deleting listing with id:", req.params.id);
    const listing = await Listing.findById(req.params.id);
    if(!listing)
    {
        return next(errorHandlerandler(404,"Listing not found"));
    }
    if(listing.userRef.toString() !== req.user.id)
    {
        return next(errorHandler(403,"You are not authorized to delete this listing"));
    }
    try{
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Listing deleted successfully",
        });
    }
    catch(err){
        next(err);
    }
}

export const showEachListing = async (req,res,next)=>{
    try{
    const listing = await Listing.findById(req.params.id);
    console.log("Fetched listing:", listing);
    if(!listing)
    {
        return next(errorHandler(404,"Listing not found"));
    }
    else if (listing.userRef.toString() !== req.user.id)
    {
        return next(errorHandler(403,"You are not authorized to view this listing"));
    }
    
        res.status(200).json(listing);
}
    catch(err){
        next(err);
    }
}


export const updateListing = async (req,res,next)=>{
    try{
        let listing = await Listing.findById(req.params.id)
        if(listing.userRef.toString() !== req.user.id)
        {
            return next(errorHandler(403,"You are not authorized to update this listing"));
        }
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        listing = await Listing.findById(req.params.id);
        console.log("Updated Listing:", listing);
        res.status(200).json({
            success:true,
            data:listing,
        })

    }
    catch(err){
        next(err);
    }


}

export const showall = async (req,res,next)=>{
    try{
        const listings = await Listing.find();
        res.status(200).json(listings);
    }
    catch(err){
        next(err);
    }
}

export const showListingsForUser = async (req, res, next) => {
  try {
    // Find the listing by ID
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    // Fetch the user associated with this listing
    const user = await User.findById(listing.userRef).select('-password'); // exclude sensitive info
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Return both listing and user data
    res.status(200).json({
      ...listing.toObject(), // convert mongoose doc to plain JS object
      user: user.toObject(),  // attach user data
    });

  } catch (err) {
    next(err);
  }   
};