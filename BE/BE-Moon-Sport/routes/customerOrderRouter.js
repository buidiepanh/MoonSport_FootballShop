const express = require("express");
const bodyParser = require("body-parser");
const { viewAllOrder, addNewOrder } = require("../services/CRUDServices");

const cusOrderRouter = express.Router();
cusOrderRouter.use(bodyParser.json());

cusOrderRouter.route("/").get(viewAllOrder).post(addNewOrder);
cusOrderRouter.route("/:orderId").put();

module.exports = cusOrderRouter;
