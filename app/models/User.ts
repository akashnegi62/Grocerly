import mongoose, { Schema, models } from "mongoose";

const addressSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { _id: true },
);

const userSchema = new Schema(
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

    addresses: [addressSchema],

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true },
);
const User = models.User || mongoose.model("User", userSchema);

export default User;
