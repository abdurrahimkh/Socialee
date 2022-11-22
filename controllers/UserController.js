const validator = require("express-validator");
const User = require("../models/User");

exports.login = (req, res) => {
  res.send("Login");
};

exports.register = async (req, res) => {
  try {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Post creation failed !",
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
