const express = require("express");

// Controllers
const UserController = require("./../controllers/UserController");

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", UserController.logout);

module.exports = router;
