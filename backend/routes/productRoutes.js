import express from "express";
import {
  getProducts,
  getProductsByCategory,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q
      ? {
          name: { $regex: req.query.q, $options: "i" },
        }
      : {};

    const products = await Product.find(keyword);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
