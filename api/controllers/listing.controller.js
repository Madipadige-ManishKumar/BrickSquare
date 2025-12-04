import Listing from "../models/listing.model.js";

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