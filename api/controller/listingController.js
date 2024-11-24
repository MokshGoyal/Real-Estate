import Listing from "../models/listingModel.jsx";
import cloudinary from "cloudinary";

export const createListing = async(req, res, next)  => {
    try {
        const uploadImages = async (file) => {
            const result = await cloudinary.uploader.upload(file);
            console.log(result);
        }

        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
        
    } catch (error) {
        
        next(error);
        console.error(error);
    }
};