const { Schema, default: mongoose } = require("mongoose");

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Carts = mongoose.model("Carts", cartSchema);
module.exports = Carts;
