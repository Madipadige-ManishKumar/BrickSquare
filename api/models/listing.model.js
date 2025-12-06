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

    // OLD FIELD (Still kept as required)
    regularPrice: {
      type: Number,
      required: true,
    },

    // DISCOUNTED PRICE will ACT AS THE MAIN PRICE NOW
    discountedPrice: {
      type: Number,
      required: true,
    },

    bathrooms: {
      type: Number,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
    },

    furnished: {
      type: Boolean,
      required: true,
    },

    parking: {
      type: Boolean,
      required: true,
    },

    // SALE / RENT REMOVED FROM SCHEMA (YOU WANT THAT)
    // type will decide (sale or rent)
    type: {
      type: String,
      required: true,
    },

    offer: {
      type: Boolean,
      required: true,
    },

    // ---- NEW FIELDS BELOW -----

    area: {
      type: Number,
      required: true,
    },

    stories: {
      type: Number,
      required: true,
    },

    mainRoad: {
      type: Boolean,
      required: false,
      default: false,
    },

    guestRoom: {
      type: Boolean,
      required: false,
      default: false,
    },

    basement: {
      type: Boolean,
      required: false,
      default: false,
    },

    hotWaterHeating: {
      type: Boolean,
      required: false,
      default: false,
    },

    airConditioning: {
      type: Boolean,
      required: false,
      default: false,
    },

    // USER REF
    userRef: {
      type: String,
      required: true,
    },
    bestseller:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
