const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: [1, "Price must above 0 VND"],
      max: [50000000, "Price must be below 50.000.000 VND"],
    },
    image: {
      type: String,
      required: true,
    },
    sale: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Products = mongoose.model("Products", productSchema);
module.exports = Products;
