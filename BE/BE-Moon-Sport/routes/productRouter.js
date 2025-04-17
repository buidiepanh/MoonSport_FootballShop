const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllProducts,
  postNewProduct,
  updateProduct,
  deleteProduct,
} = require("../services/CRUDServices");

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.route("/").get(getAllProducts).post(postNewProduct);
productRouter.route("/:productId").put(updateProduct).delete(deleteProduct);

module.exports = productRouter;
