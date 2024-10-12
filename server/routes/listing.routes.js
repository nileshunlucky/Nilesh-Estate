import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createListing, deleteListing, getListing, getListings } from "../controllers/listing.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, createListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router