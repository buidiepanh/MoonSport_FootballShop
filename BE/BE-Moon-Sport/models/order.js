const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);
const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
