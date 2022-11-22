const validator = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    // Validation
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Login User Failed !",
          errors: errors.array(),
        },
      });
    }

    // Check user exists and password is correct
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Login User Failed !",
          errors: errors.array(),
        },
      });
    }

    // Generate JsonWebToken and send response
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: process.env.JWT_EXPIRE_DURATION,
    });

    //Remove Password from response
    user.password = undefined;
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.warn("Error: ", error);

    res.status(201).json({
      status: "fail",
      data: {
        message: "Error during login user !",
      },
    });
  }
};

exports.register = async (req, res) => {
  try {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Register user failed !",
          errors: errors.array(),
        },
      });
    }

    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    user.password = undefined;
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.warn("Error: ", error);

    res.status(201).json({
      status: "fail",
      data: {
        message: "Error creating user !",
      },
    });
  }
};

exports.logout = (req, res) => {
  res.send("Logout");
};
