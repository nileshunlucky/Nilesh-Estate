import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        type: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        bedrooms: {
            type: Boolean,
            required: true,
        },
        bathrooms: {
            type: Boolean,
            required: true,
        },
        regularPrice: {
            type: Boolean,
            required: true,
        },
        discountedPrice: {
            type: Boolean,
            required: true,
        },
        image: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing