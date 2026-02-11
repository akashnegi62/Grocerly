import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    brand: String,
    price: Number,
    mrp: Number,
    rating: Number,
    reviews: Number,
    type: String,
    flavour: String,
    diet: String,
    weight: String,
    packaging: String,
    features: String,
    categories: [String],
    image: String,
  },
  {
    collection: "products",
    timestamps: true,
  }
);

// CRITICAL FOR NEXT.JS
const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
