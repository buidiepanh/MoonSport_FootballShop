const delayFunction = (req, res, next) => {
  setTimeout(() => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }

    next();
  }, 2000);
};

module.exports = delayFunction;
