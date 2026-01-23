import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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

const Product = mongoose.model("Product", productSchema);

export default Product;
