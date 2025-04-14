const express = require("express");
const bodyParser = require("body-parser");

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

const {
  getAllCategory,
  postNewCategory,
  updateCategory,
} = require("../services/CRUDServices");

categoryRouter.route("/").get(getAllCategory).post(postNewCategory);

categoryRouter.route("/:categoryId").put(updateCategory);

module.exports = categoryRouter;
