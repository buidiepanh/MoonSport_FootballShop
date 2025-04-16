const express = require("express");
const bodyParser = require("body-parser");
const { createVNPayUrl, vnpayReturn } = require("../services/paymentServices");

const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.route("/create-payment").post(createVNPayUrl);
orderRouter.route("/vnpay-return").get(vnpayReturn);

module.exports = orderRouter;
