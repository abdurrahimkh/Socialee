//Imports
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

exports.requireLogin = async (req, res, next) => {
  // Get the token from headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      data: {
        message: "Not authorized",
      },
    });
  }

  //Verify Token
  const decode = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_TOKEN
  );

  // Check User Exists
  const user = User.findById(decode.id);
  if (!user) {
    return res.status(401).json({
      status: "fail",
      data: {
        message: "You are not authorized !",
      },
    });
  }
  next();
};
