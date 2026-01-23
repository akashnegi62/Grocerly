import e from "express";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  const products = await Product.find({
    categories: category,
  });

  res.json(products);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  console.log("Requested ID:", id);

  try {
    const product = await Product.findById(id);

    console.log("Mongo result:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
