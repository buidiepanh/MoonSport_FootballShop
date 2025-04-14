const { Schema, default: mongoose } = require("mongoose");

var categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", categorySchema);
module.exports = Categories;
