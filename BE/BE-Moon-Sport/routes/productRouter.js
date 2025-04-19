const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllProducts,
  postNewProduct,
  updateProduct,
  deleteProduct,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");

const productRouter = express.Router();
productRouter.use(bodyParser.json());
productRouter.use(authenticate);

productRouter.route("/").get(getAllProducts).post(postNewProduct);
productRouter.route("/:productId").put(updateProduct).delete(deleteProduct);

module.exports = productRouter;
