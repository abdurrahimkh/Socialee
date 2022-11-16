const express = require("express");

// Controllers
const ViewsController = require("./../controllers/ViewsController");

const router = express.Router();

router.get("/", ViewsController.home);
router.get("/about", ViewsController.about);
router.get("/contact", ViewsController.contact);

module.exports = router;
