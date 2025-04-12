import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    beds: {
      type: Number,
      default: 0,
    },
    baths: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "", 
    },
  },
  {
    timestamps: true, 
  }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
