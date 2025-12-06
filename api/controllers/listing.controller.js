import Listing from "../models/listing.model.js";
import { errorHandler } from "../utilis/error.js";
import User from "../models/User.model.js";
import fetch from "node-fetch";


export const createListing = async (req, res, next) => {
    try{
        console.log("Received listing data:", req.body);
        const predictionData = {
            area: Number(req.body.area),
            bedrooms: Number(req.body.bedrooms),
            bathrooms: Number(req.body.bathrooms),
            stories: Number(req.body.stories),
            parking: req.body.parking ? 1 : 0,
            mainroad: req.body.mainRoad ? "yes" : "no",
            guestroom: req.body.guestRoom ? "yes" : "no",
            basement: req.body.basement ? "yes" : "no",
            hotwaterheating: req.body.hotWaterHeating ? "yes" : "no",
            airconditioning: req.body.airConditioning ? "yes" : "no",
            furnishingstatus: req.body.furnished ? "furnished" : "unfurnished"
        };
        
        const response = await fetch(process.env.ML_PORT+"/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(predictionData)
        })
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData.error || "Prediction failed" });
        }

        const predictionResult = await response.json();
        console.log("Prediction result from Flask:", predictionResult);
        let bestseller = false;
        console.log(predictionResult.predictedPrice+"this is predict  and regular price"+req.body.regularPrice)
        if(parseInt(predictionResult.predictedPrice)>parseInt(req.body.regularPrice))
            {
                console.log("in if");
                bestseller = true;
            }
            else
            {
                console.log("in else");
                bestseller = false;
            }

    // Add bestseller & predictedPrice to req.body before saving to DB
        const listingData = {
            ...req.body,
            bestseller: bestseller,
        };
        const listing  = await Listing.create(listingData);
        res.status(201).json(listingData);
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