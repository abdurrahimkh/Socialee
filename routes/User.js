const express = require("express");

// Controllers
const UserController = require("./../controllers/UserController");

// Validators
const AuthValidatons = require("../validators/AuthValidations");

//Middlewares
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get("/profile", AuthMiddleware.requireLogin, UserController.profile);
router.post("/login", AuthValidatons.login, UserController.login);
router.post("/register", AuthValidatons.register, UserController.register);
router.post("/logout", UserController.logout);

module.exports = router;
