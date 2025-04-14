const express = require("express");
const bodyParse = require("body-parser");
const { registerUser, loginUser } = require("../services/AuthenServices");

const authenRouter = express.Router();
authenRouter.use(bodyParse.json());

authenRouter.route("/register").post(registerUser);
authenRouter.route("/login").post(loginUser);

module.exports = authenRouter;
