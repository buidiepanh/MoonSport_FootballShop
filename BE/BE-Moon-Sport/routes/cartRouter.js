const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");

const cartRouter = express.Router();
cartRouter.use(bodyParser.json());

const {
  addNewCart,
  viewAllCart,
  deleteCartItem,
  updateCartItem,
  deleteAllCartItem,
} = require("../services/CRUDServices");

cartRouter.use("*", authenticate);
cartRouter
  .route("/")
  .get(viewAllCart)
  .post(addNewCart)
  .delete(deleteAllCartItem);
cartRouter.route("/:cartId").put(updateCartItem).delete(deleteCartItem);

module.exports = cartRouter;
