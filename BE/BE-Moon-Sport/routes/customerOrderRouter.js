const express = require("express");
const bodyParser = require("body-parser");
const {
  viewAllOrder,
  addNewOrder,
  updateOrderStatus,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");

const cusOrderRouter = express.Router();
cusOrderRouter.use(bodyParser.json());
cusOrderRouter.use(authenticate);

cusOrderRouter.route("/").get(viewAllOrder).post(addNewOrder);
cusOrderRouter.route("/:orderId").put(updateOrderStatus);

module.exports = cusOrderRouter;
