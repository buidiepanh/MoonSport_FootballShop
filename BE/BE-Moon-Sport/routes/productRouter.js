const express = require("express");
const bodyParser = require("body-parser");
const { getAllProducts, postNewProduct } = require("../services/CRUDServices");

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.route("/").get(getAllProducts).post(postNewProduct);

module.exports = productRouter;
