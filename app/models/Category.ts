import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// CRITICAL FOR NEXT.JS
const Category =
  models.Category || mongoose.model("Category", categorySchema);

export default Category;
