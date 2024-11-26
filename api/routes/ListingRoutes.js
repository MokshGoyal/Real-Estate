import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createListing,deleteListing ,updateListing} from "../controller/listingController.js";
import { getUserListings } from "../controller/UserController.js";

const router = express.Router();``

router.post("/create/",verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get("/listings/:id", verifyToken, getUserListings);

export default router;