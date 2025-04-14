require("dotenv").config();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const checkUser = await Users.findOne({ email: req.body.email });
    if (checkUser) {
      res.status(400).json("Email already registered!");
      return null;
    }

    const result = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      admin: req.body.admin,
    });

    if (!result) {
      res.status(400).json("Cannot register!");
      return null;
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const foundUser = await Users.findOne({ email: req.body.email }).lean();

    if (foundUser) {
      const correctPass = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );
      if (!correctPass) {
        res.status(404).json("Incorrect password!");
        return null;
      } else {
        const token = jwt.sign(foundUser, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRED_IN,
        });
        res.status(200).json({ accessToken: token });
      }
    } else {
      res.status(404).json("No email found!");
      return null;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
