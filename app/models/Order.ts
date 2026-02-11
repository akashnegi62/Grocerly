import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        qty: Number,
      },
    ],

    shippingAddress: {
      label: String,
      address: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    paymentMethod: {
      type: String,
      default: "UPI",
    },
  },
  { timestamps: true }
);

// CRITICAL FOR NEXT.JS
const Order = models.Order || mongoose.model("Order", orderSchema);

export default Order;
