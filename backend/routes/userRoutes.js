import express from "express";
import protect from "../middleware/authMiddleware.js";
import { updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

/* SAVE ADDRESS */
router.post("/addresses", protect, async (req, res) => {
  try {
    const { label, address } = req.body;

    if (!label || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    req.user.addresses.push({ label, address });
    await req.user.save();

    res.status(201).json(req.user.addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET ADDRESSES */
router.get("/addresses", protect, async (req, res) => {
  res.json(req.user.addresses);
});

/* DELETE ADDRESS */
router.delete("/addresses/:id", protect, async (req, res) => {
  const { id } = req.params;

  req.user.addresses = req.user.addresses.filter(
    (address) => address._id.toString() !== id,
  );

  await req.user.save();

  res.json(req.user.addresses);
});

/* UPDATE ADDRESS */
router.put("/addresses/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { label, address } = req.body;

  req.user.addresses = req.user.addresses.map((address) => {
    if (address._id.toString() === id) {
      return { ...address, label, address };
    }
    return address;
  });

  await req.user.save();

  res.json(req.user.addresses);
});

/* GET PROFILE */
router.get("/profile", protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
  });
});

/* UPDATE PROFILE */
router.put("/profile", protect, updateUserProfile);

export default router;
