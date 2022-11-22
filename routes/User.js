const express = require("express");

// Controllers
const UserController = require("./../controllers/UserController");

// Validators
const AuthValidatons = require("../validators/AuthValidations");

const router = express.Router();

router.post("/login", AuthValidatons.login, UserController.login);
router.post("/register", AuthValidatons.register, UserController.register);
router.post("/logout", UserController.logout);

module.exports = router;
