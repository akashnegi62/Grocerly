import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: {
    type: String, // Home / Office
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    addresses: [addressSchema], // SAVED ADDRESSES

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
