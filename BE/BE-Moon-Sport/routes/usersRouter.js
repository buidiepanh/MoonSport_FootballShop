var express = require("express");
const {
  getAllUsers,
  getAuthenitcatedUser,
  updateUser,
  deleteUser,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");
var userRouter = express.Router();

userRouter.all("*", authenticate);
userRouter.route("/").get(getAllUsers);
userRouter.route("/:userId").put(updateUser).delete(deleteUser);
userRouter.route("/authenticated-user").get(getAuthenitcatedUser);

module.exports = userRouter;
