require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const allowList = ["/login", "/register", "/products"];

  if (allowList.find((item) => item === req.originalUrl.startsWith(item))) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json("Token expired");
      }
    } else {
      return res.status(401).json("Unauthorized");
    }
  }
};

module.exports = authenticate;
